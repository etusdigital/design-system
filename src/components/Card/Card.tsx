import clsx from 'clsx';
import styles from './Card.module.css';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps = {}) {
  return (
    <div className={clsx(styles.card, className)}>
      {children}
    </div>
  );
}
