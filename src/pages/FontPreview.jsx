import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

const PRESETS = [
  {
    id: 'apple',
    name: 'Apple Cupertino / Modern Tech',
    badge: 'Recommended ⭐',
    description: 'Clean, tight-tracked geometric sans with high legibility and Apple SF Pro feel.',
    bodyFont: '"Plus Jakarta Sans", sans-serif',
    headingFont: '"Plus Jakarta Sans", sans-serif',
    italicAccentFont: '"Plus Jakarta Sans", sans-serif',
    tracking: '-0.025em',
  },
  {
    id: 'editorial',
    name: 'Craftsman / Editorial Storytelling',
    badge: 'Marco.fyi Vibe',
    description: 'Crisp UI sans paired with elegant editorial serif headings for retrospective logs.',
    bodyFont: '"Plus Jakarta Sans", sans-serif',
    headingFont: '"Instrument Serif", serif',
    italicAccentFont: '"Instrument Serif", serif',
    tracking: '-0.015em',
  },
  {
    id: 'current',
    name: 'Current Portfolio Setup',
    badge: 'Active in Site',
    description: 'Manrope for all UI components paired with occasional Fraunces serif moments.',
    bodyFont: '"Manrope", sans-serif',
    headingFont: '"Manrope", sans-serif',
    italicAccentFont: '"Fraunces", serif',
    tracking: '-0.01em',
  },
  {
    id: 'inter',
    name: 'Pure Minimalist (Inter)',
    badge: 'Linear / Vercel Vibe',
    description: 'Ultra-neutral Swiss digital aesthetic with high visual balance and dense UI contrast.',
    bodyFont: '"Inter", sans-serif',
    headingFont: '"Inter", sans-serif',
    italicAccentFont: '"Inter", sans-serif',
    tracking: '-0.02em',
  },
  {
    id: 'swiss',
    name: 'Swiss Tech / Grotesque',
    badge: 'Bold & Geometric',
    description: 'Outfit geometric sans with punchy numbers, sharp rounded curves, and high impact.',
    bodyFont: '"Outfit", sans-serif',
    headingFont: '"Outfit", sans-serif',
    italicAccentFont: '"Space Grotesk", sans-serif',
    tracking: '-0.02em',
  },
  {
    id: 'newsreader',
    name: 'Literary & Warm Archive',
    badge: 'Classic Serif Accent',
    description: 'Warm, refined Newsreader headings paired with clean Manrope body text.',
    bodyFont: '"Manrope", sans-serif',
    headingFont: '"Newsreader", serif',
    italicAccentFont: '"Newsreader", serif',
    tracking: '0em',
  },
]

export default function FontPreview() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0])
  const [activeTab, setActiveTab] = useState('live')
  const [customBodyFont, setCustomBodyFont] = useState(PRESETS[0].bodyFont)
  const [customHeadingFont, setCustomHeadingFont] = useState(PRESETS[0].headingFont)

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset)
    setCustomBodyFont(preset.bodyFont)
    setCustomHeadingFont(preset.headingFont)
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-ink selection:bg-accent/15 selection:text-accent pb-28">
      <NavBar />

      <div className="mx-auto max-w-6xl px-4 pt-10 md:px-6">
        {/* Header Title */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b border-black/[0.08] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent mb-2">
              <span>Typography Laboratory</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Font Comparison & Preview
            </h1>
            <p className="mt-1 text-sm text-muted">
              Bandingkan font typography secara interaktif pada komponen asli website.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('live')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === 'live'
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-white text-muted border border-black/[0.08] hover:text-ink'
              }`}
            >
              Interactive Preview
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === 'matrix'
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-white text-muted border border-black/[0.08] hover:text-ink'
              }`}
            >
              Side-by-Side Matrix
            </button>
          </div>
        </div>

        {/* ================= PRESET SELECTOR BAR ================= */}
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
            Pilih Preset Kombinasi Font:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRESETS.map((preset) => {
              const isSelected = selectedPreset.id === preset.id
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-accent bg-white shadow-md ring-2 ring-accent/20'
                      : 'border-black/[0.06] bg-white/70 hover:bg-white hover:border-black/15 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between w-full gap-2">
                    <span className="text-sm font-bold text-ink">{preset.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-accent text-white'
                          : 'bg-black/5 text-muted'
                      }`}
                    >
                      {preset.badge}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-2">
                    {preset.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-ink/70">
                    <span className="bg-surface px-2 py-0.5 rounded border border-black/[0.04]">
                      Body: {preset.bodyFont.split(',')[0].replace(/"/g, '')}
                    </span>
                    <span className="bg-surface px-2 py-0.5 rounded border border-black/[0.04]">
                      Head: {preset.headingFont.split(',')[0].replace(/"/g, '')}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ================= INTERACTIVE PREVIEW TAB ================= */}
        {activeTab === 'live' && (
          <div
            className="mt-8 space-y-8"
            style={{
              fontFamily: customBodyFont,
              letterSpacing: selectedPreset.tracking,
            }}
          >
            {/* 1. Hero Preview Section */}
            <div className="rounded-[2.5rem] bg-white p-6 md:p-10 border border-black/[0.06] shadow-sm">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                  Hero Section Preview
                </span>
                <h2
                  className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] text-ink"
                  style={{ fontFamily: customHeadingFont }}
                >
                  I write about the work, lessons, and turns that{' '}
                  <span
                    className="italic font-normal text-accent"
                    style={{ fontFamily: selectedPreset.italicAccentFont }}
                  >
                    shaped
                  </span>{' '}
                  how I think.
                </h2>
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted">
                  A personal website for healthcare systems, clinical architecture, resilient Laravel backends,
                  and the small decisions behind meaningful engineering.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-white shadow-sm">
                    Read Story Logs
                  </span>
                  <span className="inline-flex items-center rounded-full bg-surface px-5 py-2.5 text-xs font-semibold text-ink border border-black/[0.06]">
                    Explore Works ↗
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Bento Cards Preview Grid */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
                Bento Cards Simulation:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Bento Card 1: Experience */}
                <div className="rounded-[2rem] bg-white p-6 border border-black/[0.06] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                        My Journey
                      </span>
                      <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        2024 — Present
                      </span>
                    </div>
                    <h3
                      className="mt-3 text-xl font-bold text-ink"
                      style={{ fontFamily: customHeadingFont }}
                    >
                      Medicare Health Systems
                    </h3>
                    <p className="text-xs font-semibold text-accent mt-0.5">
                      Full-Stack Developer / Backend Specialist
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-muted">
                      Architecting clinical monolith systems, electronic medical records, and pharmacy workflows.
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-black/[0.06] flex flex-wrap gap-1.5">
                    {['Laravel', 'PHP 8.3', 'PostgreSQL', 'Filament'].map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface px-2.5 py-0.5 rounded-md text-[10px] font-medium text-ink/80 border border-black/[0.04]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bento Card 2: Philosophy & Approach */}
                <div className="rounded-[2rem] bg-white p-6 border border-black/[0.06] shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      Core Philosophy
                    </span>
                    <blockquote
                      className="mt-3 text-lg font-semibold text-ink leading-snug"
                      style={{ fontFamily: customHeadingFont }}
                    >
                      "Cognitive simplicity & relational data precision in clinical environments."
                    </blockquote>
                    <p className="mt-3 text-xs leading-relaxed text-muted">
                      Designing software that minimizes operator fatigue for healthcare providers.
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs text-muted">
                    <span>Philosophy & Values</span>
                    <span className="font-semibold text-ink">Read more →</span>
                  </div>
                </div>

                {/* Bento Card 3: Metrics & Stats */}
                <div className="rounded-[2rem] bg-white p-6 border border-black/[0.06] shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                      Impact Metrics
                    </span>
                    <div className="mt-4 space-y-3">
                      <div>
                        <div
                          className="text-3xl font-extrabold text-ink"
                          style={{ fontFamily: customHeadingFont }}
                        >
                          12+ Modules
                        </div>
                        <p className="text-xs text-muted">Integrated clinical workflows</p>
                      </div>
                      <div>
                        <div
                          className="text-3xl font-extrabold text-accent"
                          style={{ fontFamily: customHeadingFont }}
                        >
                          99.98%
                        </div>
                        <p className="text-xs text-muted">System uptime in hospital production</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-black/[0.06] text-[11px] font-medium text-muted">
                    Production Healthcare Backend
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Story Article Typography Test */}
            <div className="rounded-[2.5rem] bg-white p-6 md:p-10 border border-black/[0.06] shadow-sm">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  Story Log Sample
                </span>
                <h3
                  className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-ink"
                  style={{ fontFamily: customHeadingFont }}
                >
                  Refactoring Relational Healthcare Queries under Heavy Clinic Hours
                </h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                  <span>February 2025</span>
                  <span>•</span>
                  <span>8 min read</span>
                  <span>•</span>
                  <span>Engineering Retrospective</span>
                </div>

                <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-ink/85">
                  <p>
                    When dealing with high-concurrency electronic health records, query efficiency isn't just a technical metric — it directly affects patient wait times at pharmacy counters and doctor consultation desks.
                  </p>
                  <p>
                    By moving from multiple nested subqueries to normalized indexed joins and eager loading in Laravel, we reduced median query latency from 420ms down to 18ms across peak clinic hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SIDE-BY-SIDE MATRIX TAB ================= */}
        {activeTab === 'matrix' && (
          <div className="mt-8 space-y-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Bandingkan 3 Font Utama Secara Langsung:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Column 1: Plus Jakarta Sans */}
              <div
                className="rounded-[2rem] bg-white p-6 border-2 border-accent/40 shadow-sm flex flex-col justify-between"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', letterSpacing: '-0.02em' }}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                    <span className="text-xs font-bold text-accent">Plus Jakarta Sans</span>
                    <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-full font-bold">
                      Recommended
                    </span>
                  </div>
                  <h4 className="mt-4 text-2xl font-bold text-ink leading-tight">
                    Clean, Modern, & Apple-Inspired
                  </h4>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Huruf sans-serif geometris modern dengan bentuk huruf bulat proporsional. Sangat nyaman dibaca di layar retina dan resolusi tinggi.
                  </p>

                  <div className="mt-4 space-y-2 bg-surface p-3.5 rounded-xl border border-black/[0.04]">
                    <p className="text-xs font-semibold text-ink">Izzul • Full-Stack Developer</p>
                    <p className="text-[11px] text-muted">12+ Clinical Modules • Laravel & PostgreSQL</p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-black/[0.06] text-xs font-semibold text-accent">
                  Karakter: Presisi & Tech Modern
                </div>
              </div>

              {/* Column 2: Inter */}
              <div
                className="rounded-[2rem] bg-white p-6 border border-black/[0.08] shadow-sm flex flex-col justify-between"
                style={{ fontFamily: '"Inter", sans-serif', letterSpacing: '-0.02em' }}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                    <span className="text-xs font-bold text-ink">Inter</span>
                    <span className="text-[10px] bg-black/5 text-muted px-2 py-0.5 rounded-full font-semibold">
                      Linear / Vercel
                    </span>
                  </div>
                  <h4 className="mt-4 text-2xl font-bold text-ink leading-tight">
                    Ultra-Neutral & High Density
                  </h4>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Standar industri untuk web app modern. Memiliki x-height tinggi dan sangat netral sehingga mata pembaca fokus penuh pada konten.
                  </p>

                  <div className="mt-4 space-y-2 bg-surface p-3.5 rounded-xl border border-black/[0.04]">
                    <p className="text-xs font-semibold text-ink">Izzul • Full-Stack Developer</p>
                    <p className="text-[11px] text-muted">12+ Clinical Modules • Laravel & PostgreSQL</p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-black/[0.06] text-xs font-semibold text-ink">
                  Karakter: Minimalis & Netral
                </div>
              </div>

              {/* Column 3: Manrope (Current) */}
              <div
                className="rounded-[2rem] bg-white p-6 border border-black/[0.08] shadow-sm flex flex-col justify-between"
                style={{ fontFamily: '"Manrope", sans-serif', letterSpacing: '-0.01em' }}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                    <span className="text-xs font-bold text-ink">Manrope</span>
                    <span className="text-[10px] bg-black/5 text-muted px-2 py-0.5 rounded-full font-semibold">
                      Current
                    </span>
                  </div>
                  <h4 className="mt-4 text-2xl font-bold text-ink leading-tight">
                    Semi-Geometric & Friendly
                  </h4>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    Font bawaan saat ini. Sedikit lebih lebar dan santai, memberikan nuansa ramah namun tetap bersih.
                  </p>

                  <div className="mt-4 space-y-2 bg-surface p-3.5 rounded-xl border border-black/[0.04]">
                    <p className="text-xs font-semibold text-ink">Izzul • Full-Stack Developer</p>
                    <p className="text-[11px] text-muted">12+ Clinical Modules • Laravel & PostgreSQL</p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-black/[0.06] text-xs font-semibold text-muted">
                  Karakter: Ramah & Terbuka
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= HOW TO APPLY SECTION ================= */}
        <div className="mt-12 rounded-[2rem] bg-ink text-white p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Tertarik dengan salah satu font di atas?</h3>
              <p className="text-xs text-white/70 mt-1">
                Katakan opsi font yang paling Anda sukai, dan kita bisa langsung mengaktifkannya untuk seluruh website.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-accent/85 shrink-0"
            >
              Kembali ke About →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
