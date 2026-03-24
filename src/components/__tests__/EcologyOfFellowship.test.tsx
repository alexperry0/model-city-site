import { render, screen } from '@testing-library/react';
import { EcologyOfFellowship } from '../graphics/EcologyOfFellowship';

describe('EcologyOfFellowship', () => {
  it('renders 5 ring circle elements', () => {
    const { container } = render(<EcologyOfFellowship step={4} />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThanOrEqual(5);
  });

  it('renders 5 text labels', () => {
    render(<EcologyOfFellowship step={4} />);
    ['Solitude', 'Hospitality', 'Band', 'House Fellowship', 'Congregation'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('does not render detail cards', () => {
    render(<EcologyOfFellowship step={4} />);
    ['1 person', '2–3 people', '3–5 people', '12–20 people', '50+ people'].forEach(size => {
      expect(screen.queryByText(size)).not.toBeInTheDocument();
    });
  });

  it('renders SVG with correct aria-label', () => {
    const { container } = render(<EcologyOfFellowship step={0} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute('aria-label')).toContain('Ecology of Fellowship');
  });

  it('at step 0, only first ring is visible', () => {
    const { container } = render(<EcologyOfFellowship step={0} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
