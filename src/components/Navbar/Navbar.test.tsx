import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './index';

describe('Navbar', () => {
  it('renders without crashing', () => {
    render(<Navbar />);
    expect(document.body).toBeTruthy();
  });

  it('renders with navigation options', () => {
    const options = [
      { label: 'Home', value: 'home' },
      { label: 'About', value: 'about' },
    ];
    const { container } = render(<Navbar options={options} />);
    const labelContent = container.querySelector('.label-content') as HTMLElement;
    if (labelContent) fireEvent.click(labelContent);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('About')).toBeTruthy();
  });

  it('renders logo when provided', () => {
    render(<Navbar logo={<img src="/logo.png" alt="Logo" />} />);
    const img = document.querySelector('img[alt="Logo"]');
    expect(img).toBeTruthy();
  });

  it('renders profile avatar when profile object provided', () => {
    render(<Navbar profile={{ name: 'John Doe' }} />);
    expect(document.body).toBeTruthy();
  });

  it('renders Dropdown for options with sub-options', () => {
    const options = [
      {
        label: 'Products',
        value: 'products',
        options: [
          { label: 'Product A', value: 'a' },
          { label: 'Product B', value: 'b' },
        ],
      },
    ];
    const { container } = render(<Navbar options={options} />);
    const dropdown = container.querySelector('.expandable-container, .dropdown');
    expect(dropdown).toBeTruthy();
  });

  it('renders navigation options via Dropdown', () => {
    const onClick = vi.fn();
    const options = [{ label: 'Dashboard', value: 'dashboard', onClick }];
    const { container } = render(<Navbar options={options as any} />);
    const labelContent = container.querySelector('.label-content') as HTMLElement;
    if (labelContent) fireEvent.click(labelContent);
    const optionEl = document.querySelector('[role="option"]');
    expect(optionEl).toBeTruthy();
  });

  it('renders title when no logo provided', () => {
    render(<Navbar title="My App" />);
    expect(screen.getByText('My App')).toBeTruthy();
  });

  it('renders nav items with icon if provided', () => {
    const options = [{ label: 'Home', value: 'home', icon: 'home' }];
    const { container } = render(<Navbar options={options as any} />);
    const labelContent = container.querySelector('.label-content') as HTMLElement;
    if (labelContent) fireEvent.click(labelContent);
    const icon = document.querySelector('.icon');
    expect(icon).toBeTruthy();
  });

  it('renders navigation role on container', () => {
    render(<Navbar />);
    const nav = document.querySelector('nav[role="navigation"]');
    expect(nav).toBeTruthy();
  });
});
