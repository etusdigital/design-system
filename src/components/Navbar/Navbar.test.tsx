import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './index';

describe('Navbar', () => {
  it('renders without crashing', () => {
    render(<Navbar />);
    expect(document.body).toBeTruthy();
  });

  it('renders with navigation options', () => {
    const options = [
      { label: 'Home', onClick: vi.fn() },
      { label: 'About', onClick: vi.fn() },
    ];
    render(<Navbar options={options} />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('About')).toBeTruthy();
  });

  it('renders logo when provided', () => {
    render(<Navbar logo={<img src="/logo.png" alt="Logo" />} />);
    const img = document.querySelector('img[alt="Logo"]');
    expect(img).toBeTruthy();
  });

  it('renders profile when provided', () => {
    render(<Navbar profile={<span data-testid="profile-slot">John Doe</span>} />);
    expect(screen.getByTestId('profile-slot')).toBeTruthy();
  });

  it('renders Dropdown for options with sub-options', () => {
    const options = [
      {
        label: 'Products',
        options: [
          { label: 'Product A', value: 'a' },
          { label: 'Product B', value: 'b' },
        ],
      },
    ];
    const { container } = render(<Navbar options={options} />);
    // Dropdown renders an expandable-container
    const dropdown = container.querySelector('.expandable-container, .dropdown');
    expect(dropdown).toBeTruthy();
  });

  it('renders plain items for options without sub-options', () => {
    const onClick = vi.fn();
    const options = [{ label: 'Dashboard', onClick }];
    render(<Navbar options={options} />);
    const item = screen.getByRole('button', { name: 'Dashboard' });
    expect(item).toBeTruthy();
  });

  it('renders title when no logo provided', () => {
    render(<Navbar title="My App" />);
    expect(screen.getByText('My App')).toBeTruthy();
  });

  it('renders nav items with icon if provided', () => {
    const options = [{ label: 'Home', icon: 'home' }];
    const { container } = render(<Navbar options={options} />);
    const icon = container.querySelector('.icon');
    expect(icon).toBeTruthy();
  });

  it('renders navigation role on container', () => {
    render(<Navbar />);
    const nav = document.querySelector('nav[role="navigation"]');
    expect(nav).toBeTruthy();
  });
});
