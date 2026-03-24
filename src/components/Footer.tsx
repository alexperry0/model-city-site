import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-brand">Model City Church</span>
      <p>Helping people experience Jesus and learn to love and follow him in all of life.</p>
      <p>Kingsport, Tennessee</p>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/give">Give</Link>
      </div>
      <p className="footer-attribution">
        Background pattern by{' '}
        <a href="https://www.svgbackgrounds.com" target="_blank" rel="noopener noreferrer">
          SVGBackgrounds.com
        </a>
      </p>
    </footer>
  );
}
