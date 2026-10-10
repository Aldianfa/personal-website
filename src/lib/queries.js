import { supabase } from '../supabaseClient'

export const FALLBACK_STORY_1 = {
  id: 'story-1-vibe-coder',
  slug: '1',
  title: 'From Vibe Coding to Intentional Engineering',
  year: 2024,
  period_label: '2024 — Present',
  category: 'Craft & Retrospective',
  role: 'Software Developer',
  organization: 'Medicare & Independent Systems',
  location: 'Indonesia',
  short_summary:
    'How rapid experimentation, intuition, and software architecture converged to shape the way I build mission-critical healthcare systems and deliberate digital products.',
  cover_image: null,
  is_published: true,
  story_sections: [
    {
      id: 'sec-1',
      type: 'text',
      heading: 'The Genesis of "Vibe Coding"',
      content:
        'Every software journey begins with the spark of intuition. You have a vision, you open the editor, and you build by feel — testing assumptions rapidly, exploring patterns, and seeing what clicks. For a long time, building software was an exploratory sprint: getting things on screen as fast as ideas arrived.',
    },
    {
      id: 'sec-2',
      type: 'quote',
      heading: null,
      content:
        'Vibe coding gives you the velocity to prototype with passion; architectural discipline gives systems the endurance to serve real human lives.',
      metadata: { attribution: 'Izzul • Engineering Notes' },
    },
    {
      id: 'sec-3',
      type: 'text',
      heading: 'When Reality Meets Complex Healthcare Workflows',
      content:
        'Transitioning into healthcare IT and enterprise backend monoliths changed how I think. In a clinic or hospital EMR (Electronic Medical Record), a single unindexed query or an unhandled edge case in pharmacy inventory isn’t just a bug — it delays care for real patients. Intuition had to mature into rigorous database normalization, declarative workflows with Laravel & Filament, and intentional state management.',
    },
    {
      id: 'sec-4',
      type: 'stat',
      heading: 'Core Architecture Milestones',
      content: null,
      metadata: {
        items: [
          { value: '12+', label: 'Clinical Modules Delivered' },
          { value: '< 250ms', label: 'Average Database Query Time' },
          { value: '100%', label: 'Intentional System Focus' },
        ],
      },
    },
    {
      id: 'sec-5',
      type: 'text',
      heading: 'The Hybrid Mindset Today',
      content:
        'Today, being a "vibe coder with a curious mind" means retaining that playful, high-velocity curiosity while grounding every system in solid engineering fundamentals. The vibe is the creativity; the code is the craftsmanship.',
    },
  ],
}

export function calculateReadingTime(story) {
  if (!story) return '3 min read'
  let words = 0
  const addWords = (text) => {
    if (typeof text === 'string') {
      words += text.trim().split(/\s+/).filter(Boolean).length
    }
  }
  addWords(story.title)
  addWords(story.short_summary)
  if (Array.isArray(story.story_sections) && story.story_sections.length > 0) {
    story.story_sections.forEach((sec) => {
      addWords(sec.heading)
      addWords(sec.content)
      if (sec.metadata?.attribution) addWords(sec.metadata.attribution)
      if (Array.isArray(sec.metadata?.items)) {
        sec.metadata.items.forEach((item) => {
          addWords(item.value)
          addWords(item.label)
        })
      }
    })
  } else {
    words += 550
  }
  const minutes = Math.max(1, Math.ceil(words / 180))
  return `${minutes} min read`
}

export async function getStoryBySlug(slug) {
  const { data, error } = await supabase
    .from('story_logs')
    .select(`
      *,
      story_sections (
        *,
        story_projects (
          *,
          projects (
            *,
            project_technologies (
              technologies (*)
            )
          )
        )
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .order('sort_order', { referencedTable: 'story_sections', ascending: true })
    .maybeSingle()

  if (error) {
    console.error('Error fetching story:', error)
  }

  if (data) return data

  // Fallback for story 1 if not yet created in Supabase
  if (slug === '1' || slug === 'vibe-coder') {
    return FALLBACK_STORY_1
  }

  return null
}

export async function getAllStories({ throwOnError = false } = {}) {
  const fallbackItem = {
    id: FALLBACK_STORY_1.id,
    title: FALLBACK_STORY_1.title,
    slug: FALLBACK_STORY_1.slug,
    year: FALLBACK_STORY_1.year,
    period_label: FALLBACK_STORY_1.period_label,
    category: FALLBACK_STORY_1.category,
    short_summary: FALLBACK_STORY_1.short_summary,
    cover_image: FALLBACK_STORY_1.cover_image,
    is_featured: true,
  }

  const { data, error } = await supabase
    .from('story_logs')
    .select('id, title, slug, year, period_label, category, short_summary, cover_image, is_featured')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching stories:', error)
    if (throwOnError) throw error
    return [fallbackItem]
  }

  // If no stories in database yet, provide story 1 as starter chapter
  if (!data || data.length === 0) {
    return [fallbackItem]
  }

  // Ensure story 1 is always available for reading if not present in DB
  const hasStory1 = data.some((s) => s.slug === '1' || s.slug === 'vibe-coder')
  if (!hasStory1) {
    return [fallbackItem, ...data]
  }

  return data
}

export async function getFeaturedProject() {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_technologies (
        technologies (*)
      )
    `)
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('Error fetching featured project:', error)
    return null
  }

  return data
}

export async function getAllProjects({ throwOnError = false } = {}) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_technologies (
        technologies (*)
      )
    `)
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error)
    if (throwOnError) throw error
    return []
  }

  return data
}
