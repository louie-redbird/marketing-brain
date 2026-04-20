export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-brand-cream text-brand-charcoal">
      <header className="px-6 pt-6 sm:px-10 sm:pt-8">
        <span className="font-display text-2xl font-bold italic tracking-tight text-brand-charcoal sm:text-3xl">
          Redbird<span className="text-brand-teal">.</span>
        </span>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-[48px] font-bold leading-[1.05] tracking-tight text-brand-charcoal sm:text-[64px] md:text-[72px]">
          Your marketing, sorted.
        </h1>

        <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-brand-charcoal/70">
          AI-powered marketing for Australian SMEs.
        </p>

        <div className="mt-10 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <a
            href="#"
            className="inline-flex w-full items-center justify-center rounded-pill bg-brand-raspberry px-6 py-3 font-sans text-[15px] font-medium text-white transition-colors hover:bg-brand-berry sm:w-auto"
          >
            Get your 90-day plan
          </a>
          <a
            href="#"
            className="inline-flex w-full items-center justify-center rounded-pill border border-brand-charcoal bg-brand-cream px-6 py-3 font-sans text-[15px] font-medium text-brand-charcoal transition-colors hover:bg-brand-charcoal/5 sm:w-auto"
          >
            See how we work
          </a>
        </div>

        <p className="mt-8 -ml-6 font-handwriting text-[32px] leading-none text-brand-ink sm:-ml-10">
          — Louie
        </p>
      </main>
    </div>
  );
}
