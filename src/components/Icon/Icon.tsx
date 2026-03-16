import clsx from 'clsx';
import './Icon.css';

export interface IconProps {
  name?: string;
  filled?: boolean;
  className?: string;
}

export function Icon({ name, filled = false, className }: IconProps) {
  return (
    <span
      className={clsx('material-symbols-rounded', 'icon', filled && 'filled', className)}
    >
      {name}
    </span>
  );
}
