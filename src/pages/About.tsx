import { useScrollReveal } from '../hooks/useScrollReveal';
import { VennReveal } from '../components/graphics';
import PageMeta from '../components/PageMeta';

export default function About() {
  const heroRef = useScrollReveal<HTMLElement>(0.1);
  const storyRef = useScrollReveal<HTMLElement>(0.15);
  const vennRef = useScrollReveal<HTMLElement>(0.1);
  const believeRef = useScrollReveal<HTMLElement>(0.15);

  return (
    <div className="page">
      <PageMeta
        title="About | Model City Church"
        description="Learn about Model City Church — a new church for Kingsport, Tennessee rooted in ancient Christian teaching."
      />

      {/* Hero — Isaiah quote */}
      <section className="hero reveal-fade reveal-stagger" ref={heroRef}>
        <span className="label">About</span>
        <blockquote className="big-quote">
          &ldquo;For the earth will be filled with the knowledge of God
          as the waters cover the sea.&rdquo;
          <cite>Isaiah 11:9</cite>
        </blockquote>
      </section>

      {/* Our Story */}
      <section className="scene scene--narrow reveal-fade-up reveal-stagger" ref={storyRef}>
        <div className="scene__inner">
          <span className="label">Our Story</span>
          <h2>Why Kingsport</h2>
          <p>
            Model City Church is a new church plant in Kingsport, Tennessee — a city with a rich
            history of intentional community design going back to John Nolen's 1917 "Model City" plan.
            We believe God is doing something new in our city and that he's called us to be a part of it.
          </p>
          <p>
            Rooted in ancient Christianity, we are a church FOR Kingsport: focused
            on real community, real mission, and real discipleship.
          </p>
          <p>
            God longs to fulfill his promise through the prophet Isaiah that one day,
            &ldquo;the earth will be filled with the knowledge of God as the waters
            cover the sea.&rdquo; (Isaiah 11:9) Model City Church exists to help people
            experience Jesus and learn to love and follow him in all of life.
          </p>
        </div>
      </section>

      {/* Four Core Commitments */}
      <section className="scene reveal-fade-up" ref={vennRef}>
        <div className="scene__inner--wide">
          <VennReveal />
        </div>
      </section>

      {/* Our Beliefs */}
      <section className="scene scene--narrow reveal-fade-up reveal-stagger" ref={believeRef}>
        <div className="scene__inner">
          <span className="label">Belief</span>
          <h2>Our Beliefs</h2>
          <p>
            Model City Church is a nondenominational church that stands in the Wesleyan tradition.
            We aim to follow Jesus before we follow any denominational or historic distinctives.
            However, we do acknowledge that many of those have merit and carry significance for
            our life and mission.
          </p>
          <p>
            We hold a number of documents as foundational and normative for our doctrinal beliefs,
            specifically the Articles of Religion, the Apostle's Creed, the Nicene Creed, the
            Chalcedonian Creed, and the Lausanne Covenant.
          </p>
          <p>
            Over all, we believe that the Old and New Testaments are the inspired, authoritative,
            and sufficient Word of God, revealing all things necessary for salvation, faith, and life.
            Scripture is the first and final authority in all matters of faith and practice.
          </p>
        </div>
      </section>
    </div>
  );
}
