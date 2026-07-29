import { sponsors, sponsorsByTier } from '@/content/sponsors'
import { cn } from '@/lib/cn'

/**
 * Sponsor presentation. Brief §7.10, §12.3 and §24.
 *
 * §7.10: "Sponsor logos support credibility without interrupting the
 * registration journey" — so this is deliberately quiet, and §15 requires
 * sponsor items stay visually quiet relative to race cards.
 *
 * §12.3: present by CONFIRMED HIERARCHY, not equal prominence. Title and
 * presenting partners get their own line; the rest wrap as a calm row.
 *
 * NO LOGO FILES EXIST (client action item 2). Names render as styled text,
 * which is honest and deliberate-looking, rather than broken images or
 * placeholder grey boxes (§19).
 *
 * §12.3 also allows a controlled marquee on small screens only if it can be
 * paused. It is not worth the accessibility cost here, so there is no marquee.
 */
export function SponsorWall({
  tone = 'ink',
  className,
}: {
  tone?: 'ink' | 'inverse'
  className?: string
}) {
  const inverse = tone === 'inverse'
  const title = sponsorsByTier('title')
  const presenting = sponsorsByTier('presenting')
  const partners = sponsorsByTier('partner')

  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline gap-x-12 gap-y-6">
        {[...title, ...presenting].map((sponsor) => (
          <div key={sponsor.id}>
            <p
              className={cn(
                'eyebrow',
                inverse ? 'text-sand/50' : 'text-navy/45',
              )}
            >
              {sponsor.role}
            </p>
            <p
              className={cn(
                'mt-1.5 font-display text-2xl font-semibold leading-tight sm:text-[1.75rem]',
                inverse ? 'text-sand' : 'text-navy',
              )}
            >
              {sponsor.name}
            </p>
          </div>
        ))}
      </div>

      <ul
        className={cn(
          'mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t pt-8',
          inverse ? 'border-white/12' : 'border-navy/10',
        )}
      >
        {partners.map((sponsor) => (
          <li
            key={sponsor.id}
            className={cn(
              'font-sans text-[0.9375rem] font-semibold',
              inverse ? 'text-sand/70' : 'text-navy/60',
            )}
          >
            {sponsor.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const sponsorCount = sponsors.length
