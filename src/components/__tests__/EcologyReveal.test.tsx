import { render, screen } from '@testing-library/react';
import { EcologyReveal } from '../graphics/EcologyReveal';

describe('EcologyReveal', () => {
  it('renders intro heading', () => {
    render(<EcologyReveal />);
    expect(screen.getByText('The Ecology of Fellowship')).toBeInTheDocument();
  });

  it('renders all 5 ring labels', () => {
    render(<EcologyReveal />);
    ['Solitude', 'Hospitality', 'Band', 'House Fellowship', 'Congregation'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders hover hint', () => {
    render(<EcologyReveal />);
    expect(screen.getByText(/Hover over any ring/)).toBeInTheDocument();
  });
});
