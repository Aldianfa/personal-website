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

export async function getAllStories({ throwOnError = false } = {}) {
  const { data, error } = await supabase
    .from('story_logs')
    .select('id, title, slug, year, period_label, category, short_summary, cover_image, is_featured')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching stories:', error)
    if (throwOnError) throw error
    return []
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
