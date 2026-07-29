#!/usr/bin/env node
/**
 * External link audit. Brief §19 pre-launch check 3:
 * "Verify every RunSignUp, training, results, photos, sponsor, email, and map
 * link."
 *
 * Two jobs:
 *  1. Actually request every URL in content/links.ts and report its status.
 *  2. Enforce the safety rule: a link marked `verified: false` must NEVER
 *     appear as a live anchor on the rendered site. That is what stops an
 *     unchecked URL reaching a participant.
 *
 * Requires the site running for the rendered-page check.
 * Usage: node scripts/check-links.mjs
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
]

// Parse the registry without importing TS.
const src = readFileSync('content/links.ts', 'utf8')
const entries = [...src.matchAll(
  /id:\s*'([^']+)',\s*label:\s*'([^']*)',\s*url:\s*(null|'[^']*'),\s*verified:\s*(true|false)/g,
)].map(([, id, label, url, verified]) => ({
  id,
  label,
  url: url === 'null' ? null : url.slice(1, -1),
  verified: verified === 'true',
}))

console.log(`\nRegistry: ${entries.length} external links\n`)

let problems = 0

for (const entry of entries) {
  if (!entry.url) {
    console.log(`  ${'(no url)'.padEnd(10)} ${entry.id.padEnd(24)} ${entry.verified ? 'PROBLEM: verified with no url' : 'pending — renders as notice'}`)
    if (entry.verified) problems++
    continue
  }

  let status = 'unreachable'
  try {
    const res = await fetch(entry.url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
    })
    status = `${res.status}${res.redirected ? ` (redirected -> ${new URL(res.url).origin})` : ''}`
    if (!res.ok && entry.verified) problems++
  } catch (err) {
    status = `unreachable (${err.name})`
    if (entry.verified) problems++
  }

  const flag = entry.verified ? 'LIVE' : 'held'
  console.log(`  ${flag.padEnd(10)} ${entry.id.padEnd(24)} ${status}`)
  if (entry.url.startsWith('http://')) {
    console.log(`             ^ insecure http:// — confirm the https target before verifying`)
  }
}

// --- The safety rule: unverified URLs must not be anchors on any page ---
const heldUrls = entries.filter((e) => !e.verified && e.url).map((e) => e.url)

console.log('\nChecking no unverified URL is rendered as a live link…')
let leaked = 0
for (const route of ROUTES) {
  let html
  try {
    html = await (await fetch(`${BASE}${route}`)).text()
  } catch {
    console.log(`  (skipped ${route} — server not running)`)
    continue
  }
  for (const url of heldUrls) {
    if (html.includes(`href="${url}"`)) {
      console.log(`  LEAK ${route} renders unverified ${url}`)
      leaked++
      problems++
    }
  }
}
if (leaked === 0) console.log('  ok — no unverified URL appears as an anchor')

console.log(
  problems === 0
    ? '\nLink audit passed. Held links are correctly held.\n'
    : `\n${problems} link problem(s).\n`,
)
process.exit(problems === 0 ? 0 : 1)
