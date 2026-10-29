import { lazy, Suspense } from 'react'

// Each layout ships its own global stylesheet, so only the chosen one is loaded.
// The previous layout stays reachable at ?v=3 for comparison.
const V3 = lazy(() => import('./v3/Portfolio'))
const V4 = lazy(() => import('./v4/Portfolio'))
// Case studies share the v4 design, so they're one site with the homepage.
const ProjectWms = lazy(() => import('./v4/ProjectWms'))
const ProjectVlife = lazy(() => import('./v4/ProjectVlife'))
const ProjectQazaq = lazy(() => import('./v4/ProjectQazaq'))
const CASES: Record<string, typeof ProjectWms> = { wms: ProjectWms, vlife: ProjectVlife, qazaq: ProjectQazaq }

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const Page = CASES[params.get('project') ?? ''] ?? (params.get('v') === '3' ? V3 : V4)
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  )
}
