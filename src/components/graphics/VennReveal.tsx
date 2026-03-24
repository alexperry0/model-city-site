import { useState } from 'react';

type VennZone =
  | null
  | 'center'
  | 'presence-only'
  | 'formation-only'
  | 'mission-only'
  | 'presence-formation'
  | 'presence-mission'
  | 'formation-mission';

const zones: {
  zoneId: VennZone;
  label: string;
  detail: string;
  zone: string;
  circles: string[];
  // Tooltip position in SVG coords
  tx: number;
  ty: number;
}[] = [
  { zoneId: 'presence-only', label: 'Hyper Spirituality', detail: 'Mysticism disconnected from Scripture and neighbor.', zone: 'Presence only', circles: ['presence'], tx: 395, ty: 195 },
  { zoneId: 'formation-only', label: 'Spiritual Narcissism', detail: 'Head knowledge without heart or hands.', zone: 'Formation only', circles: ['formation'], tx: 190, ty: 510 },
  { zoneId: 'mission-only', label: 'Secular Renewal', detail: 'Social work without the gospel.', zone: 'Mission only', circles: ['mission'], tx: 520, ty: 510 },
  { zoneId: 'presence-formation', label: 'Spiritual Selfishness', detail: 'Inward-focused believers.', zone: 'Presence + Formation', circles: ['presence', 'formation'], tx: 250, ty: 345 },
  { zoneId: 'presence-mission', label: 'Shallow Servants', detail: 'Activity without depth.', zone: 'Presence + Mission', circles: ['presence', 'mission'], tx: 430, ty: 345 },
  { zoneId: 'formation-mission', label: 'Social Activism', detail: 'Loses intimacy with God.', zone: 'Formation + Mission', circles: ['formation', 'mission'], tx: 335, ty: 470 },
];

// Light theme colors — higher contrast for readability
const TRI_STROKE = '#8B6914';
const CIRC_STROKE = 'rgba(15,26,46,0.3)';
const TRI_FILL = 'rgba(15,26,46,0.04)';
const LABEL_FILL = '#0F1A2E';
const ZONE_FILL = 'rgba(15,26,46,0.7)';
const CENTER_GOLD = '#8B6914';

export function VennReveal() {
  const [active, setActive] = useState<VennZone>(null);

  const activeZone = active ? zones.find(z => z.zoneId === active) : null;
  const isCenter = active === 'center';
  const hasHighlight = active !== null;

  const circleOpacity = (circleId: string) => {
    if (!hasHighlight) return 1;
    if (isCenter) return 1;
    if (activeZone?.circles.includes(circleId)) return 1;
    return 0.2;
  };

  const zoneLabelOpacity = (zoneId: string) => {
    if (!hasHighlight) return 1;
    if (active === zoneId) return 1;
    return 0.15;
  };

  const cornerLabelOpacity = () => hasHighlight ? 0.3 : 1;

  return (
    <div style={{ textAlign: 'center' }}>
      <span className="label">Life of Discipleship</span>
      <h2 style={{ marginBottom: '1rem' }}>The Three Commitments</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
        Presence, Formation, and Mission — held together by Fellowship. Where
        all three overlap, compelling missional disciples are formed. Where they
        don't, imbalance takes root.
      </p>

      <div style={{ position: 'relative', maxWidth: '820px', margin: '0 auto' }}>
        <svg
          width="100%" viewBox="0 0 790 690"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          role="img" aria-label="Missional Disciple diagram — interactive"
          style={{ height: 'auto', display: 'block' }}
          onMouseLeave={() => setActive(null)}
        >
          <defs>
            <clipPath id="clipFormationReveal"><circle cx="297" cy="484" r="140"/></clipPath>
            <clipPath id="clipMissionReveal" clipPath="url(#clipFormationReveal)"><circle cx="492" cy="484" r="140"/></clipPath>
            {/* Presence: arc across top of circle (r=145, just outside r=140) */}
            <path id="presenceArc" d="M 290 205 A 145 145 0 0 1 500 205" fill="none" />
            {/* Formation: rotated 120° CCW — CCW arc on lower-left (r=152 for padding from circle) */}
            <path id="formationArc" d="M 148 435 A 152 152 0 0 0 255 640" fill="none" />
            {/* Mission: rotated 120° CW — CCW arc on lower-right (r=152 for padding from circle) */}
            <path id="missionArc" d="M 535 640 A 152 152 0 0 0 642 435" fill="none" />
          </defs>

          {/* Triangle */}
          <path d="M395 35 L55 624 L735 624 Z" stroke={TRI_STROKE} strokeWidth="1.8"
            fill={TRI_FILL} strokeLinejoin="round" />

          {/* Three Venn circles */}
          <circle cx="395" cy="315" r="140" stroke={CIRC_STROKE} strokeWidth="1.4" fill="transparent"
            style={{ transition: 'opacity 0.25s ease', opacity: circleOpacity('presence') }} />
          <circle cx="297" cy="484" r="140" stroke={CIRC_STROKE} strokeWidth="1.4" fill="transparent"
            style={{ transition: 'opacity 0.25s ease', opacity: circleOpacity('formation') }} />
          <circle cx="492" cy="484" r="140" stroke={CIRC_STROKE} strokeWidth="1.4" fill="transparent"
            style={{ transition: 'opacity 0.25s ease', opacity: circleOpacity('mission') }} />

          {/* Gold center fill */}
          <circle cx="395" cy="315" r="140" fill={CENTER_GOLD}
            clipPath="url(#clipMissionReveal)"
            style={{ transition: 'opacity 0.25s ease', opacity: isCenter ? 0.55 : 0.35 }} />

          {/* Circle labels — curved along the outer arcs */}
          {/* Presence: top arc (outer, non-overlapping portion) */}
          <text fill={LABEL_FILL} fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="16" fontWeight="700" letterSpacing="0.12em"
            style={{ transition: 'opacity 0.25s ease', opacity: cornerLabelOpacity() }}>
            <textPath href="#presenceArc" startOffset="50%" textAnchor="middle">PRESENCE</textPath>
          </text>
          {/* Formation: arc on lower-left, reading bottom-to-top */}
          <text fill={LABEL_FILL} fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="16" fontWeight="700" letterSpacing="0.12em"
            style={{ transition: 'opacity 0.25s ease', opacity: cornerLabelOpacity() }}>
            <textPath href="#formationArc" startOffset="50%" textAnchor="middle">FORMATION</textPath>
          </text>
          {/* Mission: arc on lower-right, reading bottom-to-top */}
          <text fill={LABEL_FILL} fontFamily="Cormorant Garamond, Georgia, serif"
            fontSize="16" fontWeight="700" letterSpacing="0.12em"
            style={{ transition: 'opacity 0.25s ease', opacity: cornerLabelOpacity() }}>
            <textPath href="#missionArc" startOffset="50%" textAnchor="middle">MISSION</textPath>
          </text>
          {/* Fellowship: centered at bottom, below triangle base */}
          <text x="395" y="670" textAnchor="middle" fill={TRI_STROKE}
            fontFamily="Cormorant Garamond, Georgia, serif" fontSize="16" fontWeight="600" letterSpacing="0.12em"
            style={{ transition: 'opacity 0.25s ease', opacity: cornerLabelOpacity() }}>FELLOWSHIP</text>

          {/* Zone labels */}
          <text x="395" y="240" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="16"
            style={{ transition: 'opacity 0.25s ease', opacity: zoneLabelOpacity('presence-only') }}>Hyper Spirituality</text>

          <g style={{ transition: 'opacity 0.25s ease', opacity: zoneLabelOpacity('formation-only') }}>
            <text x="230" y="533" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="15">Spiritual</text>
            <text x="230" y="551" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="15">Narcissism</text>
          </g>

          <g style={{ transition: 'opacity 0.25s ease', opacity: zoneLabelOpacity('mission-only') }}>
            <text x="560" y="533" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="15">Secular</text>
            <text x="560" y="551" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="15">Renewal</text>
          </g>

          <g style={{ transition: 'opacity 0.25s ease', opacity: zoneLabelOpacity('presence-formation') }}>
            <text x="315" y="373" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="15">Spiritual</text>
            <text x="315" y="391" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="15">Selfishness</text>
          </g>

          <g style={{ transition: 'opacity 0.25s ease', opacity: zoneLabelOpacity('presence-mission') }}>
            <text x="475" y="373" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="15">Shallow</text>
            <text x="475" y="391" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="15">Servants</text>
          </g>

          <g style={{ transition: 'opacity 0.25s ease', opacity: zoneLabelOpacity('formation-mission') }}>
            <text x="394" y="494" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="15">Social</text>
            <text x="394" y="512" textAnchor="middle" fill={ZONE_FILL} fontFamily="Lora, Georgia, serif" fontSize="15">Activism</text>
          </g>

          {/* Hover zones */}
          <circle cx="395" cy="240" r="45" fill={active === 'presence-only' ? 'rgba(199,149,26,0.15)' : 'transparent'}
            style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }} onMouseEnter={() => setActive('presence-only')} />
          <circle cx="230" cy="540" r="42" fill={active === 'formation-only' ? 'rgba(199,149,26,0.15)' : 'transparent'}
            style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }} onMouseEnter={() => setActive('formation-only')} />
          <circle cx="560" cy="540" r="42" fill={active === 'mission-only' ? 'rgba(199,149,26,0.15)' : 'transparent'}
            style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }} onMouseEnter={() => setActive('mission-only')} />
          <ellipse cx="315" cy="382" rx="38" ry="28" fill={active === 'presence-formation' ? 'rgba(199,149,26,0.15)' : 'transparent'}
            style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }} onMouseEnter={() => setActive('presence-formation')} />
          <ellipse cx="475" cy="382" rx="38" ry="28" fill={active === 'presence-mission' ? 'rgba(199,149,26,0.15)' : 'transparent'}
            style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }} onMouseEnter={() => setActive('presence-mission')} />
          <ellipse cx="394" cy="503" rx="38" ry="28" fill={active === 'formation-mission' ? 'rgba(199,149,26,0.15)' : 'transparent'}
            style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }} onMouseEnter={() => setActive('formation-mission')} />
          <circle cx="395" cy="448" r="38" fill={active === 'center' ? 'rgba(199,149,26,0.2)' : 'transparent'}
            style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }} onMouseEnter={() => setActive('center')} />

          {/* Tooltips removed — rendered outside SVG below */}
        </svg>
      </div>

      {/* Hover callout — appears below diagram */}
      <div style={{
        minHeight: '90px',
        maxWidth: '480px',
        margin: '1.5rem auto 0',
        textAlign: 'center',
        transition: 'opacity 0.3s ease',
        opacity: hasHighlight ? 1 : 0.5,
      }}>
        {isCenter ? (
          <>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600, color: CENTER_GOLD, margin: '0 0 0.4rem' }}>
              Compelling Missional Disciples
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(15,26,46,0.6)', lineHeight: '1.6', margin: 0 }}>
              All three commitments in balance — the goal for every believer.
            </p>
          </>
        ) : activeZone ? (
          <>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 600, color: '#0F1A2E', margin: '0 0 0.4rem' }}>
              {activeZone.label}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(15,26,46,0.6)', lineHeight: '1.6', margin: 0 }}>
              {activeZone.detail}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(15,26,46,0.35)', marginTop: '0.3rem', fontStyle: 'italic' }}>
              {activeZone.zone}
            </p>
          </>
        ) : (
          <p style={{ fontSize: '0.9rem', color: 'rgba(15,26,46,0.35)', fontStyle: 'italic', margin: 0 }}>
            Hover over any zone to explore what imbalance looks like.
          </p>
        )}
      </div>
    </div>
  );
}
