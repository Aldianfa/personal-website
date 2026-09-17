import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllStories, getFeaturedProject } from '../lib/queries'
import NavBar from '../components/NavBar'

function BentoCard({
  children,
  className = '',
  cardClassName = '',
  to,
  href,
  target,
  download,
  delay = 0,
}) {
  const cardClasses = `group relative block h-full w-full overflow-hidden rounded-[2rem] bg-surface transition duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(29,29,31,0.1)] ${cardClassName}`
  const motionProps = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    className: `h-full ${className}`,
  }

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className={cardClasses}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    const isExternal = href.startsWith('http') || target === '_blank'
    return (
      <motion.div {...motionProps}>
        <a
          href={href}
          download={download}
          target={target || (isExternal ? '_blank' : undefined)}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className={cardClasses}
        >
          {children}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.div {...motionProps}>
      <div className={cardClasses}>{children}</div>
    </motion.div>
  )
}

const TECH_ITEMS = [
  {
    name: 'PHP',
    category: 'Backend Core',
    color: '#777BB4',
    bg: 'bg-[#777BB4]/10 text-[#777BB4]',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 13.5h-1.5l1.2-5.4h2.4c1.2 0 1.9.6 1.7 1.8-.2 1.4-1.3 2.1-2.5 2.1h-1l-.3 1.5zm6 0h-1.5l1.2-5.4h2.4c1.2 0 1.9.6 1.7 1.8-.2 1.4-1.3 2.1-2.5 2.1h-1l-.3 1.5z" />
      </svg>
    ),
  },
  {
    name: 'Laravel',
    category: 'Framework & API',
    color: '#FF2D20',
    bg: 'bg-[#FF2D20]/10 text-[#FF2D20]',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="m3.608 6.77 7.022-4.045a2.744 2.744 0 0 1 2.74 0l7.022 4.045a2.735 2.735 0 0 1 1.368 2.37v8.09a2.735 2.735 0 0 1-1.368 2.37l-7.022 4.045a2.744 2.744 0 0 1-2.74 0l-7.022-4.045A2.735 2.735 0 0 1 2.24 17.23V9.14a2.735 2.735 0 0 1 1.368-2.37Zm7.666 4.417-6.03-3.472v6.945l6.03 3.473v-6.946Zm1.452 0v6.946l6.03-3.473V7.715l-6.03 3.472Zm-.726-1.258 6.03-3.472-6.03-3.472-6.03 3.472 6.03 3.472Z" />
      </svg>
    ),
  },
  {
    name: 'Filament',
    category: 'Admin Panel & TALL',
    color: '#F59E0B',
    bg: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'AI Workflow',
    category: 'Automation & Agents',
    color: '#8B5CF6',
    bg: 'bg-[#8B5CF6]/10 text-[#8B5CF6]',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    name: 'Health Tech',
    category: 'Clinical Systems',
    color: '#10B981',
    bg: 'bg-[#10B981]/10 text-[#10B981]',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: 'Admin Dashboard',
    category: 'Analytics & Management',
    color: '#3B82F6',
    bg: 'bg-[#3B82F6]/10 text-[#3B82F6]',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
]

function TechFocusCard() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TECH_ITEMS.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  const current = TECH_ITEMS[currentIndex]

  return (
    <div className="flex h-full min-h-52 flex-col justify-between p-6 lg:min-h-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            Focus & Tech
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-1">
          {TECH_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-4 bg-ink' : 'w-1.5 bg-ink/15 hover:bg-ink/30'
              }`}
              aria-label={`Jump to ${TECH_ITEMS[i].name}`}
            />
          ))}
        </div>
      </div>

      <div className="relative my-auto overflow-hidden py-1">
        <div
          key={currentIndex}
          className="flex items-center gap-3.5 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-2"
        >
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${current.bg} shadow-sm transition-transform duration-300 group-hover:scale-105`}>
            {current.icon}
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold leading-snug tracking-tight text-ink">
              {current.name}
            </p>
            <p className="text-xs font-medium text-muted">
              {current.category}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-black/5 pt-3">
        <span className="text-[11px] font-medium text-muted">
          Active stack & domain
        </span>
        <span className="text-[11px] font-semibold text-accent">
          {currentIndex + 1} of {TECH_ITEMS.length}
        </span>
      </div>
    </div>
  )
}

function Home() {
  const [stories, setStories] = useState([])
  const [featuredProject, setFeaturedProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [storiesResult, projectResult] = await Promise.all([
        getAllStories(),
        getFeaturedProject(),
      ])
      setStories(storiesResult)
      setFeaturedProject(projectResult)
      setLoading(false)
    }
    fetchData()
  }, [])

  const storyCountLabel = loading ? 'Loading' : `${stories.length} chapters`

  return (
    <main className="min-h-screen bg-paper">
      <NavBar />

      <section className="mx-auto max-w-6xl px-6 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-accent">Izzul is building a story archive.</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.98] md:text-7xl">
            I write about the work, lessons, and turns that shaped how I think.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            A personal website for healthcare, systems, technology, and the small decisions
            behind meaningful projects.
          </p>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <p className="mb-4 text-right text-xs text-muted">Click around...</p>

        {/* 
          Bento Grid Layout (3x3 on lg):
          | Photo Tall (col 1, row 1-2) | Curiosity Wide (col 2, row 1)    | LinkedIn (col 3, row 1)       |
          | Photo Tall (col 1, row 1-2) | Featured Project (col 2, row 2-3) | Small Status 2 (col 3, row 2) |
          | Download Me (col 1, row 3)  | Featured Project (col 2, row 2-3) | Contact (col 3, row 3)        |
        */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.25fr_1fr] lg:auto-rows-[14rem]">
          {/* 1. Photo Tall: Col 1, Row 1-2 */}
          <BentoCard
            to="/about"
            delay={0}
            className="lg:col-start-1 lg:row-start-1 lg:row-span-2"
          >
            <div className="relative flex h-full min-h-[28rem] flex-col justify-between overflow-hidden bg-panel text-white lg:min-h-0">
              {/* Full-bleed Portrait Photo */}
              <img
                src="/photos/profile.jpg"
                alt="Izzul"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-105"
              />

              {/* Elegant Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

              {/* Top Badge & Arrow */}
              <div className="relative z-10 flex items-center justify-between p-6">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                  About Me
                </span>
                <span className="rounded-full bg-white/15 p-2 text-white backdrop-blur-md transition duration-300 group-hover:bg-white/30">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                  Behind the scenes
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-white">Who is Izzul?</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80 line-clamp-2">
                  Building systems, learning through experiments, and sharing stories.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* 2. Curiosity Wide: Col 2, Row 1 */}
          <BentoCard
            to="/about"
            delay={0.05}
            className="lg:col-start-2 lg:row-start-1"
          >
            <div className="flex h-full min-h-52 flex-col justify-between p-6 lg:min-h-0">
              <div className="flex items-center justify-between gap-5">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  Start here
                </span>
                <span className="text-sm text-muted">{storyCountLabel}</span>
              </div>
              <h2 className="max-w-xl text-3xl font-semibold leading-tight md:text-4xl">
                The short version is not enough.
              </h2>
            </div>
          </BentoCard>

          {/* 3. Small Status 1 (LinkedIn): Col 3, Row 1 */}
          <BentoCard
            href="https://www.linkedin.com/in/izzul"
            target="_blank"
            delay={0.1}
            className="lg:col-start-3 lg:row-start-1"
          >
            <div className="flex h-full min-h-52 flex-col justify-between p-6 lg:min-h-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-6 w-6 text-[#0A66C2] transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z" />
                  </svg>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    LinkedIn
                  </span>
                </div>
                <span className="rounded-full bg-black/5 p-1.5 text-muted transition group-hover:bg-[#0A66C2] group-hover:text-white">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <div>
                <p className="text-xl font-semibold leading-tight">Let's connect.</p>
                <p className="mt-1 text-sm text-muted">
                  Professional updates & network.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* 4. Featured Project: Col 2, Row 2-3 (From Projects Data) */}
          <BentoCard
            href={featuredProject?.project_url || featuredProject?.github_url || undefined}
            to={!featuredProject?.project_url && !featuredProject?.github_url ? '/about' : undefined}
            target={featuredProject?.project_url || featuredProject?.github_url ? '_blank' : undefined}
            delay={0.15}
            className="lg:col-start-2 lg:row-start-2 lg:row-span-2"
          >
            <div className="flex h-full min-h-[28rem] flex-col lg:min-h-0">
              <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
                {featuredProject?.cover_image ? (
                  <img
                    src={featuredProject.cover_image}
                    alt={featuredProject.title}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-stone-100 to-stone-200 text-ink/20">
                    <svg
                      className="h-12 w-12 stroke-[1.2]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wider">Project</span>
                  </div>
                )}
                {featuredProject?.year && (
                  <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {featuredProject.year}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                    Featured project
                  </p>
                  {(featuredProject?.project_url || featuredProject?.github_url) && (
                    <span className="text-xs font-semibold text-accent">
                      Visit ↗
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-semibold leading-tight">
                  {featuredProject?.title || 'Selected Works & Projects'}
                </h3>
                {featuredProject?.summary && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted">
                    {featuredProject.summary}
                  </p>
                )}
              </div>
            </div>
          </BentoCard>

          {/* 5. Tech Focus (Auto-Slide): Col 3, Row 2 */}
          <BentoCard
            delay={0.2}
            className="lg:col-start-3 lg:row-start-2"
          >
            <TechFocusCard />
          </BentoCard>

          {/* 6. Download CTA: Col 1, Row 3 */}
          <BentoCard
            href="/cv.pdf"
            download="CV-Izzul.pdf"
            delay={0.25}
            className="lg:col-start-1 lg:row-start-3"
          >
            <div className="flex h-full min-h-52 flex-col justify-between p-6 lg:min-h-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                  Curious about me?
                </p>

              </div>
              <div>
                <h3 className="text-2xl font-semibold leading-tight">Download me</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Get my complete CV and experience summary.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* 7. Contact: Col 3, Row 3 */}
          <BentoCard
            href="mailto:hi@example.com"
            delay={0.3}
            className="lg:col-start-3 lg:row-start-3"
          >
            <div className="flex h-full min-h-52 flex-col justify-between p-6 lg:min-h-0">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                  Contact
                </p>
                <p className="mt-3 rounded-[1.25rem] bg-white px-4 py-3 text-sm font-semibold leading-tight">
                  want the short version? send me a message.
                </p>
              </div>
              <span className="self-end rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
                sounds good
              </span>
            </div>
          </BentoCard>
        </div>
      </section>
    </main>
  )
}

export default Home
