import {
  eventStatus,
  modeTransitions,
  modeBanners,
  priceIncreaseNotice,
  type EventMode,
  type EmergencyBanner,
} from '@/content/event-status'
import { deadlines } from '@/content/race'

/**
 * Resolves the site's lifecycle mode. Brief §17.
 *
 * Known date transitions are scheduled, but a manual override always wins —
 * §17 requires the race team be able to force a state for early registration
 * closure, delayed results, schedule changes or emergency conditions.
 *
 * Called from server components, so the correct mode is in the first HTML
 * response. There is no client-side flash of the wrong state.
 */
const VALID_MODES: EventMode[] = [
  'registration',
  'race-week',
  'race-day',
  'post-race',
]

/**
 * Precedence: env var > config override > calendar.
 *
 * The env var exists for two reasons:
 *  1. It makes all four modes testable without four rebuilds.
 *  2. It is a race-weekend fallback. The config file is the documented control
 *     (§17), but that path needs a commit and a deploy. If the pipeline is
 *     down at 5 a.m. on race morning, EVENT_MODE can be flipped straight in
 *     the hosting dashboard and takes effect on redeploy of the same build.
 *
 * An unrecognised value is ignored rather than throwing — a typo in a
 * dashboard field must never take the site down.
 */
function envMode(): EventMode | null {
  const raw = process.env.EVENT_MODE?.trim()
  if (!raw) return null
  return VALID_MODES.includes(raw as EventMode) ? (raw as EventMode) : null
}

export function getEventMode(now: Date = new Date()): EventMode {
  const fromEnv = envMode()
  if (fromEnv) return fromEnv

  if (eventStatus.override) return eventStatus.override

  const t = now.getTime()
  if (t >= new Date(modeTransitions.postRaceStart).getTime()) return 'post-race'
  if (t >= new Date(modeTransitions.raceDayStart).getTime()) return 'race-day'
  if (t >= new Date(modeTransitions.raceWeekStart).getTime()) return 'race-week'
  return 'registration'
}

/** Whether the mode was forced rather than derived. */
export function isModeOverridden(): boolean {
  return envMode() !== null || eventStatus.override !== null
}

/**
 * Emergency banner, also env-overridable for the same race-weekend reason.
 * EMERGENCY_MESSAGE set in the hosting dashboard raises a banner immediately
 * without touching the repo. §17 requires this be independent of mode.
 */
function envEmergency(): EmergencyBanner | null {
  const message = process.env.EMERGENCY_MESSAGE?.trim()
  if (!message) return null
  return {
    message,
    href: process.env.EMERGENCY_HREF?.trim() || undefined,
    linkLabel: process.env.EMERGENCY_LINK_LABEL?.trim() || undefined,
  }
}

/**
 * Independent of mode, per §17, so it can be raised without changing the
 * whole site state.
 */
export function getEmergencyBanner(): EmergencyBanner | null {
  return envEmergency() ?? eventStatus.emergencyBanner
}

export function getModeBanner(mode: EventMode): string | null {
  return modeBanners[mode]
}

/**
 * Brief §17: show the price-increase reminder before October 2 only.
 * Deliberately not a countdown — §17 forbids a resetting or artificial one.
 */
export function getPriceIncreaseNotice(now: Date = new Date()): string | null {
  const cutoff = new Date(deadlines.priceIncrease.iso).getTime()
  return now.getTime() < cutoff ? priceIncreaseNotice : null
}

/**
 * Registration CTAs are replaced once registration closes (§17 race-day mode).
 * RunSignUp remains open through race week, so only race-day and post-race
 * suppress the registration path.
 */
export function isRegistrationOpen(mode: EventMode): boolean {
  return mode === 'registration' || mode === 'race-week'
}

/** Brief §17 race-day priorities: live results become the primary action. */
export function isLiveResultsPrimary(mode: EventMode): boolean {
  return mode === 'race-day'
}

export type { EventMode, EmergencyBanner }
