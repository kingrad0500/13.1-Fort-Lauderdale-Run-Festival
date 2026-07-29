import { Children } from 'react'
import { cn } from '@/lib/cn'

/**
 * Offset card grid. Brief §7.4 (revised, §29.6).
 *
 * Alternating vertical offset on desktop, plain vertical stack on mobile —
 * §16 requires race cards stack vertically on small screens, and an offset
 * would only produce ragged whitespace there.
 *
 * The offset is decorative. It must never change reading or tab order, so it
 * is applied with translate on even children rather than by reordering.
 */
export function StaggeredGrid({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const items = Children.toArray(children)

  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8',
        className,
      )}
    >
      {items.map((child, i) => (
        <li
          key={i}
          className={cn(
            'flex',
            // Offset every second card, desktop only.
            i % 2 === 1 && 'sm:translate-y-10 lg:translate-y-14',
          )}
        >
          {child}
        </li>
      ))}
    </ul>
  )
}
