function ImageBlock({ section }) {
  const alt = section.metadata?.alt || section.caption || 'Story image'
  const layout = section.metadata?.layout || 'full'

  if (!section.media_url) return null

  if (layout === 'side') {
    return (
      <figure className="grid gap-6 rounded-[2rem] bg-surface p-4 md:-mx-16 md:grid-cols-[0.95fr_1fr] md:items-center md:p-6">
        <div className="overflow-hidden rounded-3xl bg-white">
          <img src={section.media_url} alt={alt} className="h-full w-full object-cover" />
        </div>
        <div className="px-2 pb-2 md:px-4 md:pb-0">
          {section.heading && (
            <h3 className="text-2xl font-semibold leading-tight md:text-3xl">
              {section.heading}
            </h3>
          )}
          {section.caption && (
            <figcaption className="mt-4 text-sm leading-relaxed text-muted">
              {section.caption}
            </figcaption>
          )}
        </div>
      </figure>
    )
  }

  return (
    <figure className="-mx-6 md:-mx-24">
      {section.heading && (
        <h3 className="mx-auto mb-5 max-w-3xl px-6 text-2xl font-semibold leading-tight md:text-3xl">
          {section.heading}
        </h3>
      )}
      <div className="overflow-hidden bg-surface md:rounded-[2rem]">
        <img src={section.media_url} alt={alt} className="w-full object-cover" />
      </div>
      {section.caption && (
        <figcaption className="mx-auto mt-4 max-w-2xl px-6 text-center text-sm leading-relaxed text-muted">
          {section.caption}
        </figcaption>
      )}
    </figure>
  )
}

export default ImageBlock
