import { render, screen } from '@testing-library/react';
import { VennReveal } from '../graphics/VennReveal';

describe('VennReveal', () => {
  it('renders intro heading', () => {
    render(<VennReveal />);
    expect(screen.getByText('The Three Commitments')).toBeInTheDocument();
  });

  it('renders PRESENCE, FORMATION, MISSION labels', () => {
    render(<VennReveal />);
    expect(screen.getByText('PRESENCE')).toBeInTheDocument();
    expect(screen.getByText('FORMATION')).toBeInTheDocument();
    expect(screen.getByText('MISSION')).toBeInTheDocument();
  });

  it('renders FELLOWSHIP label', () => {
    render(<VennReveal />);
    expect(screen.getByText('FELLOWSHIP')).toBeInTheDocument();
  });

  it('renders hover hint', () => {
    render(<VennReveal />);
    expect(screen.getByText(/Hover over any zone/)).toBeInTheDocument();
  });
});
