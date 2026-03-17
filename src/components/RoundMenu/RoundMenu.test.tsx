import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoundMenu } from './index';

const options = [
  { icon: 'home', label: 'Home', onClick: vi.fn() },
  { icon: 'star', label: 'Star', onClick: vi.fn() },
  { icon: 'settings', label: 'Settings', onClick: vi.fn() },
];

describe('RoundMenu', () => {
  it('renders trigger button', () => {
    render(<RoundMenu options={options} />);
    const trigger = screen.getByLabelText('Open menu');
    expect(trigger).toBeInTheDocument();
  });

  it('trigger toggles expanded/collapsed state', () => {
    render(<RoundMenu options={options} />);
    const trigger = screen.getByLabelText('Open menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('renders menu items when expanded', () => {
    render(<RoundMenu options={options} />);
    const trigger = screen.getByLabelText('Open menu');
    fireEvent.click(trigger);
    // Items should be present and not collapsed
    const homeButton = screen.getByLabelText('Home');
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).not.toHaveClass('collapsed');
  });

  it('menu items have transform style when expanded', () => {
    render(<RoundMenu options={options} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    const homeButton = screen.getByLabelText('Home');
    // translate3d should be applied via inline style
    expect(homeButton.style.transform).toMatch(/translate3d/);
  });

  it('menu items use collapsed class when not expanded', () => {
    const { container } = render(<RoundMenu options={options} />);
    // Before expanding, items should have collapsed class
    const menuItems = container.querySelectorAll('[aria-label="Home"], [aria-label="Star"], [aria-label="Settings"]');
    menuItems.forEach(item => {
      expect(item.className).toMatch(/collapsed/);
    });
  });

  it('calls onClick when a menu item is clicked', () => {
    const onClick = vi.fn();
    render(<RoundMenu options={[{ icon: 'home', label: 'Home', onClick }]} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    fireEvent.click(screen.getByLabelText('Home'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with empty options without crashing', () => {
    render(<RoundMenu options={[]} />);
    expect(document.body).toBeTruthy();
  });

  it('respects custom iconKey and labelKey props', () => {
    const customOptions = [{ myIcon: 'home', myLabel: 'Custom Home', onClick: vi.fn() }];
    render(<RoundMenu options={customOptions} iconKey="myIcon" labelKey="myLabel" />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Custom Home')).toBeInTheDocument();
  });
});
