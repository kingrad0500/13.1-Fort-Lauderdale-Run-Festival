import Link from 'next/link'
import {
  getEventMode,
  getEmergencyBanner,
  getModeBanner,
  getPriceIncreaseNotice,
} from '@/lib/event-status'

/**
 * Site-wide banners. Brief §17.
 *
 * Two independent systems, deliberately:
 *
 *  1. EMERGENCY — raised without changing the site's lifecycle mode, so severe
 *     weather or a schedule change can be communicated instantly. Always
 *     rendered first and styled to be unmissable.
 *  2. MODE — the approved race-week message, and the price-increase reminder
 *     that stops on October 2. §17 forbids a resetting or artificial countdown,
 *     so this is a plain statement of the deadline, not a timer.
 *
 * Both are server-rendered, so they are correct in the first HTML response.
 */
export function Banners() {
  const mode = getEventMode()
  const emergency = getEmergencyBanner()
  const modeBanner = getModeBanner(mode)
  const priceNotice = getPriceIncreaseNotice()

  return (
    <>
      {emergency && (
        <div role="alert" className="bg-coral text-navy">
          <div className="page-shell flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-3 text-center">
            <span className="font-sans text-sm font-bold">{emergency.message}</span>
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

      {modeBanner && (
        <div className="bg-navy text-sand">
          <div className="page-shell py-2.5 text-center">
            <p className="font-sans text-sm font-semibold">{modeBanner}</p>
          </div>
        </div>
      )}

      {!modeBanner && priceNotice && (
        <div className="bg-navy text-sand">
          <div className="page-shell py-2.5 text-center">
            <p className="font-sans text-sm font-semibold">{priceNotice}</p>
          </div>
        </div>
      )}
    </>
  )
}
