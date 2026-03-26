import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { useTransition } from '../../hooks/useTransition';
import { Card } from '../Card/Card';
import styles from './FloatCard.module.css';

export interface FloatCardProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (open: boolean) => void;
  mode?: 'click' | 'hover';
  children?: React.ReactNode;
  card?: React.ReactNode;
  className?: string;
}

export function FloatCard({
  value,
  defaultValue = false,
  onChange,
  mode = 'click',
  children,
  card,
  className,
}: FloatCardProps) {
  const [isOpen, setIsOpen] = useControllable({
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { isMounted, isActive } = useTransition(!!isOpen, { duration: 200 });

  const closeCard = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const showCard = useCallback(() => {
    if (!contentRef.current || !cardRef.current) return;

    const cardContent = cardRef.current.firstElementChild as HTMLElement;
    if (!cardContent) return;

    const rect = (
      contentRef.current.firstElementChild || contentRef.current
    ).getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const padding = 4;

    if (rect.left + cardContent.offsetWidth > viewportWidth) {
      cardContent.style.left = `${rect.right - cardContent.offsetWidth}px`;
    } else {
      cardContent.style.left = `${rect.left}px`;
    }

    if (rect.bottom + cardContent.offsetHeight > viewportHeight) {
      cardContent.style.top = `${rect.top - cardContent.offsetHeight - padding}px`;
    } else {
      cardContent.style.top = `${rect.bottom + padding}px`;
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Position after mount
    requestAnimationFrame(() => showCard());

    const closeHandler = (e: MouseEvent | WheelEvent) => {
      if (!cardRef.current) return;

      const cardContent = cardRef.current.firstElementChild as HTMLElement;
      if (!cardContent) return;

      const isWheel = e.type === 'wheel';
      const rect = cardContent.getBoundingClientRect();
      const clientX = 'clientX' in e ? e.clientX : 0;
      const clientY = 'clientY' in e ? e.clientY : 0;
      const isInsideCard =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isWheel && isInsideCard) {
        // Check for scrollable parent within card
        let current = e.target as HTMLElement;
        while (current && cardContent.contains(current)) {
          if (current.scrollHeight > current.clientHeight) return;
          if (current === cardContent) break;
          current = current.parentElement as HTMLElement;
        }
        closeCard();
      } else if (!isInsideCard) {
        closeCard();
      }
    };

    const timerId = setTimeout(() => {
      document.addEventListener('click', closeHandler);
      document.addEventListener('wheel', closeHandler);
    }, 200);

    return () => {
      clearTimeout(timerId);
      document.removeEventListener('click', closeHandler);
      document.removeEventListener('wheel', closeHandler);
    };
  }, [isMounted, showCard, closeCard]);

  return (
    <div
      ref={contentRef}
      onClick={mode === 'click' ? (e) => {
        // Only open when clicking the trigger content, not portal card content
        // (React portal events bubble through the React tree but the DOM target
        // lives in document.body, outside contentRef)
        if (contentRef.current?.contains(e.target as Node)) {
          setIsOpen(true);
        }
      } : undefined}
      onMouseEnter={mode === 'hover' ? () => setIsOpen(true) : undefined}
      onMouseLeave={mode === 'hover' ? closeCard : undefined}
      className={clsx('float-card-container', className)}
    >
      {isMounted &&
        createPortal(
          <div ref={cardRef}>
            <Card
              className={clsx(
                styles.floatCard,
                'float-card',
                isActive && styles.active
              )}
            >
              {card}
            </Card>
          </div>,
          document.body
        )}
      {children}
    </div>
  );
}
