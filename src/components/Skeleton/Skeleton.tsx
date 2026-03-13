import clsx from 'clsx';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps = {}) {
  return <div className={clsx(styles.skeleton, className)} />;
}
