#!/usr/bin/env node
/**
 * Responsive screenshot capture for design and accessibility review.
 *
 * website-plan.md §10 requires every page checked at 375 / 768 / 1024 / 1440 /
 * 1920, and lifecycle modes captured in each state. This is the tool for that.
 *
 * Usage:
 *   node scripts/screenshot.mjs                      all breakpoints, homepage
 *   node scripts/screenshot.mjs /distances           a specific route
 *   node scripts/screenshot.mjs / 1440               one width
 *
 * Requires the site to be running (npm run dev, or npm run build && npm start).
 */

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = '.screenshots'

const route = process.argv[2] ?? '/'
const only = process.argv[3] ? Number(process.argv[3]) : null
/** FULL=1 captures the whole scrollable page instead of one viewport. */
const fullPage = process.env.FULL === '1'

const breakpoints = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1024, height: 900 },
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'wide', width: 1920, height: 1200 },
]

const targets = only ? breakpoints.filter((b) => b.width === only) : breakpoints

await mkdir(OUT, { recursive: true })

// Prefer the locally installed Chrome so this works without downloading a
// separate Playwright browser bundle. Falls back to the bundled Chromium.
let browser
try {
  browser = await chromium.launch({ channel: 'chrome' })
} catch {
  browser = await chromium.launch()
}

const slug = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '')

for (const bp of targets) {
  const page = await browser.newPage({
    viewport: { width: bp.width, height: bp.height },
    deviceScaleFactor: 2,
  })
  await page.goto(`${BASE}${route}`, { waitUntil: 'load', timeout: 60_000 })

  // Deterministic waits rather than networkidle, which does not settle here.
  //
  // Both waits are bounded. next/image lazy-loads anything below the fold, so
  // those images never fire load in a viewport-sized capture — waiting on them
  // unconditionally hangs forever.
  await page.evaluate(() => document.fonts.ready.then(() => undefined))

  if (fullPage) {
    // Scroll through the page so lazy images actually request, then settle.
    await page.evaluate(async () => {
      const step = window.innerHeight
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
    })
  }

  await page.evaluate(async () => {
    const pending = Array.from(document.images).filter(
      (img) => !img.complete && img.loading !== 'lazy',
    )
    await Promise.race([
      Promise.all(
        pending.map(
          (img) => new Promise((res) => { img.onload = img.onerror = res }),
        ),
      ),
      new Promise((res) => setTimeout(res, 5000)),
    ])
  })
  await page.waitForTimeout(500)

  const path = `${OUT}/${slug}-${bp.name}-${bp.width}.png`
  await page.screenshot({ path, fullPage })
  console.log(`  ${path}`)

  // Horizontal overflow check — §16 forbids horizontal page scrolling.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  if (overflow) console.log(`    WARNING: horizontal overflow at ${bp.width}px`)

  await page.close()
}

await browser.close()
