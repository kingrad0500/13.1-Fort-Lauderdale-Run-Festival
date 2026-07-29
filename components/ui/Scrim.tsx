/**
 * Scrim for type set over photography. Brief §4 contrast, §16.
 *
 * WHY THE STOPS ARE IN PIXELS
 * A percentage ramp is anchored to the viewport, but the headline is anchored
 * to a fixed max-width content column (~896px). With percentage stops the
 * protected band drifts relative to the text, so a value tuned at 1440px fails
 * at 1024px and vice versa. That is measured, not guessed: gold fell to 2.31:1
 * at exactly the breakpoint where a lighter ramp took over, and moving the
 * breakpoint just moved the failure.
 *
 * Anchoring the dark band to the content column means narrow viewports sit
 * entirely inside it and are uniformly protected, while wide viewports let the
 * photograph open up to the right of the text. One rule, no breakpoints.
 *
 * These are real elements with inline gradients rather than CSS pseudo-elements
 * so there is no dependency on layer ordering or utility tree-shaking — an
 * earlier pseudo-element version silently painted below the image and dropped
 * every ratio to ~1.6:1.
 *
 * VERIFY WITH: scripts/check-contrast.mjs after changing any value here.
 */
export function Scrim({
  /**
   * `light` is for moving footage. The default values were tuned against a
   * BRIGHT photograph; this clip is dusk-lit and considerably darker, so the
   * same ramp crushes it. Measured headroom made this safe — the default was
   * landing gold at 6.31:1 worst-case across the whole clip, against a 3:1
   * floor, so there was room to give the footage back some life.
   * Re-measure with scripts/check-contrast.mjs after changing either set.
   */
  intensity = 'default',
}: {
  intensity?: 'default' | 'light'
} = {}) {
  const horizontal =
    intensity === 'light'
      ? 'linear-gradient(to right, rgb(16 35 62 / 0.86) 0px, rgb(16 35 62 / 0.66) 900px, rgb(16 35 62 / 0.12) 1500px)'
      : 'linear-gradient(to right, rgb(16 35 62 / 0.93) 0px, rgb(16 35 62 / 0.82) 900px, rgb(16 35 62 / 0.24) 1500px)'

  const vertical =
    intensity === 'light'
      ? 'linear-gradient(to top, rgb(16 35 62 / 0.68) 0%, rgb(16 35 62 / 0.16) 55%, rgb(16 35 62 / 0.26) 100%)'
      : 'linear-gradient(to top, rgb(16 35 62 / 0.78) 0%, rgb(16 35 62 / 0.28) 55%, rgb(16 35 62 / 0.38) 100%)'

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: horizontal }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: vertical }}
      />
    </>
  )
}
