// The site as one app: the split-screen shell (the panel about me on the left) stays mounted and only the
// right-hand page changes: all projects (the homepage), a case study, or About.
// Internal links are caught here and swapped in without a reload: the old page drifts up and fades out,
// the new one rises in from below.
import { ComponentType, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Analytics, type BeforeSendEvent } from '@vercel/analytics/react'
import { CASES, routeOf } from './data'
import { Shell } from './Shell'
import './base.css'
import './v6.css'

type Module = { default: ComponentType }
const PAGES: Record<string, () => Promise<Module>> = {
  home: () => import('./AllProjects'),   // the homepage is the full list of projects
  wms: () => import('./ProjectWms'),
  vlife: () => import('./ProjectVlife'),
  qazaq: () => import('./ProjectQazaq'),
  qsight: () => import('./ProjectQsight'),
  arnur: () => import('./ProjectArnur'),
  about: () => import('./About'),
}

/**
 * Vercel Web Analytics lists pages by path, without the query, and every page here is "/" with a query
 * (?project=wms, ?page=about). So page views are reported under a readable path of their own — /project/wms,
 * /about — and the dashboard shows each case study separately. The site's own addresses don't change.
 */
const analyticsPath = (route: string) => (route === 'home' ? '/' : route === 'about' ? '/about' : `/project/${route}`)
let reportedPath = analyticsPath(routeOf(window.location))
const readablePath = (event: BeforeSendEvent): BeforeSendEvent => ({ ...event, url: window.location.origin + reportedPath })

const SITE = 'Amir Abdullaev'
function titleOf(route: string) {
  if (route === 'home') return `${SITE} — Product Designer`
  if (route === 'about') return `About — ${SITE}`
  return `${CASES.find((c) => c.key === route)?.short} — ${SITE}`
}

/** How long the old page takes to leave, in ms. Matches `.view.is-out` in base.css. */
const LEAVE_MS = 280
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Where to land once a page is in: an element by id, a remembered scroll position, or the top. */
type Landing = { hash?: string; y?: number }

/** Links this app handles itself: same origin, the root path, and not one of the old versions (?v=). */
function ownUrl(href: string): URL | null {
  const url = new URL(href, window.location.href)
  if (url.origin !== window.location.origin || url.pathname !== '/' || url.searchParams.has('v')) return null
  return url
}

function land({ hash, y }: Landing) {
  // A chapter's id sits on its name, which is sticky: measure from the chapter instead, or a stuck name would
  // send the page past the chapter's start.
  const named = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  const el = named?.closest('.cs-chapter') ?? named
  if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
  else window.scrollTo({ top: y ?? 0, behavior: 'instant' as ScrollBehavior })
}

export default function App() {
  const [page, setPage] = useState<{ route: string; Comp: ComponentType | null; n: number }>({ route: routeOf(window.location), Comp: null, n: 0 })
  const [leaving, setLeaving] = useState(false)
  const landing = useRef<Landing | null>({ hash: window.location.hash })
  const token = useRef(0)

  useEffect(() => {
    history.scrollRestoration = 'manual'
    PAGES[page.route]().then((m) => setPage((p) => ({ ...p, Comp: m.default })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Once the new page has rendered, jump to where it should open (while it is still fading in).
  useLayoutEffect(() => {
    if (!page.Comp || !landing.current) return
    const target = landing.current
    landing.current = null
    land(target)
    // Late fonts can shift a deep link; re-align once they are in, unless the visitor has scrolled since.
    if (target.hash) {
      const at = window.scrollY
      document.fonts?.ready.then(() => Math.abs(window.scrollY - at) < 2 && land(target))
    }
    document.title = titleOf(page.route)
  }, [page])

  const go = useCallback(async (url: URL, push: boolean, y?: number) => {
    const route = routeOf(url)
    const samePage = route === page.route && url.search === window.location.search
    if (samePage) {
      // A section of the page that is already open: scroll there, no transition.
      if (push) history.replaceState(history.state, '', url)
      const named = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null
      const el = named?.closest('.cs-chapter') ?? named   // see land(): chapter names are sticky
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else if (push) window.scrollTo({ top: 0, behavior: 'smooth' })
      else if (y !== undefined) window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
      return
    }
    const t = ++token.current
    // Remember where this page was left, for the back button.
    history.replaceState({ ...(history.state ?? {}), y: window.scrollY }, '')
    setLeaving(true)
    const [mod] = await Promise.all([PAGES[route](), wait(LEAVE_MS)])
    if (t !== token.current) return
    if (push) history.pushState({ y: 0 }, '', url)
    landing.current = { hash: url.hash, y }
    setLeaving(false)
    setPage((p) => ({ route, Comp: mod.default, n: p.n + 1 }))
  }, [page.route])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return
      const url = ownUrl(a.href)
      if (!url) return
      e.preventDefault()
      go(url, true)
    }
    const onPop = () => go(new URL(window.location.href), false, history.state?.y ?? 0)
    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPop)
    }
  }, [go])

  const { Comp } = page
  reportedPath = analyticsPath(page.route)
  return (
    <Shell route={page.route}>
      <div key={page.n} className={`view${leaving ? ' is-out' : ''}`}>
        {/* No footer here: the left column (on phones, the end of the page) carries the contacts and experience. */}
        {Comp && <Comp />}
      </div>
      {/* Visitors and page views, cookie-free, on the live site only. A new path counts as a new page view. */}
      <Analytics route={reportedPath} path={reportedPath} beforeSend={readablePath} />
    </Shell>
  )
}
