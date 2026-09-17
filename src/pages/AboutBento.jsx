import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import NavBar from '../components/NavBar'

// Add more local photo paths here to enable the automatic slideshow.
const PROFILE_PHOTOS = [
  { src: '/photos/profile.jpg', alt: 'Izzul' },
]

function ProfileSlideshow() {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const reduceMotion = useReducedMotion()
  const hasMultiplePhotos = PROFILE_PHOTOS.length > 1

  useEffect(() => {
    if (!hasMultiplePhotos || paused || interacting || reduceMotion) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setPhotoIndex((index) => (index + 1) % PROFILE_PHOTOS.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [hasMultiplePhotos, paused, interacting, reduceMotion])

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-[2rem] bg-panel text-white transition-shadow duration-700 hover:shadow-[0_24px_80px_rgba(29,29,31,0.1)]"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false)
      }}
      role="region"
      aria-label="Photos of Izzul"
      aria-roledescription={hasMultiplePhotos ? 'carousel' : undefined}
    >
      <div className="relative flex min-h-[28rem] flex-col justify-between overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={PROFILE_PHOTOS[photoIndex].src}
            src={PROFILE_PHOTOS[photoIndex].src}
            alt={PROFILE_PHOTOS[photoIndex].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7 }}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />
        <div className="relative z-10 flex items-center justify-between p-6">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">About Me</span>
          <Link to="/about" aria-label="Read more about Izzul" className="rounded-full bg-white/15 p-2 text-white backdrop-blur-md transition duration-300 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>
        <div className="relative z-10 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">Behind the scenes</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">Who is Izzul?</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">Building systems, learning through experiments, and sharing stories.</p>
          {hasMultiplePhotos && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {PROFILE_PHOTOS.map((photo, index) => (
                <button key={photo.src} type="button" aria-label={`Show photo ${index + 1}`} aria-pressed={index === photoIndex} onClick={() => { setPhotoIndex(index); setPaused(true) }} className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/30 hover:bg-accent focus-visible:outline-2 focus-visible:outline-white">
                  <span className={`h-1.5 rounded-full bg-white ${index === photoIndex ? 'w-4' : 'w-1.5 opacity-60'}`} />
                </button>
              ))}
              {!reduceMotion && (
                <button type="button" onClick={() => setPaused((value) => !value)} className="ml-auto rounded-full bg-accent px-3 py-2 text-xs font-semibold text-white hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-white">
                  {paused ? 'Play slideshow' : 'Pause slideshow'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const WORK_EXPERIENCES = [
  {
    id: 'medicare',
    company: 'Medicare Health Systems',
    role: 'Full-Stack Developer / Backend Specialist',
    period: '2024 — Present',
    description:
      'Leading the architecture and development of clinical backend monolith systems, electronic medical records (EMR), and pharmacy inventory workflows.',
    achievements: [
      'Developed 12+ modular clinical micro-features connecting doctors, pharmacy inventory, and lab results.',
      'Refactored relational queries & indexes, improving database response times across high-traffic clinical hours.',
      'Designed frictionless TALL-stack admin workflows with Filament reducing clinic staff administrative processing time.',
    ],
    skills: ['Laravel', 'Filament', 'PHP', 'PostgreSQL', 'Livewire', 'REST APIs'],
  },
  {
    id: 'independent',
    company: 'Independent Software & Web Projects',
    role: 'Full-Stack Developer',
    period: '2023 — 2024',
    description:
      'Engineered modern reactive client web applications, database schema migrations, and real-time backend integrations.',
    achievements: [
      'Built fast modern web applications with React, Vite, and Tailwind CSS with sub-second page loads.',
      'Implemented real-time database synchronizations and row-level security with Supabase.',
      'Constructed animated interactive storytelling portfolios and client admin dashboards.',
    ],
    skills: ['React', 'Tailwind CSS', 'Vite', 'Supabase', 'Framer Motion'],
  },
  {
    id: 'research',
    company: 'Clinical Systems Research',
    role: 'Software Engineer',
    period: '2022 — 2023',
    description:
      'Researched healthcare data compliance, database optimization, and high-reliability API architectures for medical workflows.',
    achievements: [
      'Analyzed electronic health record data pipelines to improve security and audit trail logging.',
      'Designed database schemas tailored for relational integrity across multi-tenant medical clinics.',
    ],
    skills: ['Database Design', 'MySQL', 'PHP', 'Architecture'],
  },
]

const EDUCATION_DATA = [
  {
    institution: 'Universitas / Academic Institution',
    degree: 'Bachelor of Computer Science / Informatics',
    period: '2020 — 2024',
    location: 'Indonesia',
    description:
      'Specialized in Software Engineering, Enterprise Architecture, Database Normalization, and Scalable Web Technologies.',
    modules: [
      'Relational Database Systems',
      'Software Architecture',
      'Data Structures & Algorithms',
      'Web Engineering',
      'Clinical Information Systems',
    ],
  },
]

const AWARDS_DATA = [
  {
    title: 'Outstanding Project Award',
    issuer: 'University / Tech Showcase',
    period: '2024',
    category: 'Innovation',
    description:
      'Awarded for engineering an integrated electronic health record and pharmacy stock management system with real-time analytics.',
    iconBg: 'bg-amber-500/10 text-amber-600',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    title: 'Academic Excellence & Dean’s List',
    issuer: 'Faculty of Computer Science',
    period: '2022 — 2024',
    category: 'Academic Honor',
    description:
      'Recognized for exceptional academic performance and top percentile grades in Software Engineering and Database Systems.',
    iconBg: 'bg-emerald-500/10 text-emerald-600',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
        <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
  {
    title: 'HealthTech Hackathon Finalist',
    issuer: 'Regional Health Innovation Hub',
    period: '2023',
    category: 'Competition',
    description:
      'Built a prototype for clinical triage automation and medicine dispatch optimization within 48 hours using Laravel & Livewire.',
    iconBg: 'bg-blue-500/10 text-blue-600',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

const TECH_STACK_ITEMS = [
  {
    name: 'Laravel',
    category: 'Backend Framework',
    bg: 'bg-[#FF2D20]/10 text-[#FF2D20]',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="m3.608 6.77 7.022-4.045a2.744 2.744 0 0 1 2.74 0l7.022 4.045a2.735 2.735 0 0 1 1.368 2.37v8.09a2.735 2.735 0 0 1-1.368 2.37l-7.022 4.045a2.744 2.744 0 0 1-2.74 0l-7.022-4.045A2.735 2.735 0 0 1 2.24 17.23V9.14a2.735 2.735 0 0 1 1.368-2.37Zm7.666 4.417-6.03-3.472v6.945l6.03 3.473v-6.946Zm1.452 0v6.946l6.03-3.473V7.715l-6.03 3.472Zm-.726-1.258 6.03-3.472-6.03-3.472-6.03 3.472 6.03 3.472Z" />
      </svg>
    ),
  },
  {
    name: 'PHP',
    category: 'Backend Core',
    bg: 'bg-[#777BB4]/10 text-[#777BB4]',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 13.5h-1.5l1.2-5.4h2.4c1.2 0 1.9.6 1.7 1.8-.2 1.4-1.3 2.1-2.5 2.1h-1l-.3 1.5zm6 0h-1.5l1.2-5.4h2.4c1.2 0 1.9.6 1.7 1.8-.2 1.4-1.3 2.1-2.5 2.1h-1l-.3 1.5z" />
      </svg>
    ),
  },
  {
    name: 'Filament',
    category: 'Admin Panel & TALL',
    bg: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'React',
    category: 'Frontend Ecosystem',
    bg: 'bg-[#00D8FF]/10 text-[#00A3C4]',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0-7C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    category: 'Design Systems',
    bg: 'bg-[#38BDF8]/10 text-[#0284C7]',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Database & Schemas',
    bg: 'bg-[#336791]/10 text-[#336791]',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'Containers & DevOps',
    bg: 'bg-[#2496ED]/10 text-[#2496ED]',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m-2.93 2.714h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H8.1a.185.185 0 00-.186.185v1.888c0 .102.083.185.186.185m0-2.714h2.119a.187.187 0 00.185-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.186.185v1.888c0 .102.083.186.186.186" />
      </svg>
    ),
  },
  {
    name: 'AI Agents',
    category: 'Automation & Workflows',
    bg: 'bg-[#8B5CF6]/10 text-[#8B5CF6]',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
]

const SECTIONS = [
  { id: 'about', label: 'About & Bio', eyebrow: 'The person behind the code', summary: 'Building thoughtful software for real-world healthcare.', meta: 'Philosophy & approach', size: 'sm:col-span-2', icon: '\u2733' },
  { id: 'work', label: 'Work Experience', eyebrow: 'My journey', summary: 'From independent projects to connected clinical systems.', meta: '3 roles / 2022 - Present', size: 'sm:row-span-2', icon: '\u2197' },
  { id: 'education', label: 'Education', eyebrow: 'Foundations', summary: 'Computer Science & Informatics', meta: '2020 - 2024', size: '', icon: '\u2318' },
  { id: 'awards', label: 'Awards', eyebrow: 'Milestones', summary: 'Recognition for engineering and innovation.', meta: '3 recognitions', size: '', icon: '\u2727' },
  { id: 'stack', label: 'Tech Stack', eyebrow: 'Tools I work with', summary: 'From backend architecture to expressive interfaces.', meta: '8 technologies', size: 'sm:col-span-2', icon: '\u2301' },
]

// Apple fluid spring transitions
const springTransition = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.8,
}

const hoverSpring = {
  type: 'spring',
  stiffness: 420,
  damping: 22,
}

function AboutBento() {
  const [activeSection, setActiveSection] = useState(null)
  const [hoveredSection, setHoveredSection] = useState(null)
  const [focusedSection, setFocusedSection] = useState(null)
  const gridRef = useRef(null)
  const sectionButtons = useRef({})
  const backButton = useRef(null)
  const lastSection = useRef(null)
  const reduceMotion = useReducedMotion()
  const emphasizedSection = hoveredSection ?? focusedSection

  useEffect(() => {
    if (activeSection) {
      backButton.current?.focus({ preventScroll: true })
    } else if (lastSection.current) {
      sectionButtons.current[lastSection.current]?.focus({ preventScroll: true })
    }
  }, [activeSection])

  const openSection = (id) => {
    lastSection.current = id
    setHoveredSection(null)
    setFocusedSection(null)
    setActiveSection(id)
    if (window.matchMedia('(max-width: 1023px)').matches) {
      gridRef.current?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' })
    }
  }

  const closeSection = () => {
    setHoveredSection(null)
    setFocusedSection(null)
    setActiveSection(null)
  }
  const [expandedWork, setExpandedWork] = useState({ medicare: true })
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('hi@example.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const toggleWork = (id) => {
    setExpandedWork((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <MotionConfig reducedMotion="user">
    <main className="min-h-screen bg-paper text-ink selection:bg-accent/15 selection:text-accent pb-20">
      <NavBar />

      <div className="mx-auto max-w-5xl px-4 pt-6 md:px-6 md:pt-10">
        {/* Main Bento Layout Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr] xl:grid-cols-[340px_1fr]">
          {/* ================= LEFT COLUMN: Fixed Profile & Info ================= */}
          <div className="flex flex-col gap-5">
            <ProfileSlideshow />

            {/* 2. Personal Info & Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: hoverSpring }}
              className="flex flex-col justify-between rounded-[2rem] bg-surface p-6 transition-shadow duration-500 hover:shadow-[0_24px_80px_rgba(29,29,31,0.08)]"
            >
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-ink">Izzul</h1>
                <p className="mt-0.5 text-xs font-semibold text-accent">
                  Full-Stack Developer @ Medicare
                </p>

                {/* Key-Value Meta Rows */}
                <div className="mt-6 space-y-2.5 border-t border-black/[0.06] pt-5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted">Website</span>
                    <a href="/" className="font-semibold text-ink hover:underline">
                      izzul.dev
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted">Email</span>
                    <button
                      onClick={handleCopyEmail}
                      className="font-semibold text-ink hover:text-accent transition-colors duration-200"
                    >
                      {copied ? (
                        <span className="text-emerald-600 font-bold animate-in fade-in duration-200">
                          Copied! ✓
                        </span>
                      ) : (
                        'hi@example.com'
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted">Location</span>
                    <span className="font-semibold text-ink">Indonesia / Remote</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted">Focus</span>
                    <span className="font-semibold text-ink">HealthTech & Backend</span>
                  </div>
                </div>

                {/* Social Icon Row */}
                <div className="mt-6 flex items-center gap-2 border-t border-black/[0.06] pt-4">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/in/izzul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs border border-black/[0.04] transition-colors hover:bg-accent hover:text-white"
                    title="LinkedIn"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z" />
                    </svg>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs border border-black/[0.04] transition-colors hover:bg-accent hover:text-white"
                    title="GitHub"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyEmail}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs border border-black/[0.04] transition-colors hover:bg-accent hover:text-white"
                    title="Copy Email"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Download Resume Action Pill */}
              <div className="mt-6 border-t border-black/[0.06] pt-4">
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={hoverSpring}
                  href="/cv.pdf"
                  download="CV-Izzul.pdf"
                  className="flex w-full items-center justify-center rounded-full bg-accent px-4 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-accent/85 hover:shadow-md"
                >
                  <span>Download Resume</span>

                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Only section cards participate in hover focus and expansion. */}
          <div
            ref={gridRef}
            className="relative isolate min-w-0 scroll-mt-24 self-start grid"
            onKeyDown={(event) => {
              if (event.key === 'Escape' && activeSection) {
                event.stopPropagation()
                closeSection()
              }
            }}
          >
            <div
              inert={activeSection ? true : undefined}
              aria-hidden={activeSection ? true : undefined}
              className={`col-start-1 row-start-1 grid grid-cols-1 gap-4 sm:grid-cols-2 ${activeSection ? 'invisible pointer-events-none' : ''}`}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {SECTIONS.map((section) => {
                const dimmed = Boolean(emphasizedSection && emphasizedSection !== section.id)
                return (
                  <motion.button
                    key={section.id}
                    ref={(node) => { sectionButtons.current[section.id] = node }}
                    type="button"
                    layoutId={activeSection ? undefined : `bento-${section.id}`}
                    transition={reduceMotion ? { duration: 0 } : springTransition}
                    animate={{ opacity: dimmed ? 0.5 : 1, filter: dimmed ? 'blur(3px)' : 'blur(0px)', y: !reduceMotion && emphasizedSection === section.id ? -3 : 0 }}
                    onHoverStart={() => {
                      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setHoveredSection(section.id)
                    }}
                    onHoverEnd={() => setHoveredSection(null)}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(':focus-visible')) setFocusedSection(section.id)
                    }}
                    onBlur={() => setFocusedSection(null)}
                    onClick={() => openSection(section.id)}
                    aria-label={`Open ${section.label}`}
                    aria-expanded={false}
                    className={`group relative flex min-h-44 min-w-0 cursor-pointer flex-col items-start rounded-[2rem] border border-black/[0.04] bg-surface p-6 text-left transition-shadow hover:shadow-[0_16px_48px_rgba(29,29,31,0.10)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${section.size}`}
                  >
                    <span className="mb-5 flex w-full items-center justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-xl text-accent shadow-xs" aria-hidden="true">{section.icon}</span>
                      <span className="rounded-full bg-black/5 p-1.5 text-muted transition group-hover:bg-accent group-hover:text-white" aria-hidden="true">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">{section.eyebrow}</span>
                    <span className="mt-2 text-xl font-bold tracking-tight text-ink">{section.label}</span>
                    <span className="mt-2 text-sm leading-relaxed text-muted">{section.summary}</span>
                    {section.id === 'work' && (
                      <span className="my-6 space-y-4 border-l border-ink/10 pl-4">
                        {WORK_EXPERIENCES.map((work) => (
                          <span key={work.id} className="block">
                            <span className="block text-[10px] font-semibold text-accent">{work.period}</span>
                            <span className="mt-1 block text-xs font-semibold text-ink">{work.company}</span>
                          </span>
                        ))}
                      </span>
                    )}
                    {section.id === 'stack' && (
                      <span className="mt-5 flex flex-wrap gap-2" aria-hidden="true">
                        {TECH_STACK_ITEMS.map((item) => (
                          <span key={item.name} className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.bg}`}>{item.icon}</span>
                        ))}
                      </span>
                    )}
                    <span className="mt-auto pt-5 text-[11px] font-semibold text-accent">{section.meta}</span>
                  </motion.button>
                )
              })}
            </div>

            {activeSection && (
              <motion.section
                key={activeSection}
                layoutId={`bento-${activeSection}`}
                transition={reduceMotion ? { duration: 0 } : springTransition}
                aria-label={SECTIONS.find((section) => section.id === activeSection).label}
                className="relative z-10 col-start-1 row-start-1 min-w-0 rounded-[2rem] border border-black/[0.04] bg-surface p-5 shadow-sm sm:p-8"
              >
                <div className="mb-7 flex items-center justify-between border-b border-black/[0.06] pb-4">
                  <button
                    ref={backButton}
                    type="button"
                    onClick={closeSection}
                    className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Back to overview
                  </button>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">Explore</span>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : 0.12 }}>
                {/* TAB 1: ABOUT & BIO */}
                {activeSection === 'about' && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="space-y-5"
                  >
                    <h2 className="text-xl font-bold tracking-tight text-ink">
                      About the Developer
                    </h2>

                    <blockquote className="rounded-2xl border-l-2 border-ink/20 bg-white p-4.5 text-sm font-medium leading-relaxed text-ink shadow-xs">
                      "Hai, I'm Izzul. I engineer scalable clinical software and intuitive digital systems that solve complex real-world operational challenges."
                    </blockquote>

                    <p className="text-xs leading-relaxed text-muted md:text-sm">
                      Specializing in backend monolith architectures with Laravel, Filament, and PostgreSQL,
                      I focus on high-reliability healthcare systems, automated clinic workflows, and responsive
                      user interfaces that reduce mental fatigue for operators.
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="rounded-2xl bg-white p-4 shadow-xs border border-black/[0.04]">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                          Philosophy
                        </p>
                        <p className="mt-1 text-xs font-semibold text-ink">
                          Cognitive simplicity & relational data precision.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-xs border border-black/[0.04]">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                          Domain
                        </p>
                        <p className="mt-1 text-xs font-semibold text-ink">
                          Healthcare IT, EHR systems, and enterprise tools.
                        </p>
                      </div>
                    </div>

                    {/* Apple Cupertino Style Story Link Tile */}
                    <Link
                      to="/about#stories"
                      className="group flex items-center justify-between rounded-2xl bg-white p-4 shadow-xs border border-black/[0.04] transition-all duration-300 hover:border-black/15 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-ink shadow-xs border border-black/[0.04] transition-transform duration-300 group-hover:scale-105">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                            <path d="M6 6h10" />
                            <path d="M6 10h10" />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                              Story Logs
                            </span>
                            <span className="text-ink/20">•</span>
                            <span className="text-xs font-semibold text-accent">Chapters</span>
                          </div>
                          <p className="mt-0.5 text-xs font-medium text-ink">
                            Read retrospective case studies & project decisions
                          </p>
                        </div>
                      </div>

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-ink shadow-xs border border-black/[0.04] transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:translate-x-1">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* TAB 2: WORK EXPERIENCE (EXPANDABLE ACCORDION) */}
                {activeSection === 'work' && (
                  <motion.div
                    key="work"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold tracking-tight text-ink">Work Experience</h2>
                      <span className="text-[11px] font-medium text-muted">Click to expand details</span>
                    </div>

                    <div className="space-y-3">
                      {WORK_EXPERIENCES.map((work) => {
                        const isExpanded = Boolean(expandedWork[work.id])

                        return (
                          <motion.div
                            key={work.id}
                            layout="position"
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-2xl bg-white p-4.5 shadow-xs border border-black/[0.04] transition-all duration-200 hover:border-black/15 md:p-5"
                          >
                            {/* Accordion Header (Clickable) */}
                            <div
                              role="button"
                              tabIndex={0}
                              aria-expanded={isExpanded}
                              aria-label={`${work.company}: ${isExpanded ? 'collapse' : 'expand'} details`}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                  event.preventDefault()
                                  toggleWork(work.id)
                                }
                              }}
                              onClick={() => toggleWork(work.id)}
                              className="flex cursor-pointer flex-wrap items-start justify-between gap-3 rounded-lg select-none focus-visible:outline-2 focus-visible:outline-accent"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-sm font-bold text-ink md:text-base">
                                    {work.company}
                                  </h3>
                                </div>
                                <p className="text-xs font-semibold text-accent">{work.role}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-muted shadow-xs border border-black/[0.04]">
                                  {work.period}
                                </span>
                                {/* Smooth Rotating Toggle Chevron */}
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.2, ease: 'easeOut' }}
                                  className="flex h-6 w-6 items-center justify-center rounded-full bg-surface text-muted shadow-xs border border-black/[0.04]"
                                >
                                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="6 9 12 15 18 9" />
                                  </svg>
                                </motion.div>
                              </div>
                            </div>

                            <p className="mt-2 text-xs leading-relaxed text-muted">
                              {work.description}
                            </p>

                            {/* Accordion Body */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-3.5 border-t border-black/[0.06] pt-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                                      Key Impact & Responsibilities
                                    </p>
                                    <ul className="mt-2 space-y-1.5">
                                      {work.achievements.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-ink/80">
                                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Skills Tags */}
                            <div className="mt-3 flex flex-wrap gap-1.5 pt-2">
                              {work.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-lg bg-surface px-2.5 py-0.5 text-[10px] font-medium text-ink/75 border border-black/[0.04] shadow-xs cursor-default"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: EDUCATION */}
                {activeSection === 'education' && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="space-y-5"
                  >
                    <h2 className="text-xl font-bold tracking-tight text-ink">
                      Academic Background
                    </h2>

                    <div className="space-y-4">
                      {EDUCATION_DATA.map((edu, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl bg-white p-5 shadow-xs border border-black/[0.04]"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="text-base font-bold text-ink">{edu.degree}</h3>
                            <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-ink shadow-xs">
                              {edu.period}
                            </span>
                          </div>
                          <p className="mt-1 text-xs font-semibold text-muted">{edu.institution} • {edu.location}</p>
                          <p className="mt-3 text-xs leading-relaxed text-muted">
                            {edu.description}
                          </p>

                          <div className="mt-4 border-t border-black/[0.06] pt-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                              Core Focus Areas
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {edu.modules.map((mod) => (
                                <span
                                  key={mod}
                                  className="rounded-lg bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-xs border border-black/[0.04]"
                                >
                                  {mod}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: AWARDS */}
                {activeSection === 'awards' && (
                  <motion.div
                    key="awards"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold tracking-tight text-ink">
                        Honors & Awards
                      </h2>
                      <span className="text-[11px] font-medium text-muted">
                        {AWARDS_DATA.length} Recognitions
                      </span>
                    </div>

                    <div className="space-y-3">
                      {AWARDS_DATA.map((award, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 rounded-2xl bg-white p-4.5 shadow-xs border border-black/[0.04] transition-colors hover:border-black/15"
                        >
                          {/* Award Squircle Icon */}
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${award.iconBg} shadow-xs`}>
                            {award.icon}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <h3 className="text-sm font-bold text-ink">{award.title}</h3>
                              <span className="rounded-full bg-surface px-2.5 py-0.5 text-[10px] font-semibold text-muted shadow-xs border border-black/[0.04]">
                                {award.period}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-accent">{award.issuer}</p>
                            <p className="mt-1.5 text-xs leading-relaxed text-muted">
                              {award.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {activeSection === 'stack' && (
                  <div className="space-y-5">
                    <h2 className="text-xl font-bold tracking-tight text-ink">Tech Stack</h2>
                    <p className="text-sm leading-relaxed text-muted">The tools behind my clinical systems, web applications, and automated workflows.</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {TECH_STACK_ITEMS.map((item) => (
                        <div key={item.name} className="flex items-center gap-3 rounded-2xl border border-black/[0.04] bg-white p-4">
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>{item.icon}</div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-ink">{item.name}</h3>
                            <p className="mt-1 text-xs text-muted">{item.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              </motion.section>
            )}
          </div>
        </div>
      </div>
    </main>
    </MotionConfig>
  )
}

export default AboutBento
