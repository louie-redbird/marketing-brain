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
      gsap.set(desk, { clearProps: "transform" });
      fillTargets.forEach((el) => {
        el.style.width = "auto";
      });
      gsap.set(panel, { scale: 1, opacity: 1 });
      gsap.set(panelBits, { y: 0, opacity: 1 });
      if (DEV) console.log("[s2] reduced-motion or mobile, skipping scroll pin");
      return;
    }

    // Measure natural width of each fill line before hiding
    const naturalWidths = new Map<HTMLElement, number>();
    fillTargets.forEach((el) => {
      // Force single-line measurement
      el.style.width = "auto";
      naturalWidths.set(el, el.scrollWidth);
    });

    const ctx = gsap.context(() => {
      gsap.set(desk, {
        transformOrigin: "50% 50%",
        force3D: true,
        scale: 1.1,
      });
      fillTargets.forEach((el) => {
        gsap.set(el, { width: 0 });
      });
      gsap.set(panel, { scale: 0.95, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(panelBits, { y: 10, opacity: 0 });

      if (DEV) console.log("[s2] initial state applied, natural widths:", naturalWidths);

      let lastBucket = -1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: DEV
            ? (self) => {
                const bucket = Math.floor(self.progress * 10);
                if (bucket !== lastBucket) {
                  lastBucket = bucket;
                  console.log(
                    `[s2] scroll progress ~${bucket * 10}%`,
                    `panel opacity:`,
                    gsap.getProperty(panel, "opacity")
                  );
                }
              }
            : undefined,
        },
      });

      // 0 - 0.15 camera zoom into empty centre
      tl.to(
        desk,
        { scale: 1.3, duration: 0.15, ease: "power2.inOut" },
        0
      );

      // 0.15 - 0.20 title fill
      tl.to(
        title,
        { width: naturalWidths.get(title) ?? 0, duration: 0.05, ease: "none" },
        0.15
      );
      if (DEV) tl.call(() => console.log("[s2] title fill start"), [], 0.15);

      // Steps: 0.20-0.35, 0.35-0.50, 0.50-0.65, 0.65-0.75
      const stepWindows = [
        [0.2, 0.35],
        [0.35, 0.5],
        [0.5, 0.65],
        [0.65, 0.75],
      ] as const;

      const stepLinesPerStep = 3; // number + name on line 1 = 1 line, desc = 2 lines → 3 per step
      stepWindows.forEach(([start, end], stepIndex) => {
        const lines = stepLines.slice(
          stepIndex * stepLinesPerStep,
          (stepIndex + 1) * stepLinesPerStep
        );
        const perLine = (end - start) / lines.length;
        lines.forEach((line, li) => {
          const targetWidth = naturalWidths.get(line) ?? 0;
          tl.to(
            line,
            { width: targetWidth, duration: perLine, ease: "none" },
            start + li * perLine
          );
        });
        if (DEV)
          tl.call(
            () => console.log(`[s2] step ${stepIndex + 1} fill start`),
            [],
            start
          );
      });

      // 0.75 - 0.82 glass panel
      tl.to(
        panel,
        { scale: 1, opacity: 1, duration: 0.07, ease: "power2.out" },
        0.75
      );
      if (DEV)
        tl.call(() => console.log("[s2] panel visible"), [], 0.75);

      // 0.82 - 0.90 panel content
      tl.to(
        panelBits,
        {
          y: 0,
          opacity: 1,
          duration: 0.08,
          ease: "power2.out",
          stagger: 0.015,
        },
        0.82
      );
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
