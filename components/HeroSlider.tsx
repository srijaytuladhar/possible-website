"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden select-none bg-zinc-950 flex items-center min-h-[520px] md:min-h-[580px] lg:min-h-[620px] xl:min-h-[660px] md:aspect-[6.5/2.9] px-6 sm:px-8 py-16 sm:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/first-landing.jpg"
          alt="Too complex to solve is where we start"
          fill
          className="object-cover object-center opacity-75 brightness-[0.9] transition-transform duration-[4000ms] scale-100"
          sizes="100vw"
          priority
        />
        {/* Soft dark overlay to guarantee high contrast text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="h1-hero text-white font-extralight leading-tight uppercase tracking-wide">
            &ldquo;Too complex to solve&rdquo; <br />
            <span className="font-semibold text-primary-pink">is where we start.</span>
          </h1>

          <p className="text-subheading text-zinc-200 font-light max-w-2xl leading-relaxed">
            We innovate, test, and scale the health solutions- until they&apos;re health workers&apos; practice and policy.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-full bg-primary-pink px-8 py-4 font-equip font-semibold text-[15px] text-white shadow-lg shadow-primary-pink/30 hover:bg-primary-pink/90 hover:shadow-primary-pink/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
            >
              <span>Our solutions</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
