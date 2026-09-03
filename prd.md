# PRD: Personal Storytelling Website

> This document is intended for an AI coding agent (e.g. Claude Code) as the development reference. Follow the data structure, conventions, and milestone order below strictly unless instructed otherwise by the developer.

## 1. Project Overview

A personal website built around a **storytelling** approach, rather than a conventional static portfolio/CV. The author's journey (education, work, achievements) is presented as a collection of **"story logs"** — each story log contains a sequence of dynamic content blocks (narrative, quotes, images, statistics, related project showcases) rendered in order, like a narrative article.

**Core design principle:** *block-based content*. Each story is composed of sections with different `type` values, each with its own `metadata` (jsonb) structure. This allows new content types to be added in the future without major schema migrations.

## 2. Tech Stack (must be followed)

| Layer | Technology | Notes |
|---|---|---|
| Build tool | Vite | Not Create React App |
| Frontend framework | React | Functional components + hooks, no class components |
| Routing | react-router-dom | |
| Styling | Tailwind CSS | |
| Animation | Framer Motion | For transitions/scroll-based animation |
| Backend/DB | Supabase (PostgreSQL) | Accessed directly from the client via `@supabase/supabase-js`, no custom backend server |
| Hosting | Vercel | Auto-deploy from GitHub |
| Auth (not used in v1) | Supabase Auth | Reserved for a future admin panel phase |

**Environment variables** (`.env`, must not be committed):
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## 3. Database Schema (Supabase / PostgreSQL)

The schema is final for v1. Do not change table/column names without explicit confirmation from the developer.

```sql
create extension if not exists pgcrypto;

create table story_logs (
  id uuid primary key default gen_random_uuid(),
  title varchar not null,
  slug varchar unique not null,
  year int,
  period_label varchar,
  category varchar,
  role varchar,
  organization varchar,
  short_summary text,
  cover_image text,
  location varchar,
  visual_variant varchar,
  sort_order int default 0,
  is_featured boolean default false,
  is_published boolean default false,
  published_at timestamp,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table story_sections (
  id uuid primary key default gen_random_uuid(),
  story_log_id uuid not null references story_logs(id) on delete cascade,
  type varchar not null check (type in ('text', 'quote', 'image', 'stat', 'projects')),
  heading varchar,
  content text,
  media_url text,
  caption text,
  metadata jsonb,
  sort_order int default 0,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
create index idx_story_sections_log on story_sections(story_log_id);
create index idx_story_sections_log_sort on story_sections(story_log_id, sort_order);

create table projects (
  id uuid primary key default gen_random_uuid(),
  title varchar not null,
  slug varchar unique not null,
  year int,
  summary text,
  description text,
  cover_image text,
  project_url text,
  github_url text,
  is_featured boolean default false,
  is_published boolean default false,
  sort_order int default 0,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table story_projects (
  id uuid primary key default gen_random_uuid(),
  story_log_id uuid not null references story_logs(id) on delete cascade,
  story_section_id uuid references story_sections(id) on delete set null,
  project_id uuid not null references projects(id) on delete cascade,
  label varchar,
  context text,
  sort_order int default 0,
  created_at timestamp default now()
);
create index idx_story_projects_log on story_projects(story_log_id);
create index idx_story_projects_section on story_projects(story_section_id);
create index idx_story_projects_project on story_projects(project_id);
create index idx_story_projects_log_section_sort on story_projects(story_log_id, story_section_id, sort_order);

create table technologies (
  id uuid primary key default gen_random_uuid(),
  name varchar not null,
  slug varchar unique not null,
  category varchar,
  icon_url text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table project_technologies (
  project_id uuid not null references projects(id) on delete cascade,
  technology_id uuid not null references technologies(id) on delete cascade,
  primary key (project_id, technology_id)
);
```

### `metadata` (jsonb) convention per `story_sections.type`

| type | heading | content | media_url | metadata |
|---|---|---|---|---|
| `text` | optional | main narrative (markdown allowed) | - | `null` or `{ "text_align": "left" }` |
| `quote` | - | quote text | - | `{ "attribution": "..." }` (optional) |
| `image` | optional | - | image URL | `{ "alt": "...", "layout": "full" \| "side" }` |
| `stat` | optional | - | - | `{ "items": [{ "value": "6+", "label": "Departments" }, ...] }` |
| `projects` | optional | optional (short intro) | - | `null` — project data is pulled from the `story_projects` relation where `story_section_id = section.id` |

### RLS Policies (must be enabled on all tables)

```sql
alter table story_logs enable row level security;
alter table story_sections enable row level security;
alter table projects enable row level security;
alter table story_projects enable row level security;
alter table technologies enable row level security;
alter table project_technologies enable row level security;

create policy "Public read published" on story_logs for select using (is_published = true);
create policy "Public read access" on story_sections for select using (true);
create policy "Public read published" on projects for select using (is_published = true);
create policy "Public read access" on story_projects for select using (true);
create policy "Public read access" on technologies for select using (true);
create policy "Public read access" on project_technologies for select using (true);
```
There are no insert/update/delete policies for the `anon` role — content management is done directly via the Supabase Table Editor (out of scope for the frontend app in v1).

## 4. Target Folder Structure

```
src/
├── lib/
│   ├── supabaseClient.js
│   └── queries.js          # getStoryBySlug(slug), getAllStories()
├── components/
│   ├── story/
│   │   ├── StorySection.jsx    # switch based on section.type
│   │   ├── TextBlock.jsx
│   │   ├── QuoteBlock.jsx
│   │   ├── ImageBlock.jsx
│   │   ├── StatBlock.jsx
│   │   └── ProjectsBlock.jsx
│   └── StoryCard.jsx        # card for the home listing
├── pages/
│   ├── Home.jsx              # listing of all stories
│   └── StoryDetail.jsx       # single story detail by slug
├── App.jsx                   # routing setup
└── main.jsx
```

## 5. Query Reference (already validated, use as-is)

```js
// src/lib/queries.js
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
            project_technologies ( technologies (*) )
          )
        )
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .order('sort_order', { referencedTable: 'story_sections', ascending: true })
    .single()

  if (error) { console.error(error); return null }
  return data
}

export async function getAllStories() {
  const { data, error } = await supabase
    .from('story_logs')
    .select('id, title, slug, year, period_label, category, short_summary, cover_image, is_featured')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) { console.error(error); return [] }
  return data
}
```

## 6. Routing

| Route | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Listing of all published stories as cards |
| `/story/:slug` | `StoryDetail.jsx` | Full detail of one story, all sections rendered in order |

## 7. Scope (v1)

### In Scope
- Home page (story listing)
- Story Detail page with dynamic rendering per section type
- 5 block components: Text, Quote, Image, Stat, Projects
- ProjectsBlock displaying related projects + technologies
- Responsive (mobile & desktop)
- Basic scroll-based animation between sections (Framer Motion — fade/slide on scroll)
- Deploy to Vercel

### Out of Scope for v1 (do not implement unless explicitly requested)
- Custom admin panel/CMS
- Supabase Auth / login
- Contact form
- Story search/filtering
- Multi-language (i18n)
- Comments/reactions

## 8. Milestones / Task Breakdown

- [x] M1 — Set up React project (Vite)
- [x] M2 — Set up Supabase project + run table schema (see §3)
- [x] M3 — Seed initial data for testing
- [x] M4 — Connect React ⇄ Supabase (`supabaseClient.js`)
- [x] M5 — Implement `queries.js` (nested query, see §5)
- [ ] M6 — Dynamic components per `type` (`StorySection.jsx` + 5 block components, see §4 and the metadata convention in §3)
- [ ] M7 — `StoryDetail.jsx` page (routing `/story/:slug`, render sections by `sort_order`)
- [ ] M8 — `Home.jsx` page (listing via `getAllStories()`)
- [ ] M9 — Styling (Tailwind) & animation (Framer Motion)
- [ ] M10 — Deploy to Vercel, set environment variables, verify RLS in production

## 9. Acceptance Criteria for Remaining Milestones

**M6 — Dynamic components:**
- `StorySection` receives a `section` prop, switches on `section.type`, and renders the matching component as listed in §3.
- Each block component reads `metadata` according to the structure defined in §3 — do not assume any other structure.
- `ProjectsBlock` maps over `section.story_projects[].projects` (no separate fetch).
- If `section.type` is unrecognized, the component returns `null` (fail gracefully, never crash).

**M7 — Story Detail:**
- The `/story/:slug` route reads `slug` from URL params and calls `getStoryBySlug(slug)`.
- Sections are rendered in `sort_order` (already sorted by the query; no need to re-sort client-side unless there's a specific need).
- Handle both loading state and "story not found" state (`data === null`).

**M8 — Home/Listing:**
- Displays a card per story: `cover_image`, `title`, `short_summary`, `period_label`.
- Clicking a card navigates to `/story/:slug`.
- `is_featured` may be used for special styling/ordering (optional, non-blocking).

**M9 — Styling & Animation:**
- Mobile-first, with at minimum mobile, tablet, and desktop breakpoints.
- Scroll-triggered animation per section (fade-in/slide-in) without hurting performance (use Framer Motion's `whileInView`, not heavy per-frame animation).

**M10 — Deploy:**
- Environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are set in the Vercel dashboard, not hardcoded.
- Re-verify RLS: only rows with `is_published = true` appear in the production build.

## 10. Non-Functional Requirements

- Story detail data must be fetched in a **single nested query** (avoid waterfall/multiple fetches).
- Supabase credentials must never be committed to the repository (`.env` is in `.gitignore`).
- The `story_sections` structure is designed to be extensible — adding a new `type` in the future only requires adding a new value to the CHECK constraint plus a new React component, with no changes to the table schema.

## 11. Open Questions (undecided — agent should not assume answers)

- Is a custom admin panel/CMS needed in a future phase?
- Will `story_sections.type` grow to include more values (video, timeline, gallery)?
- Are dynamic meta tags (Open Graph) needed per story for social sharing?
