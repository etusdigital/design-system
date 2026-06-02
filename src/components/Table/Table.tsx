import React, { useState } from "react";
import clsx from "clsx";
import { useControllable } from "../../hooks/useControllable";
import { Pagination } from "../Pagination/Pagination";
import { Skeleton } from "../Skeleton/Skeleton";
import { Checkbox } from "../Checkbox/Checkbox";
import { Icon } from "../Icon/Icon";
import { Select } from "../Select/Select";
import styles from "./Table.module.css";

export interface Column {
  label?: string;
  value: string;
  sortable?: boolean;
  width?: string;
  align?: "flex-start" | "center" | "flex-end";
  render?: (value: any, item: any, index: number) => React.ReactNode;
}

export interface TableProps {
  columns: Column[];
  items: any[];
  sortOptions?: { by?: string; desc?: boolean };
  page?: number;
  itemsPerPage?: number;
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
  renderAggregation?: (item: any, index: number) => React.ReactNode;
  renderSelect?: (item: any, index: number) => React.ReactNode;
  renderActions?: (item: any, index: number) => React.ReactNode;
  renderChilds?: (item: any, index: number) => React.ReactNode;
  renderEmptyState?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  renderItemsPerPage?: () => React.ReactNode;
  renderShowingPage?: (
    min: number,
    max: number,
    total: number,
  ) => React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

function sortItems(items: any[], sortKey: string, desc: boolean): any[] {
  return [...items].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === "string" && typeof bVal === "string") {
      const lowerA = aVal.toLowerCase();
      const lowerB = bVal.toLowerCase();
      return desc ? lowerA.localeCompare(lowerB) : lowerB.localeCompare(lowerA);
    } else if (typeof aVal === "number" && typeof bVal === "number") {
      return desc ? aVal - bVal : bVal - aVal;
    } else if (aVal instanceof Date && bVal instanceof Date) {
      return desc
        ? aVal.getTime() - bVal.getTime()
        : bVal.getTime() - aVal.getTime();
    } else {
      const strA = String(aVal).toLowerCase();
      const strB = String(bVal).toLowerCase();
      return desc ? strA.localeCompare(strB) : strB.localeCompare(strA);
    }
  });
}

function findSlot(
  children: React.ReactNode,
  SlotType: React.ElementType,
): React.ReactNode | null {
  const arr = React.Children.toArray(children);
  const match = arr.find(
    (child) => React.isValidElement(child) && child.type === SlotType,
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
  itemsPerPage: itemsPerPageProp,
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
  renderAggregation,
  renderSelect,
  renderActions,
  renderChilds,
  renderEmptyState,
  renderFooter,
  renderItemsPerPage,
  renderShowingPage,
  children,
  className,
}: TableProps) {
  const [page, setPage] = useControllable<number>({
    value: pageProp,
    defaultValue: 1,
    onChange: onPageChange,
  });

  const [itemsPerPage, setItemsPerPage] = useControllable<number>({
    value: itemsPerPageProp,
    defaultValue: 10,
    onChange: onItemsPerPageChange,
  });

  const [sortByName, setSortByName] = useState<string | null>(
    sortOptions?.by || null,
  );
  const [isDesc, setIsDesc] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    columns.forEach((col) => {
      map[col.value] =
        col.value === sortOptions?.by ? !!sortOptions?.desc : false;
    });
    return map;
  });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [allSelected, setAllSelected] = useState(false);

  const currentPage = page ?? 1;
  const currentItemsPerPage = itemsPerPage ?? 10;

  const sortedItems = sortByName
    ? sortItems(items, sortByName, isDesc[sortByName] ?? false)
    : items;

  const totalItems = renderPaginationInBackEnd
    ? (numberOfItems ?? 0)
    : (sortedItems?.length ?? 0);
  const pageCount = Math.ceil(totalItems / currentItemsPerPage);

  const pagedItems = renderPaginationInBackEnd
    ? sortedItems
    : sortedItems.slice(
        (currentPage - 1) * currentItemsPerPage,
        currentPage * currentItemsPerPage,
      );

  const min =
    currentPage === 1 ? 1 : (currentPage - 1) * currentItemsPerPage + 1;
  const max = (currentPage - 1) * currentItemsPerPage + pagedItems.length;

  let colspan = columns.length;
  if (enableSelection) colspan++;
  if (enableAggregation) colspan++;

  const actionsSlot = findSlot(children, TableActions);
  const footerSlot = findSlot(children, TableFooter);
  const emptySlot = findSlot(children, TableEmptyState);

  const hasActions = !!renderActions || !!actionsSlot;
  if (hasActions) colspan++;

  const listPerPage = [5, 10, 20, 50, 100];

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

  const handleSelectAll = (value: boolean | null) => {
    const selectAll = !!value;
    setAllSelected(selectAll);
    if (selectAll) {
      setSelectedRows(new Set(pagedItems.map((_, i) => i)));
    } else {
      setSelectedRows(new Set());
    }
    items?.forEach((item: any) => {
      item.selected = selectAll;
    });
    onSelectAll?.(selectAll);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
    onPageItems?.(newPage, currentItemsPerPage);
  };

  const handleChangeItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage || 10);
    setPage(1);
    onPageItems?.(1, newItemsPerPage);
  };

  return (
    <div className={clsx(styles.table, "table", className)}>
      <div
        className={clsx(
          styles.tableContent,
          noShadow && styles.noShadow,
          isHeaderFixed && styles.headerFixed,
        )}
      >
        <table className={styles.tableStyle}>
          {!loading ? (
            <thead>
              <tr>
                {enableAggregation && (
                  <th
                    className={clsx(styles.firstTh, styles.pointerNone)}
                    style={{ width: "2%" }}
                  />
                )}
                {enableSelection && (
                  <th
                    className={clsx(
                      !enableAggregation && styles.firstTh,
                      styles.hoverBg,
                    )}
                    style={{ width: "2%" }}
                  >
                    <Checkbox value={allSelected} onChange={handleSelectAll} />
                  </th>
                )}
                {columns.map((col, index) => (
                  <th
                    key={col.value}
                    style={{ width: col.width ?? "fit-content" }}
                    className={clsx(
                      styles.sortable,
                      index === 0 &&
                        !enableSelection &&
                        !enableAggregation &&
                        styles.firstTh,
                      !columns[index + 1] && !hasActions && styles.lastTh,
                      !col.sortable && styles.pointerNone,
                    )}
                    onClick={() => handleSort(col)}
                  >
                    <div
                      className={styles.thContent}
                      style={{
                        justifyContent: col.align ?? "flex-start",
                      }}
                    >
                      <p className={styles.thLabel}>{col.label}</p>
                      {col.sortable && (
                        <span
                          className={clsx(
                            styles.sortIconContainer,
                            isDesc[col.value] && styles.sortIconRotated,
                            col.value === sortByName && styles.sortIconActive,
                          )}
                        >
                          <Icon
                            name="arrow_upward"
                            className={clsx(styles.sortIcon)}
                          />
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {hasActions && (
                  <th
                    style={{ flex: 1 }}
                    className={clsx(styles.pointerNone)}
                  />
                )}
              </tr>
            </thead>
          ) : (
            <thead>
              <tr>
                {Array.from({ length: colspan || 3 }).map((_, i) => (
                  <th key={i} className={styles.skeletonCell}>
                    <Skeleton />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          {loading || !pagedItems.length ? (
            <tbody>
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    {Array.from({ length: colspan || 3 }).map((_, j) => (
                      <td key={j} className={styles.skeletonCell}>
                        <Skeleton />
                      </td>
                    ))}
                    {hasActions && (
                      <td className={styles.skeletonCell}>
                        <Skeleton />
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={colspan}>
                    {renderEmptyState?.() || emptySlot || null}
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              {pagedItems.map((item, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr className={clsx(styles.row, hasHover && styles.rowHover)}>
                    {enableAggregation && (
                      <td className={styles.cell}>
                        {renderAggregation?.(item, rowIndex)}
                      </td>
                    )}
                    {enableSelection && (
                      <td className={styles.cell}>
                        {renderSelect ? (
                          renderSelect(item, rowIndex)
                        ) : (
                          <Checkbox
                            value={selectedRows.has(rowIndex)}
                            onChange={() => handleSelectRow(rowIndex, item)}
                          />
                        )}
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.value}
                        className={styles.cell}
                        style={{
                          textAlign:
                            col.align === "center"
                              ? "center"
                              : col.align === "flex-end"
                                ? "right"
                                : "left",
                        }}
                      >
                        {col.render
                          ? col.render(item[col.value], item, rowIndex)
                          : item[col.value]}
                      </td>
                    ))}
                    {renderActions && (
                      <td className={styles.cell}>
                        {renderActions(item, rowIndex)}
                      </td>
                    )}
                    {!renderActions && actionsSlot && (
                      <td className={styles.cell}>{actionsSlot}</td>
                    )}
                  </tr>
                  {item.expanded &&
                    renderChilds &&
                    renderChilds(item, rowIndex)}
                </React.Fragment>
              ))}
            </tbody>
          )}
          {(renderFooter || footerSlot) && (
            <tfoot>{renderFooter?.() || footerSlot}</tfoot>
          )}
        </table>
      </div>
      {!hideFooter && (
        <footer className={styles.footer}>
          <div className={styles.footerLeft}>
            <p className={styles.footerLabel}>
              {renderItemsPerPage?.() || "Items per page"}
            </p>
            <Select
              value={currentItemsPerPage}
              options={listPerPage}
              onChange={(v: any) => handleChangeItemsPerPage(v)}
            />
          </div>
          <Pagination
            value={currentPage}
            onChange={handleChangePage}
            length={pageCount}
          />
          <div>
            <p className={styles.footerLabel}>
              {renderShowingPage
                ? renderShowingPage(min, max, totalItems)
                : `Showing ${min}-${max} of ${totalItems}`}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

Table.Actions = TableActions;
Table.Footer = TableFooter;
Table.EmptyState = TableEmptyState;
