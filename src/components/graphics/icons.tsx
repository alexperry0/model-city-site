import { GOLD } from './colors';

export function PresenceIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" style={{ margin: '0 auto 0.75rem', display: 'block' }}>
      <circle cx="18" cy="22" r="7" stroke={GOLD} strokeWidth="1.2" strokeDasharray="0 22" strokeLinecap="round" />
      <path d="M18 15V8" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12.5 17L8 13" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M23.5 17L28 13" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="4" y1="26" x2="32" y2="26" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function FormationIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" style={{ margin: '0 auto 0.75rem', display: 'block' }}>
      <path d="M18 10C15 8 10 8 6 9V27C10 26 15 26 18 28C21 26 26 26 30 27V9C26 8 21 8 18 10Z" stroke={GOLD} strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="18" y1="10" x2="18" y2="28" stroke={GOLD} strokeWidth="1.2" />
    </svg>
  );
}

export function MissionIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" style={{ margin: '0 auto 0.75rem', display: 'block' }}>
      <circle cx="18" cy="18" r="12" stroke={GOLD} strokeWidth="1.2" />
      <polygon points="18,8 21,20 18,18 15,20" fill={GOLD} opacity="0.8" />
      <polygon points="18,28 15,16 18,18 21,16" stroke={GOLD} strokeWidth="0.8" fill="none" />
    </svg>
  );
}

export function FellowshipIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" style={{ margin: '0 auto 0.75rem', display: 'block' }}>
      <circle cx="14" cy="16" r="6" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="22" cy="16" r="6" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="18" cy="23" r="6" stroke={GOLD} strokeWidth="1.2" />
    </svg>
  );
}
