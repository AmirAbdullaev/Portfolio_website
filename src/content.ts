// Site content shared by every layout version.

export type Project = {
  title: string
  tags: string
  image: string
  /** One or more paragraphs about what was done. */
  description: string[]
  /** Case-study page, for projects that have one. */
  href?: string
}
/** `details` is only kept for jobs that have no project of their own on the site. */
export type Job = { company: string; dates: string; role: string; summary: string; details?: string }
/** `zoom` enlarges the photo inside its frame (e.g. to crop out an edge). */
export type Photo = { image: string; position: string; alt: string; zoom?: number }

export const LATEST_PROJECT = {
  label: 'Latest project',
  title: 'Hyundai Trans Kazakhstan',
  image: '/assets/hyundai-plant.webp',
}

export const PORTRAIT = '/assets/amir-portrait-v2.webp'

export const PROJECTS: Project[] = [
  {
    title: 'Warehouse Management System',
    tags: 'Portable Data Terminal · Desktop',
    image: '/assets/project-wms-3.webp',
    href: '/?project=wms',
    description: [
      'Part of the digital transformation of the Hyundai Trans Kazakhstan car plant. Paper forms and spreadsheets are being replaced with one connected platform that covers the whole path of a car part, from the moment it arrives at the warehouse to the quality check of a finished vehicle.',
      'It has three large modules: WMS for the warehouse, where staff receive and move parts using handheld terminals with a barcode scanner; MES for the production line; and QMS for quality control.',
    ],
  },
  {
    title: 'Trade-in Manager Workspace',
    tags: 'Desktop · Tablet',
    image: '/assets/project-tradein.webp',
    description: [
      'A web SaaS workspace for MyCar dealership managers who buy used cars from customers. I designed its modules from scratch: vehicle inspection with forensic analysis, electronic document management, and an auction module with a kanban board, analytics dashboards, and role-based access.',
      'Along the way I streamlined manager onboarding, restructured the existing design system, and optimized the Trade-in module end to end.',
    ],
  },
  {
    title: 'Vlife — Customer Loyalty Program',
    tags: 'Mobile',
    image: '/assets/project-vlife.webp',
    href: '/?project=vlife',
    description: [
      'A mobile super app that combines a loyalty program with a payment service. I contributed to a strategic redesign that aligned user flows with new business goals.',
      'I ran end-to-end UX research: interviews, surveys, and moderated usability testing with high-fidelity prototypes. I also designed a cross-platform monitoring system for remote facility inspections and real-time analytics.',
    ],
  },
  {
    title: 'Qazaq Energy Charge',
    tags: 'EV charging station screen',
    image: '/assets/project-qazaq-energy.webp',
    href: '/?project=qazaq',
    description: [
      'The interface on the screen of Qazaq Energy Charge stations, one of the largest EV charging networks in Kazakhstan. The old screen was overloaded and hard to read, so I redesigned it around the path a driver takes, from pulling up to returning the connector.',
      'Each connector gets its own panel with its label, status and a QR code that starts the charge in the Vlife app. During a charge the panel shows only what matters: battery level, time left and power, and at the end the energy delivered and the cost.',
    ],
  },
]

export const EXPERIENCE: Job[] = [
  {
    company: 'MyCar Group',
    dates: '04/2025 – Present',
    role: 'Product Designer',
    summary: 'A digital ecosystem for car owners: a marketplace, dealerships, and financial services',
  },
  {
    company: 'Vlife',
    dates: '05/2023 – 01/2025',
    role: 'Product Designer',
    summary: 'A mobile super app combining a loyalty program and a payment service',
  },
  {
    company: 'Align',
    dates: '08/2021 – 02/2022',
    role: 'Product Design Intern',
    summary: 'Information security systems, including Saturn, a\u00A0GRC SaaS platform for risk and incident management',
  },
]

export const QUOTE = { text: 'People ignore design that ignores people', author: 'Frank Chimero' }

export const ABOUT = {
  title: 'Outside of work',
  text: 'I go to the gym, love long walks and time in the mountains, and I’m into psychology and new tech.',
  petsText: 'I also love cats, dogs, and anyone else I can scratch behind the ears :)',
  photos: {
    autumn: { image: '/assets/about-autumn.webp', position: '50% 55%', alt: 'Smiling on a bridge among yellow autumn trees' },
    river: { image: '/assets/about-river.webp', position: '60% 100%', zoom: 1.2, alt: 'Standing in a cold mountain river' },
    horses: { image: '/assets/about-horses.jpg', position: 'center 60%', alt: 'Horses grazing in the mountains at sunset' },
    pool: { image: '/assets/about-pool.webp', position: 'center 45%', alt: 'Laughing at the edge of a swimming pool' },
    cat: { image: '/assets/about-cat.webp', position: 'center 45%', alt: 'Holding a black cat' },
  } satisfies Record<string, Photo>,
}
