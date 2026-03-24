import { useScrollReveal } from '../hooks/useScrollReveal';
import { DualFundDiagram } from '../components/graphics';
import PageMeta from '../components/PageMeta';

export default function Give() {
  const heroRef = useScrollReveal<HTMLElement>(0.1);
  const modelRef = useScrollReveal<HTMLElement>(0.15);
  const ctaRef = useScrollReveal<HTMLElement>(0.15);

  return (
    <div className="page">
      <PageMeta
        title="Give | Model City Church"
        description="Support the mission of Model City Church. 100% of congregational giving goes directly to community impact in Kingsport."
      />

      {/* Hero + stat combined */}
      <section className="hero reveal-fade reveal-stagger" ref={heroRef} style={{ minHeight: '50vh' }}>
        <span className="label">Give</span>
        <h1>Your generosity<br />changes lives.</h1>
        <p className="hero-tagline">
          100% of congregational giving goes directly to community impact.
          Operational costs are covered separately — every gift is a gift to the mission.
        </p>
      </section>

      {/* Dual-fund model */}
      <section className="scene reveal-fade-up" ref={modelRef}>
        <div className="scene__inner--wide">
          <span className="label">Our Model</span>
          <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Two Funds, One Mission</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 1.5rem', textAlign: 'center' }}>
            An Operations Fund covers every cost. A Mission Fund — fueled by your tithes and offerings —
            goes directly to Kingsport.
          </p>
          <DualFundDiagram />
        </div>
      </section>

      {/* CTA + methods + tax — all in one */}
      <section className="scene scene--alt reveal-fade-up reveal-stagger" ref={ctaRef}>
        <h2 style={{ marginBottom: '1.5rem' }}>Give Now</h2>
        <a
          href="https://app.givetransform.org/MCC?method=1"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg"
        >
          Give Online
        </a>
        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '400px', textAlign: 'center' }}>
          Giving is processed securely through Give Transform.
          Credit/debit, bank transfer, and PayPal accepted.
        </p>
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
          Model City Church is a 501(c)(3) organization. All donations are tax-deductible.
        </p>
      </section>
    </div>
  );
}
