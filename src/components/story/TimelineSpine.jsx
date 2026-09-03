import { motion } from 'framer-motion'

function TimelineSpine() {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 1.2, ease: [0.4, 0.0, 0.2, 1] }}
      style={{ originY: 0 }}
      className="absolute left-0 top-3 bottom-4 w-px bg-gradient-to-b from-accent via-accent/25 to-transparent"
    />
  )
}

export default TimelineSpine
