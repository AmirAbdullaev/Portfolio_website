import { Fragment, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuIcon, CloseIcon, LinkedinIcon, TelegramIcon } from './icons'
import { TELEGRAM_URL, LINKEDIN_URL } from '../constants'

const NAV_LINKS = [
  { label: 'Projects', href: '#work' },
  { label: 'Specialization', href: '#specialization' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Fragment>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-line/80 bg-ink/70 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
        }`}
      >
      <div className="mx-auto flex max-w-site items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-base font-semibold tracking-tight text-white">
            Amir Abdullaev
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Product Designer
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <motion.a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
          >
            <TelegramIcon className="h-4 w-4" />
          </motion.a>
          <motion.a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
          >
            <LinkedinIcon className="h-4 w-4" />
          </motion.a>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-white md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-ink px-6 py-4 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-semibold text-white">Amir Abdullaev</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-white">
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-3xl font-medium text-white"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex gap-3">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 border border-white px-5 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white"
              >
                <TelegramIcon className="h-4 w-4" />
                Telegram
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 border border-white/30 px-5 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  )
}
