import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FileUpload } from './index';

describe('FileUpload', () => {
  it('renders without crashing', () => {
    render(<FileUpload />);
    expect(document.body).toBeTruthy();
  });

  it('renders drop zone with placeholder text', () => {
    render(<FileUpload placeholder="or drag and drop it here" />);
    expect(screen.getByText('or drag and drop it here')).toBeTruthy();
  });

  it('shows file name after file selection', () => {
    render(<FileUpload labelValue="Upload" />);
    const input = document.querySelector('input[type="file"]')!;
    const file = new File(['content'], 'test-file.pdf', { type: 'application/pdf' });
    Object.defineProperty(input, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(input);
    expect(screen.getByText('test-file.pdf')).toBeTruthy();
  });

  it('delete button clears file', () => {
    render(<FileUpload labelValue="Upload" />);
    const input = document.querySelector('input[type="file"]')!;
    const file = new File(['content'], 'my-document.pdf', { type: 'application/pdf' });
    Object.defineProperty(input, 'files', {
      value: [file],
      configurable: true,
    });
    fireEvent.change(input);

    // File name visible
    expect(screen.getByText('my-document.pdf')).toBeTruthy();

    // Click delete button
    const deleteBtn = screen.getByLabelText('Remove file');
    fireEvent.click(deleteBtn);

    // File cleared — placeholder visible again
    expect(screen.queryByText('my-document.pdf')).toBeNull();
    expect(screen.getByText('or drag and drop it here')).toBeTruthy();
  });

  it('supports multiple file selection', () => {
    const onChange = vi.fn();
    render(<FileUpload multiple onChange={onChange} />);
    const input = document.querySelector('input[type="file"]')!;
    const files = [
      new File(['a'], 'file1.pdf', { type: 'application/pdf' }),
      new File(['b'], 'file2.pdf', { type: 'application/pdf' }),
    ];
    Object.defineProperty(input, 'files', {
      value: files,
      configurable: true,
    });
    fireEvent.change(input);

    expect(onChange).toHaveBeenCalledWith(files);
    expect(screen.getByText('2 files selected')).toBeTruthy();
  });
});
