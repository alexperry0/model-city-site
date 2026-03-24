import { GOLD, SAPPHIRE, DEEP_NIGHT, TEXT_SEC } from './colors';

export function DualFundDiagram() {
  return (
    <div style={{
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      alignItems: 'stretch',
      flexWrap: 'wrap',
      margin: '2rem 0',
    }}>
      {/* Operations Fund */}
      <div style={{
        flex: '1 1 240px',
        maxWidth: '340px',
        textAlign: 'center',
        padding: '2rem 1.5rem',
        background: 'rgba(15, 26, 46, 0.04)',
        border: '1px solid rgba(15, 26, 46, 0.1)',
        borderTop: `2px solid ${SAPPHIRE}`,
        borderRadius: '8px',
        transition: 'all 0.25s ease',
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" style={{ margin: '0 auto 1rem', display: 'block' }}>
          <rect x="5" y="10" width="30" height="22" rx="3" stroke={GOLD} strokeWidth="1.5" />
          <line x1="5" y1="17" x2="35" y2="17" stroke={GOLD} strokeWidth="1.5" />
          <line x1="20" y1="17" x2="20" y2="32" stroke={GOLD} strokeWidth="1" opacity="0.5" />
        </svg>
        <h4 style={{ color: DEEP_NIGHT, fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.2rem', marginBottom: '0.4rem' }}>Operations Fund</h4>
        <p style={{ color: GOLD, fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '0.75rem' }}>Backed by investors</p>
        <p style={{ color: TEXT_SEC, fontSize: '0.95rem', lineHeight: '1.7' }}>
          Rent, software, supplies, administration — every operational cost covered so the church can focus on mission.
        </p>
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 0.5rem' }}>
        <svg width="2" height="100" aria-hidden="true">
          <line x1="1" y1="0" x2="1" y2="100" stroke={GOLD} strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        </svg>
      </div>

      {/* Mission Fund */}
      <div style={{
        flex: '1 1 240px',
        maxWidth: '340px',
        textAlign: 'center',
        padding: '2rem 1.5rem',
        background: 'rgba(15, 26, 46, 0.04)',
        border: '1px solid rgba(15, 26, 46, 0.1)',
        borderTop: `2px solid ${GOLD}`,
        borderRadius: '8px',
        transition: 'all 0.25s ease',
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" style={{ margin: '0 auto 1rem', display: 'block' }}>
          <path d="M20 5L25 15H33L27 22L29 32L20 26L11 32L13 22L7 15H15L20 5Z" stroke={GOLD} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        </svg>
        <h4 style={{ color: DEEP_NIGHT, fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.2rem', marginBottom: '0.4rem' }}>Mission Fund</h4>
        <p style={{ color: GOLD, fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '0.75rem' }}>Fueled by tithes &amp; offerings</p>
        <p style={{ color: TEXT_SEC, fontSize: '0.95rem', lineHeight: '1.7' }}>
          100% goes to community impact — every dollar directly serves Kingsport through outreach, mercy, and mission.
        </p>
      </div>
    </div>
  );
}
