import { CONCEPTS, Concept, MORE_PROJECTS, PROJECTS, Project } from '../content'
import { ArrowE, ArrowNE, Contacts, GridOverlay, Media, TopBar, reveal, useHashScroll, useReveal } from './shared'
import { HOME } from './case'
import './v4.css'
import './all.css'

// All projects: the work from the homepage plus the rest of the work, then the concept cases on Behance.

const WORK = [...PROJECTS, ...MORE_PROJECTS]

/**
 * A card's picture: the image fills a 16:10 frame and zooms a little when the card is hovered. `position` is its
 * focal point — Behance covers are taller than 16:10 and carry their headline at the top, so they keep the top edge.
 */
const Cover = ({ image, label, position }: { image: string; label: string; position?: string }) => (
  <span className="pcard__frame">
    <Media className="pcard__image" image={image} label={label} position={position} />
  </span>
)

/**
 * A work project. The whole card links to its case study here, or — for a project without one — to its Behance
 * page in a new tab.
 */
function WorkCard({ p, delay }: { p: Project; delay: number }) {
  const external = p.href?.startsWith('http')
  return (
    <li className="pgrid__item is-work" {...reveal(delay)}>
      <a className="pcard tile" href={p.href} {...(external && { target: '_blank', rel: 'noopener' })}>
        <Cover image={p.image} label={p.title} position={external ? 'center top' : undefined} />
        <span className="pcard__text">
          <span className="t-small muted">{p.tags}</span>
          <span className="t-m">{p.title}</span>
          <span className="t-body muted">{p.summary}</span>
        </span>
        <span className="btn btn-line t-small w-500 pcard__cta">
          <span>{external ? 'View on Behance' : 'View case'}</span>
          {external ? <ArrowNE /> : <ArrowE />}
        </span>
      </a>
    </li>
  )
}

/** A concept case: opens the project on Behance in a new tab. */
function ConceptCard({ c, delay }: { c: Concept; delay: number }) {
  return (
    <li className="pgrid__item is-concept" {...reveal(delay)}>
      <a className="pcard tile" href={c.href} target="_blank" rel="noopener">
        <Cover image={c.image} label={c.title} position="center top" />
        <span className="pcard__text">
          <span className="t-small muted">{c.tags} · {c.year}</span>
          <span className="t-m">{c.title}</span>
          <span className="t-body muted">{c.summary}</span>
        </span>
        <span className="btn btn-line t-small w-500 pcard__cta">
          <span>View on Behance</span>
          <ArrowNE />
        </span>
      </a>
    </li>
  )
}

export default function AllProjects() {
  useReveal()
  useHashScroll()
  return (
    <div className="v4">
      <TopBar home={HOME} />
      <main>
        <section id="top" className="pg-head wrap" aria-labelledby="pg-title">
          <div className="grid pg-head__inner">
            <h1 id="pg-title" className="t-xl" {...reveal(60)}>All projects<span className="pg-dot">.</span></h1>
            <p className="pg-head__intro t-lead muted" {...reveal(140)}>Product work for companies, and concept cases I designed on my own.</p>
          </div>
        </section>

        <section className="pg-section wrap" aria-labelledby="work-title">
          <div className="section-head" {...reveal()}>
            <h2 id="work-title" className="t-l">Product work</h2>
          </div>
          <ul className="grid pgrid">
            {WORK.map((p, i) => <WorkCard key={p.title} p={p} delay={(i % 2) * 80} />)}
          </ul>
        </section>

        <section className="pg-section wrap" aria-labelledby="concepts-title">
          <div className="section-head" {...reveal()}>
            <h2 id="concepts-title" className="t-l">Concepts</h2>
            <span className="t-small muted">On Behance</span>
          </div>
          <ul className="grid pgrid">
            {CONCEPTS.map((c, i) => <ConceptCard key={c.title} c={c} delay={(i % 3) * 80} />)}
          </ul>
        </section>

        <Contacts />
      </main>
      {import.meta.env.DEV && <GridOverlay />}
    </div>
  )
}
