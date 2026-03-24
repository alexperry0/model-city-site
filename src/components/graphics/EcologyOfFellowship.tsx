import { useState } from 'react';
import { GOLD, SAPPHIRE, EMERALD, CARNELIAN, DEEP_NIGHT } from './colors';

interface RingCardData {
  name: string;
}

const ringCardData: RingCardData[] = [
  { name: 'Solitude' },
  { name: 'Hospitality' },
  { name: 'Band' },
  { name: 'House Fellowship' },
  { name: 'Congregation' },
];

interface EcologyOfFellowshipProps {
  step: number;  // 0-4, which rings to show and highlight
}

const ringRadii = [48, 88, 128, 168, 208];
const ringColors = [GOLD, SAPPHIRE, EMERALD, CARNELIAN, SAPPHIRE];
const ringStrokes = [2, 1.8, 1.5, 1.3, 1.2];

const cx = 250;
const cy = 250;

const drawTransition = () =>
  'stroke-dashoffset 1.4s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.6s ease';

const fadeTransition = (delay = 0) =>
  `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;

export function EcologyOfFellowship({ step }: EcologyOfFellowshipProps) {
  const [activeRing, setActiveRing] = useState<number | null>(null);

  const isRingVisible = (i: number) => step >= i;

  // The "active" ring is the current step — highlighted during scroll
  const scrollActiveRing = (step >= 0 && step <= 4) ? step : null;

  // Effective highlight: hover takes precedence over scroll-driven highlight
  const effectiveHighlight = activeRing ?? scrollActiveRing;

  const ringOpacity = (i: number): number => {
    if (!isRingVisible(i)) return 0;
    if (effectiveHighlight !== null) {
      if (effectiveHighlight === i) return 1;
      return 0.2;
    }
    return 1;
  };

  const ringStrokeWidth = (i: number): number => {
    if (activeRing === null && scrollActiveRing === i) return ringStrokes[i] * 2;
    if (activeRing !== null && activeRing === i) return ringStrokes[i] * 1.5;
    return ringStrokes[i];
  };

  const labelOpacity = (i: number): number => {
    if (!isRingVisible(i)) return 0;
    if (effectiveHighlight === i) return 1;
    if (effectiveHighlight !== null) return 0.15;
    return 0.7;
  };

  const labelFill = (i: number): string => {
    if (effectiveHighlight === i) return GOLD;
    return DEEP_NIGHT;
  };

  const circs = ringRadii.map((r) => 2 * Math.PI * r);

  return (
    <div style={{ textAlign: 'center', margin: '2.5rem 0' }}>
      <svg
        width="520"
        height="520"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Ecology of Fellowship: five concentric rings from Solitude at center to Congregation at the outside"
        style={{ maxWidth: '100%', height: 'auto' }}
        onMouseLeave={() => setActiveRing(null)}
      >
        <defs>
          <path id="ecologyArc1" d="M220 250 A30 30 0 0 1 280 250" fill="none"/>
          <path id="ecologyArc2" d="M182 250 A68 68 0 0 1 318 250" fill="none"/>
          <path id="ecologyArc3" d="M142 250 A108 108 0 0 1 358 250" fill="none"/>
          <path id="ecologyArc4" d="M102 250 A148 148 0 0 1 398 250" fill="none"/>
          <path id="ecologyArc5" d="M62 250 A188 188 0 0 1 438 250" fill="none"/>
        </defs>

        {/* Concentric rings — render outermost first so innermost is on top */}
        {[4, 3, 2, 1, 0].map((ringIndex) => {
          const radius = ringRadii[ringIndex];
          const circ = circs[ringIndex];
          const visible = isRingVisible(ringIndex);

          return (
            <g
              key={`ring-${ringIndex}`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => {
                if (visible) setActiveRing(ringIndex);
              }}
            >
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={`${ringColors[ringIndex]}25`}
                stroke={ringColors[ringIndex]}
                strokeWidth={ringStrokeWidth(ringIndex)}
                strokeDasharray={circ}
                strokeDashoffset={visible ? 0 : circ}
                opacity={ringOpacity(ringIndex)}
                style={{
                  transition: `${drawTransition()}, stroke-width 0.3s ease`,
                  pointerEvents: visible ? 'all' : 'none',
                }}
              />
            </g>
          );
        })}

        {/* Curved text labels */}
        {[0, 1, 2, 3, 4].map((i) => (
          <text
            key={`label-${i}`}
            fill={labelFill(i)}
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize={[10, 12, 14, 14, 15][i]}
            fontWeight={activeRing === i ? 700 : 500}
            opacity={labelOpacity(i)}
            style={{ transition: fadeTransition(0.5), pointerEvents: 'none' }}
          >
            <textPath href={`#ecologyArc${i + 1}`} startOffset="50%" textAnchor="middle">
              {ringCardData[i].name}
            </textPath>
          </text>
        ))}

        {/* Center cross */}
        <line
          x1={cx} y1={236} x2={cx} y2={264}
          stroke={GOLD}
          strokeWidth="3"
          opacity={activeRing !== null ? 0.2 : 1}
          style={{ transition: 'all 0.3s ease', pointerEvents: 'none' }}
        />
        <line
          x1={238} y1={cy} x2={262} y2={cy}
          stroke={GOLD}
          strokeWidth="3"
          opacity={activeRing !== null ? 0.2 : 1}
          style={{ transition: 'all 0.3s ease', pointerEvents: 'none' }}
        />
      </svg>
    </div>
  );
}
