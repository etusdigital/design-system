import { useEffect } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import styles from './Pagination.module.css';
import { Icon } from '../Icon/Icon';

export interface PaginationProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  length: number;
  visiblePages?: number;
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

  // Replace -1 sentinels with the actual page if gap is just 1
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
  defaultValue,
  onChange,
  length,
  className,
}: PaginationProps) {
  const [model, setModel] = useControllable<number>({
    value,
    defaultValue: defaultValue ?? 1,
    onChange,
  });

  // Clamp model when length shrinks
  useEffect(() => {
    if (model !== undefined && length >= 1 && model > length) {
      setModel(length);
    }
  }, [length]);

  if (length < 1) return null;

  const pages = buildPages(model ?? 1, length);
  const currentPage = model ?? 1;

  return (
    <div className={clsx(styles.pagination, 'pagination', className)}>
      <button
        className={styles.navButton}
        disabled={currentPage === 1}
        onClick={() => setModel(currentPage - 1)}
        aria-label="Previous page"
      >
        <Icon name="chevron_left" className={clsx(styles.navIcon)} />
      </button>
      <div className="flex">
        {pages.map((page, idx) => (
          <div key={`${page}-${idx}`} className="flex gap-xs">
            {page === -1 ? (
              <button className={clsx(styles.pageButton, styles.ellipsis)} disabled>
                ...
              </button>
            ) : (
              <button
                className={clsx(styles.pageButton, page === currentPage && styles.active)}
                onClick={() => setModel(page)}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        className={styles.navButton}
        disabled={currentPage === length}
        onClick={() => setModel(currentPage + 1)}
        aria-label="Next page"
      >
        <Icon name="chevron_right" className={clsx(styles.navIcon)} />
      </button>
    </div>
  );
}
