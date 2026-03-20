import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Crop } from './index';

describe('Crop', () => {
  it('mounts without crashing', () => {
    render(<Crop />);
    expect(document.body).toBeTruthy();
  });

  it('renders without crashing with no src', () => {
    const { container } = render(<Crop />);
    expect(container.querySelector('[class*="crop"]')).toBeTruthy();
  });

  it('container has crop CSS class', () => {
    const { container } = render(<Crop />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/crop/);
  });
});
