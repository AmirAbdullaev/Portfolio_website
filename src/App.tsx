import { lazy, Suspense } from 'react'

// Each layout ships its own global stylesheet, so only the chosen one is loaded.
// The previous layout stays reachable at ?v=3 for comparison.
const V3 = lazy(() => import('./v3/Portfolio'))
const V4 = lazy(() => import('./v4/Portfolio'))
// Case studies share the v4 design, so they're one site with the homepage.
const ProjectWms = lazy(() => import('./v4/ProjectWms'))
const ProjectVlife = lazy(() => import('./v4/ProjectVlife'))
const ProjectQazaq = lazy(() => import('./v4/ProjectQazaq'))
const ProjectArnur = lazy(() => import('./v4/ProjectArnur'))
const ProjectQsight = lazy(() => import('./v4/ProjectQsight'))
const CASES: Record<string, typeof ProjectWms> = { wms: ProjectWms, vlife: ProjectVlife, qazaq: ProjectQazaq, qsight: ProjectQsight, arnur: ProjectArnur }
// Other pages of the same site, by ?page=.
const AllProjects = lazy(() => import('./v4/AllProjects'))
const PAGES: Record<string, typeof ProjectWms> = { projects: AllProjects }

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const Page = CASES[params.get('project') ?? ''] ?? PAGES[params.get('page') ?? ''] ?? (params.get('v') === '3' ? V3 : V4)
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  )
}
