"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Refs = {
  sectionRef: RefObject<HTMLElement | null>;
  deskRef: RefObject<HTMLElement | null>;
  titleRef: RefObject<HTMLElement | null>;
  step1Ref: RefObject<HTMLElement | null>;
  step2Ref: RefObject<HTMLElement | null>;
  step3Ref: RefObject<HTMLElement | null>;
  step4Ref: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  panelContentRef: RefObject<HTMLElement | null>;
};

const HIDDEN_CLIP = "inset(0 100% 0 0)";
const SHOWN_CLIP = "inset(0 0% 0 0)";
const MOBILE_BREAKPOINT = 768;

export function useNotebookFillAnimation(refs: Refs) {
  useEffect(() => {
    const {
      sectionRef,
      deskRef,
      titleRef,
      step1Ref,
      step2Ref,
      step3Ref,
      step4Ref,
      panelRef,
      panelContentRef,
    } = refs;

    const section = sectionRef.current;
    const desk = deskRef.current;
    const title = titleRef.current;
    const panel = panelRef.current;
    const panelContent = panelContentRef.current;
    const steps = [step1Ref, step2Ref, step3Ref, step4Ref]
      .map((r) => r.current)
      .filter(Boolean) as HTMLElement[];

    if (!section || !desk || !title || !panel || !panelContent) return;

    const stepLines = steps.flatMap((step) =>
      Array.from(step.querySelectorAll<HTMLElement>("[data-fill]"))
    );
    const panelBits = panelContent.querySelectorAll<HTMLElement>("[data-panel-bit]");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    ).matches;

    if (reduceMotion || isMobile) {
      gsap.set(desk, { clearProps: "transform" });
      gsap.set([title, ...stepLines], { clipPath: SHOWN_CLIP, opacity: 1 });
      gsap.set(panel, { scale: 1, opacity: 1 });
      gsap.set(panelBits, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(desk, {
        transformOrigin: "50% 50%",
        force3D: true,
        scale: 1.5,
        xPercent: -15,
        yPercent: -5,
      });
      gsap.set([title, ...stepLines], {
        clipPath: HIDDEN_CLIP,
        WebkitClipPath: HIDDEN_CLIP,
        opacity: 1,
      });
      gsap.set(panel, { scale: 0.95, opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(panelBits, { y: 10, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // 0 - 0.15 camera pan/zoom
      tl.to(
        desk,
        {
          scale: 1.75,
          xPercent: -20,
          yPercent: -5,
          duration: 0.15,
          ease: "power2.inOut",
        },
        0
      );

      // 0.15 - 0.20 title
      tl.to(
        title,
        { clipPath: SHOWN_CLIP, WebkitClipPath: SHOWN_CLIP, duration: 0.05 },
        0.15
      );

      // steps: 0.20-0.35, 0.35-0.50, 0.50-0.65, 0.65-0.75
      const stepWindows = [
        [0.2, 0.35],
        [0.35, 0.5],
        [0.5, 0.65],
        [0.65, 0.75],
      ] as const;

      steps.forEach((step, i) => {
        const lines = Array.from(step.querySelectorAll<HTMLElement>("[data-fill]"));
        const [start, end] = stepWindows[i];
        const duration = end - start;
        const perLine = duration / lines.length;
        lines.forEach((line, li) => {
          tl.to(
            line,
            {
              clipPath: SHOWN_CLIP,
              WebkitClipPath: SHOWN_CLIP,
              duration: perLine,
              ease: "none",
            },
            start + li * perLine
          );
        });
      });

      // 0.75 - 0.82 glass panel scale in
      tl.to(panel, { scale: 1, opacity: 1, duration: 0.07, ease: "power2.out" }, 0.75);

      // 0.82 - 0.90 panel content stagger
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

      // 0.90 - 1.0 hold (pin continues, nothing animates)
    }, section);

    return () => ctx.revert();
  }, [refs]);
}
