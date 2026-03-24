import { useState } from 'react';
import { GOLD, SAPPHIRE, EMERALD, CARNELIAN, DEEP_NIGHT } from './colors';

const ringData = [
  { name: 'Solitude', desc: 'Personal prayer, scripture, and devotion. The foundation of all Christian community.', size: '1 person', accent: GOLD },
  { name: 'Hospitality', desc: 'Open tables, shared meals, welcoming the stranger into relationship.', size: '2–3 people', accent: SAPPHIRE },
  { name: 'Band', desc: 'Deep accountability with 3–5 people. Honest confession and mutual encouragement.', size: '3–5 people', accent: EMERALD },
  { name: 'House Fellowship', desc: 'Sharing life together in homes. Worship, teaching, and breaking bread.', size: '12–20 people', accent: CARNELIAN },
  { name: 'Congregation', desc: 'The gathered body. Corporate worship, shared mission, and public witness.', size: '50+ people', accent: SAPPHIRE },
];

const ringRadii = [48, 88, 128, 168, 208];
// Muted pastel palette for light background (inspired by Napkin output)
const ringFills = [
  'rgba(199, 169, 80, 0.25)',   // Solitude — warm gold
  'rgba(160, 190, 170, 0.3)',   // Hospitality — sage green
  'rgba(200, 165, 140, 0.3)',   // Band — warm peach
  'rgba(190, 160, 145, 0.25)',  // House Fellowship — dusty rose
  'rgba(175, 185, 200, 0.25)',  // Congregation — soft blue-grey
];
const ringStrokes_colors = [
  'rgba(160, 130, 40, 0.5)',    // Solitude — muted gold
  'rgba(100, 140, 120, 0.4)',   // Hospitality — muted sage
  'rgba(160, 120, 95, 0.4)',    // Band — muted peach
  'rgba(150, 110, 95, 0.4)',    // House Fellowship — muted rose
  'rgba(120, 135, 160, 0.4)',   // Congregation — muted blue
];
const ringStrokes = [2, 1.8, 1.5, 1.3, 1.2];
// Accent colors for hover callout titles
const ringAccents = [GOLD, '#5A8A6A', '#B07A5A', '#9A7060', '#6A7A90'];
const cx = 250, cy = 250;

export function EcologyReveal() {
  const [activeRing, setActiveRing] = useState<number | null>(null);

  const hasHighlight = activeRing !== null;
  const isDimmed = (i: number) => hasHighlight && activeRing !== i;
  const activeData = activeRing !== null ? ringData[activeRing] : null;

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Built-in intro text */}
      <span className="label">Community Life</span>
      <h2 style={{ marginBottom: '1rem' }}>The Ecology of Fellowship</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
        Life at Model City Church happens at multiple levels, from personal disciplines
        to the gathered congregation. Each layer serves a distinct purpose in spiritual growth.
      </p>

      <svg width="100%" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg"
        role="img" aria-label="Ecology of Fellowship: five concentric rings"
        style={{ maxWidth: '520px', height: 'auto', display: 'block', margin: '0 auto' }}
        onMouseLeave={() => setActiveRing(null)}
      >
        <defs>
          <path id="ecologyRevealArc1" d="M220 250 A30 30 0 0 1 280 250" fill="none"/>
          <path id="ecologyRevealArc2" d="M182 250 A68 68 0 0 1 318 250" fill="none"/>
          <path id="ecologyRevealArc3" d="M142 250 A108 108 0 0 1 358 250" fill="none"/>
          <path id="ecologyRevealArc4" d="M102 250 A148 148 0 0 1 398 250" fill="none"/>
          <path id="ecologyRevealArc5" d="M62 250 A188 188 0 0 1 438 250" fill="none"/>
        </defs>

        {/* Rings — outermost first */}
        {[4, 3, 2, 1, 0].map((i) => (
          <g key={`ring-${i}`} style={{ cursor: 'pointer' }} onMouseEnter={() => setActiveRing(i)}>
            <circle cx={cx} cy={cy} r={ringRadii[i]}
              fill={ringFills[i]} stroke={ringStrokes_colors[i]}
              strokeWidth={activeRing === i ? ringStrokes[i] * 2 : ringStrokes[i]}
              opacity={isDimmed(i) ? 0.25 : 1}
              style={{ transition: 'all 0.3s ease' }}
            />
          </g>
        ))}

        {/* Curved text labels — sized for readability */}
        {[0, 1, 2, 3, 4].map((i) => (
          <text key={`label-${i}`}
            fill={activeRing === i ? ringAccents[i] : DEEP_NIGHT}
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize={[12, 14, 16, 16, 17][i]}
            fontWeight={activeRing === i ? 700 : 600}
            opacity={isDimmed(i) ? 0.15 : (activeRing === i ? 1 : 0.7)}
            style={{ transition: 'all 0.3s ease', pointerEvents: 'none' }}
          >
            <textPath href={`#ecologyRevealArc${i + 1}`} startOffset="50%" textAnchor="middle">
              {ringData[i].name}
            </textPath>
          </text>
        ))}

        {/* Center intentionally left empty — the innermost ring (Solitude) speaks for itself */}
      </svg>

      {/* Hover callout — appears below diagram */}
      <div style={{
        minHeight: '100px',
        maxWidth: '480px',
        margin: '1.5rem auto 0',
        textAlign: 'center',
        transition: 'opacity 0.3s ease',
        opacity: hasHighlight ? 1 : 0.5,
      }}>
        {activeData ? (
          <>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600,
              color: ringAccents[activeRing!], margin: '0 0 0.4rem',
            }}>
              {activeData.name}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(15,26,46,0.6)', lineHeight: '1.6', margin: 0 }}>
              {activeData.desc}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(15,26,46,0.4)', marginTop: '0.3rem', fontWeight: 600 }}>
              {activeData.size}
            </p>
          </>
        ) : (
          <p style={{ fontSize: '0.9rem', color: 'rgba(15,26,46,0.35)', fontStyle: 'italic', margin: 0 }}>
            Hover over any ring to explore each layer of community.
          </p>
        )}
      </div>
    </div>
  );
}
