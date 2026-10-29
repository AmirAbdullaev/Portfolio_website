import { CSSProperties, Fragment, ReactNode, useEffect, useRef } from 'react'
import { ArrowE, Contacts, GridOverlay, Media, TopBar, reveal, useHashScroll, useReveal, useStickyFit } from './shared'
import { ArtDef, Cards, CaseHero, Chapter, Facts, HOME, OtherProjects, Photo, StackTile, Text } from './case'
import './v4.css'
import './case.css'

// Case study: Warehouse Management System. Content from Claude Design
// "Project - Warehouse Management System.dc.html", laid out on the v4 homepage grid.

const PROBLEM = [
  {
    title: 'Business goal',
    text: 'The warehouse ran on paper, Excel and 1C at the same time, so no single place held the truth about stock. Management had no live view of the warehouse and therefore no analytics to plan with. The plant wanted every operation recorded as it happens: control over parts, monitoring of what moves where, and less time spent on work that adds nothing.',
  },
  {
    title: 'User problem',
    text: 'Everything lived in a different place, and nothing was quick to find. The handhelds ran 1C in a window built for a desktop, so storekeepers spent their shift pinching and zooming on a frozen screen. Container unloading had no digital record at all — the team filmed arrivals on a phone so there would be some evidence later.',
  },
]

const CONSTRAINTS: { title: string; text: string; art: Art }[] = [
  {
    title: 'The terminal’s own guidelines',
    art: 'rules',
    text: 'The device comes with rules written for warehouse light: high-contrast colour only, nothing below 18px, and no tap target smaller than 72px. Every screen was drawn inside those numbers rather than scaled down to them afterwards.',
  },
  {
    title: 'A physical keyboard, not just a touchscreen',
    art: 'terminal',
    text: 'Every primary action had to be reachable from the hardware keys, and some actions exist only there. So the interface had to read as a keyboard interface first and a touch interface second.',
  },
  {
    title: 'The old system stays switched on',
    art: 'shield',
    text: 'A plant cannot stop while software is being replaced. The warehouse kept access to the old way of working throughout, which meant WMS had to win on its own merits — flow by flow, not by decree.',
  },
]

/**
 * A terminal screen in a decision's picture. `keys` turns the label into keycaps instead of a step number.
 * `crop: 'bottom'` shows the screen's lower half (it runs off the top edge) instead of the upper half.
 */
type Screen = { src: string; alt: string; step: string; keys?: string[]; crop?: 'bottom' }
/** `text` is a list of paragraphs. */
/**
 * `split` shows two parts of one screen side by side (no arrow) instead of steps of a flow.
 * `arrowAt` is how far down the screen the flow arrow sits, as a share of its height (default: the main button, 0.41).
 */
const DECISIONS: { title: string; text: string[]; screens?: Screen[]; split?: boolean; arrowAt?: number; device?: boolean }[] = [
  {
    title: 'One screen, one task',
    text: [
      'Every screen in the system asks for exactly one thing and then moves on. It is a rule for all flows, not a one-off.',
      'Sign-in is one example. Instead of email and password on the same screen, it takes two steps: email first, then password.',
      'Input fields have no default state: when a screen opens, its field is already active. The operator types straight from the hardware keyboard and confirms with ENT — no reaching across a large screen with dirty gloves.',
    ],
    screens: [
      { src: '/assets/wms-signin-email.png', alt: 'Sign-in, step 1: only the email field, already active, and a Next [ENT] button', step: 'Email' },
      { src: '/assets/wms-signin-password.png', alt: 'Sign-in, step 2: only the password field, already active, and a Sign in [ENT] button', step: 'Password' },
    ],
    device: true,
  },
  {
    title: 'Designed for the hardware keys',
    text: ['Inputs are focused the moment a screen opens, so a code can be typed or scanned with no tap at all, and every primary action on screen is mirrored on a physical key. Touch became the fallback rather than the main path, and screen taps dropped to a minimum.'],
    split: true,
    screens: [
      { src: '/assets/wms-placement.png', alt: 'Placement menu: each item carries its number key, [1] for cases and [2] for parts', step: 'Pick an item', keys: ['1', '2'] },
      { src: '/assets/wms-placement.png', alt: 'The bottom bar of the same screen: more actions open with the SHIFT key', step: 'More actions', keys: ['SHIFT'], crop: 'bottom' },
    ],
    device: true,
  },
  {
    title: 'Contrast as the hierarchy',
    text: [
      'Status banners change brightness, not just colour. Scanning a case shows a dark blue banner; the next step, scanning its cell, a light amber one. The step reads even when the hue does not.',
      'About 1 in 12 men has some form of colour vision deficiency, most often red–green. A difference in lightness survives it — a difference in hue alone often does not.',
      'The whole system sticks to high-contrast pairs, so a screen stays readable under any warehouse lighting and from a distance: the operator sees what the terminal wants at a glance, on the move.',
    ],
    screens: [
      { src: '/assets/wms-banner-case-2.png', alt: 'Case placement, step 1: a dark blue banner asks to scan the case QR code', step: 'Scan the case' },
      { src: '/assets/wms-banner-cell-2.png', alt: 'Case placement, step 2: a light amber banner asks to scan the cell QR code', step: 'Scan the cell' },
    ],
    arrowAt: 0.15,   // level with the status banners
    device: true,
  },
]

const RESULTS = [
  { value: '8', text: 'Warehouse flows moved into one system, from container unloading to shipping' },
  { value: '5', text: 'Roles working in the same data, from receiving storekeeper to plant management' },
  { value: '4', text: 'Months from the first walk-through of the warehouse to the pilot on the floor' },
  { value: 'Pilot', text: 'Running on part of the warehouse today; rollout to the rest is in progress' },
]

/** The backbone flow that went live first, in order. */
const BACKBONE: { title: string; art: StepArt }[] = [
  { title: 'Unload the container', art: 'container' },
  { title: 'Put cases into cells', art: 'rack' },
  { title: 'Unpack cases', art: 'open-box' },
  { title: 'Put parts into cells', art: 'part' },
  { title: 'Pick parts to the production line', art: 'conveyor' },
]

/** What the warehouse reports while exact figures are being collected. */
const REPORTS = [
  'Container receiving is several times faster than the paper-and-1C process it replaced.',
  'Fewer parts go missing.',
  'Cases sit in their assigned cells rather than wherever there was room.',
  'When one does end up by a rack, scanning it shows what it is and where it belongs — so the ones out of place are now visible instead of lost.',
]

/* ---------- building blocks ---------- */

/**
 * Small outline illustrations for the constraint tiles, drawn like the heart on the homepage cat tile:
 * orange 2px outline, slightly rotated, running off the tile's corner and cropped by it.
 *   rules    — a clipboard with a checklist: the terminal's own guidelines
 *   terminal — the handheld itself: screen, scan key and the physical keypad
 *   shield   — a shield with a check: the old system keeps the plant safe and running
 */
type Art = 'rules' | 'terminal' | 'shield'
const ART: Record<Art, ArtDef> = {
  rules: {
    viewBox: '0 0 24 28',
    body: (
      <>
        <rect x="3" y="3" width="18" height="24" rx="3" />
        <rect x="8" y="1" width="8" height="4" rx="1.5" />
        {[11, 16.5, 22].map((y) => (
          <g key={y}>
            <path d={`M6.5 ${y}l1.5 1.5 3-3`} />
            <path d={`M13.5 ${y}h4.5`} />
          </g>
        ))}
      </>
    ),
  },
  terminal: {
    viewBox: '0 0 24 36',
    body: (
      <>
        <rect x="3" y="1" width="18" height="34" rx="4" />
        <rect x="6" y="4" width="12" height="11" rx="1.5" />
        <rect x="8.5" y="17.4" width="7" height="2.2" rx="1.1" />
        {[21.6, 25, 28.4, 31.8].flatMap((y) =>
          [6.3, 10.4, 14.5].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="3.2" height="2.2" rx="0.7" />),
        )}
      </>
    ),
  },
  shield: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path d="M12 2.5l7.5 3v6c0 4.6-3.1 8.6-7.5 10-4.4-1.4-7.5-5.4-7.5-10v-6z" />
        <path d="M8.6 12.2l2.4 2.4 4.6-4.8" />
      </>
    ),
  },
}

/**
 * Outline illustrations for the flow steps, in the same style as the constraint tiles.
 *   container — a shipping container        rack     — a rack of cells with a case going in
 *   open-box  — a case with its flaps open   part     — a hex part, like the parts icon in the app
 *   conveyor  — a part riding a conveyor to the line
 */
type StepArt = 'container' | 'rack' | 'open-box' | 'part' | 'conveyor'
const STEP_ART: Record<StepArt, ReactNode> = {
  container: (
    <>
      <rect x="2" y="6" width="20" height="13" rx="1.5" />
      {[6, 10, 14, 18].map((x) => <path key={x} d={`M${x} 8.5v8`} />)}
    </>
  ),
  rack: (
    <>
      <path d="M3 21V3M21 21V3M3 9h18M3 15h18" />
      <rect x="7" y="10.5" width="6" height="4.5" rx="0.8" />
      <path d="M10 10.5v1.6" />
    </>
  ),
  'open-box': (
    <>
      <path d="M5 11h14v9H5z" />
      <path d="M5 11 2.5 7.5M19 11l2.5-3.5M5 11l3-3.5h8l3 3.5" />
    </>
  ),
  part: (
    <>
      <path d="M12 2.5 20.2 7.2v9.6L12 21.5l-8.2-4.7V7.2z" />
      <circle cx="12" cy="12" r="3.6" />
    </>
  ),
  conveyor: (
    <>
      <rect x="2" y="14" width="20" height="5" rx="2.5" />
      {[5.5, 12, 18.5].map((x) => <circle key={x} cx={x} cy="16.5" r="1" />)}
      <rect x="8.5" y="7.5" width="7" height="6.5" rx="1" />
    </>
  ),
}

/** A flow drawn as bento tiles in a row with arrows between them; each tile has its illustration in the corner. */
function Flow({ steps }: { steps: { title: string; art: StepArt }[] }) {
  return (
    <ol className="cs-flow">
      {steps.map((st, i) => (
        <li key={st.title} className="cs-flow__item" {...reveal(i * 80)}>
          <div className="cs-step tile">
            <span className="t-lead w-500">{st.title}</span>
            <svg className="cs-step__art" viewBox="0 0 24 24" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{STEP_ART[st.art]}</g>
            </svg>
          </div>
          {i < steps.length - 1 && <span className="cs-flow__arrow" aria-hidden="true"><ArrowE /></span>}
        </li>
      ))}
    </ol>
  )
}

/**
 * A short silent clip that behaves like a GIF: muted, looping, no controls. It only plays while it is on screen.
 * With "reduce motion" turned on it stays on its first frame and shows the controls instead.
 */
function Loop({ src, label, caption, className = '' }: { src: string; label: string; caption: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.controls = true
      return
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()), { threshold: 0.25 })
    io.observe(video)
    return () => io.disconnect()
  }, [])
  return (
    <figure className={`cs-photo ${className}`} {...reveal()}>
      <video ref={ref} className="cs-photo__media cs-photo__video" src={src} muted loop playsInline preload="metadata" aria-label={label} />
      <figcaption className="cs-photo__cap t-small">{caption}</figcaption>
    </figure>
  )
}

/**
 * A screenshot inside the Datalogic Skorpio X5 photo (transparent background, cropped to the device). The real
 * screenshot covers the app area between the Android status bar and the navigation bar, which stay from the photo.
 */
function Device({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="cs-device">
      <img className="cs-device__frame" src="/assets/wms-tsd-frame.webp" alt="" width={555} height={1342} loading="lazy" />
      <span className="cs-device__screen"><img src={src} alt={alt} width={480} height={800} loading="lazy" /></span>
    </span>
  )
}

/**
 * Terminal screens side by side on a muted backdrop, step label on top. The screens run off the bottom edge,
 * cropped by the frame like the illustrations elsewhere: only their top half, where the interface is, shows.
 */
function Screens({ screens, split, arrowAt, device }: { screens: Screen[]; split?: boolean; arrowAt?: number; device?: boolean }) {
  return (
    <span className={`cs-screens${split ? ' is-split' : ''}${device ? ' is-device' : ''}`} style={arrowAt === undefined ? undefined : ({ '--arrow-at': arrowAt } as CSSProperties)}>
      {screens.map((sc, i) => (
        <Fragment key={`${sc.src}-${i}`}>
          {i > 0 && !split && <span className="cs-screens__arrow" aria-hidden="true"><ArrowE /></span>}
          <figure className={`cs-screen${sc.crop === 'bottom' ? ' is-bottom' : ''}${device ? ' is-device' : ''}`}>
            <figcaption className="t-small">
              {sc.keys ? sc.keys.map((k) => <kbd key={k} className="cs-key">{k}</kbd>) : <span className="cs-screen__n">{i + 1}</span>}
              <span className="cs-screen__label">{sc.step}</span>
            </figcaption>
            {device ? <Device src={sc.src} alt={sc.alt} /> : <img src={sc.src} alt={sc.alt} width={480} height={800} loading="lazy" />}
          </figure>
        </Fragment>
      ))}
    </span>
  )
}

/**
 * Key decisions as the homepage project stack: full-width tiles (image on cols 1–8, text on cols 9–12)
 * that stick under the top bar a little lower each time, so they pile up over each other while scrolling.
 */
function DecisionStack() {
  const listRef = useRef<HTMLUListElement>(null)
  useStickyFit(listRef)
  return (
    <ul className="stack cs-decisions" ref={listRef}>
      {DECISIONS.map((d, i) => (
        <li key={d.title} className="stack__item" style={{ '--i': i } as CSSProperties}>
          <article className="stack__panel tile grid">
            <span className="stack__frame">
              {d.screens ? (
                <Screens screens={d.screens} split={d.split} arrowAt={d.arrowAt} device={d.device} />
              ) : (
                <>
                  <Media className="stack__image" label={`${d.title}: screens or option comparison`} />
                  <span className="cs-photo__cap t-small">Screens or option comparison</span>
                </>
              )}
            </span>
            <div className="stack__text">
              <h3 className="t-m">{d.title}</h3>
              <div className="cs-paras">
                {d.text.map((para) => <p key={para} className="t-body muted">{para}</p>)}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

/* ---------- sections ---------- */

export default function ProjectWms() {
  useReveal()
  useHashScroll()
  return (
    <div className="v4">
      <TopBar home={HOME} />
      <main>
        <CaseHero
          lines={['Warehouse', 'Management', 'System']}
          image="/assets/hyundai-plant-hq.webp"
          label="The Hyundai Trans Kazakhstan plant"
        />

        <Chapter title="Overview">
          <Facts
            items={[
              { label: 'Role', value: 'Sole and lead product designer' },
              { label: 'Timeline', value: '4 months, 2026' },
            ]}
          />
        </Chapter>

        <Chapter title="The problem">
          <StackTile items={PROBLEM} />
        </Chapter>

        <Chapter title="Constraints" wide>
          <Cards items={CONSTRAINTS} art={ART} />
        </Chapter>

        <Chapter title="Context of use" wide>
          <div className="cs-bento">
            <Loop
              className="cs-bento__main"
              src="/assets/wms-how-it-works.mp4"
              label="The old flow, before the redesign: an operator scans a case and then the cell labels on the rack with the handheld terminal"
              caption="How it worked before the redesign"
            />
            <div className="cs-bento__side">
              <div className="cs-bento__text tile" {...reveal(80)}>
                <p className="t-lead">The terminal is used in gloves, one-handed, in poor light, walking between racks — usually with the other hand on a case.</p>
                <p className="t-body muted">Everything about the interface follows from that:</p>
                <ul className="cs-dots t-body">
                  <li>One decision per screen</li>
                  <li>Type you can read at arm’s length</li>
                  <li>As few taps as the flow allows</li>
                </ul>
              </div>
              <Photo className="cs-bento__photo" image="/assets/wms-warehouse.webp" position="center 55%" caption="The plant warehouse" delay={160} />
            </div>
          </div>
        </Chapter>

        <Chapter title="Key decisions" wide>
          <DecisionStack />
        </Chapter>

        <Chapter title="Validation" wide intro="Rolled out in stages rather than all at once. First the backbone flow:">
          <Flow steps={BACKBONE} />
          <Text>We ran it, fixed it, and only then added the rest. The old system stayed available the whole time so nothing on the plant could come to a stop.</Text>
        </Chapter>

        <Chapter title="Results" accent wide>
          <ul className="cs-stats">
            {RESULTS.map((r, i) => (
              <li key={r.value} className={`cs-stat tile${i === RESULTS.length - 1 ? ' is-note' : ''}`} {...reveal(i * 80)}>
                <span className="cs-stat__value t-xl">{r.value}</span>
                <span className="t-body muted">{r.text}</span>
              </li>
            ))}
          </ul>
          <div className="cs-reports tile" {...reveal()}>
            <p className="t-lead">Exact figures are still being collected, so here is what the warehouse reports:</p>
            <ul className="cs-dots t-body">
              {REPORTS.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        </Chapter>

        <OtherProjects current="Warehouse Management System" />
        <Contacts />
      </main>
      {import.meta.env.DEV && <GridOverlay />}
    </div>
  )
}
