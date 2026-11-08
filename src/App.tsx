import { lazy, Suspense } from 'react'

// The site is one app (src/v6): the split-screen shell stays mounted and swaps the page on the right. Loaded lazily
// so the first paint only waits for the shell's own code.
const Site = lazy(() => import('./v6/App'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Site />
    </Suspense>
  )
}
