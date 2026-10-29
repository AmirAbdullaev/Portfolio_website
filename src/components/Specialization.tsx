import { motion } from 'framer-motion'
import { ReactNode } from 'react'

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-14 flex flex-col gap-3">
      <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
        <span className="h-px w-8 bg-white/30" />
        {eyebrow}
      </span>
      <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}

function Icon({ inverted = false, children }: { inverted?: boolean; children: ReactNode }) {
  return (
    <div
      className={`mb-6 flex h-11 w-11 items-center justify-center border ${
        inverted ? 'border-ink text-ink' : 'border-white/15 text-white'
      }`}
    >
      {children}
    </div>
  )
}

function Tag({ inverted = false, children }: { inverted?: boolean; children: ReactNode }) {
  return (
    <span
      className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
        inverted ? 'border-ink/20 text-ink/60' : 'border-white/10 text-white/50'
      }`}
    >
      {children}
    </span>
  )
}

const cardMotion = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Specialization() {
  return (
    <section id="specialization" className="border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <SectionHeading
          eyebrow="Specialization"
          title="Depth across the surfaces that make products actually work."
        />

        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <motion.div
            variants={cardMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="group bg-ink p-8 transition-colors hover:bg-surface lg:col-start-1 lg:row-start-1"
          >
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M6.5 8.5h4M6.5 11.5h6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </Icon>
            <h3 className="font-display text-xl font-semibold text-white">B2B SaaS &amp; Complex Systems</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Data-dense dashboards, multi-role permissioning, and scalable design systems that
              stay legible under real operational load.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag>Dashboards</Tag>
              <Tag>Design Systems</Tag>
              <Tag>Workflows</Tag>
            </div>
          </motion.div>

          <motion.div
            variants={cardMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.08 }}
            className="group bg-ink p-8 transition-colors hover:bg-surface lg:col-start-2 lg:row-start-1"
          >
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 18.5h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Icon>
            <h3 className="font-display text-xl font-semibold text-white">Mobile Applications</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              User-centric iOS and Android experiences, designed with platform conventions
              and real-world one-handed usage in mind.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag>iOS</Tag>
              <Tag>Android</Tag>
              <Tag>Prototyping</Tag>
            </div>
          </motion.div>

          <motion.div
            variants={cardMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.16 }}
            className="group relative bg-white p-8 text-ink lg:col-start-3 lg:row-start-1 lg:row-span-2"
          >
            <span className="mb-6 inline-block border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60">
              Unique Expertise
            </span>
            <Icon inverted>
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </Icon>
            <h3 className="font-display text-xl font-semibold text-ink">
              Specialized &amp; Industrial Interfaces
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              Design for Electric Vehicle (EV) charging stations and warehouse mobile terminals
              (TSD devices) — interfaces engineered for gloves, glare, and zero training time.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag inverted>EV Charging</Tag>
              <Tag inverted>Warehouse TSD</Tag>
              <Tag inverted>Hardware UI</Tag>
              <Tag inverted>Industrial</Tag>
            </div>
          </motion.div>

          <motion.div
            variants={cardMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.24 }}
            className="group bg-ink p-8 transition-colors hover:bg-surface lg:col-start-1 lg:col-span-2 lg:row-start-2"
          >
            <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
              <Icon>
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </Icon>
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  UX Research &amp; Usability Testing
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                  Data-driven decisions built on user interviews, hallway testing, and iterative
                  validation — closing the loop between assumption and evidence.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Tag>User Interviews</Tag>
                  <Tag>Hallway Testing</Tag>
                  <Tag>A/B Testing</Tag>
                  <Tag>Analytics</Tag>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
