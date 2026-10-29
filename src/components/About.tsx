import { motion } from 'framer-motion'

const TIMELINE = [
  {
    period: '2024 — Present',
    role: 'Senior Product Designer',
    org: 'B2B SaaS Platform',
    description:
      'Own end-to-end design for a data-dense operations platform, leading design system strategy and mentoring two junior designers.',
  },
  {
    period: '2023 — 2024',
    role: 'Product Designer',
    org: 'EV Infrastructure Startup',
    description:
      'Designed the mobile app and on-site terminal UI for a national EV charging network, running field research at live stations.',
  },
  {
    period: '2022 — 2023',
    role: 'Product Designer',
    org: 'Logistics Technology Co.',
    description:
      'Rebuilt the handheld terminal experience for warehouse operators, translating usability findings into a hardware-constrained UI kit.',
  },
  {
    period: '2021 — 2022',
    role: 'UI/UX Designer',
    org: 'Digital Product Studio',
    description:
      'Shipped mobile and web products across fintech and consumer clients, establishing research and testing practices from scratch.',
  },
]

export default function About() {
  return (
    <section id="about" className="border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
              <span className="h-px w-8 bg-white/30" />
              About
            </span>
            <h2 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Four years of turning complexity into clarity.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
              I&rsquo;m a product designer who gravitates toward the hard problems most designers
              avoid — dense B2B dashboards, industrial hardware, and systems where a bad decision
              costs someone real time on a warehouse floor or a charging bay. My process is
              research-first: I&rsquo;d rather run five hallway tests than debate an opinion in a
              meeting. Outside of client work, I obsess over design systems that scale without
              losing their edges.
            </p>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line" />
            <div className="flex flex-col gap-12">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-8"
                >
                  <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-ink" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                    {item.period}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    {item.role} <span className="text-white/40">— {item.org}</span>
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
