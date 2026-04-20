"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Refs = {
  sectionRef: RefObject<HTMLElement | null>;
  deskRef: RefObject<HTMLElement | null>;
  titleRef: RefObject<HTMLElement | null>;
  stepsContainerRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  panelContentRef: RefObject<HTMLElement | null>;
};

const MOBILE_BREAKPOINT = 768;
const DEV = process.env.NODE_ENV === "development";
// Flip to false once the section is confirmed working end-to-end.
const SHOW_MARKERS = DEV;

export function useNotebookFillAnimation({
  sectionRef,
  deskRef,
  titleRef,
  stepsContainerRef,
  panelRef,
  panelContentRef,
}: Refs) {
  useEffect(() => {
    const section = sectionRef.current;
    const desk = deskRef.current;
    const title = titleRef.current;
    const stepsContainer = stepsContainerRef.current;
    const panel = panelRef.current;
    const panelContent = panelContentRef.current;

    if (!section || !desk || !title || !stepsContainer || !panel || !panelContent) {
      if (DEV) console.warn("[s2] missing refs, skipping animation setup");
      return;
    }

    const stepLines = Array.from(
      stepsContainer.querySelectorAll<HTMLElement>("[data-fill]")
    );
    const panelBits =
      panelContent.querySelectorAll<HTMLElement>("[data-panel-bit]");

    const fillTargets = [title, ...stepLines];

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    ).matches;

    if (reduceMotion || isMobile) {
      fillTargets.forEach((el) => (el.style.width = "auto"));
      gsap.set(panel, { opacity: 1 });
      gsap.set(panelBits, { y: 0, opacity: 1 });
      if (DEV) console.log("[s2] reduced-motion or mobile, skipping pin");
      return;
    }

    // Measure natural widths before hiding
    const naturalWidths = new Map<HTMLElement, number>();
    fillTargets.forEach((el) => {
      el.style.width = "auto";
      naturalWidths.set(el, el.scrollWidth);
    });

    if (DEV) {
      const widthDump = fillTargets.map((el) => [
        el.textContent?.trim().slice(0, 30),
        naturalWidths.get(el),
      ]);
      console.log("[s2] measured widths:", widthDump);
      console.log("[s2] fillTargets count:", fillTargets.length, "panelBits:", panelBits.length);
    }

    const ctx = gsap.context(() => {
      gsap.set(desk, {
        transformOrigin: "50% 50%",
        force3D: true,
        scale: 1.1,
      });
      fillTargets.forEach((el) => {
        gsap.set(el, { width: 0 });
      });
      // Panel: opacity only. Scaling a backdrop-filter element creates
      // composite bugs in some browsers — stick to opacity.
      gsap.set(panel, { opacity: 0 });
      gsap.set(panelBits, { y: 8, opacity: 0 });

      let lastBucket = -1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          markers: SHOW_MARKERS,
          onUpdate: DEV
            ? (self) => {
                const bucket = Math.floor(self.progress * 10);
                if (bucket !== lastBucket) {
                  lastBucket = bucket;
                  console.log(
                    `[s2] scroll ${bucket * 10}% | panel opacity:`,
                    Number(gsap.getProperty(panel, "opacity")).toFixed(2)
                  );
                }
              }
            : undefined,
        },
      });

      // 0.00 - 0.12: camera zoom into empty centre
      tl.to(desk, { scale: 1.3, duration: 0.12, ease: "power2.inOut" }, 0);

      // 0.12 - 0.18: title reveal
      tl.to(
        title,
        { width: naturalWidths.get(title) ?? 0, duration: 0.06, ease: "none" },
        0.12
      );

      // Steps: 0.18-0.33, 0.33-0.45, 0.45-0.55, 0.55-0.62 (end by 0.62)
      const stepWindows = [
        [0.18, 0.33],
        [0.33, 0.45],
        [0.45, 0.55],
        [0.55, 0.62],
      ] as const;

      const linesPerStep = 3;
      stepWindows.forEach(([start, end], stepIndex) => {
        const lines = stepLines.slice(
          stepIndex * linesPerStep,
          (stepIndex + 1) * linesPerStep
        );
        const perLine = (end - start) / lines.length;
        lines.forEach((line, li) => {
          tl.to(
            line,
            {
              width: naturalWidths.get(line) ?? 0,
              duration: perLine,
              ease: "none",
            },
            start + li * perLine
          );
        });
      });

      // 0.62 - 0.72: glass panel fades in (well within scroll range)
      tl.to(panel, { opacity: 1, duration: 0.1, ease: "power2.out" }, 0.62);

      // 0.72 - 0.90: panel content staggered
      tl.to(
        panelBits,
        {
          y: 0,
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
          stagger: 0.03,
        },
        0.72
      );

      // 0.90 - 1.00: reader hold (no tweens; pin continues)
      tl.to({}, { duration: 0.1 }, 0.9);

      if (DEV) {
        console.log(
          "[s2] ScrollTrigger registered:",
          ScrollTrigger.getAll().length,
          "| timeline duration:",
          tl.duration().toFixed(3)
        );
      }
    }, section);

    ScrollTrigger.refresh();

    return () => {
      try {
        ctx.revert();
      } catch (err) {
        if (DEV) console.warn("[s2] cleanup error (non-fatal):", err);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
