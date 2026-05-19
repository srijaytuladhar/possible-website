"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  tag: string;
  title: string;
  sub: string;
  btnText: string;
  btnLink: string;
}

export default function HeroSlider() {
  const slides: Slide[] = [
    {
      image: "/hero_nepal.png",
      tag: "Implementation Study",
      title: "AN INTEGRATED CHW IMPLEMENTATION STUDY",
      sub: "Full-time, supervised, and trained CHWs delivering evidence-based integrated care appears to be effective in improving maternal healthcare in rural Nepal.",
      btnText: "READ MORE ABOUT OUR IMPLEMENTATION STUDY",
      btnLink: "/publications?tab=research-paper",
    },
    {
      image: "/hero_digital.png",
      tag: "Tech Integration",
      title: "TECH-ENABLED COMMUNITY CARE SYSTEMS",
      sub: "Utilizing modern mobile applications and clinical dashboards to empower local community health workers with real-time patient history and decision-support tools.",
      btnText: "EXPLORE OUR SOLUTIONS",
      btnLink: "/#solutions",
    },
    {
      image: "/about_team.png",
      tag: "Co-Design & Science",
      title: "RIGOROUS SCIENTIFIC IMPLEMENTATION",
      sub: "Co-designing, testing, and scaling solutions with local advocacy networks, researchers, and government leaders to transform public health infrastructure.",
      btnText: "MEET OUR TEAM",
      btnLink: "/get-involved?tab=our-team",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="relative w-full min-h-[75vh] flex items-center bg-zinc-950 px-6 sm:px-8 py-16 overflow-hidden select-none">
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover object-center opacity-40 brightness-[0.7] transition-transform duration-[6000ms] ease-out scale-105"
            style={{ transform: idx === currentIndex ? "scale(1.0)" : "scale(1.05)" }}
            sizes="100vw"
            priority={idx === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 z-30 p-2.5 rounded-full border border-white/10 bg-black/30 text-white hover:bg-white/15 transition-all opacity-0 hover:opacity-100 md:opacity-40 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 z-30 p-2.5 rounded-full border border-white/10 bg-black/30 text-white hover:bg-white/15 transition-all opacity-0 hover:opacity-100 md:opacity-40 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Hero Content Overlay */}
      <div className="relative z-20 mx-auto max-w-7xl w-full">
        <div className={`max-w-3xl transition-all duration-300 transform ${
          isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-blue/15 px-3.5 py-1 text-[13px] font-medium text-secondary-blue mb-6 tracking-wider uppercase">
            {slides[currentIndex].tag}
          </span>
          <h1 className="h1-hero text-white mb-6 uppercase tracking-wide">
            {slides[currentIndex].title}
          </h1>
          <p className="text-subheading text-zinc-300 font-light mb-8 max-w-2xl leading-relaxed">
            {slides[currentIndex].sub}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={slides[currentIndex].btnLink}
              className="inline-flex items-center gap-2 rounded-full bg-primary-pink px-8 py-3.5 font-equip font-medium text-[15px] text-white shadow-lg shadow-primary-pink/30 hover:bg-primary-pink/90 transition-all hover:translate-x-1"
            >
              <span>{slides[currentIndex].btnText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? "w-8 bg-primary-pink"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
