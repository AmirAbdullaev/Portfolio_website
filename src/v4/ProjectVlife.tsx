import { ArrowNE, Contacts, GridOverlay, TopBar, reveal, useHashScroll, useReveal } from './shared'
import { ArtDef, Cards, CaseHero, Chapter, Facts, Figure, FigureRow, Figures, HOME, OtherProjects, StackTile, Text } from './case'
import './v4.css'
import './case.css'

// Case study: Vlife, a loyalty program in a mobile app. Content from the Notion portfolio page,
// laid out with the same blocks as the WMS case study.

const TITLE = 'Vlife — Customer Loyalty Program'
const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=kz.vlife.grandera'
const APP_STORE = 'https://apps.apple.com/ru/app/vlife-%D0%B0%D0%B7%D1%81-%D0%BF%D0%B0%D1%80%D1%82%D0%BD%D0%B5%D1%80%D1%8B-%D0%B1%D0%B0%D0%BB%D0%BB%D1%8B/id1527733098'

/**
 * Outline drawings for the tiles, in the style of the WMS constraint tiles.
 *   points  — a coin                 pump     — a fuel pump with its hose      shield  — insurance
 *   wallet  — payments               network  — partners linked to one hub     gift    — promotions
 *   kit     — design-system parts    cut      — scissors: removing modules      talk    — interviews
 */
type Art = 'points' | 'pump' | 'shield' | 'wallet' | 'network' | 'gift' | 'kit' | 'cut' | 'talk'
const ART: Record<Art, ArtDef> = {
  points: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <circle cx="12" cy="12" r="9.5" />
        <circle cx="12" cy="12" r="6" />
        <path d="M12 9v6" />
      </>
    ),
  },
  pump: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
        <path d="M2.5 21h14" />
        <rect x="6.5" y="6" width="6" height="4.5" rx="0.8" />
        <path d="M15 9h2l2.5 2.5V17a1.5 1.5 0 0 1-3 0v-3H15" />
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
  wallet: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path d="M5.5 6V5a2 2 0 0 1 2-2h9.5v3" />
        <rect x="3" y="6" width="18" height="15" rx="2.5" />
        <path d="M21 11h-4a2.5 2.5 0 0 0 0 5h4" />
      </>
    ),
  },
  network: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <circle cx="12" cy="12" r="3" />
        {[[4.5, 4.5], [19.5, 4.5], [4.5, 19.5], [19.5, 19.5]].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="2" />
            <path d={`M${x + (x < 12 ? 1.5 : -1.5)} ${y + (y < 12 ? 1.5 : -1.5)}L${12 + (x < 12 ? -2.1 : 2.1)} ${12 + (y < 12 ? -2.1 : 2.1)}`} />
          </g>
        ))}
      </>
    ),
  },
  gift: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <rect x="3" y="9" width="18" height="4.5" rx="1" />
        <path d="M5 13.5V21h14v-7.5" />
        <path d="M12 9v12" />
        <path d="M12 9C10.5 5 6.5 4.5 7 7.3 7.3 9 12 9 12 9zM12 9c1.5-4 5.5-4.5 5-1.7C16.7 9 12 9 12 9z" />
      </>
    ),
  },
  kit: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="3" width="8" height="8" rx="4" />
        <rect x="3" y="13" width="8" height="8" rx="2" />
        <path d="M17 13v8M13 17h8" />
      </>
    ),
  },
  cut: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M8.2 8.2 20 20M8.2 15.8 20 4" />
      </>
    ),
  },
  talk: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path d="M4 3.5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9.5L5.5 18v-3.5H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" />
        <path d="M18 8.5h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1v3l-3.5-3H12a2 2 0 0 1-2-2" />
        <path d="M6.5 9h.01M10 9h.01M13.5 9h.01" />
      </>
    ),
  },
}

const FEATURES: { title: string; text: string; art: Art }[] = [
  { title: 'Earn and spend points', art: 'points', text: 'Points come in for fuel, EV charging, pharmacy purchases and more — and go back out on fuel, goods, services and payments across the partner network.' },
  { title: 'Contactless refuelling', art: 'pump', text: 'Pay for fuel at the pump from the app, without a trip to the cashier.' },
  { title: 'Car insurance', art: 'shield', text: 'Take out a car insurance policy right in the app.' },
  { title: 'Payments', art: 'wallet', text: 'Pay utility bills and other services without leaving the app.' },
  { title: 'Partner network', art: 'network', text: 'Large chains of filling stations, pharmacies and EV charging stations.' },
  { title: 'Promotions and gifts', art: 'gift', text: 'Promotions run together with partners, with gifts for taking part.' },
]

/** The directions the app went through before the redesign; the last one is where it settled. */
const TURNS = [
  { title: 'A WeChat-style super app' },
  { title: 'An app for drivers' },
  { title: 'A loyalty app', note: 'The final goal, set after I joined' },
]

const OUTCOME = [
  { title: 'People got lost', text: 'We received a huge number of complaints from users who couldn’t figure out how to get around the app.' },
  { title: 'Most of the app went unused', text: 'Most people only ever opened the QR code page. When surveys asked what else they would like to see in the app, they named features it already had.' },
  { title: 'No design system', text: 'There were no shared UI components or rules to build new screens from.' },
]

const GOALS = [
  { title: 'Redesign for the new direction', text: 'Rebuild the whole app around what it had finally become: a loyalty program.' },
  { title: 'Cut the noise', text: 'Find and remove what wasn’t needed, then rework the main flows and make them easier to reach.' },
  { title: 'A clear profile level', text: 'Make the level page show people where they stand and what they still need to do to reach the next level.' },
]

const DONE: { title: string; text: string; art: Art }[] = [
  { title: 'A design system from scratch', art: 'kit', text: 'We rebuilt the design system and redrew many components from scratch. Everything got one look and was assembled into components and variants, each with a description.' },
  { title: 'Less, not more', art: 'cut', text: 'We removed modules nobody needed, such as the store, and every duplicate flow — the home screen had buttons with different names that led to the same place.' },
  { title: 'Research on the forecourt', art: 'talk', text: 'Many user interviews shaped the home screen and the rest of the app. We also surveyed drivers at filling and charging stations and went through the flows ourselves with different cars.' },
]

const RESULTS: FigureRow[] = [
  { value: '−45%', label: 'Crash rate' },
  { value: '95%', label: 'Crash-free users', note: 'Up from 82%' },
  { value: '+12%', label: 'Conversion', note: 'A simpler path, registration above all' },
  { value: '+15%', label: 'PMAU', note: 'As people engaged with more of the app' },
  { value: '+10%', label: 'MAU', note: 'Driven by updated features and new integrations' },
  { value: '+12%', label: 'SMS and push deliverability', note: 'After moving to a more efficient system' },
  { value: '4.9', label: 'Google Play rating', note: 'Up from 4.1' },
  { value: '3.9', label: 'App Store rating', note: 'Up from 3.2' },
]

const ALSO = [
  'Sign-in and registration got 8% faster after the authorization rework.',
  'Crash-free sessions are now above 90%.',
  'Ad banners for monetization have just shipped — results are on the way.',
]

/* ---------- building blocks ---------- */

/**
 * The app before the redesign, as a bento: two wide shots on top (cols 1–7 and 8–12), then two single screens
 * and a text tile with the backstory. In each row the frames share one grid row and the captions the next,
 * so the frames end on the same line however long their captions are.
 */
function BeforeShots() {
  return (
    <div className="cs-shots">
      <div className="cs-shots__row">
        <Figure
          className="is-7"
          pad
          src="/assets/vlife-before-inconsistency.webp"
          width={1800}
          height={1246}
          alt="Three screens of the old app: home, notifications and filling stations — each with its own lists, buttons and app bar"
          caption="No consistency: lists, buttons, navigation and the app bar look different in every section"
        />
        <Figure
          className="is-5"
          fit
          delay={80}
          src="/assets/vlife-before-styles.webp"
          width={1400}
          height={1478}
          alt="Two screens of the old store: tiles with shadows next to flat list items in a different typeface"
          caption="Shadows, fonts and spacing change from screen to screen"
        />
        </div>
        <div className="cs-shots__row">
        <Figure
          className="is-3 is-tall"
          fit
          src="/assets/vlife-before-nav.webp"
          width={720}
          height={1600}
          alt="The old filling station map with small labels in the bottom navigation"
          caption="Navigation buttons too small to hit"
        />
        <Figure
          className="is-3 is-tall"
          fit
          delay={80}
          src="/assets/vlife-before-corners.webp"
          width={720}
          height={1600}
          alt="The old payments screen: a block with rounded corners above a block with square ones"
          caption="Some components have rounded corners, some don’t"
        />
        <div className="cs-shots__note tile" {...reveal(160)}>
          <p className="t-label">How the app got here</p>
          <ol className="cs-turns">
            {TURNS.map((t, i) => (
              <li key={t.title} className={`t-m${i === TURNS.length - 1 ? ' is-now' : ''}`}>
                {t.title}
                {t.note && <span className="t-small muted">{t.note}</span>}
              </li>
            ))}
          </ol>
          <p className="t-body muted">Every turn left a layer behind, and the app ended up looking like Frankenstein. These are a few examples — the list went on.</p>
        </div>
      </div>
    </div>
  )
}

/* ---------- page ---------- */

export default function ProjectVlife() {
  useReveal()
  useHashScroll()
  return (
    <div className="v4">
      <TopBar home={HOME} />
      <main>
        <CaseHero
          lines={['Vlife', 'Loyalty', 'Program']}
          image="/assets/project-vlife.webp"
          position="center 40%"
          label="The redesigned Vlife home screen on a phone"
        />

        <Chapter title="Overview">
          <Facts
            items={[
              { label: 'Role', value: 'Product designer' },
              { label: 'Timeline', value: 'January – November 2024' },
              { label: 'Platform', value: 'iOS · Android' },
              {
                label: 'Download',
                value: (
                  <span className="cs-links">
                    <a className="cs-link" href={APP_STORE} target="_blank" rel="noopener">App Store <ArrowNE size={20} /></a>
                    <a className="cs-link" href={GOOGLE_PLAY} target="_blank" rel="noopener">Google Play <ArrowNE size={20} /></a>
                  </span>
                ),
              },
            ]}
          />
          <Text>Vlife is a loyalty program in a mobile app. People earn points with a network of partners and spend them there — on fuel, payments, car insurance and other services — and get bonuses for doing so.</Text>
        </Chapter>

        <Chapter title="The product" wide intro="One app for points, fuel and everyday payments, built on a network of partners.">
          <Figure src="/assets/vlife-store.webp" width={2014} height={998} alt="Vlife App Store screenshots: earning points, the home screen, EV charging and the Bronze to Diamond loyalty levels" caption="Vlife on the App Store" />
          <Cards items={FEATURES} art={ART} />
        </Chapter>

        <Chapter title="The problem" wide intro="Before it settled on loyalty, the app changed direction several times — and it showed.">
          <BeforeShots />
        </Chapter>

        <Chapter title="What it led to">
          <StackTile items={OUTCOME} />
        </Chapter>

        <Chapter title="Goals">
          <StackTile items={GOALS} />
        </Chapter>

        <Chapter title="What was done" wide>
          <Cards items={DONE} art={ART} />
          <Figure pad src="/assets/vlife-design-system.webp" width={2400} height={1928} alt="Design system pages: tab bar in light and dark, app bar variants, an accordion and list items" caption="Part of the new design system: tab bar, app bar, accordion and lists" />
          <Text>We also reworked the profile level system, so people can see their status and how far it is to the next one — and fixed a lot of small things along the way.</Text>
        </Chapter>

        <Chapter title="After the redesign" wide>
          <Figure
            className="is-center"
            pad
            src="/assets/vlife-after.webp"
            width={2400}
            height={2223}
            alt="Redesigned screens: the home screen with status, partners, charging and payments; the charging subscription catalogue; limited-time offers; an active subscription"
            caption="Home, the charging subscription catalogue, limited-time offers and an active subscription"
          />
        </Chapter>

        <Chapter title="Results" intro="What changed after the redesign, by the numbers.">
          <Figures items={RESULTS} />
          <Figure
            pad
            src="/assets/vlife-crashlytics.webp"
            width={1228}
            height={636}
            alt="Crash-free users rising from 85% to 95.07% over a week in April 2025; crash-free sessions at 90.38%; crashes down 45.3%"
            caption="Crashlytics, April 2025: crash-free users up to 95%, crashes down 45%"
          />
          <div className="cs-reports tile" {...reveal()}>
            <p className="t-lead">Also:</p>
            <ul className="cs-dots t-body">
              {ALSO.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        </Chapter>

        <OtherProjects current={TITLE} />
        <Contacts />
      </main>
      {import.meta.env.DEV && <GridOverlay />}
    </div>
  )
}
