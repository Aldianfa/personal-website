import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NavBar from '../components/NavBar'
import StoryCard from '../components/StoryCard'
import { getAllStories } from '../lib/queries'

const EDUCATION_DATA = [
  {
    institution: 'Universitas / Academic Institution',
    degree: 'Bachelor of Computer Science / Informatics',
    period: '2020 — 2024',
    location: 'Indonesia',
    highlight: 'Specialized in Software Engineering, Database Systems, and Enterprise Architecture.',
    modules: ['Database Normalization & Indexing', 'Full-Stack Web Architectures', 'Object-Oriented Design', 'Clinical Data Modeling'],
  },
]

const WORK_HISTORY_DATA = [
  {
    id: 'medicare',
    company: 'Medicare Health Systems',
    role: 'Full-Stack Developer / Backend Specialist',
    period: '2024 — Present',
    type: 'Full-time',
    description:
      'Architected clinical monolith backend systems, electronic health records (EHR), and pharmacy management platforms using Laravel & Filament.',
    achievements: [
      'Developed 12+ modular clinical modules connecting doctors, pharmacy inventory, and lab results.',
      'Refactored relational queries & indexes, improving database response times across high-traffic hours.',
      'Designed frictionless TALL-stack admin workflows reducing clinic staff administrative processing time.',
    ],
    skills: ['Laravel', 'Filament', 'PHP', 'PostgreSQL', 'Livewire', 'REST APIs'],
    iconBg: 'bg-emerald-500/15 text-emerald-600',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 'independent',
    company: 'Independent Software & Web Projects',
    role: 'Full-Stack Developer',
    period: '2023 — 2024',
    type: 'Project-based',
    description:
      'Engineered modern reactive web interfaces, responsive client applications, and scalable Supabase/PostgreSQL backends.',
    achievements: [
      'Built fast modern web applications with React, Vite, and Tailwind CSS with sub-second page loads.',
      'Implemented real-time database synchronizations and row-level security with Supabase.',
      'Constructed animated interactive storytelling portfolios and landing pages.',
    ],
    skills: ['React', 'Tailwind CSS', 'Vite', 'Supabase', 'Framer Motion'],
    iconBg: 'bg-blue-500/15 text-blue-600',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
]

const TECH_CATEGORIES = [
  {
    id: 'backend',
    category: 'Backend & APIs',
    iconBg: 'bg-indigo-500/15 text-indigo-600',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    items: ['PHP 8+', 'Laravel', 'Filament TALL', 'Livewire', 'RESTful APIs', 'Node.js'],
  },
  {
    id: 'frontend',
    category: 'Frontend & UI',
    iconBg: 'bg-sky-500/15 text-sky-600',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    items: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vite', 'Framer Motion', 'HTML5 / CSS3'],
  },
  {
    id: 'database',
    category: 'Databases & Schemas',
    iconBg: 'bg-emerald-500/15 text-emerald-600',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    items: ['PostgreSQL', 'MySQL', 'Relational Modeling', 'Schema Optimization', 'Supabase'],
  },
  {
    id: 'tools',
    category: 'Tools & Workflows',
    iconBg: 'bg-purple-500/15 text-purple-600',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    items: ['Git & GitHub', 'Docker', 'Postman', 'Laragon / Nginx', 'AI Agents'],
  },
]

function About() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [expandedWork, setExpandedWork] = useState({ medicare: true })
  const [activeSkill, setActiveSkill] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const result = await getAllStories()
      setStories(result)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('hi@example.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const toggleWork = (id) => {
    setExpandedWork((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-ink selection:bg-accent/15 selection:text-accent">
      <NavBar />

      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
        {/* 1, 2, 3: First Section Grid: [Photo Card] [Information Card] */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {/* Left: [Photo Card] */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-black/[0.06] bg-white p-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)] md:col-span-5 md:p-5"
          >
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-emerald-400/15 to-indigo-500/20 opacity-50 blur-xl transition-opacity duration-700 group-hover:opacity-90" />

            {/* Top Status Header */}
            <div className="relative z-10 flex items-center justify-between pb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-[#F5F5F7] px-3 py-1 text-[11px] font-bold text-ink">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Active
              </span>
              <span className="text-[11px] font-medium text-muted">ID / Profile</span>
            </div>

            {/* Photo Container */}
            <div className="relative z-10 aspect-square w-full overflow-hidden rounded-[1.75rem] border border-black/5 bg-[#F5F5F7] shadow-inner">
              <img
                src="/photos/profile.jpg"
                alt="Izzul"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
            </div>

            {/* Bottom Tag */}
            <div className="relative z-10 pt-3 text-center">
              <p className="text-xs font-bold text-ink">Izzul</p>
              <p className="text-[11px] text-muted">Full-Stack Developer • HealthTech</p>
            </div>
          </motion.div>

          {/* Right: [Information Card] */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[2.25rem] border border-black/[0.06] bg-white p-6 shadow-[0_4px_30px_rgba(0,0,0,0.03)] md:col-span-7 md:p-8"
          >
            <div>
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Available for opportunities
              </div>

              {/* Greeting */}
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-[2.6rem] leading-tight">
                Hai, I'm Izzul.
              </h1>
              <p className="mt-1 text-base font-medium text-muted md:text-lg">
                Hope you can know a little about me in this page.
              </p>

              {/* Short Bio Description */}
              <p className="mt-3.5 text-xs leading-relaxed text-ink/80 md:text-sm">
                Full-Stack Developer focused on healthcare software, resilient Laravel backends,
                intuitive administrative dashboards, and clean digital experiences.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-black/[0.04] pt-5">
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="/cv.pdf"
                download="CV-Izzul.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-ink/85 hover:shadow-md"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCopyEmail}
                className="relative inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-ink shadow-sm transition hover:border-black/20 hover:bg-[#F5F5F7]"
              >
                {copied ? (
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Email Copied!
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Copy Email
                  </span>
                )}
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://www.linkedin.com/in/izzul"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold text-muted transition hover:text-ink"
              >
                LinkedIn ↗
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* 4. Education Section (Interactive Apple Grouped Inset Card) */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between px-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Academic Background
              </span>
              <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">Education</h2>
            </div>
            <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-semibold text-muted">
              1 Degree
            </span>
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="group overflow-hidden rounded-[1.85rem] border border-black/[0.06] bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.02)] transition-all hover:border-black/15 hover:shadow-[0_12px_32px_rgba(0,0,0,0.05)] md:p-7"
          >
            {EDUCATION_DATA.map((edu, index) => (
              <div key={index} className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    {/* Interactive Squircle Icon Container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -3 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-600 shadow-sm"
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-base font-bold text-ink transition-colors group-hover:text-accent md:text-lg">
                        {edu.degree}
                      </h3>
                      <p className="text-xs font-semibold text-muted">{edu.institution}</p>
                      <p className="mt-1 text-xs text-muted/90">{edu.highlight}</p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 pl-16 md:flex-col md:items-end md:pl-0">
                    <span className="rounded-full bg-[#F5F5F7] px-3 py-1 text-xs font-semibold text-ink">
                      {edu.period}
                    </span>
                    <span className="text-[11px] font-medium text-muted">{edu.location}</span>
                  </div>
                </div>

                {/* Interactive Key Course Modules */}
                <div className="border-t border-black/[0.04] pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted/80">
                    Key Coursework & Competencies
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {edu.modules.map((mod) => (
                      <motion.span
                        key={mod}
                        whileHover={{ scale: 1.05, y: -1 }}
                        className="cursor-default rounded-xl border border-black/[0.04] bg-[#F5F5F7] px-3 py-1 text-[11px] font-medium text-ink/80 transition-colors hover:bg-white hover:shadow-xs"
                      >
                        {mod}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 5. Work History (Interactive Expandable Grouped Card) */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between px-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Career Journey
              </span>
              <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">Work History</h2>
            </div>
            <span className="text-xs text-muted">Click to expand details</span>
          </div>

          <div className="space-y-4">
            {WORK_HISTORY_DATA.map((work) => {
              const isExpanded = Boolean(expandedWork[work.id])

              return (
                <motion.div
                  key={work.id}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="overflow-hidden rounded-[1.85rem] border border-black/[0.06] bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.02)] transition-all hover:border-black/15 hover:shadow-[0_12px_32px_rgba(0,0,0,0.05)] md:p-7"
                >
                  {/* Header Row (Clickable) */}
                  <div
                    onClick={() => toggleWork(work.id)}
                    className="flex cursor-pointer flex-col justify-between gap-3 md:flex-row md:items-center"
                  >
                    <div className="flex items-start gap-4">
                      {/* Squircle Company Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${work.iconBg} shadow-sm`}
                      >
                        {work.icon}
                      </motion.div>

                      <div>
                        <h3 className="text-base font-bold text-ink md:text-lg">{work.role}</h3>
                        <p className="text-xs font-semibold text-accent">{work.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-16 md:pl-0">
                      <span className="rounded-full bg-[#F5F5F7] px-3 py-1 text-xs font-semibold text-ink">
                        {work.period}
                      </span>
                      <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                        {work.type}
                      </span>
                      {/* Toggle Arrow */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F5F7] text-muted transition hover:text-ink"
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted md:text-sm">
                    {work.description}
                  </p>

                  {/* Expandable Achievements */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 border-t border-black/[0.04] pt-4"
                      >
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted/80">
                          Key Responsibilities & Impact
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {work.achievements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-ink/80">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Interactive Skills */}
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-black/[0.04] pt-3">
                    {work.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.08, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer rounded-lg bg-[#F5F5F7] px-2.5 py-1 text-[11px] font-medium text-ink/75 transition-colors hover:bg-ink hover:text-white"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* 6. Tech Stack (Interactive 4-Widget Matrix with Filter Feedback) */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between px-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Core Capabilities
              </span>
              <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">Tech Stack</h2>
            </div>
            {activeSkill && (
              <button
                onClick={() => setActiveSkill(null)}
                className="text-xs font-semibold text-accent hover:underline"
              >
                Reset filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TECH_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="flex flex-col justify-between rounded-[1.85rem] border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.02)] transition-all hover:border-black/15 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-xl ${cat.iconBg}`}>
                      {cat.icon}
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.items.map((tech) => {
                      const isSelected = activeSkill === tech

                      return (
                        <motion.button
                          key={tech}
                          whileHover={{ scale: 1.06, y: -1 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => setActiveSkill(isSelected ? null : tech)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                            isSelected
                              ? 'border-accent bg-accent text-white shadow-sm'
                              : 'border-black/[0.04] bg-[#F5F5F7] text-ink hover:border-black/10 hover:bg-white hover:shadow-xs'
                          }`}
                        >
                          {tech}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-4 border-t border-black/[0.04] pt-2 text-[10px] font-semibold text-muted">
                  {cat.items.length} technologies
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. Story / Chapters */}
        <section id="stories" className="mt-12 mb-16">
          <div className="mb-4 px-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Story Logs & Case Studies
            </span>
            <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">
              Chapters of the Journey
            </h2>
            <p className="mt-0.5 text-xs text-muted md:text-sm">
              Long-form retrospective logs, case studies, and engineering breakthroughs.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-[1.85rem] border border-black/[0.04] bg-white p-6"
                >
                  <div className="h-4 w-20 rounded-full bg-black/10" />
                  <div className="mt-4 h-6 w-3/4 rounded-lg bg-black/10" />
                  <div className="mt-3 h-3 w-full rounded bg-black/5" />
                  <div className="mt-2 h-3 w-2/3 rounded bg-black/5" />
                  <div className="mt-8 h-20 w-full rounded-xl bg-black/10" />
                </div>
              ))}
            </div>
          ) : stories.length === 0 ? (
            <div className="rounded-[1.85rem] border border-black/[0.06] bg-white p-10 text-center text-sm text-muted">
              No story logs published yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {stories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default About
