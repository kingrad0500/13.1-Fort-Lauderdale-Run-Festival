import { Button, TextAction } from '@/components/ui/Button'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { RegisterButton } from '@/components/ui/RegisterButton'

/**
 * Brief §19: "Provide a useful custom 404 page with links to Race Weekend,
 * Distances, FAQ, and RunSignUp." All four are here.
 */
export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[60vh] flex-col justify-center py-24">
      <EyebrowLabel>Page not found</EyebrowLabel>

      <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-navy">
        You&rsquo;ve wandered{' '}
        <span className="italic text-blue">off course.</span>
      </h1>

      <p className="measure mt-6 font-sans text-lg text-navy/75">
        That page doesn&rsquo;t exist — but the race still does. Here is
        everything you were probably looking for.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <RegisterButton source="not-found" size="lg" />
        <Button href="/distances" variant="secondary" size="lg">
          Choose Your Race
        </Button>
      </div>

      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2">
        <li>
          <TextAction href="/race-weekend">Race Weekend</TextAction>
        </li>
        <li>
          <TextAction href="/distances">Distances</TextAction>
        </li>
        <li>
          <TextAction href="/faq">FAQ</TextAction>
        </li>
        <li>
          <TextAction href="/">Home</TextAction>
        </li>
      </ul>
    </section>
  )
}
