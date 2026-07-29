import Link from 'next/link'
import { event } from '@/content/race'
import { primaryNav, footerUtilityLinks } from '@/content/navigation'
import { SponsorMarquee } from '@/components/race/SponsorMarquee'
import { getPending } from '@/content/pending'
import { RegisterButton } from '@/components/ui/RegisterButton'

/**
 * Brief §14 footer. "Remains readable and useful without becoming another
 * full sitemap" — so: primary nav, a short utility column, registration,
 * contact, and a restrained sponsor acknowledgement. Nothing more.
 *
 * Social links and legal pages are pending (client action items 9 and 16) and
 * render as honest notices rather than dead links (§19).
 */
export function Footer() {
  const social = getPending('socialAccounts')
  const legal = getPending('legalPages')

  return (
    <footer className="mt-24 bg-navy text-sand surface-inverse">
      <div className="page-shell pb-0 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Identity */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-numeric text-4xl leading-none text-gold">13.1</span>
              <span className="font-sans text-sm font-bold leading-tight text-sand">
                FORT
                <br />
                LAUDERDALE
              </span>
            </div>
            <p className="measure mt-5 font-sans text-sm leading-relaxed text-sand/75">
              A beautiful, energetic race along Fort Lauderdale&rsquo;s most iconic
              streets and coastline — welcoming serious runners, first-timers,
              families, relay teams, locals and visitors.
            </p>
            <p className="mt-5 font-numeric text-lg text-gold">
              {event.dateShort}
            </p>
            <p className="font-sans text-sm text-sand/75">
              {event.venue}
              <br />
              {event.addressDisplay}
            </p>
          </div>

          {/* Primary navigation */}
          <nav aria-label="Footer">
            <h2 className="eyebrow text-sand/60">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-sand/80 hover:text-sand hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Utility */}
          <nav aria-label="Race information">
            <h2 className="eyebrow text-sand/60">Race information</h2>
            <ul className="mt-4 space-y-2.5">
              {footerUtilityLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-sand/80 hover:text-sand hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Register + contact */}
          <div>
            <h2 className="eyebrow text-sand/60">Register</h2>
            <RegisterButton source="footer" className="mt-4" />

            <h2 className="eyebrow mt-8 text-sand/60">Contact</h2>
            <a
              href={`mailto:${event.contactEmail}`}
              className="mt-2 inline-flex min-h-[44px] items-center font-sans text-sm text-sand/80 underline underline-offset-4 hover:text-sand"
            >
              {event.contactEmail}
            </a>

            <h2 className="eyebrow mt-8 text-sand/60">Follow</h2>
            <p className="mt-3 font-sans text-sm text-sand/60">{social.label}</p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <h2 className="eyebrow text-center text-sand/60">
            With thanks to our partners
          </h2>
        </div>
      </div>

      {/* Restrained sponsor acknowledgement (§7.10, §12.3).
          Sits OUTSIDE the padded page-shell so the strip runs edge to edge and
          logos fade at the viewport rather than being cut at the gutter.
          Runs in the opposite direction to the strip below the hero, so two
          marquees on one page read as a deliberate pair rather than the same
          component pasted twice. */}
      <div className="mt-8">
        <SponsorMarquee
          surface="navy"
          reverse
          label="partner logos in the footer"
        />
      </div>

      <div className="page-shell">
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pb-16 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-sand/55">
            © {new Date().getFullYear()} {event.name}. All rights reserved.
          </p>
          <p className="font-sans text-xs text-sand/55">{legal.label}</p>
        </div>
      </div>
    </footer>
  )
}
