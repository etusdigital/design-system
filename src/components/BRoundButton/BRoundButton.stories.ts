import type { Meta, StoryObj } from "@storybook/vue3";
import BRoundButton from "./BRoundButton.vue";

const meta = {
  component: BRoundButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      type: { summary: "text" },
      control: "select",
      options: ["button", "reset", "submit"],
      table: {
        defaultValue: { summary: "button" },
      },
    },
    color: {
      type: { summary: "text" },
      control: "select",
      options: [
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "neutral",
      ],
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    text: {
      type: { summary: "text" },
      description:
        "It will be the value the button will show when it's hovered.",
    },
    icon: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "plus" },
      },
      description: "This property will be the button icon.",
    },
    background: {
      type: { summary: "text" },
      description:
        "This property will be the button background background, if it's not set, the background will respect the color background.",
    },
    size: {
      type: { summary: "text" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "small" },
      },
    },
    variant: {
      type: { summary: "text" },
      control: "select",
      options: [
        "default",
        "secondary",
        "plain",
        "reverse",
      ],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        'Disables the underlying button\'s HTML element and sets the CSS property "cursor-events" to "none".',
    },
    alwaysOpen: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "When this prop is true, the text will always be shown.",
    },
  },
} satisfies Meta<typeof BRoundButton>;
export default meta;

type Story = StoryObj<typeof BRoundButton>;

const defaultArgs = {
  type: "button",
  color: "primary",
  text: "Create",
  size: "small",
  variant: "default",
  background: "",
  icon: "",
  disabled: false,
  alwaysOpen: false,
};
const defaultRender = (args: any) => ({
  components: { BRoundButton },
  setup() {
    return { args };
  },
  template:
    '<div class="flex gap-sm">' +
      '<BRoundButton :type="args.type" text="Primary" color="primary" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
      '<BRoundButton :type="args.type" text="Info" color="info" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
      '<BRoundButton :type="args.type" text="Success" color="success" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
      '<BRoundButton :type="args.type" text="Warning" color="warning" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
      '<BRoundButton :type="args.type" text="Danger" color="danger" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
      '<BRoundButton :type="args.type" text="Neutral" color="neutral" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
    "</div>",
});

export const Primary: Story = {
  render: (args: any) => ({
    components: { BRoundButton },
    setup() {
      return { args };
    },
    template: `
      <BRoundButton 
          id="test-button"
          :type="args.type"
          :text="args.text"
          :icon="args.icon"
          :background="args.background"
          :color="args.color"
          :size="args.size"
          :variant="args.variant"
          :disabled="args.disabled"
          :always-open="args.alwaysOpen"
          @click="args.click"
      />
    `,
  }),
  args: defaultArgs,
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

export const Sizes: Story = {
  render: (args: any) => ({
    components: { BRoundButton },
    setup() {
      return { args };
    },
    template:
      '<div class="flex gap-3">' +
        '<BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="small" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton>' +
        '<BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="medium" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton>' +
        '<BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="large" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton>' +
      "</div>",
  }),
  args: {
    ...defaultArgs,
  },
};
