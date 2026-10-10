import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Web Audio API synthesizer for realistic mechanical keyboard click
function playMechanicalClick(frequency = 320) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.07)

    gain.gain.setValueAtTime(0.18, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.07)
  } catch {
    // Audio blocked or not supported
  }
}

// Key configuration matching the reference image exactly
const KEYS_DATA = {
  // Row 1 (Top)
  p: {
    id: 'p',
    letter: 'P',
    label: 'SELECTED WORK',
    x: 54,
    y: 14,
    colorTop: '#ffb4c8',
    colorSkirt: '#c2185b',
    soundFreq: 360,
    to: '#work',
  },
  o1: {
    id: 'o1',
    keyTrigger: 'o',
    letter: 'O',
    label: 'ABOUT ME',
    x: 148,
    y: 14,
    colorTop: '#a5b4fc',
    colorSkirt: '#3949ab',
    soundFreq: 340,
    to: '/about',
  },
  r: {
    id: 'r',
    letter: 'R',
    label: 'MY PROCESS',
    x: 242,
    y: 14,
    colorTop: '#86efac',
    colorSkirt: '#059669',
    soundFreq: 320,
    to: '/stories',
  },
  t: {
    id: 't',
    letter: 'T',
    label: 'WHAT I DO',
    x: 336,
    y: 14,
    colorTop: '#fcd34d',
    colorSkirt: '#d97706',
    soundFreq: 300,
    to: '/work',
  },

  // Row 2 (Bottom)
  f: {
    id: 'f',
    letter: 'F',
    label: 'EXPLORE',
    x: 10,
    y: 104,
    colorTop: '#7dd3fc',
    colorSkirt: '#0284c7',
    soundFreq: 290,
    to: '#work',
  },
  o2: {
    id: 'o2',
    keyTrigger: 'o',
    letter: 'O',
    label: 'A LITTLE ABOUT ME',
    x: 104,
    y: 104,
    colorTop: '#e879f9',
    colorSkirt: '#7e22ce',
    soundFreq: 280,
    to: '/about',
  },
  l: {
    id: 'l',
    letter: 'L',
    label: 'THE PROCESS',
    x: 198,
    y: 104,
    colorTop: '#fca5a5',
    colorSkirt: '#dc2626',
    soundFreq: 270,
    to: '/stories',
  },
  i: {
    id: 'i',
    letter: 'I',
    label: 'MY APPROACH',
    x: 292,
    y: 104,
    colorTop: '#93c5fd',
    colorSkirt: '#1d4ed8',
    soundFreq: 310,
    to: '/story/1',
  },
  o3: {
    id: 'o3',
    keyTrigger: 'o',
    letter: 'O',
    label: 'SAY HELLO',
    x: 386,
    y: 104,
    colorTop: '#bef264',
    colorSkirt: '#65a30d',
    soundFreq: 330,
    to: 'mailto:izzul@example.com',
  },
}

// Single Standard 3D Keycap SVG Component
function SvgKeyCap({ config, isPressed, onPress }) {
  const W = 86
  const H_top = 74
  const D = 18
  const R = 14

  return (
    <g
      id={`key-container-${config.id}`}
      transform={`translate(${config.x}, ${config.y})`}
      tabIndex={0}
      role="button"
      aria-label={`${config.letter} - ${config.label}`}
      className="cursor-pointer select-none focus:outline-none"
      onClick={() => onPress(config)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onPress(config)
        }
      }}
    >
      <motion.g
        id={`key-${config.id}`}
        animate={{ y: isPressed ? 6 : 0 }}
        whileHover={{ y: 2 }}
        whileTap={{ y: 6 }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      >
        {/* 3D Skirt / Base Body */}
        <rect
          x="0"
          y="0"
          width={W}
          height={H_top + D}
          rx={R}
          ry={R}
          fill={config.colorSkirt}
          stroke="#000000"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />

        {/* Crease lines on the skirt sides */}
        <line
          x1="3.5"
          y1={H_top - 4}
          x2="3.5"
          y2={H_top + D - 4}
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1={W - 3.5}
          y1={H_top - 4}
          x2={W - 3.5}
          y2={H_top + D - 4}
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Top Face Dish */}
        <rect
          x="0"
          y="0"
          width={W}
          height={H_top}
          rx={R}
          ry={R}
          fill={config.colorTop}
          stroke="#000000"
          strokeWidth="2.6"
        />

        {/* Subtle top dish bevel sheen */}
        <rect
          x="4"
          y="3"
          width={W - 8}
          height="18"
          rx={R - 4}
          ry={R - 4}
          fill="#ffffff"
          opacity="0.25"
          pointerEvents="none"
        />

        {/* Bold Letter */}
        <text
          x={W / 2}
          y="35"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#000000"
          fontSize="29"
          fontWeight="900"
          fontFamily="Manrope, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          {config.letter}
        </text>

        {/* Subtitle / Sub-label */}
        <text
          x={W / 2}
          y="63"
          textAnchor="middle"
          fill="#000000"
          fontSize="6.5"
          fontWeight="800"
          letterSpacing="0.05em"
          fontFamily="Manrope, -apple-system, BlinkMacSystemFont, sans-serif"
          opacity="0.85"
        >
          {config.label}
        </text>
      </motion.g>
    </g>
  )
}

// Authentic L-Shaped ISO Enter Key Component
function SvgEnterKey({ isPressed, onPress }) {
  const colorTop = '#fde047'
  const colorSkirt = '#ca8a04'

  // Coordinates for the ISO L-shaped key
  // Top part: x: 430 -> 574 (width 144), y: 14 -> 92
  // Bottom part: x: 480 -> 574 (width 94), y: 92 -> 182 + skirt 18
  const enterPathSkirt = `
    M 444 14
    L 560 14
    A 14 14 0 0 1 574 28
    L 574 200
    A 14 14 0 0 1 560 214
    L 494 214
    A 14 14 0 0 1 480 200
    L 480 118
    A 10 10 0 0 0 470 108
    L 444 108
    A 14 14 0 0 1 430 94
    L 430 28
    A 14 14 0 0 1 444 14
    Z
  `

  const enterPathTop = `
    M 444 14
    L 560 14
    A 14 14 0 0 1 574 28
    L 574 182
    A 14 14 0 0 1 560 196
    L 494 196
    A 14 14 0 0 1 480 182
    L 480 102
    A 10 10 0 0 0 470 92
    L 444 92
    A 14 14 0 0 1 430 78
    L 430 28
    A 14 14 0 0 1 444 14
    Z
  `

  return (
    <g
      id="key-container-enter"
      tabIndex={0}
      role="button"
      aria-label="Enter - LET'S TALK"
      className="cursor-pointer select-none focus:outline-none"
      onClick={() =>
        onPress({
          id: 'enter',
          letter: '↵',
          label: "LET'S TALK",
          to: 'mailto:izzul@example.com',
          soundFreq: 260,
        })
      }
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onPress({
            id: 'enter',
            letter: '↵',
            label: "LET'S TALK",
            to: 'mailto:izzul@example.com',
            soundFreq: 260,
          })
        }
      }}
    >
      <motion.g
        id="key-enter"
        animate={{ y: isPressed ? 6 : 0 }}
        whileHover={{ y: 2 }}
        whileTap={{ y: 6 }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      >
        {/* 3D Skirt Base */}
        <path
          d={enterPathSkirt}
          fill={colorSkirt}
          stroke="#000000"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />

        {/* Skirt vertical crease lines */}
        <line
          x1="483.5"
          y1="108"
          x2="483.5"
          y2="204"
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1="570.5"
          y1="30"
          x2="570.5"
          y2="204"
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Top Face */}
        <path
          d={enterPathTop}
          fill={colorTop}
          stroke="#000000"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />

        {/* Return Arrow (↵) with stem coming down and hooking left */}
        <path
          d="M 500 36 L 500 56 L 472 56 L 472 66 L 448 50 L 472 34 L 472 44 L 488 44 L 488 36 Z"
          fill="#000000"
        />

        {/* Vertical Text "LET'S TALK" */}
        <text
          x="548"
          y="110"
          textAnchor="middle"
          fill="#000000"
          fontSize="9"
          fontWeight="900"
          letterSpacing="0.2em"
          fontFamily="Manrope, -apple-system, BlinkMacSystemFont, sans-serif"
          transform="rotate(90 548 110)"
        >
          LET'S TALK
        </text>
      </motion.g>
    </g>
  )
}

export default function PortfolioKeyboard() {
  const navigate = useNavigate()
  const [pressedKeys, setPressedKeys] = useState({})
  const [toastMessage, setToastMessage] = useState('')
  const toastTimeoutRef = useRef(null)

  const showToast = useCallback((msg) => {
    setToastMessage(msg)
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('')
    }, 2200)
  }, [])

  const handleKeyAction = useCallback(
    (config) => {
      playMechanicalClick(config.soundFreq || 300)

      if (!config.to) return

      if (config.to.startsWith('#')) {
        const target = document.querySelector(config.to)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
        showToast(`Scrolling to ${config.label}...`)
      } else if (config.to.startsWith('mailto:')) {
        showToast('Opening email contact...')
        window.location.href = config.to
      } else {
        showToast(`Navigating to ${config.label}...`)
        navigate(config.to)
      }
    },
    [navigate, showToast]
  )

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return
      const key = e.key.toLowerCase()

      let matchedConfig = null
      if (key === 'enter') matchedConfig = { id: 'enter', soundFreq: 260 }
      else if (key === 'p') matchedConfig = KEYS_DATA.p
      else if (key === 'r') matchedConfig = KEYS_DATA.r
      else if (key === 't') matchedConfig = KEYS_DATA.t
      else if (key === 'f') matchedConfig = KEYS_DATA.f
      else if (key === 'l') matchedConfig = KEYS_DATA.l
      else if (key === 'i') matchedConfig = KEYS_DATA.i
      else if (key === 'o') matchedConfig = KEYS_DATA.o1

      if (matchedConfig) {
        setPressedKeys((prev) => ({ ...prev, [matchedConfig.id]: true }))
        playMechanicalClick(matchedConfig.soundFreq || 300)
      }
    }

    const handleKeyUp = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return
      const key = e.key.toLowerCase()

      let matchedConfig = null
      if (key === 'enter') {
        matchedConfig = {
          id: 'enter',
          label: "LET'S TALK",
          to: 'mailto:izzul@example.com',
          soundFreq: 260,
        }
      } else if (key === 'p') matchedConfig = KEYS_DATA.p
      else if (key === 'r') matchedConfig = KEYS_DATA.r
      else if (key === 't') matchedConfig = KEYS_DATA.t
      else if (key === 'f') matchedConfig = KEYS_DATA.f
      else if (key === 'l') matchedConfig = KEYS_DATA.l
      else if (key === 'i') matchedConfig = KEYS_DATA.i
      else if (key === 'o') matchedConfig = KEYS_DATA.o1

      if (matchedConfig) {
        setPressedKeys((prev) => ({ ...prev, [matchedConfig.id]: false }))
        handleKeyAction(matchedConfig)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyAction])

  return (
    <div className="relative mx-auto mt-6 mb-12 flex w-full max-w-2xl flex-col items-center">
      {/* 3D Keycap Illustrated Cluster (Exact Layout & Proportions from Reference) */}
      <div className="w-full drop-shadow-md">
        <svg
          viewBox="0 0 590 226"
          className="h-auto w-full select-none overflow-visible"
        >
          {/* Enter Key (Rendered first in bottom layer so it does not overlap on top of T or O) */}
          <SvgEnterKey
            isPressed={pressedKeys.enter}
            onPress={handleKeyAction}
          />

          {/* Row 1: P, O, R, T */}
          <SvgKeyCap
            config={KEYS_DATA.p}
            isPressed={pressedKeys.p}
            onPress={handleKeyAction}
          />
          <SvgKeyCap
            config={KEYS_DATA.o1}
            isPressed={pressedKeys.o1}
            onPress={handleKeyAction}
          />
          <SvgKeyCap
            config={KEYS_DATA.r}
            isPressed={pressedKeys.r}
            onPress={handleKeyAction}
          />
          <SvgKeyCap
            config={KEYS_DATA.t}
            isPressed={pressedKeys.t}
            onPress={handleKeyAction}
          />

          {/* Row 2: F, O, L, I, O (Rendered on top of Row 1 and Enter key) */}
          <SvgKeyCap
            config={KEYS_DATA.f}
            isPressed={pressedKeys.f}
            onPress={handleKeyAction}
          />
          <SvgKeyCap
            config={KEYS_DATA.o2}
            isPressed={pressedKeys.o2}
            onPress={handleKeyAction}
          />
          <SvgKeyCap
            config={KEYS_DATA.l}
            isPressed={pressedKeys.l}
            onPress={handleKeyAction}
          />
          <SvgKeyCap
            config={KEYS_DATA.i}
            isPressed={pressedKeys.i}
            onPress={handleKeyAction}
          />
          <SvgKeyCap
            config={KEYS_DATA.o3}
            isPressed={pressedKeys.o3}
            onPress={handleKeyAction}
          />
        </svg>
      </div>

      {/* Discreet Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="pointer-events-none absolute -bottom-10 rounded-full border border-black/10 bg-ink px-4 py-1 text-xs font-semibold text-paper shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
