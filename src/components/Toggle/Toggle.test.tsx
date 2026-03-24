import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { Toggle } from './index';
import { ToggleGroupContext } from '../ToggleGroup/ToggleGroup';

describe('Toggle', () => {
  it('renders without crashing', () => {
    render(<Toggle>Label</Toggle>);
    expect(document.body).toBeTruthy();
  });

  it('renders children as label', () => {
    const { getByText } = render(<Toggle>My Label</Toggle>);
    expect(getByText('My Label')).toBeTruthy();
  });

  it('activates on click (standalone)', () => {
    const { getByRole } = render(<Toggle>Click me</Toggle>);
    const btn = getByRole('button');
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-pressed')).toBe('true');
  });

  it('reads ToggleGroup context when inside a ToggleGroup', () => {
    const select = vi.fn();
    const ctx = {
      selected: 'a',
      disabled: false,
      type: 'default' as const,
      select,
    };
    const { getByRole } = render(
      <ToggleGroupContext.Provider value={ctx}>
        <Toggle groupValue="a">Option A</Toggle>
      </ToggleGroupContext.Provider>
    );
    const btn = getByRole('button');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
  });

  it('calls groupCtx.select when inside a ToggleGroup and clicked', () => {
    const select = vi.fn();
    const ctx = {
      selected: null,
      disabled: false,
      type: 'default' as const,
      select,
    };
    const { getByRole } = render(
      <ToggleGroupContext.Provider value={ctx}>
        <Toggle groupValue="b">Option B</Toggle>
      </ToggleGroupContext.Provider>
    );
    fireEvent.click(getByRole('button'));
    expect(select).toHaveBeenCalledWith('b');
  });

  it('controlled mode calls onChange on click', () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<Toggle value={false} onChange={handleChange}>Label</Toggle>);
    fireEvent.click(getByRole('button'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
