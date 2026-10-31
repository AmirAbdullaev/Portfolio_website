import { Contacts, GridOverlay, TopBar, reveal, useHashScroll, useReveal } from './shared'
import { CaseHero, Chapter, Facts, Figure, FigureRow, Figures, HOME, OtherProjects, StackTile } from './case'
import './v4.css'
import './case.css'

// Case study: Q-sight, a B2B inspection tool for Qmobile. Content from the Behance project "Qmobile | Mobile app",
// laid out with the same blocks as the other case studies.

const TITLE = 'Q-sight'

const PROBLEM = [
  { title: 'Standards at every site', text: 'A company with many filling stations and shops has to know that each one keeps to its standards — around the clock, not only on the day of an audit.' },
  { title: 'Checks that leave a record', text: 'Staff check in at the site, photograph what needs checking and fill in checklists; managers review the results and see the analytics.' },
]

const PROCESS = [
  { title: 'Research', text: 'User flows, a briefing with the client and interviews.' },
  { title: 'Competitive analysis', text: 'How similar inspection tools look and what they can do.' },
  { title: 'Architecture', text: 'The app’s structure, wireframes and an interactive prototype.' },
  { title: 'Visual design', text: 'A visual concept and a UI kit, then the final screens, the release and testing.' },
]

/**
 * The app's main flows. A row holds one wide picture across the page or two 16:10 slides side by side, so the
 * frames in a row line up. Every slide is the phones on the white of the original case.
 */
type Shot = { src: string; alt: string; caption: string; width?: number; height?: number }
const FLOWS: Shot[][] = [
  [
    {
      src: '/assets/qsight-signin.webp',
      alt: 'Sign-in with email and password, and the profile: sites, security, notifications, analytics, FAQ and language',
      caption: 'It’s a B2B product, so accounts are created in the web admin. The employee gets an email, sets a password and signs in.',
    },
    {
      src: '/assets/qsight-analytics.webp',
      alt: 'Analytics menu, an attendance log with arrival and departure times, and a summary of hours worked, lateness and early leaves',
      caption: 'Each employee sees their own analytics and a log of every arrival at and departure from a site.',
    },
  ],
  [
    {
      src: '/assets/qsight-checkin.webp',
      width: 2300,
      height: 1000,
      alt: 'Check-in: the profile prompts to check in, a list of sites available nearby, a confirmation and a success screen',
      caption: 'Check-in and check-out mark the start and end of a shift at a site. Which sites you can pick depends on where you are.',
    },
  ],
  [
    {
      src: '/assets/qsight-photo.webp',
      alt: 'A photo report: a question with three photos to take, the camera on a fuel price board, and a sent-for-approval screen',
      caption: 'Photo reports go to a group. Once someone starts one, it’s no longer available to the others; each question asks for photos.',
    },
    {
      src: '/assets/qsight-checklists.webp',
      alt: 'Checklists: the list for review, a checklist’s sections and questions, sending it back for rework, and a finished checklist',
      caption: 'Checklists are filled in question by question; a manager approves them or sends them back for rework.',
    },
  ],
]

/**
 * The rollout comes first, then the build. The staff figure is an estimate: two 12-hour shifts of about three
 * operators plus a manager — roughly 8 people per station.
 */
const RESULTS: FigureRow[] = [
  { value: '~370', label: 'Filling stations running Q-sight' },
  { value: '~3,000', label: 'Station staff on the mobile app', note: 'An estimate: about 8 people per station' },
  { value: '200+', label: 'Screens' },
  { value: '80+', label: 'Components in the UI kit' },
  { value: '~4', label: 'Months of work', note: 'The desktop version included' },
  { value: '3', label: 'Platforms', note: 'iOS, Android and desktop' },
]

/* ---------- page ---------- */

export default function ProjectQsight() {
  useReveal()
  useHashScroll()
  return (
    <div className="v4">
      <TopBar home={HOME} />
      <main>
        <CaseHero
          lines={['Q-sight', 'Inspection', 'platform']}
          image="/assets/qsight-hero.webp"
          position="center 20%"
          label="A phone with the Q-sight profile screen standing on a tiled cube against a blue wall"
        />

        <Chapter title="Overview">
          <p className="cs-lede t-lead" {...reveal()}>Q-sight is a B2B tool by Qmobile that automates the everyday checks at a company’s sites, such as filling stations and shops. It keeps track of whether standards are met and makes every inspection simpler.</p>
          <Facts
            items={[
              { label: 'Role', value: 'UX/UI designer' },
              { label: 'Platform', value: 'iOS · Android · Desktop' },
            ]}
          />
        </Chapter>

        <Chapter title="The task">
          <StackTile items={PROBLEM} />
        </Chapter>

        <Chapter title="How it was made">
          <StackTile items={PROCESS} />
        </Chapter>

        <Chapter title="The app" wide intro="From signing in to a finished checklist: what an employee does at a site.">
          <div className="cs-shots">
            {FLOWS.map((row) => (
              <div key={row[0].src} className="cs-shots__row">
                {row.map(({ width = 1600, height = 1000, ...s }, i) => (
                  <Figure key={s.src} className={row.length > 1 ? 'is-6' : 'is-12'} delay={i * 80} width={width} height={height} {...s} />
                ))}
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter title="Results" intro="Q-sight went live across a network of filling stations, and the mobile app reached the staff at every one of them.">
          <Figures items={RESULTS} />
        </Chapter>

        <OtherProjects current={TITLE} />
        <Contacts />
      </main>
      {import.meta.env.DEV && <GridOverlay />}
    </div>
  )
}
