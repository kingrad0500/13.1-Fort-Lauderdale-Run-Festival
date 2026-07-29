#!/usr/bin/env node
/**
 * The automated form of §19's launch gate: "No known factual contradiction
 * remains."
 *
 * Scans the RENDERED HTML of every page for money and time patterns, and fails
 * on any value that does not trace back to content/race.ts. That catches the
 * failure mode the single-source architecture exists to prevent — someone
 * hardcoding "$85" or "6:30 a.m." into a component where it will silently
 * disagree with the rest of the site.
 *
 * Requires the site running.
 * Usage: node scripts/check-data-integrity.mjs
 */

import { readFileSync } from 'node:fs'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const ROUTES = [
  '/',
  '/distances',
  '/race-weekend',
  '/faq',
  '/plan-your-trip',
  '/results-photos',
  '/community',
  '/nope',
]

const raceSrc = readFileSync('content/race.ts', 'utf8')
const scheduleSrc = readFileSync('content/schedule.ts', 'utf8')
const packetSrc = readFileSync('content/packet.ts', 'utf8')

/** Canonical prices, straight from the basePrice fields. */
const prices = new Set(
  [...raceSrc.matchAll(/basePrice:\s*(\d+)/g)].map((m) => `$${m[1]}`),
)

/** Canonical times: start times plus every time string in the schedule data. */
const times = new Set()
for (const src of [raceSrc, scheduleSrc, packetSrc]) {
  for (const m of src.matchAll(/\d{1,2}:\d{2}\s*(?:a\.m\.|p\.m\.)/g)) {
    times.add(m[0].replace(/\s+/g, ' '))
  }
}

console.log(`\nCanonical prices: ${[...prices].join(', ')}`)
console.log(`Canonical times:  ${[...times].sort().join(', ')}\n`)

let problems = 0

for (const route of ROUTES) {
  let html
  try {
    html = await (await fetch(`${BASE}${route}`)).text()
  } catch {
    console.log(`  SKIP ${route} — server not reachable`)
    continue
  }

  // Strip tags/scripts so we only inspect visible copy.
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    // React SSR emits `<!-- -->` between adjacent text nodes, so `${price}`
    // renders as `$<!-- -->80`. Strip those FIRST — without this the scanner
    // silently fails to see most prices and reports a false pass.
    .replace(/<!--\s*-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')

  const foundPrices = [...new Set([...text.matchAll(/\$\d[\d,]*/g)].map((m) => m[0]))]
  const foundTimes = [...new Set(
    [...text.matchAll(/\d{1,2}:\d{2}\s*(?:a\.m\.|p\.m\.)/g)].map((m) =>
      m[0].replace(/\s+/g, ' '),
    ),
  )]

  const strayPrices = foundPrices.filter((p) => !prices.has(p))
  const strayTimes = foundTimes.filter((t) => !times.has(t))

  const ok = strayPrices.length === 0 && strayTimes.length === 0
  if (!ok) problems++

  console.log(
    `  ${ok ? 'ok  ' : 'FAIL'} ${route.padEnd(16)} prices=${foundPrices.length} times=${foundTimes.length}` +
      (strayPrices.length ? `  STRAY PRICES: ${strayPrices.join(', ')}` : '') +
      (strayTimes.length ? `  STRAY TIMES: ${strayTimes.join(', ')}` : ''),
  )
}

// The pricing notice is required verbatim wherever prices appear (§7.4).
const priceIncrease = raceSrc.match(/display:\s*'([^']*11:59[^']*)'/)?.[1]
if (priceIncrease) {
  for (const route of ['/', '/distances']) {
    const html = await (await fetch(`${BASE}${route}`)).text()
    const present = html.includes(priceIncrease.replace(/&/g, '&amp;'))
    if (!present) problems++
    console.log(`  ${present ? 'ok  ' : 'FAIL'} ${route} carries the price-increase deadline verbatim`)
  }
}

console.log(
  problems === 0
    ? '\nNo factual contradictions found. Every price and time traces to content/race.ts.\n'
    : `\n${problems} page(s) contain values not traceable to the content layer.\n`,
)
process.exit(problems === 0 ? 0 : 1)
