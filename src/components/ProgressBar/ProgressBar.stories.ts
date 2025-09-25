import type { Meta, StoryObj } from "@storybook/vue3";
import ProgressBar from "./ProgressBar.vue";

export default {
  component: ProgressBar,
  argTypes: {
    modelValue: {
      type: { name: "number" },
      table: {
        defaultValue: { summary: "0" },
      },
      description:
        "Thil will be the current step the user is on. If the steps is not defined, it will be the bar fill percentage in 0 to 1 scale.",
    },
    color: {
      type: { name: "string" },
      description: "This property will be the color of the progress bar.",
    },
    icon: {
      type: { name: "string" },
      description: "This property will be the icon shown after the loading percentage. It works only with the normal bar without animation.",
    },
    infoMessage: {
      type: { name: "string" },
      description: "This property will be shown in a tooltip when the icon is hovered.",
    },
    type: {
      type: { name: "string" },
      control: "select",
      options: ["primary", "info", "success", "warning", "danger", "neutral"],
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      type: { name: "string" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    animationType: {
      type: { name: "string" },
      control: "select",
      options: ["indeterminate", "query", undefined],
      table: {
        defaultValue: { summary: "" },
      },
      description:
        "This property will be the progress bar animation type.",
    },
    steps: {
      type: { name: "number" },
      table: {
        defaultValue: { summary: "0" },
      },
      description:
        "This property will be the amount of steps used to calculate the loading percentage.",
    },
    displayPercentage: {
      type: { name: "string" },
      control: "select",
      options: ["center", "bar", null],
      table: {
        defaultValue: { summary: "" },
      },
      description: "Display the percentage, if the bar isn't divided."
    },
    neutralBackground: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "If this property is true, the background will be neutral.",
    },
    'icon-slot': {
      description: "This slot will replace the icon.",
    }
  },
} satisfies Meta<typeof ProgressBar>;

type Story = StoryObj<typeof ProgressBar>;

const defaultArgs = {
  modelValue: 0.5,
  size: "medium" as const,
  type: "primary" as const,
  color: "",
  icon: "",
  infoMessage: "",
  steps: 0,
  animationType: undefined,
  displayPercentage: undefined,
  neutralBackground: false,
};

const defaultHtml = `
  <ProgressBar
    v-model="args.modelValue"
    :icon="args.icon"
    :color="args.color"
    :size="args.size"
    :type="args.type"
    :animation-type="args.animationType"
    :steps="args.steps"
    :display-percentage="args.displayPercentage"
    :neutral-background="args.neutralBackground"
    :info-message="args.infoMessage"
  />`;

const defaultRender = (args: any) => ({
  components: { ProgressBar },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Types: Story = {
  render: (args: any) => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-xs">
        ${["primary", "info", "success", "warning", "danger", "neutral"]
          .map((type) => {
            return defaultHtml.replace(/args\.type/g, `'${type}'`);
          })
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-xs">
        ${["small", "medium", "large"]
          .map((size) => {
            return defaultHtml.replace(/args\.size/g, `'${size}'`);
          })
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Steps: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    steps: 5,
    modelValue: 3,
  },
};

export const AnimationTypes: Story = {
  render: (args: any) => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-xs">
        ${["indeterminate", "query"]
          .map((animationType) => {
            return defaultHtml.replace(/args\.animationType/g, `'${animationType}'`);
          })
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const DisplayPercentage: Story = {
  render: (args: any) => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-xs">
        ${["center", "bar"]
          .map((displayPercentage) => {
            return defaultHtml.replace(/args\.displayPercentage/g, `'${displayPercentage}'`);
          })
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Icon: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "rocket_launch",
    infoMessage: "Upload in progress",
  },
};

export const NeutralBackground: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    neutralBackground: true,
  },
};

export const IconSlot: Story = {
  render: (args: any) => ({
    components: { ProgressBar },
    setup() {
      return { args };
    },
    template: `
      <ProgressBar
        v-model="args.modelValue"
        :size="args.size"
        :type="args.type"
        display-percentage="bar"
      >
        <template #icon-slot>
          Slot: icon-slot
        </template>
      </ProgressBar>
    `,
  }),
  args: {
    ...defaultArgs,
    modelValue: 0.5,
  },
};