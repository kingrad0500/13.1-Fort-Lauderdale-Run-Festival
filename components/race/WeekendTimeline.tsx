import { schedule } from '@/content/schedule'
import { cn } from '@/lib/cn'

/**
 * Full weekend timeline. Brief §8.3.
 *
 * §8.3 is explicit: "The schedule is static and must not use automatic
 * animation." §25 repeats it — critical schedules stay stationary and readable.
 * There is deliberately no scroll reveal, no stagger, no motion of any kind on
 * this component.
 *
 * §16: timeline content remains chronological, and each day keeps its date
 * with its entries rather than relying on a heading far above.
 */
export function WeekendTimeline() {
  return (
    <div className="space-y-14">
      {schedule.map((day) => (
        <section key={day.date} aria-labelledby={`day-${day.date}`}>
          <h3
            id={`day-${day.date}`}
            className="font-display text-2xl font-bold text-navy sm:text-3xl"
          >
            {day.dayName}
          </h3>
          <p className="mt-1 font-sans text-sm text-navy/60">
            {day.dateDisplay}
          </p>

          <ol className="mt-6 border-t border-navy/10">
            {day.entries.map((entry, i) => (
              <li
                key={`${entry.time}-${i}`}
                className={cn(
                  'grid gap-x-6 border-b border-navy/10 py-5',
                  'grid-cols-1 sm:grid-cols-[10rem_1fr]',
                )}
              >
                <p className="font-numeric text-lg leading-tight text-navy">
                  {entry.time}
                </p>
                <div className="mt-1 sm:mt-0">
                  <p className="font-sans text-[1.0625rem] font-semibold leading-snug text-navy">
                    {entry.title}
                  </p>
                  {entry.detail && (
                    <p className="measure mt-1 font-sans text-[0.9375rem] leading-relaxed text-navy/70">
                      {entry.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}
