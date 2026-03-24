import React, { createRef, act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PINInput } from './index';
import type { PINInputHandle } from './PINInput';

describe('PINInput', () => {
  it('renders without crashing', () => {
    render(<PINInput />);
    expect(document.body).toBeTruthy();
  });

  it('renders correct number of fields', () => {
    render(<PINInput length={4} />);
    const inputs = document.querySelectorAll('input');
    expect(inputs).toHaveLength(4);
  });

  it('auto-advances focus on input', () => {
    render(<PINInput length={4} />);
    const inputs = document.querySelectorAll('input');
    const first = inputs[0] as HTMLInputElement;
    const second = inputs[1] as HTMLInputElement;
    first.focus();
    fireEvent.change(first, { target: { value: '1' } });
    expect(document.activeElement).toBe(second);
  });

  it('exposes focus() via imperative handle', () => {
    const ref = createRef<PINInputHandle>();
    render(<PINInput ref={ref} length={4} />);
    ref.current?.focus();
    const inputs = document.querySelectorAll('input');
    expect(document.activeElement).toBe(inputs[0]);
  });

  it('exposes clear() via imperative handle', () => {
    const ref = createRef<PINInputHandle>();
    render(<PINInput ref={ref} length={4} defaultValue="1234" />);
    act(() => {
      ref.current?.clear();
    });
    const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      expect(input.value).toBe('');
    });
  });

  it('fires onComplete when all fields filled', () => {
    const handleComplete = vi.fn();
    render(<PINInput length={3} onComplete={handleComplete} />);
    const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    expect(handleComplete).toHaveBeenCalledWith('123');
  });

  it('controlled mode: value prop populates fields, onChange fires on input', () => {
    const handleChange = vi.fn();
    render(<PINInput value="1234" onChange={handleChange} length={4} />);
    const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    // Controlled value populates fields
    expect(inputs[0].value).toBe('1');
    expect(inputs[1].value).toBe('2');
    expect(inputs[2].value).toBe('3');
    expect(inputs[3].value).toBe('4');
    // Changing a field fires onChange
    fireEvent.change(inputs[0], { target: { value: '5' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
