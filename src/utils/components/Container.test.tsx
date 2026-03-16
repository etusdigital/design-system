import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renders with role="listbox" by default', () => {
    const { container } = render(<Container />);
    const el = container.querySelector('[role="listbox"]');
    expect(el).not.toBeNull();
  });

  it('click toggles expanded — expanded class appears on label-content', () => {
    const { container } = render(<Container />);
    const labelContent = container.querySelector('.label-content');
    expect(labelContent).not.toBeNull();
    expect(labelContent!.classList.contains('expanded')).toBe(false);
    fireEvent.click(labelContent!);
    expect(labelContent!.classList.contains('expanded')).toBe(true);
  });

  it('click toggles expanded back — expanded class removed on second click', () => {
    const { container } = render(<Container />);
    const labelContent = container.querySelector('.label-content')!;
    fireEvent.click(labelContent);
    expect(labelContent.classList.contains('expanded')).toBe(true);
    fireEvent.click(labelContent);
    expect(labelContent.classList.contains('expanded')).toBe(false);
  });

  it('renders Label when labelValue is provided', () => {
    render(<Container labelValue="My Label" />);
    expect(screen.getByText('My Label')).toBeTruthy();
  });

  it('shows error message when isError=true and errorMessage is set', () => {
    render(<Container isError errorMessage="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeTruthy();
  });

  it('disabled state prevents toggle — click does not add expanded class', () => {
    const { container } = render(<Container disabled />);
    const labelContent = container.querySelector('.label-content')!;
    fireEvent.click(labelContent);
    expect(labelContent.classList.contains('expanded')).toBe(false);
  });

  it('arrow icon has keyboard_arrow_down text content', () => {
    const { container } = render(<Container />);
    const arrowIcon = container.querySelector('.arrow-icon');
    expect(arrowIcon).not.toBeNull();
    expect(arrowIcon!.textContent).toBe('keyboard_arrow_down');
  });

  it('hideArrow hides the arrow icon', () => {
    const { container } = render(<Container hideArrow />);
    expect(container.querySelector('.arrow-icon')).toBeNull();
  });

  it('calls onChange with source="click" when toggled via click', () => {
    const onChange = vi.fn();
    const { container } = render(<Container onChange={onChange} />);
    const labelContent = container.querySelector('.label-content')!;
    fireEvent.click(labelContent);
    expect(onChange).toHaveBeenCalledWith(true, { source: 'click' });
  });

  it('renderContent receives contentMinWidth and renders content', () => {
    render(<Container renderContent={(minWidth) => <div data-testid="content">{minWidth}</div>} />);
    expect(screen.getByTestId('content')).toBeTruthy();
  });

  it('Space key toggles expanded state', () => {
    const { container } = render(<Container />);
    const labelContent = container.querySelector('.label-content')!;
    fireEvent.keyUp(labelContent, { key: ' ' });
    expect(labelContent.classList.contains('expanded')).toBe(true);
  });

  it('custom label slot overrides default label-content', () => {
    const { container } = render(<Container label={<div data-testid="custom-label">Custom</div>} />);
    expect(screen.getByTestId('custom-label')).toBeTruthy();
    // label-content div should not be rendered when custom label is provided
    expect(container.querySelector('.label-content')).toBeNull();
  });
});
