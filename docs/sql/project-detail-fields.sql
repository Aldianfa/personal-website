-- Run once in the Supabase SQL Editor to enable the new project detail fields.
-- Existing project content is preserved. Tools use project_technologies.
alter table public.projects
  add column if not exists role text,
  add column if not exists context text;

comment on column public.projects.role is 'Personal role and responsibilities for the project.';
comment on column public.projects.context is 'Project background, audience, and problem being addressed.';
