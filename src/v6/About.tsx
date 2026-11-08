import { EnvelopeSimple, LinkedinLogo, TelegramLogo } from '@phosphor-icons/react'
import { EMAIL, LINKEDIN_URL, TELEGRAM_URL } from '../constants'
import { ABOUT, EXPERIENCE, Photo } from '../content'
import { CASES } from './data'
import { Chapter, Facts, StackTile } from './case'
import { Media, reveal, shortDates } from './shared'
import { Button } from './Button'
import './case.css'

// v6 About page, opened from the Experience list in the left column: one chapter per job, in the case-study layout —
// the company on the left, on the right what the company does, the role and dates, what I did there, and the case
// studies that came out of it — then how I work (#how-i-work, in my own words), skills and education (from the CV),
// location, work format and languages,
// life outside work with four photos, and a closing invitation to get in touch.

const SUMMARY = 'Four years of building and evolving digital products — mobile apps and SaaS platforms — through the whole design cycle, from research and requirements to prototypes and launch. Design systems along the way, so the interface could keep up with the product.'

/** How I work, from Amir's own account: the process first, options tested, close to development, AI in the loop. */
const PRINCIPLE = 'Work done properly, not just done — and for the good of the people who use it.'
const HOW_I_WORK = [
  {
    title: 'Start from the real process',
    text: 'Most of what our profession does is take a process that already exists in the real world and make it easier — food was delivered long before there were apps for it. So I start where the process happens. For example, for the trade-in module at MyCar I went to our dealerships and followed the whole intake: receiving the car, inspecting it, the legal steps; at the car plant we began on the warehouse floor, watching containers being unloaded and cases moved. Then the process is broken down into tasks.',
  },
  {
    title: 'Options, then evidence',
    text: 'I usually design two or three options and choose one against our hypothesis, then check it on prototypes in usability sessions. After launch, complaints that reach support count too: we ask people how they are used to working and keep to it where we can.',
  },
  {
    title: 'Close to development',
    text: 'A task starts with a grooming session with front end and back end: do we see it the same way, and can every screen get the data it needs. Big features get a short spec on how each screen behaves and where its data comes from — I wrote one for every desktop report in WMS. Nothing goes to testing without my design review.',
  },
  {
    title: 'The business, with questions ready',
    text: 'I mostly work through a business analyst or a product manager, and meet the business directly when it is needed — with a list of questions, such as whether sensitive legal data may appear on a screen.',
  },
  {
    title: 'AI in the workflow',
    text: 'Claude is built into how my company works. I design with it — my latest design systems were built with Claude from scratch — and use Figma to review the result.',
  },
]

/** Hard skills from the CV. */
const SKILLS = [
  'SaaS and B2B enterprise products',
  'Interfaces for desktop and industrial handheld terminals',
  'Information architecture',
  'Wireframes and interactive prototypes',
  'User research and interviews',
  'Usability testing and A/B tests',
  'Design systems in Figma: variables and components',
]

/** Education from the CV, newest first. */
const EDUCATION = [
  { school: 'University of Power Engineering and Telecommunications', study: 'Undergraduate studies: computers and software', year: '2016' },
  { school: 'Al-Farabi Kazakh National University', study: 'Associate degree: information systems', year: '2012' },
]

export default function About() {
  return (
    <>
      <section className="cs-cover wrap" aria-labelledby="about-title">
        {/* The summary sits right under the title, on the same left edge. */}
        <div className="cs-cover__head">
          <h1 id="about-title" className="t-xl" {...reveal(0)}>About</h1>
          <p className="exp__lede cs-lede t-lead" {...reveal(100)}>{SUMMARY}</p>
        </div>
      </section>

      {EXPERIENCE.map((job) => {
        const cases = CASES.filter((c) => job.cases?.includes(c.key))
        return (
          <Chapter key={job.company} title={job.company} intro={job.summary}>
            <p className="exp__role t-body" {...reveal()}>
              <span className="w-500">{job.role}</span>
              <span className="muted">{shortDates(job.dates)}</span>
            </p>
            {job.points && (
              <ul className="cs-dots t-body" {...reveal()}>
                {job.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            )}
            {cases.length > 0 && (
              <div className="exp__cases" {...reveal()}>
                <p className="t-small muted">{cases.length > 1 ? 'Case studies' : 'Case study'}</p>
                <ul>
                  {cases.map((c) => (
                    <li key={c.key}>
                      <a className="text-link t-body" href={c.href}>{c.short}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Chapter>
        )
      })}

      <Chapter title="How I work" intro={PRINCIPLE}>
        <StackTile items={HOW_I_WORK} />
      </Chapter>

      <Chapter title="Skills">
        <ul className="about__skills t-body" {...reveal()}>
          {SKILLS.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </Chapter>

      <Chapter title="Education">
        <ul className="about__schools" {...reveal()}>
          {EDUCATION.map((e) => (
            <li key={e.school} className="about__school t-body">
              <span className="w-500">{e.school}</span>
              <span className="muted">{e.study}</span>
              <span className="muted about__year">{e.year}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* Where I am, how I can work, what I speak: often the first filter for a team abroad. */}
      <Chapter title="Location & languages">
        <Facts
          items={[
            { label: 'Based in', value: 'Almaty, Kazakhstan' },
            { label: 'Work format', value: 'Remote or hybrid, open to relocation' },
            { label: 'Languages', value: 'Russian (native), English (B1–B2)' },
          ]}
        />
      </Chapter>

      <Chapter title={ABOUT.title} intro={ABOUT.text}>
        <p className="t-body muted" {...reveal()}>{ABOUT.petsText}</p>
        <ul className="about__photos">
          {([ABOUT.photos.autumn, ABOUT.photos.river, ABOUT.photos.horses, ABOUT.photos.cat] as Photo[]).map((ph, i) => (
            <li key={ph.image} {...reveal(i * 60)}>
              <Media className="about__photo" image={ph.image} position={ph.position} zoom={ph.zoom} label={ph.alt} />
            </li>
          ))}
        </ul>
      </Chapter>

      {/* The page ends with a way to take the next step. */}
      <Chapter title="Contact" intro="Have a product that needs a designer? Let’s talk.">
        <div className="about__contact" {...reveal()}>
          <Button href={`mailto:${EMAIL}`} icon={<EnvelopeSimple size={16} />}>Email me</Button>
          <Button href={TELEGRAM_URL} external kind="secondary" icon={<TelegramLogo size={16} />}>Telegram</Button>
          <Button href={LINKEDIN_URL} external kind="secondary" icon={<LinkedinLogo size={16} />}>LinkedIn</Button>
        </div>
      </Chapter>
    </>
  )
}
