"use client";

import { useRef } from "react";
import Image from "next/image";
import { useNotebookFillAnimation } from "@/hooks/useNotebookFillAnimation";

const STEPS = [
  {
    n: "1.",
    name: "Audit",
    desc: "Map your current marketing, customers, and competitors. Find the gaps.",
  },
  {
    n: "2.",
    name: "Strategy",
    desc: "Design a 90-day plan with clear targets and channels. No fluff.",
  },
  {
    n: "3.",
    name: "Build",
    desc: "Execute across SEO, ads, content, email, automation. AI-accelerated.",
  },
  {
    n: "4.",
    name: "Iterate",
    desc: "Measure weekly, optimise monthly, scale what compounds.",
  },
];

const RULED_LINES = `repeating-linear-gradient(
  to bottom,
  transparent 0,
  transparent 31px,
  rgba(110, 140, 155, 0.28) 31px,
  rgba(110, 140, 155, 0.28) 32px
)`;

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const deskRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const step1Ref = useRef<HTMLLIElement | null>(null);
  const step2Ref = useRef<HTMLLIElement | null>(null);
  const step3Ref = useRef<HTMLLIElement | null>(null);
  const step4Ref = useRef<HTMLLIElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelContentRef = useRef<HTMLDivElement | null>(null);

  const stepRefs = [step1Ref, step2Ref, step3Ref, step4Ref];

  useNotebookFillAnimation({
    sectionRef,
    deskRef,
    titleRef,
    step1Ref,
    step2Ref,
    step3Ref,
    step4Ref,
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

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center gap-10 px-6 py-16 md:h-screen md:flex-row md:items-center md:justify-center md:gap-10 md:px-12 lg:gap-16 lg:px-20">
        {/* Styled HTML notebook page */}
        <div
          className="relative w-full max-w-[480px] shrink-0 md:w-[460px] lg:w-[500px]"
          style={{
            transform: "rotate(-2deg)",
            transformOrigin: "center center",
          }}
        >
          <div
            className="relative rounded-[3px] pl-12 pr-8 py-10"
            style={{
              backgroundColor: "#FDFAF0",
              backgroundImage: RULED_LINES,
              backgroundPosition: "0 44px",
              boxShadow:
                "0 18px 40px -12px rgba(0,0,0,0.35), 0 4px 10px -4px rgba(0,0,0,0.2)",
            }}
          >
            {/* Spiral binding */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-4 left-2 flex flex-col items-center justify-between"
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

            <div
              ref={titleRef}
              className="inline-block font-handwriting text-[30px] font-medium leading-none text-brand-ink"
              style={{
                clipPath: "inset(0 0% 0 0)",
                WebkitClipPath: "inset(0 0% 0 0)",
                borderBottom: "2px solid rgba(26,26,46,0.9)",
                paddingBottom: "4px",
              }}
            >
              The Redbird Way
            </div>

            <ol className="mt-6 space-y-5">
              {STEPS.map((s, i) => (
                <li
                  key={s.name}
                  ref={stepRefs[i]}
                  className="font-handwriting leading-tight"
                >
                  <div
                    data-fill
                    className="inline-block text-[22px] text-brand-ink"
                    style={{
                      clipPath: "inset(0 0% 0 0)",
                      WebkitClipPath: "inset(0 0% 0 0)",
                    }}
                  >
                    <span className="font-medium text-brand-raspberry">
                      {s.n}{" "}
                    </span>
                    <span className="font-medium">{s.name}</span>
                  </div>
                  <div
                    data-fill
                    className="mt-1 inline-block pl-5 text-[17px] text-brand-ink/85"
                    style={{
                      clipPath: "inset(0 0% 0 0)",
                      WebkitClipPath: "inset(0 0% 0 0)",
                      lineHeight: 1.35,
                    }}
                  >
                    {s.desc}
                  </div>
                </li>
              ))}
            </ol>
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
