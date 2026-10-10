import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [toastMessage, setToastMessage] = useState('')
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  // Base list of commands
  const commands = useMemo(() => [
    // Navigation
    {
      id: 'nav-home',
      category: 'Navigation',
      title: 'Home',
      description: 'Go to overview & hero story',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      action: () => navigate('/'),
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About Me',
      description: 'Experience, education, tech stack & honors',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
      ),
      action: () => navigate('/about'),
    },
    {
      id: 'nav-work',
      category: 'Navigation',
      title: 'Selected Work',
      description: 'Engineering projects, clinical systems & case studies',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      action: () => navigate('/work'),
    },
    {
      id: 'nav-stories',
      category: 'Navigation',
      title: 'Story Archive',
      description: 'Retrospective logs & decision-making essays',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
        </svg>
      ),
      action: () => navigate('/stories'),
    },
    {
      id: 'nav-fonts',
      category: 'Navigation',
      title: 'Typography Lab',
      description: 'Font pairing sandbox & design aesthetics',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" y1="20" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
      ),
      action: () => navigate('/fonts'),
    },

    // Actions
    {
      id: 'act-download-cv',
      category: 'Actions',
      title: 'Download Resume (PDF)',
      description: 'Get complete experience summary and CV',
      icon: (
        <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
      action: () => {
        const link = document.createElement('a')
        link.href = '/cv.pdf'
        link.download = 'Izzul_CV.pdf'
        link.click()
        showToast('Downloading resume...')
      },
    },
    {
      id: 'act-copy-email',
      category: 'Actions',
      title: 'Copy Email Address',
      description: 'hi@izzul.dev',
      icon: (
        <svg className="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      ),
      action: () => {
        navigator.clipboard.writeText('hi@izzul.dev')
        showToast('Email copied to clipboard! 📋')
      },
    },
    {
      id: 'act-linkedin',
      category: 'Socials',
      title: 'Open LinkedIn Profile',
      description: 'Professional networking & career updates',
      icon: (
        <svg className="h-4 w-4 text-[#0077b5]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3Z" />
        </svg>
      ),
      action: () => window.open('https://linkedin.com', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'act-github',
      category: 'Socials',
      title: 'Open GitHub Profile',
      description: 'Code repositories & open-source activity',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      ),
      action: () => window.open('https://github.com', '_blank', 'noopener,noreferrer'),
    },
  ], [navigate])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2200)
  }

  // Filtered commands
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands
    const q = query.toLowerCase()
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    )
  }, [commands, query])

  // Global Keyboard Trigger (⌘K / Ctrl+K & Event listener)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    const handleCustomOpen = () => {
      setIsOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-palette', handleCustomOpen)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-palette', handleCustomOpen)
    }
  }, [])

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Keyboard navigation within list
  const handleInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(filteredCommands.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex])
      }
    }
  }

  const executeCommand = (cmd) => {
    setIsOpen(false)
    cmd.action()
  }

  // Auto-scroll active item into view
  useEffect(() => {
    if (!listRef.current) return
    const activeEl = listRef.current.querySelector('[data-selected="true"]')
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  return (
    <>
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 rounded-full border border-black/10 bg-ink px-4 py-2 text-xs font-semibold text-paper shadow-2xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 sm:pt-28">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md"
            />

            {/* Dialog Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-2xl backdrop-blur-2xl"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 border-b border-black/[0.08] px-4 py-3.5">
                <svg
                  className="h-5 w-5 text-muted shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-muted/70"
                />

                <span className="flex items-center gap-1 rounded-md border border-black/10 bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-muted">
                  ESC
                </span>
              </div>

              {/* Commands List */}
              <div
                ref={listRef}
                className="max-h-80 overflow-y-auto p-2 scroll-py-2"
              >
                {filteredCommands.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-sm font-medium text-muted">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="mt-1 text-xs text-muted/70">
                      Try searching for Home, Work, Stories, or CV
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((cmd, index) => {
                      const isSelected = index === selectedIndex

                      return (
                        <div
                          key={cmd.id}
                          data-selected={isSelected}
                          onClick={() => executeCommand(cmd)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                            isSelected
                              ? 'bg-black/[0.06] text-ink'
                              : 'text-ink hover:bg-black/[0.03]'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                isSelected
                                  ? 'bg-white text-ink shadow-xs border border-black/[0.06]'
                                  : 'bg-black/5 text-ink'
                              }`}
                            >
                              {cmd.icon}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate leading-tight text-ink">
                                {cmd.title}
                              </p>
                              <p className="text-xs truncate leading-tight mt-0.5 text-muted">
                                {cmd.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pl-2 shrink-0">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted/60">
                              {cmd.category}
                            </span>
                            {isSelected && (
                              <span className="flex h-5 w-5 items-center justify-center rounded border border-black/10 bg-white font-mono text-[10px] text-muted shadow-xs">
                                ↵
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Keyboard Navigation Footer */}
              <div className="flex items-center justify-between border-t border-black/[0.08] bg-black/[0.02] px-4 py-2.5 text-[11px] text-muted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-black/10 bg-white px-1.5 py-0.5 font-mono text-[9px] shadow-xs">↑</kbd>
                    <kbd className="rounded border border-black/10 bg-white px-1.5 py-0.5 font-mono text-[9px] shadow-xs">↓</kbd>
                    <span>navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-black/10 bg-white px-1.5 py-0.5 font-mono text-[9px] shadow-xs">↵</kbd>
                    <span>select</span>
                  </span>
                </div>
                <span>Izzul Quick Menu</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
