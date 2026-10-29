import { CSSProperties, useRef } from 'react'
import { Contacts, GridOverlay, TopBar, reveal, useHashScroll, useReveal, useStickyFit } from './shared'
import { ArtDef, Cards, CaseHero, Chapter, Facts, Figure, HOME, OtherProjects, StackTile, Text } from './case'
import './v4.css'
import './case.css'

// Case study: Qazaq Energy Charge, the screen on an EV charging station. Content from the Behance project
// "Design interface for Qazaq Energy Charge", laid out with the same blocks as the other case studies.

const TITLE = 'Qazaq Energy Charge'

/**
 * Outline drawings for the network tiles, in the style of the other case studies.
 *   pin   — a map pin: stations across the country     bolt — a lightning bolt: charging power
 *   phone — a phone with a QR code: starting from the Vlife app
 */
type Art = 'pin' | 'bolt' | 'phone'
const ART: Record<Art, ArtDef> = {
  pin: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path d="M12 22s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
  },
  bolt: {
    viewBox: '0 0 24 24',
    body: <path d="M13.5 2 4.5 13.5H12L10.5 22l9-11.5H12z" />,
  },
  phone: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <rect x="5.5" y="1.5" width="13" height="21" rx="2.5" />
        <path d="M10.5 19h3" />
        <rect x="8.5" y="5.5" width="3" height="3" rx="0.5" />
        <rect x="12.5" y="5.5" width="3" height="3" rx="0.5" />
        <rect x="8.5" y="9.5" width="3" height="3" rx="0.5" />
        <path d="M13 10h2.5M14.5 12.5h1" />
      </>
    ),
  },
}

const PROBLEM = [
  { title: 'An overloaded screen', text: 'The station’s interface had never really been designed. It was crowded with text that ran together, so drivers had to work hard just to understand how to use it.' },
  { title: 'Charging data nobody could read', text: 'During a charge the screen piled all the data up at once, with no thought for typography or usability. The numbers people actually came for were hard to find.' },
]

const GOALS = [
  { title: 'Walk the whole path', text: 'Work through every step a driver takes: from pulling up to the station to putting the connector back in its place.' },
  { title: 'Show only what matters', text: 'Make the information during a charge easy to read, and keep on screen only the things a driver needs at that moment.' },
]

const NETWORK: { title: string; text: string; art: Art }[] = [
  { title: 'Across Kazakhstan', art: 'pin', text: 'More than 100 charging stations — one of the largest networks in the country. Businesses can also have a station installed on their own premises.' },
  { title: 'From 10 to 160 kW', art: 'bolt', text: 'Capacities range from simple 10 kW chargers to 160 kW superchargers, with GB-T, CCS2 and CHAdeMO connectors.' },
  { title: 'Started from Vlife', art: 'phone', text: 'A charge is started only from the Vlife app, where the driver follows it in real time and can look back at their charging analytics.' },
]

/** Where things sit on the main screen, as percentages of the screenshot: [left, top, right, bottom]. */
type Box = [number, number, number, number]

/** What each part of the main screen is for. `zones` outlines the part itself — on both panels where it repeats. */
const ANATOMY: { title: string; text: string; zones: Box[] }[] = [
  {
    title: 'Top bar',
    text: 'Time, date, the station number and a one-tap language switch: RU, KZ, EN.',
    zones: [[0.6, 1.2, 99.4, 11]],
  },
  {
    title: 'A label you see from the car',
    text: 'A letter and the connector type. The same letter is on the charger, so drivers see where to pull up.',
    zones: [[2, 13.5, 18.5, 25.5], [51.6, 13.5, 68.2, 25.5]],
  },
  {
    title: 'Status at a glance',
    text: 'A coloured chip: free, charging, charged or out of order.',
    zones: [[34, 13.5, 48.6, 25.5], [83.6, 13.5, 98.2, 25.5]],
  },
  {
    title: 'A QR code to start',
    text: 'Opens the charge in Vlife, or the App Store and Google Play if the app isn’t installed. A hint underneath says what to do.',
    zones: [[5, 31, 45.6, 81], [54.6, 31, 95.2, 81]],
  },
]

const MAIN_SCREEN = {
  src: '/assets/qec-main.webp',
  width: 1968,
  height: 984,
  alt: 'The station screen at rest: a top bar with time, date, station number and language switch; two panels, A GB-T and B CCS 2, each marked Free with a QR code and a hint to scan it or use the Vlife app',
}

/**
 * The old screen, photographed at the stations, next to the redesign of the same moment. The photos are 2:1 like the
 * new screens, so each pair shares one frame height.
 */
type Shot = { src: string; width: number; height: number; alt: string; caption: string }
const BEFORE_AFTER: { before: Shot; after: Shot }[] = [
  {
    before: {
      src: '/assets/qec-before-start.webp', width: 1380, height: 690,
      alt: 'The old start screen on a station: a white screen with a blue header, “Select connector”, two connector icons and a Language button',
      caption: '“Select connector” and two icons. How to actually start is left to the stickers under the screen.',
    },
    after: {
      src: '/assets/qec-main.webp', width: 1968, height: 984,
      alt: 'The new start screen: two panels, A GB-T and B CCS 2, each marked Free with a QR code and a hint to scan it or use Vlife',
      caption: 'Each connector shows its status and a QR code that starts the charge.',
    },
  },
  {
    before: {
      src: '/assets/qec-before-charging.webp', width: 1080, height: 540,
      alt: 'The old charging screen, both connectors charging: output voltage, current, power, energy and charging time for each, two battery icons and two Stop buttons',
      caption: 'Both connectors charging: ten raw readings and two Stop buttons in one block.',
    },
    after: {
      src: '/assets/qec-charging.webp', width: 2308, height: 1152,
      alt: 'The new charging screen: connector A at 82% with 1 h 40 min left and 67 kW power; connector B free with its QR code',
      caption: 'Battery level, time left and power. The rest is one tap away.',
    },
  },
  {
    before: {
      src: '/assets/qec-before-readings.webp', width: 1200, height: 600,
      alt: 'A close-up of the old screen in English: voltage, current, power, energy to four decimal places, and time',
      caption: 'Voltage, current and energy to four decimal places.',
    },
    after: {
      src: '/assets/qec-details.webp', width: 2308, height: 1154,
      alt: 'The new More panel: car and station data as a labelled list',
      caption: 'Car and station data behind More, as a list you can read.',
    },
  },
]

const OUTCOME = [
  { title: 'Tiles instead of a wall of text', text: 'The new interface is built on friendly, modern conventions. Each connector gets its own panel, so the screen can take more connectors when a station has them — though most have two.' },
  { title: 'One step at a time', text: 'Information is spread evenly across the stages of a charge: a driver sees how to start, how it’s going and what it cost, each when it matters.' },
]

/* ---------- building blocks ---------- */

/**
 * The main screen as the homepage project stack, one tile per part of the screen. Each shows the same screenshot with
 * everything but that part dimmed and the part outlined, so the tiles read as a walk through the screen.
 */
function ScreenTour() {
  const listRef = useRef<HTMLUListElement>(null)
  useStickyFit(listRef)
  return (
    <ul className="stack cs-tour" ref={listRef}>
      {ANATOMY.map((a, i) => (
        <li key={a.title} className="stack__item" style={{ '--i': i } as CSSProperties}>
          <article className="stack__panel tile grid">
            <span className="stack__frame cs-tour__frame">
              <span className="cs-tour__screen">
                <img {...MAIN_SCREEN} loading="lazy" />
                <svg className="cs-tour__focus" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true">
                  <mask id={`qec-focus-${i}`}>
                    <rect width="100" height="50" fill="#fff" />
                    {a.zones.map(([l, t, r, b]) => <rect key={l} x={l} y={t / 2} width={r - l} height={(b - t) / 2} rx="0.8" fill="#000" />)}
                  </mask>
                  <rect width="100" height="50" className="cs-tour__dim" mask={`url(#qec-focus-${i})`} />
                  {a.zones.map(([l, t, r, b]) => <rect key={l} x={l} y={t / 2} width={r - l} height={(b - t) / 2} rx="0.8" className="cs-tour__zone" />)}
                </svg>
              </span>
            </span>
            <div className="stack__text">
              <span className="t-label">{i + 1} / {ANATOMY.length}</span>
              <h3 className="t-m">{a.title}</h3>
              <p className="t-body muted">{a.text}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

/* ---------- page ---------- */

export default function ProjectQazaq() {
  useReveal()
  useHashScroll()
  return (
    <div className="v4">
      <TopBar home={HOME} />
      <main>
        <CaseHero
          lines={['Qazaq', 'Energy', 'Charge']}
          image="/assets/project-qazaq-energy.webp"
          position="center 30%"
          label="A Qazaq Energy Charge station with a CCS2 connector being plugged into a car"
        />

        <Chapter title="Overview">
          <p className="cs-lede t-lead" {...reveal()}>Qazaq Energy Charge is one of the largest EV charging networks in Kazakhstan, with 80 and 160 kW chargers. I redesigned the interface on the screen of its charging stations.</p>
          <Facts
            items={[
              { label: 'Role', value: 'Product designer' },
              { label: 'Display', value: '800 × 400 px' },
            ]}
          />
        </Chapter>

        <Chapter title="The network" wide intro="Drivers start a charge in the Vlife app and follow it on the station’s screen.">
          <Cards items={NETWORK} art={ART} />
          <Text>Since charging starts in the app, the station screen has a narrower job: show which connector is free, help the driver start, and let them follow the charge without reaching for their phone.</Text>
        </Chapter>

        <Chapter title="The problem">
          <StackTile items={PROBLEM} />
        </Chapter>

        <Chapter title="Goals">
          <StackTile items={GOALS} />
        </Chapter>

        <Chapter title="The main screen" wide intro="The screen is split in two: one panel for each connector.">
          <ScreenTour />
        </Chapter>

        <Chapter title="A charging session" wide intro="At every step the status changes its colour and its text, and the panel shows only that step’s data.">
          <div className="cs-shots">
            <div className="cs-shots__row">
              <Figure
                className="is-6"
                pad
                src="/assets/qec-charging.webp"
                width={2308}
                height={1152}
                alt="Connector A charging: an orange Charging chip, a progress bar at 82% with 1 h 40 min left, 67 kW power, 5 minutes since the start and a More button"
                caption="Charging: battery level, time left, current power and time since the start"
              />
              <Figure
                className="is-6"
                pad
                delay={80}
                src="/assets/qec-details.webp"
                width={2308}
                height={1154}
                alt="The More panel for a charging connector: car data — battery capacity, current, voltage, power and battery temperature — and station data — maximum current and voltage"
                caption="More opens the car and station data, with a way back"
              />
            </div>
            <div className="cs-shots__row">
              <Figure
                className="is-6"
                pad
                src="/assets/qec-finished.webp"
                width={2308}
                height={1154}
                alt="Connector A charged: a green Charged chip, a full bar at 100%, 67.213 kWh delivered, 1 h 40 min charging time, a cost of 3,543 tenge and a prompt to unplug the connector"
                caption="Done: energy delivered, charging time and cost, then a prompt to return the connector. Once it’s back, the panel resets."
              />
              <Figure
                className="is-6"
                pad
                delay={80}
                src="/assets/qec-error.webp"
                width={1142}
                height={570}
                alt="Connector A in error: a red Error chip and a message that the connection to the car failed, asking to contact support; connector B is still free"
                caption="An error stays on its own panel: the driver sees what happened and who to call, and the other connector keeps working"
              />
            </div>
          </div>
        </Chapter>

        <Chapter title="Before and after" wide intro="The new screen is rolling out across the network; the old one still runs on some stations.">
          <div className="cs-shots">
            {BEFORE_AFTER.map(({ before, after }) => (
              <div key={before.src} className="cs-shots__row">
                <Figure className="is-6 is-photo" pad tag="Before" {...before} />
                <Figure className="is-6" pad tag="After" delay={80} {...after} />
              </div>
            ))}
          </div>
          <Text>Photos of the old screen come from drivers’ reviews on 2GIS and from the original case study.</Text>
        </Chapter>

        <Chapter title="The outcome">
          <StackTile items={OUTCOME} />
          <Figure
            pad
            src="/assets/qec-station.webp"
            width={1596}
            height={1197}
            alt="The front of a Qazaq Energy Charge station with the new interface on its screen, next to the card reader"
            caption="The new interface on the station, now live on part of the network"
          />
        </Chapter>

        <OtherProjects current={TITLE} />
        <Contacts />
      </main>
      {import.meta.env.DEV && <GridOverlay />}
    </div>
  )
}
