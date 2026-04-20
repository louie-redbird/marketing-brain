import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";

const NAV_ITEMS = ["Services", "How we work", "About", "Resources"];

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-brand-cream">
      <Image
        src="/images/desk-sorted-master.png"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-center"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-cream/60 to-transparent"
      />

      <nav className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-6">
        <a
          href="#"
          className="font-display text-2xl font-bold italic tracking-tight text-brand-charcoal md:text-[28px]"
        >
          Redbird<span className="text-brand-teal">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6 font-sans text-[15px] text-brand-charcoal/80">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a href="#" className="transition-colors hover:text-brand-charcoal">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-pill bg-brand-raspberry px-5 py-2.5 font-sans text-[14px] font-medium text-white transition-colors hover:bg-brand-berry"
          >
            Get your plan
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex items-center justify-center rounded-full p-2 text-brand-charcoal md:hidden"
        >
          <Menu size={24} strokeWidth={2} />
        </button>
      </nav>

      <div
        className="pointer-events-none absolute inset-x-0 z-10 flex justify-center"
        style={{ top: "56%", transform: "translateY(-50%)" }}
      >
        <div
          className="pointer-events-auto flex w-full max-w-[720px] flex-col items-center px-6 text-center"
          style={{ transform: "translateX(-3%)" }}
        >
          <h1
            className="font-display font-bold tracking-tight text-brand-charcoal text-[42px] leading-[1.05] md:text-[56px] lg:text-[72px]"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
          >
            <span className="block">Your marketing,</span>
            <span className="block">sorted.</span>
          </h1>

          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <a
              href="#"
              className="inline-flex w-full items-center justify-center rounded-pill bg-brand-raspberry px-6 py-3.5 font-sans text-[15px] font-medium text-white transition-colors hover:bg-brand-berry sm:w-auto"
            >
              Get your 90-day plan
            </a>
            <a
              href="#"
              className="inline-flex w-full items-center justify-center rounded-pill px-6 py-3.5 font-sans text-[15px] font-medium text-brand-charcoal transition-colors sm:w-auto"
              style={{
                backgroundColor: "rgba(250, 250, 243, 0.55)",
                border: "2px solid rgba(26, 26, 26, 0.85)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              See how we work
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-2 text-brand-charcoal/90">
        <span
          className="font-sans text-[12px] font-medium uppercase"
          style={{ letterSpacing: "0.8px" }}
        >
          Tour the workspace
        </span>
        <span aria-hidden className="block h-6 w-px bg-brand-charcoal/60" />
        <ChevronDown size={16} strokeWidth={2} className="scroll-cue-chevron" />
      </div>
    </section>
  );
}
