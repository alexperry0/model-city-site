import { useScrollReveal } from '../hooks/useScrollReveal';
import { VennReveal, EcologyReveal } from '../components/graphics';
import PageMeta from '../components/PageMeta';

export default function About() {
  const heroRef = useScrollReveal<HTMLElement>(0.1);
  const storyRef = useScrollReveal<HTMLElement>(0.15);
  const believeRef = useScrollReveal<HTMLElement>(0.15);
  const vennRef = useScrollReveal<HTMLElement>(0.1);
  const ecologyRef = useScrollReveal<HTMLElement>(0.1);

  return (
    <div className="page">
      <PageMeta
        title="About | Model City Church"
        description="Learn about Model City Church — a new church for Kingsport, Tennessee rooted in historic Christianity."
      />

      {/* Scene 1: Page header */}
      <section className="hero reveal-fade reveal-stagger" ref={heroRef} style={{ minHeight: '60vh' }}>
        <span className="label">About</span>
        <h1>Model City Church</h1>
        <p className="hero-tagline">
          A new church for Kingsport, Tennessee.
        </p>
      </section>

      {/* Scene 2: Our Story */}
      <section className="scene scene--narrow reveal-fade-up reveal-stagger" ref={storyRef}>
        <div className="scene__inner">
          <span className="label">Our Story</span>
          <h2>How We Began</h2>
          <p>
            Model City Church is a new church plant in Kingsport, Tennessee — a city with a rich
            history of intentional community design going back to John Nolen's 1919 "Model City" plan.
            We believe God is doing something new in this city, and we want to be part of it.
          </p>
          <p>
            Rooted in historic Wesleyan Methodist Christianity, we are a church FOR Kingsport: focused
            on real community, real mission, and real discipleship. We exist to help people experience
            Jesus and learn to love and follow him in all of life.
          </p>
        </div>
      </section>

      {/* Scene 3: What We Believe */}
      <section className="scene scene--narrow reveal-fade-up reveal-stagger" ref={believeRef}>
        <div className="scene__inner">
          <span className="label">Belief</span>
          <h2>What We Believe</h2>
          <p>
            Model City Church stands in the tradition of historic, orthodox Christianity. The faith
            handed down through the Apostles' Creed and the Nicene Creed is the faith held here.
            The church is part of the Wesleyan Methodist tradition, grounded in the Articles of Religion
            and shaped by a commitment to Scripture, holiness, and mission.
          </p>
        </div>
      </section>

      {/* Scene 4: Venn diagram — the three commitments */}
      <section className="scene reveal-fade-up" ref={vennRef}>
        <div className="scene__inner--wide">
          <VennReveal />
        </div>
      </section>

      {/* Scene 5: Ecology diagram — community life */}
      <section className="scene reveal-fade-up" ref={ecologyRef}>
        <div className="scene__inner--wide">
          <EcologyReveal />
        </div>
      </section>
    </div>
  );
}
