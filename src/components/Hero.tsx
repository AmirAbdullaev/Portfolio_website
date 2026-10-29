import { motion } from 'framer-motion'
import { LinkedinIcon, TelegramIcon } from './icons'
import { TELEGRAM_URL, LINKEDIN_URL } from '../constants'
import portraitImg from '../assets/portrait-cutout.png'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line/60 bg-ink">
      <div className="mx-auto grid max-w-site grid-cols-1 lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-6 pb-14 pt-32 md:px-10 lg:pl-16 lg:pr-10 lg:pt-40 lg:pb-24 xl:pl-24">
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/50"
          >
            Hello, I&rsquo;m Amir <span className="h-px w-8 bg-white/30" />
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-balance font-display text-[13vw] font-bold leading-[0.96] tracking-tightest text-white sm:text-6xl lg:text-[3.6rem] xl:text-[4.2rem]"
          >
            CRAFTING SCALABLE
            <br />
            B2B SAAS{' '}
            <span className="text-white/35">&amp;</span>
            <br />
            MOBILE EXPERIENCES.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-7 max-w-md text-balance text-base leading-relaxed text-white/55"
          >
            Product Designer with 4+ years of experience bridging complex systems, UX research,
            usability testing, and specialized hardware interfaces into intuitive digital products.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2.5 border border-white px-7 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-ink"
            >
              <TelegramIcon className="h-4 w-4" />
              Telegram
            </motion.a>

            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2.5 border border-white/30 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex h-[58vh] items-end justify-center sm:h-[68vh] lg:h-auto lg:min-h-[720px] lg:items-end lg:justify-center"
        >
          <img
            src={portraitImg}
            alt="Amir Abdullaev"
            className="h-full max-h-[560px] w-auto object-contain object-bottom sm:max-h-[680px] lg:h-full lg:max-h-none"
            style={{ maskImage: 'linear-gradient(to bottom, black 94%, transparent 100%)' }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-site items-center justify-end border-t border-line/60 px-6 py-6 md:px-10 lg:px-16 xl:px-24">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
          04 &mdash; Selected Projects
        </span>
      </div>
    </section>
  )
}
