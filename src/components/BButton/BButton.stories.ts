import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BButton from "./BButton.vue";

const meta = {
  component: BButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "HTML button type attribute",
      control: { type: "select" },
      options: ["button", "reset", "submit"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "button" },
      },
    },
    color: {
      description: "Color variant of the button",
      control: { type: "select" },
      options: [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "neutral",
      ],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    variant: {
      description: "Visual style variant of the button",
      control: { type: "select" },
      options: [
        "default",
        "secondary",
        "plain",
        "reverse",
      ],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      description: "Size of the button",
      control: { type: "select" },
      options: ["small", "medium", "large"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "medium" },
      },
    },
    disabled: {
      description: 'Disables the underlying button\'s HTML element and sets the CSS property "cursor-events" to "none".',
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      },
    },
    loading: {
      description: "If true, shows a spinner instead of the default slot's contents and disables cursor events. If \"progress\" is anything other than 0, this is implicitly true, so there's no need to use both. Keep in mind that although the content is hidden, it is still rendered so that the button doesn't shrink.",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        category: "Loading state",
        defaultValue: { summary: false },
      },
    },
    progress: {
      description: "The current progress of the loading state.",
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.0001,
      },
      table: {
        type: { summary: "number" },
        category: "Loading state",
        defaultValue: { summary: 0 },
      },
    },
    default: {
      description:
        "This slot will be content inside the button. It will not be shown if isLoading is true.",
    },
  },
} satisfies Meta<typeof BButton>;
export default meta;

type Story = StoryObj<typeof BButton>;

const defaultArgs = {
  type: "button",
  color: "primary",
  variant: "default",
  size: 'medium',
  disabled: false,
  loading: false,
  progress: 0,
};

const defaultRender = (args: any) => ({
  components: { BButton },
  setup() {
    return { args };
  },
  template:
    '<div class="flex gap-3">' +
    '<BButton :type="args.type" color="primary" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Primary</BButton>' +
    '<BButton :type="args.type" color="info" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Informative</BButton>' +
    '<BButton :type="args.type" color="success" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Success</BButton>' +
    '<BButton :type="args.type" color="warning" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Warning</BButton>' +
    '<BButton :type="args.type" color="danger" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Danger</BButton>' +
    '<BButton :type="args.type" color="neutral" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Neutral</BButton>' +
    "</div>",
});

export const Primary: Story = {
  render: (args: any) => ({
    components: { BButton },
    setup() {
      return { args };
    },
    template:
      '<BButton id="test-button" :type="args.type" :color="args.color" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Test button</BButton>',
  }),
  args: defaultArgs,
};

export const Colors: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
  },
};

export const Secondary: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    variant: "secondary",
  },
};

export const Plain: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    variant: "plain",
  },
};

export const Reverse: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    variant: "reverse",
  },
};

export const LoadingWithProgress: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    progress: 0.32,
  },
};

export const Size: Story = {
  render: (args: any) => ({
    components: { BButton },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
        <BButton class="h-fit" :type="args.type" :color="args.color" :variant="args.variant" size="small" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Small</BButton>
        <BButton class="h-fit" :type="args.type" :color="args.color" :variant="args.variant" size="medium" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Medium</BButton>
        <BButton class="h-fit" :type="args.type" :color="args.color" :variant="args.variant" size="large" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Large</BButton>
      </div>
    `
  }),
  args: defaultArgs,
};