import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer', () => {
  it('renders brand name "Model City Church"', () => {
    renderFooter();
    expect(screen.getByText('Model City Church')).toBeInTheDocument();
  });

  it('renders tagline text', () => {
    renderFooter();
    expect(
      screen.getByText(
        'Helping people experience Jesus and learn to love and follow him in all of life.'
      )
    ).toBeInTheDocument();
  });

  it('renders 3 nav links (Home, About, Give)', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Give' })).toBeInTheDocument();
  });

  it('renders SVGBackgrounds.com attribution link with correct href', () => {
    renderFooter();
    const attributionLink = screen.getByRole('link', { name: 'SVGBackgrounds.com' });
    expect(attributionLink).toBeInTheDocument();
    expect(attributionLink).toHaveAttribute('href', 'https://www.svgbackgrounds.com');
  });
});
