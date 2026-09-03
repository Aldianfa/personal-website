import { supabase } from '../supabaseClient'

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
    .single()

  if (error) {
    console.error('Error fetching story:', error)
    return null
  }

  return data
}

export async function getAllStories() {
  const { data, error } = await supabase
    .from('story_logs')
    .select('id, title, slug, year, period_label, category, short_summary, cover_image, is_featured')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching stories:', error)
    return []
  }

  return data
}