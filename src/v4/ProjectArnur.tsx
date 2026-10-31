import { Contacts, GridOverlay, TopBar, useHashScroll, useReveal } from './shared'
import { ArtDef, Cards, CaseHero, Chapter, Facts, Figure, HOME, OtherProjects, StackTile, Text } from './case'
import './v4.css'
import './case.css'

// Case study: Arnur Credit, a microfinance app I worked on as a junior designer. Content from the Behance project
// "Arnur Credit | Mobile Financial App", laid out with the same blocks as the other case studies.

const TITLE = 'Arnur Credit'

/**
 * Outline drawings for the persona tiles, in the style of the other case studies.
 *   sprout — a seedling: the farmer      shop — a storefront with an awning: the shop owner
 *   pram   — a baby pram: the young mum
 */
type Art = 'sprout' | 'shop' | 'pram'
const ART: Record<Art, ArtDef> = {
  sprout: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path d="M12 21V10" />
        <path d="M12 13c0-4-3-6.5-8-6.5 0 4.5 3 6.5 8 6.5z" />
        <path d="M12 10c0-3.5 2.5-6 7-6 0 4-2.5 6-7 6z" />
        <path d="M6 21h12" />
      </>
    ),
  },
  shop: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path d="M3 9.5 4.5 4h15L21 9.5" />
        <path d="M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
        <path d="M4.5 12v8.5h15V12" />
        <path d="M10 20.5v-5h4v5" />
      </>
    ),
  },
  pram: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path d="M5 10h15a7.5 7.5 0 0 1-15 0z" />
        <path d="M12.5 10V2.5a7.5 7.5 0 0 1 7.5 7.5" />
        <path d="M5 10 3.5 6H2" />
        <circle cx="8.5" cy="20.5" r="1.8" />
        <circle cx="16.5" cy="20.5" r="1.8" />
      </>
    ),
  },
}

const PERSONAS: { title: string; text: string; art: Art }[] = [
  { title: 'Ruslan, 45 — farmer', art: 'sprout', text: 'Needs money for seeds and equipment every season. The bank is far away and the procedures are complicated, so he wants a microloan without travelling to an office.' },
  { title: 'Alina, 35 — shop owner', art: 'shop', text: 'Runs a small shop in a village and often needs to restock. Banks ask for piles of documents and take long, so she wants a loan fast, with little paperwork.' },
  { title: 'Nazym, 22 — young mum', art: 'pram', text: 'On maternity leave, she sometimes needs a small sum quickly. She has no time to visit a bank and wants clear terms and a low rate.' },
]

const JOBS = [
  { title: 'Before the sowing season', text: 'When Ruslan urgently needs seeds and fertiliser, he wants a loan of up to 1,000,000 ₸ — to secure the harvest and grow the farm’s income.' },
  { title: 'Before the holidays', text: 'When Alina has to restock before a festive season, she wants a microloan of up to 500,000 ₸ — to widen the range and bring in more customers.' },
  { title: 'When the family needs it', text: 'When Nazym has to buy things for the children or pay for medical care, she wants to borrow up to 200,000 ₸ — so the family budget holds.' },
]

/**
 * The app's main flows. A row holds one wide picture across the page or two 16:10 slides side by side, so the
 * frames in a row line up.
 */
type Shot = { src: string; alt: string; caption: string; width?: number; height?: number }
const FLOWS: Shot[][] = [
  [
    {
      src: '/assets/arnur-onboarding.webp',
      width: 2300,
      height: 1000,
      alt: 'Splash screen and three onboarding screens: the repayment schedule, applying from home, news and offers',
      caption: 'First launch: a splash screen and three onboarding cards — the repayment schedule, applying from home, news and offers.',
    },
  ],
  [
    {
      src: '/assets/arnur-security.webp',
      alt: 'Setting a PIN code, then a prompt to enable sign-in with biometrics',
      caption: 'A PIN code protects the account; Face ID or a fingerprint can replace it.',
    },
    {
      src: '/assets/arnur-registration.webp',
      alt: 'Registration: phone number, SMS code, then a password with its rules ticked off as you type',
      caption: 'Registration by phone number: the number, an SMS code, then a password with its rules checked as you type.',
    },
  ],
  [
    {
      src: '/assets/arnur-verification.webp',
      alt: 'Identity check: full name and IIN, tips for a face check, tips for photographing the ID card',
      caption: 'Personal details, then a face check and a photo of the ID card — each with short tips first.',
    },
    {
      src: '/assets/arnur-loan.webp',
      alt: 'Home screen with the loan balance and this month’s payment, then two steps of a loan application: address, then work and income',
      caption: 'Home shows the loan balance and this month’s payment. An application asks for the address, then for work and income.',
    },
  ],
  [
    {
      src: '/assets/arnur-receipts.webp',
      width: 1840,
      height: 790,
      alt: 'Three payment receipts for 299,750 tenge: paid, error and processing',
      caption: 'Every payment gets a receipt with a clear status: paid, error or still processing.',
    },
  ],
]

/* ---------- page ---------- */

export default function ProjectArnur() {
  useReveal()
  useHashScroll()
  return (
    <div className="v4">
      <TopBar home={HOME} />
      <main>
        <CaseHero
          lines={['Arnur', 'Credit', 'Mobile app']}
          image="/assets/arnur-hero.webp"
          position="55% 50%"
          label="Two phones with the Arnur Credit app: the home screen and the news feed"
        />

        <Chapter title="Overview">
          <p className="cs-lede t-lead">Arnur Credit is one of the largest microfinance organisations in Kazakhstan. It lends to small businesses and farmers in rural areas of the south. The app lets people apply for a loan, follow their repayments and pay without travelling to an office.</p>
          <Facts
            items={[
              { label: 'Role', value: 'Junior product designer' },
              { label: 'Platform', value: 'iOS · Android' },
            ]}
          />
          <Text>I joined this project as a junior designer. The research and the flows on this page are the part of the work I took part in.</Text>
        </Chapter>

        <Chapter title="Who it’s for" wide intro="Three people the team designed for: their goals, what gets in the way, and what would help.">
          <Cards items={PERSONAS} art={ART} />
        </Chapter>

        <Chapter title="Jobs to be done">
          <StackTile items={JOBS} />
        </Chapter>

        <Chapter title="The app" wide intro="From the first launch to a paid instalment, in the order a borrower meets it.">
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

        <OtherProjects current={TITLE} />
        <Contacts />
      </main>
      {import.meta.env.DEV && <GridOverlay />}
    </div>
  )
}
