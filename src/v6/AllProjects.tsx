import { useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { CONCEPTS } from '../content'
import { WORK } from './data'
import { Media, reveal, splitTags } from './shared'

// All projects as cards, filtered by kind. Under "All" the two kinds come as separate groups, each with its own
// heading, so it is clear where the product work ends and the concepts begin. (A list view used to sit beside the
// cards; it was dropped as one view too many.)

type Kind = 'work' | 'concept'
type Item = { title: string; tags: string; image: string; position?: string; summary: string; href: string; kind: Kind; external: boolean }

const ITEMS: Item[] = [
  ...WORK.map((p) => ({ title: p.short ?? p.title, tags: p.tags, image: p.image, position: p.position, summary: p.summary, href: p.href ?? '/', kind: 'work' as const, external: !!p.href?.startsWith('http') })),
  ...CONCEPTS.map((c) => ({ title: c.title, tags: `${c.tags} · ${c.year}`, image: c.image, summary: c.summary, href: c.href, kind: 'concept' as const, external: true })),
]

const FILTERS: { id: 'all' | Kind; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Product work' },
  { id: 'concept', label: 'Concepts' },
]

/** The groups under "All", in order, with the line that says what each one is. */
const GROUPS: { kind: Kind; title: string; note: string }[] = [
  { kind: 'work', title: 'Product work', note: 'Real products for companies, with a case study for each.' },
  { kind: 'concept', title: 'Concepts', note: 'Cases I designed on my own, published on Behance.' },
]

/** Behance covers are taller than the frame and carry their headline at the top, so they keep the top edge. */
const coverPos = (it: Item) => it.position ?? (it.external ? 'center top' : undefined)
const linkProps = (it: Item) => (it.external ? { target: '_blank', rel: 'noopener' } : {})

/**
 * A project card: a grey plaque holding the cover, then the name with an arrow (the whole card is the link), the
 * one-line summary right under it, and the tags last, small and grey.
 */
function Card({ it, delay }: { it: Item; delay: number }) {
  return (
    <li {...reveal(delay)}>
      <a className="card" href={it.href} {...linkProps(it)} aria-label={it.external ? `${it.title} (on Behance)` : undefined}>
        <span className="card__frame">
          <Media className="card__image" image={it.image} label={it.title} position={coverPos(it)} />
        </span>
        <span className="card__body">
          <span className="card__name t-m">
            {it.title}
            <ArrowUpRight className="card__arrow" size={20} aria-hidden="true" />
          </span>
          <span className="card__summary t-body muted">{it.summary}</span>
          <span className="card__meta t-small">{splitTags(it.tags).join(', ')}</span>
        </span>
      </a>
    </li>
  )
}

const Cards = ({ items }: { items: Item[] }) => (
  <ul className="cards">
    {items.map((it, i) => <Card key={it.title} it={it} delay={(i % 2) * 60} />)}
  </ul>
)

export default function AllProjects() {
  const [filter, setFilter] = useState<'all' | Kind>('all')
  const count = (id: 'all' | Kind) => (id === 'all' ? ITEMS.length : ITEMS.filter((it) => it.kind === id).length)

  return (
    <>
      <section id="top" className="pg wrap" aria-labelledby="pg-title">
        <div className="pg__head">
          <h1 id="pg-title" className="t-xl" {...reveal(0)}>All projects</h1>
          <p className="t-lead muted" {...reveal(80)}>Product work for companies, and concept cases I designed on my own.</p>
        </div>

        <div className="pg__bar" {...reveal(140)}>
          <div className="seg" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                className="seg__btn t-small w-500"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span className="seg__count t-label">{count(f.id)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Keyed by the filter, so a change mounts fresh cards that fade in again. */}
        <div key={filter} className="pg__groups">
          {GROUPS.filter((g) => filter === 'all' || filter === g.kind).map((g) => (
            <section key={g.kind} className="pg__group" aria-labelledby={`group-${g.kind}`}>
              {/* The heading only under "All": with one kind picked, the tab already says what is shown. */}
              {filter === 'all' ? (
                <header className="pg__group-head" {...reveal()}>
                  <h2 id={`group-${g.kind}`} className="t-l">{g.title}</h2>
                  <p className="t-body muted">{g.note}</p>
                </header>
              ) : (
                <h2 id={`group-${g.kind}`} className="sr-only">{g.title}</h2>
              )}
              <Cards items={ITEMS.filter((it) => it.kind === g.kind)} />
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
