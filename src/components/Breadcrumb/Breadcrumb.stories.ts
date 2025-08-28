import type { Meta, StoryObj } from "@storybook/vue3";
import Breadcrumb from "./Breadcrumb.vue";

export default {
  component: Breadcrumb,
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
} satisfies Meta<typeof Breadcrumb>;

type Story = StoryObj<typeof Breadcrumb>;

const defaultArgs = {
  modelValue: "Home",
  items: ["Home", "Dashboard", "Profile", "Settings"],
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