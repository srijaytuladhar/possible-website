"use client";

import { useState, useEffect } from "react";
import { Eye, Type, RotateCcw, ShieldAlert, Sparkles, Check } from "lucide-react";

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState("normal"); // normal, large, xlarge
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    // Font Size
    if (fontSize === "large") {
      root.style.fontSize = "115%";
    } else if (fontSize === "xlarge") {
      root.style.fontSize = "130%";
    } else {
      root.style.fontSize = "";
    }

    // High Contrast
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Dyslexia Font
    if (dyslexiaFont) {
      root.classList.add("dyslexia-font");
    } else {
      root.classList.remove("dyslexia-font");
    }

    // Highlight Links
    if (highlightLinks) {
      root.classList.add("highlight-links");
    } else {
      root.classList.remove("highlight-links");
    }
  }, [fontSize, highContrast, dyslexiaFont, highlightLinks]);

  const resetAll = () => {
    setFontSize("normal");
    setHighContrast(false);
    setDyslexiaFont(false);
    setHighlightLinks(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-equip">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7B2B88] text-white shadow-xl hover:bg-[#682473] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
      >
        <Eye className="h-6 w-6" />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute bottom-18 right-0 w-80 rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 text-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
            <h3 className="text-[16px] font-semibold flex items-center gap-2">
              <Eye className="h-4.5 w-4.5 text-[#7B2B88]" />
              <span>Accessibility Options</span>
            </h3>
            <button
              onClick={resetAll}
              className="text-[12px] font-medium text-zinc-500 hover:text-primary-pink flex items-center gap-1 cursor-pointer"
              title="Reset accessibility options"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size Adjuster */}
            <div className="space-y-2">
              <span className="text-[13px] font-semibold text-zinc-700 block">Text Size</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "normal", label: "Default" },
                  { value: "large", label: "Large" },
                  { value: "xlarge", label: "Extra L" },
                ].map((sz) => (
                  <button
                    key={sz.value}
                    onClick={() => setFontSize(sz.value)}
                    className={`px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-all cursor-pointer ${
                      fontSize === sz.value
                        ? "bg-primary-pink text-white border-primary-pink"
                        : "border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast Mode Toggle */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-[13.5px] font-medium transition-all cursor-pointer ${
                highContrast
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                <span>High Contrast Mode</span>
              </span>
              {highContrast && <Check className="h-4 w-4" />}
            </button>

            {/* Dyslexia Friendly Font Toggle */}
            <button
              onClick={() => setDyslexiaFont(!dyslexiaFont)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-[13.5px] font-medium transition-all cursor-pointer ${
                dyslexiaFont
                  ? "bg-[#7B2B88] text-white border-[#7B2B88]"
                  : "border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span>Dyslexia-Friendly Font</span>
              </span>
              {dyslexiaFont && <Check className="h-4 w-4" />}
            </button>

            {/* Highlight Links Toggle */}
            <button
              onClick={() => setHighlightLinks(!highlightLinks)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-[13.5px] font-medium transition-all cursor-pointer ${
                highlightLinks
                  ? "bg-secondary-blue text-white border-secondary-blue"
                  : "border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Highlight Interactive Links</span>
              </span>
              {highlightLinks && <Check className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
