import type { ComponentPropsAndSlots, Meta, StoryObj } from "@storybook/vue3";
import Button from "./Button.vue";

const meta = {
  component: Button,
  argTypes: {
    type: {
      type: "string",
      control: "select",
      options: ["button", "reset", "submit"],
      table: {
        default: "button",
      },
    },
    color: {
      type: "string",
      control: "select",
      options: ["primary", "info", "success", "warning", "danger", "neutral"],
      table: {
        default: "primary",
      },
    },
    variant: {
      type: "string",
      control: "select",
      options: ["default", "secondary", "plain", "reverse"],
      table: {
        default: "default",
      },
    },
    size: {
      type: "string",
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        default: "medium",
      },
    },
    disabled: {
      type: "boolean",
      table: {
        default: false,
      },
      description:
        'Disables the underlying button\'s HTML element and sets the CSS property "cursor-events" to "none".',
    },
    round: {
      type: "boolean",
      table: {
        default: false,
      },
      description: "If true, the button will have a rounded border.",
    },
    alwaysOpen: {
      type: "boolean",
      table: {
        default: false,
      },
      description: "If true, the button will always be open.",
    },
    background: {
      type: "string",
      table: {
        default: "",
      },
      description: "The background color of the button.",
    },
    loading: {
      type: "boolean",
      table: {
        category: "Loading state",
        default: false,
      },
      description:
        "If true, shows a spinner instead of the default slot's contents and disables cursor events. If \"progress\" is anything other than 0, this is implicitly true, so there's no need to use both. Keep in mind that although the content is hidden, it is still rendered so that the button doesn't shrink.",
    },
    progress: {
      type: "number",
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.0001,
      },
      table: {
        category: "Loading state",
        default: 0,
      },
      description: "The current progress of the loading state.",
    },
    default: {
      description:
        "This slot will be content inside the button. It will not be shown if isLoading is true.",
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<ComponentPropsAndSlots<typeof Button>> = {
  type: "button",
  color: "primary",
  variant: "default",
  size: "medium",
  disabled: false,
  round: true,
  alwaysOpen: false,
  background: "",
  loading: false,
  progress: 0,
};

const defaultHtml: string = `
  <Button
    class="h-fit"
    id="test-button"
    :type="args.type"
    :color="args.color"
    :variant="args.variant"
    :size="args.size"
    :disabled="args.disabled"
    :round="args.round"
    :always-open="args.alwaysOpen"
    :background="args.background"
    :loading="args.loading"
    :progress="args.progress"
    @click="args.click"
  >
    Label
  </Button>`;

const defaultRender = (args: any) => ({
  components: { Button },
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
  components: { Button },
  setup() {
    return { args };
  },
  template: `
    <div class="flex gap-xs">
      ${["primary", "info", "success", "warning", "danger", "neutral"]
        .map((color) => {
          return defaultHtml
            .replace("args.color", `'${color}'`)
            .replace(
              "Label",
              color
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
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
        ${["default", "secondary", "plain", "reverse"]
          .map((variant) => {
            return defaultHtml
              .replace("args.variant", `'${variant}'`)
              .replace(
                "Label",
                variant
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

export const Round: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    round: true,
  },
};

export const AlwaysOpen: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    round: true,
    alwaysOpen: true,
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
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
        ${[0.3, 0.75, 1]
          .map((progress) => {
            return defaultHtml
              .replace("args.progress", `${progress}`)
          })
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-xs">
        ${["small", "medium", "large"]
          .map((size) => {
            return defaultHtml
              .replace("args.size", `'${size}'`)
              .replace(
                "Label",
                size
              );
          })
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};
