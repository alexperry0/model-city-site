import { render, screen } from '@testing-library/react';
import { ProgressiveDiagram } from '../graphics/ProgressiveDiagram';

describe('ProgressiveDiagram', () => {
  it('renders SVG element', () => {
    const { container } = render(<ProgressiveDiagram step={-1} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('at step 0, PRESENCE label is visible', () => {
    render(<ProgressiveDiagram step={0} />);
    expect(screen.getByText('PRESENCE')).toBeInTheDocument();
  });

  it('at step 3, FELLOWSHIP label is present', () => {
    render(<ProgressiveDiagram step={3} />);
    expect(screen.getByText('FELLOWSHIP')).toBeInTheDocument();
  });

  it('at step 3, all corner labels present', () => {
    render(<ProgressiveDiagram step={3} />);
    expect(screen.getByText('PRESENCE')).toBeInTheDocument();
    expect(screen.getByText('FORMATION')).toBeInTheDocument();
    expect(screen.getByText('MISSION')).toBeInTheDocument();
    expect(screen.getByText('FELLOWSHIP')).toBeInTheDocument();
  });
});
