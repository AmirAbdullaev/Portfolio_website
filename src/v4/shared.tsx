// Building blocks shared by every v4 page: the homepage and the project case studies.
import { CSSProperties, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { CV_URL, EMAIL, LINKEDIN_HANDLE, LINKEDIN_URL, TELEGRAM_HANDLE, TELEGRAM_URL } from '../constants'

const NAV = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contacts', label: 'Contacts' },
]
const NAV_IDS = NAV.map((n) => n.id)
/** Sections every page ends with (<Contacts />), so their links stay on the page instead of going to the homepage. */
const EVERY_PAGE_IDS = ['contacts']

/* ---------- icons ---------- */

export type IconProps = { className?: string; size?: number }
export const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const ArrowNE = ({ className = 'i-ne', size = 18 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <path d="M7 17 17 7" /><path d="M8 7h9v9" />
  </svg>
)
export const ArrowE = ({ className = 'i-e', size = 18 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
  </svg>
)
export const ArrowUp = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <path d="M12 19V5" /><path d="m6 11 6-6 6 6" />
  </svg>
)
export const Download = ({ className = 'i-down', size = 18 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <path d="M12 4v11" /><path d="m7.5 11 4.5 4.5 4.5-4.5" /><path d="M5 19h14" />
  </svg>
)
const Copy = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h8" />
  </svg>
)
const Check = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
export const Telegram = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M21.5 3.5 2.8 10.7c-.9.35-.88 1.63.03 1.95l4.6 1.6 1.75 5.3c.27.8 1.3.99 1.83.33l2.5-3.1 4.6 3.38c.6.44 1.46.11 1.6-.62l3.3-14.4c.16-.72-.54-1.32-1.51-.94z" />
  </svg>
)
const Menu = ({ open }: { open: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
    {open ? (<><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>) : (<><path d="M4 8h16" /><path d="M4 16h16" /></>)}
  </svg>
)

/* ---------- hooks ---------- */

/**
 * Fades `[data-reveal]` elements in the first time they enter the viewport.
 * Marks them with a `data-in` attribute rather than a class: React rewrites `className`
 * on re-render, which would wipe a class added here and hide the element again.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.v4 [data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-in', ''))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', '')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/**
 * Scrolls to the `#section` in the address once the page has rendered. The browser tries this itself
 * on load, but React hasn't built the sections yet at that point, so links like `/#about` from a
 * case study would otherwise land at the top of the homepage.
 */
export function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    let landedAt = -1
    let cancelled = false
    const jump = () => {
      // Late fonts and images shift the layout, so re-align — unless the visitor has scrolled since.
      if (cancelled || (landedAt >= 0 && Math.abs(window.scrollY - landedAt) > 2)) return
      // 'instant', not 'auto': 'auto' defers to the CSS `scroll-behavior: smooth` and would animate.
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
      landedAt = window.scrollY
    }
    const raf = requestAnimationFrame(jump)
    document.fonts?.ready.then(jump)
    if (document.readyState !== 'complete') window.addEventListener('load', jump, { once: true })
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('load', jump)
    }
  }, [])
}

/**
 * Caps each stacking panel's sticky offset so a panel taller than the viewport sticks by its bottom edge
 * instead of its top — otherwise its lower part would never scroll into view before the next panel covers it.
 */
export function useStickyFit(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const list = ref.current
    if (!list) return
    const items = Array.from(list.children) as HTMLElement[]
    const fit = () => items.forEach((li) => li.style.setProperty('--stick-max', `${window.innerHeight - li.offsetHeight - 16}px`))
    fit()
    const ro = new ResizeObserver(fit)
    items.forEach((li) => ro.observe(li))
    window.addEventListener('resize', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [ref])
}

/**
 * Returns the id of the section currently under the top bar, or null when none of `ids` is there (the hero, or
 * on a case study everything above Contacts). A section that leaves clears itself only if it is still the active
 * one, so the hand-over between two adjacent sections never flickers through null.
 */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id
          setActive((prev) => (e.isIntersecting ? id : prev === id ? null : prev))
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [ids])
  return active
}

export const reveal = (delay = 0) => ({ 'data-reveal': '', style: { '--d': `${delay}ms` } as CSSProperties })

/** Without `image` the frame shows the hatched placeholder, so layouts hold until the real file is added. */
export function Media({ image, position, zoom, className = '', label, children }: { image?: string; position?: string; zoom?: number; className?: string; label?: string; children?: ReactNode }) {
  return (
    <div
      className={`media ${className}`}
      style={{ '--img': image ? `url('${image}')` : 'none', '--pos': position ?? 'center', ...(zoom && { '--size': `auto ${zoom * 100}%` }) } as CSSProperties}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {children}
    </div>
  )
}

/** Dev-only 12-column overlay, toggled with Shift + G. */
export function GridOverlay() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.code === 'KeyG' && !(e.target instanceof HTMLInputElement)) setOn((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  if (!on) return null
  return (
    <div className="grid-overlay" aria-hidden="true">
      <div className="wrap grid">
        {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
      </div>
    </div>
  )
}

/* ---------- sections ---------- */

/**
 * The name in the top bar always links to the homepage. On the homepage itself it doesn't reload:
 * it scrolls back to the top and drops any `#section` from the address. Modified clicks
 * (new tab, new window) are left to the browser.
 */
function goHome(e: React.MouseEvent<HTMLAnchorElement>) {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  e.preventDefault()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  history.replaceState(null, '', window.location.pathname + window.location.search)
}

/**
 * On a page other than the homepage, `home` is the homepage URL and the nav links point back into it —
 * except Contacts, which every page ends with and so is scrolled to in place.
 */
export function TopBar({ home }: { home?: string }) {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(home ? EVERY_PAGE_IDS : NAV_IDS)
  const href = (id: string) => (home && !EVERY_PAGE_IDS.includes(id) ? `${home}#${id}` : `#${id}`)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <a className="brand t-body w-500" href={home ?? '/'} onClick={home ? undefined : goHome} aria-label="Amir Abdullaev — home">
            <span className="brand__mark t-label" aria-hidden="true">AA</span>
            <span>Amir Abdullaev</span>
          </a>
          <nav className="nav t-small w-500" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.id} href={href(n.id)} aria-current={active === n.id ? 'true' : undefined}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="topbar__actions">
            <a className="btn btn-line t-small w-500" href={CV_URL} download aria-label="Download CV">
              <span>Download CV</span>
              <Download size={16} />
            </a>
            <a className="btn btn-ink t-small w-500" href={TELEGRAM_URL} target="_blank" rel="noopener" aria-label="Write on Telegram">
              <span>Telegram</span>
              <Telegram size={16} />
            </a>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <Menu open={open} />
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-menu" className={`sheet${open ? ' is-open' : ''}`} aria-hidden={!open}>
        {NAV.map((n) => (
          <a key={n.id} className="t-m" href={href(n.id)} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            {n.label}
            <ArrowE />
          </a>
        ))}
      </div>
    </>
  )
}


function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  const ta = document.createElement('textarea')
  ta.value = text
  document.body.appendChild(ta)
  ta.select()
  try {
    document.execCommand('copy')
  } finally {
    document.body.removeChild(ta)
  }
  return Promise.resolve()
}

function ChannelTop({ label, action, actionVisible, icon }: { label: string; action: string; actionVisible?: boolean; icon: ReactNode }) {
  return (
    <span className="channel__top">
      <span className="t-label">{label}</span>
      <span className="channel__cta">
        <span className={`channel__action t-small w-500${actionVisible ? ' is-visible' : ''}`} aria-live="polite">{action}</span>
        <span className="channel__icon">{icon}</span>
      </span>
    </span>
  )
}

export function Contacts() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>()
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = () => {
    const done = () => {
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    }
    copyText(EMAIL).then(done, done)
  }

  return (
    <section id="contacts" className="contacts" aria-labelledby="contacts-title">
      <div className="wrap">
        <h2 id="contacts-title" className="contacts__title t-xl" {...reveal()}>Contacts<span>.</span></h2>

        <div className="grid channels">
          <a className="channel is-link" href={TELEGRAM_URL} target="_blank" rel="noopener" {...reveal(0)}>
            <ChannelTop label="Telegram" action="Open" icon={<ArrowNE />} />
            <span className="channel__value t-m">{TELEGRAM_HANDLE}</span>
          </a>
          <a className="channel is-link" href={LINKEDIN_URL} target="_blank" rel="noopener" {...reveal(80)}>
            <ChannelTop label="LinkedIn" action="Open" icon={<ArrowNE />} />
            <span className="channel__value t-m">{LINKEDIN_HANDLE}</span>
          </a>
          <button type="button" className="channel" onClick={copyEmail} aria-label={`Copy email address ${EMAIL}`} {...reveal(160)}>
            <ChannelTop label="Email" action={copied ? 'Copied' : 'Copy'} actionVisible={copied} icon={copied ? <Check /> : <Copy />} />
            <span className="channel__value t-m">{EMAIL}</span>
          </button>
          <a className="channel is-download" href={CV_URL} download {...reveal(240)}>
            <ChannelTop label="CV" action="Download" icon={<Download className="" />} />
            <span className="channel__value t-m">Download CV</span>
          </a>
        </div>

        <footer className="footer t-small">
          <span>© {new Date().getFullYear()} Amir Abdullaev</span>
          <a href="#top">Back to top <ArrowUp /></a>
        </footer>
      </div>
    </section>
  )
}

