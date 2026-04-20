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
  transparent 31px,
  rgba(110, 140, 155, 0.28) 31px,
  rgba(110, 140, 155, 0.28) 32px
)`;

const fillLineStyle: React.CSSProperties = {
  display: "inline-block",
  overflow: "hidden",
  whiteSpace: "nowrap",
  verticalAlign: "top",
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

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-10 px-6 py-16 md:h-screen md:flex-row md:gap-10 md:px-12 lg:gap-16 lg:px-20">
        {/* Styled HTML notebook page */}
        <div
          className="relative w-full max-w-[500px] shrink-0 md:w-[480px] lg:w-[520px]"
          style={{ transform: "rotate(-2deg)", transformOrigin: "center" }}
        >
          <div
            className="relative rounded-[3px] pl-14 pr-8 py-10"
            style={{
              backgroundColor: "#FDFAF0",
              backgroundImage: RULED_LINES,
              backgroundPosition: "0 48px",
              boxShadow:
                "0 18px 40px -12px rgba(0,0,0,0.35), 0 4px 10px -4px rgba(0,0,0,0.2)",
            }}
          >
            {/* Spiral binding */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-4 left-3 flex flex-col items-center justify-between"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="block h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: "#2a2a2e",
                    boxShadow:
                      "inset 0 -1px 1px rgba(255,255,255,0.25), 0 1px 1px rgba(0,0,0,0.3)",
                  }}
                />
              ))}
            </div>

            {/* Title */}
            <div
              className="font-handwriting text-[30px] font-medium leading-none text-brand-ink"
              style={{
                borderBottom: "2px solid rgba(26,26,46,0.9)",
                paddingBottom: "4px",
                display: "inline-block",
              }}
            >
              <span ref={titleRef} style={fillLineStyle}>
                The Redbird Way
              </span>
            </div>

            {/* Steps */}
            <div ref={stepsContainerRef} className="mt-6 space-y-5">
              {STEPS.map((s) => (
                <div
                  key={s.name}
                  className="font-handwriting leading-tight text-brand-ink"
                >
                  {/* Line 1: number + name */}
                  <span
                    data-fill
                    style={fillLineStyle}
                    className="text-[24px]"
                  >
                    <span className="font-medium text-brand-raspberry">
                      {s.n}
                    </span>{" "}
                    <span className="font-medium">{s.name}</span>
                  </span>
                  <br />
                  {/* Line 2: desc part 1 */}
                  <span
                    data-fill
                    style={{ ...fillLineStyle, marginLeft: "1.5rem" }}
                    className="mt-1 text-[17px] text-brand-ink/85"
                  >
                    {s.descLines[0]}
                  </span>
                  <br />
                  {/* Line 3: desc part 2 */}
                  <span
                    data-fill
                    style={{ ...fillLineStyle, marginLeft: "1.5rem" }}
                    className="text-[17px] text-brand-ink/85"
                  >
                    {s.descLines[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Glass copy panel */}
        <div
          ref={panelRef}
          className="w-full max-w-[420px] shrink-0 md:w-[360px] md:max-w-none"
          style={{
            backgroundColor: "rgba(250, 248, 243, 0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "0.5px solid rgba(255, 255, 255, 0.7)",
            borderRadius: "12px",
            padding: "28px",
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
              style={{ fontSize: "22px", lineHeight: 1.2 }}
            >
              Strategy first. Execution that compounds.
            </h2>
            <p
              data-panel-bit
              className="mt-4 font-sans text-brand-charcoal/70"
              style={{ fontSize: "14px", lineHeight: 1.6 }}
            >
              AI handles the volume. We direct the thinking. Every plan starts
              with understanding your business — not a template.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                data-panel-bit
                href="#"
                className="inline-flex items-center justify-center rounded-pill bg-brand-raspberry px-5 py-3 font-sans text-[14px] font-medium text-white transition-colors hover:bg-brand-berry"
              >
                Get your 90-day plan
              </a>
              <a
                data-panel-bit
                href="#"
                className="inline-flex items-center justify-center rounded-pill px-5 py-3 font-sans text-[14px] font-medium text-brand-charcoal transition-colors"
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
