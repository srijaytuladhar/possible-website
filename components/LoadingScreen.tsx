"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Run loader for exactly 1 second, then trigger fade out
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 1000);

    // Completely remove loader from DOM after transition completes (500ms transition)
    const removeTimer = setTimeout(() => {
      setRemoved(true);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Prevent scroll while loading is active
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (removed || !mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-all duration-500 ${
        visible ? "opacity-100 visibility-visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated SVG Logo */}
        <div className="relative w-28 h-28">
          <svg
            viewBox="0 0 110 110"
            className="w-full h-full animate-logo-spin"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Pink L-shape: slides from bottom-left (-30px, 30px) */}
            <path
              d="M 10,40 H 70 V 100 H 40 V 70 H 10 Z"
              fill="#ED2E84"
              className="animate-pink-slide origin-bottom-left"
            />
            {/* Blue L-shape: slides from top-right (30px, -30px) */}
            <path
              d="M 40,10 H 70 V 40 H 100 V 70 H 40 Z"
              fill="#00BBE2"
              className="animate-blue-slide origin-top-right"
            />
            {/* Purple center square: fades in as they overlap */}
            <rect
              x="40"
              y="40"
              width="30"
              height="30"
              fill="#782888"
              className="animate-center-fade"
            />
          </svg>
        </div>

        {/* Text Fade-In */}
        <div className="text-center animate-pulse">
          <span className="font-equip-thin text-xl tracking-[0.25em] font-extralight text-black block">
            POSSIBLE
          </span>
          <span className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase block mt-1">
            Loading innovation
          </span>
        </div>
      </div>
    </div>
  );
}
