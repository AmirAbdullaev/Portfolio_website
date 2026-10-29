import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, MailIcon, LinkedinIcon, TelegramIcon } from './icons'
import { EMAIL, TELEGRAM_URL, LINKEDIN_URL } from '../constants'

const CONTACTS = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, icon: MailIcon },
  { label: 'LinkedIn', value: 'in/amirabdullaev', href: LINKEDIN_URL, icon: LinkedinIcon },
  { label: 'Telegram', value: '@amirabdullaev', href: TELEGRAM_URL, icon: TelegramIcon },
]

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone,
        }).format(new Date()),
      )
    format()
    const id = setInterval(format, 30_000)
    return () => clearInterval(id)
  }, [timeZone])

  return time
}

export default function Footer() {
  const time = useLocalTime('Europe/Berlin')

  return (
    <footer id="contact" className="border-t border-line/60 py-24 md:py-32">
      <div className="mx-auto max-w-site px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance font-display text-[11vw] font-bold leading-[0.95] tracking-tightest text-white sm:text-6xl lg:text-7xl"
        >
          LET&rsquo;S BUILD
          <br />
          SOMETHING TOGETHER.
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
          {CONTACTS.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col justify-between gap-8 bg-ink p-6 transition-colors hover:bg-surface"
            >
              <div className="flex items-center justify-between">
                <contact.icon className="h-5 w-5 text-white/60 transition-colors group-hover:text-white" />
                <ArrowUpRight className="h-4 w-4 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  {contact.label}
                </p>
                <p className="mt-1 truncate text-sm font-medium text-white">{contact.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Amir Abdullaev. All rights reserved.</p>
          <div className="flex items-center gap-2 font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span>{time || '--:--'} local time</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
