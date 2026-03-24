import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home', () => {
  beforeEach(() => {
    render(<MemoryRouter><Home /></MemoryRouter>);
  });

  it('renders "Model City Church" heading', () => {
    expect(screen.getByRole('heading', { level: 1, name: /Model City Church/i })).toBeInTheDocument();
  });

  it('renders 7 value cards', () => {
    const names = ['Bring & Share', 'Go Small & Go Home', 'Extravagant Generosity', 'Spiritual Dependence', 'Altars, Not Stages', 'Pillars, Not Platforms', 'Radical Authenticity'];
    names.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders "Learn More" and "Support the Mission" links', () => {
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByText('Support the Mission')).toBeInTheDocument();
  });

  it('renders Isaiah 11:9 quote', () => {
    expect(screen.getByText(/Isaiah 11:9/)).toBeInTheDocument();
  });
});
