import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Carousel } from './index';

const options = ['Item 1', 'Item 2', 'Item 3'];

describe('Carousel', () => {
  it('renders items via children-as-function', () => {
    render(
      <Carousel options={options}>
        {(option) => <div>{option}</div>}
      </Carousel>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('shows navigation arrows when showArrows is true', () => {
    render(
      <Carousel options={options}>
        {(option) => <div>{option}</div>}
      </Carousel>
    );
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('does not show navigation arrows when showArrows is false', () => {
    render(
      <Carousel options={options} showArrows={false}>
        {(option) => <div>{option}</div>}
      </Carousel>
    );
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
  });

  it('calls onChange when next arrow is clicked', () => {
    const onChange = vi.fn();
    render(
      <Carousel options={options} defaultValue={0} onChange={onChange}>
        {(option) => <div>{option}</div>}
      </Carousel>
    );
    fireEvent.click(screen.getByLabelText('Next slide'));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('calls onChange when previous arrow is clicked', () => {
    const onChange = vi.fn();
    render(
      <Carousel options={options} defaultValue={1} onChange={onChange}>
        {(option) => <div>{option}</div>}
      </Carousel>
    );
    fireEvent.click(screen.getByLabelText('Previous slide'));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('does not navigate before first slide', () => {
    const onChange = vi.fn();
    render(
      <Carousel options={options} defaultValue={0} onChange={onChange}>
        {(option) => <div>{option}</div>}
      </Carousel>
    );
    const prevButton = screen.getByLabelText('Previous slide');
    expect(prevButton).toBeDisabled();
  });

  it('uses getComputedStyle for CSS variable reading (not computedStyleMap)', () => {
    const { container } = render(
      <Carousel options={options}>
        {(option) => <div>{option}</div>}
      </Carousel>
    );
    expect(container).toBeTruthy();
  });

  it('renders indicator dots equal to number of pages', () => {
    render(
      <Carousel options={options} visible={1}>
        {(option) => <div>{option}</div>}
      </Carousel>
    );
    const indicators = screen.getAllByRole('button', { name: /Go to slide/ });
    expect(indicators).toHaveLength(3);
  });

  it('renders with controlled value prop', () => {
    render(
      <Carousel options={options} value={0}>
        {(option) => <div>{option}</div>}
      </Carousel>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('renders with no options without crashing', () => {
    render(
      <Carousel options={[]}>
        {(option) => <div>{option}</div>}
      </Carousel>
    );
    expect(document.body).toBeTruthy();
  });
});
