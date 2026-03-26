import { useState, useRef, useEffect, Children, isValidElement } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { isNilAndBlank, applyMask } from '../../utils/index';
import { Label } from '../../utils/components/Label';
import { Tooltip } from '../Tooltip/Tooltip';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import styles from './TagInput.module.css';

const ERROR_MESSAGES = {
  DUPLICATE: 'Duplicated values are not allowed',
  INVALID_INPUT: 'Please provide a valid input',
  MAX_VALUES: 'Max number of values reached',
};

export interface TagInputProps {
  value?: any[];
  defaultValue?: any[];
  onChange?: (value: any[]) => void;
  labelValue?: string;
  errorMessage?: string;
  infoMessage?: string;
  disabled?: boolean;
  required?: boolean;
  allowDuplicate?: boolean;
  max?: number;
  isError?: boolean;
  placeholder?: string;
  mask?: 'cpf' | 'cnpj' | 'cep' | 'domain' | 'url' | 'email';
  icon?: string;
  appendIcon?: boolean;
  tooltipMinWidth?: number;
  children?: React.ReactNode;
  className?: string;
}

function PrependIcon({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AppendIcon({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Hint({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function TagInput({
  value,
  defaultValue,
  onChange,
  labelValue,
  errorMessage,
  infoMessage,
  disabled = false,
  required = false,
  allowDuplicate = false,
  max,
  isError = false,
  placeholder = '',
  mask,
  icon,
  appendIcon = false,
  tooltipMinWidth,
  children,
  className,
}: TagInputProps) {
  const [tags, setTags] = useControllable<any[]>({
    value,
    defaultValue: defaultValue ?? [],
    onChange,
  });

  const [newTag, setNewTag] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(errorTimerRef.current);
  }, []);

  function showError(msg: string) {
    setHasError(true);
    setErrorMsg(msg);
    clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => {
      setHasError(false);
      setErrorMsg('');
    }, 2000);
  }

  function addTag(rawValue: string) {
    const trimmed = rawValue.trim();
    if (isNilAndBlank(trimmed)) return;

    if (mask) {
      const masked = applyMask(trimmed, mask);
      if (masked !== trimmed) {
        showError(ERROR_MESSAGES.INVALID_INPUT);
        return;
      }
    }

    const currentTags = tags ?? [];

    if (!allowDuplicate && currentTags.includes(trimmed)) {
      showError(ERROR_MESSAGES.DUPLICATE);
      return;
    }

    if (max !== undefined && currentTags.length >= max) {
      showError(ERROR_MESSAGES.MAX_VALUES);
      return;
    }

    setTags([...currentTags, trimmed]);
    setNewTag('');
  }

  function removeTag(index: number) {
    if (newTag !== '') return;
    setTags((tags ?? []).filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addTag(newTag);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (newTag) addTag(newTag);
    } else if (e.key === 'Backspace' && newTag === '') {
      const currentTags = tags ?? [];
      removeTag(currentTags.length - 1);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    const newItems = text
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (newItems.length === 0) return;

    const currentTags = tags ?? [];
    const toAdd: string[] = [];

    for (const item of newItems) {
      if (isNilAndBlank(item)) continue;
      if (mask) {
        const masked = applyMask(item, mask);
        if (masked !== item) continue;
      }
      const workingList = [...currentTags, ...toAdd];
      if (!allowDuplicate && workingList.includes(item)) continue;
      if (max !== undefined && workingList.length >= max) break;
      toAdd.push(item);
    }

    if (toAdd.length > 0) {
      setTags([...currentTags, ...toAdd]);
      setNewTag('');
    }
  }

  // Extract compound children
  let prependIconChild: React.ReactNode = null;
  let appendIconChild: React.ReactNode = null;
  let hintChild: React.ReactNode = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const childProps = child.props as Record<string, unknown>;
      if (child.type === PrependIcon) prependIconChild = childProps.children as React.ReactNode;
      else if (child.type === AppendIcon) appendIconChild = childProps.children as React.ReactNode;
      else if (child.type === Hint) hintChild = childProps.children as React.ReactNode;
    }
  });

  const currentTags = tags ?? [];

  return (
    <div className={clsx(styles.tagInput, 'tag-input', className)}>
      {labelValue && (
        <div className={styles.labelRow}>
          <Label
            labelValue={labelValue}
            infoMessage={infoMessage}
            tooltipMinWidth={tooltipMinWidth}
            required={required}
          />
          {max !== undefined && max > 0 && (
            <span className="text-neutral-foreground-low font-bold text-xs">
              {currentTags.length} / {max}
            </span>
          )}
        </div>
      )}

      <div
        className={clsx(
          styles.container,
          isFocused && !disabled && styles.focused,
          (isError || hasError) && styles.error,
          disabled && styles.disabled,
          hasError && styles.shake
        )}
        onClick={() => textareaRef.current?.focus()}
      >
        {/* Prepend icon */}
        {prependIconChild
          ? prependIconChild
          : icon && !appendIcon && (
              <span className="material-symbols-rounded text-neutral-interaction-default">
                {icon}
              </span>
            )}

        {/* Tags */}
        {currentTags.map((tag, index) => (
          <Tooltip key={index} className="max-w-full">
            <Tooltip.Label>
              <div className="max-w-[100%]">
                <span className="whitespace-normal break-all">{String(tag)}</span>
              </div>
            </Tooltip.Label>
            <StatusBadge
              labelValue={String(tag)}
              color="neutral"
              closeable
              onClose={() => removeTag(index)}
              className="py-xxs"
            />
          </Tooltip>
        ))}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          rows={1}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={currentTags.length === 0 ? placeholder : ''}
          disabled={disabled}
        />

        {/* Append icon */}
        {appendIconChild
          ? appendIconChild
          : appendIcon && icon && (
              <span className="material-symbols-rounded text-neutral-interaction-default">
                {icon}
              </span>
            )}
      </div>

      {/* Hint */}
      {hintChild && (
        <label className="text-neutral-foreground-low text-sm">{hintChild}</label>
      )}

      {/* Error message */}
      {(isError || hasError) && (
        <p className={styles.errorMessage}>{errorMsg || errorMessage}</p>
      )}
    </div>
  );
}

TagInput.PrependIcon = PrependIcon;
TagInput.AppendIcon = AppendIcon;
TagInput.Hint = Hint;
