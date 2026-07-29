import { cn } from '@/lib/cn'

/**
 * Letterspaced caps above a headline. Brief §7.1 (added in §29.4).
 *
 * Manrope, not the display face — §15 reserves display type for headlines
 * themselves. Renders as a <p> by default so it never competes with the
 * heading hierarchy a screen reader announces.
 */
export function EyebrowLabel({
  children,
  className,
  tone = 'ink',
}: {
  children: React.ReactNode
  className?: string
  /** `inverse` for navy surfaces and over media. */
  tone?: 'ink' | 'inverse' | 'accent'
}) {
  return (
    <p
      className={cn(
        'eyebrow',
        tone === 'ink' && 'text-blue',
        // Gold on navy is 10.3:1. Sand on navy is 13.9:1. Both safe.
        tone === 'inverse' && 'text-sand/85',
        tone === 'accent' && 'text-gold',
        className,
      )}
    >
      {children}
    </p>
  )
}
