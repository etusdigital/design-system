import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { useControllable } from '../../hooks/useControllable';
import styles from './Profile.module.css';
import { isObject } from '#utils/index';

export interface ProfileOption {
  [key: string]: any;
}

export interface ProfileProps {
  value?: any;
  onChange?: (value: any) => void;
  name: string;
  picture?: string;
  options?: ProfileOption[];
  labelKey?: string;
  valueKey?: string;
  absolute?: boolean;
  disabled?: boolean;
  getObject?: boolean;
  className?: string;
  editLabel?: React.ReactNode;
  editOptionLabel?: React.ReactNode;
  logoutLabel?: React.ReactNode;
  privacyPolicyLabel?: React.ReactNode;
  termsOfUseLabel?: React.ReactNode;
  onLogout?: () => void;
  onEdit?: () => void;
  onEditOption?: () => void;
  onPrivacyPolicy?: () => void;
  onTermsOfUse?: () => void;
  renderOption?: (params: { option: ProfileOption; index: number; active: boolean }) => React.ReactNode;
}

export function Profile({
  value,
  onChange,
  name,
  picture,
  options = [],
  labelKey = 'label',
  valueKey = 'value',
  absolute = false,
  disabled = false,
  getObject = false,
  className,
  editLabel = 'Edit profile',
  editOptionLabel = 'Edit account',
  logoutLabel = 'Logout',
  privacyPolicyLabel = 'Privacy Policy',
  termsOfUseLabel = 'Terms of use',
  onLogout,
  onEdit,
  onEditOption,
  onPrivacyPolicy,
  onTermsOfUse,
  renderOption,
}: ProfileProps) {
  const [model, setModel] = useControllable<unknown>({
    value,
    onChange,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [onFocusInput, setOnFocusInput] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  function getLabel(option: any): string {
    return isObject(option) ? String(option[labelKey] ?? '') : String(option ?? '');
  }

  function getValue(option: any): any {
    return isObject(option) ? option[valueKey] : option;
  }

  const selected = options.find(
    (option) => String(getValue(option)) === String(getValue(model))
  );

  const filteredOptions = searchValue
    ? options.filter((option) =>
        getLabel(option).toLowerCase().includes(searchValue.toLowerCase())
      )
    : options;

  function updateModel(option: ProfileOption) {
    setIsOpen(false);
    const newValue = getObject ? option : getValue(option);
    setModel(newValue);
  }

  function toggleOpen() {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }

  const displayName = model && selected ? getLabel(selected) || name : name;

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        styles.profile,
        'profile',
        absolute && styles.absolute,
        disabled && styles.disabled,
        className
      )}
    >
      {!isOpen && (
        <div
          className={clsx(
            styles.trigger,
            'flex items-center gap-xs text-2xl mr-xxs text-neutral-interaction-default'
          )}
          onClick={toggleOpen}
        >
          <Avatar name={name} src={picture} size="small" alt="profile picture" />
          <p className="text-sm font-bold">{displayName}</p>
        </div>
      )}

      {isOpen && (
        <div className={styles.dropdown}>
          <div className="flex flex-col items-center gap-xs text-9xl px-xs py-sm text-neutral-interaction-default">
            <Avatar name={name} src={picture} size="large" alt="profile picture" />
            {!!(model && getLabel(selected) && name) && (
              <p className="text-sm text-center">{name}</p>
            )}
            {((model && getLabel(selected)) || name) && (
              <h4 className="text-3xl font-bold m-xxs text-center">{displayName}</h4>
            )}
            <Button
              type="submit"
              color="primary"
              onClick={onEdit}
              className="m-xxs truncate"
              disabled={!name && !picture}
            >
              {editLabel}
            </Button>
          </div>

          {options && options.length > 0 && (
            <div className="flex flex-col items-center text-neutral-interaction-default">
              <div className="flex items-center w-full relative">
                <Icon
                  name="search"
                  className={clsx(
                    styles.searchIcon,
                    onFocusInput && 'text-primary-interaction-default'
                  )}
                />
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className={styles.inputDefault}
                  onFocus={() => setOnFocusInput(true)}
                  onBlur={() => setOnFocusInput(false)}
                  placeholder="Search"
                />
              </div>
              <div
                className={clsx(
                  'w-full text-neutral-interaction-default',
                  filteredOptions.length > 4 && 'pr-xxs py-xxs'
                )}
              >
                <div className="w-full flex flex-col divide-y-xxs divide-neutral-default font-bold max-h-[12em] overflow-auto custom-scroll">
                  {filteredOptions.map((option, index) => {
                    const active =
                      JSON.stringify(model || {}) === JSON.stringify(option || {});
                    return (
                      <div
                        key={index}
                        className={clsx(
                          styles.profileOption,
                          'justify-start w-full [&>*]:text-sm hover:bg-neutral-surface-highlight'
                        )}
                        onClick={() => updateModel(option)}
                      >
                        {renderOption ? (
                          renderOption({ option, index, active })
                        ) : (
                          <p
                            className={clsx(
                              'text-sm',
                              active && '[&>*]:underline'
                            )}
                          >
                            {getLabel(option)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div
            className={clsx(
              'flex flex-col divide-y-xxs divide-neutral-default',
              filteredOptions && filteredOptions.length
                ? 'border-t-xxs border-t-neutral-default'
                : ''
            )}
          >
            {!!model && (
              <div
                className={clsx(
                  styles.profileOption,
                  styles.profileOptionAction,
                  'text-neutral-interaction-default hover:bg-neutral-surface-highlight'
                )}
                onClick={onEditOption}
              >
                <Icon name="person" className={styles.profileIcon} />
                <p className="text-sm font-bold">{editOptionLabel}</p>
              </div>
            )}
            <div
              className={clsx(
                styles.profileOption,
                styles.profileOptionAction,
                'text-danger-interaction-default hover:bg-danger-surface-default'
              )}
              onClick={onLogout}
            >
              <Icon name="logout" className={styles.profileIcon} />
              <p className="text-sm font-bold">{logoutLabel}</p>
            </div>
          </div>

          <div className="flex items-center justify-center px-xs py-sm pt-xl text-neutral-interaction-default font-bold text-xxs gap-5 [&>*]:cursor-pointer">
            <p onClick={onPrivacyPolicy} className="hover:underline">
              {privacyPolicyLabel}
            </p>
            <p onClick={onTermsOfUse} className="hover:underline">
              {termsOfUseLabel}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
