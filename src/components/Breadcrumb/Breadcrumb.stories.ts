import type { Meta, StoryObj } from "@storybook/vue3";
import Breadcrumb from "./Breadcrumb.vue";

export default {
  component: Breadcrumb,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      description: "This property will be the selected option.",
    },
    options: {
      type: { name: "array", value: { name: "object", value: {} } },
      description: "This property will be the number of pages.",
    },
    labelKey: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "label" },
      },
      description: "This property will be the key of the label.",
    },
    valueKey: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "value" },
      },
      description: "This property will be the key of the value.",
    },
    getObject: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description:
        "If true, the selected value will be an object instead of value-key value.",
    },
  },
} satisfies Meta<typeof Breadcrumb>;

type Story = StoryObj<typeof Breadcrumb>;

const defaultArgs = {
  modelValue: "Home",
  options: ["Home", "Dashboard", "Profile", "Settings"],
  labelKey: "label",
  valueKey: "value",
  getObject: false,
};
const defaultRender = (args: any) => ({
  components: { Breadcrumb },
  setup() {
    return { args };
  },
  template: `
    <Breadcrumb 
      v-model="args.modelValue"
      :options="args.options"
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