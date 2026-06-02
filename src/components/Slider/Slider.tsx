import React, { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { Tooltip } from '../Tooltip';
import styles from './Slider.module.css';
import { blendColors } from '#utils/index';

export interface SliderProps {
  value?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  size?: 'small' | 'medium' | 'large';
  max?: number;
  unit?: string;
  color?: string;
  showTooltip?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  fillColors?: string[];
  isRange?: boolean;
  steps?: Array<{ label: string; value: number }>;
  neutralBackground?: boolean;
  className?: string;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const {
      value,
      onChange,
      size = 'medium',
      max = 0,
      unit = '',
      color = '',
      showTooltip = false,
      disabled = false,
      vertical = false,
      fillColors,
      isRange = false,
      steps,
      neutralBackground = false,
      className,
    } = props;

    const isControlled = value !== undefined;

    const [currentValue, setValue] = useControllable<number | [number, number]>({
      value,
      defaultValue: isRange ? [0, 0] : 0,
      onChange,
    });

    const [isDragging, setIsDragging] = useState<boolean[]>([false, false]);
    const [mounted, setMounted] = useState(false);

    const [dragValue, setDragValue] = useState<number | [number, number] | undefined>(undefined);

    const containerRef = useRef<HTMLDivElement>(null);
    const fillBarRef = useRef<HTMLDivElement>(null);
    const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);

    const isDraggingRef = useRef<boolean[]>([false, false]);
    const currentValueRef = useRef<number | [number, number] | undefined>(currentValue);
    const updateCursorRef = useRef<(e: MouseEvent) => void>(() => {});
    const stopDraggingRef = useRef<() => void>(() => {});
    const updateCursorTouchRef = useRef<(e: TouchEvent) => void>(() => {});

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    useEffect(() => {
      setMounted(true);
      currentValueRef.current = currentValue;
    }, [currentValue]);

    function getBackground() {
      if (!mounted || neutralBackground || !color) return "";
      return blendColors(color);
    }

    function getModelArray(val: number | [number, number] | undefined): [number, number] {
      if (val === undefined) return [0, 0];
      if (Array.isArray(val)) return [val[0], val[1]];
      return [val, val];
    }

    function toPercentage(rawValue: number): number {
      if (!max || max === 0) return Math.min(1, Math.max(0, rawValue));
      return Math.min(1, Math.max(0, rawValue / max));
    }

    function fromPercentage(pct: number): number {
      if (!max || max === 0) return pct;
      return pct * max;
    }

    function getStepPercentage(pct: number): number {
      if (!steps || !steps.length) return pct;
      const stepValues = steps.map((s) => (max ? s.value / max : s.value));
      return stepValues.reduce((prev, curr) =>
        Math.abs(curr - pct) < Math.abs(prev - pct) ? curr : prev
      );
    }

    const calculateCursor = useCallback(() => {
      const container = containerRef.current;
      const fillBar = fillBarRef.current;
      if (!container) return;

      const modelArray = getModelArray(currentValueRef.current);
      const percentages = isRange
        ? [toPercentage(modelArray[0]), toPercentage(modelArray[1])]
        : [toPercentage(modelArray[0])];

      const cursors = cursorRefs.current;

      cursors.forEach((cursor, index) => {
        if (!cursor) return;
        const pct = percentages[index] ?? 0;

        if (vertical) {
          const height = container.clientHeight;
          const bottom = Math.min(height, Math.max(0, height * pct));
          const borderWidthStr = getComputedStyle(cursor).getPropertyValue('--border-width-xs');
          const borderWidth = parseFloat(borderWidthStr) / 2 || 0;
          cursor.style.bottom =
            modelArray[index] < (max * 0.99 || 0.99) || (steps && steps.length)
              ? bottom - cursor.clientHeight / 3 - borderWidth + 'px'
              : bottom - cursor.clientHeight - borderWidth + 'px';
          cursor.style.left = '50%';
        } else {
          const width = container.clientWidth;
          const left = Math.min(width, Math.max(0, width * pct));
          const borderWidthStr = getComputedStyle(cursor).getPropertyValue('--border-width-xs');
          const borderWidth = parseFloat(borderWidthStr) / 2 || 0;
          cursor.style.left =
            modelArray[index] < (max * 0.99 || 0.99) || (steps && steps.length)
              ? left - cursor.clientWidth / 3 - borderWidth + 'px'
              : left - cursor.clientWidth - borderWidth + 'px';
          cursor.style.bottom = '50%';
        }
      });

      if (!fillBar) return;

      if (vertical) {
        const sliderHeight = container.clientHeight;
        const cursorHeights = cursors.map((c) => (c ? c.clientHeight / 2 : 0));
        const tops = cursors.map((c) => (c ? c.offsetTop : 0));
        const bottoms = tops.map(
          (top, i) => sliderHeight - top - cursorHeights[i]
        );
        const minBottom = isRange ? Math.min(...bottoms) : 0;
        const maxBottom = Math.max(0, Math.max(...bottoms));

        fillBar.style.bottom = minBottom + 'px';
        fillBar.style.height = Math.abs(maxBottom - minBottom) + 'px';
        fillBar.style.left = '50%';
        fillBar.style.width = '100%';
      } else {
        const validCursors = cursors.filter(Boolean) as HTMLDivElement[];
        if (!validCursors.length) return;
        const lefts = validCursors.map((c) => c.offsetLeft + c.clientWidth / 3);
        const minLeft = isRange ? Math.min(...lefts) : 0;
        const maxLeft = Math.max(...lefts);

        fillBar.style.left = minLeft + 'px';
        fillBar.style.width =
          Math.abs(maxLeft - minLeft) + validCursors[0].clientWidth / 6 + 'px';
        fillBar.style.bottom = '50%';
        fillBar.style.height = '100%';
      }
    }, [isRange, vertical, max, steps]);

    const startDragging = useCallback((index: number) => {
      const newDragging = [false, false];
      newDragging[index] = true;
      isDraggingRef.current = newDragging;
      setIsDragging([...newDragging]);
    }, []);

    const updateCursorHandler = useCallback(
      (clientX: number, clientY: number) => {
        const container = containerRef.current;
        if (!container) return;

        isDraggingRef.current.forEach((dragging, index) => {
          if (!dragging) return;
          const cursor = cursorRefs.current[index];
          if (!cursor) return;

          let pct: number;
          if (vertical) {
            const rect = container.getBoundingClientRect();
            const height = container.clientHeight - cursor.clientHeight;
            const offsetY =
              clientY - cursor.clientHeight / 2 - rect.top;
            const maxY = height;
            const clampedY = Math.min(maxY, Math.max(0, maxY - offsetY));
            pct = getStepPercentage(clampedY / (height || 1));
          } else {
            const rect = container.getBoundingClientRect();
            const width = container.clientWidth - cursor.clientWidth;
            const offsetX =
              clientX - cursor.clientWidth / 2 - rect.left;
            const clampedX = Math.min(width, Math.max(0, offsetX));
            pct = getStepPercentage(clampedX / (width || 1));
          }

          const rawValue = fromPercentage(pct);
          const modelArray = getModelArray(currentValueRef.current);

          let newValue: number | [number, number];
          if (isRange) {
            const arr: [number, number] = [...modelArray] as [number, number];
            arr[index] = rawValue;
            newValue = arr;
          } else {
            newValue = rawValue;
          }

          currentValueRef.current = newValue;
          setValue(newValue);
          setDragValue(newValue);
          setTimeout(() => calculateCursor(), 0);
        });
      },
      [isRange, vertical, max, steps, setValue, calculateCursor]
    );

    const stopDraggingHandler = useCallback(() => {
      isDraggingRef.current = [false, false];
      setIsDragging([false, false]);
      if (!isControlled) setDragValue(undefined);
    }, []);

    useEffect(() => {
      if (dragValue === undefined) return;

      const isSame =
        Array.isArray(dragValue) && Array.isArray(currentValue)
          ? dragValue[0] === currentValue[0] && dragValue[1] === currentValue[1]
          : dragValue === currentValue;

      if (isSame) setDragValue(undefined);
    }, [currentValue, dragValue]);

    useEffect(() => {
      updateCursorRef.current = (e: MouseEvent) =>
        updateCursorHandler(e.clientX, e.clientY);
      stopDraggingRef.current = stopDraggingHandler;
      updateCursorTouchRef.current = (e: TouchEvent) => {
        if (e.touches[0]) {
          updateCursorHandler(e.touches[0].clientX, e.touches[0].clientY);
        }
      };
    });

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => updateCursorRef.current(e);
      const handleMouseUp = () => stopDraggingRef.current();
      const handleTouchMove = (e: TouchEvent) => updateCursorTouchRef.current(e);
      const handleTouchEnd = () => stopDraggingRef.current();

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }, []);

    useEffect(() => {
      const timer = setTimeout(() => calculateCursor(), 200);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      const timer = setTimeout(() => calculateCursor(), 100);
      return () => clearTimeout(timer);
    }, [currentValue, size, vertical]);

    const getTooltipText = (rawValue: number): string => {
      const displayUnit = unit || '%';
      return `${rawValue.toFixed(1)}${displayUnit}`;
    };

    const cursorCount = isRange ? 2 : 1;

    const effectiveValue = dragValue ?? currentValue;
    const modelArray = getModelArray(effectiveValue);

    const getStepStyle = (step: { label: string; value: number }) => {
      const pct = max ? step.value / max : step.value;
      const style: React.CSSProperties = {};
      if (vertical) {
        style.bottom = pct * 100 + '%';
      } else {
        style.left = pct * 100 + '%';
      }
      return style;
    };

    const isStepActive = (step: { label: string; value: number }): boolean => {
      const pct = max ? step.value / max : step.value;
      if (isRange) {
        const minPct = Math.min(toPercentage(modelArray[0]), toPercentage(modelArray[1]));
        const maxPct = Math.max(toPercentage(modelArray[0]), toPercentage(modelArray[1]));
        return pct >= minPct && pct <= maxPct;
      }
      return pct >= 0 && pct <= toPercentage(modelArray[0]);
    };

    const getStepMarkerStyle = (step: { label: string; value: number }, active: boolean): React.CSSProperties => {
      if (!active || disabled) return {};
      if (fillColors && fillColors.length) {
        const stepPct = max ? step.value / max : step.value;
        const fillStart = isRange ? Math.min(toPercentage(modelArray[0]), toPercentage(modelArray[1])) : 0;
        const fillEnd = isRange
          ? Math.max(toPercentage(modelArray[0]), toPercentage(modelArray[1]))
          : toPercentage(modelArray[0]);
        const fillSpan = fillEnd - fillStart;
        if (fillSpan <= 0) return {};
        const fraction = (stepPct - fillStart) / fillSpan;
        const segmentIndex = Math.min(
          fillColors.length - 1,
          Math.max(0, Math.floor(fraction * fillColors.length))
        );
        return { backgroundColor: fillColors[segmentIndex] };
      }
      if (color) {
        return { backgroundColor: color };
      }
      return {};
    };

    const fillBarStyle: React.CSSProperties = {};
    if (color && !(fillColors && fillColors.length) && !disabled) {
      fillBarStyle.backgroundColor = color;
    }

    const getCursorStyle = (_: number): React.CSSProperties => {
      const style: React.CSSProperties = {};
      if (color && !disabled) {
        style.borderColor = color;
      }
      return style;
    };

    return (
      <div
        ref={mergedRef}
        className={clsx(
          styles.slider,
          'slider',
          styles[size],
          vertical ? styles.vertical : styles.horizontal,
          disabled && styles.disabled,
          steps && steps.length && styles.stepSlider,
          neutralBackground && styles.neutralBg,
          className
        )}
        style={{ background: getBackground() }}
        aria-disabled={disabled}
        onMouseDown={(e) => {
          if (disabled) return;
          const container = containerRef.current;
          if (!container) return;

          let closestIndex = 0;
          if (isRange && cursorRefs.current.length > 1) {
            let closestDist = Infinity;
            cursorRefs.current.forEach((cursor, idx) => {
              if (!cursor) return;
              if (vertical) {
                const rect = container.getBoundingClientRect();
                const cursorBottom = container.clientHeight - cursor.offsetTop - cursor.clientHeight / 2;
                const dist = Math.abs(
                  (container.clientHeight - (e.clientY - rect.top)) - cursorBottom
                );
                if (dist < closestDist) {
                  closestDist = dist;
                  closestIndex = idx;
                }
              } else {
                const dist = Math.abs(cursor.offsetLeft - (e.clientX - container.getBoundingClientRect().left));
                if (dist < closestDist) {
                  closestDist = dist;
                  closestIndex = idx;
                }
              }
            });
          }
          startDragging(closestIndex);
          updateCursorHandler(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          if (disabled) return;
          if (e.touches[0]) {
            updateCursorHandler(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
      >
        <div
          ref={fillBarRef}
          className={clsx(
            styles.fillBar,
            vertical && styles.fillBarVertical,
            fillColors && fillColors.length && styles.haveFillColors
          )}
          style={fillBarStyle}
        >
          {fillColors && fillColors.map((c, i) => (
            <div key={i} style={{ background: c, width: '100%', height: '100%' }} />
          ))}
        </div>

        {Array.from({ length: cursorCount }).map((_, index) => (
          showTooltip ? (
            <Tooltip
              key={index}
              labelValue={getTooltipText(modelArray[index])}
              position={vertical ? 'right' : 'top'}
            >
              <div
                ref={(el) => { cursorRefs.current[index] = el; }}
                className={clsx(
                  styles.cursor,
                  isDragging[index] && styles.dragging,
                  color && styles.coloredCursor
                )}
                style={getCursorStyle(index)}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  startDragging(index);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  startDragging(index);
                }}
              />
            </Tooltip>
          ) : (
            <div
              key={index}
              ref={(el) => { cursorRefs.current[index] = el; }}
              className={clsx(
                styles.cursor,
                isDragging[index] && styles.dragging,
                color && styles.coloredCursor
              )}
              style={getCursorStyle(index)}
              onMouseDown={(e) => {
                e.stopPropagation();
                startDragging(index);
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                startDragging(index);
              }}
            />
          )
        ))}

        {steps && steps.map((step, i) => {
          const active = isStepActive(step);
          return (
            <div
              key={i}
              className={clsx(
                styles.step,
                active && styles.stepActive,
                neutralBackground && styles.stepNeutral
              )}
              style={{ ...getStepStyle(step), ...getStepMarkerStyle(step, active) }}
            >
              <div
                className={clsx(
                  styles.stepMarker,
                  active && styles.stepMarkerActive,
                  neutralBackground && !active && styles.stepMarkerNeutral
                )}
                style={getStepMarkerStyle(step, active)}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
