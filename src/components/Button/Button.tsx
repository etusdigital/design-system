import { useState } from 'react';
import clsx from 'clsx';
import { Spinner } from '../Spinner/Spinner';
import { Icon } from '../Icon/Icon';
import { blendColors } from '../../utils';
import styles from './Button.module.css';
import './colors.css';

export interface ButtonProps {
  id?: string;
  name?: string;
  type?: 'button' | 'reset' | 'submit';
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'secondary' | 'plain' | 'reverse';
  disabled?: boolean;
  loading?: boolean;
  progress?: number;
  icon?: string;
  round?: boolean;
  alwaysOpen?: boolean;
  background?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  id,
  name,
  type = 'button',
  color = 'primary',
  size = 'medium',
  variant = 'default',
  disabled = false,
  loading = false,
  progress = 0,
  icon: iconProp = '',
  round = false,
  alwaysOpen = false,
  background = '',
  children,
  className,
  onClick,
}: ButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  const isLoading = !!(progress > 0 || loading);

  const computedIcon = (() => {
    if (iconProp) return iconProp;
    if (!round) return '';
    if (color === 'danger' || color === 'warning' || color === 'neutral') return 'close';
    return 'add';
  })();

  const computedStyle = (() => {
    const style: React.CSSProperties = {};
    if (disabled) return style;

    if (background && variant !== 'plain') style.borderColor = background;
    if (background && variant !== 'default') {
      style.color = background;
    } else if (background) {
      style.background = background;
    }

    if (isHovering && typeof document !== 'undefined') {
      if (background && variant === 'default') {
        const bg = blendColors(background, 0.5, [0, 0, 0]);
        style.background = bg;
        style.borderColor = bg;
      } else if (background && variant === 'reverse') {
        style.background = background;
        style.color = 'white';
      } else if (background) {
        style.background = blendColors(background, 0.4);
      }
    }

    return style;
  })();

  const LabelComponent = name || id ? 'label' : 'div';

  return (
    <button
      id={id}
      name={name || id}
      type={type}
      disabled={disabled}
      className={clsx(
        styles.button,
        variant,
        size,
        color,
        {
          [styles.disabled]: disabled,
          disabled,
          [styles.round]: round,
          round,
          [styles.pointerEventsNone]: isLoading,
          [styles.alwaysOpen]: alwaysOpen,
          'always-open': alwaysOpen,
          [styles.hovered]: isHovering,
          hovered: isHovering,
        },
        className
      )}
      style={computedStyle}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      onClick={onClick}
    >
      {isLoading && (
        <div
          className={clsx(
            styles.progress,
            progress === 1 && styles.progressComplete
          )}
          style={{ width: `${progress * 100}%` }}
        />
      )}
      {isLoading && <Spinner className={styles.spinner} />}
      {(children || round || computedIcon) && (
        <LabelComponent
          htmlFor={name || id}
          className={clsx(
            styles.buttonLabel,
            isLoading && styles.invisible
          )}
        >
          {computedIcon && <Icon name={computedIcon} />}
          {children && <span className={styles.label}>{children}</span>}
        </LabelComponent>
      )}
    </button>
  );
}
