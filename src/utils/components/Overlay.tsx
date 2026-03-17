import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useTransition } from '../../hooks';
import '../styles/Overlay.css';

export interface OverlayProps {
  value?: boolean;
  zIndex?: number;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function Overlay({
  value = false,
  zIndex = 1000,
  onClick,
  children,
  className,
}: OverlayProps) {
  const { isMounted, isActive } = useTransition(value, { duration: 500 });

  return (
    <>
      {isMounted && createPortal(
        <div
          className={clsx('overlay-backdrop', isActive && 'active', className)}
          style={{ zIndex }}
          onClick={onClick}
        />,
        document.body
      )}
      {children}
    </>
  );
}
