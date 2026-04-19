# OffPay Landing Page — Architecture Pass Walkthrough

## What was built

A complete component architecture scaffold. Zero final content. Zero placeholder copy. Everything compiles clean under TypeScript strict mode (`noImplicitAny`, `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters`, `exactOptionalPropertyTypes`).

---

## Directory tree

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css          ← Tailwind v4 base (unchanged)
│   ├── layout.tsx           ← Root layout — Server Component; wires Navbar + Footer
│   └── page.tsx             ← Page orchestrator — Server Component; assembles sections
│
├── components/
│   ├── BrandLogoStrip.tsx   ← Server Component; CSS marquee (compositor-only)
│   ├── Cta.tsx              ← Client Component; scroll fade-in
│   ├── Faq.tsx              ← Client Component; accordion, CSS height animation
│   ├── Features.tsx         ← Client Component; scroll-stagger
│   ├── Footer.tsx           ← Server Component; zero JS overhead
│   ├── Hero.tsx             ← Client Component; GSAP stagger entrance
│   ├── Navbar.tsx           ← Client Component; scroll-direction hide/show
│   ├── Pricing.tsx          ← Client Component; scroll-stagger cards
│   ├── SectionWrapper.tsx   ← Server Component; layout primitive
│   └── Testimonials.tsx     ← Client Component; scroll-stagger grid
│
├── constants/
│   └── index.ts             ← All strings, numbers, nav links, FAQ items, etc.
│
├── hooks/
│   ├── useGsapRef.ts        ← Convenience hook: wires ref → GSAP with cleanup
│   ├── useMediaQuery.ts     ← SSR-safe; listener torn down on unmount
│   ├── useScrollDirection.ts← Uses shared scroll utility; drives Navbar hide
│   └── useScrollY.ts        ← Uses shared scroll utility; returns scrollY state
│
├── types/
│   └── index.ts             ← All shared interfaces and type aliases
│
└── utils/
    ├── animation.ts         ← Single GSAP gateway; all animation fns; ScrollTrigger
    └── scroll.ts            ← Single passive scroll listener; rAF-batched; shared
```

---

## Key design decisions

### GSAP isolation
Components **never** import `gsap` directly. All animation calls go through `@/utils/animation`. This lets you swap or mock the animation layer in tests without touching components.

### Scroll utility singleton
`@/utils/scroll` installs **one** passive `scroll` listener on `window`, shared by every subscriber. Callbacks are deferred to `requestAnimationFrame` so no DOM read triggers a mid-frame layout recalculation. When the last subscriber unmounts, the listener is removed and any pending rAF is cancelled.

### Server vs Client Component split
| File | Directive | Reason |
|---|---|---|
| `layout.tsx` | Server | No state or effects; metadata export |
| `page.tsx` | Server | Pure orchestration; no browser APIs |
| `Footer.tsx` | Server | Static markup; zero JS bundle cost |
| `BrandLogoStrip.tsx` | Server | CSS animation; no JS needed |
| `SectionWrapper.tsx` | Server | Layout primitive only |
| `Navbar.tsx` | Client | Scroll direction + GSAP entrance |
| `Hero.tsx` | Client | GSAP stagger entrance |
| `Features.tsx` | Client | ScrollTrigger stagger |
| `Pricing.tsx` | Client | ScrollTrigger stagger |
| `Testimonials.tsx` | Client | ScrollTrigger stagger |
| `Faq.tsx` | Client | Accordion state |
| `Cta.tsx` | Client | ScrollTrigger fade |

### Animation performance contract
- Only `transform` and `opacity` are animated — both run on the compositor thread, never causing layout or paint.
- The Navbar hide/show uses an inline `style.transform` assignment (not GSAP) so it costs a single compositor-thread update per scroll direction change.
- The FAQ accordion uses CSS `hidden` attribute (not height: 0 → auto, which triggers layout) — the content pass will refine this with the CSS grid-template-rows trick.

### TypeScript strict mode additions
Beyond `"strict": true`, the following flags were enabled:
- `noImplicitAny`
- `noImplicitReturns`
- `noUnusedLocals`
- `noUnusedParameters`
- `exactOptionalPropertyTypes` — this is the most impactful; all optional props must be intentionally omitted (not set to `undefined`).

---

## Framer Motion status

`framer-motion` is already in `package.json` (installed before this pass). **It is not used in any boilerplate file.** All animation goes through GSAP via `@/utils/animation`. If you'd like to remove framer-motion from the bundle, run:

```bash
npm uninstall framer-motion
```

> **Product input needed:** Should framer-motion be kept as a fallback, or removed entirely to minimise the bundle?

---

## Open questions before the content pass

1. **Landing page sections** — Is the current section order (Hero → Logos → Features → Pricing → Testimonials → FAQ → CTA) correct? Any sections to add or remove?
2. **Feature count and icons** — How many feature cards? What icon set (SVGs, a library, custom illustrations)?
3. **Pricing tiers** — How many plans? Is there a toggle between monthly and annual billing?
4. **Testimonials layout** — Static grid or infinite-scroll marquee?
5. **CTA destinations** — What do the primary and secondary CTA buttons link to?
6. **Logo strip** — Which partner/customer logos are approved for display?
7. **Framer Motion** — Keep or remove? (see above)
8. **Dark mode** — The current `globals.css` has a `prefers-color-scheme: dark` override. Is dark mode a first-class requirement or opt-in?
