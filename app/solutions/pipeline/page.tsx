"use client";

import React, { useState } from "react";
import SolutionStageTemplate, { SolutionBoxType } from "@/components/SolutionStageTemplate";

// Inline Share Button with matching Amber theme for Pipeline page
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
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all hover:opacity-80 active:scale-95 cursor-pointer text-amber-600 bg-amber-100 border-amber-500/20"
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

export default function PipelinePage() {
  const introText = (
    <div className="bg-zinc-50/70 border border-zinc-300 rounded-2xl p-6 sm:p-8 text-zinc-700 text-[15px] sm:text-[16px] font-normal leading-relaxed text-left">
      Explore the culturally grounded solutions in our pipeline. We are actively seeking collaborative partners and resources to move these solutions into action. If you are interested in collaborating, please connect with us at{" "}
      <a 
        href="mailto:research@possiblehealth.org" 
        className="text-zinc-800 hover:text-zinc-950 underline underline-offset-2 transition-colors"
      >
        research@possiblehealth.org
      </a>
      .
    </div>
  );

  const projects: SolutionBoxType[] = [
    {
      id: "school-mental-health",
      title: "Nurse-led mental health support for public schools",
      description: [
        "Nearly half of all lifetime mental health conditions take root before adulthood, and in Nepal, nearly 7 million children are sitting in a classroom every school day. We are working with the government to position school nurses as the first line of mental health support for students, teachers, and parents. This solution hasn't been piloted yet. It is still in its earliest stage, preparing to co-design with schools, nurses and families before we move ahead building the evidence needed to reach national scale.",
        <div key="share" className="pt-3">
          <ShareButton title="Nurse-led mental health support for public schools" />
        </div>
      ],
      /* image: "/pipeline1.jpg" */
    },
    {
      id: "ai-supportive-supervision",
      title: "AI-assisted supportive supervision for non-specialist health workers",
      description: [
        "Nepal has widened access to mental health care by training non-specialists to deliver it. It is evident that the health workers and communities doing this work refer to ongoing supportive supervision as one of the conditions that make it work. Right now that means a supervisor observing a session, reviewing a recording, or debriefing afterwards with one worker at a time. It works. But as more workers are trained, both the reach and the consistency of that supervision remain unaddressed. We are designing and testing an AI-assisted supportive supervision model so non-specialists can rehearse difficult cases and get feedback whenever they need it, with their human supervisor still in the loop. It is designed to run on open models that could be owned outright, so one more worker practicing costs almost nothing. The pilot starts this year: first co-designing the tool with the non-specialists and field experts using human centered design, then testing whether it is safe, acceptable, and feasible in routine practice.",
        <div key="share" className="pt-3">
          <ShareButton title="AI-assisted supportive supervision for non-specialist health workers" />
        </div>
      ],
      /* image: "/pipeline2.jpg" */
    }, 
    {
      id: "climate-change-health",
      title: "Addressing the intersection of climate change and health",
      description: [
        "Nepal ranks 10th globally in historical climate disaster impacts (Eckstein et al., 2019). While physical infrastructure and direct health impact dominate the narrative, extreme weather events can also escalate mental health issues and increase the risk of violence.",
        "Our working proposal aims to explore how extreme weather events can increase domestic violence and affect mental health, and develop a brief family support program for families affected by these intersecting challenges. We will work with communities to design the program and test whether it is practical and helpful for families experiencing domestic violence after extreme weather events.",
        <div key="share" className="pt-3">
          <ShareButton title="Addressing the intersection of climate change and health" />
        </div>
      ],
      /* image: "/MILAP_UD.jpeg" */
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="pipeline"
      stageNumber="4"
      stageName="PIPELINE"
      colorClass="text-amber-600"
      badgeBgClass="bg-amber-100 text-amber-800"
      borderClass="border-amber-500/20"
      projects={projects}
      introText={introText}
    />
  );
}