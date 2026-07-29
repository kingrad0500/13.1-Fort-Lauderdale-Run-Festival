/**
 * Registry of everything not yet confirmed. Brief §27 lists 19 open items plus
 * 6 claims that appeared in the original content but require confirmation.
 *
 * Why this file exists:
 *  - Brief §19: "Do not display empty modules, inactive buttons, or invented
 *    temporary content." Components read this registry instead of hardcoding
 *    placeholder strings, so every placeholder looks and behaves the same.
 *  - Brief §26.4: unknown information must be labelled Coming soon or
 *    To be announced.
 *  - Brief §26.5: do not invent operational facts.
 *  - The pre-launch pending audit becomes "read one file".
 *
 * TO PUBLISH A PENDING ITEM: set `resolved: true` and the component that reads
 * it will render the real content path instead of the notice.
 */

export type PendingState =
  /** Expected information that will arrive. Brief §19. */
  | 'coming-soon'
  /** Unconfirmed programs or partners. Brief §19. */
  | 'to-be-announced'
  /** RunSignUp registration unavailable. Brief §19. */
  | 'registration-closed'
  /** Important newly published information. Brief §19. */
  | 'updated'

export interface PendingItem {
  id: string
  state: PendingState
  /** Exactly what the visitor reads. Text, never an icon alone (§16). */
  label: string
  /** Where in the brief this is tracked. */
  briefRef: string
  /** Flip to true once real content exists. */
  resolved: boolean
}

const pending = {
  courseMaps: {
    id: 'courseMaps',
    state: 'coming-soon',
    label: 'Course maps coming soon',
    briefRef: '§7.5, §9',
    resolved: false,
  },
  elevationProfiles: {
    id: 'elevationProfiles',
    state: 'coming-soon',
    label: 'Elevation profiles coming soon',
    briefRef: '§27',
    resolved: false,
  },
  courseCertification: {
    id: 'courseCertification',
    state: 'coming-soon',
    label: 'Course certification details coming soon',
    briefRef: '§13.4, §27',
    resolved: false,
  },
  aidStations: {
    id: 'aidStations',
    state: 'coming-soon',
    label: 'Aid station locations and details coming soon',
    briefRef: '§13.4, §27',
    resolved: false,
  },
  roadClosures: {
    id: 'roadClosures',
    state: 'coming-soon',
    label: 'Final road closures coming soon',
    briefRef: '§8.7, §10.5',
    resolved: false,
  },
  hotels: {
    id: 'hotels',
    state: 'coming-soon',
    label: 'Hotel information coming soon',
    briefRef: '§10.3',
    resolved: false,
  },
  transportation: {
    id: 'transportation',
    state: 'coming-soon',
    label: 'Transportation guidance coming soon',
    briefRef: '§10.3',
    resolved: false,
  },
  medalAndShirt: {
    id: 'medalAndShirt',
    state: 'coming-soon',
    label: 'Medal and shirt images coming soon',
    briefRef: '§7.6',
    resolved: false,
  },
  accessibilityContact: {
    id: 'accessibilityContact',
    state: 'coming-soon',
    label: 'Accommodation contact coming soon',
    briefRef: '§8.8, §23',
    resolved: false,
  },
  awardsCategories: {
    id: 'awardsCategories',
    state: 'coming-soon',
    label: 'Award categories coming soon',
    briefRef: '§27',
    resolved: false,
  },
  gearCheck: {
    id: 'gearCheck',
    state: 'coming-soon',
    label: 'Gear check details coming soon',
    briefRef: '§13.6',
    resolved: false,
  },
  charities: {
    id: 'charities',
    state: 'to-be-announced',
    label: '2026 charity partnerships will be announced soon.',
    briefRef: '§12.5',
    resolved: false,
  },
  volunteerRoles: {
    id: 'volunteerRoles',
    state: 'to-be-announced',
    label: 'Race-day volunteer roles will be announced soon',
    briefRef: '§12.6',
    resolved: false,
  },
  socialAccounts: {
    id: 'socialAccounts',
    state: 'to-be-announced',
    label: 'Social channels coming soon',
    briefRef: '§14',
    resolved: false,
  },
  legalPages: {
    id: 'legalPages',
    state: 'coming-soon',
    label: 'Privacy, accessibility, cookie and terms information coming soon',
    briefRef: '§14',
    resolved: false,
  },
  spectatorViewing: {
    id: 'spectatorViewing',
    state: 'coming-soon',
    label: 'Suggested viewing areas coming soon',
    briefRef: '§10.6',
    resolved: false,
  },
  runnerTracking: {
    id: 'runnerTracking',
    state: 'coming-soon',
    label: 'Runner tracking coming soon',
    briefRef: '§10.6',
    resolved: false,
  },

  /* --- The six §27 claims that require confirmation before publication.
     Each is a real FAQ question, so each needs its own honest placeholder
     rather than a shared one. See `unconfirmedClaims` below. --- */
  headphonePolicy: {
    id: 'headphonePolicy',
    state: 'coming-soon',
    label: 'Headphone policy coming soon',
    briefRef: '§13.5, §27',
    resolved: false,
  },
  prohibitedEquipment: {
    id: 'prohibitedEquipment',
    state: 'coming-soon',
    label: 'Equipment and animal policy coming soon',
    briefRef: '§13.5, §27',
    resolved: false,
  },
  medicalSupport: {
    id: 'medicalSupport',
    state: 'coming-soon',
    label: 'Course medical support details coming soon',
    briefRef: '§13.5, §27',
    resolved: false,
  },
  participantFood: {
    id: 'participantFood',
    state: 'coming-soon',
    label: 'Finish-line food details coming soon',
    briefRef: '§13.7, §27',
    resolved: false,
  },
} as const satisfies Record<string, PendingItem>

export type PendingId = keyof typeof pending

export function getPending(id: PendingId): PendingItem {
  return pending[id]
}

/** True when real content should render in place of the notice. */
export function isResolved(id: PendingId): boolean {
  return pending[id].resolved
}

export function allPending(): PendingItem[] {
  return Object.values(pending)
}

export function unresolvedPending(): PendingItem[] {
  return allPending().filter((item) => !item.resolved)
}

/**
 * Brief §27: these claims appeared in the ORIGINAL source content but must be
 * confirmed before being presented as fact. They are deliberately not rendered
 * anywhere on the site. Each is a real FAQ question, so each currently answers
 * with a Coming soon notice instead.
 *
 * Do not move anything out of this list without written confirmation from the
 * race team (§26.5, §26.6).
 */
export const unconfirmedClaims = [
  'The course is USATF-certified.',
  'The course has 10 aid stations with water and sports drinks.',
  'Ambulance and bicycle EMS teams provide course support.',
  'Headphones are allowed with safety precautions.',
  'Baby joggers, skateboards, bicycles and animals are prohibited.',
  'Participant food is restricted to registered participants.',
] as const
