import clsx from 'clsx';
import styles from './Card.module.css';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  style?: Object
}

export function Card({ children, className, style }: CardProps = {}) {
  return (
    <div className={clsx(styles.card, className)} style={style}>
      {children}
    </div>
  );
}
