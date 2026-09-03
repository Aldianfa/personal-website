import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function StoryCard({ story, index = 0 }) {
  const hasImage = Boolean(story.cover_image)

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.2), ease: [0.4, 0.0, 0.2, 1] }}
      className="relative pl-10 pb-14 last:pb-0 md:pl-12"
    >
      <span
        className={`absolute left-0 top-3 -translate-x-1/2 rounded-full ring-8 ring-paper ${
          story.is_featured ? 'h-5 w-5 bg-panel' : 'h-3 w-3 bg-accent'
        }`}
      />

      <Link
        to={`/story/${story.slug}`}
        className={`group block overflow-hidden rounded-3xl border border-ink/10 bg-white transition duration-500 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_24px_80px_rgba(29,29,31,0.12)] ${
          story.is_featured ? 'ring-1 ring-accent/25' : ''
        }`}
      >
        <div className={hasImage ? 'p-5 pb-0' : 'p-6 md:p-8'}>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
            {story.period_label && <span>{story.period_label}</span>}
            {story.category && (
              <>
                <span className="text-ink/25">/</span>
                <span>{story.category}</span>
              </>
            )}
            {story.is_featured && (
              <span className="rounded-full bg-accent/10 px-3 py-1 text-accent normal-case tracking-normal">
                Featured
              </span>
            )}
          </div>

          <h3 className="mt-4 text-2xl font-semibold leading-tight transition-colors group-hover:text-accent md:text-3xl">
            {story.title}
          </h3>
          <p className="mt-3 text-muted leading-relaxed">{story.short_summary}</p>
        </div>

        {hasImage && (
          <div className="m-5 mt-6 overflow-hidden rounded-2xl bg-surface aspect-[16/9]">
            <img
              src={story.cover_image}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
    </motion.div>
  )
}

export default StoryCard
