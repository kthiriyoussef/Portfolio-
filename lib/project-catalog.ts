import { copy, type Locale } from "@/lib/portfolio-data";
import { projectStories, type ProjectStoryVisual } from "@/lib/project-stories";

export const projectSlugs = [
  "agil-energy-crm",
  "warehouse-management",
  "intelligent-recruitment",
  "healthcare-orientation",
  "formini",
  "personalai",
  "eventopia",
  "automotive-agency",
  "smartphone-price-tracker",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];
export type ProjectCardContent = (typeof copy.en.projects)[number];
export type LocalizedProject = {
  slug: ProjectSlug;
  en: ProjectCardContent;
  fr: (typeof copy.fr.projects)[number];
  story?: NonNullable<(typeof projectStories)[ProjectStoryVisual]>;
};

function isProjectStoryVisual(visual: string): visual is ProjectStoryVisual {
  return Object.prototype.hasOwnProperty.call(projectStories, visual);
}

function isProjectSlug(slug: string): slug is ProjectSlug {
  return (projectSlugs as readonly string[]).includes(slug);
}

export const projectCatalog: LocalizedProject[] = copy.en.projects.map((en) => {
  if (!isProjectSlug(en.slug)) {
    throw new Error(`Unknown project slug in English portfolio content: ${en.slug}`);
  }

  const fr = copy.fr.projects.find((project) => project.slug === en.slug);
  if (!fr) {
    throw new Error(`Missing French project content for slug: ${en.slug}`);
  }

  const story = isProjectStoryVisual(en.visual)
    ? projectStories[en.visual]
    : undefined;

  return { slug: en.slug, en, fr, story };
});

export function getProject(slug: string): LocalizedProject | undefined {
  return projectCatalog.find((project) => project.slug === slug);
}

export function getLocalizedProject(project: LocalizedProject, locale: Locale) {
  return project[locale];
}
