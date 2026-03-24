import { GOLD, DEEP_NIGHT } from './colors';

interface ProgressiveDiagramProps {
  step: number; // -1 to 3
}

// Focus regions: center of interest + zoom scale
const focusRegions: Record<number, { cx: number; cy: number; scale: number }> = {
  [-1]: { cx: 395, cy: 340, scale: 1 },
  0: { cx: 395, cy: 220, scale: 1.35 },
  1: { cx: 350, cy: 350, scale: 1.15 },
  2: { cx: 395, cy: 380, scale: 1.05 },
  3: { cx: 395, cy: 340, scale: 1.0 },
};

export function ProgressiveDiagram({ step }: ProgressiveDiagramProps) {
  const CIRCLE_CIRC = 2 * Math.PI * 140;
  const TRI_PERIM = 2040;

  const drawTransition = () =>
    'stroke-dashoffset 1.4s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.6s ease';
  const fadeTransition = (delay = 0) =>
    `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;

  // Circle visibility derived from step prop
  const showPresence = step >= 0;
  const showFormation = step >= 1;
  const showMission = step >= 2;
  const showTriangle = step >= 3;

  // Active-step highlighting: emphasize the current step's circle/label
  const isActiveCircle = (circleStep: number) => step === circleStep;
  const circleStroke = (circleStep: number) =>
    isActiveCircle(circleStep) ? 'rgba(15,26,46,0.5)' : 'rgba(15,26,46,0.2)';
  const circleStrokeWidth = (circleStep: number) =>
    isActiveCircle(circleStep) ? 2.5 : 1.5;
  const labelFill = (circleStep: number) =>
    isActiveCircle(circleStep) ? GOLD : DEEP_NIGHT;
  const labelWeight = (circleStep: number) =>
    isActiveCircle(circleStep) ? '800' : '700';
  // Dim non-active visible circles
  const circleOpacity = (circleStep: number, visible: boolean) => {
    if (!visible) return 0;
    if (step >= 0 && step <= 3 && circleStep < step) return 0.4; // dim older circles
    return 1;
  };

  // Zoom-to-fit transform
  const region = focusRegions[step] ?? focusRegions[-1];
  const svgCx = 395, svgCy = 320;
  const tx = svgCx - region.cx * region.scale;
  const ty = svgCy - region.cy * region.scale;

  return (
    <div style={{ textAlign: 'center', margin: '1rem 0' }}>
      <svg
        width="620"
        height="540"
        viewBox="0 0 790 639"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Missional Disciple diagram — progressive build"
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        <defs>
          <clipPath id="clipFormationProg">
            <circle cx="297" cy="484" r="140"/>
          </clipPath>
          <clipPath id="clipMissionProg" clipPath="url(#clipFormationProg)">
            <circle cx="492" cy="484" r="140"/>
          </clipPath>
        </defs>

        <g style={{
          transform: `translate(${tx}px, ${ty}px) scale(${region.scale})`,
          transformOrigin: '395px 320px',
          transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
        }}>
          <path
            d="M395 35 L55 624 L735 624 Z"
            stroke={GOLD}
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
            strokeDasharray={TRI_PERIM}
            strokeDashoffset={showTriangle ? 0 : TRI_PERIM}
            style={{ transition: drawTransition(), opacity: step >= 3 ? 1 : 0 }}
          />
          <path
            d="M395 35 L55 624 L735 624 Z"
            stroke="none"
            fill="rgba(15, 26, 46, 0.06)"
            style={{ transition: fadeTransition(0.8), opacity: showTriangle ? 1 : 0 }}
          />

          {/* Presence (top) — step 0 */}
          <circle
            cx="395" cy="315" r="140"
            stroke={circleStroke(0)} strokeWidth={circleStrokeWidth(0)} fill="transparent"
            strokeDasharray={CIRCLE_CIRC}
            strokeDashoffset={showPresence ? 0 : CIRCLE_CIRC}
            style={{ transition: `${drawTransition()}, stroke 0.3s ease, stroke-width 0.3s ease`, opacity: circleOpacity(0, showPresence) }}
          />
          {/* Formation (bottom-left) — step 1 */}
          <circle
            cx="297" cy="484" r="140"
            stroke={circleStroke(1)} strokeWidth={circleStrokeWidth(1)} fill="transparent"
            strokeDasharray={CIRCLE_CIRC}
            strokeDashoffset={showFormation ? 0 : CIRCLE_CIRC}
            style={{ transition: `${drawTransition()}, stroke 0.3s ease, stroke-width 0.3s ease`, opacity: circleOpacity(1, showFormation) }}
          />
          {/* Mission (bottom-right) — step 2 */}
          <circle
            cx="492" cy="484" r="140"
            stroke={circleStroke(2)} strokeWidth={circleStrokeWidth(2)} fill="transparent"
            strokeDasharray={CIRCLE_CIRC}
            strokeDashoffset={showMission ? 0 : CIRCLE_CIRC}
            style={{ transition: `${drawTransition()}, stroke 0.3s ease, stroke-width 0.3s ease`, opacity: circleOpacity(2, showMission) }}
          />

          {/* Labels inside each circle's non-overlapping region */}
          <text
            x="395" y="225" textAnchor="middle"
            fill={labelFill(0)} fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="16" fontWeight={labelWeight(0)} letterSpacing="0.1em"
            style={{ transition: `${fadeTransition(0.5)}, fill 0.3s ease`, opacity: showPresence ? (isActiveCircle(0) ? 1 : circleOpacity(0, true)) : 0 }}
          >PRESENCE</text>

          <text
            x="232" y="540" textAnchor="middle"
            fill={labelFill(1)} fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="16" fontWeight={labelWeight(1)} letterSpacing="0.1em"
            style={{ transition: `${fadeTransition(0.5)}, fill 0.3s ease`, opacity: showFormation ? (isActiveCircle(1) ? 1 : circleOpacity(1, true)) : 0 }}
          >FORMATION</text>

          <text
            x="558" y="540" textAnchor="middle"
            fill={labelFill(2)} fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="16" fontWeight={labelWeight(2)} letterSpacing="0.1em"
            style={{ transition: `${fadeTransition(0.5)}, fill 0.3s ease`, opacity: showMission ? (isActiveCircle(2) ? 1 : circleOpacity(2, true)) : 0 }}
          >MISSION</text>

          {/* Fellowship label along the left triangle edge */}
          <text
            x="175" y="480" textAnchor="middle"
            fill={step === 3 ? GOLD : DEEP_NIGHT} fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="14" fontWeight={step === 3 ? '700' : '600'} letterSpacing="0.1em"
            transform="rotate(-56, 175, 480)"
            style={{ transition: `${fadeTransition(0.8)}, fill 0.3s ease`, opacity: showTriangle ? (step === 3 ? 1 : 0.7) : 0 }}
          >FELLOWSHIP</text>
        </g>
      </svg>
    </div>
  );
}
