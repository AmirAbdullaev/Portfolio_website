import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from '@phosphor-icons/react'

/**
 * Pictures on a page open large when clicked. A composed plate — a device with its labels and arrows, a monitor, a
 * framed screenshot — opens whole, exactly as it is drawn on the page: a copy of it is laid out by the site's own
 * CSS, at its own size, inside a stand-in of its page context, then scaled up to fit the window (text stays sharp).
 * A plain photo (a single image in a frame) opens as the full, uncropped picture. Anything inside a link (cards,
 * the next-project plaque) keeps going where it leads; plates with a video are left alone. A click anywhere, the
 * close button or Escape closes it. The page's scrollbar never changes while it is open, so nothing jumps.
 */

/** Plates that open whole, nearest first. */
const PLATES = '.stack__frame, .cs-monitor__plate, .cs-fig__frame, .cs-photo'
/** A frame around a single photo: opens as the picture itself. */
const PHOTO = '.media'

type Shot = { kind: 'image'; src: string; alt: string } | { kind: 'plate'; node: HTMLElement; width: number; height: number; label: string }

/**
 * A copy of `plate` that renders the same outside the page. Its ancestors (up to the page column) are recreated as
 * boxless wrappers with the same tags and classes, so every rule that depends on where it sits still applies; the
 * page column's container (`page`, for the cqi sizes) is recreated at its real width; the copy keeps the plate's
 * exact width and height, so nothing re-wraps.
 */
function inContext(plate: HTMLElement): HTMLElement {
  const main = plate.closest<HTMLElement>('.app__main')!
  const chain: HTMLElement[] = []
  for (let el = plate.parentElement; el && el !== main; el = el.parentElement) chain.unshift(el)
  const p = plate.getBoundingClientRect()
  const m = main.getBoundingClientRect()

  const stage = document.createElement('div')
  stage.className = 'lightbox__context'
  Object.assign(stage.style, { position: 'absolute', top: '0', left: `${m.left - p.left}px`, width: `${m.width}px`, height: `${p.height}px`, padding: '0', margin: '0', containerType: 'inline-size', containerName: 'page' })

  let parent: HTMLElement = stage
  for (const a of chain) {
    const w = document.createElement(a.tagName)
    w.className = a.className
    w.style.display = 'contents'
    parent.appendChild(w)
    parent = w
  }
  const copy = plate.cloneNode(true) as HTMLElement
  copy.removeAttribute('id')
  copy.querySelectorAll('img').forEach((img) => { img.loading = 'eager' })
  // A plate laid out as a grid or flex item on the page (a span, blockified there) keeps that display out of it.
  copy.style.display = getComputedStyle(plate).display
  Object.assign(copy.style, { boxSizing: 'border-box', width: `${p.width}px`, height: `${p.height}px`, maxWidth: 'none', maxHeight: 'none', margin: `0 0 0 ${p.left - m.left}px`, position: 'relative', inset: 'auto', transform: 'none' })
  parent.appendChild(copy)
  return stage
}

export function Lightbox() {
  const [shot, setShot] = useState<Shot | null>(null)
  const [on, setOn] = useState(false)
  const [scale, setScale] = useState(1)
  const closeRef = useRef<HTMLButtonElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest?.('.app__main') || target.closest('a') || target.closest('.lightbox')) return
      const plate = target.closest<HTMLElement>(PLATES)
      if (plate) {
        if (plate.querySelector('video')) return
        const rect = plate.getBoundingClientRect()
        e.preventDefault()
        opener.current = document.activeElement as HTMLElement | null
        const label = plate.closest('figure')?.querySelector('figcaption')?.textContent ?? plate.querySelector('img')?.alt ?? 'Picture'
        setShot({ kind: 'plate', node: inContext(plate), width: rect.width, height: rect.height, label })
        return
      }
      const img = target.closest(PHOTO)?.querySelector('img') ?? (target instanceof HTMLImageElement ? target : null)
      if (!img) return
      e.preventDefault()
      opener.current = document.activeElement as HTMLElement | null
      setShot({ kind: 'image', src: img.currentSrc || img.src, alt: img.alt })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const close = useCallback(() => {
    setOn(false)
    window.setTimeout(() => setShot(null), 300)   // after the fade (.lightbox transition)
    opener.current?.focus?.()
  }, [])

  // A plate is scaled to fill most of the window, keeping its proportions.
  const fit = useCallback(() => {
    if (shot?.kind !== 'plate') return
    const pad = Math.min(56, window.innerWidth * 0.04) * 2
    setScale(Math.min((window.innerWidth - pad) / shot.width, (window.innerHeight - pad) / shot.height))
  }, [shot])

  useEffect(() => {
    if (!shot) return
    if (shot.kind === 'plate' && stageRef.current) {
      stageRef.current.replaceChildren(shot.node)
      fit()
    }
    // The page doesn't scroll underneath, but its scrollbar is left alone (hiding it shifted the page sideways):
    // wheel, touch and scrolling keys are simply ignored while the picture is open.
    const stop = (e: Event) => e.preventDefault()
    const SCROLL_KEYS = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown'])
    requestAnimationFrame(() => setOn(true))
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (SCROLL_KEYS.has(e.key)) e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', stop, { passive: false })
    window.addEventListener('touchmove', stop, { passive: false })
    window.addEventListener('resize', fit)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchmove', stop)
      window.removeEventListener('resize', fit)
    }
  }, [shot, close, fit])

  if (!shot) return null
  return (
    <div className={`lightbox${on ? ' is-on' : ''}`} role="dialog" aria-modal="true" aria-label={shot.kind === 'image' ? shot.alt || 'Picture' : shot.label} onClick={close}>
      {shot.kind === 'image' ? (
        <img className="lightbox__picture" src={shot.src} alt={shot.alt} />
      ) : (
        <div className="lightbox__plate" style={{ width: shot.width, height: shot.height, ['--fit' as string]: scale }}>
          <div ref={stageRef} className="lightbox__stage" aria-hidden="true" />
        </div>
      )}
      <button ref={closeRef} type="button" className="lightbox__close" aria-label="Close" onClick={close}>
        <X size={20} />
      </button>
    </div>
  )
}
