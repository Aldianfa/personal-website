import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function StoryCard({ story, index = 0 }) {
  const hasImage = Boolean(story.cover_image)
  const chapterNumber = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.05, 0.2),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <Link
        to={`/story/${story.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.03)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] md:p-7"
      >
        <div>
          {/* Top Apple Meta Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                CH {chapterNumber}
              </span>
              {story.period_label && (
                <span className="rounded-full bg-black/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-ink/70">
                  {story.period_label}
                </span>
              )}
              {story.category && (
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                  {story.category}
                </span>
              )}
            </div>

            {story.is_featured && (
              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Featured
              </span>
            )}
          </div>

          {/* Title & Excerpt */}
          <h3 className="mt-4 text-xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-2xl">
            {story.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
            {story.short_summary}
          </p>
        </div>

        {/* Media Thumbnail */}
        {hasImage && (
          <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/[0.04] bg-[#F5F5F7]">
            <img
              src={story.cover_image}
              alt={story.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Apple Arrow Action Bar */}
        <div className="mt-5 flex items-center justify-between border-t border-black/[0.04] pt-4">
          <span className="text-xs font-semibold text-muted transition-colors group-hover:text-ink">
            Read chapter
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F7] text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-white group-hover:translate-x-1">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default StoryCard
