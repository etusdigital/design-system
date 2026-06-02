import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { History } from './History';

const meta = {
  component: History,
  argTypes: {
    value: {
      type: { name: 'other', value: 'any' },
      description: 'Will be an option from the "options" array at the selected index.',
    },
    options: {
      type: { name: 'array', value: { name: 'object', value: {} } },
      description: 'This property will be the historic options.',
    },
    position: {
      type: { name: 'string' },
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      table: {
        defaultValue: { summary: 'right' },
      },
      description: 'This is the historic position.',
    },
    type: {
      type: { name: 'string' },
      control: 'select',
      options: ['primary', 'info', 'success', 'warning', 'danger', 'neutral'],
      table: {
        defaultValue: { summary: 'info' },
      },
      description: 'This is historic type, only if the option does not have a type property.',
    },
    disabled: {
      type: { name: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
      description: 'Don\'t allow user to change the select option.',
    },
    renderOption: {
      description: 'Render prop for each option. Params: option, index, active.',
    },
  },
} satisfies Meta<typeof History>;

export default meta;
type Story = StoryObj<typeof History>;

const defaultOptions = [
  {
    label: 'Person 1',
    date: new Date(),
    type: 'primary',
    icon: 'schedule',
    notRoundIcon: 'check',
    isIconRound: true,
  },
  {
    label: 'Person 2',
    date: new Date(),
    type: 'info',
    icon: 'schedule',
    notRoundIcon: 'info_i',
    isIconRound: true,
  },
  {
    label: 'Person 3',
    date: new Date(),
    type: 'success',
    icon: 'check_circle',
    notRoundIcon: 'check',
    isIconRound: true,
  },
  {
    label: 'Person 4',
    date: new Date(),
    type: 'warning',
    icon: 'error',
    notRoundIcon: 'exclamation',
    isIconRound: true,
  },
  {
    label: 'Person 5',
    date: new Date(),
    type: 'danger',
    icon: 'cancel',
    notRoundIcon: 'close',
    isIconRound: true,
  },
  {
    label: 'Person 6',
    date: new Date(),
    type: 'neutral',
    icon: 'check_circle',
    notRoundIcon: 'check',
    isIconRound: true,
  },
];

const plainOptions = defaultOptions.map((option) => ({ ...option, type: undefined as any, icon: undefined as any }));

type HistoryType = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const typeTextClasses: Record<HistoryType, string> = {
  primary: 'text-primary-interaction-default',
  info: 'text-informative-interaction-default',
  success: 'text-success-interaction-default',
  warning: 'text-warning-interaction-default',
  danger: 'text-danger-interaction-default',
  neutral: 'text-neutral-interaction-default',
};

const typeBgClasses: Record<HistoryType, string> = {
  primary: 'bg-primary-interaction-default',
  info: 'bg-informative-interaction-default',
  success: 'bg-success-interaction-default',
  warning: 'bg-warning-interaction-default',
  danger: 'bg-danger-interaction-default',
  neutral: 'bg-neutral-interaction-default',
};

function makeRenderOption(globalType: HistoryType = 'primary') {
  return function renderOption(option: any, index: number, active: boolean) {
    const resolvedType = (option.type || globalType) as HistoryType;
    const textClass = typeTextClasses[resolvedType] ?? typeTextClasses.primary;
    const bgClass = typeBgClasses[resolvedType] ?? typeBgClasses.primary;
    return (
      <>
        <p
          className={`text-sm mb-[10px] hover:underline ${textClass} ${active ? 'font-bold' : ''}`}
        >
          {index === 0 && (
            <span
              className={`text-neutral-foreground-negative py-[3px] px-[6px] mt-[5px] rounded-[20px] text-xs font-normal mr-[.6em] ${bgClass} ${active ? 'font-bold' : ''}`}
            >
              Current
            </span>
          )}
          {option.date.toLocaleDateString(
            'en-US',
            index === 0
              ? { day: '2-digit', month: 'long', year: 'numeric' }
              : { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
          )}
        </p>
        <div className="flex items-center justify-start mt-[16px] mb-[5px]">
          <div className="w-[20px] h-[20px] rounded-[50%] bg-neutral-foreground-disabled" />
          <p
            className={`text-sm text-neutral-foreground-low ml-sm ${active ? 'text-neutral-foreground-high' : ''}`}
          >
            {option.label}
          </p>
        </div>
      </>
    );
  };
}

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState<any>(null);
    return (
      <History
        value={value}
        onChange={setValue}
        options={plainOptions}
        position="right"
        type="primary"
        disabled={false}
        renderOption={makeRenderOption('primary')}
      />
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [value, setValue] = useState<any>(null);
    return (
      <div className="flex flex-col gap-xxs">
        {(['top', 'bottom', 'left', 'right'] as const).map((position) => (
          <History
            key={position}
            value={value}
            onChange={setValue}
            options={plainOptions}
            position={position}
            type="primary"
            renderOption={makeRenderOption('primary')}
          />
        ))}
      </div>
    );
  },
};

export const Types: Story = {
  render: () => {
    const [value, setValue] = useState<any>(null);
    return (
      <div className="flex gap-xxs">
        {(['primary', 'info', 'success', 'warning', 'danger', 'neutral'] as const).map((type) => (
          <History
            key={type}
            value={value}
            onChange={setValue}
            options={plainOptions}
            position="right"
            type={type}
            renderOption={makeRenderOption(type)}
          />
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<any>(null);
    return (
      <History
        value={value}
        onChange={setValue}
        options={plainOptions}
        position="right"
        type="primary"
        disabled={true}
        renderOption={makeRenderOption('primary')}
      />
    );
  },
};

export const MultiType: Story = {
  render: () => {
    const [value, setValue] = useState<any>(null);
    const multiTypeOptions = defaultOptions.map((option) => ({ ...option, icon: undefined as any }));
    return (
      <History
        value={value}
        onChange={setValue}
        options={multiTypeOptions}
        position="right"
        type="primary"
        disabled={true}
        renderOption={makeRenderOption('primary')}
      />
    );
  },
};

export const Icons: Story = {
  render: () => {
    const [value, setValue] = useState<any>(null);
    const iconOptions = defaultOptions.map((option) => ({
      ...option,
      isIconRound: false,
      icon: option.notRoundIcon,
    }));
    return (
      <History
        value={value}
        onChange={setValue}
        options={iconOptions}
        position="right"
        type="primary"
        disabled={true}
        renderOption={makeRenderOption('primary')}
      />
    );
  },
};

export const IsIconRound: Story = {
  render: () => {
    const [value, setValue] = useState<any>(null);
    return (
      <History
        value={value}
        onChange={setValue}
        options={defaultOptions}
        position="right"
        type="primary"
        disabled={true}
        renderOption={makeRenderOption('primary')}
      />
    );
  },
};

export const Unfilled: Story = {
  render: () => {
    const [value, setValue] = useState<any>(null);
    const unfilledOptions = defaultOptions.map((option) => ({ ...option, unfilled: true }));
    return (
      <History
        value={value}
        onChange={setValue}
        options={unfilledOptions}
        position="right"
        type="primary"
        disabled={true}
        renderOption={makeRenderOption('primary')}
      />
    );
  },
};
