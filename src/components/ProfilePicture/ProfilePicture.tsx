import { Fragment, useState, useRef, useId } from 'react';
import clsx from 'clsx';
import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import { FloatCard } from '../FloatCard/FloatCard';
import { Separator } from '../Separator/Separator';
import { useControllable } from '../../hooks/useControllable';
import {
  focusByArrowKey,
  focusWhenReady,
  getFocusableItems,
  isObject,
} from '../../utils/index';
import styles from './ProfilePicture.module.css';

export type Color =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

export interface ProfilePictureOption {
  label?: string;
  value?: any;
  icon?: string;
  image?: string;
  color?: Color;
  disabled?: boolean;
  items?: ProfilePictureOption[];
  action?: (option: ProfilePictureOption, item?: ProfilePictureOption) => void;
  [key: string]: any;
}

export interface ProfilePictureProps {
  value?: Record<string, any>;
  onChange?: (value: Record<string, any>) => void;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  name?: string;
  description?: string;
  picture?: string;
  options?: ProfilePictureOption[];
  labelKey?: string;
  valueKey?: string;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  renderTrigger?: (expanded: boolean) => React.ReactNode;
  renderHeader?: (params: {
    name?: string;
    description?: string;
    picture?: string;
  }) => React.ReactNode;
  renderOption?: (params: {
    option: ProfilePictureOption;
    selectedItem?: ProfilePictureOption;
  }) => React.ReactNode;
  renderItem?: (params: {
    option: ProfilePictureOption;
    item: ProfilePictureOption;
    selected: boolean;
  }) => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  onSelect?: (option: ProfilePictureOption, item?: ProfilePictureOption) => void;
}

export function ProfilePicture({
  value,
  onChange,
  expanded,
  onExpandedChange,
  name = '',
  description = '',
  picture = '',
  options = [],
  labelKey = 'label',
  valueKey = 'value',
  disabled = false,
  ariaLabel,
  className,
  renderTrigger,
  renderHeader,
  renderOption,
  renderItem,
  renderFooter,
  onSelect,
}: ProfilePictureProps) {
  const [model, setModel] = useControllable<Record<string, any>>({
    value,
    defaultValue: {},
    onChange,
  }) as [Record<string, any>, (value: Record<string, any>) => void];

  const [expandedModel, setExpandedModel] = useControllable<boolean>({
    value: expanded,
    defaultValue: false,
    onChange: onExpandedChange,
  }) as [boolean, (value: boolean) => void];

  const [openItems, setOpenItems] = useState<any>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const handleExpandedChange = (isOpen: boolean) => {
    if (disabled && isOpen) return;
    setExpandedModel(isOpen);
    if (isOpen) {
      focusWhenReady(() => getMenuItems()[0]);
    } else {
      setOpenItems(null);
    }
  };

  function getLabel(option: ProfilePictureOption): string {
    return isObject(option) ? String(option[labelKey] ?? '') : String(option ?? '');
  }

  function getValue(option: ProfilePictureOption): any {
    return isObject(option) ? option[valueKey] ?? getLabel(option) : option;
  }

  function getSelectedItem(option: ProfilePictureOption): ProfilePictureOption | undefined {
    const selected = model?.[getValue(option)];
    return option.items?.find((item) => getValue(item) === selected);
  }

  function getMenuItems(): HTMLElement[] {
    return getFocusableItems(menuRef.current, '[data-profile-item]');
  }

  function getGroup(value: any): HTMLElement | null {
    return menuRef.current?.querySelector<HTMLElement>(
      `[data-profile-parent="${CSS.escape(String(value))}"]`
    ) ?? null;
  }

  function getParentRow(value: any): HTMLElement | null {
    return menuRef.current?.querySelector<HTMLElement>(
      `[data-profile-option="${CSS.escape(String(value))}"]`
    ) ?? null;
  }

  function toggleItems(option: ProfilePictureOption) {
    const value = getValue(option);
    setOpenItems(openItems === value ? null : value);
  }

  function openItemsAndFocus(option: ProfilePictureOption) {
    const value = getValue(option);
    setOpenItems(value);
    focusWhenReady(() =>
      getGroup(value)?.querySelector<HTMLElement>('[data-profile-item]')
    );
  }

  function selectOption(option: ProfilePictureOption) {
    if (option.disabled) return;
    if (option.items?.length) {
      toggleItems(option);
      return;
    }

    option.action?.(option);
    onSelect?.(option);
    closeAndFocusTrigger();
  }

  function selectItem(option: ProfilePictureOption, item: ProfilePictureOption) {
    if (option.disabled || item.disabled) return;

    const newValue = getValue(option);
    const newItemValue = getValue(item);
    setModel({ ...model, [newValue]: newItemValue });
    option.action?.(option, item);
    onSelect?.(option, item);
  }

  function closeAndFocusTrigger() {
    setExpandedModel(false);
    setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0);
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) {
      return;
    }

    event.preventDefault();
    setExpandedModel(true);
    focusWhenReady(() => {
      const items = getMenuItems();
      return event.key === 'ArrowDown' ? items[0] : items[items.length - 1];
    });
  }

  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const items = getMenuItems();
    const index = items.indexOf(target);

    if (event.key === 'Tab') {
      const leaving = event.shiftKey ? index === 0 : index === items.length - 1;
      if (!leaving) return;
      event.preventDefault();
      closeAndFocusTrigger();
      return;
    }

    const parentValue = target.dataset.profileOption;
    const parent = options.find((o) => String(getValue(o)) === parentValue);
    const group = target.closest<HTMLElement>('[data-profile-parent]');

    if (event.key === 'ArrowRight' && parent && !parent.disabled) {
      event.preventDefault();
      openItemsAndFocus(parent);
      return;
    }

    if (
      event.key === 'ArrowLeft' &&
      parent &&
      openItems === getValue(parent)
    ) {
      event.preventDefault();
      setOpenItems(null);
      return;
    }

    if (event.key === 'ArrowLeft' && group) {
      event.preventDefault();
      const value = group.dataset.profileParent;
      setOpenItems(null);
      setTimeout(() => getParentRow(value)?.focus());
      return;
    }

    focusByArrowKey(event, items, 'vertical', { loop: true });
  }

  const showHeader = !!(name || description || picture);

  const card = (
    <div className={styles.profilePictureCard}>
      {renderHeader ? (
        renderHeader({ name, description, picture })
      ) : showHeader ? (
        <>
          <div className={styles.profilePictureHeader}>
            <Avatar name={name} src={picture} aria-hidden="true" />
            <div className={styles.profilePictureInfo}>
              {name && (
                <span className={styles.profilePictureName}>{name}</span>
              )}
              {description && (
                <span className={styles.profilePictureDescription}>
                  {description}
                </span>
              )}
            </div>
          </div>
        </>
      ) : null}

      {(showHeader || renderHeader) && options.length > 0 && <Separator className="my-xs" />}

      <div
        id={`${id}-menu`}
        ref={menuRef}
        role="menu"
        aria-label={ariaLabel || name || 'Profile menu'}
        onKeyDown={handleMenuKeyDown}
      >
        {options.map((option) => (
          <Fragment key={getValue(option)}>
            <div
              className={clsx(
                styles.profilePictureOption,
                option.color && styles[option.color],
                option.disabled && styles.disabled
              )}
              role="menuitem"
              tabIndex={0}
              data-profile-item
              data-profile-option={
                option.items?.length ? String(getValue(option)) : undefined
              }
              aria-disabled={option.disabled || undefined}
              aria-expanded={
                option.items?.length ? openItems === getValue(option) : undefined
              }
              aria-label={
                getSelectedItem(option)
                  ? `${getLabel(option)}: ${getLabel(
                      getSelectedItem(option)!
                    )}`
                  : undefined
              }
              onClick={() => selectOption(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  selectOption(option);
                }
              }}
            >
              {renderOption ? (
                renderOption({
                  option,
                  selectedItem: getSelectedItem(option),
                })
              ) : (
                <>
                  {(getSelectedItem(option) ?? option).image && (
                    <img
                      src={(getSelectedItem(option) ?? option).image!}
                      alt=""
                      className={styles.profilePictureImage}
                    />
                  )}
                  {!((getSelectedItem(option) ?? option).image) &&
                    (getSelectedItem(option) ?? option).icon && (
                      <Icon
                        name={
                          (getSelectedItem(option) ?? option).icon!
                        }
                      />
                    )}
                  <span className="flex-1 truncate">
                    {getLabel(getSelectedItem(option) ?? option)}
                  </span>
                </>
              )}
              {!!option.items?.length && (
                <Icon
                  name="chevron_right"
                  className={clsx(
                    styles.profilePictureChevron,
                    openItems === getValue(option) && styles.rotated
                  )}
                />
              )}
            </div>

            {!!option.items?.length && openItems === getValue(option) && (
              <div
                className={styles.profilePictureItems}
                role="group"
                aria-label={getLabel(option)}
                data-profile-parent={String(getValue(option))}
              >
                {option.items.map((item) => (
                  <div
                    key={getValue(item)}
                    className={clsx(
                      styles.profilePictureOption,
                      getSelectedItem(option) === item &&
                        styles.selected,
                      item.disabled && styles.disabled
                    )}
                    role="menuitemradio"
                    tabIndex={0}
                    data-profile-item
                    aria-checked={getSelectedItem(option) === item}
                    aria-disabled={item.disabled || undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectItem(option, item);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        selectItem(option, item);
                      }
                    }}
                  >
                    {renderItem ? (
                      renderItem({
                        option,
                        item,
                        selected: getSelectedItem(option) === item,
                      })
                    ) : (
                      <>
                        {item.image && (
                          <img
                            src={item.image}
                            alt=""
                            className={styles.profilePictureImage}
                          />
                        )}
                        {!item.image && item.icon && (
                          <Icon name={item.icon} />
                        )}
                        <span className="flex-1 truncate">
                          {getLabel(item)}
                        </span>
                      </>
                    )}
                    {getSelectedItem(option) === item && (
                      <Icon name="check" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {renderFooter && renderFooter()}
    </div>
  );

  return (
    <FloatCard
      value={expandedModel}
      onChange={handleExpandedChange}
      disabled={disabled}
      manualFocus
      card={card}
      className={clsx(styles.profilePicture, className)}
    >
      <div
        ref={triggerRef}
        className={clsx(styles.profilePictureTrigger, disabled && styles.disabled)}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="menu"
        aria-expanded={expandedModel}
        aria-controls={expandedModel ? `${id}-menu` : undefined}
        aria-label={ariaLabel || name || 'Profile menu'}
        aria-disabled={disabled || undefined}
        onKeyDown={handleTriggerKeyDown}
      >
        {renderTrigger ? (
          renderTrigger(expandedModel)
        ) : (
          <>
            <Avatar name={name} src={picture} aria-hidden="true" />
            <Icon
              name="arrow_drop_down"
              className={clsx(
                styles.profilePictureArrow,
                expandedModel && styles.rotated
              )}
            />
          </>
        )}
      </div>
    </FloatCard>
  );
}

