import React, { useState } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { Pagination } from '../Pagination/Pagination';
import { Skeleton } from '../Skeleton/Skeleton';
import { Checkbox } from '../Checkbox/Checkbox';
import { Icon } from '../Icon/Icon';
import styles from './Table.module.css';

export interface Column {
  label?: string;
  value: string;
  sortable?: boolean;
  width?: string;
  align?: 'flex-start' | 'center' | 'flex-end';
  render?: (value: any, item: any, index: number) => React.ReactNode;
}

export interface TableProps {
  columns: Column[];
  items: any[];
  sortOptions?: { by?: string; desc?: boolean };
  page?: number;
  defaultPage?: number;
  itemsPerPage?: number;
  defaultItemsPerPage?: number;
  numberOfItems?: number;
  renderPaginationInBackEnd?: boolean;
  hideFooter?: boolean;
  isHeaderFixed?: boolean;
  enableSelection?: boolean;
  enableAggregation?: boolean;
  loading?: boolean;
  noShadow?: boolean;
  hasHover?: boolean;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (n: number) => void;
  onSortBy?: (key: string, desc: boolean) => void;
  onPageItems?: (page: number, itemsPerPage: number) => void;
  onSelectAll?: (value: boolean) => void;
  onSelectRow?: (item: any, selected: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

function sortItems(items: any[], sortKey: string, desc: boolean): any[] {
  return [...items].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal < bVal) return desc ? 1 : -1;
    if (aVal > bVal) return desc ? -1 : 1;
    return 0;
  });
}

function findSlot(
  children: React.ReactNode,
  SlotType: React.ElementType
): React.ReactNode | null {
  const arr = React.Children.toArray(children);
  const match = arr.find(
    (child) => React.isValidElement(child) && child.type === SlotType
  );
  return match || null;
}

function TableActions({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function TableFooter({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function TableEmptyState({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Table({
  columns,
  items,
  sortOptions,
  page: pageProp,
  defaultPage,
  itemsPerPage: itemsPerPageProp,
  defaultItemsPerPage,
  numberOfItems,
  renderPaginationInBackEnd = false,
  hideFooter = false,
  isHeaderFixed = false,
  enableSelection = false,
  enableAggregation = false,
  loading = false,
  noShadow = false,
  hasHover = false,
  onPageChange,
  onItemsPerPageChange,
  onSortBy,
  onPageItems,
  onSelectAll,
  onSelectRow,
  children,
  className,
}: TableProps) {
  const [page, setPage] = useControllable<number>({
    value: pageProp,
    defaultValue: defaultPage ?? 1,
    onChange: onPageChange,
  });

  const [itemsPerPage, setItemsPerPage] = useControllable<number>({
    value: itemsPerPageProp,
    defaultValue: defaultItemsPerPage ?? 10,
    onChange: onItemsPerPageChange,
  });

  const [sortByName, setSortByName] = useState<string | null>(
    sortOptions?.by ?? null
  );
  const [isDesc, setIsDesc] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    columns.forEach((col) => {
      map[col.value] =
        col.value === sortOptions?.by ? !!(sortOptions?.desc) : false;
    });
    return map;
  });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const currentPage = page ?? 1;
  const currentItemsPerPage = itemsPerPage ?? 10;

  const sortedItems =
    sortByName
      ? sortItems(items, sortByName, isDesc[sortByName] ?? false)
      : items;

  const totalItems = numberOfItems ?? sortedItems.length;
  const pageCount = Math.ceil(totalItems / currentItemsPerPage);

  const pagedItems = renderPaginationInBackEnd
    ? sortedItems
    : sortedItems.slice(
        (currentPage - 1) * currentItemsPerPage,
        currentPage * currentItemsPerPage
      );

  const allSelected = pagedItems.length > 0 && selectedRows.size === pagedItems.length;
  const someSelected = selectedRows.size > 0 && selectedRows.size < pagedItems.length;

  const min =
    currentPage === 1
      ? 1
      : (currentPage - 1) * currentItemsPerPage + 1;
  const max = (currentPage - 1) * currentItemsPerPage + pagedItems.length;

  let colspan = columns.length;
  if (enableSelection) colspan++;
  if (enableAggregation) colspan++;

  const actionsSlot = findSlot(children, TableActions);
  const footerSlot = findSlot(children, TableFooter);
  const emptySlot = findSlot(children, TableEmptyState);

  if (actionsSlot) colspan++;

  const handleSort = (column: Column) => {
    if (!column.sortable) return;
    const key = column.value;
    const newDesc = sortByName === key ? !isDesc[key] : false;
    setSortByName(key);
    setIsDesc((prev) => ({ ...prev, [key]: newDesc }));
    onSortBy?.(key, newDesc);
  };

  const handleSelectRow = (index: number, item: any) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      const wasSelected = next.has(index);
      wasSelected ? next.delete(index) : next.add(index);
      onSelectRow?.(item, !wasSelected);
      return next;
    });
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedRows(new Set(pagedItems.map((_, i) => i)));
    } else {
      setSelectedRows(new Set());
    }
    onSelectAll?.(selectAll);
  };

  return (
    <div className={clsx(styles.table, className)}>
      <div
        className={clsx(
          styles.tableContent,
          noShadow && styles.noShadow,
          isHeaderFixed && styles.headerFixed
        )}
      >
        <table className={styles.tableStyle}>
          <thead>
            <tr>
              {enableAggregation && (
                <th className={styles.aggregationTh} style={{ minWidth: '40px' }}>#</th>
              )}
              {enableSelection && (
                <th className={styles.selectionTh}>
                  <Checkbox
                    value={allSelected ? true : someSelected ? null : false}
                    allowIndeterminate
                    onChange={(v) => handleSelectAll(!!v)}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.value}
                  style={{ width: col.width }}
                  className={clsx(col.sortable && styles.sortable)}
                  onClick={() => handleSort(col)}
                >
                  <div
                    className={styles.thContent}
                    style={{
                      justifyContent: col.align ?? 'flex-start',
                    }}
                  >
                    <p className={styles.thLabel}>{col.label}</p>
                    {col.sortable && (
                      <Icon
                        name={
                          sortByName === col.value && isDesc[col.value]
                            ? 'arrow_downward'
                            : 'arrow_upward'
                        }
                        className={clsx(
                          styles.sortIcon,
                          sortByName === col.value && styles.sortIconActive
                        )}
                      />
                    )}
                  </div>
                </th>
              ))}
              {actionsSlot && <th className={styles.actionsTh} />}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: currentItemsPerPage }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  {enableAggregation && (
                    <td className={styles.skeletonCell}>
                      <Skeleton />
                    </td>
                  )}
                  {enableSelection && (
                    <td className={styles.skeletonCell}>
                      <Skeleton />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.value} className={styles.skeletonCell}>
                      <Skeleton />
                    </td>
                  ))}
                  {actionsSlot && (
                    <td className={styles.skeletonCell}>
                      <Skeleton />
                    </td>
                  )}
                </tr>
              ))
            ) : pagedItems.length === 0 ? (
              <tr>
                <td colSpan={colspan}>
                  {emptySlot || (
                    <div className={styles.emptyState}>No rows to display</div>
                  )}
                </td>
              </tr>
            ) : (
              pagedItems.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={clsx(
                    styles.row,
                    hasHover && styles.rowHover,
                    selectedRows.has(rowIndex) && styles.rowSelected
                  )}
                >
                  {enableAggregation && (
                    <td className={styles.cell}>
                      {(currentPage - 1) * currentItemsPerPage + rowIndex + 1}
                    </td>
                  )}
                  {enableSelection && (
                    <td className={styles.cell}>
                      <Checkbox
                        value={selectedRows.has(rowIndex)}
                        onChange={() => handleSelectRow(rowIndex, item)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.value}
                      className={styles.cell}
                      style={{
                        textAlign:
                          col.align === 'center'
                            ? 'center'
                            : col.align === 'flex-end'
                            ? 'right'
                            : 'left',
                      }}
                    >
                      {col.render
                        ? col.render(item[col.value], item, rowIndex)
                        : item[col.value]}
                    </td>
                  ))}
                  {actionsSlot && (
                    <td className={styles.cell}>{actionsSlot}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!hideFooter && (
        <div className={styles.footer}>
          {footerSlot || (
            <>
              <span className={styles.pageInfo}>
                {min}-{max} of {totalItems} items
              </span>
              <Pagination
                value={page}
                onChange={setPage}
                length={pageCount}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

Table.Actions = TableActions;
Table.Footer = TableFooter;
Table.EmptyState = TableEmptyState;
