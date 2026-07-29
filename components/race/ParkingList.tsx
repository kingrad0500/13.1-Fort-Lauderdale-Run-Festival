import {
  parkingLocations,
  allParkingVerified,
  totalProposedSpaces,
} from '@/content/parking'
import { InlineNotice } from '@/components/ui/StatusNotice'

/**
 * Parking comparison. Brief §10.5.
 *
 * §10.5: "Present the five parking locations in a sortable list or compact
 * map-supported layout… Prefer a comparison list to a large card grid." So this
 * is a list, not cards — people are comparing distance-to-start against
 * capacity, and a grid makes that harder.
 *
 * EVERY RECORD IS UNVERIFIED (client action item 7). The brief itself calls
 * this data "proposed" and §19 requires verification before publication. The
 * notice is shown ABOVE the list rather than tucked underneath, because
 * somebody planning a 4:30 a.m. arrival needs to know the numbers are not yet
 * confirmed before they read them — not after.
 *
 * §16: comparison tables become accessible stacked rows. Same two-rendering
 * approach as ComparisonTable, for the same reason.
 */
export function ParkingList() {
  const verified = allParkingVerified()

  return (
    <div>
      {!verified && (
        <InlineNotice className="mb-6">
          Addresses, capacities and walking distances are being confirmed with
          the city — check back before race weekend.
        </InlineNotice>
      )}

      {/* Wide: real table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Parking locations near the start, with capacity and walking distance.
          </caption>
          <thead>
            <tr className="border-b-2 border-navy/15">
              <th scope="col" className="eyebrow py-4 pr-4 text-navy/55">
                Location
              </th>
              <th scope="col" className="eyebrow py-4 pr-4 text-navy/55">
                Address
              </th>
              <th scope="col" className="eyebrow py-4 pr-4 text-navy/55">
                Spaces
              </th>
              <th scope="col" className="eyebrow py-4 text-navy/55">
                To start
              </th>
            </tr>
          </thead>
          <tbody>
            {parkingLocations.map((lot) => (
              <tr key={lot.id} className="border-b border-navy/10">
                <th
                  scope="row"
                  className="py-5 pr-4 font-sans text-base font-bold text-navy"
                >
                  {lot.name}
                </th>
                <td className="py-5 pr-4 font-sans text-[0.9375rem] text-navy/70">
                  {lot.address}
                </td>
                <td className="py-5 pr-4 font-numeric text-lg text-navy/80">
                  {lot.capacity}
                </td>
                <td className="py-5 font-numeric text-lg text-navy">
                  {lot.distanceToStart} mi
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Narrow: stacked rows */}
      <ul className="md:hidden">
        {parkingLocations.map((lot) => (
          <li key={lot.id} className="border-b border-navy/10 py-5 first:border-t">
            <h3 className="font-sans text-base font-bold text-navy">{lot.name}</h3>
            <p className="mt-1 font-sans text-[0.9375rem] leading-relaxed text-navy/70">
              {lot.address}
            </p>
            <dl className="mt-3 flex gap-8">
              <div>
                <dt className="eyebrow text-navy/50">Spaces</dt>
                <dd className="mt-1 font-numeric text-base text-navy/80">
                  {lot.capacity}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-navy/50">To start</dt>
                <dd className="mt-1 font-numeric text-base text-navy">
                  {lot.distanceToStart} mi
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <p className="mt-6 font-sans text-sm text-navy/60">
        {totalProposedSpaces.toLocaleString()} spaces across five locations
        {!verified && ' (proposed)'}.
      </p>
    </div>
  )
}
