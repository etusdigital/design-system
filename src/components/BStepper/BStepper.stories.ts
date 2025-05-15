import type { Meta, StoryObj } from "@storybook/vue3";
import BStepper from "./BStepper.vue";

export default {
  component: BStepper,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will the current step.",
      table: {
        defaultValue: { summary: undefined },
      },
    },
    items: {
      type: { summary: "array" },
      description: "Array of values to be used as options.",
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
    changeStep: {
      type: { summary: "function" },
      description: "Will be the function called when the step change.",
      table: {
        defaultValue: { summary: "(index)=>{void}" },
      },
    },
  },
} satisfies Meta<typeof BStepper>;

type Story = StoryObj<typeof BStepper>;

const defaultArgs = {
  modelValue: "Option1",
  items: ["Option1", "Option2", "Option3"],
  size: "medium",
  disabled: false,
  allowedSkip: false,
  version: 1,
  background: '#FFFFFF',
  changeStep: (item: any, index: number) => {},
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BStepper },
    setup() {
      return { args };
    },
    template: `
      <BStepper
        v-model="args.modelValue"
        :items="args.items"
        :size="args.size"
        :disabled="args.disabled"
        :allowed-skip="args.allowedSkip"
        :background="args.background"
        :version="args.version"
        @change-step="args.changeStep"
      />
    `,
  }),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { BStepper },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-5">
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            size="medium"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            :version="args.version"
            @change-step="args.changeStep"
          />
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            size="large"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            :version="args.version"
            @change-step="args.changeStep"
          />
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Versions: Story = {
  render: (args: any) => ({
    components: { BStepper },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-5">
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            :size="args.size"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            version="1"
            @change-step="args.changeStep"
          />
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            :size="args.size"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            version="2"
            @change-step="args.changeStep"
          />
      </div>
    `,
  }),
  args: defaultArgs,
};

export const ObjectArray: Story = {
  render: (args: any) => ({
    components: { BStepper },
    setup() {
      return { args };
    },
    template: `
      <BStepper
        v-model="args.modelValue"
        :items="args.items"
        size="medium"
        :disabled="args.disabled"
        :allowed-skip="args.allowedSkip"
        version="2"
        @change-step="args.changeStep"
      />
    `,
  }),
  args: {
    ...defaultArgs,
    items: [
      {
        label: "Option 1",
        icon: "labs",
      },
      {
        label: "Option 2",
        icon: "labs",
      },
      {
        label: "Option 3",
        icon: "labs",
      },
    ],
  },
};
