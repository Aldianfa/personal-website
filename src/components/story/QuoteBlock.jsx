function QuoteBlock({ section }) {
  return (
    <blockquote className="relative -mx-2 overflow-hidden rounded-[2rem] bg-accent px-8 py-12 text-center text-white shadow-[0_24px_80px_rgba(0,113,227,0.22)] md:-mx-12 md:px-14 md:py-16">
      <span
        aria-hidden="true"
        className="absolute left-6 top-0 text-8xl leading-none text-white/20 md:text-9xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        "
      </span>
      <p
        className="relative text-3xl leading-tight md:text-5xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        "{section.content}"
      </p>
      {section.metadata?.attribution && (
        <cite className="relative mt-8 block text-sm font-medium not-italic uppercase tracking-[0.18em] text-white/70">
          {section.metadata.attribution}
        </cite>
      )}
    </blockquote>
  )
}

export default QuoteBlock
