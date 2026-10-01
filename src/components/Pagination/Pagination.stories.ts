import type { Meta, StoryObj } from "@storybook/vue3";
import Pagination from "./Pagination.vue";

export default {
  component: Pagination,
  argTypes: {
    modelValue: {
      type: { name: "number" },
      table: {
        defaultValue: { summary: "1" },
      },
      description: "This property will be the selected page.",
    },
    length: {
      type: { name: "number" },
      table: {
        defaultValue: { summary: "1" },
      },
      description: "This property will be the number of pages.",
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Disables all page navigation.",
    },
  },
} satisfies Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

const defaultArgs = {
  modelValue: 1,
  length: 10,
  disabled: false,
};

const defaultRender = (args: any) => ({
  components: { Pagination },
  setup() {
    return { args };
  },
  template: `
    <Pagination 
      v-model="args.modelValue"
      :length="args.length"
      :disabled="args.disabled"
    />
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: 5,
    disabled: true,
  },
};
