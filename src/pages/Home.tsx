import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PageMeta from '../components/PageMeta';

export default function Home() {
  const heroRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <div className="page">
      <PageMeta
        title="Model City Church | A Church for Kingsport, TN"
        description="Helping people experience Jesus and learn to love and follow him in all of life. Join us Sundays in Kingsport, TN."
      />

      {/* Hero */}
      <section className="hero reveal-fade reveal-stagger" ref={heroRef}
        style={{ minHeight: 'calc(100vh - var(--nav-height))' }}>
        <h1>Model City Church</h1>
        <p className="hero-tagline">
          Helping people experience Jesus and learn to love
          and follow him in all of life.
        </p>
        <p className="hero-details">
          Sundays in Kingsport, TN &middot; Time & location coming soon
        </p>
        <div className="btn-group">
          <Link to="/about" className="btn btn-primary">Our Story</Link>
          <Link to="/give" className="btn btn-outline">Build With Us</Link>
        </div>
      </section>
    </div>
  );
}
