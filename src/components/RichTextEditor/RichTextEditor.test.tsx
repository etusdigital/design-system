import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { RichTextEditor } from './index';

describe('RichTextEditor', () => {
  it('mounts without crashing', () => {
    render(<RichTextEditor />);
    expect(document.body).toBeTruthy();
  });

  it('renders toolbar buttons', () => {
    const { container } = render(<RichTextEditor />);
    const toolbar = container.querySelector('[class*="toolbar"]');
    expect(toolbar).toBeTruthy();
    const buttons = toolbar!.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders contenteditable area', () => {
    const { container } = render(<RichTextEditor />);
    const editor = container.querySelector('[contenteditable]');
    expect(editor).toBeTruthy();
  });
});
