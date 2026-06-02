import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RoundMenu } from './index';

const options = [
  { icon: 'home', label: 'Home', onClick: vi.fn() },
  { icon: 'star', label: 'Star', onClick: vi.fn() },
  { icon: 'settings', label: 'Settings', onClick: vi.fn() },
];

function getTrigger() {
  const buttons = screen.getAllByRole('button');
  return buttons[buttons.length - 1];
}

describe('RoundMenu', () => {
  it('renders trigger button', () => {
    render(<RoundMenu options={options} />);
    const trigger = getTrigger();
    expect(trigger).toBeInTheDocument();
  });

  it('trigger toggles expanded/collapsed state', () => {
    render(<RoundMenu options={options} />);
    const trigger = getTrigger();
    const menuItemsBefore = document.querySelectorAll('[aria-label="Home"], [aria-label="Star"], [aria-label="Settings"]');
    menuItemsBefore.forEach((item) => {
      expect(item.className).toMatch(/collapsed/);
    });
    fireEvent.click(trigger);
    const menuItemsAfter = document.querySelectorAll('[aria-label="Home"], [aria-label="Star"], [aria-label="Settings"]');
    menuItemsAfter.forEach((item) => {
      expect(item.className).not.toMatch(/collapsed/);
    });
  });

  it('renders menu items when expanded', () => {
    render(<RoundMenu options={options} />);
    const trigger = getTrigger();
    fireEvent.click(trigger);
    const homeItem = document.querySelector('[aria-label="Home"]');
    expect(homeItem).toBeInTheDocument();
    expect(homeItem!.className).not.toMatch(/collapsed/);
  });

  it('menu items have transform style when expanded', () => {
    render(<RoundMenu options={options} />);
    fireEvent.click(getTrigger());
    const homeItem = document.querySelector('[aria-label="Home"]') as HTMLElement;
    expect(homeItem.style.transform).toMatch(/translate3d/);
  });

  it('menu items use collapsed class when not expanded', () => {
    render(<RoundMenu options={options} />);
    const menuItems = document.querySelectorAll('[aria-label="Home"], [aria-label="Star"], [aria-label="Settings"]');
    menuItems.forEach((item) => {
      expect(item.className).toMatch(/collapsed/);
    });
  });

  it('calls onClick when a menu item is clicked', () => {
    const onClick = vi.fn();
    render(<RoundMenu options={[{ icon: 'home', label: 'Home', onClick }]} />);
    fireEvent.click(getTrigger());
    const homeItem = document.querySelector('[aria-label="Home"]') as HTMLElement;
    const homeButton = homeItem.querySelector('button') as HTMLButtonElement;
    fireEvent.click(homeButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with empty options without crashing', () => {
    render(<RoundMenu options={[]} />);
    expect(document.body).toBeTruthy();
  });

  it('respects custom iconKey and labelKey props', () => {
    const customOptions = [{ myIcon: 'home', myLabel: 'Custom Home', onClick: vi.fn() }];
    render(<RoundMenu options={customOptions} iconKey="myIcon" labelKey="myLabel" />);
    fireEvent.click(getTrigger());
    const customItem = document.querySelector('[aria-label="Custom Home"]');
    expect(customItem).toBeInTheDocument();
  });
});
