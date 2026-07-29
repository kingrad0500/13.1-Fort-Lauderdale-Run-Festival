import { distances } from '@/content/race'
import { cn } from '@/lib/cn'

/**
 * The credential chip row beneath the hero. Brief §7.2 (revised, §29.5).
 *
 * This IS the essential event strip. Its content and its constraints are
 * unchanged from the approved brief:
 *   "Do not use an automatic slider for critical schedule information."
 * It is a static list. It does not move, rotate, or auto-advance.
 *
 * Times and distances are set in Barlow Condensed (§4) because scanning them
 * quickly is the entire job.
 */
export function EventChipRow({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        'flex flex-wrap items-center justify-center gap-2 sm:gap-3',
        className,
      )}
    >
      {distances.map((distance) => (
        <li key={distance.slug}>
          <span
            className={cn(
              'inline-flex items-center gap-2.5 rounded-[var(--radius-pill)]',
              'border border-navy/12 bg-surface-raised px-4 py-2.5 sm:px-5',
              'shadow-[var(--shadow-card)]',
            )}
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
            <span className="font-sans text-sm font-bold text-navy">
              {distance.shortName}
            </span>
            <span className="font-numeric text-sm text-blue">
              {distance.startTime}
            </span>
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Generic chip, for credentials that are not distances. */
export function Chip({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-[var(--radius-pill)]',
        'border border-navy/12 bg-surface-raised px-4 py-2',
        'font-sans text-sm font-semibold text-navy',
        className,
      )}
    >
      {children}
    </span>
  )
}
