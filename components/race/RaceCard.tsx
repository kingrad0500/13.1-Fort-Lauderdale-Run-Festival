import { formatPrice, type Distance } from '@/content/race'
import { registrationUrl } from '@/content/links'
import { analyticsAttrs } from '@/lib/analytics'
import { RegisterButton } from '@/components/ui/RegisterButton'
import { cn } from '@/lib/cn'

/**
 * Race card. Brief §7.4 and §9.2.
 *
 * §15 card behaviour: race cards emphasise CHOICE and REGISTRATION, so the
 * price and the CTA carry the most weight. Every value comes from
 * content/race.ts — nothing here is retyped (§19).
 *
 * §15 also requires a visible action label on clickable cards. The whole card
 * is deliberately NOT a link: it contains a registration CTA that leaves the
 * site, and wrapping that in a second link would make the destination
 * ambiguous. One card, one action.
 */
export function RaceCard({
  distance,
  source = 'distance-card',
}: {
  distance: Distance
  source?: 'distance-card' | 'comparison-table'
}) {
  return (
    <article
      className={cn(
        'flex w-full flex-col rounded-[var(--radius-card)] bg-paper p-7 sm:p-8',
        'shadow-[var(--shadow-card)] transition-shadow duration-300',
        'hover:shadow-[var(--shadow-raised)]',
      )}
    >
      {/* Start time — Barlow Condensed, because scanning it is the job (§4). */}
      <p className="font-numeric text-sm uppercase tracking-wider text-teal">
        Starts {distance.startTime}
      </p>

      <h3 className="mt-3 text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-tight tracking-[-0.01em] text-navy">
        {distance.shortName}
      </h3>

      <p className="mt-2 font-display text-lg italic leading-snug text-blue">
        {distance.promise}
      </p>

      <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-navy/75">
        {distance.description}
      </p>

      <div className="mt-auto pt-7">
        <div className="flex items-baseline gap-2">
          <span className="font-numeric text-4xl leading-none text-navy">
            ${distance.basePrice}
          </span>
          <span className="font-sans text-sm text-navy/60">
            {distance.priceBasis === 'team' ? 'per team' : 'base price'}
          </span>
        </div>
        <p className="mt-1 font-numeric text-sm text-navy/55">
          {distance.distance}
        </p>

        <RegisterButton
          source={source}
          distance={distance.slug}
          block
          className="mt-5"
          srSuffix={`for the ${distance.name}`}
        />
      </div>
    </article>
  )
}

/** Compact variant for the final race selector. Brief §9.8. */
export function RaceCardCompact({ distance }: { distance: Distance }) {
  return (
    <a
      href={registrationUrl('final-section', distance.slug)}
      data-register-cta=""
      {...analyticsAttrs({
        name: 'registration_click',
        source: 'final-section',
        distance: distance.slug,
      })}
      className={cn(
        'group flex w-full items-center justify-between gap-4 rounded-[var(--radius-card)]',
        'border border-sand-deep bg-paper px-6 py-5',
        'transition-shadow duration-300 hover:shadow-[var(--shadow-card)]',
      )}
    >
      <span>
        <span className="block font-sans text-base font-bold text-navy">
          {distance.shortName}
        </span>
        <span className="mt-0.5 block font-numeric text-sm text-navy/60">
          {distance.startTime} · {formatPrice(distance)}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="font-sans text-lg text-coral transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  )
}
