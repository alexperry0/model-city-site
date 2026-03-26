// Light theme colors
const TRI_STROKE = '#8B6914';
const CIRC_STROKE = 'rgba(15,26,46,0.3)';
const TRI_FILL = 'rgba(15,26,46,0.04)';
const LABEL_FILL = '#0F1A2E';

export function VennReveal() {
  return (
    <div style={{ textAlign: 'center' }}>
      <span className="label">Our Life Together</span>
      <h2 style={{ marginBottom: '1rem' }}>Four Core Commitments</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
        We prioritize four core commitments for discipleship that are rooted in
        the life and teaching of Jesus: presence, formation, mission, and fellowship.
      </p>

      <div style={{ position: 'relative', maxWidth: '820px', margin: '0 auto' }}>
        <svg
          width="100%" viewBox="0 0 790 690"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          role="img" aria-label="Four commitments diagram: Fellowship containing Presence, Formation, and Mission"
          style={{ height: 'auto', display: 'block' }}
        >
          <defs>
            <clipPath id="clipFormationReveal"><circle cx="297" cy="484" r="140"/></clipPath>
            <clipPath id="clipMissionReveal" clipPath="url(#clipFormationReveal)"><circle cx="492" cy="484" r="140"/></clipPath>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(15,26,46,0.12)" />
              <stop offset="100%" stopColor="rgba(15,26,46,0.03)" />
            </radialGradient>
          </defs>

          {/* Triangle — Fellowship boundary */}
          <path d="M395 35 L55 624 L735 624 Z" stroke={TRI_STROKE} strokeWidth="1.8"
            fill={TRI_FILL} strokeLinejoin="round" />

          {/* Three Venn circles */}
          <circle cx="395" cy="315" r="140" stroke={CIRC_STROKE} strokeWidth="1.4" fill="transparent" />
          <circle cx="297" cy="484" r="140" stroke={CIRC_STROKE} strokeWidth="1.4" fill="transparent" />
          <circle cx="492" cy="484" r="140" stroke={CIRC_STROKE} strokeWidth="1.4" fill="transparent" />

          {/* Center fill — soft radial glow */}
          <circle cx="395" cy="315" r="140" fill="url(#centerGlow)"
            clipPath="url(#clipMissionReveal)" />

          {/* Circle labels — centered in each circle */}
          <text x="395" y="320" textAnchor="middle" fill={LABEL_FILL}
            fontFamily="Cormorant Garamond, Georgia, serif" fontSize="16" fontWeight="700" letterSpacing="0.12em">
            PRESENCE
          </text>
          <text x="240" y="489" textAnchor="middle" fill={LABEL_FILL}
            fontFamily="Cormorant Garamond, Georgia, serif" fontSize="16" fontWeight="700" letterSpacing="0.12em">
            FORMATION
          </text>
          <text x="492" y="489" textAnchor="middle" fill={LABEL_FILL}
            fontFamily="Cormorant Garamond, Georgia, serif" fontSize="16" fontWeight="700" letterSpacing="0.12em">
            MISSION
          </text>

          {/* Fellowship label — below triangle */}
          <text x="395" y="670" textAnchor="middle" fill={TRI_STROKE}
            fontFamily="Cormorant Garamond, Georgia, serif" fontSize="16" fontWeight="600" letterSpacing="0.12em">
            FELLOWSHIP
          </text>
        </svg>
      </div>
    </div>
  );
}
