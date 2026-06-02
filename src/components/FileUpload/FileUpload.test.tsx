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

    expect(screen.getByText('my-document.pdf')).toBeTruthy();

    const deleteBtn = screen.getByLabelText('Remove file');
    fireEvent.click(deleteBtn);

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

  it('controlled mode: value prop sets file, onChange fires on drop', () => {
    const existingFile = new File(['content'], 'existing.pdf', { type: 'application/pdf' });
    const handleChange = vi.fn();
    render(<FileUpload value={existingFile} onChange={handleChange} />);
    expect(screen.getByText('existing.pdf')).toBeTruthy();
    const newFile = new File(['new'], 'new-file.pdf', { type: 'application/pdf' });
    const dropZone = document.querySelector('[class]') as HTMLElement;
    fireEvent.drop(dropZone, {
      dataTransfer: { files: [newFile] },
    });
    expect(handleChange).toHaveBeenCalledWith(newFile);
  });
});
