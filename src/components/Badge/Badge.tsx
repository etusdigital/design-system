import clsx from 'clsx';
import { Spinner } from '../Spinner/Spinner';
import { Icon } from '../Icon/Icon';
import { blendColors } from '../../utils';
import styles from './Badge.module.css';

export interface BadgeProps {
  labelValue?: string;
  color?: string;
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

export function Badge({
  labelValue = '',
  color = '',
  size = 'medium',
  type = 'default',
  loading = false,
  closeable = false,
  icon = '',
  isAppendedIcon = false,
  children,
  className,
  onClose,
}: BadgeProps) {
  const prependIcon = !isAppendedIcon ? icon : '';
  const appendedIcon = closeable ? 'close' : isAppendedIcon ? icon : '';

  const background = color && typeof document !== 'undefined' ? blendColors(color) : '';

  const customStyle: React.CSSProperties = color
    ? {
        color,
        borderColor: color,
        background: type === 'secondary' ? 'transparent' : type === 'heavy' ? color : background,
      }
    : {};

  return (
    <div
      className={clsx(styles.badge, styles[size], styles[type], className)}
      style={customStyle}
    >
      {loading ? (
        <Spinner className={styles.colored} />
      ) : (
        <>
          {prependIcon && (
            <Icon name={prependIcon} className={styles.colored} />
          )}
          <p className={clsx(styles.colored, styles.label)}>
            {children || labelValue}
          </p>
          {appendedIcon && (
            <span
              className={clsx(closeable && styles.clickable)}
              onClick={closeable ? onClose : undefined}
            >
              <Icon name={appendedIcon} className={styles.colored} />
            </span>
          )}
        </>
      )}
    </div>
  );
}
