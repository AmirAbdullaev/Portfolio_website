import { CaseHero, Chapter, Figure, StackTile, Text, CasePage } from './case'
import './case.css'

// Case study: Arnur Credit, a microfinance app I worked on as a junior designer. Content from the Behance project
// "Arnur Credit | Mobile Financial App", laid out with the same blocks as the other case studies.

const JOBS = [
  { title: 'Before the sowing season', text: 'When a farmer urgently needs seeds and fertiliser, he wants a loan of up to 1,000,000 ₸ — to secure the harvest and grow the farm’s income.' },
  { title: 'Before the holidays', text: 'When a village shop owner has to restock before a festive season, she wants a microloan of up to 500,000 ₸ — to widen the range and bring in more customers.' },
  { title: 'When the family needs it', text: 'When a young mum on maternity leave has to buy things for the children or pay for medical care, she wants to borrow up to 200,000 ₸ — so the family budget holds.' },
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
  return (
    <CasePage>
      <CaseHero
        lines={['Arnur', 'Credit', 'Mobile app']}
        image="/assets/arnur-hero.webp"
        position="55% 50%"
        label="Two phones with the Arnur Credit app: the home screen and the news feed"
        devices={['Mobile']}
        facts={[
          { label: 'Role', value: 'Junior product designer' },
          { label: 'Platform', value: 'iOS · Android' },
        ]}
      >
        <p className="cs-lede t-lead">Arnur Credit is one of the largest microfinance organisations in Kazakhstan. It lends to small businesses and farmers in rural areas of the south. The app lets people apply for a loan, follow their repayments and pay without travelling to an office.</p>
        <Text>I joined this project as a junior designer. The research and the flows on this page are the part of the work I took part in.</Text>
      </CaseHero>

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
    </CasePage>
  )
}
