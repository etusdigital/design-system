import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useTransition } from '../../hooks';
import './Overlay.css';

export interface OverlayProps {
  modelValue?: boolean;
  zIndex?: number;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function Overlay({
  modelValue = false,
  zIndex = 1000,
  onClick,
  children,
  className,
}: OverlayProps) {
  const { isMounted, isActive } = useTransition(modelValue, { duration: 500 });

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
