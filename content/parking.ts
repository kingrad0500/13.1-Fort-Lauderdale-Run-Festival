/**
 * Parking. Brief §10.5.
 *
 * ===========================================================================
 * ALL FIVE RECORDS ARE UNVERIFIED. Client action item 7.
 *
 * The brief itself describes this data as "proposed" and requires verification
 * before publication (§10.5, §19 pre-launch check 1). Addresses, capacities and
 * distances-to-start have NOT been confirmed by the race team.
 *
 * `verified: false` makes the UI show a "details being confirmed" notice
 * alongside the list, so nobody plans race morning around an unchecked number.
 * Flip each record to true as it is confirmed.
 * ===========================================================================
 */

export interface ParkingLocation {
  id: string
  name: string
  address: string
  /** Number of spaces. Proposed, not confirmed. */
  capacity: number
  /** Walking distance to the start, in miles. Proposed, not confirmed. */
  distanceToStart: number
  verified: boolean
}

export const parkingLocations: ParkingLocation[] = [
  {
    id: 'las-olas-garage',
    name: 'Las Olas Parking Garage',
    address: '200 Las Olas Circle, Fort Lauderdale, FL 33316',
    capacity: 650,
    distanceToStart: 0.2,
    verified: false,
  },
  {
    id: 'las-olas-e-lot',
    name: 'Las Olas E Lot',
    address: 'S. Birch Road, immediately north of Las Olas',
    capacity: 140,
    distanceToStart: 0.1,
    verified: false,
  },
  {
    id: 'beach-place',
    name: 'Beach Place Lot',
    address: '17 S. Fort Lauderdale Beach Boulevard, Fort Lauderdale, FL 33316',
    capacity: 200,
    distanceToStart: 0.2,
    verified: false,
  },
  {
    id: 'sebastian-beach',
    name: 'Sebastian Beach Lot',
    address: 'Sebastian Street and A1A',
    capacity: 80,
    distanceToStart: 0.4,
    verified: false,
  },
  {
    id: 'south-beach',
    name: 'South Beach Lot',
    address: '1100 Seabreeze Boulevard, Fort Lauderdale, FL 33316',
    capacity: 400,
    distanceToStart: 0.4,
    verified: false,
  },
]

/** True only when every record has been confirmed by the race team. */
export function allParkingVerified(): boolean {
  return parkingLocations.every((lot) => lot.verified)
}

export const totalProposedSpaces = parkingLocations.reduce(
  (sum, lot) => sum + lot.capacity,
  0,
)

/** Brief §10.5: lead with these. */
export const parkingGuidance = [
  'Arrive early.',
  'Carpooling is recommended.',
  'Road closures are managed by police and race crews.',
] as const

/** Brief §10.7. */
export const raceMorningChecklist = [
  'Registration complete',
  'Packet collected',
  'Bib prepared',
  'Parking selected',
  'Arrival time planned',
  'Weather checked',
  'Emergency contact completed',
] as const
