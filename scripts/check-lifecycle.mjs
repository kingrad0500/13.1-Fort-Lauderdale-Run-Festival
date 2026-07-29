#!/usr/bin/env node
/**
 * Validates the four lifecycle modes and the emergency banner.
 * Brief §19 pre-launch checks 8 and 9.
 *
 * Pages are statically prerendered, so the mode is resolved at BUILD time.
 * This therefore builds once per mode, serves it, and asserts on the HTML.
 * Slow by nature — it is a pre-launch gate, not a watch task.
 *
 * §17 requires the emergency banner be independent of mode, so the last case
 * raises a banner while in registration mode and checks both are present.
 *
 * Usage: node scripts/check-lifecycle.mjs
 */

import { execSync, spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const PORT = 3111
const BASE = `http://localhost:${PORT}`

/** Each case: env, and assertions as [label, mustAppear, route]. */
const CASES = [
  {
    name: 'registration',
    env: { EVENT_MODE: 'registration' },
    expect: [
      ['price-increase notice', 'prices increase on October 2', '/'],
      ['registration CTA present', 'Register on RunSignUp', '/'],
      ['results: before-race copy', 'will appear here after the race', '/results-photos'],
      ['no race-week banner', null, '/'],
    ],
    absent: [['race-week banner', 'Race week is here', '/']],
  },
  {
    name: 'race-week',
    env: { EVENT_MODE: 'race-week' },
    expect: [
      ['race-week banner', 'Race week is here', '/'],
      ['registration still open', 'Register on RunSignUp', '/'],
      ['results: before-race copy', 'will appear here after the race', '/results-photos'],
    ],
    absent: [['price notice suppressed', 'prices increase on October 2', '/']],
  },
  {
    name: 'race-day',
    env: { EVENT_MODE: 'race-day' },
    expect: [['results: live section', 'Results are live', '/results-photos']],
    absent: [['before-race copy gone', 'will appear here after the race', '/results-photos']],
  },
  {
    name: 'post-race',
    env: { EVENT_MODE: 'post-race' },
    expect: [
      ['results: after-race cards', '2026 official results', '/results-photos'],
      ['archive includes 2026', '2026', '/results-photos'],
    ],
    absent: [['before-race copy gone', 'will appear here after the race', '/results-photos']],
  },
  {
    name: 'emergency + registration',
    env: {
      EVENT_MODE: 'registration',
      EMERGENCY_MESSAGE: 'Severe weather is affecting race morning. Follow official updates.',
      EMERGENCY_HREF: '/race-weekend',
      EMERGENCY_LINK_LABEL: 'Race-day information',
    },
    expect: [
      ['emergency banner', 'Severe weather is affecting race morning', '/'],
      ['emergency link', 'Race-day information', '/'],
      ['banner has role=alert', 'role="alert"', '/'],
      ['mode unchanged underneath', 'Register on RunSignUp', '/'],
    ],
    absent: [],
  },
]

async function fetchText(route) {
  const res = await fetch(`${BASE}${route}`)
  return res.text()
}

let failures = 0

for (const testCase of CASES) {
  process.stdout.write(`\n${testCase.name}\n`)

  execSync('npm run build', {
    stdio: 'pipe',
    env: { ...process.env, ...testCase.env },
  })

  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    env: { ...process.env, ...testCase.env },
    stdio: 'ignore',
    detached: true,
  })

  try {
    // Wait for the server to answer.
    for (let i = 0; i < 40; i++) {
      try {
        await fetch(BASE)
        break
      } catch {
        await sleep(250)
      }
    }

    const cache = new Map()
    const get = async (route) => {
      if (!cache.has(route)) cache.set(route, await fetchText(route))
      return cache.get(route)
    }

    for (const [label, needle, route] of testCase.expect) {
      if (!needle) continue
      const html = await get(route)
      const ok = html.includes(needle)
      if (!ok) failures++
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label}`)
    }

    for (const [label, needle, route] of testCase.absent) {
      const html = await get(route)
      const ok = !html.includes(needle)
      if (!ok) failures++
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${label} (must be absent)`)
    }
  } finally {
    try {
      process.kill(-server.pid)
    } catch {}
    await sleep(400)
  }
}

// Leave the tree in its default state.
execSync('npm run build', { stdio: 'pipe' })

console.log(
  failures === 0
    ? '\nAll lifecycle states behave correctly.\n'
    : `\n${failures} lifecycle assertion(s) failed.\n`,
)
process.exit(failures === 0 ? 0 : 1)
