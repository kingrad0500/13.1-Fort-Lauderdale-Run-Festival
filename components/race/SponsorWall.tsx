import Image from 'next/image'
import { sponsors, sponsorsByTier, type Sponsor } from '@/content/sponsors'
import { cn } from '@/lib/cn'

/**
 * Sponsor presentation. Brief §7.10, §12.3 and §24.
 *
 * §12.3: present by CONFIRMED HIERARCHY, not equal prominence. Liquid Youth
 * are the title sponsor and Baptist Health the presenting and medical partner;
 * they share the top row but keep their role labels, because two logos side by
 * side with no labels read as equals and that is not the agreed hierarchy.
 *
 * TWO MODES:
 *   default  — names in type. Used on the homepage (§7.10), where the logo
 *              marquee already sits below the hero and a second full logo wall
 *              would show the same nine marks twice on one page.
 *   logos    — the real artwork. Used on Community, where this IS the partner
 *              section and there is no marquee competing with it.
 *
 * §12.3 also allows a paused marquee; this wall is deliberately static.
 */
export function SponsorWall({
  tone = 'ink',
  logos = false,
  className,
}: {
  tone?: 'ink' | 'inverse'
  /** Render real artwork instead of names. Opt-in — see the two modes above. */
  logos?: boolean
  className?: string
}) {
  const inverse = tone === 'inverse'
  const lead = [...sponsorsByTier('title'), ...sponsorsByTier('presenting')]
  const partners = sponsorsByTier('partner')

  if (!logos) {
    return (
      <div className={className}>
        <div className="flex flex-wrap items-baseline gap-x-12 gap-y-6">
          {lead.map((sponsor) => (
            <div key={sponsor.id}>
              <p className={cn('eyebrow', inverse ? 'text-sand/50' : 'text-navy/45')}>
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

  return (
    <div className={className}>
      {/* Title + presenting: larger tiles, role labels retained (§12.3). */}
      <ul className="grid gap-5 sm:grid-cols-2">
        {lead.map((sponsor) => (
          <li key={sponsor.id}>
            <p className={cn('eyebrow', inverse ? 'text-sand/55' : 'text-navy/50')}>
              {sponsor.role}
            </p>
            <div className="mt-3">
              <LogoPanel sponsor={sponsor} size="lead" inverse={inverse} />
            </div>
          </li>
        ))}
      </ul>

      {/* Remaining partners: uniform smaller tiles, no hierarchy between them. */}
      <div
        className={cn(
          'mt-12 border-t pt-10',
          inverse ? 'border-white/12' : 'border-navy/10',
        )}
      >
        <p className={cn('eyebrow', inverse ? 'text-sand/55' : 'text-navy/50')}>
          Event partners
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((sponsor) => (
            <li key={sponsor.id}>
              <LogoPanel sponsor={sponsor} size="partner" inverse={inverse} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/**
 * One sponsor on its own panel.
 *
 * The panel colour comes from the sponsor's `tile` field, not from a global
 * choice. Seven marks are dark artwork and take a white panel; WildSide's is
 * pale cream script that leaves only the eyes visible on white, so it takes a
 * navy panel instead — the logo is shown as supplied rather than recoloured,
 * which trademarked artwork must not be.
 *
 * One navy panel among eight white ones reads as deliberate because the panels
 * are otherwise identical in size and radius. If WildSide later supply a
 * dark/colour version, set their `tile` to `'light'` and the wall becomes
 * uniform with no code change.
 */
function LogoPanel({
  sponsor,
  size,
  inverse,
}: {
  sponsor: Sponsor
  size: 'lead' | 'partner'
  inverse: boolean
}) {
  const lead = size === 'lead'
  const dark = sponsor.tile === 'dark'

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-[var(--radius-card)]',
        'shadow-[var(--shadow-card)]',
        dark ? 'border border-navy bg-navy' : 'border border-navy/8 bg-paper',
        lead ? 'h-[120px] px-8 sm:h-[136px]' : 'h-[92px] px-5 sm:h-[104px] sm:px-6',
      )}
    >
      {sponsor.logo ? (
        <Image
          src={`/media/logos/${sponsor.logo}`}
          alt={sponsor.name}
          width={560}
          height={200}
          className={cn(
            'h-auto w-auto max-w-full object-contain',
            lead ? 'max-h-[68px] sm:max-h-[80px]' : 'max-h-[48px] sm:max-h-[56px]',
          )}
        />
      ) : (
        <span
          className={cn(
            'text-center font-sans font-semibold',
            dark ? 'text-sand/80' : 'text-navy/70',
            lead ? 'text-lg' : 'text-sm',
          )}
        >
          {sponsor.name}
        </span>
      )}
    </div>
  )
}

export const sponsorCount = sponsors.length
