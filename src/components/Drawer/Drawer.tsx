import { useRef } from 'react';
import clsx from 'clsx';
import { Overlay } from '../../utils/components/Overlay';
import { useControllable } from '../../hooks/useControllable';
import { useTransition } from '../../hooks/useTransition';
import './Drawer.css';

export interface DrawerProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  position?: 'right' | 'left' | 'top' | 'bottom';
  width?: string;
  height?: string;
  noOutsideClose?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Drawer({
  value,
  defaultValue,
  onChange,
  position = 'right',
  width = 'fit-content',
  height = 'fit-content',
  noOutsideClose = false,
  children,
  className,
}: DrawerProps) {
  const [isOpen, setOpen] = useControllable<boolean>({ value, defaultValue: false, onChange });
  const { isMounted, isActive } = useTransition(isOpen ?? false, { duration: 500 });
  const drawerRef = useRef<HTMLDivElement>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectivePosition = isMobile ? 'bottom' : position;
  const effectiveWidth = isMobile ? '100%' : width;

  function handleOverlayClick() {
    if (noOutsideClose) {
      drawerRef.current?.classList.add('no-outside-close-warning');
      setTimeout(() => {
        drawerRef.current?.classList.remove('no-outside-close-warning');
      }, 100);
    } else {
      setOpen(false);
    }
  }

  return (
    <Overlay value={isOpen} zIndex={1001} onClick={handleOverlayClick}>
      {isMounted && (
        <div
          ref={drawerRef}
          className={clsx('drawer', effectivePosition, isActive && 'active', className)}
          style={{
            width: effectiveWidth,
            height,
            maxWidth: 'calc(100% - var(--spacing-xl))',
            maxHeight: 'calc(100% - var(--spacing-xl))',
          }}
        >
          {children}
        </div>
      )}
    </Overlay>
  );
}
