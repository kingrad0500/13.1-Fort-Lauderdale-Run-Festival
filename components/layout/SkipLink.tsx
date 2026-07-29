/**
 * Brief §16: include a "Skip to main content" link for keyboard users.
 * Visually hidden until focused, then clearly visible.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:left-4 focus:top-4 focus:z-[100]
        focus:rounded-[var(--radius-pill)] focus:bg-navy focus:px-6 focus:py-3
        focus:font-sans focus:text-sm focus:font-bold focus:text-sand
        focus:shadow-[var(--shadow-raised)]
      "
    >
      Skip to main content
    </a>
  )
}
