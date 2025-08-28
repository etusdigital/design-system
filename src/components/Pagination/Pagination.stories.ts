import type { Meta, StoryObj } from "@storybook/vue3";
import Pagination from "./Pagination.vue";

export default {
  component: Pagination,
  argTypes: {
    modelValue: {
      type: { summary: "number" },
      table: {
        defaultValue: { summary: 1 },
      },
      description: "This property will be the selected page.",
    },
    length: {
      type: { summary: "number" },
      table: {
        defaultValue: { summary: 1 },
      },
      description: "This property will be the number of pages.",
    },
  },
} satisfies Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

const defaultArgs = {
  modelValue: 1,
  length: 10,
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
    />
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};
