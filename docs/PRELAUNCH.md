# Pre-launch checklist — Fort Lauderdale Running Festival

**Status:** Build complete through Phase 6. Not yet launched.
**Last verified:** July 28, 2026
**Brief reference:** §19 "Pre-launch validation" and "Launch acceptance"

This tracks brief §19's thirteen validation points against what has actually
been verified, and what is still blocked on the client.

Run the automated portion with:

```bash
npm run build && npm start        # in one terminal
npm run prelaunch                  # in another
npm run check:lifecycle            # separate: rebuilds per mode
```

---

## §19 validation points

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 1 | Reconfirm dates, start times, addresses, prices, deadlines, policies | **Client** | Site is internally consistent (`npm run check:data`), but the underlying facts still need race-team sign-off |
| 2 | Resolve or clearly label every pending content item | **Done** | 21 items in `content/pending.ts`, each rendering an explicit notice. Nothing invented (§26.5) |
| 3 | Verify every external link | **Partly — see below** | `npm run check:links`. RunSignUp 200 OK. **Both Life Time Run URLs are unreachable** |
| 4 | Verify sponsor names, hierarchy, logo files, usage permission | **Client** | Hierarchy implemented from §12.3; no logo files exist, names render as styled text |
| 5 | Review every page at representative sizes | **Done** | 7 pages × 5 breakpoints, zero horizontal overflow. `npm run shots <route>` |
| 6 | Keyboard, focus order, zoom, contrast, reduced motion, screen-reader labelling | **Done** | See "Accessibility evidence" below |
| 7 | Videos, poster images, responsive images, slow-connection fallbacks | **Partly** | No video exists. Images are static-imported with reserved dimensions; CLS 0.0000 on 7 of 8 page/width combinations |
| 8 | Validate registration, race-week, race-day, post-race modes | **Done** | `npm run check:lifecycle` — all four pass |
| 9 | Validate the emergency banner independently | **Done** | Verified raising a banner while in registration mode leaves the mode unchanged |
| 10 | Confirm analytics events send no personal or sensitive data | **Done** | Captured payloads: `{query_length: 21}` — never the query text. No email, name, age or form fields |
| 11 | Titles, descriptions, canonicals, sitemap, robots, social previews, structured data | **Done** | All unique across 7 pages; sitemap has 7 URLs; OG image 1200×630; JSON-LD carries no unconfirmed facts |
| 12 | Test missing pages, unavailable providers, closed-registration states | **Done** | Custom 404 with all four required links; unavailable providers degrade to notices |
| 13 | Final editorial review | **Client** | Automated checks find no double-periods, escape artifacts, empty links, or missing alt text |

---

## Launch acceptance (§19)

| Criterion | Status |
|---|---|
| The registration path works on desktop and mobile | **Yes** — 53 registration CTAs across the 7 pages (DOM-counted), every one carrying `data-register-cta`, UTM parameters and analytics, all navy-on-coral |
| No known factual contradiction remains | **Yes** — `check:data` traces every price and time to `content/race.ts` |
| Critical information is usable without animation or video | **Yes** — no-JS verified on all 7 pages |
| All approved pages and responsive states are present | **Yes** — 7 pages + 404 |
| Accessibility and performance checks meet the agreed target | **Mostly** — see gaps below |
| Pending content is explicitly labelled | **Yes** |
| The event team can change lifecycle mode and emergency messaging | **Yes** — config file, plus `EVENT_MODE` / `EMERGENCY_MESSAGE` env fallback |

---

## Accessibility evidence (§16, WCAG 2.2 AA)

- **Contrast over photography** — measured, not estimated. `npm run check:contrast`
  samples the brightest backdrop pixel behind each headline at 7 viewport widths.
  All 7 page heroes pass the 3:1 large-text floor with margin (gold 6.16–7.22:1).
- **Flat-colour pairings** — the matrix in brief §4. Coral is a fill only; teal
  and gold are graphic only; coral fills carry navy labels (5.6:1). White on
  coral (2.8:1) is structurally unreachable via `RegisterButton`.
- **Touch targets** — zero non-inline controls under 44px on any page. Inline
  links inside prose are exempt per WCAG 2.5.8.
- **Keyboard** — 3px visible focus ring; accordions open on Enter; mobile menu
  traps focus, closes on Escape, and restores focus to its trigger.
- **Zoom** — all 7 pages reflow at 200% with no horizontal scrolling.
- **Reduced motion** — hero drift disabled (`animation-duration: 1e-05s`),
  smooth scrolling reverts to auto.
- **No-JS** — every page keeps its navigation, headings, schedules, addresses,
  policies and registration links. FAQ answers stay in the DOM and the
  one-answer-at-a-time accordion still works, because it is native
  `<details name>`.

---

## Known gaps at launch

### Blocking

1. **Event logo** — header, footer and 404 currently use a `13.1` text mark.
2. **Sponsor logos — supplied and in place.** All nine appear on the homepage
   strips and the Community partners wall. Two notes carried forward, neither
   blocking:
   - **WildSide** — pale cream script, so it sits on a navy panel rather than a
     white one (client-directed). A dark/colour version would let the wall be
     uniform: drop the file in and set `tile: 'light'` in `content/sponsors.ts`.
   - **Running Wild** — "RUNNING" and the "FT. LAUDERDALE, FL" tagline are
     white with a thin outline, so they read weakly on a white panel. The
     cheetah and red "WILD" carry the mark. Worth requesting a light-safe
     version alongside WildSide's.
   - **Liquid Youth — true vector still wanted.** The SVG supplied on
     30 Jul 2026 is not vector: it is a 2048×706 PNG inside an SVG wrapper with
     a luminance mask, and contains no glyph paths. Its real artwork measures
     **897 × 320px**, which is enough for the hero at 2× DPR but has no headroom
     beyond it — and this is the title sponsor's mark, in the hero, so it is the
     one that should be bulletproof. Ask the designer for the Illustrator/EPS
     original, or an SVG **with the type converted to outlines rather than an
     embedded image**. Baptist Health's equivalent is 3262 × 1142px and needs
     nothing further.

3. **`finisher.jpg` sign-off** — shows Cleveland Clinic and Life Time branding
   from 2019 against a 2026 Liquid Youth title sponsorship. Deliberately unused.
4. **Domain** — `siteUrl` defaults to `https://www.131fortlauderdale.com`. Set
   `NEXT_PUBLIC_SITE_URL` once confirmed; canonicals, sitemap and OG depend on it.
5. **Both Life Time Run URLs are dead.** `lifetimerun.com` does not resolve.
   These are not merely unverified — they would have been broken links. They
   currently render as "coming soon" notices.
6. **Analytics provider** — `lib/analytics.ts` is a no-op until one is wired.
   Recommendation remains Plausible or Fathom (cookieless, no consent banner).
7. **Parking data** — all five records unverified; the UI says so above the table.
8. **Volunteer contacts** — shown as names with addresses, not live `mailto:`
   links, pending verification.
9. **Privacy, accessibility, cookie and terms content** — footer shows a notice.

### Non-blocking

10. Photography — 6 usable images across 7 pages means heroes repeat. Roughly
    25–30 more are needed, meeting the crop spec in `website-plan.md` §3.2.
11. Hero video — `HeroMedia` accepts a `video` prop and is ready.
12. Medal and shirt photography, course maps, results/photo providers,
    team and volunteer registration links, social accounts, awards categories,
    gear check.
13. The six unconfirmed claims in brief §27 (USATF certification, aid stations,
    EMS support, headphones, prohibited equipment, participant food) — each is
    a live FAQ question currently answering "coming soon".

---

## Race-weekend runbook

**Changing site mode.** Edit `override` in `content/event-status.ts`, commit,
push. Live in about a minute.

```ts
export const eventStatus = {
  override: 'race-day',   // registration | race-week | race-day | post-race
  emergencyBanner: null,
}
```

**If the deploy pipeline is unavailable**, set `EVENT_MODE` in the hosting
dashboard and redeploy the existing build. An unrecognised value is ignored
rather than throwing, so a typo cannot take the site down.

**Raising an emergency banner** — independent of mode, per §17:

```ts
emergencyBanner: {
  message: 'Severe weather is affecting race morning. Follow official updates.',
  href: '/race-weekend',
  linkLabel: 'Race-day information',
}
```

or set `EMERGENCY_MESSAGE` (plus optional `EMERGENCY_HREF`,
`EMERGENCY_LINK_LABEL`) in the dashboard.

**Publishing a pending item** — set `resolved: true` on the entry in
`content/pending.ts`, or flip `verified: true` in `content/links.ts` once a URL
has actually been loaded and checked.
