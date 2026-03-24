import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';

export default function NotFound() {
  return (
    <div className="page">
      <section className="hero" style={{ minHeight: '60vh' }}>
        <PageMeta title="Page Not Found | Model City Church" description="This page could not be found." />
        <span className="label">404</span>
        <h1>Page Not Found</h1>
        <p className="hero-tagline">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </section>
    </div>
  );
}
