import { CSSProperties, useRef } from 'react'
import { CV_URL } from '../constants'
import { ABOUT, EXPERIENCE, LATEST_PROJECT, PORTRAIT, PROJECTS, Photo } from '../content'
import { ArrowE, ArrowNE, Contacts, Download, GridOverlay, Media, TopBar, reveal, stroke, useHashScroll, useReveal, useStickyFit } from './shared'
import './v4.css'

/** The "Latest project" banner is parked until there's a clear use for it. */
const SHOW_LATEST = false

function LatestProject() {
  return (
    <a className="latest" href="#projects" {...reveal(320)}>
      <Media className="latest__thumb" image={LATEST_PROJECT.image} />
      <span className="latest__text">
        <span className="t-label">{LATEST_PROJECT.label}</span>
        <span className="t-m">{LATEST_PROJECT.title}</span>
      </span>
      <span className="latest__arrow"><ArrowNE size={22} /></span>
    </a>
  )
}

function Hero() {
  return (
    <section id="top" className="hero wrap" aria-labelledby="hero-title">
      <div className="grid hero__body">
        <div className="hero__text">
          <p className="t-lead muted" {...reveal(60)}>Hi, I’m Amir —</p>
          <h1 id="hero-title" className="t-l" {...reveal(120)}>
            4 years of&nbsp;hands-on experience crafting <span className="mark">mobile apps</span> &amp;{' '}
            <span className="mark">B2B SaaS</span> products that drive real results
          </h1>
        </div>
        <Media className="hero__portrait" image={PORTRAIT} position="50% 15%" label="Amir Abdullaev holding a glass at a summer terrace" />
      </div>
      {SHOW_LATEST && <LatestProject />}
    </section>
  )
}

/** Full-width panels that stick under the top bar and stack over each other while scrolling. */
function Projects() {
  const listRef = useRef<HTMLUListElement>(null)
  useStickyFit(listRef)

  return (
    <section id="projects" className="projects wrap" aria-labelledby="projects-title">
      <div className="section-head" {...reveal()}>
        <h2 id="projects-title" className="t-l">Projects</h2>
        <a className="btn btn-line t-small w-500" href="#projects">
          <span>Show all</span>
          <ArrowE />
        </a>
      </div>

      <ul className="stack" ref={listRef}>
        {PROJECTS.map((p, i) => (
          <li key={p.title} className="stack__item" style={{ '--i': i } as CSSProperties}>
            <a className="stack__panel tile grid" href={p.href ?? '#projects'}>
              <span className="stack__frame">
                <Media className="stack__image" image={p.image} label={p.title} />
              </span>
              <span className="stack__text">
                <span className="t-small muted">{p.tags}</span>
                <span className="t-m">{p.title}</span>
                <span className="stack__desc t-body muted">
                  {p.description.map((para) => <span key={para} className="stack__para">{para}</span>)}
                </span>
                {/* The whole panel is the link, so this is a span styled as the standard secondary button. */}
                <span className="btn btn-line t-small w-500 stack__cta">
                  <span>View project</span>
                  <ArrowNE />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="experience wrap" aria-labelledby="experience-title">
      <div className="grid">
        <div className="experience__aside" {...reveal()}>
          <h2 id="experience-title" className="t-l">Experience</h2>
          <p className="t-body muted">4 years of&nbsp;hands-on product design at {EXPERIENCE.length} companies.</p>
          <a className="btn btn-ink t-small w-500" href={CV_URL} download>
            <span>Download CV</span>
            <Download />
          </a>
        </div>

        <ol className="jobs tile">
          {EXPERIENCE.map((job, i) => {
            const current = job.dates.includes('Present')
            return (
              <li key={job.company} className="job" {...reveal(i * 80)}>
                <div className="job__head">
                  <h3 className="t-m">{job.company}</h3>
                  {/* Period first, then the role, on one line: "04/2025 – [Now] · Product Designer". */}
                  <span className="job__meta t-small muted">
                    <span className="job__dates">
                      {current ? job.dates.replace(/\s*Present\s*$/, '') : job.dates}
                      {current && <span className="job__now t-label">Now</span>}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{job.role}</span>
                  </span>
                </div>
                <div className="job__body">
                  <p className="job__summary t-lead">{job.summary}</p>
                  {job.details && <p className="job__details t-body muted">{job.details}</p>}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

function Tile({ photo, className, delay }: { photo: Photo; className: string; delay: number }) {
  return (
    <div className={className} {...reveal(delay)}>
      <Media className="b-fill" image={photo.image} position={photo.position} zoom={photo.zoom} label={photo.alt} />
    </div>
  )
}

function About() {
  const p = ABOUT.photos
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="grid about__intro" {...reveal()}>
          <h2 id="about-title" className="t-l">{ABOUT.title}</h2>
          <p className="t-lead">{ABOUT.text}</p>
        </div>
        {/* All photos are 3:4 portraits: one large on the left (6 cols), four small on the right (3 cols each).
            Two small rows ≈ one large photo in height, so nothing gets cropped hard. */}
        <div className="grid gallery">
          <Tile className="g-autumn" photo={p.autumn} delay={0} />
          <Tile className="g-river" photo={p.river} delay={80} />
          <Tile className="g-horses" photo={p.horses} delay={160} />
          <Tile className="g-pool" photo={p.pool} delay={120} />
          <figure className="g-cat pet tile" {...reveal(200)}>
            <Media className="pet__photo" image={p.cat.image} position={p.cat.position} label={p.cat.alt} />
            <figcaption className="pet__caption t-small muted">{ABOUT.petsText}</figcaption>
            <svg className="pet__heart" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" d="M12 21s-7.5-4.7-7.5-10.6A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.8C19.5 16.3 12 21 12 21z" />
            </svg>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function Portfolio() {
  useReveal()
  useHashScroll()
  return (
    <div className="v4">
      <TopBar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Contacts />
      </main>
      {import.meta.env.DEV && <GridOverlay />}
    </div>
  )
}
