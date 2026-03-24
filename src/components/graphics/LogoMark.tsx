import { GOLD } from './colors';

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Model City Church logo"
      role="img"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path
        d="M10 95V38C10 20.3 24.3 6 42 6h0C59.7 6 70 20.3 70 38V95H10Z"
        stroke={GOLD}
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M16 92V40C16 24 27 12 40 12h0C53 12 64 24 64 40V92H16Z"
        stroke={GOLD}
        strokeWidth="1"
        opacity="0.5"
        fill="none"
        strokeLinejoin="round"
      />
      <line x1="40" y1="22" x2="40" y2="72" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="26" y1="40" x2="54" y2="40" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="28" x2="28" y2="22" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <line x1="40" y1="28" x2="52" y2="22" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <line x1="40" y1="28" x2="22" y2="32" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <line x1="40" y1="28" x2="58" y2="32" stroke={GOLD} strokeWidth="0.8" opacity="0.4" />
      <path d="M16 92L28 72L36 82L48 64L64 92" stroke={GOLD} strokeWidth="1.2" fill="none" strokeLinejoin="round" opacity="0.6" />
      <path d="M50 52C56 48 62 50 64 56C60 54 54 55 50 58" stroke={GOLD} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}
