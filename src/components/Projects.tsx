import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCover from './ProjectCover'
import { ArrowUpRight } from './icons'

type Category = 'B2B SaaS' | 'Mobile' | 'Hardware'

type Project = {
  title: string
  description: string
  tags: string[]
  metric: string
  variant: 'dashboard' | 'charging' | 'warehouse' | 'mobile'
  category: Category
}

const PROJECTS: Project[] = [
  {
    title: 'Fleet Ops — B2B SaaS Dashboard',
    description:
      'A full redesign of a data-dense operations dashboard used by fleet managers to monitor, schedule, and resolve incidents across thousands of vehicles in real time.',
    tags: ['B2B SaaS', 'Design System', 'Data Viz'],
    metric: 'Cut task completion time by 38% for 12,000+ daily active operators',
    variant: 'dashboard',
    category: 'B2B SaaS',
  },
  {
    title: 'Volt — EV Charging Network',
    description:
      'End-to-end experience spanning the mobile app and the physical charging terminal — designed to work reliably in sunlight, gloves, and low connectivity.',
    tags: ['Hardware UI', 'Mobile', 'Field Research'],
    metric: 'Reduced failed charge sessions by 27% across the terminal fleet',
    variant: 'charging',
    category: 'Hardware',
  },
  {
    title: 'Warehouse TSD Terminal System',
    description:
      'Redesigned the core scanning and picking workflow for handheld terminal devices (TSD) used on the warehouse floor, prioritizing speed and one-thumb operation.',
    tags: ['Hardware UI', 'Industrial', 'Design System'],
    metric: 'Reduced picker errors by 42% on legacy handheld scanners',
    variant: 'warehouse',
    category: 'Hardware',
  },
  {
    title: 'Orbit — Mobile Banking App',
    description:
      'A ground-up onboarding and account management flow for a consumer fintech app, validated through six rounds of moderated usability testing.',
    tags: ['Mobile', 'Fintech', 'Usability Testing'],
    metric: 'Improved onboarding completion from 61% to 89%',
    variant: 'mobile',
    category: 'Mobile',
  },
]

const FILTERS: Array<Category | 'All'> = ['All', 'B2B SaaS', 'Mobile', 'Hardware']

export default function Projects() {
  const [filter, setFilter] = useState<Category | 'All'>('All')
  const visible = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  return (
    <section id="work" className="border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
              <span className="h-px w-8 bg-white/30" />
              Selected Work
            </span>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Case studies from systems that don&rsquo;t forgive bad design.
            </h2>
          </div>

          <div className="flex flex-wrap gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  filter === f
                    ? 'border-white bg-white text-ink'
                    : 'border-white/15 text-white/50 hover:border-white/40 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {visible.map((project) => (
            <motion.a
              key={project.title}
              href="#contact"
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden border border-line bg-surface/50 transition-colors duration-300 hover:border-white/30"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
                  <ProjectCover variant={project.variant} />
                </div>
                <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/15 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-white">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-7">
                <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 border-t border-line pt-4">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                  <p className="font-mono text-xs text-white/60">{project.metric}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
