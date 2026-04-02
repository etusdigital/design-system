import { useEffect, useState } from 'react';
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
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  options?: Array<{ label: string; value: string | [string, string]; selected?: boolean; calculate?: () => Date[] }>;
  hideActions?: boolean;
  onClear?: () => void;
  onTypeChange?: (type: SelectionType) => void;
  className?: string;
  children?: React.ReactNode;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(date: Date, lang: string): string {
  return new Date(date).toLocaleDateString(lang, {
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
  expanded,
  onExpandedChange,
  options,
  hideActions = false,
  onClear,
  onTypeChange,
  className,
  children,
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

  const [controlledType, setControlledType] = useControllable<SelectionType>({
    value: type,
    defaultValue: type,
    onChange: onTypeChange,
  });

  const [isOpen, setIsOpen] = useControllable<boolean>({
    value: expanded,
    defaultValue: false,
    onChange: onExpandedChange,
  });

  // Track which preset option is selected
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // Compare/range mode toggle for allowChangeType
  const [isMulti, setIsMulti] = useState(isCompare || controlledType === 'compare');

  const displayLabel = buildDisplayLabel(controlledValue, controlledType!, lang, separator);

  useEffect(() => {
    setWorkingValue(controlledValue)
  }, [controlledValue])

  function handleExpand(isOpenVal: boolean) {
    if (isOpenVal) {
      // Copy current value to working copy when opening
      setWorkingValue(controlledValue);
    }
    setIsOpen(isOpenVal);
  }

  function handleCalendarChange(newValue: any) {
    setControlledValue(newValue);
    setSelectedPreset(null);
  }

  function handleClear() {
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
    setControlledType(newIsMulti ? 'compare' : 'period');
    console.log(newIsMulti, type, controlledType)
    setWorkingValue(controlledValue);
    console.log(value, controlledValue, workingValue)
  }

  const triggerContent = (
    <div
      className={clsx(
        'flex items-center text-lg text-neutral-interaction-default',
        {
          expanded: isOpen,
          error: isError,
          disabled,
        }
      )}
    >
      <Icon name="calendar_month" className={styles.calendarIcon} />
      <h5 className={clsx('whitespace-nowrap ml-xs', { 'font-bold': isOpen })}>
        <span className={styles.displayLabel}>
          {displayLabel || children || '\u00A0'}
        </span>
      </h5>
    </div>
  );

  const hasPresetSidebar = ((options && options.length) || allowChangeType) && controlledType != "date";

  const cardContent = (
    <div>
      <div className="flex">
        {/* Preset options sidebar */}
        {hasPresetSidebar && (
          <div className={styles.presetSidebar}>
            <div className="flex flex-col">
              {options && options.map((opt, i) => (
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

        <div className="flex flex-col items-end gap-base relative overflow-hidden flex-1">
          {/* Calendar */}
          <div className="px-sm pt-xxs w-full">
            <Calendar
              value={workingValue}
              onChange={handleCalendarChange}
              type={controlledType}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              lang={lang}
            />
          </div>

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
      card={cardContent}
      className={clsx('date-picker', className)}
      labelValue={labelValue}
    >
      {triggerContent}
    </ExpandableContainer>
  );
}
