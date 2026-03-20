import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { RichTextEditor } from './index';

describe('RichTextEditor', () => {
  it('mounts without crashing', () => {
    render(<RichTextEditor />);
    expect(document.body).toBeTruthy();
  });
});
