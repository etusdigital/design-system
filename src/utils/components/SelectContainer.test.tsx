import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SelectContainer } from './SelectContainer';

describe('SelectContainer', () => {
  it('renders without crashing', () => {
    render(<SelectContainer />);
    expect(document.body).toBeTruthy();
  });

  it('renders with select-container class on ExpandableContainer', () => {
    const { container } = render(<SelectContainer />);
    const el = container.querySelector('.select-container');
    expect(el).toBeTruthy();
  });

  it('content-wrapper is not rendered when not expanded', () => {
    const { container } = render(
      <SelectContainer value={false} options={<li>Option 1</li>} />
    );
    const wrapper = container.querySelector('.content-wrapper');
    expect(wrapper).toBeNull();
  });

  it('content-wrapper is visible when expanded', () => {
    render(
      <SelectContainer value={true} options={<li>Option 1</li>} />
    );
    const wrapper = document.querySelector('.content-wrapper') as HTMLElement | null;
    expect(wrapper).toBeTruthy();
    expect(wrapper?.style.display).not.toBe('none');
  });

  it('renders options in a ul with role list', () => {
    render(
      <SelectContainer value={true} options={<li>Item A</li>} />
    );
    const list = screen.getByRole('list');
    expect(list).toBeTruthy();
  });

  it('applies has-max-height class when dontHaveMaxHeight is false', () => {
    render(
      <SelectContainer value={true} dontHaveMaxHeight={false} />
    );
    const content = document.querySelector('.has-max-height');
    expect(content).toBeTruthy();
  });

  it('renders actions footer when actions prop is provided', () => {
    render(
      <SelectContainer value={true} actions={<button>Apply</button>} />
    );
    expect(screen.getByRole('button', { name: 'Apply' })).toBeTruthy();
  });
});
