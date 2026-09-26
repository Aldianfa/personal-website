# Project detail content

The `/work/:slug` page displays these fields:

| Section | Source |
| --- | --- |
| My Role | `projects.role` |
| Tools | `project_technologies` linked to `technologies.name` |
| Context | `projects.context` |
| Description | `projects.description` |

Run [project-detail-fields.sql](sql/project-detail-fields.sql) in the Supabase SQL Editor before editing role and context in the Table Editor. This migration adds optional fields and preserves existing data. It has not been applied automatically.

Enter role, context, and description as plain text. Blank lines separate paragraphs; HTML is rendered as text. Empty fields show a short coming-soon message. The existing project query selects all project columns, so it works before and after the migration.
