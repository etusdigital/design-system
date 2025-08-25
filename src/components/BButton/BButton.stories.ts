import type { Meta, StoryObj } from "@storybook/vue3";
import BButton from "./BButton.vue";

export default {
  component: BButton,
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
      options: ["primary", "info", "success", "warning", "danger", "neutral"],
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    variant: {
      type: { summary: "text" },
      control: "select",
      options: ["default", "secondary", "plain", "reverse"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      type: { summary: "text" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "medium" },
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
    loading: {
      type: { summary: "boolean" },
      table: {
        category: "Loading state",
        defaultValue: { summary: false },
      },
      description:
        "If true, shows a spinner instead of the default slot's contents and disables cursor events. If \"progress\" is anything other than 0, this is implicitly true, so there's no need to use both. Keep in mind that although the content is hidden, it is still rendered so that the button doesn't shrink.",
    },
    progress: {
      type: { summary: "number" },
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.0001,
      },
      table: {
        category: "Loading state",
        defaultValue: { summary: 0 },
      },
      description: "The current progress of the loading state.",
    },
    default: {
      description:
        "This slot will be content inside the button. It will not be shown if isLoading is true.",
    },
  },
} satisfies Meta<typeof BButton>;

type Story = StoryObj<typeof BButton>;

const defaultArgs = {
  type: "button",
  color: "primary",
  variant: "default",
  size: "medium",
  disabled: false,
  loading: false,
  progress: 0,
};

const defaultHtml = `
  <BButton
    id="test-button"
    :type="args.type"
    :color="args.color"
    :variant="args.variant"
    :size="args.size"
    :disabled="args.disabled"
    :loading="args.loading"
    :progress="args.progress"
    @click="args.click"
    >Label</BButton
  >`;

const defaultRender = (args: any) => ({
  components: { BButton },
  setup() {
    return { args };
  },
  template: `
    <BButton
      id="test-button"
      :type="args.type"
      :color="args.color"
      :variant="args.variant"
      :size="args.size"
      :disabled="args.disabled"
      :loading="args.loading"
      :progress="args.progress"
      @click="args.click"
      >Label</BButton
    >`,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Colors: Story = {render: (args: any) => ({
  components: { BButton },
  setup() {
    return { args };
  },
  template: `
    <div class="flex gap-xs">
      ${["primary", "info", "success", "warning", "danger", "neutral"]
        .map((color) => {
          return defaultHtml
            .replaceAll("args.color", `'${color}'`)
            .replaceAll(
              "Label",
              `${color.charAt(0).toUpperCase() + color.slice(1)}`
            );
        })
        .join("")}
    </div>`,
}),
  args: {
    ...defaultArgs,
  },
};

export const Variants: Story = {
  render: (args: any) => ({
    components: { BButton },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
        ${["default", "secondary", "plain", "reverse"]
          .map((variant) => {
            return defaultHtml
              .replaceAll("args.variant", `'${variant}'`)
              .replaceAll(
                "Label",
                `${variant.charAt(0).toUpperCase() + variant.slice(1)}`
              );
          })
          .join("")}
      </div>`,
  }),
  args: defaultArgs,
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Loading: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    loading: true,
  },
};

export const Progress: Story = {
  render: (args: any) => ({
    components: { BButton },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
        ${[0.3, 0.75, 1]
          .map((progress) => {
            return defaultHtml
              .replaceAll("args.progress", `'${progress}'`)
          })
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { BButton },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
        ${["small", "medium", "large"]
          .map((size) => {
            return defaultHtml
              .replaceAll("args.size", `'${size}'`)
              .replaceAll(
                "Label",
                `${size.charAt(0).toUpperCase() + size.slice(1)}`
              );
          })
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};
