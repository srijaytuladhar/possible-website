"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NepalMap } from "nepal-district-map";

const BLUE = "#00B2E2";
// Research sites use a colour that is visually identical to BLUE (1 unit off in the
// blue channel). It lets us find their paths in the rendered map without relying
// on any attribute names, so we can draw their pink borders.
const SITE_BLUE = "#00B2E3";
const SITE_BLUE_RGB = "rgb(0, 178, 227)";
const PINK = "#ED2E84";

type Outline = { d: string; matrix: string };

type Frame = {
  viewBox: string;
  box: { left: number; top: number; width: number; height: number };
};

type Hover = Frame & {
  name: string;
  d: string;
  matrix: string; // element-local -> svg viewBox space
  cx: number; // centre in viewBox space
  cy: number;
  bw: number; // size in viewBox space
  bh: number;
  vbW: number;
};

type Borders = Frame & { items: Outline[] };

export default function InteractivePresenceMap() {
  const [hover, setHover] = useState<Hover | null>(null);
  const [borders, setBorders] = useState<Borders | null>(null);
  const [learned, setLearned] = useState<Record<string, Outline>>({});
  const mapRef = useRef<HTMLDivElement>(null);
  const lastTargetRef = useRef<Element | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  // 12 Research & Implementation Sites
  const researchSites = useMemo(
    () => [
      "Achham",
      "Dolakha",
      "Kathmandu",
      "Bhaktapur",
      "Lalitpur",
      "Sarlahi",
      "Sunsari",
      "Mahottari",
      "Bara",
      "Surkhet",
      "Rupandehi",
      "Udayapur",
    ],
    []
  );

  const researchSitesSet = useMemo(() => new Set(researchSites), [researchSites]);

  // The whole map looks blue; research sites are tagged with SITE_BLUE
  const mapData = useMemo(() => {
    const data: Record<string, { color: string; tooltip: string }> = {};
    researchSites.forEach((name) => {
      data[name] = { color: SITE_BLUE, tooltip: name };
    });
    return data;
  }, [researchSites]);

  // Geometry helper shared by the border scan and the hover zoom
  const geometryOf = (el: SVGGraphicsElement) => {
    const svg = el.ownerSVGElement;
    const wrap = mapRef.current;
    const vb = svg?.viewBox?.baseVal;
    const svgCTM = svg?.getScreenCTM();
    const elCTM = el.getScreenCTM();
    if (!svg || !wrap || !vb || !vb.width || !svgCTM || !elCTM) return null;

    const d =
      el.tagName.toLowerCase() === "polygon"
        ? `M${el.getAttribute("points")}Z`
        : el.getAttribute("d");
    if (!d) return null;

    const m = svgCTM.inverse().multiply(elCTM);
    const b = el.getBBox();
    const lx = b.x + b.width / 2;
    const ly = b.y + b.height / 2;
    const wr = wrap.getBoundingClientRect();
    const sr = svg.getBoundingClientRect();

    return {
      d,
      matrix: `matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`,
      cx: m.a * lx + m.c * ly + m.e,
      cy: m.b * lx + m.d * ly + m.f,
      bw: b.width * Math.abs(m.a),
      bh: b.height * Math.abs(m.d),
      vbW: vb.width,
      viewBox: `${vb.x} ${vb.y} ${vb.width} ${vb.height}`,
      box: {
        left: sr.left - wr.left,
        top: sr.top - wr.top,
        width: sr.width,
        height: sr.height,
      },
    };
  };

  // Find every research-site path (by its tag colour) and keep its outline
  const scan = useCallback(() => {
    const wrap = mapRef.current;
    const svg = wrap?.querySelector("svg");
    if (!wrap || !svg) return;

    let frame: Frame | null = null;
    const items: Outline[] = [];

    svg.querySelectorAll<SVGGraphicsElement>("path, polygon").forEach((el) => {
      if (getComputedStyle(el).fill.replace(/\s+/g, "") !== SITE_BLUE_RGB.replace(/\s+/g, ""))
        return;
      const g = geometryOf(el);
      if (!g) return;
      frame = { viewBox: g.viewBox, box: g.box };
      items.push({ d: g.d, matrix: g.matrix });
    });

    const next: Borders | null = frame && items.length ? { ...(frame as Frame), items } : null;
    setBorders((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const wrap = mapRef.current;
    if (!wrap) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    };

    schedule();
    const mo = new MutationObserver(schedule);
    mo.observe(wrap, { childList: true, subtree: true });
    const ro = new ResizeObserver(schedule);
    ro.observe(wrap);
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [scan]);

  // Build the zoom/highlight geometry from the district path under the cursor
  const buildHover = useCallback((name: string): Hover | null => {
    const wrap = mapRef.current;
    if (!wrap) return null;

    let el = lastTargetRef.current?.closest("path, polygon") as SVGGraphicsElement | null;
    if ((!el || !wrap.contains(el)) && pointerRef.current) {
      const p = pointerRef.current;
      el = document
        .elementFromPoint(p.x, p.y)
        ?.closest("path, polygon") as SVGGraphicsElement | null;
    }
    if (!el || !wrap.contains(el)) return null;

    const g = geometryOf(el);
    return g ? { name, ...g } : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHover = useCallback(
    (districtName: string | null) => {
      if (!districtName || !researchSitesSet.has(districtName)) {
        setHover(null);
        return;
      }
      const next = buildHover(districtName);
      if (!next) return;
      setHover((prev) => (prev?.name === districtName ? prev : next));
      // Fallback: remember each hovered site's outline in case the colour scan finds nothing
      setLearned((prev) =>
        prev[districtName]
          ? prev
          : { ...prev, [districtName]: { d: next.d, matrix: next.matrix } }
      );
    },
    [buildHover, researchSitesSet]
  );

  // Enlarge small districts more than big ones
  const scale = hover
    ? Math.min(Math.max((hover.vbW * 0.1) / Math.max(hover.bw, hover.bh, 1), 1.5), 4.5)
    : 1;

  // Label font size (viewBox units), fitted to the enlarged district
  const fontSize = hover
    ? Math.max(
        Math.min(
          (hover.bw * scale * 0.85) / (hover.name.length * 0.62),
          hover.bh * scale * 0.5,
          hover.vbW * 0.028
        ),
        hover.vbW * 0.009
      )
    : 0;

  // Pink borders: from the colour scan, or (fallback) from districts hovered so far
  const borderFrame: Borders | null =
    borders ??
    (hover && Object.keys(learned).length
      ? { viewBox: hover.viewBox, box: hover.box, items: Object.values(learned) }
      : null);

  return (
    <section className="py-20 bg-zinc-50 border-y border-zinc-100 px-6 sm:px-8 relative overflow-hidden">
      <style>{`
        @keyframes site-grow {
          from { transform: scale(1); }
          to   { transform: scale(var(--site-scale)); }
        }
        @keyframes site-label {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="h2-section text-zinc-950 uppercase tracking-wide">
            Innovation and Implementation Sites
          </h2>
        </div>

        {/* Map Container Box */}
        <div className="w-full max-w-5xl bg-white p-6 sm:p-10 rounded-3xl border border-zinc-200/80 shadow-xs flex flex-col items-center justify-center relative">
          {/* North Direction Compass Sign */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 flex flex-col items-center select-none pointer-events-none z-20">
            <span className="text-xs font-black text-primary-pink tracking-widest mb-0.5">
              N
            </span>
            <svg
              className="w-5 h-6 text-primary-pink"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-label="North Arrow"
            >
              <path d="M12 2L4 20L12 16L20 20L12 2Z" />
            </svg>
          </div>

          {/* The map itself never moves or scales */}
          <div
            ref={mapRef}
            className="w-full max-w-4xl flex items-center justify-center nepal-map-container relative"
            // Capture phase runs before the map's own hover handler, so we always
            // know which district path the cursor is on.
            onMouseOverCapture={(e) => {
              lastTargetRef.current = e.target as Element;
            }}
            onMouseMove={(e) => {
              pointerRef.current = { x: e.clientX, y: e.clientY };
            }}
            onMouseLeave={() => setHover(null)}
          >
            <NepalMap
              data={mapData}
              colorMode="flat"
              baseColor={BLUE}
              strokeColor="#ffffff"
              strokeWidth={1.5}
              hoverColor={BLUE}
              showLabels={false}
              showTooltip={false}
              onDistrictHover={handleHover}
              className="w-full h-auto select-none cursor-pointer"
              maxHeight="520px"
            />

            {/* Permanent pink borders on the research sites */}
            {borderFrame && (
              <svg
                className="absolute pointer-events-none"
                style={{
                  left: borderFrame.box.left,
                  top: borderFrame.box.top,
                  width: borderFrame.box.width,
                  height: borderFrame.box.height,
                  overflow: "visible",
                }}
                viewBox={borderFrame.viewBox}
                aria-hidden="true"
              >
                {borderFrame.items.map((o, i) => (
                  <path
                    key={i}
                    d={o.d}
                    transform={o.matrix}
                    fill="none"
                    stroke={PINK}
                    strokeWidth={2}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
            )}

            {/* Hovered research site: pink highlighted + zoomed copy with its name */}
            {hover && (
              <svg
                className="absolute pointer-events-none"
                style={{
                  left: hover.box.left,
                  top: hover.box.top,
                  width: hover.box.width,
                  height: hover.box.height,
                  overflow: "visible",
                }}
                viewBox={hover.viewBox}
                aria-hidden="true"
              >
                <g key={hover.name}>
                  <g transform={hover.matrix}>
                    <path
                      d={hover.d}
                      fill={PINK}
                      stroke="#ffffff"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      style={
                        {
                          "--site-scale": scale,
                          transformBox: "fill-box",
                          transformOrigin: "center",
                          transform: `scale(${scale})`,
                          animation: "site-grow 350ms cubic-bezier(0.22, 1, 0.36, 1)",
                          filter: `drop-shadow(0 0 0 ${PINK}) drop-shadow(0 0 3px ${PINK}) drop-shadow(0 4px 8px rgba(0,0,0,0.3))`,
                        } as React.CSSProperties
                      }
                    />
                  </g>
                  <text
                    x={hover.cx}
                    y={hover.cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={fontSize}
                    fontWeight={800}
                    fill="#ffffff"
                    stroke="rgba(0,0,0,0.45)"
                    strokeWidth={fontSize * 0.12}
                    paintOrder="stroke"
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      animation: "site-label 300ms ease-out 120ms both",
                    }}
                  >
                    {hover.name}
                  </text>
                </g>
              </svg>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
