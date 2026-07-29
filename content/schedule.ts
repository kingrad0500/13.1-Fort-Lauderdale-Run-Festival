/**
 * Race weekend schedule. Brief §8.3 and §21.
 *
 * Brief §8.3: "The schedule is static and must not use automatic animation."
 * Brief §25: critical schedules must remain stationary and readable.
 *
 * NOTE (brief §21, §26.3): RunSignUp currently shows November 8 for the expo.
 * That date is incorrect. November 7 is the approved expo date, and a confirmed
 * event-team correction overrides RunSignUp.
 */

export interface ScheduleEntry {
  /** Display time, e.g. "6:15 a.m." or "8:00 a.m.–6:00 p.m." */
  time: string
  title: string
  detail?: string
  /** Marks the entries the homepage snapshot shows. Brief §7.9. */
  inSnapshot?: boolean
}

export interface ScheduleDay {
  date: string
  dateDisplay: string
  dayName: string
  entries: ScheduleEntry[]
}

export const schedule: ScheduleDay[] = [
  {
    date: '2026-11-07',
    dateDisplay: 'Saturday, November 7, 2026',
    dayName: 'Saturday',
    entries: [
      {
        time: '8:00 a.m.–6:00 p.m.',
        title: 'Baptist Health South Florida Health and Fitness Expo',
        detail:
          'Primary packet pickup. Downtown Events Center, 416 NE 1st Street, Fort Lauderdale, FL 33301.',
        inSnapshot: true,
      },
    ],
  },
  {
    date: '2026-11-08',
    dateDisplay: 'Sunday, November 8, 2026',
    dayName: 'Sunday',
    entries: [
      {
        time: '4:30–6:00 a.m.',
        title: 'Race-morning registration and packet pickup',
        detail: 'Registration tent at Las Olas Oceanside Park.',
        inSnapshot: true,
      },
      {
        time: '6:15 a.m.',
        title: 'Half Marathon and Relay start',
        inSnapshot: true,
      },
      {
        time: '7:00 a.m.',
        title: '10K and 5K start',
      },
      {
        time: '7:00 a.m.',
        title: 'Post-race festival opens',
        inSnapshot: true,
      },
      {
        time: '10:00 a.m.',
        title: 'Course support ends',
        detail: 'All four events must be completed by this time.',
        inSnapshot: true,
      },
    ],
  },
]

/** Brief §7.9: the homepage shows only the essential schedule. */
export function snapshotEntries(): Array<ScheduleEntry & { dayName: string }> {
  return schedule.flatMap((day) =>
    day.entries
      .filter((entry) => entry.inSnapshot)
      .map((entry) => ({ ...entry, dayName: day.dayName })),
  )
}
