import { formatPrice, deadlines, type Distance } from '@/content/race'
import { RegisterButton } from '@/components/ui/RegisterButton'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { StatusNotice } from '@/components/ui/StatusNotice'
import { cn } from '@/lib/cn'

/**
 * One anchored distance section. Brief §9.3–§9.6.
 *
 * §9 chose ONE page with anchored sections over four separate pages, so that
 * comparison stays easy and shared rules are not duplicated. Each section
 * therefore carries only what is specific to that distance — eligibility,
 * pricing rules and registration policy live once, in the shared block below
 * the four sections.
 *
 * The `id` becomes the URL anchor and must match content/navigation.ts.
 */
export function DistanceSection({
  distance,
  positioning,
  features,
  children,
  surface = 'sand',
}: {
  distance: Distance
  /** Why someone chooses this race. §9.2 asks each for a distinct promise. */
  positioning: React.ReactNode
  features: string[]
  children?: React.ReactNode
  surface?: 'sand' | 'paper'
}) {
  return (
    <section
      id={distance.slug}
      aria-labelledby={`${distance.slug}-heading`}
      className={cn(
        'scroll-mt-28 py-20 sm:py-24',
        surface === 'paper' && 'bg-paper',
      )}
    >
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <EyebrowLabel>{distance.distance}</EyebrowLabel>

            <h2
              id={`${distance.slug}-heading`}
              className="mt-3 text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-navy"
            >
              {distance.shortName}
            </h2>

            <p className="mt-3 font-display text-xl italic leading-snug text-blue sm:text-2xl">
              {distance.promise}
            </p>

            <div className="measure mt-6 space-y-4 font-sans text-[1.0625rem] leading-relaxed text-navy/75">
              {positioning}
            </div>

            {children}
          </div>

          {/* Facts panel — the decision-making information, kept together. */}
          <div className="rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-card)] lg:sticky lg:top-28 lg:self-start">
            <dl className="grid grid-cols-2 gap-5">
              <div>
                <dt className="eyebrow text-navy/50">Start</dt>
                <dd className="mt-1 font-numeric text-2xl text-navy">
                  {distance.startTime}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-navy/50">Base price</dt>
                <dd className="mt-1 font-numeric text-2xl text-navy">
                  {formatPrice(distance)}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="eyebrow text-navy/50">Finish by</dt>
                <dd className="mt-1 font-numeric text-2xl text-navy">
                  {deadlines.courseSupportEnds}
                </dd>
              </div>
            </dl>

            <ul className="mt-7 border-t border-navy/10 pt-5">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 border-b border-navy/10 py-3 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-teal"
                  />
                  <span className="font-sans text-[0.9375rem] leading-snug text-navy/80">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <RegisterButton
              source="distance-card"
              distance={distance.slug}
              block
              className="mt-6"
              srSuffix={`for the ${distance.name}`}
            />

            {/* §9.3–§9.6 each require the course-map status. */}
            <div className="mt-5">
              <StatusNotice id="courseMaps" tone="inline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
