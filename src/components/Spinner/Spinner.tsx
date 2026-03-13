import clsx from 'clsx';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps = {}) {
  return (
    <svg className={clsx(styles.spinner, className)} viewBox="0 0 50 50">
      <circle
        className={styles.path}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="8"
        shapeRendering="geometricPrecision"
      />
    </svg>
  );
}
