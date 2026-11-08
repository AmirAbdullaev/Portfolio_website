import { ReactNode } from 'react'

/**
 * The v6 pill button. On hover the label rolls up and an identical copy rolls in from below, and the icon slides
 * out and back in. Two kinds, as on the rest of the site: primary (ink) and secondary (soft fill). It is a link;
 * pass `as="span"` when it sits inside a larger link (a whole card), where only its look is wanted.
 */
export function Button({
  href, children, icon, kind = 'primary', download, external, as = 'a', className = '',
}: {
  href?: string
  children: string
  icon?: ReactNode
  kind?: 'primary' | 'secondary'
  download?: boolean
  /** Another site: opens in a new tab. */
  external?: boolean
  as?: 'a' | 'span'
  className?: string
}) {
  const inner = (
    <>
      <span className="pill-btn__roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon && (
        <span className="pill-btn__icon" aria-hidden="true">
          <span>{icon}</span>
          <span>{icon}</span>
        </span>
      )}
    </>
  )
  const cls = `pill-btn is-${kind} t-small w-500 ${className}`
  return as === 'span'
    ? <span className={cls}>{inner}</span>
    : <a className={cls} href={href} download={download || undefined} {...(external && { target: '_blank', rel: 'noopener' })}>{inner}</a>
}
