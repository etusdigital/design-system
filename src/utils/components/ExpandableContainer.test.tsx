import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ExpandableContainer } from './ExpandableContainer';

describe('ExpandableContainer', () => {
  it('renders without crashing', () => {
    render(<ExpandableContainer />);
    expect(document.body).toBeTruthy();
  });

  it('renders content when value is true', () => {
    render(
      <ExpandableContainer value={true} content={<p>test content</p>} />
    );
    expect(screen.getByText('test content')).toBeTruthy();
  });

  it('renders card styling div with shadow when expanded', () => {
    const { container } = render(
      <ExpandableContainer value={true} content={<p>card body</p>} />
    );
    const cardDiv = container.querySelector('.shadow-neutral-selected');
    expect(cardDiv).toBeTruthy();
  });

  it('does not render content when value is false', () => {
    render(
      <ExpandableContainer value={false} content={<p>hidden content</p>} />
    );
    expect(screen.queryByText('hidden content')).toBeNull();
  });

  it('applies right-0 class when alignRight is true and expanded', () => {
    const { container } = render(
      <ExpandableContainer value={true} alignRight={true} content={<p>aligned</p>} />
    );
    const posDiv = container.querySelector('.right-0');
    expect(posDiv).toBeTruthy();
  });
});
