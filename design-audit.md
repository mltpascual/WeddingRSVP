# Frontend Design Skill — DFII Audit & Elevation Plan

## 1. Design Direction Summary

**Aesthetic Name:** Botanical Letterpress — Editorial Romanticism
**Key Inspiration:** Hand-crafted Filipino wedding invitation suites, editorial magazine layouts, Victorian botanical illustration

### DFII Score (Current State)

| Dimension                | Score | Notes |
|--------------------------|-------|-------|
| Aesthetic Impact          | 3     | Competent but predictable — every section is centered, uniform padding, no spatial surprise |
| Context Fit               | 4     | Warm palette and script fonts suit a wedding, but feels template-like |
| Implementation Feasibility| 5     | Clean React + Tailwind, no tech risk |
| Performance Safety        | 5     | Lightweight, lazy-loaded images |
| Consistency Risk          | -2    | Low risk — too consistent, actually monotonous |

**Current DFII = 3 + 4 + 5 + 5 − 2 = 15** ← Numerically high but aesthetic impact is the weak link.

### Core Problems Identified

1. **Symmetrical monotony**: Every single section follows the exact same pattern — centered title (script + serif), centered content, centered everything. This is the #1 anti-pattern from the skill.
2. **Uniform spacing rhythm**: Every section uses `py-20 md:py-32`. No breathing variation, no tension.
3. **Animation spam**: Every section uses the same `opacity-0 translate-y-8` → `opacity-100 translate-y-0` fade-in-up. No variety, no memorable entrance sequence.
4. **No spatial drama**: No overlap, no asymmetry, no breaking the grid. The gallery is the only section with visual variety.
5. **Color is correct but flat**: The palette is good (dusty rose, olive, gold, cream) but applied uniformly. No dominant/accent hierarchy in practice.
6. **Section dividers are repetitive**: Same botanical divider image between every section — becomes invisible noise.
7. **No memorable design anchor**: If you screenshot this with the logo removed, it could be any wedding template.

### Differentiation Anchor (Target)

> "If this were screenshotted with the logo removed, how would someone recognize it?"

**Answer:** The staggered parallax photo reveals, the vine-like gold thread connecting sections, and the editorial asymmetric layouts with intentional negative space.

---

## 2. Design System Refinements

### Typography (Already Good — Minor Tweaks)
- **Display:** Cormorant Garamond — excellent choice, keep
- **Script:** Great Vibes — appropriate for wedding, keep
- **Body:** Lora — solid serif, keep
- **Tweak:** Use Cormorant at extreme weights (300 vs 700) for more structural contrast. Use italic Lora for pull-quotes.

### Color (Refine Hierarchy)
- **Dominant:** Warm cream canvas `oklch(0.97 0.015 60)` — keep as base
- **Accent (Primary):** Dusty rose `oklch(0.62 0.1 20)` — use sparingly, only for names and CTAs
- **Accent (Secondary):** Warm gold `oklch(0.75 0.1 85)` — use for decorative lines, the "thread"
- **Grounding:** Deep olive `oklch(0.48 0.06 140)` — use for key headings only
- **Remove:** The even distribution. Rose should appear 3x more than gold. Olive is rare and impactful.

### Spacing Rhythm (Introduce Variation)
- Hero: Full viewport (keep)
- Story: Generous `py-28 md:py-40` — this is the emotional heart
- Timeline: Tighter `py-16 md:py-24` — functional, doesn't need drama
- Entourage: Medium `py-20 md:py-28`
- Dress Code: Generous `py-24 md:py-36` — visual showcase
- Gallery: Tight `py-12 md:py-16` — let images breathe without padding
- RSVP: Generous `py-28 md:py-40` — important CTA
- Gift/Snap/Footer: Compact `py-14 md:py-20`

### Motion Philosophy (Reduce & Elevate)
- **One strong entrance:** Hero sequence (staggered reveal of wreath → names → date → countdown)
- **Scroll reveals:** Use DIFFERENT animations per section type:
  - Text sections: Gentle fade (opacity only, no translate)
  - Photo sections: Clip-path reveal (wipe from edge)
  - Cards/forms: Scale from 0.97 → 1.0 with opacity
- **Hover states:** Meaningful only on gallery and CTAs
- **Remove:** Bounce animation on scroll indicator (too playful for editorial)

---

## 3. Section-by-Section Improvements

### Hero — KEEP mostly, refine entrance
- Add a very subtle parallax on the floral frame (CSS transform on scroll)
- Replace bounce scroll indicator with a gentle pulse

### Our Story — BREAK THE GRID
- Left-align the title instead of centering
- Make the large photo bleed to the edge (no max-width constraint)
- Add a thin gold vertical line connecting the text to the photos
- Use clip-path reveal animation instead of fade-up

### Event Details — ADD EDITORIAL FLAIR
- Offset the timeline slightly left, add a decorative element to the right
- Make the venue card asymmetric — left-aligned with a gold accent bar on the left edge

### Entourage — INTRODUCE HIERARCHY
- Parents get larger, more prominent treatment
- Use a two-column layout with a decorative vertical divider
- Add subtle gold ornamental brackets around names

### Dress Code — ALREADY STRONG, minor polish
- Stagger the Ninang/Ninong cards vertically (one slightly higher)
- Add a subtle paper texture to the illustration backgrounds

### Gallery — ELEVATE
- Add a parallax scroll effect on alternating images
- On hover, show a subtle golden border glow instead of just scale
- Add a film-grain overlay to the lightbox

### RSVP — MAKE IT FEEL LIKE AN ENVELOPE
- Add a decorative border that looks like an envelope flap
- Use a slightly different background (warmer, like parchment)
- Add a wax-seal-style decorative element

### Gift Guide — COMPACT & ELEGANT
- Reduce padding, this doesn't need to be a full section
- Integrate more tightly with the footer area

### Snap & Share — ADD PERSONALITY
- Make the hashtag feel like a rubber stamp or wax seal impression
- Add a subtle rotation to the hashtag container

### Footer — EDITORIAL CLOSE
- Add the botanical divider as a full-width element, not centered thumbnail
- Use the couple's script names at a much larger scale as a closing statement

### Section Transitions — REPLACE UNIFORM DIVIDERS
- Remove the repeated botanical divider image between every section
- Instead, use varied transitions: gold hairline, negative space, background color shift, or a single botanical element placed asymmetrically

---

## 4. Implementation Priority

1. **index.css** — Add new animations (clip-path reveal, scale-in), CSS custom properties for section-specific spacing, gold thread decorative line
2. **SectionDivider** — Replace with varied transition types
3. **Home.tsx** — Use different divider variants between sections
4. **OurStorySection** — Break the grid, left-align, edge-bleed photo
5. **EventDetailsSection** — Asymmetric venue card, refined timeline
6. **EntourageSection** — Hierarchy and ornamental brackets
7. **RSVPSection** — Envelope-inspired form container
8. **GallerySection** — Parallax and golden hover glow
9. **Navigation** — Add active section indicator
10. **HeroSection** — Refine entrance, remove bounce
11. **SnapShareSection** — Stamp/seal effect on hashtag
12. **FooterSection** — Larger closing statement
