import clsx from 'clsx';
import styles from './Separator.module.css';

export interface SeparatorProps {
  position?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  className?: string;
}

export function Separator({ position = 'right', children, className }: SeparatorProps = {}) {
  return (
    <div className={clsx(styles.separator, 'separator', className)}>
      {position !== 'right' && <div className={styles.separatorLine} />}
      {children}
      {position !== 'left' && <div className={styles.separatorLine} />}
    </div>
  );
}
