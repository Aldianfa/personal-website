import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setCurrentTime(`${formatter.format(now)} WIB`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText('hi@izzul.dev')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-20 border-t border-ink/10 bg-[#FAF9F5] text-ink">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24">
        {/* Top Hero Callout */}
        <div className="flex flex-col justify-between gap-10 border-b border-ink/10 pb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for collaboration</span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
              Let&apos;s build something meaningful together.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Have a clinical system, complex product, or engineering problem to discuss?
              I&apos;m always open to discussing new opportunities.
            </p>
          </div>

          {/* 1-Click Copy Email & Direct Mailto */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copyEmail}
              className="group relative flex items-center gap-2.5 rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-medium text-ink shadow-sm transition hover:border-ink/30 hover:bg-[#F3F2EE] active:scale-95"
            >
              <svg
                className="h-4 w-4 text-muted transition group-hover:text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>hi@izzul.dev</span>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.9 }}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white shadow-lg"
                  >
                    Copied! 📋
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href="mailto:hi@izzul.dev"
              className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-ink/85 active:scale-95"
            >
              <span>Send Email</span>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Middle Meta / Grid */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4 md:py-16">
          {/* Col 1: Jakarta Time */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Local Time</p>
            <p className="mt-2 text-xl font-medium tracking-tight text-ink font-mono">
              {currentTime || 'Jakarta, ID'}
            </p>
            <p className="mt-1 text-xs text-muted">Jakarta, Indonesia (GMT+7)</p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-ink/80 transition hover:text-accent">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ink/80 transition hover:text-accent">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-ink/80 transition hover:text-accent">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-ink/80 transition hover:text-accent">
                  Story Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Profiles */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Connect</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink/80 transition hover:text-accent"
                >
                  <span>LinkedIn</span>
                  <span className="text-xs text-muted">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink/80 transition hover:text-accent"
                >
                  <span>GitHub</span>
                  <span className="text-xs text-muted">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/cv.pdf"
                  download="Izzul_CV.pdf"
                  className="inline-flex items-center gap-1.5 text-ink/80 transition hover:text-accent"
                >
                  <span>Resume (PDF)</span>
                  <span className="text-xs text-muted">↓</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Action & Back to Top */}
          <div className="flex flex-col justify-between sm:items-start md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Status</p>
              <p className="mt-2 text-sm text-ink/80">Crafting intentional software with high-velocity curiosity.</p>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-xs font-semibold text-ink/70 backdrop-blur transition hover:border-ink/25 hover:text-ink active:scale-95"
            >
              <span>Back to top</span>
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Izzul. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Designed with Apple minimalist aesthetics & intentional engineering.
          </p>
        </div>
      </div>
    </footer>
  )
}
