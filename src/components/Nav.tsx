import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoMark } from './graphics';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/give', label: 'Give' },
  ];

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <LogoMark size={28} />
        Model City Church
      </Link>
      <button
        className="nav-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? '\u2715' : '\u2630'}
      </button>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={location.pathname === to ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
