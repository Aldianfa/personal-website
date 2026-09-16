import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStoryBySlug } from '../lib/queries'
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const result = await getStoryBySlug(slug)
      setStory(result)
      setLoading(false)
    }
    fetchData()
  }, [slug])

  if (loading) return <p className="text-center py-32 text-muted">Loading...</p>
  if (!story) return <p className="text-center py-32 text-muted">Story not found.</p>

  const sections = story.story_sections || []

  return (
    <article className="min-h-screen bg-paper">
      <NavBar />
      <section className="px-6 pt-8 pb-16 md:pt-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
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
    </article>
  )
}

export default StoryDetail
