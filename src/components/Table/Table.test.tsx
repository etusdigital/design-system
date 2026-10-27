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
    render(
      <Table
        columns={columns}
        items={[]}
        renderEmptyState={() => <span>No rows to display</span>}
      />
    );
    expect(screen.getByText('No rows to display')).toBeInTheDocument();
  });

  it('disables the footer pagination and items-per-page select while loading', () => {
    const { container } = render(<Table columns={columns} items={items} loading />);
    const pagination = container.querySelector('.pagination');
    expect(pagination).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('combobox', { name: 'Items per page' })).toHaveAttribute('aria-disabled', 'true');
  });

  describe('backend pagination events', () => {
    function renderBackend(page: number) {
      const handlers = {
        onPageChange: vi.fn(),
        onItemsPerPageChange: vi.fn(),
        onPageItems: vi.fn(),
      };
      const utils = render(
        <Table
          columns={columns}
          items={items}
          page={page}
          itemsPerPage={10}
          numberOfItems={95}
          renderPaginationInBackEnd
          {...handlers}
        />
      );
      return { ...utils, ...handlers };
    }

    function pickItemsPerPage(container: HTMLElement, value: number) {
      fireEvent.click(container.querySelector('footer .label-content') as HTMLElement);
      const option = Array.from(document.querySelectorAll('[role="option"]')).find(
        (el) => el.textContent?.trim() === String(value)
      );
      fireEvent.click(option as HTMLElement);
    }

    it('changing items per page on page 1 does not emit onPageChange', () => {
      const { container, onPageChange, onItemsPerPageChange, onPageItems } = renderBackend(1);
      pickItemsPerPage(container, 20);
      expect(onItemsPerPageChange).toHaveBeenCalledTimes(1);
      expect(onItemsPerPageChange).toHaveBeenCalledWith(20);
      expect(onPageChange).not.toHaveBeenCalled();
      expect(onPageItems).toHaveBeenCalledTimes(1);
      expect(onPageItems).toHaveBeenCalledWith(1, 20);
    });

    it('changing items per page on a later page resets to page 1 once', () => {
      const { container, onPageChange, onPageItems } = renderBackend(3);
      pickItemsPerPage(container, 20);
      expect(onPageChange).toHaveBeenCalledTimes(1);
      expect(onPageChange).toHaveBeenCalledWith(1);
      expect(onPageItems).toHaveBeenCalledTimes(1);
    });

    it('picking the current items per page emits nothing', () => {
      const { container, onPageChange, onItemsPerPageChange, onPageItems } = renderBackend(3);
      pickItemsPerPage(container, 10);
      expect(onItemsPerPageChange).not.toHaveBeenCalled();
      expect(onPageChange).not.toHaveBeenCalled();
      expect(onPageItems).not.toHaveBeenCalled();
    });

    it('clicking the current page emits nothing', () => {
      const { onPageChange, onPageItems } = renderBackend(3);
      fireEvent.click(screen.getByRole('button', { name: '3' }));
      expect(onPageChange).not.toHaveBeenCalled();
      expect(onPageItems).not.toHaveBeenCalled();
    });

    it('a new numberOfItems does not emit any page event', () => {
      const { rerender, onPageChange, onPageItems } = renderBackend(1);
      rerender(
        <Table
          columns={columns}
          items={items}
          page={1}
          itemsPerPage={10}
          numberOfItems={40}
          renderPaginationInBackEnd
          onPageChange={onPageChange}
          onPageItems={onPageItems}
        />
      );
      expect(onPageChange).not.toHaveBeenCalled();
      expect(onPageItems).not.toHaveBeenCalled();
    });
  });
});
