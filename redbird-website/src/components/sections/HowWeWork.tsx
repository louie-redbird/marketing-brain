"use client";

import { useRef } from "react";
import Image from "next/image";
import { useNotebookFillAnimation } from "@/hooks/useNotebookFillAnimation";

type Step = {
  n: string;
  name: string;
  descLines: [string, string];
};

const STEPS: Step[] = [
  {
    n: "1.",
    name: "Audit",
    descLines: [
      "Map your current marketing, customers,",
      "and competitors. Find the gaps.",
    ],
  },
  {
    n: "2.",
    name: "Strategy",
    descLines: [
      "Design a 90-day plan with clear targets",
      "and channels. No fluff.",
    ],
  },
  {
    n: "3.",
    name: "Build",
    descLines: [
      "Execute across SEO, ads, content, email,",
      "automation. AI-accelerated.",
    ],
  },
  {
    n: "4.",
    name: "Iterate",
    descLines: [
      "Measure weekly, optimise monthly,",
      "scale what compounds.",
    ],
  },
];

const RULED_LINES = `repeating-linear-gradient(
  to bottom,
  transparent 0,
  transparent 27px,
  rgba(110, 140, 155, 0.28) 27px,
  rgba(110, 140, 155, 0.28) 28px
)`;

const fillLineStyle: React.CSSProperties = {
  display: "inline-block",
  overflow: "hidden",
  whiteSpace: "nowrap",
  verticalAlign: "top",
  listStyle: "none",
};

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const deskRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);
  const stepsContainerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelContentRef = useRef<HTMLDivElement | null>(null);

  useNotebookFillAnimation({
    sectionRef,
    deskRef,
    titleRef,
    stepsContainerRef,
    panelRef,
    panelContentRef,
  });

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative min-h-screen w-full overflow-hidden bg-brand-cream"
    >
      <div
        ref={deskRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/images/desk-sorted-master.png"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 py-12 md:h-screen md:flex-row md:gap-6 md:px-8 lg:gap-12 lg:px-16">
        {/* Notebook */}
        <div
          className="relative w-full max-w-[460px] shrink-0 md:w-[400px] lg:w-[460px]"
          style={{ transform: "rotate(-2deg)", transformOrigin: "center" }}
        >
          <div
            className="relative rounded-[3px] px-9 py-6"
            style={{
              backgroundColor: "#FDFAF0",
              backgroundImage: RULED_LINES,
              backgroundPosition: "0 42px",
              boxShadow:
                "0 18px 40px -12px rgba(0,0,0,0.35), 0 4px 10px -4px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="font-handwriting text-[26px] font-medium leading-none text-brand-ink"
              style={{
                borderBottom: "2px solid rgba(26,26,46,0.9)",
                paddingBottom: "3px",
                display: "inline-block",
              }}
            >
              <span ref={titleRef} style={fillLineStyle}>
                The Redbird Way
              </span>
            </div>

            <div ref={stepsContainerRef} className="mt-4 space-y-3">
              {STEPS.map((s) => (
                <div
                  key={s.name}
                  className="font-handwriting leading-tight text-brand-ink"
                >
                  <span data-fill style={fillLineStyle} className="text-[20px]">
                    <span className="font-medium text-brand-raspberry">
                      {s.n}
                    </span>{" "}
                    <span className="font-medium">{s.name}</span>
                  </span>
                  <br />
                  <span
                    data-fill
                    style={{ ...fillLineStyle, marginLeft: "1.25rem" }}
                    className="text-[15px] text-brand-ink/85"
                  >
                    {s.descLines[0]}
                  </span>
                  <br />
                  <span
                    data-fill
                    style={{ ...fillLineStyle, marginLeft: "1.25rem" }}
                    className="text-[15px] text-brand-ink/85"
                  >
                    {s.descLines[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Glass panel */}
        <div
          ref={panelRef}
          className="w-full max-w-[420px] shrink-0 md:w-[300px] lg:w-[340px]"
          style={{
            backgroundColor: "rgba(250, 248, 243, 0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "0.5px solid rgba(255, 255, 255, 0.7)",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 6px 20px -6px rgba(0, 0, 0, 0.22)",
          }}
        >
          <div ref={panelContentRef}>
            <div
              data-panel-bit
              className="font-sans font-medium uppercase text-brand-stormy"
              style={{ fontSize: "11px", letterSpacing: "0.6px" }}
            >
              How we work
            </div>
            <h2
              data-panel-bit
              className="mt-2 font-display font-bold text-brand-charcoal"
              style={{ fontSize: "20px", lineHeight: 1.2 }}
            >
              Strategy first. Execution that compounds.
            </h2>
            <p
              data-panel-bit
              className="mt-3 font-sans text-brand-charcoal/70"
              style={{ fontSize: "13px", lineHeight: 1.55 }}
            >
              AI handles the volume. We direct the thinking. Every plan starts
              with understanding your business — not a template.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                data-panel-bit
                href="#"
                className="inline-flex items-center justify-center rounded-pill bg-brand-raspberry px-5 py-2.5 font-sans text-[13px] font-medium text-white transition-colors hover:bg-brand-berry"
              >
                Get your 90-day plan
              </a>
              <a
                data-panel-bit
                href="#"
                className="inline-flex items-center justify-center rounded-pill px-5 py-2.5 font-sans text-[13px] font-medium text-brand-charcoal transition-colors"
                style={{
                  backgroundColor: "var(--color-brand-cream)",
                  border: "2px solid rgba(26, 26, 26, 0.85)",
                }}
              >
                See our full process
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
