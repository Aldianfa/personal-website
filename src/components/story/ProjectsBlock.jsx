function ProjectsBlock({ section }) {
  const storyProjects = section.story_projects || []

  if (storyProjects.length === 0) return null

  return (
    <div className="-mx-2 rounded-[2rem] border border-ink/10 bg-surface p-4 md:-mx-12 md:p-8">
      <div className="mb-8 md:flex md:items-end md:justify-between md:gap-8">
        <div>
          {section.heading && (
            <h3 className="text-3xl font-semibold leading-tight md:text-4xl">
              {section.heading}
            </h3>
          )}
          {section.content && (
            <p className="mt-3 max-w-2xl text-muted md:text-lg">{section.content}</p>
          )}
        </div>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-accent md:mt-0">
          Related work
        </p>
      </div>

      <div className="space-y-5">
        {storyProjects.map((sp) => {
          const project = sp.projects
          if (!project) return null

          const technologies = (project.project_technologies || [])
            .map((pt) => pt.technologies?.name)
            .filter(Boolean)

          return (
            <article
              key={sp.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-[0_18px_60px_rgba(29,29,31,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(29,29,31,0.14)]"
            >
              {project.cover_image && (
                <div className="overflow-hidden bg-ink/5 aspect-[16/8]">
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                  {project.year && <span>{project.year}</span>}
                  {sp.label && (
                    <>
                      <span className="text-ink/25">/</span>
                      <span>{sp.label}</span>
                    </>
                  )}
                </div>

                <h4 className="mt-3 text-2xl font-semibold leading-tight">
                  {project.title}
                </h4>
                {sp.context && (
                  <p className="mt-3 text-sm font-medium text-accent">{sp.context}</p>
                )}
                {project.summary && (
                  <p className="mt-3 leading-relaxed text-ink/75">{project.summary}</p>
                )}

                {technologies.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-ink/[0.06] px-3 py-1 text-xs font-medium text-ink/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {(project.project_url || project.github_url) && (
                  <div className="mt-7 flex flex-wrap gap-3">
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-ink"
                      >
                        View project
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-ink/10 px-5 py-2 text-sm font-semibold text-ink/75 transition hover:border-accent/40 hover:text-accent"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectsBlock
