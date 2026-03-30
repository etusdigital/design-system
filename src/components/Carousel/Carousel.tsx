import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { Icon } from '../Icon/Icon';
import styles from './Carousel.module.css';

export interface CarouselProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  options: any[];
  visible?: number;
  vertical?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  showArrows?: boolean;
  disabled?: boolean;
  circular?: boolean;
  children?: (option: any, index: number) => React.ReactNode;
  className?: string;
}

export function Carousel({
  value,
  defaultValue,
  onChange,
  options,
  visible = 1,
  vertical = false,
  autoplay = false,
  autoplayInterval = 3000,
  showArrows = true,
  disabled = false,
  circular = false,
  children,
  className,
}: CarouselProps) {
  const [model, setModel] = useControllable<number>({
    value,
    defaultValue: defaultValue ?? 0,
    onChange,
  });

  const trackRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('-0px');
  const [contentStyle, setContentStyle] = useState<React.CSSProperties>({});

  const totalPages = Math.ceil(options.length / visible);
  const currentIndex = model ?? 0;

  // Group options into sections of `visible` length
  const sections: any[][] = [];
  for (let i = 0; i < options.length; i += visible) {
    sections.push(options.slice(i, i + visible));
  }

  const maxIndex = totalPages - 1;

  function setModelSafe(value: number) {
    if (disabled) return;
    if (value > maxIndex) {
      if (!circular) return;
      value = 0;
    } else if (value < 0) {
      if (!circular) return;
      value = maxIndex;
    }
    setModel(value);
  }

  function calculateContentStyle() {
    if (!trackRef.current) {
      setContentStyle({});
      setTransform('-0px');
      return;
    }

    const children = trackRef.current.children;
    if (children.length === 0) {
      setContentStyle({});
      setTransform('-0px');
      return;
    }

    const gapStr = getComputedStyle(document.documentElement).getPropertyValue('--spacing-xs');
    const gap = parseFloat(gapStr) || 0;

    let totalSize = 0;
    let totalTransformPx = 0;

    const child = children[currentIndex] as HTMLElement;
    if (child) {
      if (vertical) {
        totalSize = Math.max(totalSize, child.offsetHeight);
      } else {
        totalSize += child.offsetWidth;
      }
    }

    for (let i = 0; i < currentIndex; i++) {
      const c = children[i] as HTMLElement;
      const rect = c.getBoundingClientRect();
      if (vertical) totalTransformPx += rect.height;
      else totalTransformPx += rect.width;

      if (currentIndex > 0) totalTransformPx += gap;
    }

    setTransform(`-${Math.floor(totalTransformPx)}px`);
    setContentStyle({
      width: vertical ? '' : `${totalSize}px`,
      height: vertical ? `${totalSize}px` : '',
    });
  }

  // useLayoutEffect replaces Vue's nextTick for DOM measurements
  useLayoutEffect(() => {
    calculateContentStyle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, options.length, visible]);

  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;
  const maxIndexRef = useRef(maxIndex);
  maxIndexRef.current = maxIndex;
  const circularRef = useRef(circular);
  circularRef.current = circular;

  // Autoplay via setInterval — paused when disabled
  useEffect(() => {
    if (!autoplay || disabled) return;
    const interval = setInterval(() => {
      const prev = currentIndexRef.current;
      const max = maxIndexRef.current;
      const circ = circularRef.current;
      const next = prev + 1;
      if (next > max) {
        setModel(circ ? 0 : prev);
      } else {
        setModel(next);
      }
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, options.length, visible, disabled, circular]);

  function goToPrev() {
    setModelSafe(currentIndex - 1);
  }

  function goToNext() {
    setModelSafe(currentIndex + 1);
  }

  const prevDisabled = disabled || (currentIndex === 0 && !circular);
  const nextDisabled = disabled || (currentIndex >= maxIndex && !circular);

  return (
    <div className={clsx(styles.carousel, 'carousel', className)}>
      <div className={clsx(styles.content, vertical && styles.vertical)}>
        {showArrows && (
          <button
            className={clsx(styles.navButton, styles.prevButton, vertical && styles.vertical)}
            onClick={goToPrev}
            aria-label="Previous slide"
            disabled={prevDisabled}
          >
            <Icon name={vertical ? 'expand_less' : 'chevron_left'} className="leading-xxs" />
          </button>
        )}

        {/* Overflow container with explicit width/height from contentStyle */}
        <div className={styles.overflow} style={{ width: '100%', overflow: 'hidden', ...contentStyle }}>
          <div
            ref={trackRef}
            className={clsx(styles.track, vertical && styles.vertical)}
            style={{ transform: `translate${vertical ? 'Y' : 'X'}(${transform})` }}
          >
            {sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className={styles.section}
                {...(sectionIndex !== currentIndex ? { inert: true } : {})}
              >
                {section.map((option, itemIndex) => (
                  <div key={itemIndex} className={styles.slide}>
                    {children?.(option, sectionIndex * visible + itemIndex)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {showArrows && (
          <button
            className={clsx(styles.navButton, styles.nextButton, vertical && styles.vertical)}
            onClick={goToNext}
            aria-label="Next slide"
            disabled={nextDisabled}
          >
            <Icon name={vertical ? 'expand_more' : 'chevron_right'} className="leading-xxs" />
          </button>
        )}
      </div>

      <div className={styles.indicators}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={clsx(
              styles.indicator,
              i === currentIndex && styles.indicatorActive,
              disabled && styles.indicatorDisabled
            )}
            onClick={() => !disabled && setModel(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
