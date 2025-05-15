import type { Meta, StoryObj } from "@storybook/vue3";
import BBreadcrumb from "./BBreadcrumb.vue";

export default {
  component: BBreadcrumb,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "This property will be the selected item.",
    },
    items: {
      type: { summary: "array" },
      description: "This property will be the number of pages.",
    },
    labelKey: {
      type: { summary: "string" },
      table: {
        defaultValue: { summary: "label" },
      },
      description: "This property will be the key of the label.",
    },
    valueKey: {
      type: { summary: "string" },
      table: {
        defaultValue: { summary: "value" },
      },
      description: "This property will be the key of the value.",
    },
    getObject: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "If true, the selected value will be an object instead of value-key value.",
    },
  },
} satisfies Meta<typeof BBreadcrumb>;

type Story = StoryObj<typeof BBreadcrumb>;

const defaultArgs = {
  modelValue: "Home",
  items: ["Home", "Dashboard", "Profile", "Settings"],
  labelKey: "label",
  valueKey: "value",
  getObject: false,
};
const defaultRender = (args: any) => ({
  components: { BBreadcrumb },
  setup() {
    return { args };
  },
  template: `
    <BBreadcrumb 
      v-model="args.modelValue"
      :items="args.items"
      :label-key="args.labelKey"
      :value-key="args.valueKey"
      :get-object="args.getObject"
    />
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const ObjectArray: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: 1,
    getObject: true,
    items: [
      { label: "Home", value: 1 },
      { label: "Dashboard", value: 2 },
      { label: "Profile", value: 3 },
    ],
  },
};
