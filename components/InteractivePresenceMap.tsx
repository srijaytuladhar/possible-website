"use client";

import { useMemo, useState } from "react";
import { NepalMap } from "nepal-district-map";

export default function InteractivePresenceMap() {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);

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
      "Udayapur"
    ],
    []
  );

  const researchSitesSet = useMemo(() => new Set(researchSites), [researchSites]);

  // Data config: Assign tooltip and base color to research sites
  const mapData = useMemo(() => {
    const data: Record<string, { color: string; tooltip: string }> = {};
    researchSites.forEach((name) => {
      data[name] = {
        color: "#00B2E2",
        tooltip: name
      };
    });
    return data;
  }, [researchSites]);

  return (
    <section className="py-20 bg-zinc-50 border-y border-zinc-100 px-6 sm:px-8 relative overflow-hidden">
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
          
          {/* North Direction Compass Sign (Pink Color, positioned inside top-right) */}
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

          <div className="w-full max-w-4xl flex items-center justify-center nepal-map-container relative">
            <NepalMap
              data={mapData}
              colorMode="flat"
              baseColor="#00B2E2"
              strokeColor="#ffffff"
              strokeWidth={1.5}
              hoverColor="#ED2E84"
              showLabels={false}
              showTooltip={true}
              onDistrictHover={(districtName) => {
                if (districtName && researchSitesSet.has(districtName)) {
                  setActiveDistrict(districtName);
                } else {
                  setActiveDistrict(null);
                }
              }}
              renderTooltip={(districtName) => {
                // Ignore non-research sites
                if (!researchSitesSet.has(districtName)) {
                  return null;
                }

                return (
                  <div className="pointer-events-none animate-in fade-in zoom-in-95 duration-150 z-50">
                    {/* Badge displayed directly inside/over the hovered district */}
                    <div className="bg-zinc-950/90 text-white text-xs sm:text-sm font-extrabold px-3 py-1.5 rounded-xl shadow-2xl tracking-wider uppercase border border-[#ED2E84] flex items-center gap-1.5 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-[#ED2E84] animate-pulse" />
                      <span>{districtName}</span>
                    </div>
                  </div>
                );
              }}
              className="w-full h-auto select-none cursor-pointer"
              maxHeight="520px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}