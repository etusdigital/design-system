import type React from 'react';
import clsx from 'clsx';
import './Icon.css';

export interface IconProps {
  name?: string;
  filled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  size?: string;
  tabIndex?: number;
  'aria-label'?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLSpanElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLSpanElement>;
}

export function Icon({
  name,
  filled = false,
  className,
  style,
  tabIndex = -1,
  'aria-label': ariaLabel,
  onClick = () => {},
  onKeyUp,
  onKeyDown,
}: IconProps) {
  return (
    <span
      className={clsx('material-symbols-rounded', 'icon', filled && 'filled', className)}
      style={style}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
    >
      {name}
    </span>
  );
}
