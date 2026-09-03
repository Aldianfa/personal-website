import { useEffect, useState } from 'react'
import { getAllStories } from '../lib/queries'
import StoryCard from '../components/StoryCard'
import TimelineSpine from '../components/story/TimelineSpine'

function Home() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const result = await getAllStories()
      setStories(result)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <p className="text-center py-32 text-muted">Loading...</p>

  if (stories.length === 0) {
    return <p className="text-center py-32 text-muted">No stories published yet.</p>
  }

  return (
    <main className="min-h-screen bg-paper">
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-14 md:pt-28">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Izzul's story archive
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] md:text-7xl">
              A personal journey through healthcare, systems, and technology.
            </h1>
          </div>
          <div className="rounded-3xl bg-panel p-6 text-white md:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-white/45">Current lens</p>
            <p className="mt-4 text-xl leading-relaxed text-white/85">
              I collect the work, decisions, and lessons that shaped how I build, learn,
              and solve problems.
            </p>
            <div className="mt-8 flex gap-3 text-sm text-white/55">
              <span>{stories.length} chapters</span>
              <span>/</span>
              <span>story-first portfolio</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24 md:pb-32">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-muted">Story timeline</p>
            <h2 className="mt-1 text-3xl font-semibold">Chapters worth remembering</h2>
          </div>
        </div>

        <div className="relative">
          <TimelineSpine />
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
