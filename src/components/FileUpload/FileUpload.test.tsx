import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FileUpload } from './index';

describe('FileUpload', () => {
  it('renders without crashing', () => {
    render(<FileUpload />);
    expect(document.body).toBeTruthy();
  });
});
