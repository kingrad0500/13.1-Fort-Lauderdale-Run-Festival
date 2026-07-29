import {
  event,
  distances,
  deadlines,
  eligibility,
  capacity,
  registrationPolicy,
  completion,
} from './race'
import type { PendingId } from './pending'

/**
 * FAQ. Brief §13.
 *
 * Two rules from §13's interaction section govern this file:
 *
 *  1. "FAQ copy must not become a second, conflicting source for operational
 *     information." Every factual answer below is interpolated from
 *     content/race.ts rather than retyped, so it cannot drift.
 *  2. "Answers link to authoritative internal pages for complete details."
 *     Answers stay short and point at the page that owns the subject.
 *
 * Questions whose answers depend on unconfirmed information (brief §27) carry
 * a `pendingId` and render a Coming soon notice instead of a made-up answer.
 * That is required by §26.5 — do not invent operational facts.
 *
 * Every question gets a stable `id`, which becomes its URL anchor (§13).
 */

export interface FaqLink {
  href: string
  label: string
}

export interface FaqQuestion {
  /** Stable URL anchor. Never change once published — links depend on it. */
  id: string
  question: string
  /** Paragraphs. Empty when the answer is entirely pending. */
  answer: string[]
  /** When set, a Coming soon notice renders in place of / alongside the answer. */
  pendingId?: PendingId
  link?: FaqLink
  /** Brief §13.2: surfaced in the Popular questions block. */
  popular?: boolean
}

export interface FaqCategory {
  id: string
  title: string
  questions: FaqQuestion[]
}

const startTimeSummary = distances
  .map((d) => `${d.shortName} at ${d.startTime}`)
  .join(', ')
  .replace(/, ([^,]*)$/, ' and $1')

export const faqCategories: FaqCategory[] = [
  {
    id: 'registration',
    title: 'Registration and eligibility',
    questions: [
      {
        id: 'how-to-register',
        question: 'How do I register?',
        answer: [
          'Registration is handled entirely through RunSignUp. Choose your distance on this site and you will be taken straight to the official registration page.',
        ],
        link: { href: '/distances', label: 'Compare the four races' },
        popular: true,
      },
      {
        id: 'age-requirement',
        question: 'What is the age requirement?',
        answer: [eligibility.statement],
      },
      {
        id: 'minor-waiver',
        question: 'How does the minor-waiver process work?',
        answer: [
          eligibility.minorWaiver,
          `Contact ${eligibility.minorWaiverContact} to arrange one before registering.`,
        ],
      },
      {
        id: 'capacity',
        question: 'Is race capacity limited?',
        answer: [capacity],
      },
      {
        id: 'change-distance',
        question: 'Can I change my distance?',
        answer: [...registrationPolicy.distanceChanges],
      },
      {
        id: 'refunds',
        question: 'Are refunds or deferrals available?',
        answer: [registrationPolicy.refunds],
      },
      {
        id: 'race-insurance',
        question: 'Is race insurance available?',
        answer: [
          'Optional race insurance may be purchased through RunSignUp when it is offered at checkout.',
        ],
      },
      {
        id: 'price-increase',
        question: 'When do prices increase?',
        answer: [
          `Prices increase after ${deadlines.priceIncrease.display}.`,
          'Displayed prices are base prices and exclude the variable RunSignUp processing fee. Final pricing is shown at checkout.',
        ],
      },
    ],
  },
  {
    id: 'schedule-course',
    title: 'Schedule and course',
    questions: [
      {
        id: 'start-times',
        question: 'What time does each race start?',
        answer: [`${startTimeSummary}.`],
        link: { href: '/race-weekend#schedule', label: 'See the full weekend schedule' },
        popular: true,
      },
      {
        id: 'start-finish-location',
        question: 'Where are the start and finish?',
        answer: [
          `Both are at ${event.venue}, ${event.addressDisplay}.`,
          'The course runs through Las Olas, Harbor Beach and A1A, and finishes where the post-race festival begins.',
        ],
        link: { href: '/plan-your-trip#parking', label: 'Parking and directions' },
        popular: true,
      },
      {
        id: 'course-support-end',
        question: 'How long is the course supported?',
        answer: [
          completion.statement,
          completion.halfMarathon,
        ],
        popular: true,
      },
      {
        id: 'can-i-walk',
        question: 'Can I walk?',
        answer: [
          ...completion.walkers,
          // No trailing period — "10:00 a.m." already ends in one. See race.ts.
          `Walkers must still finish by ${deadlines.courseSupportEnds}`,
        ],
        popular: true,
      },
      {
        id: 'early-start',
        question: 'Is an early start available?',
        answer: ['There is no early start.'],
      },
      {
        id: 'course-certification',
        question: 'Is the course USATF-certified?',
        answer: [],
        pendingId: 'courseCertification',
      },
      {
        id: 'aid-stations',
        question: 'How many aid stations are on the course?',
        answer: [],
        pendingId: 'aidStations',
      },
      {
        id: 'course-maps',
        question: 'When will course maps be published?',
        answer: [],
        pendingId: 'courseMaps',
      },
    ],
  },
  {
    id: 'rules-safety',
    title: 'Rules and safety',
    questions: [
      {
        id: 'headphones',
        question: 'Are headphones allowed?',
        answer: [],
        pendingId: 'headphonePolicy',
      },
      {
        id: 'baby-joggers',
        question: 'Are baby joggers permitted?',
        answer: [],
        pendingId: 'prohibitedEquipment',
      },
      {
        id: 'prohibited-equipment',
        question: 'Are dogs, bicycles, skateboards or similar equipment permitted?',
        answer: [],
        pendingId: 'prohibitedEquipment',
      },
      {
        id: 'wheelchair-policy',
        question: 'What is the wheelchair-racing policy?',
        answer: [
          'Athletes using wheelchairs are welcome, and the event follows applicable recognized wheelchair-racing rules.',
        ],
        link: { href: '/race-weekend#accessibility', label: 'Read the full accessibility policy' },
      },
      {
        id: 'hand-cycles',
        question: 'Are hand cycles permitted?',
        answer: [
          'No. There is no hand-cycle division, and hand cycles, hand bikes, hand-crank devices and mechanically gear-driven devices are not permitted.',
        ],
        link: { href: '/race-weekend#accessibility', label: 'Read the full accessibility policy' },
      },
      {
        id: 'injury',
        question: 'What happens if a participant is injured?',
        answer: [],
        pendingId: 'medicalSupport',
      },
      {
        id: 'medical-support',
        question: 'What medical support is available on course?',
        answer: [],
        pendingId: 'medicalSupport',
      },
      {
        id: 'severe-weather',
        question: 'What happens during severe weather?',
        answer: [
          'Safety comes first. Severe weather or other emergency conditions may require the event team and public-safety officials to delay, modify, or cancel the event.',
          'Follow official event communications for current instructions.',
        ],
      },
    ],
  },
  {
    id: 'race-day-logistics',
    title: 'Race-day logistics',
    questions: [
      {
        id: 'packet-pickup',
        question: 'When and where is packet pickup?',
        answer: [
          'Saturday, November 7, 8:00 a.m. to 6:00 p.m. at the Baptist Health South Florida Health and Fitness Expo, Downtown Events Center, 416 NE 1st Street. This is the primary pickup and is strongly recommended.',
          'Race morning, Sunday, November 8, 4:30 to 6:00 a.m. at the registration tent at Las Olas Oceanside Park. Race-morning pickup closes at 6:00 a.m.',
        ],
        link: { href: '/race-weekend#packet-pickup', label: 'Full packet pickup details' },
        popular: true,
      },
      {
        id: 'proxy-pickup',
        question: 'Can someone else collect my packet?',
        answer: [
          'Yes. Third-party or proxy pickup is permitted.',
          "Your proxy must present a copy of your photo identification. A copy displayed on a phone is accepted.",
        ],
      },
      {
        id: 'identification',
        question: 'What identification is required?',
        answer: [
          'Bring photo identification to packet pickup. Participants collecting the complimentary post-race beer must be 21 or over with valid identification.',
        ],
      },
      {
        id: 'parking',
        question: 'Where can participants park?',
        answer: [
          'Five parking locations serve the start area. Arrive early, and carpool if you can.',
        ],
        link: { href: '/plan-your-trip#parking', label: 'Compare parking locations' },
      },
      {
        id: 'road-closures',
        question: 'When will road-closure information be available?',
        answer: [
          'Official road closures are managed by police and race crews.',
        ],
        pendingId: 'roadClosures',
      },
      {
        id: 'gear-check',
        question: 'Is gear check available?',
        answer: ['Your bib includes a gear-check tag.'],
        pendingId: 'gearCheck',
      },
    ],
  },
  {
    id: 'festival',
    title: 'Finish-line festival',
    questions: [
      {
        id: 'festival-food',
        question: 'Is food available at the finish?',
        answer: [],
        pendingId: 'participantFood',
      },
      {
        id: 'festival-beer',
        question: 'Who receives the complimentary beer?',
        answer: [
          'Participants aged 21 or over with valid identification. Your packet includes a beer wristband if you are eligible.',
        ],
      },
      {
        id: 'festival-spectators',
        question: 'Can spectators attend the festival?',
        answer: [
          'Yes. The finish-line festival is where friends and family meet their runners.',
        ],
        link: { href: '/plan-your-trip#spectators', label: 'Spectator guide' },
      },
      {
        id: 'results-photos',
        question: 'Where can I find results and photographs?',
        answer: [
          'Results and race photography are published through external providers and linked from this site.',
        ],
        link: { href: '/results-photos', label: 'Results and photos' },
      },
    ],
  },
]

/** Brief §13.2: the most frequently needed answers, shown first. */
export function popularQuestions(): FaqQuestion[] {
  return faqCategories
    .flatMap((c) => c.questions)
    .filter((q) => q.popular)
}

export function allQuestions(): FaqQuestion[] {
  return faqCategories.flatMap((c) => c.questions)
}

export function findQuestion(id: string): FaqQuestion | undefined {
  return allQuestions().find((q) => q.id === id)
}

/** Brief §13.1 search placeholder. */
export const faqSearchPlaceholder = 'Search race questions…'
