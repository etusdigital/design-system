import type { Meta, StoryObj } from "@storybook/vue3";
import RadioGroup from "./RadioGroup.vue";

export default {
  component: RadioGroup,
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      table: {
        defaultValue: { summary: null },
      },
    },
    vertical: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

const defaultArgs = {
  modelValue: 1,
  vertical: false,
  disabled: false,
  items: [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
  ],
  labelKey: "label",
  valueKey: "value",
  getObject: false,
};

const defaultHtml = `
  <RadioGroup
    v-model="args.modelValue"
    :vertical="args.vertical"
    :disabled="args.disabled"
    :items="args.items"
    :label-key="args.labelKey"
    :value-key="args.valueKey"
    :get-object="args.getObject"
  />
`;

const defaultRender = (args: any) => ({
  components: { RadioGroup },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Vertical: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    vertical: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};