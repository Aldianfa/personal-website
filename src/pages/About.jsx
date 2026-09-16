import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NavBar from '../components/NavBar'
import StoryCard from '../components/StoryCard'
import { getAllStories } from '../lib/queries'

const EDUCATION_DATA = [
  {
    institution: 'Universitas / Academic Institution',
    degree: 'Bachelor of Computer Science / Informatics',
    period: '2020 — 2024',
    location: 'Indonesia',
    highlight: 'Specialized in Software Engineering, Database Systems, and Architecture.',
  },
]

const WORK_HISTORY_DATA = [
  {
    company: 'Medicare Health Systems',
    role: 'Full-Stack Developer / Backend Specialist',
    period: '2024 — Present',
    type: 'Full-time',
    description:
      'Architected clinical monolith backend systems, electronic health records, and pharmacy management platforms using Laravel & Filament.',
    skills: ['Laravel', 'Filament', 'PHP', 'PostgreSQL', 'Livewire', 'REST APIs'],
    iconBg: 'bg-emerald-500/10 text-emerald-600',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    company: 'Independent Software & Web Projects',
    role: 'Full-Stack Developer',
    period: '2023 — 2024',
    type: 'Project-based',
    description:
      'Engineered modern reactive web interfaces, responsive client applications, and scalable Supabase/PostgreSQL backends.',
    skills: ['React', 'Tailwind CSS', 'Vite', 'Supabase', 'Framer Motion'],
    iconBg: 'bg-blue-500/10 text-blue-600',
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
    category: 'Backend & APIs',
    iconBg: 'bg-indigo-500/10 text-indigo-600',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    items: ['PHP', 'Laravel', 'Filament TALL', 'Livewire', 'REST APIs', 'Node.js'],
  },
  {
    category: 'Frontend & UI',
    iconBg: 'bg-sky-500/10 text-sky-600',
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
    category: 'Databases & Schemas',
    iconBg: 'bg-emerald-500/10 text-emerald-600',
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
    category: 'Tools & Workflows',
    iconBg: 'bg-purple-500/10 text-purple-600',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    items: ['Git & GitHub', 'Docker', 'Postman', 'Laragon / Nginx', 'AI Workflows'],
  },
]

function About() {
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

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-ink selection:bg-accent/15 selection:text-accent">
      <NavBar />

      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
        {/* 1, 2, 3: Profile Hero (Apple Profile Card Style) */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white p-7 shadow-[0_2px_20px_rgba(0,0,0,0.03)] md:p-10"
        >
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
            {/* Apple Squircle Portrait Avatar */}
            <div className="relative shrink-0">
              <div className="h-28 w-28 overflow-hidden rounded-[2rem] border border-black/10 bg-[#F5F5F7] shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:h-36 md:w-36">
                <img
                  src="/photos/profile.jpg"
                  alt="Izzul"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                <span className="h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
              </span>
            </div>

            {/* Greeting & Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for opportunities
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
                Hai, I'm Izzul.
              </h1>
              <p className="mt-1 text-base font-medium text-muted md:text-lg">
                Hope you can know a little about me in this page.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-ink/75 md:text-base">
                Full-Stack Developer focused on healthcare software, resilient Laravel backends,
                intuitive administrative dashboards, and clean digital experiences.
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <a
                  href="/cv.pdf"
                  download="CV-Izzul.pdf"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-ink/85 hover:shadow"
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
                </a>
                <a
                  href="mailto:hi@example.com"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-ink shadow-sm transition hover:bg-[#F5F5F7]"
                >
                  Get in Touch
                </a>
                <a
                  href="https://www.linkedin.com/in/izzul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold text-muted transition hover:text-ink"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4. Education Section (Apple Inset Grouped Card) */}
        <section className="mt-10">
          <div className="mb-3 px-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Academic Background
            </span>
            <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">Education</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.02)]"
          >
            {EDUCATION_DATA.map((edu, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Apple Squircle Icon Container */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 shadow-sm">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink">{edu.degree}</h3>
                    <p className="text-xs font-semibold text-muted">{edu.institution}</p>
                    <p className="mt-1 text-xs text-muted/90">{edu.highlight}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 pl-15 md:flex-col md:items-end md:pl-0">
                  <span className="rounded-full bg-[#F5F5F7] px-3 py-1 text-xs font-semibold text-ink">
                    {edu.period}
                  </span>
                  <span className="text-[11px] font-medium text-muted">{edu.location}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 5. Work History (Apple Grouped Inset Card with Dividers) */}
        <section className="mt-10">
          <div className="mb-3 px-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Career Journey
            </span>
            <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">Work History</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.02)] divide-y divide-black/[0.04]"
          >
            {WORK_HISTORY_DATA.map((work, index) => (
              <div
                key={index}
                className="p-5 transition-colors duration-200 hover:bg-[#F5F5F7]/40 md:p-6"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    {/* Squircle Company Icon */}
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${work.iconBg} shadow-sm`}>
                      {work.icon}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-ink">{work.role}</h3>
                      <p className="text-xs font-semibold text-accent">{work.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-15 md:pl-0">
                    <span className="rounded-full bg-[#F5F5F7] px-3 py-1 text-xs font-semibold text-ink">
                      {work.period}
                    </span>
                    <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                      {work.type}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pl-0 md:pl-15">
                  <p className="text-xs leading-relaxed text-muted md:text-sm">
                    {work.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {work.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-[#F5F5F7] px-2.5 py-1 text-[11px] font-medium text-ink/75"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 6. Tech Stack (Apple 4-Widget Matrix) */}
        <section className="mt-10">
          <div className="mb-3 px-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
              Core Capabilities
            </span>
            <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">Tech Stack</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TECH_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between rounded-[1.75rem] border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
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

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cat.items.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-xl border border-black/[0.04] bg-[#F5F5F7] px-3 py-1.5 text-xs font-medium text-ink transition hover:bg-white hover:shadow-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
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
                  className="h-64 animate-pulse rounded-[1.75rem] border border-black/[0.04] bg-white p-6"
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
            <div className="rounded-[1.75rem] border border-black/[0.06] bg-white p-10 text-center text-sm text-muted">
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
