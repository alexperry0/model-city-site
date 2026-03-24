import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { HeroCross } from '../components/graphics';
import PageMeta from '../components/PageMeta';

const values = [
  { name: 'Bring & Share', desc: 'Everyone has something to contribute. The church is stronger when all of us show up with what God has given us.' },
  { name: 'Go Small & Go Home', desc: 'Real life change happens in small circles of trust, not rows of spectators.' },
  { name: 'Extravagant Generosity', desc: 'Every dollar given by the congregation goes directly to community impact in Kingsport.' },
  { name: 'Spiritual Dependence', desc: 'Prayer is not preparation for the work. Prayer is the work.' },
  { name: 'Altars, Not Stages', desc: 'Worship is an encounter with the living God, not a performance.' },
  { name: 'Pillars, Not Platforms', desc: 'Leaders serve to build others up, not to build a following.' },
  { name: 'Radical Authenticity', desc: 'No masks. No pretending. Come as you are and be known.' },
];

export default function Home() {
  const heroRef = useScrollReveal<HTMLElement>(0.1);
  const visionRef = useScrollReveal<HTMLElement>(0.15);
  const valuesRef = useScrollReveal<HTMLElement>(0.1);
  const ctaRef = useScrollReveal<HTMLElement>(0.15);

  return (
    <div className="page">
      <PageMeta
        title="Model City Church | A Church for Kingsport, TN"
        description="Helping people experience Jesus and learn to love and follow him in all of life. Join us Sundays in Kingsport, TN."
      />

      {/* Scene 1: Hero */}
      <section className="hero reveal-fade reveal-stagger" ref={heroRef}>
        <HeroCross size={52} />
        <h1>Model City Church</h1>
        <p className="hero-tagline">
          Helping people experience Jesus and learn to love
          and follow him in all of life.
        </p>
        <p className="hero-details">
          Sundays in Kingsport, TN &middot; Time & location coming soon
        </p>
        <div className="btn-group">
          <Link to="/about" className="btn btn-primary">Learn More</Link>
          <Link to="/give" className="btn btn-outline">Support the Mission</Link>
        </div>
      </section>

      {/* Scene 2: Vision quote */}
      <section className="scene reveal-fade-up reveal-stagger" ref={visionRef}>
        <div className="scene__rule" />
        <blockquote className="big-quote">
          &ldquo;For the earth will be filled with the knowledge of the Lord
          as the waters cover the sea.&rdquo;
          <cite>Isaiah 11:9</cite>
        </blockquote>
      </section>

      {/* Scene 3: Values */}
      <section className="scene scene--alt reveal-fade-up" ref={valuesRef}>
        <div className="scene__inner--wide">
          <span className="label">Our Values</span>
          <h2>What We Value</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '1rem auto 0', textAlign: 'center' }}>
            Seven commitments that shape how we follow Jesus together.
          </p>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.name} className="value-card" style={{ transitionDelay: `${i * 80}ms` }}>
                <h3>{v.name}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scene 4: CTA */}
      <section className="scene reveal-fade-up reveal-stagger" ref={ctaRef}>
        <div className="cta-section">
          <h2>Come as you are.</h2>
          <p>
            We'd love to meet you. Model City Church is a community rooted in
            historic Christianity, building something new for Kingsport.
          </p>
          <div className="btn-group">
            <Link to="/about" className="btn btn-primary">Our Story</Link>
            <Link to="/give" className="btn btn-outline">Give</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
