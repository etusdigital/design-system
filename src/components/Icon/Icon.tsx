import clsx from 'clsx';

export interface IconProps {
  name?: string;
  size?: string;
  filled?: boolean;
  className?: string;
}

export function Icon({ name, size = '24px', filled = false, className }: IconProps) {
  return (
    <span
      className={clsx('material-symbols-rounded', 'icon', filled && 'filled', className)}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  );
}
