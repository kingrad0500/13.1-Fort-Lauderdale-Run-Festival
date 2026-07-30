# Fort Lauderdale Running Festival — Project Brief

**Document status:** Approved design and content specification  
**Event date:** Sunday, November 8, 2026  
**Last updated:** July 27, 2026 — visual direction revised, see §29  
**Planning status:** Approved and ready for implementation planning.  
**Implementation plan:** [website-plan.md](website-plan.md)

---

## 1. Project objective

The website has one primary objective:

> Inspire visitors to register for the Fort Lauderdale Running Festival.

Every design, content, navigation, and motion decision must support that objective.

The experience should present an energetic, joyful, beautiful, and professionally organized race along Fort Lauderdale's beach roads. It must feel premium without becoming exclusive, and welcoming without losing athletic credibility.

Registration happens entirely through RunSignUp. The website persuades and prepares visitors, then sends them to the external registration flow.

**Official RunSignUp destination:**  
<https://runsignup.com/Race/FL/FortLauderdale/FortLauderdale131>

---

## 2. Approved audience strategy

The website intentionally balances three audiences:

1. Destination runners interested in a memorable Florida race weekend
2. Local families, casual runners, and first-time racers
3. Performance-focused runners

Destination appeal receives slightly more emphasis, but the language must not assume that every participant is traveling from outside Florida.

Fort Lauderdale itself is the attraction. Locals should feel pride and familiarity; visitors should feel welcomed into something special.

### Audience messages

- **Locals:** Run the streets you know in a completely new way.
- **Destination runners:** Make the race part of an unforgettable Fort Lauderdale weekend.
- **Competitive runners:** Experience a professionally timed coastal course with live results.
- **Families and first-timers:** Choose the distance that feels right and celebrate together.

These messages should appear naturally across the site rather than competing inside the hero.

---

## 3. Approved positioning

### Strategic direction

**Fort Lauderdale's coastal race weekend**

The story is experience-led and rooted in Fort Lauderdale. Destination appeal comes through authentic photography, oceanfront scenery, sunrise colors, Las Olas energy, and the finish-line festival—not through repeatedly telling visitors to travel.

### Core promise

> A beautiful, energetic race along Fort Lauderdale's most iconic streets and coastline—welcoming serious runners, first-timers, families, relay teams, locals, and visitors.

### Voice

The voice should be:

- Energetic, concise, and optimistic
- Premium but never exclusive
- Coastal without becoming a tourism advertisement
- Serious about race operations but relaxed about the experience
- Inclusive without overusing generic phrases such as "something for everyone"

Use **fun**, **joyful**, or **celebratory** rather than **funny** when describing the event.

---

## 4. Approved visual direction

### Direction name

**Atlantic Sunrise**

The visual system should combine coastal warmth, athletic energy, and premium event presentation.

### Typography

*Revised — see §29.1.*

- **Display typeface:** Fraunces (variable serif)
- **Numeric and race-fact typeface:** Barlow Condensed
- **Interface and body typeface:** Manrope

**Fraunces** is used for expressive headlines, page titles, section headlines, and major campaign statements. It is set at weights 600–900, with its true italic reserved for accent words inside a headline. The wonk axis stays near zero so the face reads athletic rather than whimsical; the soft axis stays moderate for coastal warmth.

**Barlow Condensed** is used where condensed type genuinely earns its width: start times, race distances, prices, comparison-table numerics, and the essential event strip. Weights 600 and 700.

**Manrope** is used for navigation, body copy, buttons, forms, schedules, policies, and operational information. Weights 400, 500, and 700.

Headlines may mix Fraunces upright and Fraunces italic within a single statement. Example, using approved hero copy:

> **RUN INTO THE** *(Fraunces 800, uppercase)*
> **Sunrise** *(Fraunces 700, italic, sentence case)*

### Color palette

| Role | Color | Hex |
|---|---|---:|
| Premium foundation | Atlantic Navy | `#10233E` |
| Ocean depth | Atlantic Blue | `#0E5D82` |
| Coastal energy | Clearwater Teal | `#24B5A8` |
| Primary conversion accent | Sunrise Coral | `#FF6B4A` |
| Supporting sunlight accent | Sunlight Gold | `#FFC857` |
| Warm neutral | Coastal Sand | `#F6F0E6` |
| Primary light surface | White | `#FFFFFF` |

### Color-use principles

*Revised — see §29.2.*

- **Coastal Sand `#F6F0E6` is the default page background.** White is a card and elevation surface, not the general background.
- Navy anchors the premium identity and is used as punctuation — header, footer, and two or three deliberate full-width dark moments per page — rather than as a general-purpose background.
- Atlantic blue and teal create the Fort Lauderdale coastal character.
- Coral is the primary registration and conversion accent. **Coral is a fill color, never a text color on light surfaces**, and coral fills carry Atlantic Navy labels, never white.
- Gold is used sparingly for sunlight, awards, small highlights, and celebratory details, and never as text on a light surface.
- Sand and white provide generous breathing room.
- Avoid using every accent color with equal weight.

### Measured contrast

These figures are computed, not estimated, and govern every color decision. They inform design; they do not replace testing against rendered output.

On **Coastal Sand `#F6F0E6`** — the default surface:

| Foreground | Ratio | Verdict |
|---|---:|---|
| Atlantic Navy `#10233E` | 13.9:1 | Body text |
| Atlantic Blue `#0E5D82` | 6.4:1 | Links and secondary text |
| Clearwater Teal `#24B5A8` | 2.3:1 | Decorative and graphic use only |
| Sunrise Coral `#FF6B4A` | 2.5:1 | Never as text |
| Sunlight Gold `#FFC857` | 1.4:1 | Never as text |

On **Atlantic Navy `#10233E`**: White 15.8:1 · Coastal Sand 13.9:1 · Sunlight Gold 10.3:1 · Clearwater Teal 6.2:1 · Sunrise Coral 5.6:1. All pass.

On fills:

| Fill | Label | Ratio | Verdict |
|---|---|---:|---|
| Sunrise Coral `#FF6B4A` | Atlantic Navy | 5.6:1 | **Required treatment** |
| Sunrise Coral `#FF6B4A` | White | 2.8:1 | **Fails AA — must not be used** |
| Sunlight Gold `#FFC857` | Atlantic Navy | 10.3:1 | Passes |

### Shape language

*Added — see §29.3.*

| Token | Value | Applied to |
|---|---|---|
| Pill | 999px | Buttons, chips, navbar, badges |
| Card | 20px | Race cards, location cards, panels |
| Hero | 28px | Hero containers, full-width media blocks |
| Input | 12px | Search fields and form inputs |

Shadows are soft, large-blur, and navy-tinted at 6–10% opacity — never pure black, which reads gray and muddy on a warm sand surface.

### Photography and video

The project will use authorized, high-resolution photography and video from previous Fort Lauderdale races. These assets will be added to the project folder.

Authentic event media should be prioritized over generic stock photography.

---

## 5. Approved hero

### Headline

> RUN INTO THE SUNRISE

### Supporting message

> Four ways to race. One unforgettable morning along Las Olas and A1A.

### Event line

> November 8, 2026 · Fort Lauderdale Beach

### Actions

- **Primary:** Choose Your Race
- **Secondary:** Explore Race Weekend

### Essential race row

> Half Marathon · Relay · 10K · 5K

The hero should use authentic sunrise race video featuring competitive runners, casual runners, families, coastline, and celebration.

---

## 6. Approved navigation architecture

### Primary navigation

1. Race Weekend
2. Distances
3. Plan Your Trip
4. Results & Photos
5. Community
6. FAQ
7. Register

**Register** is a persistent, visually dominant CTA and opens RunSignUp.

On mobile, registration may become a sticky bottom action.

### Page hierarchy

#### Race Weekend

- Race overview
- Weekend schedule
- Expo and packet pickup
- Race-morning packet pickup
- Packet contents
- Bib instructions
- Timing information
- Race-day policies
- Accessibility
- Aid stations and medical support
- Course deadline
- Post-race festival

#### Distances

- Distance comparison
- Half Marathon
- Two-Person Relay
- 10K
- 5K
- Course maps when available
- Distance-specific rules

#### Plan Your Trip

- Travel
- Training
- Parking & Directions
- Spectator Guide

#### Results & Photos

- 2026 results
- Previous results
- 2026 photography
- Previous event galleries
- Third-party service links

#### Community

- Partners and sponsors
- Charities
- Groups and teams
- Volunteer information

#### FAQ

- Registration and age
- Distances and start times
- Course rules
- Walking and pace requirements
- Headphones and prohibited equipment
- Parking and road closures
- Aid stations and medical support
- Finish-line festival
- Certification
- Contact and feedback

---

## 7. Approved homepage sequence

### 1. Hero

*Revised — see §29.4.*

- **Inset hero container** — sunrise race media set inside a 28px rounded frame at roughly 80vh, with Coastal Sand visible as page margin around it. Tall enough to remain immersive, framed enough to read as deliberately designed.
- **Floating navy pill navigation** sitting on the sand above the frame, solid from first paint.
- **Eyebrow label** above the headline, in letterspaced Manrope caps: `SUNDAY, NOVEMBER 8, 2026 · LAS OLAS OCEANSIDE PARK`
- Approved hero copy, set as a mixed Fraunces headline per §4.
- Primary and secondary CTAs — coral fill with navy label, plus a navy outline secondary.
- **Micro-reassurance line** beneath the CTAs: *Secure registration on RunSignUp · Final pricing shown at checkout.*
- Sunrise race video when available; an authentic still until then. Media is treated identically in either case.

### 2. Essential event strip

*Revised presentation — see §29.5. Content and the no-slider rule are unchanged.*

Presented as a row of pill chips directly beneath the hero frame, with times and distances set in Barlow Condensed. A static row displays:

- Half Marathon — 6:15 a.m.
- Two-Person Relay — 6:15 a.m.
- 10K — 7:00 a.m.
- 5K — 7:00 a.m.

Do not use an automatic slider for critical schedule information.

### 3. Emotional introduction

Suggested statement:

> Ocean air. Sunrise miles. Las Olas energy. A finish line by the beach.

Use large race photography and restrained scroll movement.

### 4. Choose your race

Four separate cards, presented in a staggered offset grid on desktop — alternating vertical offset rather than a rigid row — and collapsing to a plain vertical stack on small screens. *Layout revised, see §29.6.*

- Half Marathon — $80
- Two-Person Relay — $110 per team
- 10K — $55
- 5K — $40

Each card includes its start time, a concise description, and a RunSignUp registration CTA.

Required pricing notice:

> Plus applicable RunSignUp processing fee. Final pricing is shown at checkout. Prices increase after October 2, 2026 at 11:59 p.m. EDT.

### 5. Course experience

Introduce Las Olas, Harbor Beach, and A1A through photography and concise storytelling.

Until maps are approved, use a discreet **Course maps coming soon** status rather than a large empty placeholder.

### 6. What every runner receives

- High-quality technical running shirt
- Finisher medal
- Professional event timing
- Live results messaging
- Free race photography
- Complimentary post-race beer for participants 21+ with valid identification
- Awards for top finishers

Use real product photography for the medal and shirt when available.

### 7. Relay experience

Explain the relay as both a race format and an emotional team experience:

- Two team members
- Team Member 1 starts at 6:15 a.m.
- First leg: 6.4 miles
- The baton must be carried for the entire relay.
- Exchange location: E Las Olas and A1A southbound
- Second leg: 6.7 miles
- Team Member 1 may optionally travel to the corner of Seville Street and A1A.
- Team Member 1 may rejoin Team Member 2 for the final stretch.
- The shared finish is optional and intended for celebration, photography, and social media.

### 8. More than a race

Photography-led content should cover:

- Finish-line festival
- Friends and family
- Spectators
- Fort Lauderdale Beach and Las Olas
- Local pride
- Optional ideas for extending the race weekend

This section welcomes destination participants without presenting locals as tourists.

### 9. Race weekend snapshot

Show only the essential schedule:

- Saturday expo and primary packet pickup
- Sunday race-morning pickup
- First race start
- Post-race festival opening
- 10:00 a.m. course deadline

Link to the complete Race Weekend page.

### 10. Accessibility and community

- Brief accessibility introduction
- Link to the complete wheelchair and participation policy
- Restrained sponsor presentation

Sponsor logos support credibility without interrupting the registration journey.

### 11. Final conversion section

Use a joyful finish-line photograph or video.

**Headline:**

> YOUR START LINE IS WAITING

**Supporting message:**

> Choose your distance and join Fort Lauderdale at sunrise.

**CTA:**

> Register on RunSignUp

---

## 8. Approved Race Weekend page

This page functions as the participant's practical race guide. Unlike the emotional homepage, it prioritizes clarity, preparation, and confidence.

### 1. Compact hero

**Headline:**

> RACE THE COAST. CELEBRATE BY THE SEA.

**Supporting copy:**

> Start near Fort Lauderdale Beach, run through Las Olas, Harbor Beach, and A1A, then finish where the celebration begins.

Essential facts remain visible:

- Sunday, November 8, 2026
- Las Olas Oceanside Park
- First start: 6:15 a.m.
- Course support ends: 10:00 a.m.

The hero is shorter than the homepage hero so participants reach logistics quickly.

### 2. Sticky page index

Use a horizontal section navigator:

> Schedule · Packet Pickup · Your Packet · Bib & Timing · Race Rules · Accessibility · Festival

On mobile, this becomes a horizontally scrollable control.

### 3. Weekend timeline

#### Saturday, November 7

- 8:00 a.m.–6:00 p.m.
- Baptist Health South Florida Health and Fitness Expo
- Primary packet pickup
- Downtown Events Center
- 416 NE 1st Street, Fort Lauderdale, FL 33301

#### Sunday, November 8

- 4:30–6:00 a.m. — Race-morning registration and packet pickup
- 6:15 a.m. — Half Marathon and Relay start
- 7:00 a.m. — 10K and 5K start
- 7:00 a.m. — Post-race festival opens
- 10:00 a.m. — Course support ends

The schedule is static and must not use automatic animation.

### 4. Packet pickup

Use two clear location cards for Saturday and Sunday, followed by a preparation checklist:

- Bring photo identification.
- Saturday pickup is strongly recommended.
- Proxy pickup is permitted.
- A proxy must present a copy of the participant's identification.
- A copy displayed on a phone is accepted.
- Race-morning pickup closes at 6:00 a.m.

### 5. What is in your packet

Use four concise visual items:

- Race bib and emergency-contact area
- ChronoTrack B-Tag
- Safety pins
- Beer wristband for eligible participants age 21+

This content should be scannable rather than presented as another long text card.

### 6. Bib and timing guide

Keep detailed instructions available through two accordions:

- **How to wear and complete your bib**
- **How ChronoTrack timing works**

Keep these warnings visible outside the collapsed details:

- Do not fold, wrinkle, or alter the bib.
- Do not remove the timing tag.
- Do not transfer a bib or timing tag to another participant.

### 7. Race rules and safety

Organize rules by topic:

- Course deadline and walking
- Headphones
- Prohibited equipment and animals
- Aid stations
- Medical assistance
- Start-line and timing requirements
- Food and finish-line access
- Road closures

Unconfirmed road-closure details use **Coming soon**.

### 8. Accessibility

Present the wheelchair-racing and hand-cycle policy respectfully and avoid pairing a large promotional image with a long legal paragraph.

Use:

- A concise accessibility introduction
- Wheelchair participation details
- Hand-cycle restriction
- Link or contact for accommodation questions
- City accessibility reference when confirmed

### 9. Finish-line festival

End the operational page with celebration and energy:

- Finish-line photography
- Food
- Complimentary participant beer policy
- Awards
- Friends and spectators
- Link to spectator information

Final actions:

- **Choose Your Race**
- **Register on RunSignUp**

---

## 9. Approved Distances page

Use one conversion-focused page with anchored sections rather than four separate pages. This keeps comparison easy and avoids duplicating shared rules.

### 1. Hero

**Headline:**

> FIND YOUR START LINE

**Supporting message:**

> Go long, run fast, team up, or make your first finish unforgettable.

Actions:

- **Compare the races**
- **Register on RunSignUp**

### 2. Distance comparison

Use four race cards followed by a compact comparison table:

| Event | Distance | Start | Base price |
|---|---:|---:|---:|
| Half Marathon | 13.1 miles | 6:15 a.m. | $80 |
| Two-Person Relay | 6.4 + 6.7 miles | 6:15 a.m. | $110 per team |
| Fort Lauderdale A1A 10K | 10 kilometers | 7:00 a.m. | $55 |
| Fort Lauderdale A1A 5K | 5 kilometers | 7:00 a.m. | $40 |

Each race receives a distinct emotional promise and RunSignUp CTA.

### 3. Half Marathon

Position the Half Marathon for runners seeking the complete coastal experience.

Include:

- Las Olas, Harbor Beach, and A1A route introduction
- Professional timing and live results
- 10:00 a.m. completion deadline
- **Course map coming soon**
- Registration benefits
- RunSignUp CTA

### 4. Two-Person Relay

Use a simple two-leg diagram to explain:

- Team Member 1 runs 6.4 miles.
- The baton must be carried throughout the relay.
- The exchange occurs at E Las Olas and A1A southbound.
- Team Member 2 runs 6.7 miles.
- Team Member 1 may optionally travel to Seville Street and A1A.
- Team members may optionally reunite for a shared finish, celebration, and photography.

Make clear that $110 is the team price and both members must satisfy the age requirement.

### 5. Fort Lauderdale A1A 10K

Position the 10K as a meaningful challenge without the Half Marathon commitment.

Include:

- 7:00 a.m. start
- Coastal course experience
- Professional timing
- 10:00 a.m. completion deadline
- **Course map coming soon**
- RunSignUp CTA

### 6. Fort Lauderdale A1A 5K

Position the 5K for first-time racers, families, friends, and runners seeking a shorter, fast event.

Include:

- 7:00 a.m. start
- Welcoming but professionally organized experience
- Walking permitted
- 10:00 a.m. completion deadline
- **Course map coming soon**
- RunSignUp CTA

### 7. Shared eligibility and pricing notice

- Participants must be at least 14 years old on race day.
- Younger participants require a minor waiver.
- Capacity is limited.
- Displayed prices are base prices and exclude variable RunSignUp fees.
- Prices increase after October 2, 2026 at 11:59 p.m. EDT.
- Registration is final.
- Distance changes close October 25, 2026 at 11:59 p.m. EDT.

### 8. Final race selector

End with the four race cards again in a simplified format for immediate registration conversion.

---

## 10. Approved Plan Your Trip page

Launch Plan Your Trip as one strong hub page with four anchored sections. Training, Parking, and Spectator content may become separate pages later if the content grows substantially.

This keeps the initial scope focused and prevents thin pages while hotel and transportation programs remain unavailable.

### 1. Hero

**Headline:**

> MAKE A WEEKEND OF IT

**Supporting message:**

> From training days to race morning, everything you need to enjoy Fort Lauderdale and arrive ready.

Actions:

- **Prepare for race day**
- **Explore Fort Lauderdale**

The copy welcomes visitors without implying that locals need a travel guide.

### 2. Quick planning menu

Use four anchored cards:

- Explore Fort Lauderdale
- Train for the race
- Parking & Directions
- Spectator Guide

### 3. Explore Fort Lauderdale

Use the approved destination message:

> Come for the race, stay for the fun.

Feature:

- Fort Lauderdale Beach
- Las Olas Boulevard
- Waterfront promenades
- Shopping and dining
- Waterways and local activities

Until official programs exist, display:

- **Hotel information coming soon**
- **Transportation guidance coming soon**

Do not recommend specific commercial properties without an approved partnership.

### 4. Training

**Headline:**

> PREPARE TO BEAT YOUR BEST

Present the benefits of organized training in short, motivating copy rather than one animated paragraph.

Include two partner cards:

- Life Time Run customized training plan
- Life Time Run one-to-one coaching

Verify external links before launch. Each external action must clearly identify Life Time Run as the destination.

Source links to verify:

- Customized run plan: <http://lifetimerun.com/Sub_Training/run-plan#Planspricing>
- One-to-one coaching: <http://lifetimerun.com/Sub_Training/run-coach>
- Training delivery platform referenced in the original content: <http://home.trainingpeaks.com/>

### 5. Parking & Directions

**Headline:**

> GET TO THE START WITH TIME TO SPARE

Lead with:

- Arrive early.
- Carpooling is recommended.
- Road closures are managed by police and race crews.
- Final road closures are coming soon.

Present the five parking locations in a sortable list or compact map-supported layout:

- Las Olas Parking Garage
- Las Olas E Lot
- Beach Place Lot
- Sebastian Beach Lot
- South Beach Lot

Show address, capacity, distance to the start, and walking directions. Prefer a comparison list to a large card grid.

Preserve this proposed parking data and verify it before publication:

| Parking location | Proposed address | Proposed capacity | Distance to start |
|---|---|---:|---:|
| Las Olas Parking Garage | 200 Las Olas Circle, Fort Lauderdale, FL 33316 | 650 spaces | 0.2 miles |
| Las Olas E Lot | S. Birch Road, immediately north of Las Olas | 140 spaces | 0.1 miles |
| Beach Place Lot | 17 S. Fort Lauderdale Beach Boulevard, Fort Lauderdale, FL 33316 | 200 spaces | 0.2 miles |
| Sebastian Beach Lot | Sebastian Street and A1A | 80 spaces | 0.4 miles |
| South Beach Lot | 1100 Seabreeze Boulevard, Fort Lauderdale, FL 33316 | 400 spaces | 0.4 miles |

### 6. Spectator Guide

**Headline:**

> CHEER THEM TO THE FINISH

Include:

- Start and finish location
- Suggested viewing areas when confirmed
- Race start times
- Finish-line festival
- Runner-tracking link when available
- Parking guidance
- Course access and safety
- Encouragement for signs, photography, and team celebrations

The content gives families a useful role instead of only stating that spectators matter.

### 7. Race-morning checklist

Use a concise checklist:

- Registration complete
- Packet collected
- Bib prepared
- Parking selected
- Arrival time planned
- Weather checked
- Emergency contact completed

### 8. Final action

**Headline:**

> READY FOR FORT LAUDERDALE?

Actions:

- **Choose Your Race**
- **View Race Weekend**

---

## 11. Approved Results & Photos page

Keep this page simple while adapting its content across the event lifecycle.

### 1. Hero

Use finish-line video showing effort, relief, celebration, friends, and families.

**Headline:**

> EVERY FINISH TELLS A STORY

**Supporting message:**

> Find race results, relive the finish line, and celebrate every mile.

### 2. Before race day

Display:

- **2026 results will appear here after the race**
- **2026 race photography will be published when available**
- Previous results
- Previous event galleries

Do not show empty or inactive 2026 links.

### 3. On race day

Promote one primary action:

- **View Live Results**

Supporting actions:

- Find a participant
- View available race photography
- Share the event hashtag

The results provider remains external.

### 4. After race day

Use two prominent cards:

#### Results

- 2026 official results
- Participant search
- Previous-year archive
- Clear external-link indicator

#### Photos

- 2026 race photography
- Previous event galleries
- Instructions for finding participant photos when available
- Clear external-link indicator

Do not copy or host result data unless a provider later supplies an approved integration.

### 5. Archive

Organize past events by year rather than displaying many unrelated links:

- 2026
- 2025
- 2024
- Earlier events

Each year may contain separate Results and Photos actions.

### 6. Emotional closing

Use an authentic finish-line photograph.

**Message:**

> You earned the finish. Now relive it.

Actions:

- **View Results**
- **Find Your Photos**

---

## 12. Approved Community page

Combine Partners, Teams, Charities, Volunteer, and Sponsorship into one Community hub. This preserves all content while preventing secondary organizational pages from competing with race registration.

### 1. Hero

Use authentic footage of volunteers, teams, children, adults, supporters, and finishers.

**Headline:**

> RACING IS BETTER TOGETHER

**Supporting message:**

> Meet the partners, teams, volunteers, and local community that bring Fort Lauderdale's race weekend to life.

Actions:

- **Join a team**
- **Volunteer**

### 2. Community navigation

Use anchored links:

> Partners · Teams & Groups · Charities · Volunteer · Sponsorship

### 3. Partners

Present sponsors according to confirmed hierarchy rather than giving every logo equal prominence.

#### Title sponsor

- Liquid Youth

#### Presenting and medical partner

- Baptist Health South Florida

#### Event partners and sponsors

- Visit Lauderdale
- Fort Lauderdale Beach Improvement District
- Dole
- 7-Eleven
- Split Second Timing
- WildSide
- Running Wild

Use a calm logo wall with minimal automatic movement. If logos use a controlled marquee on a smaller screen, visitors must be able to pause it.

### 4. Teams and groups

Promote:

- Running clubs
- Coworkers
- Friends and families
- Traveling groups
- Relay teams
- Community organizations

Include a RunSignUp team or group registration action when the correct destination link is available.

### 5. Charities

Introduce the opportunity to race for a cause.

Until organizations and programs are confirmed, display:

> 2026 charity partnerships will be announced soon.

Do not invent participating charities or donation arrangements.

### 6. Volunteer

Replace the long animated paragraph with structured content:

- Why volunteering matters
- Who can participate
- Individual and group volunteering
- Example race-day roles when confirmed
- What volunteers receive
- Volunteer expectations
- Contact information
- RunSignUp volunteer CTA

Preserve the community-focused tone and approved social hashtag. Verify coordinator names and email addresses before publication.

Original volunteer contacts to verify:

- Matt Lorraine — <Lorraine@exclusivesports.com>
- Josh Stern — <Josh@splitsecondtiming.com>

Volunteer social hashtag:

> #13.1FortLauderdalevolunteer

### 7. Sponsorship

Use a concise business-oriented section:

> Interested in becoming a sponsor?

Explain opportunities for local, national, and international organizations, then provide one sponsorship contact action.

Keep this visually and contextually separate from participant registration.

### 8. Community gallery

Use authentic photography showing:

- Volunteer crews
- Running clubs
- Relay teams
- Spectators
- Sponsor activations at the festival
- Finish-line celebrations

### 9. Closing actions

**Headline:**

> FIND YOUR PLACE IN THE FESTIVAL

Actions:

- **Register to Race**
- **Join or Create a Team**
- **Volunteer**
- **Become a Sponsor**

---

## 13. Approved FAQ page

The FAQ functions as a fast support tool rather than one long uninterrupted accordion.

### 1. Hero

**Headline:**

> EVERYTHING YOU NEED TO KNOW

**Supporting message:**

> Quick answers for registration, race day, course rules, and the finish-line festival.

Include a prominent search field:

> Search race questions…

### 2. Popular questions

Show the most frequently needed answers first:

- What time does each race start?
- Where are the start and finish?
- When and where is packet pickup?
- Can I walk?
- How long is the course supported?
- How do I register?

Each item links directly to its answer within the page.

### 3. Registration and eligibility

- What is the age requirement?
- How does the minor-waiver process work?
- Is race capacity limited?
- Can I change my distance?
- Are refunds or deferrals available?
- Is race insurance available?
- When do prices increase?

### 4. Schedule and course

- What time does each event start?
- Where are the start and finish?
- When does course support end?
- Can participants walk?
- Is an early start available?
- Is the course USATF-certified?
- How many aid stations are available?
- When will course maps be published?

Unconfirmed certification and aid-station details remain labeled **Coming soon**.

### 5. Rules and safety

- Are headphones allowed?
- Are baby joggers permitted?
- Are dogs, bicycles, skateboards, or similar equipment permitted?
- What happens if a participant is injured?
- What medical support is available?
- What is the wheelchair-racing policy?
- Are hand cycles permitted?
- What happens during severe weather?

### 6. Race-day logistics

- When and where is packet pickup?
- Can someone else collect my packet?
- What identification is required?
- Where can participants park?
- When will road-closure information be available?
- Is gear check available?

### 7. Finish-line festival

- Is food available?
- Who can enter the participant food area?
- Who receives the complimentary beer?
- Can spectators attend the festival?
- Where can results and photographs be found?

### 8. Contact and feedback

**Headline:**

> STILL HAVE A QUESTION?

Actions:

- Contact the race team
- Email <info@131FortLauderdale.com>
- Visit RunSignUp registration support

### Interaction rules

- Group accordions by category.
- Only one answer needs to be open at a time.
- Give every question a direct URL anchor.
- Search filters questions immediately.
- Answers link to authoritative internal pages for complete details.
- FAQ copy must not become a second, conflicting source for operational information.

---

## 14. Approved navigation and registration behavior

### Desktop header

The primary header contains:

- Event logo
- Race Weekend
- Distances
- Plan Your Trip
- Results & Photos
- Community
- FAQ
- **Register**

*Revised — see §29.7.* The header is a **floating Atlantic Navy pill**, detached from the page edges with Coastal Sand visible around it, and solid from first paint on every page including the homepage. Because the inset hero (§7.1) places the header on sand rather than over moving media, the previous transparent-over-hero behavior is no longer needed; this removes an entire class of text-contrast-over-video risk. On scroll the header gains only a soft shadow and backdrop blur.

The Register action is a coral pill with an Atlantic Navy label, per §15.

The active page receives a visible indicator that does not rely on color alone.

### Dropdown behavior

Use small, focused dropdowns only where they help:

- **Distances:** Half Marathon, Relay, 10K, 5K
- **Plan Your Trip:** Explore, Training, Parking, Spectator Guide
- **Community:** Partners, Teams, Charities, Volunteer, Sponsorship

Race Weekend, Results & Photos, and FAQ remain direct links.

Dropdowns must work with mouse, keyboard, and touch. They must not depend on hover alone.

### Mobile header

The compact header contains:

- Event logo
- Register button
- Menu button

The menu opens as a full-height Atlantic Navy panel with large, readable navigation.

- Sublinks expand as accordions.
- The current page is clearly indicated.
- Escape closes the menu when a keyboard is used.
- Focus remains inside the menu until it closes.
- Body scrolling is disabled while the menu is open.

### Sticky registration CTA

After the visitor scrolls beyond the homepage hero, mobile displays a sticky bottom action:

> Register on RunSignUp

The sticky action:

- Respects device safe areas
- Never covers page content
- May hide temporarily when another registration CTA is already visible near the bottom of the viewport

### RunSignUp behavior

Registration CTAs open RunSignUp in the same browser tab.

Every action says **Register on RunSignUp** or clearly identifies RunSignUp nearby. A small external-service icon may reinforce the destination but must not be the only indicator.

Primary destination:

<https://runsignup.com/Race/FL/FortLauderdale/FortLauderdale131>

### Other external links

Results, photos, training programs, and partner sites may open in a new tab because visitors may want to retain their place on the event website.

Accessible link text must indicate when a new tab opens.

### Footer

The footer contains:

- Event logo and concise coastal-race statement
- Event date and Las Olas Oceanside Park location
- Primary navigation
- Race Weekend, packet pickup, parking, results, and FAQ utility links
- RunSignUp registration link
- Contact email
- Social links when confirmed
- Sponsor acknowledgement
- Privacy, accessibility, cookie, and terms links when applicable

The footer remains readable and useful without becoming another full sitemap.

---

## 15. Approved reusable component system

Use a small, consistent component family rather than designing every section independently.

### Global components

- Desktop and mobile header
- Footer
- Sticky mobile registration CTA
- Event information strip
- Page hero
- Section introduction
- Primary and secondary buttons
- External-link treatment
- Status notice: Coming soon, Updated, or Important
- Media block for photography and video

### Content components

- Race card
- Distance comparison table
- Weekend timeline
- Location and packet-pickup card
- Feature or registration-benefit item
- Relay-leg diagram
- Planning checklist
- FAQ accordion
- Partner logo group
- Results and photos archive row
- Contact panel
- Final conversion section

### Button hierarchy

All buttons use the pill radius defined in §4.

#### Primary

*Revised — see §29.2.* Use a Sunrise Coral fill with an **Atlantic Navy label**. Navy on coral measures 5.6:1 and passes AA at every size; white on coral measures 2.8:1 and fails, so white labels must not be used on coral.

Primary actions:

- Register
- Choose Your Race
- View Live Results when active

#### Secondary

Use Atlantic Navy or a white outlined treatment.

Secondary actions:

- Explore Race Weekend
- View details
- Plan Your Trip

#### Text action

Use a simple directional link with a visible arrow for:

- Supporting navigation
- Internal section jumps
- Related information

Do not use coral buttons for every action. The registration path remains visually dominant.

### Typography rules

*Revised — see §29.1.*

- Use Fraunces for campaign headlines, page titles, and section headlines.
- Use Barlow Condensed for times, distances, prices, and major numeric information.
- Use Manrope for body copy, navigation, buttons, labels, schedules, forms, policies, FAQ answers, and eyebrow labels.
- Do not set long paragraphs in condensed or display typography.
- Do not use uppercase for operational body content.
- Short major headlines may use uppercase.
- Fraunces italic is an accent within a headline, not a treatment for whole paragraphs.

### Card behavior

Cards do not all use an identical treatment.

- Race cards emphasize choice and registration.
- Location cards emphasize address and time.
- Information cards emphasize scanning.
- Sponsor items remain visually quiet.
- Clickable cards require a visible action label.
- The entire card may also be clickable.
- Hover effects require equivalent keyboard-focus states.

### Layout rhythm

- Use generous White and Coastal Sand space.
- Alternate photographic and informational sections.
- Avoid stacking many card grids consecutively.
- Reserve full-width media for important emotional moments.
- Keep text lines at comfortable reading lengths.
- Maintain a consistent content width across operational pages.

### Motion behavior

- Use one primary motion idea per section.
- Do not animate schedules, prices, policies, or accessibility instructions.
- Keep hover movement subtle.
- Scroll reveals use short distances and durations.
- Video never autoplays with sound.
- Reduced-motion settings replace animation with a static presentation.

---

## 16. Approved responsive and accessibility requirements

### Accessibility target

Target **WCAG 2.2 Level AA**.

This is a design and implementation requirement rather than a final legal certification.

### Keyboard and focus

- Every interactive element works without a mouse.
- Focus indicators are clearly visible.
- Include a **Skip to main content** link for keyboard users.
- Dropdowns, mobile navigation, accordions, and search have predictable keyboard behavior.
- Focus never becomes trapped except inside an intentionally open modal or mobile menu.
- Closing an overlay returns focus to the control that opened it.

### Color and typography

- Body text meets at least 4.5:1 contrast. Atlantic Navy on Coastal Sand measures 13.9:1 and is the default body pairing.
- Large text and interface elements meet applicable AA contrast requirements.
- The measured contrast matrix in §4 governs every color pairing. **Teal, gold, and coral all fail as text on light surfaces** and are restricted to fills and graphic elements accordingly.
- Coral fills carry Atlantic Navy labels. White on coral fails AA and must not be used.
- Information never depends on color alone.
- Text remains usable at 200% zoom. Fraunces is verified for legibility at 200% zoom and at small screen sizes, where high-contrast serifs can thin out.
- Layout reflows without horizontal page scrolling at narrow widths.
- Manrope body copy uses a comfortable line height and readable minimum size.

### Touch and mobile

- Interactive targets are at least approximately 44×44 pixels.
- Sticky registration controls respect device safe areas.
- Buttons are separated enough to prevent accidental taps.
- Horizontal section navigation clearly indicates that it can scroll.
- No essential action depends on hover.

### Video and photography

- Video never autoplays with sound.
- Hero video includes a pause control.
- A strong poster image appears before the video loads or when autoplay is unavailable.
- Meaningful images receive useful alternative text.
- Decorative images use empty alternative text.
- Video containing essential spoken information requires captions or a transcript.
- Reduced-motion users receive a static or minimally animated experience.

### Responsive content behavior

- Race cards stack vertically on small screens.
- Comparison tables become accessible stacked rows when necessary.
- Timeline content remains chronological.
- Packet-pickup locations retain dates, times, and addresses together.
- Sponsor logos wrap into a stable grid.
- Relay diagrams provide equivalent text descriptions.
- FAQ search and accordions remain fully usable on small screens.

### Content comprehension

- Operational instructions use plain language.
- Long policies use headings, bullets, and accordions.
- Dates include the year.
- Times consistently include a.m./p.m. and the appropriate timezone when deadlines are involved.
- External links clearly identify their destination and new-tab behavior.
- Error, warning, and **Coming soon** states include text rather than relying on icons or color alone.

### Performance as accessibility

- Optimize hero video and provide smaller mobile versions.
- Avoid loading every gallery image immediately.
- Reserve image dimensions to prevent layout shifts.
- Prioritize page text and registration controls before decorative media.
- The website remains useful on slower mobile connections.

---

## 17. Approved event lifecycle states

The website changes priorities before, during, and after the event without requiring a redesign.

### Registration mode

This is the primary mode from launch through race week.

Priorities:

- Register on RunSignUp
- Choose a distance
- Prices and price-increase deadline
- Course experience
- Training and planning
- Capacity messaging

Before October 2, display:

> Register before prices increase on October 2 at 11:59 p.m. EDT.

Do not use a resetting or artificial countdown.

### Race-week mode

Begins Monday, November 2, 2026.

Homepage priorities shift toward:

- Packet pickup
- Weekend schedule
- Parking
- Race-morning checklist
- Weather and safety updates
- Road closures when available
- Registration while RunSignUp remains open

Approved banner:

> Race week is here. Review packet pickup and race-day details.

### Race-day mode

Begins early Sunday, November 8, 2026.

Priorities:

- Start times
- Las Olas Oceanside Park location
- Parking and road closures
- Live results
- Participant tracking
- Emergency updates
- Finish-line festival

Once registration closes, replace registration CTAs with:

- **View Live Results**
- **Find a Participant**
- **Race-Day Information**

### Post-race mode

Activate after the event.

Homepage priorities become:

- Thank participants, volunteers, sponsors, and spectators
- 2026 results
- Race photography
- Participant survey
- Highlights gallery
- Email updates for the next event

Keep the 2026 information available in an archive.

### Control method

Use one central event-status setting:

- `registration`
- `race-week`
- `race-day`
- `post-race`

Known date transitions may be scheduled, but the race team must have a manual override. This covers early registration closure, delayed results, schedule changes, and emergency conditions.

Emergency messaging uses an independent banner that can be activated without changing the entire site mode.

---

## 18. Approved conversion measurement, privacy, and SEO

### Primary conversion

The main success action is a visitor clicking from the event website to RunSignUp.

Track:

- Header registration clicks
- Sticky mobile registration clicks
- Hero registration clicks
- Distance-card registration clicks
- Final-section registration clicks
- Selected distance when the context is known
- Page and campaign source for the outbound click

Use consistent campaign parameters when appropriate so RunSignUp traffic sources can be compared with website analytics.

### Supporting measurements

Track only interactions that help improve the participant journey:

- Race Weekend views
- Packet-pickup detail views
- Parking-detail views
- FAQ searches
- FAQ questions opened
- Live-results clicks
- Photo-provider clicks
- Volunteer clicks
- Team or group registration clicks

Avoid vanity tracking that does not inform a decision.

### Privacy principles

- Do not send health, age, registration-form, or other sensitive participant information to website analytics.
- Do not duplicate RunSignUp participant data.
- Use a privacy-respecting analytics configuration.
- Show consent controls when required by the chosen analytics and advertising tools.
- Document each analytics event and its purpose before launch.

### Search and sharing

- Give every page a unique title and description.
- Use canonical URLs.
- Generate an XML sitemap and appropriate robots directives.
- Provide Open Graph and social-sharing metadata.
- Use a strong approved race image for social previews.
- Add structured event data using the confirmed event name, date, location, offers, and official registration URL.
- Do not include unknown course, capacity, or schedule facts in structured data.
- Use clear headings and descriptive internal links.
- Avoid keyword stuffing and duplicate operational copy.

Preview and staging environments must not be indexed.

---

## 19. Approved technical scope and launch validation

### Implementation-neutral scope

This brief does not prescribe a framework or hosting provider. Those choices belong in the implementation plan and must support:

- Responsive public pages
- Central race-information data
- Central event-status control
- Easy editing of confirmed operational content
- Optimized photography and video
- Accessible interactive components
- Reliable external links
- Search metadata and structured event data
- Analytics without participant-data duplication

The public website does not process race registration or payment.

### Content states

Every unavailable item uses one of these explicit states:

- **Coming soon** for expected information
- **To be announced** for unconfirmed programs or partners
- **Registration closed** when RunSignUp registration is unavailable
- **Updated** for important newly published information

Do not display empty modules, inactive buttons, or invented temporary content.

### Failure and fallback behavior

- If video fails, show the approved poster image.
- If an external provider is unavailable, retain the page and show a clear temporary message.
- If results or photos are delayed, show when visitors should check again if known.
- If JavaScript is unavailable, essential schedules, locations, policies, and registration links remain accessible.
- Provide a useful custom 404 page with links to Race Weekend, Distances, FAQ, and RunSignUp.

### Pre-launch validation

Before publication:

1. Reconfirm dates, start times, addresses, prices, deadlines, and policies.
2. Resolve or clearly label every pending content item.
3. Verify every RunSignUp, training, results, photos, sponsor, email, and map link.
4. Verify sponsor names, hierarchy, logo files, and usage permission.
5. Review every page on representative mobile, tablet, laptop, and wide-screen sizes.
6. Test keyboard navigation, focus order, zoom, contrast, reduced motion, and screen-reader labeling.
7. Test videos, poster images, responsive images, and slow-connection fallbacks.
8. Validate registration, race-week, race-day, and post-race modes.
9. Validate the emergency banner independently.
10. Confirm analytics events without sending personal or sensitive data.
11. Validate titles, descriptions, canonical URLs, sitemap, robots rules, social previews, and structured event data.
12. Test missing pages, unavailable providers, and closed-registration states.
13. Conduct a final editorial review for accuracy, tone, spelling, capitalization, and consistent event naming.

### Launch acceptance

The website is ready to launch only when:

- The registration path works on desktop and mobile.
- No known factual contradiction remains.
- Critical information is usable without animation or video.
- All approved pages and responsive states are present.
- Accessibility and performance checks meet the agreed target.
- Pending content is explicitly labeled.
- The event team can change lifecycle mode and emergency messaging.

---

## 20. Confirmed race information

### Official event

- **Name:** The 20th Annual Liquid Youth Fort Lauderdale Running Festival
- **Date:** Sunday, November 8, 2026
- **Start/finish area:** Las Olas Oceanside Park
- **Address:** 3000 E Las Olas Blvd, Fort Lauderdale, FL 33316

### Distances, starts, and base prices

| Event | Start | Base price |
|---|---:|---:|
| The Liquid Youth Half Marathon | 6:15 a.m. | $80 |
| Two-Person Half Marathon Relay | 6:15 a.m. | $110 per team |
| Fort Lauderdale A1A 10K | 7:00 a.m. | $55 |
| Fort Lauderdale A1A 5K | 7:00 a.m. | $40 |

All displayed prices must be described as base prices. RunSignUp controls the final checkout price and processing fee.

### Price increase

Prices increase after **October 2, 2026 at 11:59 p.m. EDT**.

### Eligibility

- Participants must be at least 14 years old on November 8, 2026.
- The age requirement applies to all four events and both relay members.
- A younger participant may participate only after arranging a minor waiver.
- Minor-waiver contact: <info@131FortLauderdale.com>

### Completion deadline

- All four events must be completed by 10:00 a.m.
- Half Marathon and Relay participants have 3 hours 45 minutes from the 6:15 a.m. start.
- Walkers are welcome.
- Walkers start behind runners.
- There is no early start.

### Capacity

Exact participant caps are not known.

Approved public wording:

> Capacity is limited. Register early to secure your preferred distance.

---

## 21. Confirmed expo and packet pickup

### Primary packet pickup and expo

- **Date:** Saturday, November 7, 2026
- **Time:** 8:00 a.m.–6:00 p.m.
- **Name:** Baptist Health South Florida Health and Fitness Expo
- **Venue:** Downtown Events Center
- **Address:** 416 NE 1st Street, Fort Lauderdale, FL 33301

RunSignUp currently shows November 8 for the expo. That date is incorrect; November 7 is the approved event date.

### Race-morning packet pickup

- **Date:** Sunday, November 8, 2026
- **Time:** 4:30–6:00 a.m.
- **Location:** Registration tent at Las Olas Oceanside Park
- **Address:** 3000 E Las Olas Blvd, Fort Lauderdale, FL 33316

### Packet-pickup rules

- All participants must pick up their packet to participate.
- Saturday pickup is strongly recommended.
- Third-party or proxy pickup is allowed.
- A copy of the participant's photo identification must be presented.
- A copy displayed on a phone is accepted.
- Race-morning pickup ends at 6:00 a.m.

### Packet contents

- Bib number with gear-check tag and emergency-contact area
- ChronoTrack B-Tag attached to the back of the bib
- Safety pins
- Post-race beer wristband for eligible participants age 21+ with valid identification

### Detailed bib and timing content to preserve

- Participants must complete the medical information and emergency-contact fields on the back of the bib.
- The ChronoTrack B-Tag attached to the bib is the participant's single-use timing device.
- The bib must remain clearly visible on the front and outside of all clothing throughout the event.
- Do not alter, fold, or wrinkle the bib.
- Secure the bib to the front of the running outfit with the provided safety pins.
- Bibs and timing tags are non-transferable and may be used only by the assigned participant.
- Participants must cross the start line during the official start period.
- A participant who starts before the official time or after the starting mats are removed will not receive an official time.
- The timing tag remains attached to the back of the bib and records clock time and chip time.

---

## 22. Approved registration policies

### Refunds, deferrals, and insurance

> All registrations are final. No refunds or deferrals are available. Optional race insurance may be purchased through RunSignUp when offered at checkout.

### Distance changes

- Distance changes close Sunday, October 25, 2026 at 11:59 p.m. EDT.
- Upgrades are completed through the participant's RunSignUp account.
- Participants pay any price difference for an upgrade.
- Downgrades are requested through <info@131FortLauderdale.com>.
- Downgrades do not receive a refund of the price difference.

---

## 23. Accessibility and safety

### Wheelchair participation

- Athletes using wheelchairs are welcome.
- There is no hand-cycle division.
- Hand cycles, hand bikes, hand-crank devices, and mechanically gear-driven devices are not permitted.
- The event follows applicable recognized wheelchair-racing rules.

General city accessibility requirements also apply. Final accessibility copy should provide a clear contact method for accommodation questions.

### Road closures

Official road closures are managed by police and race crews. Confirmed road-closure details will be published when available.

### Emergency and severe weather

Approved public policy:

> Safety comes first. Severe weather or other emergency conditions may require the event team and public-safety officials to delay, modify, or cancel the event. Follow official event communications for current instructions.

---

## 24. Confirmed sponsors and partner

### Sponsors

- Liquid Youth
- Baptist Health South Florida
- Visit Lauderdale
- Fort Lauderdale Beach Improvement District
- Dole
- 7-Eleven
- Split Second Timing
- WildSide
- Running Wild

Official organization names, logo files, usage permissions, and sponsor hierarchy must be confirmed before publication.

### Training partner

- Life Time Run

Existing Life Time Run program names and external URLs must be verified before publication.

---

## 25. Motion and interaction principles

- Motion should communicate energy and progression.
- Use movement selectively; do not animate every section.
- Critical schedules, policies, and prices must remain stationary and readable.
- Avoid automatic carousels for important content.
- Respect reduced-motion preferences.
- Do not allow video or decorative movement to compromise readability.
- Scroll effects should feel smooth and premium, not theatrical or distracting.

---

## 26. Source-of-truth rules

1. Approved information in this brief governs the website.
2. RunSignUp governs registration checkout and participant-account functionality.
3. Confirmed event-team corrections override known errors on RunSignUp, including the expo date.
4. Unknown information must be labeled **Coming soon** or **To be announced**.
5. Do not invent operational facts.
6. All dates, locations, links, prices, sponsor names, and policies require a final pre-launch audit.
7. After the project owner approves a planning or design section, update this brief immediately before moving to the next section.

---

## 27. Known pending information

The structure must support these items when they become available:

- Course maps
- Elevation profiles
- Course certification number
- Aid-station count, locations, and drink details
- Final road-closure details
- Participant caps
- Hotel or accommodation program
- Transportation guidance
- Results provider links
- Photography provider links
- Final medal and shirt imagery
- Accessibility accommodation contact
- Awards categories
- Final sponsor logo files and hierarchy
- Gear-check procedures and location
- Final charity partners and programs
- Final team or group registration link
- Confirmed volunteer roles, benefits, contacts, and registration link
- Confirmed social-media accounts and event hashtags
- Privacy, accessibility, cookie, and terms content

The following claims appeared in the original content but require confirmation before being presented as fact:

- The course is USATF-certified.
- The course has 10 aid stations with water and sports drinks.
- Ambulance and bicycle EMS teams provide course support.
- Headphones are allowed with safety precautions.
- Baby joggers, skateboards, bicycles, and animals are prohibited.
- Participant food is restricted to registered participants.

These gaps do not block design planning.

---

## 28. Planning completion and implementation gate

The project owner approved the full planning direction, including:

- Positioning and audience strategy
- Atlantic Sunrise visual system
- Page architecture and content sequences
- Navigation and RunSignUp behavior
- Reusable components
- Responsive and accessibility requirements
- Event lifecycle states
- Conversion measurement, privacy, and SEO
- Technical scope and launch validation

Design planning is complete. Known pending operational content remains tracked in this brief and does not block implementation planning.

Do not begin website implementation until the project owner reviews this written specification and explicitly authorizes the implementation-planning stage.

---

## 29. Visual direction revision log

**Revision 1 — July 27, 2026.** The project owner supplied five reference websites showing the intended visual direction (stored in `assets/Photos/screenshots/`): PiFi, Petit, House Wine, Ecavo, and Sophia. Analysis identified a consistent taste signature — rounded and pill geometry, warm neutral backgrounds, serif display typography, eyebrow labels, credential strips beneath the hero, inset heroes with visible page margin, and asymmetric composition.

Four of the five references use serif display typography, which conflicted with the Barlow Condensed direction approved in §4. The project owner resolved that conflict and three related questions. The amendments below were approved before implementation began. **No approved copy changed.** The Atlantic Sunrise palette is unchanged; only its weighting and application changed.

References are inspiration, not templates. The patterns deliberately *not* adopted, with reasons, are recorded in `website-plan.md` §6.9 — chiefly star-rating social proof (no review corpus exists, and inventing one would violate §26.5), e-commerce chrome (registration is external), money-back guarantees (§22 states registration is final), and a sponsor logo wall beneath the hero (§7.10 places sponsors late and restrained).

| # | Section | Change | Reason |
|---:|---|---|---|
| 29.1 | §4 Typography, §15 Typography rules | Fraunces added as the display typeface; Barlow Condensed narrowed from all display to numerics, times, distances, and prices; Manrope unchanged | Reference direction is serif-led; the hybrid keeps condensed type where it earns its width operationally |
| 29.2 | §4 Color-use principles, §15 Button hierarchy, §16 | Coral confirmed as a fill color only; coral fills carry Atlantic Navy labels, never white; measured contrast matrix added | White on coral measures 2.8:1 and fails WCAG AA at every size. Navy on coral measures 5.6:1 and passes. This corrected an error carried in the first implementation plan |
| 29.3 | §4 | Shape language added — pill, card, hero, and input radii; navy-tinted shadows | All five references use rounded geometry; black shadows read muddy on a warm surface |
| 29.4 | §7.1 Hero | Full-screen hero replaced by an inset 28px rounded frame at ~80vh with sand margin; eyebrow label and micro-reassurance line added | Three of five references use inset heroes; the framing reads premium and designed |
| 29.5 | §7.2 Essential event strip | Presentation changed to pill chips beneath the hero frame; content and the prohibition on automatic sliders unchanged | All five references place a credential strip directly below the hero |
| 29.6 | §7.4 Choose your race | Four cards presented in a staggered offset grid on desktop, plain stack on mobile | House Wine's offset grid; asymmetry appears in three of five references |
| 29.7 | §14 Desktop header | Transparent-over-hero behavior replaced by a floating navy pill, solid from first paint on all pages | The inset hero places the header on sand rather than over media, so transparency is unnecessary — and removing it eliminates text-contrast-over-video risk |
| 29.8 | §4 Color-use principles | Coastal Sand established as the default page background; white demoted to a card surface; navy reserved as punctuation | All five references use warm neutral backgrounds; achieved entirely within the approved palette |

**Revision 2 — July 29, 2026.** The project owner supplied the presenting partner's reversed-out logo and a navigation reference (Shamrock Run Fest), and asked for the header to carry the full event title with the presenting partner, at full screen width.

This revision REVERSES parts of revision 1 and, in doing so, returns closer to the brief's original §14. That is deliberate, not drift: the floating pill existed only because an inset hero placed the header on sand. Once the header goes full-width over media, the original transparent-then-solid behaviour is the correct one again.

| # | Section | Change | Reason |
|---:|---|---|---|
| 29.9 | §14 Desktop header | Floating navy pill replaced by a FULL-WIDTH bar: transparent over the homepage hero, solid Atlantic Navy after scrolling, solid immediately on interior pages. This restores the original §14 wording that §29.7 had amended away | Owner direction; the pill could not carry a nine-word title plus a partner lockup |
| 29.10 | §14, §4 | Header identity is now a stacked wordmark — *Liquid Youth Fort Lauderdale / Running Festival* — with a separate "presented by" lockup carrying the Baptist Health mark | Measured: at 1440px the bar leaves 496px for a wordmark; the single-line title needs 578px at 22px. Stacking is the only way to keep the name legible AND show the partner |
| 29.11 | §12.3 | Baptist Health is shown in the header as presenting partner. Liquid Youth remains inside the event name as title sponsor | §12.3 hierarchy: the two tiers are not interchangeable and must not be levelled |
| 29.12 | §7.1 | Homepage hero is now FULL-BLEED and overlaid by the header, reversing §29.4's inset frame. Interior page heroes stay inset | A full-width nav above an inset hero reads disconnected. Interior pages keep the inset frame because their header is solid, which gives the separation the homepage gets from the media itself |
| 29.13 | §17 top bar | Restyled as a stationary ticker — dark bar, letterspaced caps, bullet separators — carrying the date, distances, venue and the active lifecycle message | The reference uses a scrolling marquee; the motion was NOT adopted. §7.2 forbids sliders for critical schedule information and §25 requires schedules stay stationary. It would also have been the third animated element on the homepage |
| 29.14 | §14 | Desktop navigation links now appear at 1280px rather than 1024px | Measured: the wider identity lockup wrapped the header to 108px at 1024px and 88px at 1280px. The header is now a fixed height and the links wait for room |
| 29.15 | §14 | The header Register button is hidden below 768px | Client direction: both sponsor marks matter more on a phone than a fourth registration entry point. Verified first that registration stays reachable — the sticky bottom bar now works on every page (it previously worked on none but the homepage) |
| 29.16 | §7.1, §4 | The homepage hero headline is now the event identity lockup — Liquid Youth mark, *FORT LAUDERDALE / Running Festival*, "presented by" + Baptist Health mark — replacing the campaign headline "RUN INTO THE / Sunrise" | Client direction, and consistent with §12.3: the title sponsor belongs inside the event name, the presenting partner below it at lower weight. The Liquid Youth mark is a STACKED wordmark, so it takes its own line — set inline it would drop to cap-height and leave the title sponsor the smallest thing in the hero. Side benefit: the `h1` is now the event name rather than a slogan, which is materially better for search |
| 29.17 | §7.1 | The approved campaign line survives as a gold italic lead-in to the hero lede: *Run into the sunrise.* Four ways to race… | §26.5 — approved copy is not discarded to make room for a layout change. Demoting rather than deleting keeps the hero reading identity → promise → action and costs no vertical space on desktop |
| 29.18 | §24 | Sponsor artwork for both marks was replaced with higher-resolution versions extracted from client-supplied SVGs | The supplied SVGs are PNG bitmaps in an SVG wrapper (zero glyph paths), so they do not scale — but they carry more pixels than the originals. Shipping them directly would have put 554KB on the LCP path; extracted and re-encoded they cost 53KB. See PRELAUNCH for the outstanding true-vector request |

Per §26.7, this brief was updated before implementation planning continued. The corresponding technical detail lives in `website-plan.md`.
