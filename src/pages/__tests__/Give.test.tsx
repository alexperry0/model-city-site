import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Give from '../Give';

describe('Give', () => {
  beforeEach(() => {
    render(<MemoryRouter><Give /></MemoryRouter>);
  });

  it('renders "Your generosity changes lives" heading', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Your generosity/);
  });

  it('renders "Two Funds, One Mission" heading', () => {
    expect(screen.getByText('Two Funds, One Mission')).toBeInTheDocument();
  });

  it('renders "Give Online" link with href to givetransform', () => {
    const link = screen.getByText('Give Online');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://app.givetransform.org/MCC?method=1');
  });

  it('renders tax-deductible note', () => {
    expect(screen.getByText(/501\(c\)\(3\)/)).toBeInTheDocument();
  });
});
