import type React from 'react';
import clsx from 'clsx';
import './Icon.css';

export interface IconProps {
  name?: string;
  filled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  size?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

export function Icon({ name, filled = false, className , style, onClick = () => {}}: IconProps) {
  return (
    <span
      className={clsx('material-symbols-rounded', 'icon', filled && 'filled', className)}
      style={style}
      onClick={onClick}
    >
      {name}
    </span>
  );
}
