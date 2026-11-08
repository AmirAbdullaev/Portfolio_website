// Building blocks shared by the case studies (and the About page): the head, chapters, figures, results and the
// link to the next case study.
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { CASES, caseKey } from './data'
import { Media, reveal, splitTags } from './shared'

/** Chapter anchors, so each chapter can be linked to directly: "Key decisions" → #key-decisions. */
const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** The case study in the address bar (`?project=`), or the first one. */
const current = () => CASES.find((c) => c.key === caseKey()) ?? CASES[0]

/** A case study page: the page, then the next case study. The shell around it comes from the app. */
export function CasePage({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <NextProject />
    </>
  )
}

/**
 * The head of a case study, in one block: the project's name, then the facts (role, timeline, devices, platform)
 * in a narrow column on the left, and on the right the description (`children`: the lede, maybe a note) above a
 * modest cover photo. The left column and the right edge line up with the chapters below.
 * `lines` is the title in three parts (as the earlier layouts set it), read as one name here. `position` is the photo's focal point, `label`
 * describes it for screen readers.
 */
export function CaseHero({ lines, image, position = 'center 38%', label, facts, devices, children }: {
  lines: [string, string, string]; image: string; position?: string; label: string
  facts: { label: string; value: ReactNode }[]
  /** What it runs on, when the project's tags say more than that (they also name the industry). */
  devices?: string[]
  children: ReactNode
}) {
  const c = current()
  const kinds = devices ?? splitTags(c.tags)
  // The devices are the third fact, after the role and the timeline (or whatever comes second).
  const all = [...facts.slice(0, 2), { label: kinds.length > 1 ? 'Devices' : 'Device', value: kinds.join(', ') }, ...facts.slice(2)]
  return (
    <section id="top" className="cs-cover wrap" aria-labelledby="cs-title">
      <div className="cs-cover__head">
        <h1 id="cs-title" className="t-xl" {...reveal(0)}>{lines.join(' ')}</h1>
      </div>
      <div className="cs-cover__grid grid">
        <div className="cs-cover__text" {...reveal(100)}>{children}</div>
        <div className="cs-cover__frame" {...reveal(160)}>
          <Media className="cs-cover__media" image={image} position={position} label={label} eager />
        </div>
        <Facts items={all} />
      </div>
    </section>
  )
}

/**
 * A chapter: the title in a sticky column on the left (cols 1–4), content on the right (cols 5–12) on a subgrid,
 * so everything inside snaps to the page columns. `wide` puts the title on top and gives the content all 12 columns;
 * its `intro` sits beside the title, and closing text under the content takes the first four columns.
 */
export function Chapter({ title, intro, accent, wide, children }: { title: string; intro?: ReactNode; accent?: boolean; wide?: boolean; children: ReactNode }) {
  const id = slug(title)
  return (
    <section className={`cs-chapter${accent ? ' is-accent' : ''}${wide ? ' is-wide' : ''}`} aria-labelledby={id}>
      <div className="wrap">
        <div className="cs-chapter__inner grid">
          <header className="cs-aside" {...reveal()}>
            <h2 id={id} className="t-l">{title}</h2>
            {intro && <p className="cs-aside__intro t-lead muted">{intro}</p>}
          </header>
          <div className="cs-body">{children}</div>
        </div>
      </div>
    </section>
  )
}

/** Body text in a chapter. */
export const Text = ({ children }: { children: ReactNode }) => <p className="cs-text t-body muted" {...reveal()}>{children}</p>

/** An outline drawing for a tile corner: its viewBox and the shapes inside, stroked in the accent colour. */
export type ArtDef = { viewBox: string; body: ReactNode }

/**
 * Tiles across the full width, three in a row, each with its illustration in the corner. `art` holds the drawings,
 * keyed by the name each item refers to; the name also becomes an `is-<name>` class for per-drawing offsets in CSS.
 */
export function Cards<A extends string>({ items, art }: { items: { title: string; text: string; art: A }[]; art: Record<A, ArtDef> }) {
  return (
    <ul className="cs-cards">
      {items.map((c, i) => (
        <li key={c.title} className="cs-card tile" {...reveal(i * 80)}>
          <h3 className="t-m">{c.title}</h3>
          <p className="t-body muted">{c.text}</p>
          <svg className={`cs-card__art is-${c.art}`} viewBox={art[c.art].viewBox} aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{art[c.art].body}</g>
          </svg>
        </li>
      ))}
    </ul>
  )
}

/** One tile with items stacked top to bottom (title, then text at full width). */
export function StackTile({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="cs-stack tile" {...reveal()}>
      {items.map((it) => (
        <li key={it.title} className="cs-stack__item">
          <h3 className="t-m">{it.title}</h3>
          <p className="t-body muted">{it.text}</p>
        </li>
      ))}
    </ul>
  )
}

/**
 * An image on the muted backdrop with its caption underneath. Its own width and height keep the space reserved
 * while it loads. `fit` lets the frame take the height of its row and fits the image inside it (for screens that sit
 * next to a taller neighbour); `pad` leaves a margin of backdrop around the image. `tag` puts a chip in the frame's
 * corner, such as "Before" or "After".
 */
export function Figure({ src, alt, caption, tag, width, height, fit, pad, className = '', delay = 0 }: { src: string; alt: string; caption?: string; tag?: string; width: number; height: number; fit?: boolean; pad?: boolean; className?: string; delay?: number }) {
  return (
    <figure className={`cs-fig${fit ? ' is-fit' : ''}${pad || fit ? ' is-pad' : ''} ${className}`} {...reveal(delay)}>
      <span className="cs-fig__frame">
        {tag && <span className="cs-fig__tag t-small">{tag}</span>}
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      </span>
      {caption && <figcaption className="t-small">{caption}</figcaption>}
    </figure>
  )
}

/** A result: the figure, what it counts, and an optional note under that in small type. */
export type FigureRow = { value: string; label: string; note?: string }

/**
 * A result figure that counts up from zero the first time it is in view: "~3,000" runs 0 → 3,000 with its "~" kept,
 * "4.9" keeps one decimal, "−45%" its sign and per cent. Words and reduced motion show the value as it is.
 * Screen readers get the final value only.
 */
function Count({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)
  const parts = value.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/)
  const still = !parts || typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)

  const format = (n: number) => {
    if (!parts) return value
    const [, pre, num, post] = parts
    const decimals = num.split('.')[1]?.length ?? 0
    const text = num.includes(',')
      ? n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : n.toFixed(decimals)
    return pre + text + post
  }

  // Start from zero before the first paint, so the final value never flashes.
  useLayoutEffect(() => { if (!still) setShown(format(0)) }, [value])   // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = ref.current
    if (still || !el || !parts) return
    const target = parseFloat(parts[2].replace(/,/g, ''))
    let frame = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1600)
        setShown(format(target * (1 - Math.pow(1 - t, 4))))   // ease-out: fast, then settling on the number
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(frame) }
  }, [value])   // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <span ref={ref} aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </>
  )
}

/** Results as tiles: the number on top, its label (and note) under it. */
export function Figures({ items }: { items: FigureRow[] }) {
  return (
    <ul className="cs-figures">
      {items.map((f, i) => (
        <li key={f.label} className="cs-figures__row tile" {...reveal((i % 2) * 80)}>
          <span className="cs-figures__value t-l"><Count value={f.value} /></span>
          <span className="cs-figures__label">
            <span className="t-body">{f.label}</span>
            {f.note && <span className="t-small muted">{f.note}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Key facts as properties: label on the left, value on the right, like the fields of a record. */
export function Facts({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="cs-facts tile" {...reveal()}>
      {items.map((f) => (
        <div key={f.label} className="cs-facts__row">
          <dt className="t-small muted">{f.label}</dt>
          <dd className="t-body w-500">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * A bento photo: the image fills the tile. Until the real file is added it shows the hatched placeholder,
 * and the caption chip in the corner says what goes there.
 */
export function Photo({ caption, image, position, className = '', delay = 0 }: { caption: string; image?: string; position?: string; className?: string; delay?: number }) {
  return (
    <figure className={`cs-photo ${className}`} {...reveal(delay)}>
      <Media className="cs-photo__media" image={image} position={position} label={caption} />
      <figcaption className="cs-photo__cap t-small">{caption}</figcaption>
    </figure>
  )
}

/** The end of a case study: one card for the next one in the list (after the last, the first). */
function NextProject() {
  const i = CASES.indexOf(current())
  const next = CASES[(i + 1) % CASES.length]
  return (
    <section className="cs-next wrap" aria-label="Next project">
      <a className="cs-next__card tile" href={next.href} {...reveal()}>
        <span className="cs-next__text">
          <span className="t-small muted">Next project</span>
          <span className="cs-next__title t-l">
            {next.short}
            <span className="cs-next__go" aria-hidden="true"><ArrowUpRight size={20} /></span>
          </span>
          <span className="t-body muted">{next.summary}</span>
        </span>
        <span className="cs-next__thumb">
          <Media className="cs-next__image" image={next.image} />
        </span>
      </a>
    </section>
  )
}
