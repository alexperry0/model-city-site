import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from '../Nav';

function renderNav(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Nav />
    </MemoryRouter>
  );
}

describe('Nav', () => {
  it('renders brand "Model City Church"', () => {
    renderNav();
    expect(screen.getByText('Model City Church')).toBeInTheDocument();
  });

  it('renders 3 nav links: Home, About, Give', () => {
    renderNav();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Give' })).toBeInTheDocument();
  });

  it('toggle button adds .open class to nav-links ul', () => {
    renderNav();
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
    const ul = document.querySelector('.nav-links');

    expect(ul).not.toHaveClass('open');
    fireEvent.click(toggle);
    expect(ul).toHaveClass('open');
    fireEvent.click(toggle);
    expect(ul).not.toHaveClass('open');
  });

  it('clicking a nav link closes the mobile menu', () => {
    renderNav();
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
    const ul = document.querySelector('.nav-links');

    // Open the menu first
    fireEvent.click(toggle);
    expect(ul).toHaveClass('open');

    // Click a nav link — should close the menu
    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(ul).not.toHaveClass('open');
  });
});
