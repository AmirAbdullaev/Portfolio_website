// Building blocks shared by the project case studies (the WMS, Vlife and Qazaq Energy Charge pages).
import { ReactNode } from 'react'
import { MORE_PROJECTS, PROJECTS } from '../content'
import { ArrowE, ArrowNE, Media, reveal } from './shared'

export const HOME = '/'

/** Chapter anchors, so each chapter can be linked to directly: "Key decisions" → #key-decisions. */
const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/**
 * Optical alignment for large headings, as on the homepage: v4.css pulls them left by 0.075em (the bearing of E, P, R…).
 * Letters with a smaller left bearing in Onest get their own measured value so the ink still starts on the grid line.
 * P is listed so hero lines starting with it get the heading value instead of the hero's per-line default.
 * Q, S, I, i and p are the left side bearings measured in Onest Medium (xMin / unitsPerEm).
 */
const BEARING: Record<string, number> = { W: 0, V: 0, A: 0, T: 0.01, C: 0.04, Q: 0.044, P: 0.075, S: 0.053, I: 0.083, i: 0.047, p: 0.063 }
export const align = (text: string) => {
  const b = BEARING[text[0]]
  return b === undefined ? undefined : { textIndent: `-${b}em` }
}

/** A hero line's reveal props, with its optical alignment merged into the reveal's style. */
const line = (text: string, delay: number) => {
  const r = reveal(delay)
  return { ...r, style: { ...r.style, ...align(text) } }
}

/**
 * Full-bleed hero on a photo; the three title lines step down the grid (cols 1, 3, 5).
 * `position` is the photo's focal point, `label` describes it for screen readers.
 */
export function CaseHero({ lines, image, position = 'center 38%', label }: { lines: [string, string, string]; image: string; position?: string; label: string }) {
  return (
    <section id="top" className="cs-hero" aria-labelledby="cs-title">
      <div className="cs-hero__bg" role="img" aria-label={label} style={{ backgroundImage: `url('${image}')`, backgroundPosition: position }} />
      <div className="cs-hero__inner wrap">
        <div className="grid">
          <h1 id="cs-title" className="cs-hero__title t-xl">
            <span className="cs-hero__line" {...line(lines[0], 60)}>{lines[0]}</span>
            <span className="cs-hero__line is-2" {...line(lines[1], 140)}>{lines[1]}</span>
            <span className="cs-hero__line is-3" {...line(lines[2], 220)}>{lines[2]}<span className="cs-hero__dot">.</span></span>
          </h1>
        </div>
      </div>
    </section>
  )
}

/**
 * A chapter uses the homepage Experience layout: the title in a sticky column on the left (cols 1–4),
 * content on the right (cols 5–12) on a subgrid, so everything inside snaps to the page columns.
 * `wide` puts the title on top and gives the content all 12 columns; its `intro` sits under the title on cols 1–4,
 * and closing text under the content takes the same columns. The title ends in the orange full stop of the hero.
 */
export function Chapter({ title, intro, accent, wide, children }: { title: string; intro?: ReactNode; accent?: boolean; wide?: boolean; children: ReactNode }) {
  const id = slug(title)
  return (
    <section className={`cs-chapter${accent ? ' is-accent' : ''}${wide ? ' is-wide' : ''}`} aria-labelledby={id}>
      <div className="wrap">
        <div className="cs-chapter__inner grid">
          <header className="cs-aside" {...reveal()}>
            <h2 id={id} className="t-l" style={align(title)}>{title}<span className="cs-dot">.</span></h2>
            {intro && <p className="cs-aside__intro t-lead">{intro}</p>}
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

/** One tile with items stacked top to bottom (title, then text at full width), thin lines between — like the homepage Experience tile. */
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
 * Results as one tile outlined in the accent, a row per figure: the number on the left, its label (and note) on the
 * right, thin lines between the rows.
 */
export function Figures({ items }: { items: FigureRow[] }) {
  return (
    <ul className="cs-figures tile" {...reveal()}>
      {items.map((f) => (
        <li key={f.label} className="cs-figures__row">
          <span className="cs-figures__value t-l">{f.value}</span>
          <span className="cs-figures__label">
            <span className="t-lead">{f.label}</span>
            {f.note && <span className="t-small muted">{f.note}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Key facts as tiles: label at the top, value at the bottom, like the homepage contact tiles. */
export function Facts({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="cs-tiles">
      {items.map((f, i) => (
        <div key={f.label} className="cs-tile is-fact tile" {...reveal(i * 80)}>
          <dt className="t-label">{f.label}</dt>
          <dd className="t-m">{f.value}</dd>
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

/** Dark plaques from the homepage "Latest project" banner, one per project except `current`; they turn orange on hover. */
export function OtherProjects({ current }: { current: string }) {
  return (
    <section className="cs-others wrap" aria-labelledby="others-title">
      <div className="section-head" {...reveal()}>
        <h2 id="others-title" className="t-l">Other projects</h2>
        <a className="btn btn-line t-small w-500" href="/?page=projects">
          <span>All projects</span>
          <ArrowE />
        </a>
      </div>
      <ul className="cs-others__list">
        {[...PROJECTS, ...MORE_PROJECTS].filter((p) => p.href?.startsWith('/') && p.title !== current).map((p, i) => (
          <li key={p.title} {...reveal(i * 80)}>
            <a className="latest" href={p.href ?? `${HOME}#projects`}>
              <Media className="latest__thumb" image={p.image} />
              <span className="latest__text">
                <span className="t-label">{p.tags}</span>
                <span className="t-m">{p.title}</span>
              </span>
              <span className="latest__arrow"><ArrowNE size={22} /></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
