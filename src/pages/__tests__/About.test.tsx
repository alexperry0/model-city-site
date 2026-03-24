import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../About';

describe('About', () => {
  beforeEach(() => {
    render(<MemoryRouter><About /></MemoryRouter>);
  });

  it('renders "Model City Church" heading', () => {
    expect(screen.getByRole('heading', { level: 1, name: /Model City Church/i })).toBeInTheDocument();
  });

  it('renders "How We Began" section', () => {
    expect(screen.getByText('How We Began')).toBeInTheDocument();
  });

  it('renders "What We Believe" section', () => {
    expect(screen.getByText('What We Believe')).toBeInTheDocument();
  });

  it('renders Venn diagram with "The Three Commitments"', () => {
    expect(screen.getByText('The Three Commitments')).toBeInTheDocument();
  });

  it('renders Ecology diagram with "The Ecology of Fellowship"', () => {
    expect(screen.getByText('The Ecology of Fellowship')).toBeInTheDocument();
  });
});
