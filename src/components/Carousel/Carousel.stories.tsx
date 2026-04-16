import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const meta = {
  component: Carousel,
  argTypes: {
    value: {
      control: { type: 'number' },
    },
    options: {
      control: {
        type: 'object',
      },
    },
    visible: {
      control: { type: 'number' },
    },
    autoplayInterval: {
      control: { type: 'number' },
    },
    autoplay: {
      control: { type: 'boolean' },
    },
    vertical: {
      control: { type: 'boolean' },
    },
    children: {
      description: 'Render prop for each slide. Params: option and index.',
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof Carousel>;

const defaultOptions = [
  {
    url: 'https://cartaofeito.com/cartao-santander-sx-p1/',
    sample: { value: '10%' },
    open: { value: '10%', description: '100.000.000' },
    click: { value: '10%', description: '100.000.000' },
    ctor: { value: '10%' },
    totalDelivered: '100.000.000',
  },
  {
    url: 'https://cartaofeito.com/cartao-itau-sx-p1/',
    sample: { value: '20%' },
    open: { value: '20%', description: '200.000.000' },
    click: { value: '20%', description: '200.000.000' },
    ctor: { value: '20%' },
    totalDelivered: '200.000.000',
  },
  {
    url: 'https://cartaofeito.com/cartao-unicred-sx-p1/',
    sample: { value: '30%' },
    open: { value: '30%', description: '300.000.000' },
    click: { value: '30%', description: '300.000.000' },
    ctor: { value: '30%' },
    totalDelivered: '300.000.000',
  },
  {
    url: 'https://cartaofeito.com/cartao-banestes-sx-p1/',
    sample: { value: '40%' },
    open: { value: '40%', description: '400.000.000' },
    click: { value: '40%', description: '400.000.000' },
    ctor: { value: '40%' },
    totalDelivered: '400.000.000',
  },
  {
    url: 'https://cartaofeito.com/cartao-banestes-sx-p1/',
    sample: { value: '50%' },
    open: { value: '50%', description: '500.000.000' },
    click: { value: '50%', description: '500.000.000' },
    ctor: { value: '50%' },
    totalDelivered: '500.000.000',
  },
];

function SlideContent({ option }: { option: any }) {
  return (
    <div className="flex flex-col gap-sm p-base border rounded">
      <p className="text-xs text-neutral-foreground-high">
        <strong>URL:</strong> {option.url}
      </p>
      <div className="flex gap-xs flex-wrap text-xs">
        <span>Sample: {option.sample.value}</span>
        <span>Open: {option.open.value} ({option.open.description})</span>
        <span>Click: {option.click.value} ({option.click.description})</span>
        <span>CTOR: {option.ctor.value}</span>
      </div>
      <p className="text-sm font-bold">Total delivered: {option.totalDelivered}</p>
    </div>
  );
}

export const Primary: Story = {
  render: () => {
    const [slide, setSlide] = useState(0);
    return (
      <Carousel
        value={slide}
        onChange={setSlide}
        options={defaultOptions}
        visible={1}
      >
        {(option) => <SlideContent option={option} />}
      </Carousel>
    );
  },
};

export const Interval: Story = {
  render: () => {
    const [slide, setSlide] = useState(0);
    return (
      <Carousel
        value={slide}
        onChange={setSlide}
        options={defaultOptions}
        autoplay={true}
        autoplayInterval={3000}
      >
        {(option) => <SlideContent option={option} />}
      </Carousel>
    );
  },
};

export const Circular: Story = {
  render: () => {
    const [slide, setSlide] = useState(0);
    return (
      <Carousel
        value={slide}
        onChange={setSlide}
        options={defaultOptions}
        circular={true}
      >
        {(option) => <SlideContent option={option} />}
      </Carousel>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Carousel
        value={0}
        options={defaultOptions}
        showArrows={false}
        disabled={true}
      >
        {(option) => <SlideContent option={option} />}
      </Carousel>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [slide, setSlide] = useState(0);
    return (
      <div style={{ height: '300px' }}>
        <Carousel
          value={slide}
          onChange={setSlide}
          options={defaultOptions}
          vertical={true}
        >
          {(option) => <SlideContent option={option} />}
        </Carousel>
      </div>
    );
  },
};
