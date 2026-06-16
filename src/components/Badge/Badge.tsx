import clsx from 'clsx';
import { Spinner } from '../Spinner/Spinner';
import { Icon } from '../Icon/Icon';
import { getContrastColor } from '../../utils';
import styles from './Badge.module.css';
import { useMemo } from 'react';

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

  const computedBackground = (() => {
    if (type === 'secondary') return 'transparent';
    if (type === 'heavy') return color;
    return color ? `color-mix(in srgb, ${color} 30%, transparent)` : color;
  })();

  const customStyle: React.CSSProperties = useMemo(() => color
    ? {
        color: type === 'heavy' ? getContrastColor(color) : color,
        borderColor: color,
        background: computedBackground,
      }
    : {}, [color, type]);

  return (
    <div
      className={clsx(styles.badge, 'bagde', styles[size], styles[type], className)}
      style={customStyle}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {prependIcon && (
            <Icon name={prependIcon} />
          )}
          <p className={clsx(styles.colored, styles.label)}>
            {children || labelValue}
          </p>
          {appendedIcon && (
            <span
              className={clsx(closeable && styles.clickable, 'leading-none')}
              onClick={closeable ? onClose : undefined}
            >
              <Icon name={appendedIcon} />
            </span>
          )}
        </>
      )}
    </div>
  );
}
