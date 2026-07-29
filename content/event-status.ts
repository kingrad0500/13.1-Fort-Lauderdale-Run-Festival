/**
 * THE ONE CONTROL. Brief §17.
 *
 * The site shifts priorities before, during and after the event without a
 * redesign. Mode is normally derived from the calendar, but §17 requires the
 * race team keep a manual override for early registration closure, delayed
 * results, schedule changes and emergency conditions.
 *
 * ---------------------------------------------------------------------------
 * TO CHANGE THE SITE ON RACE WEEKEND: edit `override` below, commit, push.
 * Live in about a minute. Set it back to null to resume automatic behaviour.
 * ---------------------------------------------------------------------------
 *
 * The emergency banner is deliberately independent of mode (§17), so it can be
 * raised without shifting the whole site into a different state.
 */

export type EventMode = 'registration' | 'race-week' | 'race-day' | 'post-race'

export interface EmergencyBanner {
  /** Keep it short and instructional. Brief §23 severe-weather policy applies. */
  message: string
  /** Optional link to fuller detail. */
  href?: string
  linkLabel?: string
}

export const eventStatus: {
  override: EventMode | null
  emergencyBanner: EmergencyBanner | null
} = {
  /**
   * null  = derive from the calendar (see lib/event-status.ts)
   * or force: 'registration' | 'race-week' | 'race-day' | 'post-race'
   */
  override: null,

  /**
   * null = no banner. To raise one:
   *   emergencyBanner: {
   *     message: 'Severe weather is affecting race morning. Follow official updates.',
   *     href: '/race-weekend',
   *     linkLabel: 'Race-day information',
   *   }
   */
  emergencyBanner: null,
}

/** Calendar transitions. Brief §17. Times are event-local (US Eastern). */
export const modeTransitions = {
  /** Brief §17: race-week mode begins Monday, November 2, 2026. */
  raceWeekStart: '2026-11-02T00:00:00-05:00',
  /** Brief §17: race-day mode begins early Sunday, November 8, 2026. */
  raceDayStart: '2026-11-08T00:00:00-05:00',
  /** Post-race mode activates after the event. */
  postRaceStart: '2026-11-08T12:00:00-05:00',
} as const

/** Brief §17 approved banner copy, per mode. */
export const modeBanners: Record<EventMode, string | null> = {
  registration: null,
  'race-week': 'Race week is here. Review packet pickup and race-day details.',
  'race-day': null,
  'post-race': null,
}

/**
 * Brief §17: before October 2, surface the price-increase reminder.
 * Explicitly NOT a resetting or artificial countdown.
 */
export const priceIncreaseNotice =
  'Register before prices increase on October 2 at 11:59 p.m. EDT.'
