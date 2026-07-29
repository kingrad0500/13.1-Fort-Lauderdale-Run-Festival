import Link from 'next/link'
import { event, distances } from '@/content/race'
import {
  getEventMode,
  getEmergencyBanner,
  getModeBanner,
  getPriceIncreaseNotice,
} from '@/lib/event-status'

/**
 * Top bar. Brief §17 (banners) with the reference's ticker TREATMENT.
 *
 * Deliberately STATIC. The reference this is modelled on uses a scrolling
 * marquee, and the look is adopted — dark bar, letterspaced caps, bullet
 * separators — but not the motion:
 *
 *   §7.2  "Do not use an automatic slider for critical schedule information."
 *   §25   "Critical schedules, policies, and prices must remain stationary."
 *
 * The content here is the race date, the four distances and the venue. That is
 * exactly the information those two rules protect, so it does not move. It
 * would also have been the third animated element on the homepage.
 *
 * Two independent systems, per §17:
 *   1. EMERGENCY — raised without changing lifecycle mode, always first.
 *   2. MODE — the race-week message, or the price-increase reminder that stops
 *      on October 2. Not a countdown; §17 forbids a resetting one.
 */
export function Banners() {
  const mode = getEventMode()
  const emergency = getEmergencyBanner()
  const modeBanner = getModeBanner(mode)
  const priceNotice = getPriceIncreaseNotice()

  const message = modeBanner ?? priceNotice

  return (
    <>
      {emergency && (
        <div role="alert" className="bg-coral text-navy">
          <div className="page-shell flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-3 text-center">
            <span className="font-sans text-sm font-bold">
              {emergency.message}
            </span>
            {emergency.href && emergency.linkLabel && (
              <Link
                href={emergency.href}
                className="font-sans text-sm font-bold underline underline-offset-4"
              >
                {emergency.linkLabel}
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Event facts strip — the ticker look, stationary. */}
      <div className="bg-navy-900 text-sand">
        <div className={
            // Left-aligned while it overflows, centred once it fits. Centring
            // an overflowing row clips BOTH ends, so on a phone the strip
            // opened mid-sentence with the race date already scrolled off.
            'page-shell flex items-center justify-start gap-x-3 overflow-x-auto ' +
            'py-2.5 lg:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          }>
          <TickerItem>{event.dateShort}</TickerItem>
          <Dot />
          <TickerItem>
            {distances.map((d) => d.shortName).join(' / ')}
          </TickerItem>
          <Dot />
          <TickerItem>{event.venue}</TickerItem>

          {message && (
            <>
              <Dot />
              <TickerItem accent>{message}</TickerItem>
            </>
          )}
        </div>
      </div>
    </>
  )
}

function TickerItem({
  children,
  accent = false,
}: {
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <span
      className={`shrink-0 whitespace-nowrap font-sans text-[0.6875rem] font-bold uppercase tracking-[0.12em] ${
        accent ? 'text-gold' : 'text-sand/75'
      }`}
    >
      {children}
    </span>
  )
}

function Dot() {
  return (
    <span aria-hidden="true" className="shrink-0 text-[0.5rem] text-sand/35">
      ●
    </span>
  )
}
