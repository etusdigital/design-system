import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ProfilePicture } from './ProfilePicture';
import type { ProfilePictureOption } from './ProfilePicture';

const defaultOptions: ProfilePictureOption[] = [
  { label: 'My account', value: 'account', icon: 'person' },
  { label: 'Settings', value: 'settings', icon: 'settings' },
  {
    label: 'Language',
    value: 'language',
    icon: 'translate',
    items: [
      { label: 'English', value: 'en', icon: 'language' },
      { label: 'Português', value: 'pt', icon: 'language' },
    ],
  },
  { label: 'Logout', value: 'logout', icon: 'logout', color: 'danger' },
];

describe('ProfilePicture', () => {
  it('renders trigger with avatar', () => {
    render(
      <ProfilePicture name="John Doe" options={defaultOptions} />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens menu on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <ProfilePicture name="John Doe" options={defaultOptions} />
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('opens menu on ArrowDown key on trigger', async () => {
    const user = userEvent.setup();
    render(
      <ProfilePicture name="John Doe" options={defaultOptions} />
    );

    const trigger = screen.getByRole('button');
    trigger.focus();
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes menu on Escape key', async () => {
    const user = userEvent.setup();
    render(
      <ProfilePicture name="John Doe" options={defaultOptions} />
    );

    const trigger = screen.getByRole('button');
    await user.click(trigger);

    await user.keyboard('{Escape}');

    // Menu should be closed
    expect(screen.queryByRole('group')).not.toBeInTheDocument();
  });

  it('selects option with items on ArrowRight', async () => {
    const user = userEvent.setup();
    render(
      <ProfilePicture
        name="John Doe"
        options={defaultOptions}
        expanded
      />
    );

    const menuItems = screen.getAllByRole('menuitem');
    const languageOption = menuItems[2];
    languageOption.focus();

    await user.keyboard('{ArrowRight}');

    // Should show sub-items
    const subItems = screen.getAllByRole('menuitemradio');
    expect(subItems.length).toBe(2);
  });

  it('updates value when selecting sub-item', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ProfilePicture
        name="John Doe"
        options={defaultOptions}
        onChange={onChange}
        expanded
      />
    );

    const menuItems = screen.getAllByRole('menuitem');
    const languageOption = menuItems[2];
    languageOption.focus();

    await user.keyboard('{ArrowRight}');

    const subItems = screen.getAllByRole('menuitemradio');
    await user.click(subItems[0]);

    expect(onChange).toHaveBeenCalledWith({ language: 'en' });
  });

  it('disables trigger when disabled prop is true', () => {
    render(
      <ProfilePicture
        name="John Doe"
        options={defaultOptions}
        disabled
      />
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
    expect(trigger).toHaveAttribute('tabIndex', '-1');
  });

  it('navigates through options with Arrow keys', async () => {
    const user = userEvent.setup();
    render(
      <ProfilePicture
        name="John Doe"
        options={defaultOptions}
        expanded
      />
    );

    const menuItems = screen.getAllByRole('menuitem');
    menuItems[0].focus();

    await user.keyboard('{ArrowDown}');

    expect(menuItems[1]).toHaveFocus();
  });

  it('loops through options with Arrow keys', async () => {
    const user = userEvent.setup();
    render(
      <ProfilePicture
        name="John Doe"
        options={defaultOptions}
        expanded
      />
    );

    const menuItems = screen.getAllByRole('menuitem');
    menuItems[menuItems.length - 1].focus();

    await user.keyboard('{ArrowDown}');

    expect(menuItems[0]).toHaveFocus();
  });

  it('closes menu when tabbing past last item', async () => {
    const user = userEvent.setup();
    render(
      <ProfilePicture
        name="John Doe"
        options={defaultOptions}
        expanded
      />
    );

    const menuItems = screen.getAllByRole('menuitem');
    menuItems[menuItems.length - 1].focus();

    await user.keyboard('{Tab}');

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveFocus();
  });
});
