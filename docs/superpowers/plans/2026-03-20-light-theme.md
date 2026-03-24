# Light Theme Switch — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch the entire site from dark navy to warm cream/light theme by swapping color tokens and updating hardcoded color values across CSS and SVG components.

**Architecture:** The design token layer (`tokens.css`) swaps `--bg-primary` and `--text-primary`. Most components already use CSS custom properties and will update automatically. The remaining work is hardcoded rgba values in CSS files and hex constants in SVG component files (`colors.ts` and inline styles).

**Tech Stack:** CSS custom properties, React inline SVG styles.

**Working directory:** `C:/Users/Alex/Source/Model City/model-city-site-v2/`

**Spec:** `docs/superpowers/specs/2026-03-20-light-theme-design.md`

---

## Target File Changes

```
src/
├── styles/
│   ├── tokens.css        # MODIFY — swap functional tokens, update constellation SVG
│   ├── components.css    # MODIFY — nav/footer backdrop, hardcoded rgba values
│   ├── layout.css        # MODIFY — hero gradient, scene--alt, hero-details color
│   └── typography.css    # MODIFY — selection color
├── components/graphics/
│   ├── colors.ts         # MODIFY — swap WARM_WHITE and TEXT_SEC to dark values
│   ├── VennReveal.tsx    # MODIFY — hardcoded rgba values in inline styles
│   ├── EcologyReveal.tsx # MODIFY — hardcoded rgba values in inline styles
│   ├── DualFundDiagram.tsx # MODIFY — hardcoded rgba values in inline styles
│   ├── ProgressiveDiagram.tsx # MODIFY — hardcoded circle stroke colors
│   └── EcologyOfFellowship.tsx # MODIFY — hardcoded ring fill colors
└── pages/
    ├── Home.tsx          # CHECK — inline style color refs
    ├── About.tsx         # CHECK — inline style color refs
    ├── Give.tsx          # CHECK — inline style color refs
    └── NotFound.tsx      # CHECK — no changes expected
```

---

## Task 1: Swap CSS tokens and texture

**Files:**
- Modify: `src/styles/tokens.css`

- [ ] **Step 1: Update functional tokens**

```css
/* Functional tokens */
--bg-primary: var(--warm-white);
--bg-card: rgba(15, 26, 46, 0.04);
--bg-card-hover: rgba(15, 26, 46, 0.08);
--text-primary: var(--deep-night);
--text-secondary: rgba(15, 26, 46, 0.65);
--accent: var(--gold);
--accent-hover: var(--amber);
--border: rgba(15, 26, 46, 0.1);
--border-strong: rgba(15, 26, 46, 0.2);
```

- [ ] **Step 2: Update constellation SVG texture**

In the `--svg-constellation` data URI, change:
- `stroke='%23C7951A'` → `stroke='%230F1A2E'` (dark navy strokes)
- `stroke-opacity='0.25'` → `stroke-opacity='0.06'` (very subtle)
- `fill='%23C7951A'` → `fill='%230F1A2E'` (dark navy dots)
- `fill-opacity='0.18'` → `fill-opacity='0.05'` (very subtle)

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.css
git commit -m "theme: swap to light — update CSS design tokens and constellation texture"
```

---

## Task 2: Update CSS component styles

**Files:**
- Modify: `src/styles/components.css`
- Modify: `src/styles/layout.css`
- Modify: `src/styles/typography.css`

- [ ] **Step 1: Update components.css**

Nav backdrop (line 14): `rgba(15, 26, 46, 0.88)` → `rgba(245, 240, 232, 0.88)`
Nav border (line 17): `rgba(199, 149, 26, 0.06)` → `rgba(15, 26, 46, 0.06)`
Mobile nav bg (line 85): `rgba(15, 26, 46, 0.97)` → `rgba(245, 240, 232, 0.97)`
Button shadow (line 134): `rgba(199, 149, 26, 0.2)` → `rgba(199, 149, 26, 0.3)` (slightly stronger on light)
Btn-primary text — add: `.btn-primary { color: #FFFFFF; }` (white text on gold button)
Btn-primary hover — change to: `.btn-primary:hover { color: #FFFFFF; }`
Placeholder note bg (line 323): `rgba(199, 149, 26, 0.06)` → `rgba(199, 149, 26, 0.08)`
Footer attribution colors (lines 396-400): `rgba(245, 240, 232, 0.4/0.5)` → `rgba(15, 26, 46, 0.4/0.5)`

- [ ] **Step 2: Update layout.css**

Scene--alt gradient (line 28): `rgba(27, 58, 92, 0.08)` → `rgba(15, 26, 46, 0.03)`
Hero radial gradient (line 59): `rgba(27, 58, 92, 0.35)` → `rgba(199, 149, 26, 0.06)` (subtle warm glow)
Hero-details color (line 96): `rgba(245, 240, 232, 0.5)` → `rgba(15, 26, 46, 0.45)`

- [ ] **Step 3: Update typography.css**

Selection (line 44): change `color: var(--warm-white)` → `color: var(--deep-night)`

- [ ] **Step 4: Verify build**

Run: `npm run build`

- [ ] **Step 5: Commit**

```bash
git add src/styles/
git commit -m "theme: update CSS component/layout/typography for light background"
```

---

## Task 3: Update SVG color constants and diagram components

**Files:**
- Modify: `src/components/graphics/colors.ts`
- Modify: `src/components/graphics/ProgressiveDiagram.tsx`
- Modify: `src/components/graphics/EcologyOfFellowship.tsx`
- Modify: `src/components/graphics/VennReveal.tsx`
- Modify: `src/components/graphics/EcologyReveal.tsx`
- Modify: `src/components/graphics/DualFundDiagram.tsx`

- [ ] **Step 1: Update colors.ts**

```ts
export const GOLD = '#C7951A';
export const SAPPHIRE = '#1B3A5C';
export const WARM_WHITE = '#F5F0E8';  // keep for SVG backgrounds if needed
export const DEEP_NIGHT = '#0F1A2E';
export const CARNELIAN = '#8B2500';
export const EMERALD = '#1B6B4A';
export const TEXT_PRIMARY = '#0F1A2E';
export const TEXT_SEC = 'rgba(15, 26, 46, 0.65)';
```

Note: keep WARM_WHITE exported (it may still be useful), but add DEEP_NIGHT and TEXT_PRIMARY. TEXT_SEC flips from light-on-dark to dark-on-light.

- [ ] **Step 2: Update ProgressiveDiagram.tsx**

Circle strokes: `'rgba(245,240,232,0.7)'` → `'rgba(15,26,46,0.6)'` (active) and `'rgba(245,240,232,0.35)'` → `'rgba(15,26,46,0.25)'` (inactive).
Import `DEEP_NIGHT` from colors, use it for label fills instead of `WARM_WHITE`.
Label fill for inactive: `WARM_WHITE` → `DEEP_NIGHT`.

- [ ] **Step 3: Update VennReveal.tsx**

All hardcoded `rgba(27, 58, 92, ...)` card backgrounds → `rgba(15, 26, 46, 0.04)`.
All hardcoded `rgba(199,149,26,0.2)` borders → `rgba(15, 26, 46, 0.1)`.
All `rgba(245,240,232,...)` text colors → `rgba(15, 26, 46, ...)`.
Circle strokes: `rgba(245,240,232,0.35)` → `rgba(15,26,46,0.2)`.
`fill={WARM_WHITE}` on labels → `fill={DEEP_NIGHT}`.
`fill={TEXT_SEC}` already correct after Step 1.
Callout border/bg colors: update to work on light.

- [ ] **Step 4: Update EcologyReveal.tsx**

Same pattern as VennReveal — swap all dark-on-light / light-on-dark inline style colors.
Ring fills: `${ringColors[i]}18` (hex alpha) should still work — the ring colors are already distinct.

- [ ] **Step 5: Update EcologyOfFellowship.tsx**

Same circle stroke swaps. Ring fills should still read on light background.
Center cross stroke: `GOLD` stays.

- [ ] **Step 6: Update DualFundDiagram.tsx**

Card backgrounds: `rgba(27, 58, 92, 0.2)` → `rgba(15, 26, 46, 0.04)`.
Card borders: `rgba(199,149,26,0.15)` → `rgba(15, 26, 46, 0.1)`.
Text colors: swap `WARM_WHITE` → `DEEP_NIGHT`, `TEXT_SEC` already updated.

- [ ] **Step 7: Verify build**

Run: `npm run build`

- [ ] **Step 8: Commit**

```bash
git add src/components/graphics/
git commit -m "theme: update all SVG diagram components for light background"
```

---

## Task 4: Update page inline styles and verify

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/pages/About.tsx`
- Modify: `src/pages/Give.tsx`

- [ ] **Step 1: Search for hardcoded dark-theme colors in pages**

Look for `rgba(245,240,232` and `rgba(199,149,26` in inline styles. These appear in:
- Home.tsx: values section `color: 'var(--text-secondary)'` (uses token, OK)
- About.tsx: commitment intro, community intro — `color: 'var(--text-secondary)'` (OK)
- Give.tsx: hero tagline, CTA text — check for hardcoded colors

- [ ] **Step 2: Fix any hardcoded color refs in pages**

Replace any `rgba(245,240,232,...)` inline styles with `rgba(15,26,46,...)` equivalents.
Replace any `color: 'var(--text-secondary)'` — these are fine, they use the token.

- [ ] **Step 3: Run full verification**

```bash
npm run test && npm run lint && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/
git commit -m "theme: update page inline styles for light background"
```

---

## Verification

After all tasks:

1. `npm run test` — all tests pass
2. `npm run build` — no errors
3. `npm run lint` — clean
4. `npm run dev` — visual check:
   - Cream/warm-white background everywhere
   - Dark navy text readable
   - Gold accents pop on light background
   - Nav and footer are light translucent with backdrop blur
   - Cards have subtle dark borders, light backgrounds
   - SVG diagrams readable (dark strokes on light)
   - Constellation texture very subtle on light
   - Buttons: gold with white text
   - No remnant dark-theme colors visible
