import Link from 'next/link'
import { event, distances } from '@/content/race'
import {
  getEventMode,
  getEmergencyBanner,
  getModeBanner,
  getPriceIncreaseNotice,
} from '@/lib/event-status'
import { EventTicker } from '@/components/layout/EventTicker'

/**
 * Top bar. Brief §17 (banners) with the reference's ticker treatment.
 *
 * NOW A MARQUEE — client-directed, §29.19. This reverses §29.13, which kept the
 * strip stationary on the strength of:
 *
 *   §7.2  "Do not use an automatic slider for critical schedule information."
 *   §25   "Critical schedules, policies, and prices must remain stationary."
 *
 * The reason for the reversal is that the stationary version was not actually
 * showing the information those rules protect. The row overflows below roughly
 * 1000px and its scrollbar is hidden, so on a phone the tail of the strip —
 * including the price-increase deadline, the most commercially important line
 * on the bar — was simply invisible with no affordance suggesting otherwise.
 * A rule that exists to keep critical information readable was, here, hiding it.
 *
 * What the rules still get, in full:
 *   - a real PAUSE control, not hover-only (hover does not exist on touch)
 *   - pause on hover AND focus, so keyboard users can stop it to read
 *   - reduced-motion users get a genuinely static, scrollable row
 *   - the same static row pre-hydration and with no JS
 *
 * Every one of these facts also appears stationary elsewhere on the site — the
 * date and venue in the hero, distances in the event strip, the deadline in the
 * pricing notice — so no fact lives only inside moving text.
 *
 * Two independent systems, per §17:
 *   1. EMERGENCY — raised without changing lifecycle mode, always first. Never
 *      animated: it is an alert, and it stays a stationary block.
 *   2. MODE — the race-week message, or the price-increase reminder that stops
 *      on October 2. Not a countdown; §17 forbids a resetting one.
 */
export function Banners() {
  const mode = getEventMode()
  const emergency = getEmergencyBanner()
  const modeBanner = getModeBanner(mode)
  const priceNotice = getPriceIncreaseNotice()

  const message = modeBanner ?? priceNotice

  /*
    One run of the ticker. Ends with a separator so that when the marquee sets
    copy 2 immediately after copy 1, the join reads as another beat rather than
    two sentences colliding. The gap lives here rather than in Marquee so the
    marquee stays generic.
  */
  const items = (
    <span className="flex shrink-0 items-center gap-x-3 pr-3">
      <TickerItem>{event.dateShort}</TickerItem>
      <Dot />
      <TickerItem>{distances.map((d) => d.shortName).join(' / ')}</TickerItem>
      <Dot />
      <TickerItem>{event.venue}</TickerItem>
      {message && (
        <>
          <Dot />
          <TickerItem accent>{message}</TickerItem>
        </>
      )}
      <Dot />
    </span>
  )

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

      {/* Event facts strip. */}
      <div className="bg-navy-900 text-sand">
        <EventTicker>{items}</EventTicker>
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
