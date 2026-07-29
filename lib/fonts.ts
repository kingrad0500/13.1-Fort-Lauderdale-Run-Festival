import { Fraunces, Barlow_Condensed, Manrope } from 'next/font/google'

/**
 * Three families, each with a narrow job. Brief §4 (revised, see §29.1).
 *
 * Fraunces          display — campaign headlines, page titles, section headlines
 * Barlow Condensed  numerics — start times, distances, prices, table figures
 * Manrope           everything operational — body, nav, buttons, labels, policies
 *
 * All self-hosted by next/font with latin subsets only, so there is no layout
 * shift and no third-party request.
 *
 * MEASURED payload: 199 KB across 5 files. Fraunces roman + italic dominate at
 * ~146 KB; Barlow Condensed is only ~29 KB for both weights. Note that the
 * implementation plan predicted Barlow Condensed would be the thing to subset
 * if the budget got tight — measurement showed the opposite, so the saving was
 * taken on the Fraunces axes instead (see below).
 */

export const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  // ONLY opsz — it lets large display sizes take a tighter, higher-contrast
  // cut, which is the axis that actually earns its bytes here.
  //
  // SOFT and WONK were requested initially and then dropped: measured at
  // 264 KB for Fraunces roman + italic, versus 146 KB with opsz alone. That is
  // 118 KB (37% of total font payload) for a difference invisible at display
  // sizes — verified by screenshot, not assumed. WONK 0 was the desired value
  // anyway, and it is Fraunces' default.
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const fontVariables = `${fraunces.variable} ${barlowCondensed.variable} ${manrope.variable}`
