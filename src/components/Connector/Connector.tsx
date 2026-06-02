import clsx from 'clsx';
import styles from './Connector.module.css';

export interface ConnectorProps {
  vertical?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Connector({
  vertical = false,
  children,
  className,
}: ConnectorProps) {
  return (
    <div
      className={clsx(
        styles.connector,
        'connector',
        vertical ? styles.vert : styles.hor,
        className
      )}
    >
      {children}
    </div>
  );
}
