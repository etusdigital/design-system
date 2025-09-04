import type { Meta, StoryObj } from "@storybook/vue3";
import Stepper from "./Stepper.vue";

export default {
  component: Stepper,
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will the current step.",
      table: {
        defaultValue: { summary: undefined },
      },
    },
    options: {
      type: { summary: "array" },
      description: "Array of values to be used as options.",
    },
    labelKey: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "label" },
      },
    },
    valueKey: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "value" },
      },
    },
    size: {
      type: { summary: "text" },
      control: "select",
      options: ["medium", "large"],
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      description:
        "If it's true, the user will not be able to change the step.",
      table: {
        defaultValue: { summary: false },
      },
    },
    allowedSkip: {
      type: { summary: "boolean" },
      description: "If it's true, the user will be able to skip steps.",
      table: {
        defaultValue: { summary: false },
      },
    },
    background: {
      type: { summary: "color" },
      description: "This property will be the stepper background.",
      table: {
        defaultValue: { summary: '--neutral-background-default' },
      },
    },
    version: {
      type: { summary: "number" },
      description: "This property will be the stepper version.",
      control: "select",
      options: [1, 2],
      table: {
        defaultValue: { summary: 1 },
      },
    },
    getObject: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        'If true, the selected value will be an object instead of value-key value.',
    },
    changeStep: {
      type: { summary: "function" },
      description: "Will be the function called when the step change.",
      table: {
        defaultValue: { summary: "(index)=>{void}" },
      },
    },
  },
} satisfies Meta<typeof Stepper>;

type Story = StoryObj<typeof Stepper>;

const defaultArgs = {
  modelValue: "basic-info",
  options: [
    { label: "Basic Info", value: "basic-info", icon: "person" },
    { label: "Configuration", value: "configuration", icon: "settings" },
    { label: "Review", value: "review", icon: "visibility" },
    { label: "Complete", value: "complete", icon: "check_circle" }
  ],
  labelKey: "label",
  valueKey: "value",
  size: "medium" as const,
  disabled: false,
  allowedSkip: false,
  getObject: false,
  version: 1,
  background: '#FFFFFF',
  changeStep: (item: any, index: number) => {},
};

const defaultHtml = `
  <Stepper
    v-model="args.modelValue"
    :options="args.options"
    :label-key="args.labelKey"
    :value-key="args.valueKey"
    :size="args.size"
    :disabled="args.disabled"
    :allowed-skip="args.allowedSkip"
    :background="args.background"
    :version="args.version"
    :get-object="args.getObject"
    @change-step="args.changeStep"
  />
`;

const defaultRender = (args: any) => ({
  components: { Stepper },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { Stepper },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-base">
        ${["medium", "large"]
          .map((size) => {
            return defaultHtml
              .replaceAll("args.size", `'${size}'`)
          })
          .join("")}
      </div>
    `,
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

export const AllowedSkip: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    allowedSkip: true,
  },
};

export const Versions: Story = {
  render: (args: any) => ({
    components: { Stepper },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-base">
        ${["1", "2"]
          .map((version) => {
            return defaultHtml
              .replaceAll("args.version", `'${version}'`)
          })
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};
