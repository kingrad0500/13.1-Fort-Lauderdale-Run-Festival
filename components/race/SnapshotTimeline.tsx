import { snapshotEntries } from '@/content/schedule'
import { cn } from '@/lib/cn'

/**
 * Race weekend snapshot. Brief §7.9.
 *
 * §7.9: show ONLY the essential schedule and link to the full Race Weekend
 * page. Entries are flagged `inSnapshot` in content/schedule.ts, so what
 * counts as essential is data, not a hardcoded subset that could drift from
 * the full timeline.
 *
 * §8.3 and §25: schedules are static. No animation, no auto-advance.
 * §16: timeline content remains chronological.
 */
export function SnapshotTimeline({ className }: { className?: string }) {
  const entries = snapshotEntries()

  return (
    <ol className={cn('mt-2', className)}>
      {entries.map((entry, i) => (
        <li
          key={`${entry.dayName}-${entry.time}-${i}`}
          className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-navy/10 py-5 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:gap-x-8"
        >
          <div>
            <p className="font-numeric text-sm uppercase tracking-wider text-teal">
              {entry.dayName}
            </p>
            <p className="mt-0.5 font-numeric text-lg leading-tight text-navy">
              {entry.time}
            </p>
          </div>

          <div>
            <p className="font-sans text-[1.0625rem] font-semibold leading-snug text-navy">
              {entry.title}
            </p>
            {entry.detail && (
              <p className="mt-1 font-sans text-[0.9375rem] leading-relaxed text-navy/70">
                {entry.detail}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
