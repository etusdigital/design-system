import { useState } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks';
import { checkDateType } from '../../utils';
import { ExpandableContainer } from '../../utils/components/ExpandableContainer';
import { Calendar } from '../Calendar/Calendar';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
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
  // ── New props matching Vue source ──────────────────────────────────────────
  separator?: string;
  isCompare?: boolean;
  allowChangeType?: boolean;
  absolute?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  alignRight?: boolean;
  options?: Array<{ label: string; value: string | [string, string]; calculate?: () => Date[] }>;
  hideActions?: boolean;
  onClear?: () => void;
  onTypeChange?: (type: 'single' | 'range') => void;
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
  lang: string,
  separator?: string
): string {
  if (!value) return '';

  const model = checkDateType(value as any, type);

  if (type === 'compare') {
    const ranges = model as Date[][];
    const range0 = ranges[0] ?? [];
    const range1 = ranges[1] ?? [];

    if (range1.length > 0) {
      const sep = separator ?? getAnd(lang);
      const r0 =
        formatDate(range0[0], lang) +
        (range0[1] ? ' - ' + formatDate(range0[1], lang) : '');
      const r1 =
        formatDate(range1[0], lang) +
        (range1[1] ? ' - ' + formatDate(range1[1], lang) : '');
      return `${r0} ${sep} ${r1}`;
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
  separator,
  isCompare = false,
  allowChangeType = false,
  absolute,
  expanded,
  onExpandedChange,
  alignRight = false,
  options,
  hideActions = false,
  onClear,
  onTypeChange,
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

  const [isOpen, setIsOpen] = useControllable<boolean>({
    value: expanded,
    defaultValue: false,
    onChange: onExpandedChange,
  });

  // Track which preset option is selected
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // Compare/range mode toggle for allowChangeType
  const [isMulti, setIsMulti] = useState(isCompare || type === 'compare');

  const displayLabel = buildDisplayLabel(controlledValue, type, lang, separator);

  function handleExpand(isOpenVal: boolean) {
    if (isOpenVal) {
      // Copy current value to working copy when opening
      setWorkingValue(controlledValue);
    }
    setIsOpen(isOpenVal);
  }

  function handleCalendarChange(newValue: any) {
    setWorkingValue(newValue);
    setSelectedPreset(null);
  }

  function handleClear() {
    setWorkingValue(undefined);
    setControlledValue(undefined as any);
    setSelectedPreset(null);
    onClear?.();
  }

  function handleApply() {
    setControlledValue(workingValue as any);
    setIsOpen(false);
    onApply?.(workingValue);
  }

  function handlePresetSelect(
    opt: { label: string; value: string | [string, string]; calculate?: () => Date[] }
  ) {
    setSelectedPreset(opt.label);
    if (opt.calculate) {
      const dates = opt.calculate();
      setWorkingValue(dates);
      setControlledValue(dates as any);
    }
  }

  function isPresetSelected(
    opt: { label: string; value: string | [string, string] }
  ): boolean {
    return selectedPreset === opt.label;
  }

  function handleChangeType(checked: boolean | null) {
    const newIsMulti = !!checked;
    setIsMulti(newIsMulti);
    onTypeChange?.(newIsMulti ? 'range' : 'single');
  }

  const triggerContent = (
    <div
      className={clsx(
        'flex items-center text-lg h-xl text-neutral-interaction-default',
        {
          expanded: isOpen,
          error: isError,
          disabled,
        }
      )}
    >
      <Icon name="calendar_month" />
      <h5 className={clsx('whitespace-nowrap ml-xs', { 'font-bold': isOpen })}>
        <span className={styles.displayLabel}>
          {displayLabel || labelValue || '\u00A0'}
        </span>
      </h5>
    </div>
  );

  const hasPresetSidebar = options && options.length > 0 && type !== 'date';

  const cardContent = (
    <div
      className={clsx(
        'bg-neutral-surface-default shadow-neutral-selected border-xxs border-neutral-default rounded-sm',
        styles.datePickerCard
      )}
    >
      {/* Compare toggle */}
      {type === 'compare' && (
        <div className={styles.compareToggle}>
          <span className="text-sm text-neutral-foreground-default">{compareLabel}</span>
        </div>
      )}

      <div className="flex">
        {/* Preset options sidebar */}
        {hasPresetSidebar && (
          <div className={styles.presetSidebar}>
            <div className="flex flex-col">
              {options!.map((opt, i) => (
                <button
                  key={i}
                  className={clsx(
                    styles.presetOption,
                    isPresetSelected(opt) && styles.presetActive
                  )}
                  onClick={() => handlePresetSelect(opt)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {allowChangeType && (
              <div className="px-xs py-sm">
                <Checkbox
                  value={isMulti}
                  onChange={handleChangeType}
                >
                  {compareLabel}
                </Checkbox>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col items-end gap-base relative overflow-hidden">
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
          {!hideActions && (
            <div className={styles.actions}>
              <Button size="small" variant="plain" color="neutral" onClick={handleClear}>
                {clearLabel}
              </Button>
              <Button size="small" variant="default" color="primary" onClick={handleApply}>
                {applyLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <ExpandableContainer
      value={isOpen}
      onChange={(val) => handleExpand(val)}
      disabled={disabled}
      isError={isError}
      errorMessage={errorMessage}
      infoMessage={infoMessage}
      required={required}
      hideArrow
      disableLabelAutoWidth
      absolute={absolute}
      alignRight={alignRight}
      card={cardContent}
      className={clsx('date-picker', className)}
    >
      {triggerContent}
    </ExpandableContainer>
  );
}
