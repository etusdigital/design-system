import type { Meta, StoryObj } from "@storybook/vue3";
import BPagination from "./BPagination.vue";

export default {
  component: BPagination,
  tags: ["autodocs"],
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
} satisfies Meta<typeof BPagination>;

type Story = StoryObj<typeof BPagination>;

const defaultArgs = {
  modelValue: 1,
  length: 1,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BPagination },
    setup() {
      return { args };
    },
    template: `
      <BPagination 
        v-model="args.modelValue"
        :length="args.length"
      />
    `,
  }),
  args: defaultArgs,
};
