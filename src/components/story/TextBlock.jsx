function TextBlock({ section }) {
  const alignments = {
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
    left: 'text-left',
  }
  const align = alignments[section.metadata?.text_align] || alignments.left

  return (
    <div className={`max-w-2xl ${align}`}>
      {section.heading && (
        <h3 className="mb-4 text-2xl font-semibold leading-tight md:text-3xl">
          {section.heading}
        </h3>
      )}
      <p className="text-lg leading-8 text-ink/80 md:text-xl md:leading-9">
        {section.content}
      </p>
    </div>
  )
}

export default TextBlock
