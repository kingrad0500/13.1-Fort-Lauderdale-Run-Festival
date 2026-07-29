import type { PickupLocation } from '@/content/packet'
import { cn } from '@/lib/cn'

/**
 * Packet pickup location. Brief §8.4 and §16.
 *
 * §15 card behaviour: location cards emphasise ADDRESS and TIME, which is why
 * those are the largest elements rather than the venue name.
 *
 * §16 is specific: "Packet-pickup locations retain dates, times, and addresses
 * together." So this is one block that never splits its date away from its
 * address across a responsive boundary — everything a participant needs to act
 * on is inside a single card at every width.
 *
 * The recommended location is marked with a text label, not colour alone (§16).
 */
export function LocationCard({ location }: { location: PickupLocation }) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-[var(--radius-card)] bg-paper p-7',
        'shadow-[var(--shadow-card)]',
        location.recommended && 'ring-2 ring-teal/40',
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-numeric text-sm uppercase tracking-wider text-teal">
          {location.day}
        </p>
        {location.recommended && (
          <span className="rounded-[var(--radius-pill)] bg-teal/12 px-3 py-1 font-sans text-xs font-bold text-navy">
            Recommended
          </span>
        )}
      </div>

      <p className="mt-3 font-numeric text-3xl leading-none text-navy">
        {location.time}
      </p>
      <p className="mt-2 font-sans text-sm text-navy/60">
        {location.dateDisplay}
      </p>

      <h3 className="mt-5 font-sans text-base font-bold leading-snug text-navy">
        {location.name}
      </h3>

      <address className="mt-3 not-italic">
        <p className="font-sans text-[0.9375rem] font-semibold text-navy/85">
          {location.venue}
        </p>
        <p className="mt-0.5 font-sans text-[0.9375rem] leading-relaxed text-navy/70">
          {location.address}
        </p>
      </address>

      {location.note && (
        <p className="mt-auto pt-5 font-sans text-[0.9375rem] font-semibold text-navy/80">
          {location.note}
        </p>
      )}
    </article>
  )
}
