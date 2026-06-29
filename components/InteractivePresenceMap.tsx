"use client";

import Image from "next/image";

export default function InteractivePresenceMap() {
  return (
    <section className="py-20 bg-zinc-50 border-y border-zinc-100 px-6 sm:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="h2-section text-zinc-950 mb-4 uppercase tracking-wide">
            Innovation and Implementation Sites
          </h2>
          <p className="text-body text-body-gray font-light">
            We operate and conduct research in collaboration with local governments across Nepal.
          </p>
        </div>

        {/* Map Image Container */}
        <div className="flex justify-center items-center bg-white p-4 sm:p-8 rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="relative w-full max-w-5xl">
            <Image
              src="/UpdatedHeatMap.png"
              alt="Innovation and Implementation Sites Map"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
