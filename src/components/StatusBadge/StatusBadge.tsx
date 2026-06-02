import clsx from 'clsx';
import { Badge } from '../Badge/Badge';
import styles from './StatusBadge.module.css';

export interface StatusBadgeProps {
  labelValue?: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'secondary' | 'heavy';
  loading?: boolean;
  closeable?: boolean;
  icon?: string;
  isAppendedIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export function StatusBadge({
  labelValue = '',
  color = 'primary',
  size = 'medium',
  type = 'default',
  loading = false,
  closeable = false,
  icon = '',
  isAppendedIcon = false,
  children,
  className,
  onClose,
}: StatusBadgeProps) {
  return (
    <Badge
      className={clsx(styles.statusBadge, 'status-badge', styles[color], styles[type], className)}
      labelValue={labelValue}
      type={type}
      size={size}
      loading={loading}
      closeable={closeable}
      icon={icon}
      isAppendedIcon={isAppendedIcon}
      onClose={onClose}
    >
      {children || labelValue}
    </Badge>
  );
}
