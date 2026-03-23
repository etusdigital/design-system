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

  it('renders card content in portal when expanded', () => {
    render(
      <ExpandableContainer value={true} content={<p>card body</p>} />
    );
    // Content renders via FloatCard portal into document.body
    expect(document.querySelector('p')).toBeTruthy();
    expect(screen.getByText('card body')).toBeTruthy();
  });

  it('does not render content when value is false', () => {
    render(
      <ExpandableContainer value={false} content={<p>hidden content</p>} />
    );
    expect(screen.queryByText('hidden content')).toBeNull();
  });

  it('renders content in portal when expanded regardless of alignRight prop', () => {
    // alignRight is declared in the interface but not implemented in the React version
    // (FloatCard handles positioning automatically); verify content still renders
    render(
      <ExpandableContainer value={true} alignRight={true} content={<p>aligned</p>} />
    );
    expect(screen.getByText('aligned')).toBeTruthy();
  });
});
