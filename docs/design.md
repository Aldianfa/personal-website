# Design Direction: Marco-Inspired Personal Story Website

## Reference

Primary inspiration: https://www.marco.fyi/

Use Marco's site as a directional reference for interaction, navigation, density, and portfolio storytelling. Do not copy his content, branding, exact layouts, imagery, or visual identity.

## Design Goal

The website should feel like a personal story-driven portfolio: compact, expressive, playful, and thoughtful. It should present Izzul's journey as a set of story logs and related work, not as a standard resume or static portfolio.

The target feeling is:

- Personal, direct, and conversational.
- Work-focused without feeling corporate.
- Clean and minimal, but not empty.
- Lightweight, tactile, and slightly playful.
- More like a curated workspace/story archive than a marketing landing page.

## Visual Principles

- Prefer compact sections over oversized marketing blocks.
- Use soft off-white backgrounds, dark text, muted secondary copy, and one restrained blue accent.
- Use rounded cards, subtle borders, light shadows, and strong image previews.
- Keep typography simple and readable. Large headings are allowed, but only for page-level moments.
- Use generous whitespace around major story moments, but keep cards and navigation dense enough to feel intentional.
- Avoid neon-heavy styling, agency-style service sections, pricing tables, and decorative effects that do not support the story.

## Navigation

Create a small persistent navigation inspired by Marco's compact top navigation.

Recommended items:

- `Izzul` as the identity/home link.
- `Stories` anchor or home section link.
- `Projects` anchor when project sections become prominent.
- `About` anchor if an about section is added later.
- Optional external/contact link.

Behavior:

- Keep it lightweight and unobtrusive.
- Use small text, rounded pill surfaces, and clear hover states.
- On story detail pages, include a clear route back to the story list.
- Do not add complex menus for v1.

## Homepage

The homepage should be a story/work index.

Recommended structure:

1. Compact personal intro.
2. Featured story or featured work preview.
3. Story/work card grid or shelf.
4. Optional timeline treatment as metadata, not the only layout idea.

Homepage cards should:

- Show title, short summary, period label, category, and featured state when available.
- Use cover images as the main visual anchor.
- Feel like work tiles or saved artifacts.
- Have subtle motion on hover.
- Stay readable and polished on mobile.

## Story Detail

Story detail pages should feel like case studies or narrative articles.

Recommended structure:

1. Navigation/back link.
2. Hero with title, year or period, short summary, metadata chips, and optional cover image.
3. Story sections rendered in order.
4. Related project showcases when available.

Behavior:

- Keep the PRD block-based rendering model.
- Do not add extra data fetching for related projects.
- Preserve loading and not-found states.
- Make section transitions subtle with Framer Motion.

## Story Blocks

Each story section type should have a distinct role:

- `text`: article prose, readable line length, strong heading rhythm.
- `quote`: pull quote/callout moment with stronger visual contrast.
- `image`: large rounded visual pause; support `metadata.layout` as `full` or `side`.
- `stat`: compact evidence/impact tiles.
- `projects`: work showcase cards with image, summary, technologies, and links.

Do not use undefined semantic classes unless they are defined in CSS. Prefer Tailwind utilities or documented component classes.

## Implementation Constraints

- Keep the existing React, Vite, Tailwind, Framer Motion, and Supabase stack.
- Keep existing routes: `/` and `/story/:slug`.
- Keep existing database schema and query shape from `prd.md`.
- Do not add admin/CMS/auth/search/filtering unless explicitly requested.
- Do not commit `.env` or hardcode Supabase credentials.

## Acceptance Criteria

- The site feels closer to Marco's compact, personal, work-focused style while still being clearly Izzul's site.
- Homepage does not feel like a generic blog list.
- Story detail pages read like polished case studies.
- All PRD-defined story block types render correctly.
- Mobile and desktop layouts remain clean with no overlapping text or unstable card sizing.
- `npm run lint` and `npm run build` pass after design implementation.
