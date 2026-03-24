import { GOLD } from './colors';

export function HeroCross({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', margin: '0 auto 1.5rem' }}
    >
      <line x1="24" y1="4" x2="24" y2="44" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="16" x2="36" y2="16" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
