// Small pieces every v6 page uses: the scroll reveal, the image frame, copying to the clipboard, tag splitting and
// the sticky-stack fit.
import { CSSProperties, RefObject, useEffect } from 'react'

/** Props that make an element fade in when it first scrolls into view, `delay` ms after its neighbours. */
export const reveal = (delay = 0) => ({ 'data-reveal': '', style: { '--d': `${delay}ms` } as CSSProperties })

/**
 * Fades `[data-reveal]` elements in the first time they enter the viewport. Pages swapped in later (and cards a
 * filter brings in) are picked up too. Marks them with a `data-in` attribute rather than a class: React rewrites
 * `className` on re-render, which would wipe a class added here.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.querySelector('.v6')
    if (!root) return
    const show = (el: Element) => el.setAttribute('data-in', '')
    if (!('IntersectionObserver' in window)) {
      const all = () => root.querySelectorAll('[data-reveal]').forEach(show)
      all()
      const mo = new MutationObserver(all)
      mo.observe(root, { childList: true, subtree: true })
      return () => mo.disconnect()
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target)
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )
    const watch = () => root.querySelectorAll('[data-reveal]:not([data-in])').forEach((el) => io.observe(el))
    watch()
    const mo = new MutationObserver(watch)
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

/**
 * An image filling its frame (cover). A real <img>, so the browser loads it lazily, only when it is about to be
 * seen; `eager` is for pictures at the top of a page. `position` is the focal point (CSS object-position); `zoom`
 * enlarges the picture around it. Without `image` the frame shows a hatched placeholder, so layouts hold until the
 * file is added.
 */
export function Media({ image, position, zoom, className = '', label, eager }: {
  image?: string; position?: string; zoom?: number; className?: string; label?: string; eager?: boolean
}) {
  return (
    <div className={`media ${className}`}>
      {image && (
        <img
          src={image}
          alt={label ?? ''}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectPosition: position, ...(zoom && { transform: `scale(${zoom})`, transformOrigin: position }) }}
        />
      )}
    </div>
  )
}

export function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  const ta = document.createElement('textarea')
  ta.value = text
  document.body.appendChild(ta)
  ta.select()
  try {
    document.execCommand('copy')
  } finally {
    document.body.removeChild(ta)
  }
  return Promise.resolve()
}

/** "04/2025 – Present" → "04/2025 – now", for the experience lists. */
export const shortDates = (dates: string) => dates.replace(/\s*Present\s*$/, ' now')

/** Tags written as "Mobile · Desktop" become a list. */
export const splitTags = (tags: string) => tags.split(' · ')

/**
 * Caps each stacking panel's sticky offset so a panel taller than the viewport sticks by its bottom edge
 * instead of its top — otherwise its lower part would never scroll into view before the next panel covers it.
 */
export function useStickyFit(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const list = ref.current
    if (!list) return
    const items = Array.from(list.children) as HTMLElement[]
    const fit = () => items.forEach((li) => li.style.setProperty('--stick-max', `${window.innerHeight - li.offsetHeight - 16}px`))
    fit()
    const ro = new ResizeObserver(fit)
    items.forEach((li) => ro.observe(li))
    window.addEventListener('resize', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [ref])
}
