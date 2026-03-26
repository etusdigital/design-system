import type React from "react";
import { useState, useRef, useEffect, type RefObject } from "react";
import clsx from "clsx";
import {
  getArrayMonthDay,
  getMonths,
  checkDateType,
  capitalizeFirstLetter,
  isRange,
} from "../../utils/index";
import { useTransition } from "../../hooks/useTransition";
import { Icon } from "../Icon/Icon";
import { Card } from "../Card/Card";
import styles from "./Calendar.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type SelectionType = "date" | "period" | "compare";

export interface CalendarProps {
  value?: Date | Date[] | [Date[], Date[]];
  defaultValue?: Date | Date[] | [Date[], Date[]];
  onChange?: (value: any) => void;
  type?: SelectionType;
  doubleCalendar?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  lang?: string;
  className?: string;
}

// ─── CalendarDay ──────────────────────────────────────────────────────────────

interface CalendarDayProps {
  date: Date | null;
  rangePrimary: boolean;
  rangeSecondary: boolean;
  selectedPrimary: boolean;
  selectedSecondary: boolean;
  hoveredPrimary: boolean;
  hoveredSecondary: boolean;
  isCompare: boolean;
  differencePrimary: string | false;
  differenceSecondary: string | false;
  showSplit: boolean;
  splitIsSecondary: boolean;
  isToday: boolean;
  position: "start" | "middle" | "end";
  isOutsideMonth: boolean;
  isDisabled: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function CalendarDay({
  date,
  rangePrimary,
  rangeSecondary,
  selectedPrimary,
  selectedSecondary,
  hoveredPrimary,
  hoveredSecondary,
  isCompare,
  differencePrimary,
  differenceSecondary,
  showSplit,
  splitIsSecondary,
  isToday,
  isOutsideMonth,
  isDisabled,
  position,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CalendarDayProps) {
  if (!date) return <div className={styles.dayCell} />;

  return (
    <div
      className={clsx(
        styles.dayCell,
        styles[position],
        rangePrimary && styles.rangePrimary,
        rangeSecondary && styles.rangeSecondary,
        selectedPrimary && styles.selectedPrimary,
        selectedSecondary && styles.selectedSecondary,
        hoveredPrimary && styles.hoveredPrimary,
        hoveredSecondary && styles.hoveredSecondary,
        isCompare && styles.isCompare,
        differencePrimary && styles[differencePrimary],
        differenceSecondary && styles[differenceSecondary],
        isToday && styles.today,
        isOutsideMonth && styles.outsideMonth,
        isDisabled && styles.disabled,
      )}
      onClick={isDisabled ? undefined : onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="gridcell"
      aria-selected={selectedPrimary || selectedSecondary}
    >
      {showSplit && (
        <div className={styles.splitOverlay}>
          <div className={styles.halfPrimary} />
          <div
            className={
              splitIsSecondary
                ? styles.halfSecondary
                : styles.halfHover
            }
          />
        </div>
      )}
      <span className={styles.dayLabel}>{date.getDate()}</span>
    </div>
  );
}

// ─── CalendarDateDialog ───────────────────────────────────────────────────────

interface CalendarDateDialogProps {
  months: { label: string; value: number }[];
  currentMonth: number;
  currentYear: number;
  isOpen: boolean;
  header: RefObject<HTMLDivElement | null>;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
}

function CalendarDateDialog({
  months,
  currentMonth,
  currentYear,
  isOpen,
  header,
  onSelectMonth,
  onSelectYear,
}: CalendarDateDialogProps) {
  const [activePanel, setActivePanel] = useState<"month" | "year" | null>(
    "month",
  );
  const yearListRef = useRef<HTMLDivElement>(null);

  // Build year range: currentYear-10 to currentYear+10
  const yearRange: number[] = [];
  for (let y = currentYear - 10; y <= currentYear + 10; y++) {
    yearRange.push(y);
  }

  function getTop() {
    if (typeof header === "function") return 0;

    const current = header.current;
    return `${current ? current.scrollHeight : 0}px`;
  }

  // Scroll active year into view when year panel opens
  useEffect(() => {
    if (activePanel === "year" && yearListRef.current) {
      const activeEl = yearListRef.current.querySelector(
        `.${styles.yearActive}`,
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [activePanel]);

  return (
    <Card
      className={clsx(
        styles.dateDialog,
        isOpen ? styles.dialogEnter : styles.dialogLeave,
      )}
      style={{ top: getTop() }}
    >
      {/* Header with month/year toggle buttons */}
      <div className={styles.dialogHeader}>
        <button
          className={clsx(
            styles.headerToggle,
            activePanel === "month" && styles.headerToggleActive,
          )}
          onClick={() =>
            setActivePanel((prev) => (prev === "month" ? null : "month"))
          }
        >
          {months[currentMonth]?.label ?? ""}
        </button>
        <button
          className={clsx(
            styles.headerToggle,
            activePanel === "year" && styles.headerToggleActive,
          )}
          onClick={() =>
            setActivePanel((prev) => (prev === "year" ? null : "year"))
          }
        >
          {currentYear}
        </button>
      </div>

      {/* Month grid panel */}
      {activePanel === "month" && (
        <div className={styles.monthGrid}>
          {months.map((m) => (
            <button
              key={m.value}
              className={clsx(
                styles.monthButton,
                m.value === currentMonth && styles.monthActive,
              )}
              onClick={() => {
                onSelectMonth(m.value);
                setActivePanel(null);
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* Year list panel */}
      {activePanel === "year" && (
        <div className={styles.yearList} ref={yearListRef}>
          {yearRange.map((yr) => (
            <button
              key={yr}
              className={clsx(
                styles.yearButton,
                yr === currentYear && styles.yearActive,
              )}
              onClick={() => {
                onSelectYear(yr);
                setActivePanel(null);
              }}
            >
              {yr}
            </button>
          ))}
        </div>
      )}
    </Card>
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

function isDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
): boolean {
  const iso = date.toISOString().substring(0, 10);
  if (minDate && iso < minDate.toISOString().substring(0, 10)) return true;
  if (maxDate && iso > maxDate.toISOString().substring(0, 10)) return true;
  if (disabledDates?.some((d) => isSameDay(d, date))) return true;
  return false;
}

// Port of Vue Day.vue helper functions
function getDates(
  model: Date[] | Date[][],
  type: SelectionType,
  index: number,
): Date[] {
  if (!model) return [];
  if (type === "compare") return ((model as Date[][])[index] ?? []) as Date[];
  return model as Date[];
}

function isInRangeCheck(
  day: Date,
  model: Date[] | Date[][],
  type: SelectionType,
  index: number,
  isSelected: boolean,
): boolean {
  if (!model || (index > 0 && type !== "compare")) return false;
  const dates = getDates(model, type, index);
  if (
    dates.length > 1 &&
    dates[0] instanceof Date &&
    dates[1] instanceof Date
  ) {
    return isRange(dates[0], dates[1], day, isSelected);
  }
  return (
    isSelected &&
    dates[0] instanceof Date &&
    dates[0].toISOString().substring(0, 10) ===
      day.toISOString().substring(0, 10)
  );
}

function getHoveredCheck(
  day: Date,
  model: Date[] | Date[][],
  type: SelectionType,
  hovered: Date | null,
  index: number,
): boolean {
  if (!hovered || !model || type === "date") return false;
  if (index > 0) return false;
  const dates = getDates(model, type, index);
  return dates.length === 1 && isRange(dates[0], hovered, day);
}

function getDifferenceCheck(
  day: Date,
  model: Date[] | Date[][],
  type: SelectionType,
  hovered: Date | null,
  index: number,
): string | false {
  if (!model || type === "date") return false;
  const dates = getDates(model, type, index);

  const parsedDay = day.toISOString().substring(0, 10);
  let toCompare = hovered?.toISOString().substring(0, 10);
  const start = (dates[0] as Date)?.toISOString().substring(0, 10);

  if (dates.length > 1)
    toCompare = (dates[1] as Date)?.toISOString().substring(0, 10);
  if (start !== parsedDay && parsedDay !== toCompare) return false;

  if (toCompare === parsedDay) toCompare = start;
  if (!toCompare || !parsedDay) return false;

  if (parsedDay < toCompare) return "isBigger";
  if (parsedDay > toCompare) return "isSmaller";
  return false;
}

function getDayProps(
  date: Date,
  model: Date[] | Date[][],
  type: SelectionType,
  today: Date,
  hoveredDate: Date | null,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
) {
  const isToday = isSameDay(date, today);
  const isDisabled = isDateDisabled(date, minDate, maxDate, disabledDates);
  const isCompare = type !== "date";

  const rangePrimary = isInRangeCheck(date, model, type, 0, false);
  const rangeSecondary = isInRangeCheck(date, model, type, 1, false);
  const selectedPrimary = isInRangeCheck(date, model, type, 0, true);
  const selectedSecondary = isInRangeCheck(date, model, type, 1, true);
  const hoveredPrimary = getHoveredCheck(date, model, type, hoveredDate, 0);
  const hoveredSecondary = getHoveredCheck(date, model, type, hoveredDate, 1);
  const differencePrimary = getDifferenceCheck(
    date,
    model,
    type,
    hoveredDate,
    0,
  );
  const differenceSecondary = getDifferenceCheck(
    date,
    model,
    type,
    hoveredDate,
    1,
  );

  // Split overlay: matches Vue Day.vue condition
  const dates0 = getDates(model, type, 0);
  const dates1 = getDates(model, type, 1);
  const showSplit =
    type !== "date" &&
    selectedPrimary &&
    ((hoveredDate !== null &&
      isSameDay(hoveredDate, date) &&
      dates0.length > 1) ||
      selectedSecondary) &&
    (dates1.length < 2 || selectedSecondary);
  const splitIsSecondary = selectedSecondary;

  return {
    rangePrimary,
    rangeSecondary,
    selectedPrimary,
    selectedSecondary,
    hoveredPrimary,
    hoveredSecondary,
    isCompare,
    differencePrimary,
    differenceSecondary,
    showSplit,
    splitIsSecondary,
    isToday,
    isDisabled,
  };
}

// ─── Calendar (main) ──────────────────────────────────────────────────────────

// Extended Calendar type to support compound sub-components
interface CalendarComponent {
  (props: CalendarProps): React.JSX.Element;
  Day: typeof CalendarDay;
  DateDialog: typeof CalendarDateDialog;
}

function getInitialMonthYear(value?: Date | Date[] | [Date[], Date[]]): {
  month: number;
  year: number;
} {
  const today = new Date();
  if (!value) return { month: today.getMonth(), year: today.getFullYear() };
  if (value instanceof Date)
    return { month: value.getMonth(), year: value.getFullYear() };
  if (Array.isArray(value) && value.length > 0) {
    const first = Array.isArray(value[0])
      ? (value[0] as Date[])[0]
      : (value[0] as Date);
    if (first instanceof Date)
      return { month: first.getMonth(), year: first.getFullYear() };
  }
  return { month: today.getMonth(), year: today.getFullYear() };
}

export function Calendar({
  value,
  defaultValue,
  onChange,
  type = "date",
  doubleCalendar = false,
  minDate,
  maxDate,
  disabledDates,
  lang = "en",
  className,
}: CalendarProps): React.JSX.Element {
  const initial = getInitialMonthYear(value ?? defaultValue);
  const [currentMonth, setCurrentMonth] = useState(initial.month);
  const [currentYear, setCurrentYear] = useState(initial.year);
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const header = useRef<HTMLDivElement>(null);

  const isBackRef = useRef(false);
  const { isMounted: _gridMounted, isActive: _gridActive } = useTransition(
    transitionKey % 2 === 0,
    { duration: 300 },
  );

  // Internal model for uncontrolled usage
  const [internalModel, setInternalModel] = useState<Date[] | Date[][]>(() =>
    checkDateType(defaultValue as any, type),
  );

  // Controlled vs uncontrolled
  const model: Date[] | Date[][] =
    value !== undefined ? checkDateType(value as any, type) : internalModel;

  const today = new Date();
  const monthDate = new Date(currentYear, currentMonth, 1);
  const weeks = getArrayMonthDay(monthDate);
  const months = getMonths(lang);

  // Second calendar month (for doubleCalendar)
  const nextMonthNum = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYearNum = currentMonth === 11 ? currentYear + 1 : currentYear;
  const nextMonthDate = new Date(nextYearNum, nextMonthNum, 1);
  const nextWeeks = getArrayMonthDay(nextMonthDate);

  // Compute weekday headers
  const weekDays: string[] = [];
  const baseDate = new Date("2021-10-03T23:15:30");
  for (let i = 0; i < 7; i++) {
    const day = baseDate.toLocaleDateString(lang, { weekday: "short" });
    weekDays.push(day.charAt(0).toUpperCase() + day.charAt(1).toLowerCase());
    baseDate.setDate(baseDate.getDate() + 1);
  }

  const monthLabel = capitalizeFirstLetter(
    new Date(currentYear, currentMonth, 1).toLocaleDateString(lang, {
      year: "numeric",
      month: "long",
    }),
  );

  const nextMonthLabel = capitalizeFirstLetter(
    new Date(nextYearNum, nextMonthNum, 1).toLocaleDateString(lang, {
      year: "numeric",
      month: "long",
    }),
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

    if (type === "date") {
      newModel = [date];
    } else if (type === "period") {
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
      // compare mode — derive active range from model state (matches Vue behaviour)
      const ranges = model as Date[][];
      let range0 = [...(ranges[0] ?? [])];
      let range1 = [...(ranges[1] ?? [])];

      // Reset both ranges when second range is complete or first is missing
      if (!ranges[0] || range1.length > 1) {
        range0 = [];
        range1 = [];
      }

      // Determine which range to fill based on current state
      const rangeIdx = range0.length > 1 ? 1 : 0;
      const target = rangeIdx === 0 ? range0 : range1;

      // sortDate logic: add date to target range
      let sorted: Date[];
      if (target.length > 1 || target.length === 0) {
        sorted = [date];
      } else if (date < target[0]) {
        sorted = [date, target[0]];
      } else {
        sorted = [target[0], date];
      }

      if (rangeIdx === 0) {
        newModel = [sorted, range1];
      } else {
        newModel = [range0, sorted];
      }
    }

    if (value === undefined) {
      setInternalModel(newModel);
    }

    if (onChange) {
      console.log('aqui')
      if (type === "date") {
        onChange(date);
      } else {
        onChange(newModel);
      }
    }
  }

  function handleSelectMonth(month: number) {
    isBackRef.current = month < currentMonth;
    setTransitionKey((k) => k + 1);
    setCurrentMonth(month);
    setShowDateDialog(false);
  }

  function handleSelectYear(year: number) {
    isBackRef.current = year < currentYear;
    setTransitionKey((k) => k + 1);
    setCurrentYear(year);
    setShowDateDialog(false);
  }

  function getPosition(week: any[], index: number) {
    if (index === 0) return "start";
    else if (week.length - 1 === index) return "end";

    return "middle";
  }

  const animationClass = isBackRef.current
    ? styles["slide-fade-back"]
    : styles["slide-fade-forward"];

  function renderGrid(gridWeeks: any[], label: string) {
    return (
      <div role="grid" aria-label={label}>
        {/* Weekday headers */}
        <div className={styles.grid}>
          {weekDays.map((wd) => (
            <div key={wd} className={styles.weekdayHeader}>
              {wd}
            </div>
          ))}
        </div>

        {/* Day rows */}
        {gridWeeks
          .filter((week: any[]) => week.some((d: any) => d))
          .map((week: any[], weekIdx: number) => (
            <div key={weekIdx} className={styles.grid}>
              {week.map((day: Date | "", dayIdx: number) => {
                if (!day) {
                  return <div key={dayIdx} className={styles.noDate} />;
                }
                const props = getDayProps(
                  day,
                  model,
                  type,
                  today,
                  hoveredDate,
                  minDate,
                  maxDate,
                  disabledDates,
                );
                return (
                  <CalendarDay
                    key={dayIdx}
                    date={day}
                    position={getPosition(week, dayIdx)}
                    {...props}
                    isOutsideMonth={false}
                    onClick={() => handleDayClick(day)}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                  />
                );
              })}
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className={clsx(styles.calendar, 'calendar', doubleCalendar && styles.doubleCalendar, className)}>
      <div className={styles.header} ref={header}>
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
          {doubleCalendar ? `${monthLabel} – ${nextMonthLabel}` : monthLabel}
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
          header={header}
          months={months}
          currentMonth={currentMonth}
          currentYear={currentYear}
          isOpen={showDateDialog}
          onSelectMonth={handleSelectMonth}
          onSelectYear={handleSelectYear}
        />
      )}

      <div className={styles.slideContainer}>
        <div
          key={transitionKey}
          className={clsx(animationClass, doubleCalendar && styles.doubleGrid)}
        >
          {renderGrid(weeks, monthLabel)}
          {doubleCalendar && renderGrid(nextWeeks, nextMonthLabel)}
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
