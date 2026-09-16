import { motion } from 'framer-motion'
import TextBlock from './TextBlock'
import QuoteBlock from './QuoteBlock'
import ImageBlock from './ImageBlock'
import StatBlock from './StatBlock'
import ProjectsBlock from './ProjectsBlock'

function renderBlock(section) {
  switch (section.type) {
    case 'text': return <TextBlock section={section} />
    case 'quote': return <QuoteBlock section={section} />
    case 'image': return <ImageBlock section={section} />
    case 'stat': return <StatBlock section={section} />
    case 'projects': return <ProjectsBlock section={section} />
    default:
      console.warn(`Unknown section type: ${section.type}`)
      return null
  }
}

function StorySection({ section }) {
  const block = renderBlock(section)
  if (!block) return null

  const motionByType = {
    quote: { opacity: 0, scale: 0.96, y: 18 },
    image: { opacity: 0, y: 36 },
    stat: { opacity: 0, y: 30 },
    projects: { opacity: 0, y: 30 },
    text: { opacity: 0, y: 20 },
  }

  return (
    <motion.div
      initial={motionByType[section.type] || motionByType.text}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {block}
    </motion.div>
  )
}

export default StorySection
