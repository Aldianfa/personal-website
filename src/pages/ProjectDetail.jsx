import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import NavBar from '../components/NavBar'
import { getAllProjects } from '../lib/queries'

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

function safeUrl(value) {
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null
  } catch { return null }
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const reduceMotion = useReducedMotion()
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    let cancelled = false
    getAllProjects({ throwOnError: true }).then((data) => {
      if (cancelled) return
      setProjects(data || [])
      setStatus('ready')
    }).catch(() => {
      if (!cancelled) setStatus('error')
    })
    return () => { cancelled = true }
  }, [slug, attempt])

  const ordered = [...projects].sort((a, b) => Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured)))
  const project = ordered.find((item) => item.slug === slug)
  const navigable = ordered.filter((item) => item.slug)
  const next = project && navigable.length > 1 ? navigable[(navigable.findIndex((item) => item.id === project.id) + 1) % navigable.length] : null
  const technologies = [...new Set((project?.project_technologies || []).map((item) => item.technologies?.name).filter(Boolean))]
  const liveUrl = safeUrl(project?.project_url)
  const githubUrl = safeUrl(project?.github_url)

  useEffect(() => {
    const previous = document.title
    document.title = project ? `${project.title} | Izzul` : 'Project | Izzul'
    return () => { document.title = previous }
  }, [project])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <NavBar />
      <main className="mx-auto max-w-6xl px-6 pb-10 pt-12 md:pt-16">
        <Link to="/work" className={`inline-flex min-h-11 items-center gap-2 rounded-full text-sm text-muted transition-colors hover:text-ink ${focus}`}><span aria-hidden="true">&#8592;</span> All work</Link>
        <div aria-live="polite" aria-busy={status === 'loading'}>
          {status === 'loading' ? <div role="status" className="mt-6"><span className="sr-only">Loading project...</span><div aria-hidden="true" className="animate-pulse space-y-5 motion-reduce:animate-none"><div className="h-10 w-2/3 rounded-xl bg-surface" /><div className="h-5 w-1/2 rounded-lg bg-surface" /><div className="aspect-[16/8] rounded-[2rem] bg-surface" /></div></div>
            : status === 'error' ? <section className="mt-6 rounded-[2rem] bg-surface p-10 text-center"><h1 className="text-2xl font-semibold">Project could not load.</h1><p className="mt-3 text-sm text-muted">Please try again in a moment.</p><button type="button" onClick={() => { setStatus('loading'); setAttempt((value) => value + 1) }} className={`mt-6 min-h-11 rounded-full bg-accent px-6 text-sm text-white ${focus}`}>Try again</button></section>
              : !project ? <section className="mt-6 rounded-[2rem] bg-surface p-10 text-center"><h1 className="text-2xl font-semibold">Project not found.</h1><p className="mt-3 text-sm text-muted">This project may no longer be published.</p><Link to="/work" className={`mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm text-white ${focus}`}>Explore the work</Link></section>
                : <motion.article initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35 }}>
                  <header className="py-6 md:pb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Selected work{project.year ? ` / ${project.year}` : ''}</p>
                    <h1 className="mt-4 max-w-4xl break-words text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{project.title}</h1>
                    {project.summary && <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">{project.summary}</p>}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      {technologies.length > 0 && <ul aria-label="Technologies" className="flex flex-wrap gap-2">{technologies.map((name) => <li key={name} className="rounded-lg border border-black/[0.04] bg-surface px-3 py-2 text-xs text-ink/70">{name}</li>)}</ul>}
                      {(liveUrl || githubUrl) && <div className="flex flex-wrap gap-3">{liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-white hover:bg-accent/85 ${focus}`}>Visit project <span className="ml-2" aria-hidden="true">&#8599;</span><span className="sr-only"> (opens in a new tab)</span></a>}{githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center rounded-full bg-surface px-5 text-sm font-semibold hover:bg-ink/10 ${focus}`}>Source code <span className="ml-2" aria-hidden="true">&#8599;</span><span className="sr-only"> (opens in a new tab)</span></a>}</div>}
                    </div>
                  </header>
                  <figure className="flex min-h-56 items-center justify-center overflow-hidden rounded-[2rem] bg-surface p-5 md:p-8">
                    {project.cover_image && !imageFailed ? <img src={project.cover_image} alt={`${project.title} preview`} onError={() => setImageFailed(true)} className="max-h-[32rem] w-full rounded-xl object-contain" /> : <figcaption className="py-14 text-center text-sm text-muted">Project preview coming soon.</figcaption>}
                  </figure>
                  {project.description && <section className="grid gap-5 py-8 md:grid-cols-[1fr_2fr] md:py-10" aria-labelledby="project-overview"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Behind the build</p><h2 id="project-overview" className="mt-2 text-2xl font-semibold tracking-tight">Project overview</h2></div><div className="space-y-4 text-sm leading-7 text-ink/75 md:text-base">{project.description.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index} className="whitespace-pre-line break-words">{paragraph}</p>)}</div></section>}
                  {next && <Link to={`/work/${encodeURIComponent(next.slug)}`} className={`mt-6 flex items-center justify-between gap-4 rounded-[2rem] bg-surface p-6 transition-colors hover:bg-ink/[0.08] ${focus}`}><span><span className="block text-xs text-muted">Next project</span><span className="mt-2 block text-xl font-semibold tracking-tight">{next.title}</span></span><span aria-hidden="true" className="text-2xl">&#8594;</span></Link>}
                </motion.article>}
        </div>
      </main>
    </div>
  )
}
