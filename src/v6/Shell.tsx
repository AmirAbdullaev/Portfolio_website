// The v6 shell: a split screen on white. The left third is a fixed column about me (greeting, the CV button, an
// index of the case studies with their devices, experience with links to the About page, contacts); the rest
// holds the page — all projects on the homepage, a case study or the About page when one is open. The left
// column stays mounted while the app swaps the page beside it.
import { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, BehanceLogo, Check, EnvelopeSimple, LinkedinLogo, TelegramLogo } from '@phosphor-icons/react'
import { BEHANCE_URL, CV_URL, EMAIL, LINKEDIN_URL, TELEGRAM_URL } from '../constants'
import { EXPERIENCE, PORTRAIT } from '../content'
import { CASES } from './data'
import { copyText, shortDates, useReveal } from './shared'
import { Button } from './Button'
import { Lightbox } from './Lightbox'

const HELLO = 'Hi, I’m Amir. I\u00A0design B2B SaaS and mobile apps.'   // "I" stays with "design"
const INTRO = '4 years of hands-on experience crafting products that drive real results: the digitisation of a whole car plant, loyalty apps and EV charging.'

/** Staggered entrance: each block of the panel rises in a beat after the previous one. */
const step = (i: number) => ({ 'data-rise': '', style: { '--i': i } as CSSProperties })

function Panel({ route, onCopyEmail }: { route: string; onCopyEmail: () => void }) {
  // The open case study is the current one in the index.
  const current = route

  return (
    <aside className="panel" aria-label="About Amir">
      <div className="panel__top">
        <div className="panel__head" {...step(0)}>
          <a className="panel__id" href="/">
            <span className="panel__avatar" style={{ backgroundImage: `url('${PORTRAIT}')` }} aria-hidden="true" />
            <span className="panel__who">
              <span className="t-small w-500">Amir Abdullaev</span>
              <span className="t-small muted">Product Designer</span>
            </span>
          </a>
          {/* Contacts next to the name: round icon buttons, each names itself in a tooltip on hover. One icon style for all:
              Phosphor regular (outline), so no mark reads heavier than the others. */}
          <ul className="social" aria-label="Contact">
            <li>
              <a className="social__btn" href={TELEGRAM_URL} target="_blank" rel="noopener" aria-label="Telegram" data-tip="Telegram">
                <TelegramLogo size={19} />
              </a>
            </li>
            <li>
              <a className="social__btn" href={LINKEDIN_URL} target="_blank" rel="noopener" aria-label="LinkedIn" data-tip="LinkedIn">
                <LinkedinLogo size={19} />
              </a>
            </li>
            <li>
              <a className="social__btn" href={BEHANCE_URL} target="_blank" rel="noopener" aria-label="Behance" data-tip="Behance">
                <BehanceLogo size={19} />
              </a>
            </li>
            <li>
              <button type="button" className="social__btn" onClick={onCopyEmail} aria-label={`Copy email address ${EMAIL}`} data-tip="Copy email">
                <EnvelopeSimple size={19} />
              </button>
            </li>
          </ul>
        </div>

        <div className="panel__intro">
          <p className="panel__hello t-l" {...step(1)}>{HELLO}</p>
          <p className="t-body muted" {...step(2)}>{INTRO}</p>
          <div {...step(3)}>
            <Button href={CV_URL} download icon={<ArrowDown size={16} weight="bold" />}>Download CV</Button>
          </div>
        </div>
      </div>

      <nav className="panel__index" aria-labelledby="panel-work" {...step(4)}>
        <h2 id="panel-work" className="panel__label t-body w-500">Work</h2>
        <ul>
          {CASES.map((c) => (
            <li key={c.key}>
              <a className={`index-link${current === c.key ? ' is-current' : ''}`} href={c.href} aria-current={route === c.key ? 'page' : undefined}>
                <span className="index-link__bar" aria-hidden="true" />
                <span className="index-link__text">
                  <span className="index-link__name t-body">
                    {c.short}
                    <ArrowUpRight className="index-link__go" size={16} aria-hidden="true" />
                  </span>
                  {c.devices && <span className="index-link__devices t-small">{c.devices.join(', ')}</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="panel__bottom" {...step(5)}>
        <section aria-labelledby="panel-exp">
          {/* The jobs are a plain list; "Show more" beside the heading opens the About page, and a fourth row after the
              jobs leads to the rest of that page: how I work, skills, education, life outside work. */}
          <div className="panel__label-row">
            <h2 id="panel-exp" className="panel__label t-body w-500">Experience</h2>
            <a className="text-link t-small" href="/?page=about" aria-current={route === 'about' ? 'page' : undefined}>Show more</a>
          </div>
          <ol className="panel__jobs">
            {EXPERIENCE.map((job) => (
              <li key={job.company} className="panel__job t-small">
                <span className="w-500">{job.company}</span>
                <span className="muted">{job.role}</span>
                <span className="muted panel__dates">{shortDates(job.dates)}</span>
              </li>
            ))}
            <li>
              <a className="panel__job panel__outside t-small" href="/?page=about#how-i-work">
                <span className="text-link w-500">More about me</span>
                <span className="muted">How I work, skills, life outside work</span>
              </a>
            </li>
          </ol>
        </section>
      </div>
    </aside>
  )
}

export function Shell({ route, children }: { route: string; children: ReactNode }) {
  useReveal()
  const [toast, setToast] = useState({ text: '', on: false })
  const timer = useRef<number>()

  const notify = useCallback((text: string) => {
    setToast({ text, on: true })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast((t) => ({ ...t, on: false })), 2200)
  }, [])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = useCallback(() => {
    const done = () => notify('Email address copied')
    copyText(EMAIL).then(done, done)
  }, [notify])

  return (
    <div className={`v5 v6${route === 'home' ? ' is-home' : ''}`}>
      <a className="skip t-small w-500" href="#content">Skip to content</a>
      <Panel route={route} onCopyEmail={copyEmail} />
      <Lightbox />
      <div className="app">
        <main id="content" className="app__main">{children}</main>
      </div>
      <div className={`toast t-small w-500${toast.on ? ' is-on' : ''}`} role="status" aria-live="polite">
        <Check size={18} weight="bold" />
        <span>{toast.text}</span>
      </div>
    </div>
  )
}
