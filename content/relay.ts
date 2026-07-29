/**
 * Two-Person Relay. Brief §7.7 and §9.4.
 *
 * The relay is both a race format and an emotional team experience, and the
 * brief asks for it to be explained as both. The optional shared finish is for
 * celebration and photography — it is not a requirement, and the copy should
 * never imply otherwise.
 */

export interface RelayLeg {
  member: string
  distance: string
  start: string
  detail: string
}

export const relayLegs: RelayLeg[] = [
  {
    member: 'Team Member 1',
    distance: '6.4 miles',
    start: 'Starts at 6:15 a.m.',
    detail:
      'Runs the first leg from Las Olas Oceanside Park and hands off the baton at E Las Olas and A1A southbound.',
  },
  {
    member: 'Team Member 2',
    distance: '6.7 miles',
    start: 'Starts at the exchange',
    detail:
      'Takes the baton at E Las Olas and A1A southbound and carries it through to the finish line.',
  },
]

export const relayExchange = 'E Las Olas and A1A southbound'

/** Brief §7.7. Non-negotiable rule. */
export const relayBatonRule = 'The baton must be carried for the entire relay.'

/** Brief §7.7 and §9.4. Explicitly optional. */
export const relayOptionalFinish = [
  'Team Member 1 may optionally travel to the corner of Seville Street and A1A.',
  'Team Member 1 may rejoin Team Member 2 for the final stretch.',
  'The shared finish is optional and intended for celebration, photography, and social media.',
] as const

/** Brief §9.4: both members must satisfy the age requirement, and $110 is a team price. */
export const relayEligibilityNote =
  '$110 is the price for the whole team. Both team members must be at least 14 years old on November 8, 2026.'
