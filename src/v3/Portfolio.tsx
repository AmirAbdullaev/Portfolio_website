import { useEffect, useRef, useState } from 'react'
import {
  CV_URL,
  EMAIL,
  LINKEDIN_HANDLE,
  LINKEDIN_URL,
  TELEGRAM_HANDLE,
  TELEGRAM_URL,
} from '../constants'
import { ABOUT, EXPERIENCE, PROJECTS } from '../content'
import './portfolio.css'

const ABOUT_PHOTOS = ABOUT.photos

function ArrowUpRight({ size = 24, stroke = 'currentColor', strokeWidth = 1.7 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <span className="site-header__name">Amir Abdullaev</span>
        <nav className="site-header__nav" aria-label="Primary">
          <a href="#projects"><span className="fill-text">Projects</span></a>
          <a href="#about"><span className="fill-text">About</span></a>
          <a href="#contacts"><span className="fill-text">Contacts</span></a>
        </nav>
        <span className="site-header__actions">
          <a className="btn btn-primary" href={TELEGRAM_URL} target="_blank" rel="noopener">
            <span>Telegram</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21.5 3.5 2.8 10.7c-.9.35-.88 1.63.03 1.95l4.6 1.6 1.75 5.3c.27.8 1.3.99 1.83.33l2.5-3.1 4.6 3.38c.6.44 1.46.11 1.6-.62l3.3-14.4c.16-.72-.54-1.32-1.51-.94z" fill="currentColor" />
            </svg>
          </a>
          <a className="btn btn-outline is-download" href={CV_URL} download aria-label="Download CV">
            <span>Download CV</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4v11" />
              <path d="m7.5 11 4.5 4.5 4.5-4.5" />
              <path d="M5 19h14" />
            </svg>
          </a>
        </span>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__shade" />
      <div className="hero__inner">
        <div className="hero__row">
          <h1 className="hero__title">
            Hey, I am <span className="hero__avatar" role="img" aria-label="Portrait of Amir" />
            Amir — 4 years of&nbsp;hands-on experience crafting <span className="accent">mobile apps</span> &amp;{' '}
            <span className="accent">B2B-SaaS</span> products that drive real result
          </h1>
          <a className="hero-card" href="#projects">
            <div className="hero-card__image" />
            <div className="hero-card__meta">
              <div className="hero-card__text">
                <span className="hero-card__label">Latest project</span>
                <span className="hero-card__title">Hyundai Trans Kazakhstan</span>
              </div>
              <ArrowUpRight stroke="var(--accent)" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="container rise-in">
      <div className="section-head">
        <h2 className="h-display">Projects</h2>
        <a className="btn btn-outline is-forward" href="#projects">
          <span>Show all</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </a>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <a key={p.title} className="project-card" href={p.href ?? '#projects'}>
            <div className="project-card__image" style={{ backgroundImage: `url('${p.image}')` }} />
            <div className="project-card__shade" />
            <div className="project-card__text">
              <span className="project-card__title">{p.title}</span>
              <span className="project-card__tags">{p.tags}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function Quote() {
  return (
    <section id="thoughts" className="container quote">
      <figure className="reveal-blur">
        <blockquote>“People ignore design that ignores people”</blockquote>
        <figcaption>Frank Chimero</figcaption>
      </figure>
    </section>
  )
}

function Experience() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="resume" className="container rise-in">
      <div className="experience__glow" />
      <div className="section-head">
        <h2 className="h-display">Experience</h2>
      </div>
      <div className="exp-list">
        {EXPERIENCE.map((job, i) => {
          const isOpen = open === i
          const bodyId = `exp-body-${i}`
          return (
            <div key={job.company} className={`exp-item${isOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="exp-head exp-grid fill-trigger"
                aria-expanded={isOpen}
                aria-controls={bodyId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="exp-head__company">
                  <span className={`exp-head__name fill-text${isOpen ? ' is-filled' : ''}`}>{job.company}</span>
                  <span className="exp-head__dates">{job.dates}</span>
                </span>
                <span className="exp-head__role">{job.role}</span>
                <span className="exp-head__toggle" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </span>
              </button>
              <div id={bodyId} className="exp-body" aria-hidden={!isOpen}>
                <div className="exp-body__inner">
                  <div className="exp-grid">
                    <span className="exp-body__summary">{job.summary}</span>
                    <span className="exp-body__details">{job.details}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Photo({ photo }: { photo: { image: string; position: string } }) {
  return (
    <div
      className="about-photo"
      style={{ backgroundImage: `url('${photo.image}')`, backgroundPosition: photo.position }}
    />
  )
}

function About() {
  return (
    <section id="about" className="container rise-in">
      <div className="about-grid">
        <div className="about-intro">
          <h2 className="h-display">
            A little bit outside
            <br />
            of work
          </h2>
          <p className="about-text">
            I work out at the gym, enjoy long walks and the mountains, and am interested in psychology and new technologies
          </p>
        </div>
        <Photo photo={ABOUT_PHOTOS.autumn} />
        <Photo photo={ABOUT_PHOTOS.river} />
        <Photo photo={ABOUT_PHOTOS.horses} />
        <Photo photo={ABOUT_PHOTOS.pool} />
        <div className="about-note">
          <p className="about-text">I also adore cats, dogs, and anyone I can scratch behind the ear :)</p>
        </div>
        <Photo photo={ABOUT_PHOTOS.cat} />
      </div>
    </section>
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

function Contacts() {
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
    <section id="contacts" className="container contacts rise-in">
      <div className="section-head">
        <h2 className="h-display">Contacts</h2>
      </div>
      <div className="contact-list">
        <a className="contact-row fill-trigger" href={TELEGRAM_URL} target="_blank" rel="noopener">
          <span className="contact-row__value fill-text">{TELEGRAM_HANDLE}</span>
          <span className="contact-row__icon">
            <ArrowUpRight size={30} strokeWidth={1.6} />
          </span>
          <span className="contact-row__label">Telegram</span>
        </a>
        <a className="contact-row fill-trigger" href={LINKEDIN_URL} target="_blank" rel="noopener">
          <span className="contact-row__value fill-text">{LINKEDIN_HANDLE}</span>
          <span className="contact-row__icon">
            <ArrowUpRight size={30} strokeWidth={1.6} />
          </span>
          <span className="contact-row__label">LinkedIn</span>
        </a>
        <button type="button" className="contact-row fill-trigger" onClick={copyEmail} aria-label="Copy email address">
          <span className="contact-row__value fill-text">{EMAIL}</span>
          <span className={`contact-row__icon is-horizontal${copied ? ' is-visible' : ''}`}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V6a2 2 0 0 1 2-2h8" />
            </svg>
            <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
          </span>
          <span className="contact-row__label">Email</span>
        </button>
      </div>
    </section>
  )
}

export default function Portfolio() {
  return (
    <div className="v3">
      <div className="bg-glows" aria-hidden="true">
        <div className="g1" />
        <div className="g2" />
        <div className="g3" />
      </div>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Quote />
        <Experience />
        <About />
        <Contacts />
      </main>
    </div>
  )
}
