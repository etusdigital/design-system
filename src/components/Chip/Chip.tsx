import clsx from 'clsx';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import styles from './Chip.module.css';

export interface ChipProps {
  labelValue?: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  closeable?: boolean;
  icon?: string;
  isAppendedIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export function Chip({
  labelValue = '',
  color = 'primary',
  size = 'small',
  loading = false,
  closeable = false,
  icon = '',
  isAppendedIcon = false,
  children,
  className,
  onClose,
}: ChipProps) {
  return (
    <StatusBadge
      className={clsx(styles.chip, 'chip', className)}
      labelValue={labelValue}
      color={color}
      size={size}
      loading={loading}
      closeable={closeable}
      icon={icon}
      isAppendedIcon={isAppendedIcon}
      onClose={onClose}
    >
      {children || labelValue}
    </StatusBadge>
  );
}
