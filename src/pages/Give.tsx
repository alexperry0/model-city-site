import { useScrollReveal } from '../hooks/useScrollReveal';
import PageMeta from '../components/PageMeta';

export default function Give() {
  const heroRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <div className="page">
      <PageMeta
        title="Give | Model City Church"
        description="Support the mission of Model City Church in Kingsport, Tennessee."
      />

      <section className="hero reveal-fade reveal-stagger" ref={heroRef}
        style={{ minHeight: 'calc(100vh - var(--nav-height))' }}>
        <span className="label">Give</span>
        <h1>Build with us.</h1>
        <p className="hero-tagline">
          Your generosity helps us pursue our mission in Kingsport.
        </p>
        <a
          href="https://app.givetransform.org/MCC?method=1"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg"
        >
          Give Online
        </a>
        <p className="hero-details" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
          Giving is processed securely through Give Transform.<br />
          Model City Church is a 501(c)(3) organization. All donations are tax-deductible.
        </p>
      </section>
    </div>
  );
}
