"use client";

import { useMemo } from "react";
import { NepalMap } from "nepal-district-map";

export default function InteractivePresenceMap() {
  const ourDistricts = useMemo(() => [
    "Surkhet",
    "Rupandehi",
    "Bara",
    "Kathmandu",
    "Bhaktapur",
    "Lalitpur",
    "Dolakha",
    "Sarlahi",
    "Mahottari",
    "Udayapur",
    "Sunsari"
  ], []);

  const mapData = useMemo(() => {
    const data: Record<string, { color: string; value: number; tooltip: string }> = {};
    ourDistricts.forEach((name) => {
      data[name] = {
        color: "#ED2E84",
        value: 1,
        tooltip: name
      };
    });
    return data;
  }, [ourDistricts]);

  return (
    <section className="py-20 bg-zinc-50 border-y border-zinc-100 px-6 sm:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="h2-section text-zinc-950 uppercase tracking-wide">
            Innovation and Implementation Sites
          </h2>
        </div>

        {/* Clean Centered Nepal Map Container (Clean map without side/bottom cards or numbers per PDF Page 2) */}
        <div className="w-full max-w-5xl bg-white p-6 sm:p-10 rounded-3xl border border-zinc-150/70 shadow-xs flex items-center justify-center">
          <div className="w-full max-w-4xl flex items-center justify-center">
            <NepalMap
              data={mapData}
              colorMode="flat"
              baseColor="#00B2E2"
              strokeColor="#ffffff"
              strokeWidth={1.2}
              hoverColor="#ED2E84"
              highlightedDistricts={ourDistricts}
              highlightColor="#ED2E84"
              showLabels={false}
              showTooltip={true}
              renderTooltip={(districtName) => (
                <div className="px-3 py-1.5 text-xs font-semibold text-white bg-zinc-900 rounded-lg shadow-md border border-zinc-800">
                  {districtName}
                </div>
              )}
              className="w-full h-auto drop-shadow-sm select-none"
              maxHeight="520px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
