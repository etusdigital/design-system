import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Table } from './index';

const columns = [
  { label: 'Name', value: 'name' },
  { label: 'Age', value: 'age', sortable: true },
];

const items = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

describe('Table', () => {
  it('mounts without crashing', () => {
    render(<Table columns={[]} items={[]} />);
    expect(document.body).toBeTruthy();
  });

  it('renders column headers from columns prop', () => {
    render(<Table columns={columns} items={items} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders row data from items prop', () => {
    render(<Table columns={columns} items={items} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('custom render prop fires for column with render function', () => {
    const renderFn = vi.fn((val: any) => <strong>{val}</strong>);
    const cols = [{ label: 'Name', value: 'name', render: renderFn }];
    render(<Table columns={cols} items={items} />);
    expect(renderFn).toHaveBeenCalledTimes(items.length);
  });

  it('clicking sortable header calls onSortBy', () => {
    const handleSort = vi.fn();
    render(<Table columns={columns} items={items} onSortBy={handleSort} />);
    fireEvent.click(screen.getByText('Age'));
    expect(handleSort).toHaveBeenCalledWith('age', false);
  });

  it('shows empty state when no items', () => {
    render(<Table columns={columns} items={[]} />);
    expect(screen.getByText('No rows to display')).toBeInTheDocument();
  });
});
