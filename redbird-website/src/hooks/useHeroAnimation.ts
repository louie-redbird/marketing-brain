"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroRefs = {
  deskImageRef: RefObject<HTMLElement | null>;
  flashRef: RefObject<HTMLElement | null>;
  headlineRef: RefObject<HTMLElement | null>;
  ctasRef: RefObject<HTMLElement | null>;
  scrollCueRef: RefObject<HTMLElement | null>;
};

const CHAOS_FILTER = "hue-rotate(-6deg) saturate(1.2)";
const SETTLE_EASE = "cubic-bezier(.05, .95, .15, 1)";

export function useHeroAnimation({
  deskImageRef,
  flashRef,
  headlineRef,
  ctasRef,
  scrollCueRef,
}: HeroRefs) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const desk = deskImageRef.current;
    const flash = flashRef.current;
    const headline = headlineRef.current;
    const ctas = ctasRef.current;
    const scrollCue = scrollCueRef.current;

    if (!desk || !flash || !headline || !ctas || !scrollCue) return;

    const ctaButtons = ctas.querySelectorAll<HTMLElement>("[data-cta]");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(desk, { scale: 1, filter: "none" });
      gsap.set(flash, { opacity: 0 });
      gsap.set(headline, { opacity: 1, y: 0 });
      gsap.set(ctaButtons, { opacity: 1, y: 0 });
      gsap.set(scrollCue, { opacity: 0.9 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(desk, { scale: 1.04, filter: CHAOS_FILTER });
      gsap.set(flash, { opacity: 0 });
      gsap.set(headline, { opacity: 0, y: 20 });
      gsap.set(ctaButtons, { opacity: 0, y: 15 });
      gsap.set(scrollCue, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.6 });

      tl.to(flash, { opacity: 0.85, duration: 0.08, ease: "power2.out" }, 0)
        .to(flash, { opacity: 0, duration: 0.1, ease: "power2.in" }, 0.08)
        .to(
          desk,
          {
            scale: 1,
            filter: "none",
            duration: 0.5,
            ease: SETTLE_EASE,
          },
          0
        )
        .to(
          headline,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.5
        )
        .to(
          ctaButtons,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.06,
          },
          0.7
        )
        .to(
          scrollCue,
          { opacity: 0.9, duration: 0.3, ease: "power2.out" },
          0.9
        );

      timelineRef.current = tl;
    });

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, [deskImageRef, flashRef, headlineRef, ctasRef, scrollCueRef]);

  const replay = useCallback(() => {
    timelineRef.current?.restart(true);
  }, []);

  return { replay };
}
