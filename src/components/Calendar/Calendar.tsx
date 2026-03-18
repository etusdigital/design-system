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
  position: "start" | "middle" | "end";
  isOutsideMonth: boolean;
  isDisabled: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  rangeHover?: boolean;
  inSecondaryRange?: boolean;
  isSecondaryStart?: boolean;
  isSecondaryEnd?: boolean;
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
  position,
  onClick,
  onMouseEnter,
  onMouseLeave,
  rangeHover,
  inSecondaryRange,
  isSecondaryStart,
  isSecondaryEnd,
}: CalendarDayProps) {
  if (!date) return <div className={styles.dayCell} />;

  return (
    <div
      className={clsx(
        styles.dayCell,
        styles[position],
        selected && styles.selected,
        inRange && !isRangeStart && !isRangeEnd && styles.rangeMiddle,
        (isRangeStart || isRangeEnd) && styles.rangeStart,
        rangeHover && styles.rangeHover,
        inSecondaryRange && styles.inSecondaryRange,
        (isSecondaryStart || isSecondaryEnd) && styles.selectedSecondary,
        isToday && styles.today,
        isOutsideMonth && styles.outsideMonth,
        isDisabled && styles.disabled,
      )}
      onClick={isDisabled ? undefined : onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
  isOpen: boolean;
  header: RefObject<HTMLDivElement>;
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

  if (type === "date") {
    const selected =
      model.length > 0 &&
      model[0] instanceof Date &&
      isSameDay(model[0] as Date, date);
    return {
      selected,
      inRange: false,
      isRangeStart: false,
      isRangeEnd: false,
      rangeHover: false,
      inSecondaryRange: false,
      isSecondaryStart: false,
      isSecondaryEnd: false,
      isToday,
      isDisabled,
    };
  }

  // Helper: compute hover-preview highlight
  function computeHover(startDate: Date | undefined): boolean {
    if (!startDate || !hoveredDate) return false;
    const lo = startDate < hoveredDate ? startDate : hoveredDate;
    const hi = startDate < hoveredDate ? hoveredDate : startDate;
    return date >= lo && date <= hi;
  }

  if (type === "period") {
    const dates = model as Date[];
    const selected = dates.some((d) => d instanceof Date && isSameDay(d, date));
    const isRangeStart =
      dates.length >= 1 &&
      dates[0] instanceof Date &&
      isSameDay(dates[0], date);
    const isRangeEnd =
      dates.length >= 2 &&
      dates[1] instanceof Date &&
      isSameDay(dates[1], date);
    let inRange = false;
    if (
      dates.length === 2 &&
      dates[0] instanceof Date &&
      dates[1] instanceof Date
    ) {
      inRange = isRange(dates[0], dates[1], date);
    }
    // Hover preview only when exactly one date is selected (range in progress)
    const rangeHover =
      dates.length === 1 && !selected && computeHover(dates[0]);
    return {
      selected,
      inRange,
      isRangeStart,
      isRangeEnd,
      rangeHover,
      inSecondaryRange: false,
      isSecondaryStart: false,
      isSecondaryEnd: false,
      isToday,
      isDisabled,
    };
  }

  // compare mode — primary range (range0) and secondary range (range1)
  const ranges = model as Date[][];
  const range0 = ranges[0] ?? [];
  const range1 = ranges[1] ?? [];

  // Primary range
  const selected = range0.some((d) => d instanceof Date && isSameDay(d, date));
  const isRangeStart =
    range0.length >= 1 &&
    range0[0] instanceof Date &&
    isSameDay(range0[0], date);
  const isRangeEnd =
    range0.length >= 2 &&
    range0[1] instanceof Date &&
    isSameDay(range0[1], date);
  let inRange = false;
  if (
    range0.length === 2 &&
    range0[0] instanceof Date &&
    range0[1] instanceof Date
  ) {
    inRange = isRange(range0[0], range0[1], date);
  }

  // Hover preview: show when first range has 1 date and second range is empty
  const rangeHover =
    range0.length === 1 &&
    range1.length === 0 &&
    !selected &&
    computeHover(range0[0]);

  // Secondary range
  const isSecondaryStart =
    range1.length >= 1 &&
    range1[0] instanceof Date &&
    isSameDay(range1[0], date);
  const isSecondaryEnd =
    range1.length >= 2 &&
    range1[1] instanceof Date &&
    isSameDay(range1[1], date);
  let inSecondaryRange = false;
  if (
    range1.length === 2 &&
    range1[0] instanceof Date &&
    range1[1] instanceof Date
  ) {
    inSecondaryRange =
      isRange(range1[0], range1[1], date) &&
      !isSecondaryStart &&
      !isSecondaryEnd;
  }

  return {
    selected,
    inRange,
    isRangeStart,
    isRangeEnd,
    rangeHover,
    inSecondaryRange,
    isSecondaryStart,
    isSecondaryEnd,
    isToday,
    isDisabled,
  };
}

// ─── Calendar (main) ──────────────────────────────────────────────────────────

// Extended Calendar type to support compound sub-components
interface CalendarComponent {
  (props: CalendarProps): JSX.Element;
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
  minDate,
  maxDate,
  disabledDates,
  lang = "en",
  className,
}: CalendarProps): JSX.Element {
  const initial = getInitialMonthYear(value ?? defaultValue);
  const [currentMonth, setCurrentMonth] = useState(initial.month);
  const [currentYear, setCurrentYear] = useState(initial.year);
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);
  const [activeRangeIndex, setActiveRangeIndex] = useState(0);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const header = useRef<HTMLDivElement>(null);

  const isBackRef = useRef(false);
  const { isMounted: gridMounted, isActive: gridActive } = useTransition(
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
      // compare mode — route clicks to activeRangeIndex
      const ranges = model as Date[][];
      const range0 = [...(ranges[0] ?? [])];
      const range1 = [...(ranges[1] ?? [])];

      const activeIdx = activeRangeIndex;

      if (activeIdx === 0) {
        if (range0.length === 0 || range0.length >= 2) {
          // Start first range over
          newModel = [[date], range1];
          setActiveRangeIndex(0);
        } else {
          // Complete first range
          const [start] = range0;
          const completedRange0 = date < start ? [date, start] : [start, date];
          newModel = [completedRange0, range1];
          setActiveRangeIndex(1);
        }
      } else {
        // Routing to range1
        if (range1.length === 0 || range1.length >= 2) {
          // Start second range over
          newModel = [range0, [date]];
          setActiveRangeIndex(1);
        } else {
          // Complete second range
          const [start] = range1;
          const completedRange1 = date < start ? [date, start] : [start, date];
          newModel = [range0, completedRange1];
          // Both ranges complete — next click resets to range0
          setActiveRangeIndex(0);
        }
      }
    }

    if (value === undefined) {
      setInternalModel(newModel);
    }

    if (onChange) {
      if (type === "date") {
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

  function getPosition(week: any[], index: number) {
    if (index === 0) return "start";
    else if (week.length - 1 === index) return "end";

    return "middle";
  }

  const animationClass = isBackRef.current
    ? styles["slide-fade-back"]
    : styles["slide-fade-forward"];

  return (
    <div className={clsx(styles.calendar, className)}>
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
      </div>
    </div>
  );
}

// Attach compound sub-components
(Calendar as unknown as CalendarComponent).Day = CalendarDay;
(Calendar as unknown as CalendarComponent).DateDialog = CalendarDateDialog;

// Re-export sub-components for direct use
export { CalendarDay, CalendarDateDialog };
