"use client";

import React, { useState } from "react";
import SolutionStageTemplate, { SolutionBoxType } from "@/components/SolutionStageTemplate";

// Inline Share Button with matching Purple theme for Scale page
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
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all hover:opacity-80 active:scale-95 cursor-pointer text-accent-purple bg-accent-purple/10 border-accent-purple/20"
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

export default function ScalePage() {
  const projects: SolutionBoxType[] = [
    {
      id: "longitudinal-care",
      title: "Strengthening community health system through longitudinal care: From innovation to scale",
      description: [
        <div key="problem" className="space-y-1.5">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Problem:
          </strong>
          <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
            Nepal’s older population is growing, and chronic diseases now cause 70% of deaths. Most people with high blood pressure are not diagnosed or not controlled. Maternal health progress has stalled, with 151 maternal deaths per 100,000 live births, most of them preventable. The health system mainly treats illness and invests little in prevention.
          </p>
        </div>,

        <div key="solution" className="space-y-1.5 pt-2">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Proposed Solution:
          </strong>
          <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
            We, in collaboration with the government, designed a model, grounded in WHO guidelines for CHW programs and tested it as a national pilot focused first on bundled maternal and child health services. This first-of-its-kind model in Nepal uses ProCHWs who are local, trained, supervised, salaried, full-time, and digitally enabled community health workers, to bring integrated, continuous care to people’s homes.
          </p>
        </div>,

        <div key="impact" className="space-y-2 pt-2">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Impact:
          </strong>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 font-light text-[16px] leading-relaxed">
            <li>Improved access and outcomes</li>
            <li>Fewer home deliveries</li>
            <li>Earlier identification of high-risk pregnancies</li>
            <li>More follow-up care</li>
            <li>Affordability within the public health system (requires ~1% of total national health spending)</li>
          </ul>
        </div>,

        <p key="closing" className="pt-3 font-medium text-zinc-900 text-[16px] leading-relaxed">
          We are now working with the government and community partners to refine delivery, build evidence for national scale-up, and extend the model to care across the life course.
        </p>,

        <div key="share" className="pt-3">
          <ShareButton title="Strengthening community health system through longitudinal care: From innovation to scale" />
        </div>
      ],
      image: "/baby.jpg",
      publications: [
        {
          title: "A study of an integrated CHW intervention to address maternal healthcare in rural Nepal.",
          link: "https://doi.org/10.1371/journal.pgph.0001512"
        },
        {
          title: "Comparing two data collection methods to track vital events in maternal and child health via CHWs.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9327361/"
        },
        {
          title: "Costing Analysis of a Pilot Community Health Worker Program in Rural Nepal.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7326517/"
        },
        {
          title: "Postpartum contraception outcomes of an integrated community health worker intervention.",
          link: "https://doi.org/10.1186/s12978-025-02225-5"
        },
        {
          title: "The power of peers: an effectiveness evaluation of a cluster-controlled trial of group antenatal care.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6805428/"
        },
        {
          title: "Labour conditions in dual-cadre community health worker programs.",
          link: "https://www.thelancet.com/action/showPdf?pii=S2214-109X%2823%2900357-1"
        }
      ]
    },
    {
      id: "collaborative-care",
      title: "Collaborative care for improving mental health care within primary health care settings",
      description: [
        <div key="problem" className="space-y-1.5">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Problem:
          </strong>
          <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
            Despite carrying a disproportionately high burden of depression, people in low- and middle-income countries lack access to effective care. Access is limited by both the inequitable concentration of specialized mental health care in urban areas with greater resources, and limited capacity of non-specialists to provide mental healthcare.
          </p>
        </div>,

        <div key="solution" className="space-y-1.5 pt-2">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Proposed Solution:
          </strong>
          <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
            An integrated model that trains CHWs and clinicians to identify and manage depression and anxiety within primary care settings. We co-designed and tested an adapted collaborative care model in remote districts in Nepal.
          </p>
        </div>,

        <div key="impact" className="space-y-2 pt-2">
          <strong className="font-semibold text-zinc-950 block text-[17px]">
            Impact:
          </strong>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 font-light text-[16px] leading-relaxed">
            <li>Improved health workers’ capability (enhanced self-efficacy and knowledge)</li>
            <li>Greater access to mental health care and support</li>
            <li>Improved clinical outcomes</li>
          </ul>
        </div>,

        <p key="closing" className="pt-3 font-medium text-zinc-900 text-[16px] leading-relaxed">
          We are now informing WHO-endorsed national training manuals for scale-up.
        </p>,

        <div key="share" className="pt-3">
          <ShareButton title="Collaborative care for improving mental health care within primary health care settings" />
        </div>
      ],
      image: "/COCM.jpg",
      publications: [
        {
          title: "Collaborative care model for depression in rural Nepal.",
          link: "https://bmjopen.bmj.com/content/11/8/e048481"
        },
        {
          title: "Collaborative Care for Mental Health in LMICs: A WHO Health Systems Framework Assessment.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5790311/"
        },
        {
          title: "Improving the Quality of Global Mental Health Services with Digital Tools.",
          link: "https://doi.org/10.1007/s41347-024-00389-8"
        },
        {
          title: "Addressing challenges for psychotherapy supervision in global mental health through experiential learnings.",
          link: "https://doi.org/10.1186/s12982-025-00645-z"
        },
        {
          title: "Evidence-based, multilevel interventions for sustained behaviour change.",
          link: "https://pubmed.ncbi.nlm.nih.gov/37858578/"
        }
      ]
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="scale"
      stageNumber="1"
      stageName="SCALE"
      colorClass="text-accent-purple"
      badgeBgClass="bg-accent-purple/10"
      borderClass="border-accent-purple/20"
      projects={projects}
    />
  );
}