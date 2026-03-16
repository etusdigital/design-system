import clsx from 'clsx';
import './Icon.css';

export interface IconProps {
  name?: string;
  filled?: boolean;
  className?: string;
  onClick?: Function
}

export function Icon({ name, filled = false, className , onClick = () => {}}: IconProps) {
  return (
    <span
      className={clsx('material-symbols-rounded', 'icon', filled && 'filled', className)}
      onClick={onClick}
    >
      {name}
    </span>
  );
}
