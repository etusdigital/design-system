import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './index';

describe('Textarea', () => {
  it('renders without crashing', () => {
    render(<Textarea />);
    expect(document.body).toBeTruthy();
  });

  it('renders with label', () => {
    render(<Textarea labelValue="My Label" />);
    expect(screen.getByText('My Label')).toBeInTheDocument();
  });

  it('forwards ref to native textarea', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('fires onChange on input', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = document.querySelector('textarea')!;
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(handleChange).toHaveBeenCalledWith('hello');
  });

  it('enforces max length by truncating input', () => {
    const handleChange = vi.fn();
    render(<Textarea max={5} onChange={handleChange} />);
    const textarea = document.querySelector('textarea')!;
    fireEvent.change(textarea, { target: { value: 'hello world' } });
    expect(handleChange).toHaveBeenCalledWith('hello');
  });

  it('shows character counter when max is set', () => {
    // Textarea uses useControllable with hardcoded defaultValue:''; use value prop to set initial text
    render(<Textarea max={100} value="test" />);
    expect(screen.getByText('4/100')).toBeInTheDocument();
  });

  it('renders error message when isError is true', () => {
    render(<Textarea isError errorMessage="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('manages own state in uncontrolled mode (no value prop)', () => {
    const { container } = render(<Textarea />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
    // Starts empty; internal state updates on input
    expect(textarea.value).toBe('');
    fireEvent.change(textarea, { target: { value: 'typed text' } });
    expect(textarea.value).toBe('typed text');
  });
});
