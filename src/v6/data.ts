// What the site needs to know about its pages, derived from the shared content.
import { MORE_PROJECTS, PROJECTS, Project } from '../content'

/** A case study on the site: its `?project=` key and a name short enough for the left column. */
export type Case = Project & { key: string; href: string; short: string }

export const WORK = [...PROJECTS, ...MORE_PROJECTS]

/** Projects with a case study here, in the order of the All projects page. */
export const CASES: Case[] = WORK.filter((p) => p.href?.startsWith('/?project=')).map((p) => {
  const key = p.href!.split('=')[1]
  return { ...p, href: p.href!, key, short: p.short ?? p.title }
})

export const caseKey = () => new URLSearchParams(window.location.search).get('project')

/**
 * Which page an address shows: a case study's key, 'about' (`?page=about`; the earlier `?page=experience` still
 * leads there) or 'home', which is the list of all projects (`?page=projects` is the same page).
 */
export function routeOf(url: URL | Location): string {
  const params = new URLSearchParams(url.search)
  const project = params.get('project')
  if (project && CASES.some((c) => c.key === project)) return project
  const page = params.get('page')
  if (page === 'about' || page === 'experience') return 'about'
  return 'home'
}
