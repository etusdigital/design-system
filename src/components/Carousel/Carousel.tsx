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
  children,
  className,
}: CarouselProps) {
  const [model, setModel] = useControllable<number>({
    value,
    defaultValue: defaultValue ?? 0,
    onChange,
  });

  const carouselRef = useRef<HTMLDivElement>(null);
  const [contentStyle, setContentStyle] = useState<React.CSSProperties>({});

  const totalPages = Math.ceil(options.length / visible);
  const currentIndex = model ?? 0;

  // Group options into sections of `visible` length
  const sections: any[][] = [];
  for (let i = 0; i < options.length; i += visible) {
    sections.push(options.slice(i, i + visible));
  }

  function calculateContentStyle() {
    if (!carouselRef.current) {
      setContentStyle({});
      return;
    }

    const container = carouselRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Read gap from CSS variable on document root (per RESEARCH.md pitfall 7 — NOT container element)
    const gapStr = getComputedStyle(document.documentElement).getPropertyValue('--spacing-xs');
    const gap = parseFloat(gapStr) || 0;

    if (vertical) {
      const itemHeight = (containerHeight - gap * (visible - 1)) / visible;
      const offset = currentIndex * (itemHeight + gap);
      setContentStyle({ transform: `translateY(-${offset}px)` });
    } else {
      const itemWidth = (containerWidth - gap * (visible - 1)) / visible;
      const offset = currentIndex * (itemWidth + gap);
      setContentStyle({ transform: `translateX(-${offset}px)` });
    }
  }

  // useLayoutEffect replaces Vue's nextTick for DOM measurements
  useLayoutEffect(() => {
    calculateContentStyle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, options.length, visible]);

  // Autoplay via setInterval
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setModel(prev => ((prev ?? 0) + 1) % totalPages);
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, options.length, visible]);

  function goToPrev() {
    const prev = Math.max(0, currentIndex - 1);
    if (prev !== currentIndex) setModel(prev);
  }

  function goToNext() {
    const next = Math.min(totalPages - 1, currentIndex + 1);
    if (next !== currentIndex) setModel(next);
  }

  return (
    <div className={clsx(styles.carousel, className)}>
      <div className={clsx(styles.content, vertical && styles.vertical)}>
        {showArrows && (
          <button
            className={clsx(styles.navButton, styles.prevButton, vertical && styles.vertical)}
            onClick={goToPrev}
            aria-label="Previous slide"
            disabled={currentIndex === 0}
          >
            <Icon name={vertical ? 'expand_less' : 'chevron_left'} />
          </button>
        )}

        <div className={styles.overflow}>
          <div
            className={clsx(styles.track, vertical && styles.vertical)}
            style={contentStyle}
          >
            {sections.map((section, sectionIndex) =>
              section.map((option, optionIndex) => (
                <div
                  key={`${sectionIndex}-${optionIndex}`}
                  className={styles.item}
                  {...(sectionIndex !== currentIndex ? { inert: true } : {})}
                >
                  {children?.(option, sectionIndex * visible + optionIndex)}
                </div>
              ))
            )}
          </div>
        </div>

        {showArrows && (
          <button
            className={clsx(styles.navButton, styles.nextButton, vertical && styles.vertical)}
            onClick={goToNext}
            aria-label="Next slide"
            disabled={currentIndex >= totalPages - 1}
          >
            <Icon name={vertical ? 'expand_more' : 'chevron_right'} />
          </button>
        )}
      </div>

      <div className={styles.indicators}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={clsx(styles.indicator, i === currentIndex && styles.indicatorActive)}
            onClick={() => setModel(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
