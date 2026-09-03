function StatBlock({ section }) {
  const items = section.metadata?.items || []

  if (items.length === 0) return null

  return (
    <div className="-mx-6 overflow-hidden rounded-[2rem] bg-panel px-6 py-10 text-white shadow-[0_28px_90px_rgba(29,29,31,0.2)] md:-mx-16 md:px-12 md:py-14">
      {section.heading && (
        <h3 className="mb-10 text-center text-sm font-medium uppercase tracking-[0.2em] text-white/50">
          {section.heading}
        </h3>
      )}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item, idx) => (
          <div key={idx} className="bg-panel p-7 text-center">
            <div
              className="mb-3 text-5xl leading-none text-white md:text-6xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {item.value}
            </div>
            <div className="text-sm font-medium text-white/70">{item.label}</div>
            {item.description && (
              <p className="mt-3 text-xs leading-relaxed text-white/45">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatBlock
