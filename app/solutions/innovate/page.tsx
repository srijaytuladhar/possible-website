"use client";

import React, { useState } from "react";
import SolutionStageTemplate, { SolutionBoxType } from "@/components/SolutionStageTemplate";

// Inline Share Button with matching page theme
function ShareButton({ title, url }: { title: string; url?: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl =
      url || (typeof window !== "undefined" ? window.location.href : "");

    const shareData = {
      title: title,
      text: title,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link", err);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all hover:opacity-80 active:scale-95 cursor-pointer text-primary-pink bg-primary-pink/10 border-primary-pink/20"
      aria-label="Share"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span>Share</span>
        </>
      )}
    </button>
  );
}

export default function InnovatePage() {
  const projects: SolutionBoxType[] = [
    {
      id: "casa",
      title: "CASA",
      subtitle: "Supporting caregivers of children with Autism",
      description: [
        <div key="problem" className="space-y-1.5">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Problem:
          </strong>
          <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
            Autism spectrum disorder affects how children communicate, interact, and manage their behavior, which can create significant challenges and stress for both children and caregivers. The WHO’s Caregiver Skills Training (CST) teaches caregivers practical strategies to support children with ASD, but caregivers may find it hard to use them at home because they lack support, forget what they learned, and find some recommendations conflict with local parenting practices.
          </p>
        </div>,

        <div key="solution" className="space-y-1.5 pt-2">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Proposed Solution:
          </strong>
          <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
            CASA is a mobile health app being developed with caregivers, health care workers and experts, to support caregivers of children with autism. It will provide culturally and locally contextualized simple, practical tips that caregivers can use at home to help children communicate, learn new skills, manage everyday challenges, and take care of their own well-being.
          </p>
        </div>,

        <div key="impact" className="space-y-2 pt-2">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Impact:
          </strong>
          <p className="text-zinc-700 font-light text-[16px]">
            We are conducting a three-month pilot study of CASA, and we expect to see:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 font-light text-[16px] leading-relaxed">
            <li>Caregiver and therapist acceptance of CASA</li>
            <li>Reduced caregiver stress and better well-being</li>
            <li>Greater knowledge and skills about autism and behavioral strategies</li>
            <li>Better access to specialized services</li>
          </ul>
        </div>,

        <div key="share" className="pt-3">
          <ShareButton title="CASA - Supporting caregivers of children with Autism" />
        </div>
      ],
      image: "/solutions_innovate/CASA1.jpg",
      publications: [
        {
          title: "Caregiver skills training for families of children with developmental delays or disabilities.",
          link: "https://www.who.int/publications/i/item/9789240048836"
        }
      ]
    },
    {
      id: "srhr-disabilities",
      title: "Reimagining sexual and reproductive health services with women with disabilities",
      description: [
        <div key="problem" className="space-y-1.5">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Problem:
          </strong>
          <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
            Women with disabilities often face barriers to accessing sexual and reproductive health information and services.
          </p>
        </div>,

        <div key="solution" className="space-y-1.5 pt-2">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Proposed Solution:
          </strong>
          <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
            Possible worked alongside women with diverse disabilities, the Nepal Disabled Women’s Association, and other stakeholders to understand these experiences and co-design an intervention grounded in their needs, priorities, and lived realities.
          </p>
        </div>,

        <div key="impact" className="space-y-1.5 pt-2">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Impact:
          </strong>
          <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
            Co-designed intervention grounded in the needs, priorities, and lived realities of women with diverse disabilities, developed through direct partnership with the Nepal Disabled Women’s Association and local health stakeholders.
          </p>
        </div>,

        <div key="share" className="pt-3">
          <ShareButton title="Reimagining sexual and reproductive health services with women with disabilities" />
        </div>
      ],
      image: "/solutions_innovate/Disability.JPG"
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="innovate"
      stageNumber="3"
      stageName="INNOVATE"
      colorClass="text-primary-pink"
      badgeBgClass="bg-primary-pink/10"
      borderClass="border-primary-pink/20"
      projects={projects}
    />
  );
}