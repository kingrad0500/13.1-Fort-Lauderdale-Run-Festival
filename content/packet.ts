/**
 * Packet pickup, packet contents, bib and timing. Brief §8.4-§8.6 and §21.
 */

export interface PickupLocation {
  id: string
  day: string
  dateDisplay: string
  time: string
  name: string
  venue: string
  address: string
  /** Brief §8.4: Saturday pickup is strongly recommended. */
  recommended: boolean
  note?: string
}

export const pickupLocations: PickupLocation[] = [
  {
    id: 'expo',
    day: 'Saturday',
    dateDisplay: 'Saturday, November 7, 2026',
    time: '8:00 a.m.–6:00 p.m.',
    name: 'Baptist Health South Florida Health and Fitness Expo',
    venue: 'Downtown Events Center',
    address: '416 NE 1st Street, Fort Lauderdale, FL 33301',
    recommended: true,
    note: 'Primary packet pickup.',
  },
  {
    id: 'race-morning',
    day: 'Sunday',
    dateDisplay: 'Sunday, November 8, 2026',
    time: '4:30–6:00 a.m.',
    name: 'Race-morning registration and packet pickup',
    venue: 'Registration tent at Las Olas Oceanside Park',
    address: '3000 E Las Olas Blvd, Fort Lauderdale, FL 33316',
    recommended: false,
    note: 'Race-morning pickup closes at 6:00 a.m.',
  },
]

/** Brief §8.4 and §21. */
export const pickupRules = [
  'All participants must pick up their packet to participate.',
  'Saturday pickup is strongly recommended.',
  'Bring photo identification.',
  'Third-party or proxy pickup is permitted.',
  "A proxy must present a copy of the participant's photo identification.",
  'A copy displayed on a phone is accepted.',
  'Race-morning pickup ends at 6:00 a.m.',
] as const

/** Brief §8.5. Four concise visual items, scannable rather than a text wall. */
export interface PacketItem {
  title: string
  detail: string
}

export const packetContents: PacketItem[] = [
  {
    title: 'Race bib',
    detail: 'Includes a gear-check tag and an emergency-contact area on the back.',
  },
  {
    title: 'ChronoTrack B-Tag',
    detail: 'Your single-use timing device, attached to the back of the bib.',
  },
  {
    title: 'Safety pins',
    detail: 'For securing the bib to the front of your running outfit.',
  },
  {
    title: 'Beer wristband',
    detail:
      'For eligible participants age 21+ with valid identification, redeemable at the finish-line festival.',
  },
]

/**
 * Brief §8.6: these three stay VISIBLE, outside the collapsed accordions.
 * They are the warnings that cost a participant their official time.
 */
export const timingWarnings = [
  'Do not fold, wrinkle, or alter the bib.',
  'Do not remove the timing tag.',
  'Do not transfer a bib or timing tag to another participant.',
] as const

/** Brief §8.6 accordion one. Detail from §21. */
export const bibInstructions = [
  'Complete the medical information and emergency-contact fields on the back of your bib.',
  'Secure the bib to the front of your running outfit with the provided safety pins.',
  'The bib must remain clearly visible on the front and outside of all clothing throughout the event.',
  'Do not alter, fold, or wrinkle the bib.',
  'Bibs are non-transferable and may be used only by the assigned participant.',
] as const

/** Brief §8.6 accordion two. Detail from §21. */
export const timingInstructions = [
  'The ChronoTrack B-Tag attached to your bib is your single-use timing device.',
  'The timing tag remains attached to the back of the bib and records both clock time and chip time.',
  'You must cross the start line during the official start period.',
  'A participant who starts before the official time, or after the starting mats are removed, will not receive an official time.',
  'Timing tags are non-transferable.',
] as const

/** Brief §8.7. Rules organised by topic. Unconfirmed items live in pending.ts. */
export const raceRuleTopics = [
  {
    id: 'course-deadline',
    title: 'Course deadline and walking',
    rules: [
      'All four events must be completed by 10:00 a.m.',
      'Half Marathon and Relay participants have 3 hours 45 minutes from the 6:15 a.m. start.',
      'Walkers are welcome.',
      'Walkers start behind runners.',
      'There is no early start.',
    ],
  },
  {
    id: 'start-timing',
    title: 'Start line and timing',
    rules: [
      'Cross the start line during the official start period.',
      'Starting before the official time, or after the starting mats are removed, means no official time.',
      'Keep your bib visible on the front of your clothing for the whole event.',
    ],
  },
  {
    id: 'wheelchair',
    title: 'Wheelchair participation',
    rules: [
      'Athletes using wheelchairs are welcome.',
      'There is no hand-cycle division.',
      'Hand cycles, hand bikes, hand-crank devices and mechanically gear-driven devices are not permitted.',
      'The event follows applicable recognized wheelchair-racing rules.',
    ],
  },
] as const
