import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { Icon } from '../Icon/Icon';
import styles from './Pagination.module.css';

export interface PaginationProps {
  value?: number;
  onChange?: (value: number) => void;
  length: number;
  visiblePages?: number;
  disabled?: boolean;
  className?: string;
}

function buildPages(current: number, length: number): number[] {
  const result: number[] = [];
  if (length < 1) return result;

  for (let i = 1; i <= length; i++) {
    if (
      i === 1 ||
      i === length ||
      (current === 1 && i < 4) ||
      (current === length && i >= length - 2) ||
      current - 1 === i ||
      current + 1 === i ||
      current === i
    ) {
      result.push(i);
    } else if (
      (current <= length - 2 && i === length - 1 && length > 3) ||
      (current > 2 && length > 3 && i === 2)
    ) {
      result.push(-1);
    }
  }

  for (let pass = 0; pass < 2; pass++) {
    const index = result.findIndex((v) => v === -1);
    if (index !== -1 && result[index + 1] - result[index - 1] === 2) {
      result[index] = result[index - 1] + 1;
    }
  }

  return result;
}

export function Pagination({
  value,
  onChange,
  length,
  disabled = false,
  className,
}: PaginationProps) {
  const [model, setModel] = useControllable<number>({
    value,
    defaultValue: 1,
    onChange,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const focusActivePage = useRef(false);
  const pageLength = length < 1 ? 1 : length;

  useEffect(() => {
    if (model !== undefined && length >= 1 && model > length) {
      setModel(length);
    }
  }, [length]);

  useEffect(() => {
    if (!focusActivePage.current) return;
    focusActivePage.current = false;
    containerRef.current?.querySelector<HTMLButtonElement>(`.${styles.active}`)?.focus();
  }, [model]);

  const changePage = (page: number) => {
    if (disabled) return;
    setModel(page);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const pageMap: Record<string, number> = {
      ArrowLeft: (model ?? 1) - 1,
      ArrowRight: (model ?? 1) + 1,
      Home: 1,
      End: pageLength,
    };
    const nextPage = pageMap[event.key];

    if (disabled || nextPage === undefined) return;
    event.preventDefault();

    if (nextPage >= 1 && nextPage <= pageLength && nextPage !== model) {
      focusActivePage.current = true;
      changePage(nextPage);
    }
  };

  if (length < 1) return null;

  const pages = buildPages(model ?? 1, length);
  const currentPage = model ?? 1;

  return (
    <div
      ref={containerRef}
      className={clsx(styles.pagination, 'pagination', disabled && styles.disabled, className)}
      aria-disabled={disabled}
      onKeyDown={handleKeyDown}
    >
      <button
        className={styles.navButton}
        disabled={disabled || currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        aria-label="Previous page"
      >
        <Icon name="chevron_left" className={styles.navIcon} />
      </button>
      <div className="flex">
        {pages.map((page, idx) => (
          <div key={page === -1 ? `ellipsis-${idx}` : page} className="flex gap-xs">
            {page === -1 ? (
              <button className={clsx(styles.pageButton, styles.ellipsis)} disabled>
                ...
              </button>
            ) : (
              <button
                className={clsx(styles.pageButton, 'page-number', page === currentPage && styles.active)}
                disabled={disabled}
                onClick={() => changePage(page)}
                tabIndex={disabled ? -1 : 0}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        className={styles.navButton}
        disabled={disabled || currentPage === length}
        onClick={() => changePage(currentPage + 1)}
        aria-label="Next page"
      >
        <Icon name="chevron_right" className={styles.navIcon} />
      </button>
    </div>
  );
}
