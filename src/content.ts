// Site content: projects, concepts, experience and life outside work.

export type Project = {
  title: string
  tags: string
  image: string
  /** Focal point of `image` in a card's 16:10 frame (CSS object-position), when the centre crops it badly. */
  position?: string
  /** One line for the All projects page. */
  summary: string
  /** A short name for tight spaces, such as the left column. */
  short?: string
  /** What it was made for, shown under its name in the left column. */
  devices?: string[]
  /** Case-study page, for projects that have one. */
  href?: string
}
/** A concept case published on Behance: shown on the All projects page and linked out. */
export type Concept = { title: string; tags: string; year: string; image: string; summary: string; href: string }
/** `points` is what I did there (from the CV), `cases` the keys of the case studies that came out of it. */
export type Job = { company: string; dates: string; role: string; summary: string; points?: string[]; cases?: string[] }
/** `zoom` enlarges the photo inside its frame (e.g. to crop out an edge). */
export type Photo = { image: string; position: string; alt: string; zoom?: number }

export const PORTRAIT = '/assets/amir-portrait-v2.webp'

/** Product work with a case study, in order; MORE_PROJECTS continues the list. */
export const PROJECTS: Project[] = [
  {
    title: 'Warehouse Management System',
    short: 'Warehouse Management System',
    tags: 'Portable Data Terminal · Desktop',
    image: '/assets/project-wms-3.webp',
    position: 'center top',   // the whole terminal, top of its screen included
    href: '/?project=wms',
    devices: ['Handheld terminal', 'Desktop'],
    summary: 'Handheld terminals and a desktop system that took a car plant’s warehouse off paper.',
  },
  {
    title: 'Vlife — Customer Loyalty Program',
    short: 'Vlife Loyalty Program',
    tags: 'Mobile',
    image: '/assets/project-vlife.webp',
    href: '/?project=vlife',
    devices: ['iOS', 'Android'],
    summary: 'A loyalty super app, redesigned around points, fuel and everyday payments.',
  },
  {
    title: 'Qazaq Energy Charge',
    short: 'Qazaq Energy Charge',
    tags: 'EV charging station screen',
    image: '/assets/project-qazaq-energy.webp',
    position: 'center top',   // the station's top
    href: '/?project=qazaq',
    devices: ['EV charging station'],
    summary: 'The screen on EV charging stations across Kazakhstan, redesigned around the driver’s path.',
  },
]

/** More product work. A project without a case study here can link to its Behance page instead (an absolute `href`). */
export const MORE_PROJECTS: Project[] = [
  {
    title: 'Q-sight',
    short: 'Q-sight',
    tags: 'Mobile · Desktop',
    image: '/assets/project-qsight.webp',
    position: 'center top',   // keeps the headline at the top of the cover
    href: '/?project=qsight',
    devices: ['iOS', 'Android', 'Desktop'],
    summary: 'A B2B tool by Qmobile for checking standards at filling stations and shops: shifts, photo reports and checklists.',
  },
  {
    title: 'Arnur Credit',
    short: 'Arnur Credit',
    tags: 'Mobile · Fintech',
    image: '/assets/project-arnur.webp',
    position: 'center top',   // keeps the headline at the top of the cover
    href: '/?project=arnur',
    devices: ['iOS', 'Android'],
    summary: 'A loan app for small businesses and farmers in rural Southern Kazakhstan. I worked on it as a junior designer.',
  },
]

/** Concept cases from Behance, newest first. Covers are the project covers on Behance. */
export const CONCEPTS: Concept[] = [
  {
    title: 'Kids Cubicle',
    tags: 'Mobile app',
    year: '2023',
    image: '/assets/concept-kids.webp',
    summary: 'A child-tracking app for parents.',
    href: 'https://www.behance.net/gallery/181212907/Kids-Cublice-Child-tracking-Mobile-App',
  },
  {
    title: 'GymUp',
    tags: 'Mobile app · iOS',
    year: '2023',
    image: '/assets/concept-gymup.webp',
    summary: 'A workout tracker for logging training and seeing the results.',
    href: 'https://www.behance.net/gallery/163955203/GymUp-Workout-tracking-Mobile-App',
  },
  {
    title: 'Prosport',
    tags: 'Website · Redesign',
    year: '2023',
    image: '/assets/concept-prosport.webp',
    summary: 'A redesign of an online sports and health store.',
    href: 'https://www.behance.net/gallery/163611675/Redesign-Prosport-shop',
  },
]

export const EXPERIENCE: Job[] = [
  {
    company: 'MyCar Group',
    dates: '04/2025 – Present',
    role: 'Product Designer',
    summary: 'A digital ecosystem for car owners: a marketplace, dealerships, and financial services',
    points: [
      'Sole designer of the Hyundai Trans Kazakhstan plant digitisation: manual operations replaced with one system for desktop and industrial handheld terminals (100+ terminal and 40+ desktop screens), with a keypad-first, glove-friendly interface shaped by on-site research.',
      'Own the Trade-in product across the dealership network as its sole designer: a large SaaS that covers the whole physical process — vehicle diagnostics and appraisal, legal and forensic checks, documents and agreements, the 1C integration and dashboards. Research, new modules and improvements every day — for example, a KPI module for employees, designed from scratch, where each of them follows their own performance.',
      'Designed a used-car auction module from scratch — kanban board, analytics dashboards, role-based access — and keep improving the company’s logistics platform.',
    ],
    cases: ['wms'],
  },
  {
    company: 'Vlife',
    dates: '05/2023 – 01/2025',
    role: 'Product Designer',
    summary: 'A mobile super app combining a loyalty program and a payment service',
    points: [
      'Designed Q-sight, a B2B inspection platform for networks of filling stations and shops: a large desktop part and a mobile app for shifts, checklists, photo reports and compliance analytics.',
      'Worked on a strategic redesign of the Vlife app: its flows brought in line with new business goals, its interface made consistent on a new design system.',
      'Redesigned the interface on the screen of Qazaq Energy Charge EV charging stations.',
      'Ran UX research end to end: in-depth interviews, surveys and moderated usability tests on high-fidelity prototypes.',
    ],
    cases: ['qsight', 'vlife', 'qazaq'],
  },
  {
    company: 'Align',
    dates: '08/2021 – 02/2022',
    role: 'Product Design Intern',
    summary: 'Information security systems, including Saturn, a\u00A0GRC SaaS platform for risk and incident management',
    points: [
      'Designed Saturn, a GRC SaaS platform, from scratch: it automates risk and incident management for information security teams.',
    ],
  },
]

export const ABOUT = {
  title: 'Outside of work',
  text: 'I go to the gym, love long walks and time in the mountains, and I’m into psychology and new tech.',
  petsText: 'I also love cats, dogs, and anyone else I can scratch behind the ears :)',
  photos: {
    autumn: { image: '/assets/about-autumn.webp', position: '50% 55%', alt: 'Smiling on a bridge among yellow autumn trees' },
    river: { image: '/assets/about-river.webp', position: '60% 100%', zoom: 1.2, alt: 'Standing in a cold mountain river' },
    horses: { image: '/assets/about-horses.webp', position: 'center 60%', alt: 'Horses grazing in the mountains at sunset' },
    cat: { image: '/assets/about-cat.webp', position: 'center 45%', alt: 'Holding a black cat' },
  } satisfies Record<string, Photo>,
}
