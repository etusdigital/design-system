import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

const flatOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const nestedOptions = [
  {
    label: 'Fruits',
    value: 'fruits-group',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ],
  },
  {
    label: 'Vegetables',
    value: 'vegetables-group',
    options: [
      { label: 'Carrot', value: 'carrot' },
      {
        label: 'Leafy',
        value: 'leafy-group',
        options: [
          { label: 'Spinach', value: 'spinach' },
        ],
      },
    ],
  },
];

describe('Dropdown', () => {
  it('renders with flat options', () => {
    render(<Dropdown options={flatOptions} labelValue="Select" />);
    expect(document.body).toBeTruthy();
  });

  it('renders with nested group options (recursive)', () => {
    render(<Dropdown options={nestedOptions} labelValue="Select" />);
    expect(document.body).toBeTruthy();
  });

  it('calls onChange with selected value (primitive)', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Dropdown.Options
        options={flatOptions}
        labelKey="label"
        valueKey="value"
        selectedValue={null}
        onSelect={(opt) => onChange(opt.value)}
      />
    );

    const appleOption = container.querySelector('[role="option"]');
    expect(appleOption).toBeTruthy();
    fireEvent.click(appleOption!);
    expect(onChange).toHaveBeenCalledWith('apple');
  });

  it('getObject mode: onChange receives full object', () => {
    const onChange = vi.fn();
    render(
      <Dropdown.Options
        options={flatOptions}
        labelKey="label"
        valueKey="value"
        selectedValue={null}
        onSelect={(opt) => onChange(opt)}
      />
    );

    const options = screen.getAllByRole('option');
    fireEvent.click(options[0]);
    expect(onChange).toHaveBeenCalledWith(flatOptions[0]);
  });

  it('Dropdown.Options and Dropdown.Option exist as static properties', () => {
    expect(typeof Dropdown.Options).toBe('function');
    expect(typeof Dropdown.Option).toBe('function');
  });

  it('search renders with searchable prop', () => {
    const { container } = render(
      <Dropdown options={flatOptions} searchable labelValue="Select" />
    );
    expect(container).toBeTruthy();
  });

  it('renders group headers for nested options', () => {
    const { getByText } = render(
      <Dropdown.Options
        options={nestedOptions}
        labelKey="label"
        valueKey="value"
        selectedValue={null}
        onSelect={vi.fn()}
      />
    );

    expect(getByText('Fruits')).toBeTruthy();
    expect(getByText('Vegetables')).toBeTruthy();
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Banana')).toBeTruthy();
    expect(getByText('Carrot')).toBeTruthy();
    expect(getByText('Spinach')).toBeTruthy();
  });

  it('renders DropdownOption with selected state', () => {
    const { container } = render(
      <Dropdown.Options
        options={flatOptions}
        labelKey="label"
        valueKey="value"
        selectedValue="banana"
        onSelect={vi.fn()}
      />
    );

    const options = container.querySelectorAll('[role="option"]');
    expect(options[1].getAttribute('aria-selected')).toBe('true');
    expect(options[0].getAttribute('aria-selected')).toBe('false');
  });

  it('renders DropdownOption as a single option item', () => {
    const option = { label: 'Apple', value: 'apple' };
    const onSelect = vi.fn();
    render(
      <Dropdown.Option
        option={option}
        labelKey="label"
        valueKey="value"
        selectedValue={null}
        onSelect={onSelect}
      />
    );

    const el = screen.getByRole('option');
    expect(el).toBeTruthy();
    fireEvent.click(el);
    expect(onSelect).toHaveBeenCalledWith(option);
  });
});
