# Light Theme Switch — Design Spec

## Goal
Switch the entire site from dark navy background to warm cream/light theme. Swap the palette so dark navy becomes text, warm white becomes background. Gold accents unchanged.

## Token Changes

| Token | Dark (current) | Light (new) |
|-------|---------------|-------------|
| `--bg-primary` | `#0F1A2E` | `#F5F0E8` |
| `--text-primary` | `#F5F0E8` | `#0F1A2E` |
| `--text-secondary` | `rgba(245,240,232,0.75)` | `rgba(15,26,46,0.65)` |
| `--bg-card` | `rgba(27,58,92,0.2)` | `rgba(15,26,46,0.04)` |
| `--bg-card-hover` | `rgba(27,58,92,0.35)` | `rgba(15,26,46,0.08)` |
| `--border` | `rgba(199,149,26,0.12)` | `rgba(15,26,46,0.1)` |
| `--border-strong` | `rgba(199,149,26,0.3)` | `rgba(15,26,46,0.2)` |

## Component Adjustments
- Nav: `rgba(245,240,232,0.88)` backdrop, dark text
- Footer: same light treatment
- Hero: radial gradient uses light-compatible tint, constellation texture inverted or removed
- Buttons: primary gold stays, button text becomes white
- Selection: gold bg, dark text
- SVG diagrams: swap WARM_WHITE/TEXT_SEC constants in colors.ts to dark values

## Unchanged
- Gold/amber accent colors
- Typography, layout, spacing, animations
- Component logic, hooks, routing

## Constellation Texture
Invert stroke color from gold to dark navy at low opacity, or remove entirely if it doesn't read well on cream.
