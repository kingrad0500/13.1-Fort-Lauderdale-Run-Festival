import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Button hierarchy. Brief §15 (revised, see §29.2).
 *
 * CRITICAL CONTRAST RULE — primary is a coral fill with an ATLANTIC NAVY label.
 *   navy on coral   5.6:1  passes AA at every size
 *   white on coral  2.8:1  FAILS AA, and fails the 3:1 UI threshold too
 * Do not "fix" the primary button by making its label white.
 *
 * Brief §15 also warns: do not use coral for every action. The registration
 * path stays visually dominant precisely because secondary actions do not
 * compete with it.
 *
 * Touch targets are at least 44px tall (§16).
 */

type Variant = 'primary' | 'secondary' | 'inverse' | 'text'
type Size = 'md' | 'lg'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Spread from analyticsAttrs(). */
  [key: `data-${string}`]: string | undefined
}

interface LinkProps extends BaseProps {
  href: string
  /** Brief §14: registration opens same-tab; other externals open new-tab. */
  newTab?: boolean
  type?: never
}

interface ButtonProps extends BaseProps {
  href?: never
  newTab?: never
  type?: 'button' | 'submit'
}

type Props = LinkProps | ButtonProps

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-bold text-center ' +
  'min-h-[44px] transition-[background-color,color,box-shadow,transform] duration-200 ' +
  'ease-[var(--ease-out-soft)] disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  // Coral fill, navy label. The one primary treatment.
  primary:
    'rounded-[var(--radius-pill)] bg-coral text-navy hover:bg-coral-dark ' +
    'shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-raised)]',

  // Navy outline on light surfaces.
  secondary:
    'rounded-[var(--radius-pill)] border-2 border-navy text-navy bg-transparent ' +
    'hover:bg-navy hover:text-sand',

  // For use on navy surfaces, where a navy outline would vanish.
  inverse:
    'rounded-[var(--radius-pill)] border-2 border-sand/70 text-sand bg-transparent ' +
    'hover:bg-sand hover:text-navy',

  // Brief §15 text action: a directional link with a visible arrow.
  text:
    'text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue ' +
    'px-0 min-h-0 py-1',
}

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-[0.9375rem]',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: Props) {
  const classes = cn(
    base,
    variants[variant],
    variant !== 'text' && sizes[size],
    className,
  )

  if ('href' in rest && rest.href) {
    const { href, newTab, ...anchorRest } = rest as LinkProps
    const isExternal = href.startsWith('http')

    // Brief §16: link text must indicate when a new tab opens. The visible
    // label stays clean; screen readers get the full announcement.
    const newTabProps = newTab
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}

    const content = (
      <>
        {children}
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      </>
    )

    if (isExternal) {
      return (
        <a href={href} className={classes} {...newTabProps} {...anchorRest}>
          {content}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} {...newTabProps} {...anchorRest}>
        {content}
      </Link>
    )
  }

  const { type = 'button', ...buttonRest } = rest as ButtonProps
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  )
}

/** Brief §15: text actions carry a visible directional arrow. */
export function TextAction({
  children,
  href,
  className,
  ...rest
}: {
  children: ReactNode
  href: string
  className?: string
  [key: `data-${string}`]: string | undefined
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-1.5 font-sans font-bold text-blue',
        'underline underline-offset-4 decoration-blue/30 hover:decoration-blue',
        'min-h-[44px] py-2',
        className,
      )}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  )
}
