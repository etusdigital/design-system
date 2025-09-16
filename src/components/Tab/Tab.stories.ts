import type { Meta, StoryObj } from "@storybook/vue3";
import Tab from "./Tab.vue";

export default {
  component: Tab,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      description: "Will the current tab.",
      table: {
        defaultValue: { summary: undefined },
      },
    },
    options: {
      type: { name: "array", value: { name: "object", value: {} } },
      description: "Array of values to be used as options.",
    },
    labelKey: {
      type: { name: "string" },
      description: "Property name used for displaying option labels when using object arrays.",
      table: {
        defaultValue: { summary: "label" },
      },
    },
    valueKey: {
      type: { name: "string" },
      description: "Property name used for displaying option values when using object arrays.",
      table: {
        defaultValue: { summary: "value" },
      },
    },
    isIcon: {
      type: { name: "boolean" },
      description: "Show icons instead of words.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    notCard: {
      type: { name: "boolean" },
      description: "No card will wrapper the options.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Tab>;

type Story = StoryObj<typeof Tab>;

const defaultArgs = {
  modelValue: undefined,
  options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  labelKey: 'label',
  valueKey: 'value',
  isIcon: false,
  notCard: false,
};

const defaultRender = (args: any) => ({
  components: { Tab },
  setup() {
    return { args };
  },
  template: `
    <Tab
        class="w-fit"
        v-model="args.modelValue" 
        :options="args.options"
        :label-key="args.labelKey"
        :value-key="args.valueKey"
        :is-icon="args.isIcon"
        :not-card="args.notCard"
    />
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Icons: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isIcon: true,
    options: ["laptop", "smartphone"],
  },
};

export const ObjectArray: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    options: [
      {
        label: "Laptop",
        value: "laptop",
        icon: "laptop",
      },
      {
        label: "Smartphone",
        value: "smartphone",
        icon: "smartphone",
      },
    ],
  },
};

export const NotCard: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    notCard: true,
  },
};
