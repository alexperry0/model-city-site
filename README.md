# Model City Church

Website for [Model City Church](https://modelcitychurch.com), a church plant in Kingsport, Tennessee.

## Tech Stack

- **React 19** + **TypeScript 5.9** + **Vite 8**
- Client-side routing via react-router-dom
- Vanilla CSS with custom properties (no Tailwind, no CSS-in-JS)
- Inline SVG diagrams as React components
- Vitest for testing

## Local Development

```bash
npm install
npm run dev       # Start dev server at localhost:5173
npm run build     # Type-check + production build
npm run test      # Run tests
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Project Structure

```
src/
  pages/          # Home, About, Give, NotFound
  components/     # Nav, Footer, ScrollToTop, PageMeta
    graphics/     # SVG diagram components (ProgressiveDiagram, EcologyOfFellowship, etc.)
  hooks/          # useScrollReveal, useScrollProgress, useCenteredStep
  styles/         # CSS organized by tokens, reset, layout, components, animations, pages
```

## Design

Apple-style scroll storytelling — each page is a sequence of full-viewport scenes. Interactive SVG diagrams are the primary content, built with scroll-driven progressive reveal and bidirectional hover highlighting.

Fonts: Cormorant Garamond (headings) + Lora (body), loaded via Google Fonts.
