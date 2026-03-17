import { useState } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks';
import { checkDateType } from '../../utils';
import { ExpandableContainer } from '../../utils/components/ExpandableContainer';
import { Calendar } from '../Calendar/Calendar';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import styles from './DatePicker.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type SelectionType = 'date' | 'period' | 'compare';

export interface DatePickerProps {
  value?: Date | Date[] | [Date[], Date[]];
  defaultValue?: Date | Date[] | [Date[], Date[]];
  onChange?: (value: any) => void;
  type?: SelectionType;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabled?: boolean;
  labelValue?: string;
  isError?: boolean;
  errorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  clearLabel?: string;
  applyLabel?: string;
  compareLabel?: string;
  lang?: string;
  onApply?: (value: any) => void;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(date: Date, lang: string): string {
  return date.toLocaleDateString(lang, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

function getAnd(lang: string): string {
  return lang.includes('pt') ? 'e' : 'and';
}

function buildDisplayLabel(
  value: Date | Date[] | [Date[], Date[]] | undefined,
  type: SelectionType,
  lang: string
): string {
  if (!value) return '';

  const model = checkDateType(value as any, type);

  if (type === 'compare') {
    const ranges = model as Date[][];
    const range0 = ranges[0] ?? [];
    const range1 = ranges[1] ?? [];

    if (range1.length > 0) {
      const r0 =
        formatDate(range0[0], lang) +
        (range0[1] ? ' - ' + formatDate(range0[1], lang) : '');
      const r1 =
        formatDate(range1[0], lang) +
        (range1[1] ? ' - ' + formatDate(range1[1], lang) : '');
      return `${r0} ${getAnd(lang)} ${r1}`;
    } else if (range0.length > 0) {
      return (
        formatDate(range0[0], lang) +
        (range0[1] ? ' - ' + formatDate(range0[1], lang) : '')
      );
    }
    return '';
  }

  const dates = model as Date[];
  if (dates.length === 0) return '';

  const label =
    formatDate(dates[0], lang) +
    (dates[1] && type !== 'date' ? ' - ' + formatDate(dates[1], lang) : '');
  return label;
}

// ─── DatePicker ───────────────────────────────────────────────────────────────

export function DatePicker({
  value,
  defaultValue,
  onChange,
  type = 'date',
  minDate,
  maxDate,
  disabledDates,
  disabled = false,
  labelValue = '',
  isError = false,
  errorMessage = '',
  infoMessage = '',
  required = false,
  clearLabel = 'Clear selection',
  applyLabel = 'Apply filters',
  compareLabel = 'Compare dates',
  lang = 'en',
  onApply,
  className,
}: DatePickerProps) {
  const [controlledValue, setControlledValue] = useControllable<
    Date | Date[] | [Date[], Date[]] | undefined
  >({
    value,
    defaultValue,
    onChange,
  });

  // Working copy — the in-progress selection while the picker is open
  const [workingValue, setWorkingValue] = useState<
    Date | Date[] | [Date[], Date[]] | undefined
  >(controlledValue);

  const [expanded, setExpanded] = useState(false);

  const displayLabel = buildDisplayLabel(controlledValue, type, lang);

  function handleExpand(isOpen: boolean) {
    if (isOpen) {
      // Copy current value to working copy when opening
      setWorkingValue(controlledValue);
    }
    setExpanded(isOpen);
  }

  function handleCalendarChange(newValue: any) {
    setWorkingValue(newValue);
  }

  function handleClear() {
    setWorkingValue(undefined);
    setControlledValue(undefined as any);
  }

  function handleApply() {
    setControlledValue(workingValue as any);
    setExpanded(false);
    onApply?.(workingValue);
  }

  const triggerContent = (
    <div
      className={clsx(
        'flex items-center text-lg h-xl text-neutral-interaction-default',
        {
          expanded,
          error: isError,
          disabled,
        }
      )}
    >
      <Icon name="calendar_month" />
      <h5 className={clsx('whitespace-nowrap ml-xs', { 'font-bold': expanded })}>
        <span className={styles.displayLabel}>
          {displayLabel || labelValue || '\u00A0'}
        </span>
      </h5>
    </div>
  );

  const cardContent = (
    <div className={clsx('bg-neutral-surface-default shadow-neutral-selected border-xxs border-neutral-default rounded-sm', styles.datePickerCard)}>
      {/* Compare toggle */}
      {type === 'compare' && (
        <div className={styles.compareToggle}>
          <span className="text-sm text-neutral-foreground-default">{compareLabel}</span>
        </div>
      )}

      {/* Calendar */}
      <Calendar
        value={workingValue}
        onChange={handleCalendarChange}
        type={type}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        lang={lang}
      />

      {/* Actions */}
      <div className={styles.actions}>
        <Button size="small" variant="plain" color="neutral" onClick={handleClear}>
          {clearLabel}
        </Button>
        <Button size="small" variant="default" color="primary" onClick={handleApply}>
          {applyLabel}
        </Button>
      </div>
    </div>
  );

  return (
    <ExpandableContainer
      value={expanded}
      onChange={(val) => handleExpand(val)}
      disabled={disabled}
      isError={isError}
      errorMessage={errorMessage}
      infoMessage={infoMessage}
      required={required}
      hideArrow
      disableLabelAutoWidth
      card={cardContent}
      className={clsx('date-picker', className)}
    >
      {triggerContent}
    </ExpandableContainer>
  );
}
