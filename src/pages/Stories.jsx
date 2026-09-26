import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { getAllStories } from '../lib/queries'

function Stories() {
  const reduceMotion = useReducedMotion()
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    window.scrollTo({ top: 0, behavior: 'instant' })
    async function loadStories() {
      try {
        const result = await getAllStories({ throwOnError: true })
        if (!cancelled) setStories(result)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadStories()
    return () => { cancelled = true }
  }, [attempt])

  return (
    <main className="min-h-screen bg-paper pb-20 text-ink">
      <NavBar />
      <section className="mx-auto max-w-5xl px-4 pt-12 md:px-6 md:pt-16" aria-labelledby="stories-heading">
        <header className="mb-16 max-w-3xl md:mb-24">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">A journal by Izzul</p>
          <h1 id="stories-heading" className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">Every chapter shaped the next.</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">The work, the experiments, and the decisions along the way. These are the stories behind what I build and how I think.</p>
        </header>
        <div aria-live="polite" aria-busy={loading}>
          {loading ? (
            <>
              <p className="sr-only">Loading stories...</p>
              <div className="space-y-12 border-l border-ink/10 pl-6 md:ml-36 md:pl-10" aria-hidden="true">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-48 animate-pulse border-b border-ink/10 pb-8 motion-reduce:animate-none">
                    <div className="h-4 w-20 rounded-full bg-black/10" />
                    <div className="mt-4 h-6 w-3/4 rounded-lg bg-black/10" />
                    <div className="mt-3 h-3 w-full rounded bg-black/5" />
                    <div className="mt-2 h-3 w-2/3 rounded bg-black/5" />
                  </div>
                ))}
              </div>
            </>
          ) : error ? (
            <div className="border-y border-ink/10 py-12 text-center">
              <p className="text-sm text-muted">Stories could not be loaded. Please try again.</p>
              <button type="button" onClick={() => { setError(false); setLoading(true); setAttempt((value) => value + 1) }} className="mt-4 cursor-pointer rounded-full bg-accent px-4 py-2 text-sm text-white hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Try again</button>
            </div>
          ) : stories.length === 0 ? (
            <p className="border-y border-ink/10 py-12 text-center text-sm text-muted">No story logs published yet.</p>
          ) : (
            <>
              <div className="mb-10 flex items-center justify-between border-b border-ink/10 pb-4 text-xs text-muted">
                <span className="uppercase tracking-[0.16em]">The chapters</span>
                <span>{stories.length} {stories.length === 1 ? 'story' : 'stories'}</span>
              </div>
              <ol className="relative ml-2 border-l border-ink/15 md:ml-36">
                {stories.map((story, index) => (
                  <li key={story.id} className="relative pb-16 pl-6 last:pb-4 md:pb-24 md:pl-12">
                    <span className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-accent ring-4 ring-paper" aria-hidden="true" />
                    <div className="mb-4 md:absolute md:-left-36 md:top-0 md:w-28 md:pr-3 md:text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">Chapter {String(index + 1).padStart(2, '0')}</p>
                      {(story.period_label || story.year) && <p className="mt-2 text-sm font-semibold text-ink">{story.period_label || story.year}</p>}
                    </div>
                    <motion.article
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: reduceMotion ? 0 : 0.45 }}
                    >
                      <Link to={`/story/${story.slug}`} className="group block min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent">
                        {story.category && <p className="mb-3 text-xs font-medium text-accent">{story.category}</p>}
                        <h2 className="break-words text-2xl font-semibold leading-tight tracking-tight transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent md:text-4xl">{story.title}</h2>
                        {story.short_summary && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{story.short_summary}</p>}
                        {story.cover_image && (
                          <img src={story.cover_image} alt={story.title} loading="lazy" className="mt-6 aspect-[16/9] w-full rounded-2xl bg-surface object-cover" />
                        )}
                        <span className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-accent">
                          Read chapter
                          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
                        </span>
                      </Link>
                    </motion.article>
                  </li>
                ))}
              </ol>
              <p className="mt-12 border-t border-ink/10 pt-6 text-sm text-muted md:ml-36">The story is still being written.</p>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Stories
