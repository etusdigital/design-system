import type { Meta, StoryObj } from "@storybook/vue3";
import RoundButton from "./RoundButton.vue";

export default {
  component: RoundButton,
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
    labelValue: {
      type: { summary: "text" },
      description:
        "Text displayed when the button is hovered or always open.",
    },
    text: {
      type: { summary: "text" },
      description:
        "Text displayed when the button is hovered or always open. Deprecated, use labelValue instead.",
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
} satisfies Meta<typeof RoundButton>;

type Story = StoryObj<typeof RoundButton>;

const defaultArgs = {
  type: "button",
  color: "primary",
  labelValue: "Create",
  size: "small",
  variant: "default",
  background: "",
  icon: "",
  disabled: false,
  alwaysOpen: false,
};

const defaultHtml = `
  <RoundButton 
      id="test-button"
      :type="args.type"
      :label-value="args.labelValue"
      :icon="args.icon"
      :background="args.background"
      :color="args.color"
      :size="args.size"
      :variant="args.variant"
      :disabled="args.disabled"
      :always-open="args.alwaysOpen"
      @click="args.click"
  />
`;

const defaultRender = (args: any) => ({
  components: { RoundButton },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Colors: Story = {render: (args: any) => ({
  components: { RoundButton },
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
    components: { RoundButton },
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

export const Progress: Story = {
  render: (args: any) => ({
    components: { RoundButton },
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
    components: { RoundButton },
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

export const AlwaysOpen: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    alwaysOpen: true,
  },
};