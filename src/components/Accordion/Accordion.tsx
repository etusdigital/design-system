import { useRef, useEffect, useLayoutEffect } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import styles from './Accordion.module.css';
import { Icon } from '../Icon';

export interface AccordionProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  duration?: number;
  noShadow?: boolean;
  disabled?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Accordion({
  value,
  onChange,
  duration = 300,
  noShadow = false,
  disabled = false,
  header,
  children,
  className,
}: AccordionProps) {
  const [isExpanded, setExpanded] = useControllable<boolean>({ value, defaultValue: false, onChange });
  const clampedDuration = Math.min(1000, Math.max(150, duration ?? 300));

  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isExpandedRef = useRef(isExpanded);

  // Keep isExpandedRef in sync on every render (avoids stale closure in observer callbacks)
  isExpandedRef.current = isExpanded;

  // Prevent initial flash: set maxHeight to 0 before first paint when collapsed
  useLayoutEffect(() => {
    if (!isExpanded && contentRef.current) {
      contentRef.current.style.maxHeight = '0px';
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function resize() {
    if (!contentRef.current) return;
    contentRef.current.style.maxHeight = isExpandedRef.current
      ? `${contentRef.current.scrollHeight}px`
      : '0px';
  }

  // Mount effect: register ResizeObserver on card + content, MutationObserver on content
  useEffect(() => {
    const cardEl = cardRef.current;
    const contentEl = contentRef.current;

    const resizeObs = new ResizeObserver(() => resize());
    const mutationObs = new MutationObserver(() => resize());

    if (cardEl) resizeObs.observe(cardEl, { box: 'border-box' });
    if (contentEl) {
      resizeObs.observe(contentEl, { box: 'border-box' });
      mutationObs.observe(contentEl, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-max-height'],
      });
    }

    return () => {
      resizeObs.disconnect();
      mutationObs.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Post-render resize (Vue onUpdated equivalent) — safe since resize() only sets style imperatively
  useEffect(() => {
    resize();
  });

  function handleToggle() {
    if (!disabled) {
      setExpanded(!isExpanded);
    }
  }

  return (
    <div
      className={clsx(
        styles.accordion,
        'accordion',
        noShadow && styles.noShadow,
        className
      )}
    >
      <div ref={cardRef} className="w-full flex flex-col">
        <div
          className={clsx(styles.header, disabled && styles.disabled)}
          onClick={handleToggle}
        >
          {header && <span className={styles.headerText}>{header}</span>}
          <Icon
            className={clsx(
              styles.chevron,
              'material-symbols-rounded',
              isExpanded && styles.expanded
            )}
            name="expand_more"
          />
        </div>
        <div
          ref={contentRef}
          className={styles.content}
          style={{ transitionDuration: `${clampedDuration}ms` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
