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
      fillTargets.forEach((el) => (el.style.width = "auto"));
      gsap.set(panel, { scale: 1, opacity: 1 });
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

      if (DEV) console.log("[s2] initial state applied");

      let lastBucket = -1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          markers: DEV,
          onUpdate: DEV
            ? (self) => {
                const bucket = Math.floor(self.progress * 10);
                if (bucket !== lastBucket) {
                  lastBucket = bucket;
                  console.log(
                    `[s2] scroll progress ~${bucket * 10}%`,
                    "panel opacity:",
                    gsap.getProperty(panel, "opacity")
                  );
                }
              }
            : undefined,
        },
      });

      tl.to(
        desk,
        { scale: 1.3, duration: 0.15, ease: "power2.inOut" },
        0
      );

      tl.to(
        title,
        { width: naturalWidths.get(title) ?? 0, duration: 0.05, ease: "none" },
        0.15
      );

      const stepWindows = [
        [0.2, 0.35],
        [0.35, 0.5],
        [0.5, 0.65],
        [0.65, 0.75],
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

      tl.to(
        panel,
        { scale: 1, opacity: 1, duration: 0.07, ease: "power2.out" },
        0.75
      );

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

      if (DEV) {
        console.log(
          "[s2] ScrollTrigger registered:",
          ScrollTrigger.getAll().length,
          "instances"
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
