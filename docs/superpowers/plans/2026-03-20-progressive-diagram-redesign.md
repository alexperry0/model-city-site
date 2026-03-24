# Progressive Diagram Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign both progressive scroll sections (Venn diagram + Ecology rings) on the About page so they properly teach concepts one at a time with zoom-to-fit framing, then land on a dedicated full-reveal section with interactive hover — matching Apple's product page scroll storytelling pattern.

**Architecture:** Each diagram has two distinct phases: (1) a progressive scroll section where a sticky SVG-only diagram zooms to frame just the current concept, and (2) a full-width reveal section after the scroll ends showing the complete diagram with cards and hover interactivity. The Venn diagram gets a dynamic `<g transform>` to zoom-to-fit each step. The Ecology rings already center naturally. Both use `useCenteredStep` for scroll tracking.

**Tech Stack:** React 19, TypeScript, inline SVG with CSS transitions, `useCenteredStep` hook.

**Working directory:** `C:/Users/Alex/Source/Model City/model-city-site-v2/`

---

## Current Problems

1. **Venn SVG is 790x639 but step 0 only uses the center** — the single Presence circle appears off-center because the viewBox reserves space for the full triangle layout
2. **"The Full Picture" is a progressive step (step 4)** but its content (callout + cards) doesn't belong in the sticky column — it should be its own landing section
3. **Cards are gated behind `isInteractive`** but have no proper home — they're conditionally rendered inside the sticky column, which broke layout before we hid them
4. **Two modes conflated in one component** — ProgressiveDiagram tries to be both "teaching SVG" and "interactive reveal" via a single `interactive` prop, leading to complexity

## Design

### Venn Diagram (ProgressiveDiagram)

**Teaching phase (sticky):** SVG-only, no cards/callout. A `<g>` wrapper with CSS-transitioned `transform` zooms the viewBox to frame only the visible elements:
- Step -1: Empty (before scroll section)
- Step 0: Zoomed to Presence circle + label
- Step 1: Pulls back to include Formation
- Step 2: Pulls back to include Mission
- Step 3: Full view with triangle + Fellowship

**Reveal phase (static section):** Full-width centered section after the progressive scroll. Complete diagram with all elements, gold center fill, callout box, zone cards grid, hover interactivity. Uses `useScrollReveal` for entrance animation.

### Ecology Rings (EcologyOfFellowship)

**Teaching phase (sticky):** SVG-only, no cards. Rings draw/un-draw bidirectionally. Active ring highlighted. Already works well — concentric layout is naturally centered at all steps.

**Reveal phase (static section):** Full-width centered section. All rings visible, detail cards in 3+2 grid, hover interactivity. Uses `useScrollReveal` for entrance animation.

### About Page Structure

```
Hero
Our Story
What We Believe
─── The Four Commitments intro ───
[Progressive scroll: Venn teaching — 4 steps: Presence, Formation, Mission, Fellowship]
─── Full Venn Reveal section (scrollReveal entrance) ───
─── Community Life intro ───
[Progressive scroll: Ecology teaching — 5 steps: Solitude → Congregation]
─── Full Ecology Reveal section (scrollReveal entrance) ───
```

---

## Target File Changes

```
src/
├── components/graphics/
│   ├── ProgressiveDiagram.tsx   # REWRITE — teaching-only SVG with zoom-to-fit
│   ├── VennReveal.tsx           # NEW — full reveal section with callout + cards + hover
│   ├── EcologyOfFellowship.tsx  # MODIFY — remove cards from step mode, clean up
│   ├── EcologyReveal.tsx        # NEW — full reveal section with cards + hover
│   └── index.ts                 # MODIFY — add new exports
├── pages/
│   └── About.tsx                # REWRITE — new section structure, remove step 4
└── hooks/
    └── useCenteredStep.ts       # MODIFY — add guard for "no step near target"
```

---

## Task 1: Add distance guard to useCenteredStep

**Files:**
- Modify: `src/hooks/useCenteredStep.ts`

The hook currently always returns the closest step even if all steps are far off-screen (e.g., before scrolling into the progressive section). It should return -1 when nothing is close enough.

- [ ] **Step 1: Add maxDistance parameter**

```ts
export function useCenteredStep(stepCount: number, targetRatio = 0.35, maxDistance = 0.5) {
```

In the scroll handler, after finding `closest`, add:

```ts
// If closest step center is more than maxDistance * viewport height away, return -1
if (closestDist > window.innerHeight * maxDistance) {
  closest = -1;
}
```

This means: if no step's center is within half a viewport height of the target line, return -1 (no active step).

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Note: There are no existing unit tests for `useCenteredStep`. The behavioral change (maxDistance guard) will be verified visually in Task 6.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useCenteredStep.ts
git commit -m "fix: useCenteredStep returns -1 when no step is near target"
```

---

## Task 2: Rewrite ProgressiveDiagram as teaching-only SVG with zoom-to-fit

**Files:**
- Rewrite: `src/components/graphics/ProgressiveDiagram.tsx`

Strip out all card/callout rendering, hover zone logic, and the `interactive` prop. This component becomes a pure SVG that shows circles/triangle/labels with zoom-to-fit framing.

- [ ] **Step 1: Define zoom viewBox regions**

Each step gets a bounding box that frames just the visible content with padding. The SVG viewBox stays `0 0 790 639` but a `<g>` wrapper applies a CSS-transitioned transform to zoom into the relevant region.

Compute per-step focus regions (center + scale relative to full 790x639):

```ts
// Focus regions: { cx, cy, scale } — center of interest and how much to zoom
const focusRegions: Record<number, { cx: number; cy: number; scale: number }> = {
  [-1]: { cx: 395, cy: 320, scale: 1 },    // full view (default)
  0: { cx: 395, cy: 280, scale: 2.0 },      // Presence circle + label
  1: { cx: 346, cy: 420, scale: 1.4 },      // Presence + Formation
  2: { cx: 395, cy: 420, scale: 1.15 },     // All three circles
  3: { cx: 395, cy: 340, scale: 1.0 },      // Full with triangle
};
```

The `<g>` transform translates so `(cx, cy)` maps to the SVG center `(395, 320)`, then scales:

```ts
const region = focusRegions[step] ?? focusRegions[-1];
const svgCx = 395, svgCy = 320; // center of the SVG viewBox
const tx = svgCx - region.cx * region.scale;
const ty = svgCy - region.cy * region.scale;
const transform = `translate(${tx}, ${ty}) scale(${region.scale})`;
```

Apply via CSS `style` prop (NOT SVG `transform` attribute — CSS `transform-origin` only works with CSS transforms):

```tsx
<g style={{
  transform: `translate(${tx}px, ${ty}px) scale(${region.scale})`,
  transformOrigin: '395px 320px',
  transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
}}>
```

- [ ] **Step 2: Remove interactive/card code**

Remove (identify by content, not line numbers — the zoom wrapper insertion shifts everything):
- `interactive` prop from interface
- `active`, `hoveredCard` state
- `zoneStyle`, `handleZoneHover`, `handleCardHover`
- `isInteractive`, `showOverlaps`
- All card/callout JSX (the `{isInteractive && <>` block with callout div + zone cards grid)
- Interactive hover zone circles (the `{isInteractive && (<g>` block with 7 hover targets)
- Zone label text group (the `<g>` containing "Hyper Spirituality", "Spiritual Narcissism" etc.) — these belong in the reveal component
- `zoneCardData` constant — duplicate in VennReveal

Keep:
- `step` prop
- Circle draw/visibility logic (`showPresence`, `showFormation`, `showMission`, `showTriangle`)
- Active-step highlighting (`isActiveCircle`, `circleStroke`, `circleStrokeWidth`, `labelFill`, `labelWeight`, `circleOpacity`)
- Corner labels (PRESENCE, FORMATION, MISSION, FELLOWSHIP)
- Stroke-dasharray draw animations
- The `<g>` zoom wrapper (new)

New interface:
```ts
interface ProgressiveDiagramProps {
  step: number;  // -1 to 3
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`

- [ ] **Step 4: Update ProgressiveDiagram test**

Update `src/components/__tests__/ProgressiveDiagram.test.tsx`:
- Remove tests for "Compelling Missional Disciples" callout and zone cards (those move to VennReveal)
- Keep tests for: SVG renders, PRESENCE label at step 0, FELLOWSHIP at step 3
- Add test: at step -1, no labels visible (opacity 0)

- [ ] **Step 5: Run tests**

Run: `npm run test`

- [ ] **Step 6: Commit**

```bash
git add src/components/graphics/ProgressiveDiagram.tsx src/components/__tests__/ProgressiveDiagram.test.tsx
git commit -m "refactor: ProgressiveDiagram as teaching-only SVG with zoom-to-fit"
```

---

## Task 3: Create VennReveal component

**Files:**
- Create: `src/components/graphics/VennReveal.tsx`
- Create: `src/components/__tests__/VennReveal.test.tsx`
- Modify: `src/components/graphics/index.ts`

This is the "full picture" landing section. Shows the complete Venn diagram at full size with all elements visible, the "Compelling Missional Disciples" callout, 6 zone cards, and bidirectional hover between diagram zones and cards.

- [ ] **Step 1: Create VennReveal.tsx**

Port the full-view SVG from the current ProgressiveDiagram (with all elements visible, no step logic) plus the callout and zone cards that were gated behind `isInteractive`. This component renders a self-contained section — no sticky, no scroll tracking.

```tsx
import { useState } from 'react';
import { GOLD, SAPPHIRE, EMERALD, WARM_WHITE, TEXT_SEC } from './colors';

// ... zoneCardData array (copy from current ProgressiveDiagram)
// ... VennZone type (copy from current ProgressiveDiagram)

export function VennReveal() {
  const [active, setActive] = useState<VennZone>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Full diagram: all elements visible, interactive hover
  return (
    <div style={{ textAlign: 'center' }}>
      <svg ...>
        {/* Full triangle, all 3 circles, gold center, all labels */}
        {/* Zone hover targets */}
        {/* Zone label text */}
      </svg>
      {/* "Compelling Missional Disciples" callout */}
      {/* 6 zone cards grid */}
      {/* "Hover zones or cards to explore" hint */}
    </div>
  );
}
```

Key details:
- SVG shows everything at full opacity, no step logic
- Bidirectional hover between SVG zones and cards (port from current interactive mode)
- Callout box highlights on center hover
- No `step` prop, no `interactive` prop — always fully interactive

- [ ] **Step 2: Write test**

```tsx
describe('VennReveal', () => {
  it('renders "Compelling Missional Disciples" callout', () => { ... });
  it('renders all 6 zone cards', () => { ... });
  it('renders PRESENCE, FORMATION, MISSION labels', () => { ... });
});
```

- [ ] **Step 3: Update barrel export**

Add to `src/components/graphics/index.ts`:
```ts
export { VennReveal } from './VennReveal';
```

- [ ] **Step 4: Run tests**

Run: `npm run test`

- [ ] **Step 5: Commit**

```bash
git add src/components/graphics/VennReveal.tsx src/components/__tests__/VennReveal.test.tsx src/components/graphics/index.ts
git commit -m "feat: add VennReveal component for full interactive diagram"
```

---

## Task 4: Create EcologyReveal component

**Files:**
- Create: `src/components/graphics/EcologyReveal.tsx`
- Create: `src/components/__tests__/EcologyReveal.test.tsx`
- Modify: `src/components/graphics/index.ts`

The full-reveal version of the Ecology of Fellowship. All 5 rings visible, detail cards in 3+2 grid, hover interactivity.

- [ ] **Step 1: Create EcologyReveal.tsx**

Extract the `showAll` mode from the current `EcologyOfFellowship.tsx` into its own component. This is essentially what `EcologyOfFellowship` renders when `step` is undefined — all rings, all labels, center cross, cards, hover.

```tsx
export function EcologyReveal() {
  // All rings visible, full hover interactivity, cards rendered
  // Port directly from current EcologyOfFellowship showAll mode
}
```

- [ ] **Step 2: Clean up EcologyOfFellowship.tsx**

Now that the reveal mode lives in EcologyReveal, simplify EcologyOfFellowship:
- Remove `showAll` logic path (no more `step === undefined` case)
- Remove card rendering entirely
- `step` prop becomes required (no longer optional)
- Simplify: it's now purely "draw rings 0..step, highlight step"

New interface:
```ts
interface EcologyOfFellowshipProps {
  step: number;  // 0-4, which rings to show
}
```

- [ ] **Step 3: Write test**

```tsx
describe('EcologyReveal', () => {
  it('renders all 5 ring labels', () => { ... });
  it('renders all 5 detail cards with sizes', () => { ... });
  it('renders "Hover each ring or card to explore" hint', () => { ... });
});
```

- [ ] **Step 4: Update EcologyOfFellowship test**

Remove tests that check for card rendering and `showAll` behavior. Keep ring/label tests.

- [ ] **Step 5: Update barrel export**

Add `export { EcologyReveal } from './EcologyReveal';` to index.ts.

- [ ] **Step 6: Run tests**

Run: `npm run test`

- [ ] **Step 7: Commit**

```bash
git add src/components/graphics/EcologyReveal.tsx src/components/graphics/EcologyOfFellowship.tsx src/components/__tests__/EcologyReveal.test.tsx src/components/__tests__/EcologyOfFellowship.test.tsx src/components/graphics/index.ts
git commit -m "feat: add EcologyReveal, simplify EcologyOfFellowship to teaching-only"
```

---

## Task 5: Rewrite About page section structure

**Files:**
- Rewrite: `src/pages/About.tsx`
- Modify: `src/pages/__tests__/About.test.tsx`

Wire the new section structure: progressive scroll sections use teaching-only components, followed by reveal sections.

- [ ] **Step 1: Update About.tsx**

New structure:

```tsx
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCenteredStep } from '../hooks/useCenteredStep';
import {
  PresenceIcon, FormationIcon, MissionIcon, FellowshipIcon,
  ProgressiveDiagram, VennReveal,
  EcologyOfFellowship, EcologyReveal,
} from '../components/graphics';
import PageMeta from '../components/PageMeta';

export default function About() {
  // ... scroll reveal refs (hero, story, believe, commitIntro, communityIntro)
  const vennRevealRef = useScrollReveal<HTMLElement>(0.1);
  const ecologyRevealRef = useScrollReveal<HTMLElement>(0.1);

  // Progressive tracking — 4 steps for Venn (Presence/Formation/Mission/Fellowship)
  const { centerStep: diagramStep, setRef: setDiagramRef } = useCenteredStep(4);
  // 5 steps for Ecology (Solitude → Congregation)
  const { centerStep: ecologyStep, setRef: setEcologyRef } = useCenteredStep(5);

  // ... commitments array (4 items, no step 4 "Full Picture")

  return (
    <div className="page">
      {/* ... Hero, Our Story, What We Believe, Commitments intro — unchanged */}

      {/* Venn teaching scroll */}
      <div className="progressive-section">
        <div className="progressive-diagram-col">
          <div className="progressive-diagram-sticky">
            <ProgressiveDiagram step={diagramStep} />
          </div>
        </div>
        <div className="progressive-text-col">
          {commitments.map((c) => (
            <section key={c.name} className="progressive-step" ref={setDiagramRef(c.step)}>
              <c.Icon />
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
            </section>
          ))}
        </div>
      </div>

      {/* Venn full reveal — landing section */}
      <section className="scene reveal-fade-up" ref={vennRevealRef}>
        <div className="scene__inner--wide">
          <VennReveal />
        </div>
      </section>

      {/* ... Community Life intro — unchanged */}

      {/* Ecology teaching scroll */}
      <div className="progressive-section">
        <div className="progressive-diagram-col">
          <div className="progressive-diagram-sticky">
            <EcologyOfFellowship step={ecologyStep} />
          </div>
        </div>
        <div className="progressive-text-col">
          {ecologySteps.map((ring, i) => (
            <section key={ring.name} className="progressive-step" ref={setEcologyRef(i)}>
              <h3>{ring.name}</h3>
              <p>{ring.desc}</p>
            </section>
          ))}
        </div>
      </div>

      {/* Ecology full reveal — landing section */}
      <section className="scene reveal-fade-up" ref={ecologyRevealRef}>
        <div className="scene__inner--wide">
          <EcologyReveal />
        </div>
      </section>
    </div>
  );
}
```

Key changes:
- `useCenteredStep(4)` for Venn (was 5 — no more step 4 "Full Picture")
- Remove "The Full Picture" progressive step entirely
- Add `VennReveal` in a normal `scene` section after the Venn progressive section
- Add `EcologyReveal` in a normal `scene` section after the Ecology progressive section
- Both reveal sections use `useScrollReveal` for entrance animation

- [ ] **Step 2: Update About test**

Update `src/pages/__tests__/About.test.tsx`:
- Remove test for "The Full Picture" heading (no longer exists)
- Add test: renders "Compelling Missional Disciples" (now in VennReveal section)
- Keep existing tests for static sections

- [ ] **Step 3: Run tests**

Run: `npm run test`

- [ ] **Step 4: Run build**

Run: `npm run build`

- [ ] **Step 5: Commit**

```bash
git add src/pages/About.tsx src/pages/__tests__/About.test.tsx
git commit -m "refactor: About page with separate teaching scroll and reveal sections"
```

---

## Task 6: Visual QA and tuning

**Files:**
- Possibly modify: any of the above files for fine-tuning

- [ ] **Step 1: Run dev server**

Run: `npm run dev`

- [ ] **Step 2: QA the Venn progressive section**

Scroll through. Verify:
- At step 0, only Presence circle visible, zoomed in, centered
- At step 1, camera pulls back to show Formation
- At step 2, all three circles visible
- At step 3, triangle draws, full view
- Zoom transitions are smooth (1s ease)
- Active step has gold label and brighter stroke
- Previous steps dimmed
- Bidirectional: scrolling back un-draws and re-zooms

- [ ] **Step 3: QA the Venn reveal section**

After scrolling past the last progressive step:
- Full diagram appears with entrance animation
- Callout box visible
- Zone cards visible
- Hover between zones and cards works bidirectionally

- [ ] **Step 4: QA the Ecology progressive section**

Same checks: rings draw/un-draw, active ring highlighted, centered.

- [ ] **Step 5: QA the Ecology reveal section**

All rings, cards, hover working.

- [ ] **Step 6: Tune zoom focus regions if needed**

The `focusRegions` values in Task 2 are estimates. Adjust `cx`, `cy`, `scale` if the framing doesn't look right for each step.

- [ ] **Step 7: Full test + lint + build**

```bash
npm run test && npm run lint && npm run build
```

- [ ] **Step 8: Commit any tuning changes**

```bash
git add src/components/graphics/ src/pages/About.tsx src/hooks/ src/styles/
git commit -m "polish: tune zoom regions and visual QA fixes"
```

---

## Verification

After all tasks:

1. `npm run test` — all tests pass
2. `npm run build` — no TypeScript errors
3. `npm run lint` — clean
4. Visual QA:
   - Venn zoom-to-fit: smooth camera movement as concepts are introduced
   - Venn reveal: complete diagram with callout, cards, hover
   - Ecology progressive: rings draw/un-draw cleanly
   - Ecology reveal: all rings, cards, hover
   - Both reveal sections have entrance animations via scrollReveal
   - Bidirectional scrolling works for both teaching sections
   - Mobile (768px breakpoint): sections stack vertically
