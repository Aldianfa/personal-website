import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import NavBar from '../components/NavBar'
import './Work.css'
import { getAllProjects } from '../lib/queries'

const MotionLink = motion.create(Link)

const focusStyle = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4"><path d="M6 18 18 6M6 6h12v12" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function externalUrl(value) {
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null
  } catch { return null }
}

function ProjectCard({ project, index }) {
  const [failedImage, setFailedImage] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const reduceMotion = useReducedMotion()
  const liveUrl = externalUrl(project.project_url)
  const githubUrl = externalUrl(project.github_url)
  const primaryUrl = project.slug ? `/work/${encodeURIComponent(project.slug)}` : null
  const active = hovered || focused
  const animatedArrow = (
    <motion.span
      className="work-arrow-icon"
      animate={active && !reduceMotion
        ? { x: [0, 24, -24, 3], y: [0, -24, 24, -3], opacity: [1, 0, 0, 1] }
        : { x: 0, y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, times: [0, 0.44, 0.45, 1], ease: [0.22, 1, 0.36, 1] }}
    ><Arrow /></motion.span>
  )

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -5, transition: { type: 'spring', stiffness: 260, damping: 24 } }}
      transition={{ duration: 0.3, delay: reduceMotion ? 0 : Math.min(index, 5) * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
      className="work-card group"
    >
      <div className="work-card-header">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-[28px]">{project.title}</h2>
          {project.summary && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60 md:text-lg">{project.summary}</p>}
        </div>
        {primaryUrl ? <MotionLink
          to={primaryUrl}
          aria-label={`Read about ${project.title}`}
          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 350, damping: 24 }}
          className={`work-card-arrow ${focusStyle}`}
        >{animatedArrow}</MotionLink> : <span className="work-card-arrow" role="link" aria-disabled="true" aria-label="Project link not available" title="Project link not available">{animatedArrow}</span>}
      </div>
      <motion.div
        className="work-preview"
      >
        {project.cover_image && !failedImage ? <img
          src={project.cover_image} alt={`${project.title} preview`}
          loading={index < 2 ? 'eager' : 'lazy'} decoding="async"
          onError={() => setFailedImage(true)}
          
        /> : <div className="work-preview-empty">
          <svg aria-hidden="true" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="12" width="48" height="40" rx="6" /><path d="M8 23h48M15 18h2m4 0h2M18 43l10-10 8 7 6-5 6 8" /></svg>
          <span className="text-xs text-muted">Preview coming soon</span>
        </div>}
        {liveUrl && githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={`work-source ${focusStyle}`} aria-label={`${project.title} source code (opens in a new tab)`}>Source code</a>}
      </motion.div>
    </motion.article>
  )
}

export default function Work() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const data = await getAllProjects({ throwOnError: true })
        if (!cancelled) setProjects(data || [])
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [attempt])

  const orderedProjects = [...projects].sort((a, b) => Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured)))

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent/15 selection:text-accent">
      <NavBar />
      <main id="main-content">
        <h1 className="sr-only">Selected work by Izzul</h1>
        <section id="projects" aria-label="Portfolio projects" className="work-gallery">
          <div className="work-gallery-inner">
            <p className="work-hint"><Arrow /> Explore the work...</p>
            <div aria-live="polite" aria-busy={loading}>
              {loading ? <>
                <p className="sr-only">Loading projects…</p>
                <div aria-hidden="true" className="work-grid">{[0, 1].map((item) => <div key={item} className="animate-pulse overflow-hidden rounded-[2rem] border border-black/[0.04] bg-surface motion-reduce:animate-none"><div className="h-28 border-b border-black/5" /><div className="aspect-[6/5] bg-ink/[0.03]" /><div className="space-y-4 p-5"><div className="h-5 w-1/2 rounded bg-black/5" /><div className="h-3 w-3/4 rounded bg-black/5" /></div></div>)}</div>
              </> : error ? <div className="rounded-[2rem] border border-black/[0.04] bg-surface px-6 py-12 text-center"><h3 className="text-xl font-semibold">The work couldn’t load.</h3><p className="mt-3 text-sm text-ink/65">Please try again in a moment.</p><button type="button" onClick={() => { setLoading(true); setError(false); setAttempt((value) => value + 1) }} className={`mt-6 min-h-11 cursor-pointer rounded-full bg-accent px-6 text-sm font-medium text-white ${focusStyle}`}>Try again</button></div>
                : projects.length === 0 ? <div className="rounded-[2rem] border border-black/[0.04] bg-surface px-6 py-12 text-center"><p className="text-xs font-semibold uppercase tracking-widest text-accent">A little more soon</p><h3 className="mt-4 text-2xl font-semibold tracking-tight">Good work takes shape.</h3><p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink/65">Projects will appear here as they’re published. In the meantime, explore the stories behind my journey.</p><Link to="/stories" className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-accent ${focusStyle}`}>Explore stories <Arrow /></Link></div>
                  : <div className="work-grid">{orderedProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>}
            </div>
          </div>
        </section>

      </main>

    </div>
  )
}
