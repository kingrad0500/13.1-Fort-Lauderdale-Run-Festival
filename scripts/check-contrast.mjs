#!/usr/bin/env node
/**
 * Measures REAL rendered contrast for text set over photography.
 *
 * Brief §16 requires body text at 4.5:1 and large text / UI at 3:1. Flat
 * colour pairings are settled in brief §4's matrix, but type over a photograph
 * cannot be checked from a table — it depends on the image, the scrim, and the
 * viewport width all at once.
 *
 * Method: hide the text node, screenshot exactly its bounding box, and take
 * the BRIGHTEST backdrop pixel in that box. Worst-case, not average — an
 * average hides a blown highlight sitting behind two letters.
 *
 * This caught a real failure the eye did not: gold at 2.34:1 in the hero, and
 * later a scrim that silently painted below the image and dropped everything
 * to ~1.6:1.
 *
 * Usage:  node scripts/check-contrast.mjs        (requires the site running)
 * Exits non-zero if anything fails, so it can gate a release.
 */

import { chromium } from 'playwright'
import sharp from 'sharp'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'

const channel = (c) => {
  c /= 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}
const luminance = (r, g, b) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
const contrast = (a, b) =>
  (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)

/** Foreground colours actually used over media. Brief §4. */
const FOREGROUNDS = {
  sand: luminance(246, 240, 230), // #F6F0E6
  gold: luminance(255, 200, 87), // #FFC857
}

/** 3:1 is the AA floor for large text; every target here is display-sized. */
const FLOOR = 3

const TARGETS = [
  { route: '/', label: 'home hero', selector: 'h1' },
  { route: '/', label: 'home final', selector: 'section:last-of-type h2' },
  { route: '/distances', label: 'distances', selector: 'h1' },
  { route: '/race-weekend', label: 'weekend', selector: 'h1' },
  { route: '/faq', label: 'faq', selector: 'h1' },
  { route: '/plan-your-trip', label: 'plan-trip', selector: 'h1' },
  { route: '/results-photos', label: 'results', selector: 'h1' },
  { route: '/community', label: 'community', selector: 'h1' },
]

const WIDTHS = [375, 414, 768, 1024, 1280, 1440, 1920]

const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch())
let failures = 0

console.log('\nMeasuring worst-case backdrop contrast for text over media\n')

for (const width of WIDTHS) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    deviceScaleFactor: 1,
  })

  for (const target of TARGETS) {
    await page.goto(`${BASE}${target.route}`, { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready.then(() => undefined))

    const el = page.locator(target.selector).first()
    if ((await el.count()) === 0) continue

    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(700)

    const box = await el.boundingBox()
    if (!box) continue

    await el.evaluate((n) => { n.style.visibility = 'hidden' })
    await page.waitForTimeout(150)
    const shot = await page.screenshot({ clip: box })
    await el.evaluate((n) => { n.style.visibility = '' })

    const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true })
    let brightest = 0
    for (let i = 0; i < data.length; i += info.channels) {
      const L = luminance(data[i], data[i + 1], data[i + 2])
      if (L > brightest) brightest = L
    }

    const results = Object.entries(FOREGROUNDS).map(([name, fg]) => {
      const ratio = contrast(fg, brightest)
      const pass = ratio >= FLOOR
      if (!pass) failures++
      return `${name} ${ratio.toFixed(2)}:1 ${pass ? 'ok' : 'FAIL'}`
    })

    console.log(
      `  ${String(width).padEnd(6)} ${target.label.padEnd(10)} ${results.join('   ')}`,
    )
  }

  await page.close()
}

await browser.close()

if (failures > 0) {
  console.log(`\n${failures} failure(s) below the ${FLOOR}:1 large-text floor.\n`)
  process.exit(1)
}
console.log(`\nAll pass the ${FLOOR}:1 large-text floor.\n`)
