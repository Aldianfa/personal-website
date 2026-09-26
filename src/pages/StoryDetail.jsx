import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStoryBySlug, getAllStories } from '../lib/queries'
import NavBar from '../components/NavBar'
import StorySection from '../components/story/StorySection'

function MetadataChips({ story }) {
  const chips = [
    story.period_label,
    story.category,
    story.role,
    story.organization,
    story.location,
  ].filter(Boolean)

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm text-ink/70 backdrop-blur"
        >
          {chip}
        </span>
      ))}
    </div>
  )
}

function StoryDetail() {
  const { slug } = useParams()
  const [story, setStory] = useState(null)
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    window.scrollTo({ top: 0, behavior: 'instant' })
    async function fetchData() {
      setLoading(true)
      const [storyResult, chaptersResult] = await Promise.allSettled([
        getStoryBySlug(slug),
        getAllStories(),
      ])
      if (cancelled) return
      setStory(storyResult.status === 'fulfilled' ? storyResult.value : null)
      setChapters(chaptersResult.status === 'fulfilled' ? chaptersResult.value : [])
      setLoading(false)
    }
    fetchData()
    return () => { cancelled = true }
  }, [slug])

  if (loading || !story) return (
    <main className="min-h-screen bg-paper">
      <NavBar />
      <div className="px-6 py-32 text-center">
        <p role="status" className="text-muted">{loading ? 'Loading chapter...' : 'This chapter could not be loaded.'}</p>
        <Link to="/stories" className="mt-6 inline-block text-sm text-accent hover:underline">Back to all stories</Link>
      </div>
    </main>
  )

  const chapterIndex = chapters.findIndex((chapter) => chapter.slug === slug)
  const previousChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null
  const nextChapter = chapterIndex >= 0 ? chapters[chapterIndex + 1] : null

  const sections = story.story_sections || []

  return (
    <article className="min-h-screen bg-paper">
      <NavBar />
      <section className="px-6 pt-8 pb-16 md:pt-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/stories"
            className="inline-flex items-center rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink/70 transition hover:border-accent/40 hover:text-accent"
          >
            Back to all stories
          </Link>

          <header className="mt-10 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              {(story.year || story.period_label) && (
                <p
                  className="text-7xl leading-none text-accent md:text-8xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {story.year || story.period_label}
                </p>
              )}
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.02] md:text-6xl">
                {story.title}
              </h1>
            </div>

            <div className="space-y-6">
              {story.short_summary && (
                <p className="text-xl leading-relaxed text-ink/75 md:text-2xl">
                  {story.short_summary}
                </p>
              )}
              <MetadataChips story={story} />
            </div>
          </header>

          {story.cover_image && (
            <div className="mt-14 overflow-hidden rounded-[2rem] bg-surface shadow-[0_30px_120px_rgba(29,29,31,0.16)]">
              <img
                src={story.cover_image}
                alt={story.title}
                className="h-[42vh] min-h-72 w-full object-cover md:h-[62vh]"
              />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 md:pb-32">
        <div className="space-y-28 md:space-y-36">
          {sections.map((section) => (
            <StorySection key={section.id} section={section} />
          ))}
        </div>
      </section>
      <nav aria-label="Chapter navigation" className="mx-auto max-w-3xl px-6 pb-20">
        <div className="border-t border-ink/10 pt-8">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Continue the journey</p>
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            {previousChapter && (
              <Link to={`/story/${previousChapter.slug}`} rel="prev" className="group min-w-0 flex-1 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                <span className="text-xs text-accent">Previous chapter</span>
                <span className="mt-2 block break-words text-lg font-semibold transition-colors group-hover:text-accent">{previousChapter.title}</span>
              </Link>
            )}
            {nextChapter && (
              <Link to={`/story/${nextChapter.slug}`} rel="next" className="group min-w-0 flex-1 rounded-lg sm:text-right focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                <span className="text-xs text-accent">Next chapter</span>
                <span className="mt-2 block break-words text-lg font-semibold transition-colors group-hover:text-accent">{nextChapter.title}</span>
              </Link>
            )}
          </div>
          <Link to="/stories" className="mt-8 inline-block text-sm text-accent hover:underline">All chapters</Link>
        </div>
      </nav>
    </article>
  )
}

export default StoryDetail
