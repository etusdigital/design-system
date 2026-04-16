import { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './index';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />);
    expect(document.body).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(<Input labelValue="Email" />);
    expect(getByText('Email')).toBeTruthy();
  });

  it('forwards ref to native input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('fires onChange on input', () => {
    const handleChange = vi.fn();
    const { container } = render(<Input value="" onChange={handleChange} />);
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(handleChange).toHaveBeenCalledWith('hello');
  });

  it('applies mask on change for cpf', () => {
    const handleChange = vi.fn();
    const { container } = render(<Input type="text" mask="cpf" onChange={handleChange} />);
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '12345678900' } });
    expect(handleChange).toHaveBeenCalledWith('123.456.789-00');
  });

  it('type=color renders without crashing', () => {
    render(<Input type="color" labelValue="Color" />);
    expect(document.body).toBeTruthy();
  });

  it('type=password renders visibility toggle', () => {
    const { container } = render(<Input type="password" placeholder="Password" />);
    const icon = container.querySelector('.icon');
    expect(icon).toBeTruthy();
  });

  it('type=search renders search icon', () => {
    const { container } = render(<Input type="search" placeholder="Search" />);
    const icons = container.querySelectorAll('.icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('type=number renders increment and decrement buttons', () => {
    const { container } = render(<Input type="number" defaultValue="5" />);
    const icons = container.querySelectorAll('.icon');
    expect(icons.length).toBeGreaterThanOrEqual(2);
  });

  it('shows error message when isError is true', () => {
    const { getByText } = render(<Input isError errorMessage="Something went wrong" />);
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('renders with defaultValue in uncontrolled mode', () => {
    const { container } = render(<Input defaultValue="initial" />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('initial');
  });
});
