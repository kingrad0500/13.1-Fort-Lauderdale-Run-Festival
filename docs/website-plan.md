# Fort Lauderdale Running Festival — Website Implementation Plan

**Document status:** Implementation plan for project owner review
**Revision:** 2 — visual direction refined from client reference screenshots
**Prepared:** July 27, 2026
**Source of truth:** [fort-lauderdale-running-festival-project-brief.md](fort-lauderdale-running-festival-project-brief.md)
**Event date:** Sunday, November 8, 2026
**Scope of this document:** Technical plan only. No code has been written.

---

## 1. Purpose of this document

Brief §28 states that implementation must not begin until the project owner
reviews a written specification and explicitly authorizes the implementation
stage. This document is that specification.

The brief settles *what* the website says. This plan settles *how it gets
built* — the stack, the content architecture, the visual system, the component
library, the build sequence, the testing approach, and the list of items still
blocked on the client.

Where this plan and the brief disagree, the brief wins (§26, rule 1). The one
exception is the visual direction refined in §6 below, which the project owner
approved after this plan's first revision; brief §4, §7.1, §7.2, §14, §15, and
§16 have been amended to match, and the changes are logged in brief §29.

### Revision 2 summary

Revision 1 settled the technical architecture. Revision 2 followed the client
supplying five reference screenshots in `assets/Photos/screenshots/`. Those
references conflicted with the brief's mandated display typeface, which the
client resolved along with three related questions. The architecture is
unchanged; the visual system in §6 is substantially revised, and §6.4 corrects
a contrast error from revision 1.

---

## 2. Timeline and what it forces

| Date | Event | Weeks from today |
|---|---|---:|
| Friday, October 2, 2026, 11:59 p.m. EDT | Base prices increase | ~9.5 |
| Sunday, October 25, 2026, 11:59 p.m. EDT | Distance changes close | ~13 |
| Sunday, November 8, 2026 | Race day | ~15 |

The site exists to drive registrations, and its strongest argument — register
before prices increase — expires on October 2. A site that launches in late
September captures almost none of that window.

**Target: live by early September 2026**, leaving roughly four weeks of
low-price selling. The build sequence in §9 is ordered accordingly: the
registration path (homepage → distances → RunSignUp) is finished and shippable
before operational and community pages begin, so a calendar slip costs secondary
pages rather than the conversion funnel.

---

## 3. Current project state

```
Florida 13.1 FLL Race/
├── docs/
│   ├── fort-lauderdale-running-festival-project-brief.md
│   └── website-plan.md                      ← this document
├── assets/
│   ├── Photos/            7 JPG files
│   │   └── screenshots/   5 client reference screenshots
│   └── Videos/            EMPTY
└── .claude/settings.local.json
```

No code, no dependencies, no git repository, no hosting. Greenfield build.

### 3.1 Asset audit

| File | Size | Content | Usable for |
|---|---:|---|---|
| `homepage_ftlauderdale.jpg` | 195 KB | Wide shot, runners on A1A, palms, banners | Homepage hero poster |
| `homepage_ftlauderdale2.jpg` | 294 KB | Race field | Secondary homepage section |
| `sub-pages_ftlauderdale_131.jpg` | 757 KB | Course/field | Interior page hero |
| `sub-pages_ftlauderdale_131-2.jpg` | 214 KB | Course/field | Interior page hero |
| `sub-pages_ftlauderdale_131-3.jpg` | 520 KB | Course/field | Interior page hero |
| `finisher.jpg` | 1.5 MB | Celebrating finisher, sunrise sky | Final conversion — **see warning** |
| `liquid youth banner.jpg` | 49 KB | Sponsor banner artwork | Sponsor section only |

**Three findings that shape the plan:**

**No video exists.** The brief specifies sunrise race video in three heroes —
homepage (§7.1), Results & Photos (§11.1), and Community (§12.1).
`assets/Videos/` is empty. All heroes are built photography-led with the video
layer engineered in from day one (§6.8), so footage drops in later without
rework.

**Seven photos will not cover the approved design.** The content sequences call
for distinct imagery across roughly thirty sections — course, medal, shirt,
packet contents, volunteers, spectators, relay exchange, festival, community
gallery. Seven photos, all variants of "runners on a road," is roughly a fifth
of what the design assumes. Sections without imagery use restrained typographic
and color-block treatments rather than stretching one photo across the site.

**`finisher.jpg` carries expired sponsor branding.** The shirt reads *Cleveland
Clinic Florida* and *presented by LIFE TIME*; the bib is dated *Nov 10, 2019*.
The 2026 title sponsor is **Liquid Youth** (§20, §24). It is the strongest asset
available and the natural choice for the §7.11 conversion section, but it would
place a former title sponsor's logo on the 2026 homepage. Needs sign-off or
replacement — client action item 3.

All seven files are unoptimized JPEG and go through the pipeline in §6.7.

### 3.2 Imagery the new hero requires

The client will supply additional photography. The inset hero (§6.6) has a
specific requirement worth stating before that shoot or selection happens:

- **Wide landscape crops**, comfortable at roughly 16:9 through 21:9.
- **Dead space at left or center-left** for the headline block — sky, road, or
  open water works well.
- **Survives a 28px rounded container at ~80vh**; tight vertical crops and
  tightly subject-centered compositions will not work in this frame.
- **Sunrise or golden-hour color** wherever possible, to earn the Atlantic
  Sunrise direction.

---

## 4. Technology decisions

| Decision | Choice | Basis |
|---|---|---|
| Framework | Next.js 15, App Router | §4.1 |
| Language | TypeScript (strict) | Data-integrity requirement |
| Styling | Tailwind CSS 4 with Atlantic Sunrise tokens | Brief §4, §15 |
| Content model | Typed config files in-repo | Client decision |
| Hosting | Vercel recommended; undecided | Client decision pending |
| Analytics | Plausible or Fathom recommended; undecided | Client decision pending |
| Hero media | Photography-led, video-ready | Client decision |

### 4.1 Why Next.js

Astro was the serious alternative and would ship less JavaScript. Next.js wins
on four requirements the brief states explicitly:

1. **Central race data with no contradictions.** §19 requires "central
   race-information data"; the §19 launch gate requires "no known factual
   contradiction." Prices, start times, and the 10:00 a.m. deadline each appear
   on five or more pages. A typed data layer makes a stale price a build error
   rather than something an auditor must catch by reading seven pages.
2. **Four lifecycle modes with manual override** (§17). Server components
   resolve mode per request from one config value, with no flash of wrong
   content.
3. **Performance as accessibility** (§16). `next/image` delivers responsive
   AVIF/WebP, smaller mobile variants, and reserved dimensions with no
   hand-built pipeline.
4. **Search metadata and structured data** (§18). The Metadata API handles
   titles, canonicals, Open Graph, and JSON-LD as one repeatable per-route
   pattern.

**Static HTML was rejected** on contradiction risk alone — hand-duplicating
prices across seven files is exactly the failure mode §19 and §26 exist to
prevent. **WordPress was rejected** because nobody on the race team asked to
edit copy, so its only real advantage does not apply, while its costs
(performance, maintenance, slower design fidelity) all do.

### 4.2 Hosting

Vercel recommended: zero-config for Next.js, preview deployments for client
review, edge CDN, image optimization included. Previews set `noindex` per §18.

If the race has hosting the site must live on, the build switches to static
export deployed over SFTP. The cost is losing per-request rendering, so
lifecycle changes need a rebuild rather than a config read — workable, but
slower to react on race weekend. **Client decision pending.**

### 4.3 Analytics

§18 asks for two things in tension: conversion tracking on every registration
CTA, and privacy-respecting analytics with consent controls where the tool
requires them. GA4 needs a cookie banner, and on a site whose sole purpose is
conversion, a consent banner is a measurable conversion cost.

**Recommendation: Plausible or Fathom.** Cookieless, so no consent banner;
custom events cover all fifteen interactions §18 lists; satisfies
"privacy-respecting" and "do not duplicate RunSignUp participant data" with no
further engineering. GA4 stays available if the client or a sponsor requires it
— the event layer is written so the provider swaps in one file. **Client
decision pending.**

Either way, all outbound RunSignUp links carry consistent UTM parameters built
centrally, so §18's requirement to compare RunSignUp traffic against website
analytics holds.

---

## 5. Information architecture

Seven routes, matching brief §6 exactly:

| Route | Brief section | Character |
|---|---|---|
| `/` | §7 | Emotional, conversion-led, 11 sections |
| `/race-weekend` | §8 | Operational — the participant's practical guide |
| `/distances` | §9 | Conversion-focused, anchored sections |
| `/plan-your-trip` | §10 | Hub page, four anchored sections |
| `/results-photos` | §11 | Lifecycle-dependent content |
| `/community` | §12 | Partners, teams, charities, volunteer, sponsorship |
| `/faq` | §13 | Support tool with search and deep anchors |
| `/404` | §19 | Custom — Race Weekend, Distances, FAQ, RunSignUp |

Anchored sections receive real URL fragments (`/distances#relay`,
`/faq#packet-pickup`) so support staff and social posts can link straight to an
answer, per §13.

---

## 6. Visual system — Atlantic Sunrise, revised

### 6.1 Where this direction came from

The client supplied five reference screenshots: PiFi (pet tech), Petit (baby
monitor), House Wine (marketplace), Ecavo (food brand), Sophia (services theme).
The shared patterns:

| Pattern | Frequency |
|---|---:|
| Rounded/pill geometry — fully-rounded buttons, soft-cornered cards | 5 / 5 |
| Trust or credential strip immediately below the hero | 5 / 5 |
| Solid + outline button pair in the hero | 5 / 5 |
| Warm neutral backgrounds — never stark white or cold gray | 5 / 5 |
| Serif display typography | 4 / 5 |
| Eyebrow label above the headline — letterspaced caps | 4 / 5 |
| Inset/contained hero with visible page margin | 3 / 5 |
| Mixed type within one headline — italic accent or two-tone | 3 / 5 |
| Asymmetric or staggered composition | 3 / 5 |
| Floating pill navbar detached from page edges | 2 / 5 |
| Micro-reassurance line beneath the primary CTA | 2 / 5 |

The underlying preference is **calm, warm, editorial premium**: generous
whitespace, soft geometry, restrained motion, one confident typographic gesture
per screen. Not a loud or dense aesthetic.

Ecavo is the closest structural analogue to a race site — eyebrow → bold two-line
headline → button pair → credential chip row → partner logos — and that sequence
maps almost exactly onto the brief's approved homepage opening.

**These are inspiration, not templates.** §6.9 records what was deliberately
left behind and why.

### 6.2 Typography

Three families, each with a narrow and defensible job.

| Family | Role | Weights |
|---|---|---|
| **Fraunces** (variable) | Campaign headlines, page titles, section headlines | 600–900 + italic |
| **Barlow Condensed** | Start times, distances, prices, table numerics, event strip | 600, 700 |
| **Manrope** (variable) | Body, navigation, buttons, labels, schedules, policies, FAQ | 400, 500, 700 |

**Why Fraunces.** A variable serif with optical-size, soft, and wonk axes. At
heavy weights it reads bold and energetic rather than genteel — it carries "RUN
INTO THE SUNRISE" without sounding like a wedding invitation, which Playfair
Display and DM Serif cannot. Its true italic supplies the accent-word move seen
in the references. The wonk axis stays near zero to keep it athletic rather than
whimsical; the soft axis stays moderate for coastal warmth.

**Why Barlow Condensed survives.** The client chose a hybrid rather than a full
serif swap, and it is the right call: condensed type genuinely earns its width
in the event strip, race-card prices, and the comparison table, where scanning
numerics quickly is the entire job. Its role narrows from "all display" to
"numerics and race facts."

**The mixed headline.** Approved copy is preserved verbatim while gaining the
references' mixed-type treatment:

```
RUN INTO THE                              ← Fraunces 800, uppercase
Sunrise                                   ← Fraunces 700, italic, sentence case
Four ways to race. One unforgettable
morning along Las Olas and A1A.           ← Manrope 400
NOVEMBER 8, 2026 · FORT LAUDERDALE BEACH  ← Manrope 500, letterspaced
```

Brief §15's typography rules survive intact: no long paragraphs set in condensed
type, no uppercase for operational body content, uppercase only on short major
headlines.

### 6.3 Surfaces

**Coastal Sand `#F6F0E6` becomes the default page background**, replacing white.
White drops to a card and elevation surface. Navy becomes punctuation — header,
footer, and two or three deliberate full-width dark moments per page, not a
general-purpose background.

This produces the warm, light, airy character common to all five references
using only colors already approved in brief §4. No palette change was needed.

### 6.4 Contrast matrix — including a correction

Moving the default surface from white to Sand changes every contrast
calculation, so the palette was computed rather than estimated.

> **Correction to revision 1 of this plan.** Revision 1 specified white text on
> a coral button. That is wrong. White on `#FF6B4A` measures **2.82:1** — it
> fails WCAG AA for normal text *and* fails the 3:1 threshold for large text and
> UI components. Navy on coral measures **5.60:1** and passes AA at every size.
> **Primary buttons use Atlantic Navy text on a Sunrise Coral fill.**

On **Coastal Sand `#F6F0E6`** (default surface):

| Foreground | Ratio | Verdict |
|---|---:|---|
| Atlantic Navy `#10233E` | 13.9:1 | ✓ AAA — body text |
| Atlantic Blue `#0E5D82` | 6.4:1 | ✓ AA all sizes — links, secondary text |
| Clearwater Teal `#24B5A8` | 2.3:1 | ✗ decorative and graphic use only |
| Sunrise Coral `#FF6B4A` | 2.5:1 | ✗ never as text on sand |
| Sunlight Gold `#FFC857` | 1.4:1 | ✗ never as text on sand |

On **Atlantic Navy `#10233E`**:

| Foreground | Ratio | Verdict |
|---|---:|---|
| White | 15.8:1 | ✓ |
| Coastal Sand | 13.9:1 | ✓ |
| Sunlight Gold | 10.3:1 | ✓ |
| Clearwater Teal | 6.2:1 | ✓ |
| Sunrise Coral | 5.6:1 | ✓ |

On fills:

| Fill | Label | Ratio | Verdict |
|---|---|---:|---|
| Coral `#FF6B4A` | Atlantic Navy | 5.6:1 | ✓ **use this** |
| Coral `#FF6B4A` | White | 2.8:1 | ✗ **fails — do not use** |
| Gold `#FFC857` | Atlantic Navy | 10.3:1 | ✓ |

**Practical rules that fall out:** teal and gold are graphic elements, never text
on light surfaces. Coral is a fill color, never a text color on light surfaces.
Navy carries body text; Atlantic Blue carries links and secondary text. Every
pairing is re-verified against rendered output during the accessibility pass —
this table informs the design, it does not replace testing.

### 6.5 Shape and elevation

| Token | Value | Applied to |
|---|---|---|
| `--radius-pill` | 999px | Buttons, chips, navbar, badges |
| `--radius-card` | 20px | Race cards, location cards, panels |
| `--radius-hero` | 28px | Hero container, full-width media blocks |
| `--radius-input` | 12px | FAQ search, form fields |

Shadows are soft, large-blur, and **navy-tinted at 6–10% opacity** — never pure
black. Black shadows on a warm sand surface read gray and muddy; a navy tint
keeps the coastal cast consistent across the site.

### 6.6 The homepage hero

```
┌──────────────────────────────────────────────┐  Coastal Sand
│                                              │
│    ╭────────────── navy pill ──────────────╮ │
│    │ logo   nav links      [Register]      │ │  coral pill,
│    ╰───────────────────────────────────────╯ │  navy label
│                                              │
│    ╭═══════════════════════════════════════╮ │
│    ║  SUNDAY, NOVEMBER 8, 2026 ·           ║ │  eyebrow
│    ║  LAS OLAS OCEANSIDE PARK              ║ │
│    ║                                       ║ │
│    ║  RUN INTO THE                         ║ │  Fraunces 800
│    ║  Sunrise                              ║ │  Fraunces italic
│    ║                                       ║ │
│    ║  Four ways to race. One unforgettable ║ │  Manrope
│    ║  morning along Las Olas and A1A.      ║ │
│    ║                                       ║ │
│    ║  [ Choose Your Race ]  [ Explore ]    ║ │  coral / outline
│    ║  Secure registration on RunSignUp     ║ │  micro-reassurance
│    ╰═══════════════════════════════════════╯ │  radius-hero, ~80vh
│                                              │
│   ⬤ Half Marathon 6:15  ⬤ Relay 6:15         │  credential chips
│   ⬤ 10K 7:00  ⬤ 5K 7:00                      │  = brief §7.2 strip
└──────────────────────────────────────────────┘
```

The hero container runs roughly 80vh — tall enough to stay immersive, framed
enough to read as deliberately designed rather than defaulted.

**A useful side effect.** Because the navbar now sits on sand rather than over
media, the brief's original transparent-over-video-then-solid-navy behavior is
no longer needed. The navbar is a solid navy pill from first paint on every
page, which eliminates an entire class of text-contrast-over-moving-video risk
and removes a scroll listener. It gains only a soft shadow and backdrop blur
once the page scrolls.

### 6.7 Media pipeline

Source files stay in `assets/`. A build script generates optimized derivatives
into `public/media/`: AVIF and WebP with JPEG fallback, multiple widths per
breakpoint, explicit dimensions recorded so every image reserves its space, and
a low-quality placeholder for heroes. Per §16, gallery images lazy-load, text
and registration controls are prioritized over decorative media, and mobile
receives smaller variants.

### 6.8 Hero media component

`HeroMedia` takes a required `poster` and a nullable `video`.

With `video` null — the launch state — it renders the optimized still inside the
rounded hero frame with a gradient scrim for text legibility and, for users who
allow motion, a very slow parallax drift *within* the frame.

When footage arrives, populating the `video` prop activates autoplay, muted,
loop, the pause control §16 requires, and poster fallback if video fails (§19).
No structural change. Reduced-motion users receive the still in both states.

### 6.9 What was taken from the references, and what was left

**Adopted:** floating pill navbar; inset rounded hero; eyebrow labels;
credential chip row below the hero; solid-plus-outline button pair; staggered
offset card grid; a truthful micro-reassurance line; warm generous whitespace;
one gesture per screen.

**Deliberately rejected:**

- **Star ratings and review-count social proof** (Petit, Sophia). A race has no
  review corpus, and inventing one violates brief §26.5.
- **E-commerce chrome** — cart icon, account icon, "Shop". Registration is
  external to this site entirely.
- **"30 days money back" guarantees** (Petit). Brief §22 states registration is
  final with no refunds or deferrals. The reassurance line instead reads
  *Secure registration on RunSignUp · Final pricing shown at checkout* — true,
  and still lowers friction.
- **Halftone dot decoration and circular portrait clusters** (Sophia). Reads
  beauty-and-wellness rather than coastal athletics.
- **Product-cutout-on-gradient compositions** (PiFi, Petit). There is no product
  to cut out; medal and shirt photography remain pending.
- **The auto-advancing hero slider** implied by PiFi's dot indicators. Brief
  §7.2 and §25 prohibit carousels for critical information.
- **A sponsor logo wall directly below the hero.** The references put trust
  logos there, but brief §7.10 places sponsors late and explicitly restrained so
  they never interrupt the registration journey. The credential chip row takes
  that slot; sponsors stay where the brief put them.

### 6.10 Motion

The references are calm and brief §25 asks for energy without theatrics. One
gesture per section: slow parallax drift on the hero image inside its frame,
staggered fade-up on card grids, a subtle chip-strip entrance. Schedules,
prices, policies, and accessibility content remain completely static per §15 and
§25. A reduced-motion preference disables all of it.

---

## 7. Architecture

### 7.1 Project structure

```
app/
  layout.tsx                 fonts, header, footer, skip link, banner slots
  page.tsx                   homepage
  race-weekend/page.tsx
  distances/page.tsx
  plan-your-trip/page.tsx
  results-photos/page.tsx
  community/page.tsx
  faq/page.tsx
  not-found.tsx
  sitemap.ts   robots.ts   opengraph-image.tsx

content/                     ← SINGLE SOURCE OF TRUTH
  race.ts                    event identity, distances, prices, times, deadlines
  schedule.ts                Saturday and Sunday timeline
  packet.ts                  pickup locations, rules, contents, bib and timing
  parking.ts                 five lots  [UNVERIFIED — client action item 7]
  sponsors.ts                tiered: title / presenting / partners
  faq.ts                     categories, questions, answers, anchor slugs
  links.ts                   external URL registry, verified flags, UTM builder
  event-status.ts            lifecycle mode + emergency banner  ← the one control
  pending.ts                 every Coming soon / To be announced item

components/
  layout/   Header  MobileMenu  Footer  StickyRegisterCTA  SkipLink
            EmergencyBanner  LifecycleBanner
  ui/       Button  StatusNotice  ExternalLink  SectionIntro  MediaBlock
            EventInfoStrip  PageHero  EyebrowLabel  ChipRow  StaggeredGrid
  race/     RaceCard  ComparisonTable  WeekendTimeline  LocationCard
            BenefitItem  RelayDiagram  Checklist  FaqAccordion
            SponsorWall  ArchiveRow  ContactPanel  FinalCTA  HeroMedia

lib/
  analytics.ts               typed helpers, one per §18 interaction
  event-status.ts            mode resolution
  metadata.ts                per-page title / description / canonical / OG
  jsonld.ts                  SportsEvent structured data

public/media/                optimized derivatives
```

`EyebrowLabel`, `ChipRow`, and `StaggeredGrid` are additions from revision 2.

### 7.2 The content layer is the centerpiece

Every operational fact is declared once in `content/` and imported wherever it
appears. `race.distances` is read by the homepage race cards (§7.4), the
Distances comparison table (§9.2), the final race selector (§9.8), the JSON-LD
offers array, the credential chip row, and the relevant FAQ answers.

Changing the Half Marathon price is a one-line edit that propagates everywhere
at once. A mistyped field fails the build. This converts §19's "no known factual
contradiction" launch gate from a manual audit into a structural guarantee.

Three files deserve specific mention:

**`content/pending.ts`** is a typed registry of the nineteen unresolved items in
brief §27. Each entry carries a state (`coming-soon`, `to-be-announced`,
`registration-closed`, `updated`) and display text. Components read the registry
rather than hardcoding placeholder strings. This enforces §19's rule against
empty modules and invented content, gives every placeholder consistent
treatment, and reduces the pre-launch pending audit to reading one file.

**`content/links.ts`** holds every external URL with a `verified` flag.
Unverified links render as a Coming soon notice rather than a dead link. This
covers the two Life Time Run URLs in §10.4 (both `http://`, both unchecked), the
unavailable results and photography providers, and the team and volunteer
registration links. It also houses the UTM builder.

**`content/event-status.ts`** is the single lifecycle control described next.

### 7.3 Lifecycle modes

```ts
// content/event-status.ts
export const eventStatus = {
  override: null,          // null = automatic, or force a mode
  emergencyBanner: null,   // independent of mode, per §17
}
```

`lib/event-status.ts` resolves mode from the calendar — `race-week` from Monday
November 2, `race-day` on November 8, `post-race` thereafter — unless `override`
is set, which wins. This satisfies §17's requirement that scheduled transitions
exist *and* that the race team retains a manual override for early registration
closure, delayed results, or emergency conditions.

Mode changes what CTAs say, which banner appears, and how Results & Photos
renders (§11.2–11.4). It does not change the design. The emergency banner is
deliberately independent so it can fire without shifting the whole site into a
different mode, exactly as §17 specifies.

Under the config-file model a mode switch is a one-line edit and a push, live in
about a minute. **This places RAD Studios on call across race weekend.** If the
race team would rather control it themselves, a small password-protected admin
page is the upgrade path, and the architecture supports adding it later without
rework. See client action item 18.

### 7.4 Font loading

Three families instead of two, all through `next/font/google`, self-hosted, with
latin subsets only: Fraunces and Manrope as variable fonts, Barlow Condensed
limited to weights 600 and 700. Font payload is measured during the Phase 6
performance pass. If it exceeds budget, Barlow Condensed is the first candidate
for a static subset covering digits, colon, period, and uppercase only — its
entire role is numerics, so the subset is small.

---

## 8. Page-by-page implementation notes

Content and copy are approved in the brief. These notes cover what the brief
left to implementation, plus the revision-2 visual changes.

### 8.1 Homepage — brief §7

All eleven sections in the specified order.

- **Hero.** Inset rounded container per §6.6, floating navy pill navbar,
  eyebrow label, mixed Fraunces headline, coral/outline button pair,
  micro-reassurance line. `homepage_ftlauderdale.jpg` as poster.
- **Essential event strip.** Rendered as the credential chip row directly below
  the hero. Static — §7.2 explicitly prohibits an automatic slider. Times and
  distances in Barlow Condensed.
- **Choose your race.** Four `RaceCard` components in a `StaggeredGrid` —
  vertical offset on desktop, plain stack on mobile. All values read from
  `race.distances`; the §7.4 pricing notice renders verbatim from
  `content/race.ts` and is never retyped.
- **Course experience.** Course maps pending, so a discreet inline
  `StatusNotice` reading "Course maps coming soon" rather than a large empty
  placeholder (§7.5).
- **What every runner receives.** Seven benefit items. Medal and shirt
  photography pending, so these render typographically with iconography until
  real product photos arrive (§7.6).
- **Relay experience.** `RelayDiagram` with a text-equivalent description for
  screen readers (§16).
- **Final conversion.** `finisher.jpg` intended, pending the sponsor-branding
  sign-off in §3.1.
- **Sticky mobile CTA.** Appears once the hero scrolls out of view, coral fill
  with navy label, respects device safe areas, hides when another registration
  CTA is already visible near the bottom of the viewport (§14).

### 8.2 Race Weekend — brief §8

Compact inset hero, then a sticky horizontal section index that becomes a
scrollable control on mobile with a visible scroll affordance (§16).

The weekend timeline is static with no automatic animation (§8.3). Bib and
timing detail sits in two accordions, with the three warnings — do not fold the
bib, do not remove the timing tag, do not transfer either — kept visible
*outside* the collapsed content, per §8.6. Road closures render from
`pending.ts` as Coming soon.

### 8.3 Distances — brief §9

One page, four anchored sections, per §9's explicit decision against four
separate pages. The comparison table uses Barlow Condensed for all numerics and
converts to accessible stacked rows on small screens (§16). Every price and
start time reads from `race.distances`. The shared eligibility and pricing
notice (§9.7) appears once and is referenced, not duplicated per distance.

### 8.4 Plan Your Trip — brief §10

Hub page, four anchored sections. Hotel and transportation programs do not
exist, so both render as Coming soon; §10.3 prohibits recommending commercial
properties without an approved partnership, so no hotels are named.

The five parking locations render as a comparison list rather than a card grid
(§10.5). **All five records are marked unverified in `content/parking.ts`** —
the brief itself describes them as proposed. Life Time Run partner cards link
out only if `links.ts` marks those URLs verified; otherwise Coming soon.

### 8.5 Results & Photos — brief §11

The most lifecycle-dependent page, rendering three content sets for before race
day (§11.2), race day (§11.3), and after (§11.4), driven entirely by
`event-status.ts`.

§11.2 is explicit that empty or inactive 2026 links must not be shown, so before
race day the 2026 entries render as status notices, not disabled buttons.
Results and photography remain external; no result data is copied or hosted.

### 8.6 Community — brief §12

Five anchored sections. The sponsor wall presents the confirmed hierarchy from
§12.3 — Liquid Youth as title, Baptist Health South Florida as presenting and
medical partner, then seven event partners — rather than equal weighting. Any
marquee on small screens is pausable (§12.3).

Charities are unconfirmed: the section shows "2026 charity partnerships will be
announced soon" and invents nothing (§12.5). Volunteer contacts and the team
registration link are gated behind `links.ts` verification.

### 8.7 FAQ — brief §13

Client-side search filtering as the visitor types, accordions grouped by the six
categories, one answer open at a time, a stable URL anchor per question, fully
usable on small screens (§16).

Per §13's interaction rules, answers link out to the authoritative page rather
than restating operational content — the FAQ must not become a second,
conflicting source. Where an answer states a fact it reads that fact from
`content/`, so it cannot drift from the Race Weekend page.

### 8.8 Global — brief §14

Floating navy pill navbar, solid from first paint on every page. Dropdowns for
Distances, Plan Your Trip, and Community only; Race Weekend, Results & Photos,
and FAQ are direct links. Dropdowns work with mouse, keyboard, and touch and
never depend on hover alone.

Mobile menu is a full-height navy panel with accordion sublinks, Escape to
close, focus trapped while open, focus returned to the trigger on close, and
body scroll locked.

Registration CTAs open RunSignUp **in the same tab** (§14). Results, photos,
training, and partner links open in a new tab with accessible text indicating
that behavior.

---

## 9. Build phases

Ordered so the registration path is complete and shippable before secondary
pages begin.

**Phase 1 — Foundation.** Next.js scaffold, TypeScript strict, Tailwind theme
with the revised tokens, three-family font loading, the complete `content/` data
layer, floating pill header with dropdowns, mobile menu, footer, button and
status-notice primitives, image pipeline.

**Phase 2 — Homepage.** All eleven sections of §7 including the inset hero,
chip row, and staggered race-card grid. Sticky mobile CTA. First deployable
preview for client review.

**Phase 3 — Distances.** §9 in full. **First genuinely ship-worthy milestone** —
homepage plus distances plus a working RunSignUp path is a complete conversion
funnel, and a defensible soft launch if the calendar tightens.

**Phase 4 — Race Weekend and FAQ.** §8 and §13. The two heaviest operational
pages, and the two that most reduce race-week support load.

**Phase 5 — Plan Your Trip, Results & Photos, Community.** §10, §11, §12. All
three depend heavily on pending content and ship with a high proportion of
Coming soon notices. That is designed behavior, not a defect.

**Phase 6 — Hardening.** Lifecycle modes across all pages, emergency banner,
404, sitemap, robots, structured data, analytics wiring, full accessibility
audit, performance and font-payload pass, and the thirteen-point pre-launch
validation from §19.

---

## 10. Verification

Testing runs per phase, not deferred to the end.

**Accessibility — WCAG 2.2 AA (§16).** axe DevTools clean on every page. Full
keyboard traversal including header dropdowns, mobile menu focus trap,
Escape-to-close, and focus restoration. VoiceOver pass across header, race
cards, accordions, and FAQ search. 200% zoom with no horizontal page scroll.
Reduced motion honored site-wide.

**Contrast.** Every foreground/background pair actually used is verified against
rendered output, with particular attention to coral, teal, and gold, which fail
on light surfaces and are restricted per §6.4. Fraunces at display weights is
additionally checked at 200% zoom and on small screens, where high-contrast
serifs can thin out.

**Data integrity.** A script asserts that every price, start time, and deadline
rendered anywhere traces back to `content/race.ts` — the automated form of
§19's "no known factual contradiction" gate.

**Lifecycle.** Force each of the four modes plus the emergency banner
independently and capture every page in each state, per §19 points 8 and 9.

**No-JavaScript.** With JavaScript disabled, schedules, addresses, policies, and
every registration link remain reachable (§19).

**Performance.** Lighthouse mobile ≥90 performance and 100 accessibility under
slow-4G throttling. CLS at or near zero through reserved image dimensions. Font
payload measured against budget, with the Barlow Condensed subset as the
fallback lever.

**External links.** Automated check of every URL in `links.ts`. Unverified
entries must render as Coming soon, never as a live link.

**Responsive.** 375 / 768 / 1024 / 1440 / 1920 across all seven pages plus 404.

---

## 11. Client action list

None of these block starting Phase 1. Several block launch.

### Blocking launch

| # | Item | Brief ref |
|---:|---|---|
| 1 | Event logo files, SVG preferred — header, footer, and 404 all require one | §14 |
| 2 | Logo files and confirmed hierarchy for all nine sponsors | §24 |
| 3 | Sign-off or replacement for `finisher.jpg` — shows Cleveland Clinic and Life Time branding from 2019 | §24 |
| 4 | Domain confirmation — is `131FortLauderdale.com` the target, and who controls DNS? | — |
| 5 | Hosting decision — Vercel recommended | §19 |
| 6 | Analytics tool — Plausible or Fathom recommended | §18 |
| 7 | Verification of all five parking records — addresses, capacities, distances are marked proposed | §10.5 |
| 8 | Verification of both Life Time Run URLs and both volunteer contact emails | §10.4, §12.6 |
| 9 | Privacy, accessibility, cookie, and terms copy for the footer | §14 |

### Blocking specific sections, not launch

| # | Item | Brief ref |
|---:|---|---|
| 10 | Additional photography — roughly 25–30 images against 7 available, meeting the crop requirements in §3.2 | §4 |
| 11 | Hero video footage, if any exists | §7.1 |
| 12 | Medal and shirt product photography | §7.6 |
| 13 | Course maps and elevation profiles | §7.5, §9 |
| 14 | Results and photography provider URLs | §11 |
| 15 | Team/group and volunteer registration RunSignUp links | §12.4, §12.6 |
| 16 | Confirmed social accounts and event hashtags | §14 |
| 17 | The six unconfirmed claims in §27 — USATF certification, aid-station count and locations, EMS course support, headphone policy, prohibited equipment, participant food restriction. Each is a real FAQ question; each currently renders as Coming soon | §27 |

### Process decision

| # | Item |
|---:|---|
| 18 | Who is on call for race-weekend lifecycle mode switches under the config-file model — and does the race team want the small admin panel built before November? |

---

## 12. What this plan does not cover

- Registration and payment processing. RunSignUp owns these entirely (§19).
- Participant data. The website never stores or duplicates it (§18).
- Results hosting. External provider, linked not copied (§11.4).
- Email marketing and post-race survey tooling. Referenced in §17's post-race
  mode but not scoped here.
- Content for the nineteen pending items in brief §27. The architecture supports
  them; the content itself comes from the race team.

---

## 13. Approval

Per brief §28, implementation begins only once the project owner reviews this
document and explicitly authorizes it.

On approval, Phase 1 begins. The client action list can be worked in parallel —
items 1 through 9 are needed before launch, not before the build starts.
