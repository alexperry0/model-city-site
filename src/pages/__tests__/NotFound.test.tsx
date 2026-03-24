import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../NotFound';

describe('NotFound', () => {
  it('renders 404 label', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders "Page Not Found" heading', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders "Go Home" link to /', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    const link = screen.getByText('Go Home');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });
});
