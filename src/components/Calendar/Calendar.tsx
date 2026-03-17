import { useState, useRef } from 'react';
import clsx from 'clsx';
import {
  getArrayMonthDay,
  getMonths,
  checkDateType,
  capitalizeFirstLetter,
  isRange,
} from '../../utils/index';
import { useTransition } from '../../hooks/useTransition';
import { Icon } from '../Icon/Icon';
import styles from './Calendar.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type SelectionType = 'date' | 'period' | 'compare';

export interface CalendarProps {
  value?: Date | Date[] | [Date[], Date[]];
  defaultValue?: Date | Date[] | [Date[], Date[]];
  onChange?: (value: any) => void;
  type?: SelectionType;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  lang?: string;
  className?: string;
}

// ─── CalendarDay ──────────────────────────────────────────────────────────────

interface CalendarDayProps {
  date: Date | null;
  selected: boolean;
  inRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isToday: boolean;
  isOutsideMonth: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

function CalendarDay({
  date,
  selected,
  inRange,
  isRangeStart,
  isRangeEnd,
  isToday,
  isOutsideMonth,
  isDisabled,
  onClick,
}: CalendarDayProps) {
  if (!date) return <div className={styles.dayCell} />;

  return (
    <div
      className={clsx(
        styles.dayCell,
        selected && styles.selected,
        (inRange && !isRangeStart && !isRangeEnd) && styles.rangeMiddle,
        (isRangeStart || isRangeEnd) && styles.rangeStart,
        isToday && styles.today,
        isOutsideMonth && styles.outsideMonth,
        isDisabled && styles.disabled,
      )}
      onClick={isDisabled ? undefined : onClick}
      role="gridcell"
      aria-selected={selected}
    >
      {date.getDate()}
    </div>
  );
}

// ─── CalendarDateDialog ───────────────────────────────────────────────────────

interface CalendarDateDialogProps {
  months: { label: string; value: number }[];
  currentMonth: number;
  currentYear: number;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
}

function CalendarDateDialog({
  months,
  currentMonth,
  currentYear,
  onSelectMonth,
  onSelectYear,
}: CalendarDateDialogProps) {
  const years: number[] = [];
  for (let i = currentYear + 10; i >= currentYear - 10; i--) {
    years.push(i);
  }

  return (
    <div className={styles.dateDialog}>
      <div className={styles.monthGrid}>
        {months.map((m) => (
          <button
            key={m.value}
            className={clsx(styles.monthButton, m.value === currentMonth && styles.active)}
            onClick={() => onSelectMonth(m.value)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className={clsx(styles.monthGrid, 'mt-xs')}>
        {years.map((y) => (
          <button
            key={y}
            className={clsx(styles.monthButton, y === currentYear && styles.active)}
            onClick={() => onSelectYear(y)}
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date, disabledDates?: Date[]): boolean {
  const iso = date.toISOString().substring(0, 10);
  if (minDate && iso < minDate.toISOString().substring(0, 10)) return true;
  if (maxDate && iso > maxDate.toISOString().substring(0, 10)) return true;
  if (disabledDates?.some((d) => isSameDay(d, date))) return true;
  return false;
}

function getDayProps(
  date: Date,
  model: Date[] | Date[][],
  type: SelectionType,
  today: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
) {
  const isToday = isSameDay(date, today);
  const isDisabled = isDateDisabled(date, minDate, maxDate, disabledDates);

  if (type === 'date') {
    const selected = model.length > 0 && model[0] instanceof Date && isSameDay(model[0] as Date, date);
    return { selected, inRange: false, isRangeStart: false, isRangeEnd: false, isToday, isDisabled };
  }

  if (type === 'period') {
    const dates = model as Date[];
    const selected = dates.some((d) => d instanceof Date && isSameDay(d, date));
    const isRangeStart = dates.length >= 1 && dates[0] instanceof Date && isSameDay(dates[0], date);
    const isRangeEnd = dates.length >= 2 && dates[1] instanceof Date && isSameDay(dates[1], date);
    let inRange = false;
    if (dates.length === 2 && dates[0] instanceof Date && dates[1] instanceof Date) {
      inRange = isRange(dates[0], dates[1], date);
    }
    return { selected, inRange, isRangeStart, isRangeEnd, isToday, isDisabled };
  }

  // compare mode — use first range for highlighting
  const ranges = model as Date[][];
  const range0 = ranges[0] ?? [];
  const selected = range0.some((d) => d instanceof Date && isSameDay(d, date));
  const isRangeStart = range0.length >= 1 && range0[0] instanceof Date && isSameDay(range0[0], date);
  const isRangeEnd = range0.length >= 2 && range0[1] instanceof Date && isSameDay(range0[1], date);
  let inRange = false;
  if (range0.length === 2 && range0[0] instanceof Date && range0[1] instanceof Date) {
    inRange = isRange(range0[0], range0[1], date);
  }
  return { selected, inRange, isRangeStart, isRangeEnd, isToday, isDisabled };
}

// ─── Calendar (main) ──────────────────────────────────────────────────────────

// Extended Calendar type to support compound sub-components
interface CalendarComponent {
  (props: CalendarProps): JSX.Element;
  Day: typeof CalendarDay;
  DateDialog: typeof CalendarDateDialog;
}

function getInitialMonthYear(value?: Date | Date[] | [Date[], Date[]]): { month: number; year: number } {
  const today = new Date();
  if (!value) return { month: today.getMonth(), year: today.getFullYear() };
  if (value instanceof Date) return { month: value.getMonth(), year: value.getFullYear() };
  if (Array.isArray(value) && value.length > 0) {
    const first = Array.isArray(value[0]) ? (value[0] as Date[])[0] : value[0] as Date;
    if (first instanceof Date) return { month: first.getMonth(), year: first.getFullYear() };
  }
  return { month: today.getMonth(), year: today.getFullYear() };
}

export function Calendar({
  value,
  defaultValue,
  onChange,
  type = 'date',
  minDate,
  maxDate,
  disabledDates,
  lang = 'en',
  className,
}: CalendarProps): JSX.Element {
  const initial = getInitialMonthYear(value ?? defaultValue);
  const [currentMonth, setCurrentMonth] = useState(initial.month);
  const [currentYear, setCurrentYear] = useState(initial.year);
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  const isBackRef = useRef(false);
  const { isMounted: gridMounted, isActive: gridActive } = useTransition(
    transitionKey % 2 === 0,
    { duration: 300 }
  );

  // Internal model for uncontrolled usage
  const [internalModel, setInternalModel] = useState<Date[] | Date[][]>(() =>
    checkDateType(defaultValue as any, type)
  );

  // Controlled vs uncontrolled
  const model: Date[] | Date[][] =
    value !== undefined
      ? checkDateType(value as any, type)
      : internalModel;

  const today = new Date();
  const monthDate = new Date(currentYear, currentMonth, 1);
  const weeks = getArrayMonthDay(monthDate);
  const months = getMonths(lang);

  // Compute weekday headers
  const weekDays: string[] = [];
  const baseDate = new Date('2021-10-03T23:15:30');
  for (let i = 0; i < 7; i++) {
    const day = baseDate.toLocaleDateString(lang, { weekday: 'short' });
    weekDays.push(day.charAt(0).toUpperCase() + day.charAt(1).toLowerCase());
    baseDate.setDate(baseDate.getDate() + 1);
  }

  const monthLabel = capitalizeFirstLetter(
    new Date(currentYear, currentMonth, 1).toLocaleDateString(lang, {
      year: 'numeric',
      month: 'long',
    })
  );

  function prevMonth() {
    isBackRef.current = true;
    setTransitionKey((k) => k + 1);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    isBackRef.current = false;
    setTransitionKey((k) => k + 1);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  function handleDayClick(date: Date) {
    let newModel: Date[] | Date[][];

    if (type === 'date') {
      newModel = [date];
    } else if (type === 'period') {
      const dates = model as Date[];
      if (dates.length === 0 || dates.length >= 2) {
        newModel = [date];
      } else {
        // Second click — form range, ensure start <= end
        const [start] = dates;
        if (date < start) {
          newModel = [date, start];
        } else {
          newModel = [start, date];
        }
      }
    } else {
      // compare mode
      const ranges = model as Date[][];
      const range0 = [...(ranges[0] ?? [])];
      const range1 = [...(ranges[1] ?? [])];

      if (range0.length === 0 || range0.length >= 2) {
        // Start filling first range
        newModel = [[date], range1];
      } else if (range0.length === 1) {
        // Complete first range
        const [start] = range0;
        newModel = [date < start ? [date, start] : [start, date], range1];
      } else {
        newModel = [range0, range1];
      }
    }

    if (value === undefined) {
      setInternalModel(newModel);
    }

    if (onChange) {
      if (type === 'date') {
        onChange(date);
      } else {
        onChange(newModel);
      }
    }
  }

  function handleSelectMonth(month: number) {
    setCurrentMonth(month);
    setShowDateDialog(false);
  }

  function handleSelectYear(year: number) {
    setCurrentYear(year);
    setShowDateDialog(false);
  }

  const animationClass = isBackRef.current ? styles['slide-fade-back'] : styles['slide-fade-forward'];

  return (
    <div className={clsx(styles.calendar, className)}>
      <div className={styles.header}>
        <button
          className={styles.navButton}
          onClick={prevMonth}
          aria-label="Previous month"
        >
          <Icon name="chevron_left" />
        </button>

        <span
          className={styles.monthYear}
          onClick={() => setShowDateDialog((v) => !v)}
        >
          {monthLabel}
        </span>

        <button
          className={styles.navButton}
          onClick={nextMonth}
          aria-label="Next month"
        >
          <Icon name="chevron_right" />
        </button>
      </div>

      {showDateDialog && (
        <CalendarDateDialog
          months={months}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onSelectMonth={handleSelectMonth}
          onSelectYear={handleSelectYear}
        />
      )}

      <div className={styles.slideContainer}>
        <div
          key={transitionKey}
          className={animationClass}
          role="grid"
          aria-label={monthLabel}
        >
          {/* Weekday headers */}
          <div className={styles.grid}>
            {weekDays.map((wd) => (
              <div key={wd} className={styles.weekdayHeader}>
                {wd}
              </div>
            ))}
          </div>

          {/* Day rows */}
          {weeks
            .filter((week: any[]) => week.some((d: any) => d))
            .map((week: any[], weekIdx: number) => (
              <div key={weekIdx} className={styles.grid}>
                {week.map((day: Date | '', dayIdx: number) => {
                  if (!day) {
                    return <div key={dayIdx} className={styles.dayCell} />;
                  }
                  const props = getDayProps(day, model, type, today, minDate, maxDate, disabledDates);
                  return (
                    <CalendarDay
                      key={dayIdx}
                      date={day}
                      {...props}
                      isOutsideMonth={false}
                      onClick={() => handleDayClick(day)}
                    />
                  );
                })}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// Attach compound sub-components
(Calendar as unknown as CalendarComponent).Day = CalendarDay;
(Calendar as unknown as CalendarComponent).DateDialog = CalendarDateDialog;

// Re-export sub-components for direct use
export { CalendarDay, CalendarDateDialog };
