import type { Meta, StoryObj } from "@storybook/vue3";
import BIcon from "./BIcon.vue";

const meta = {
  component: BIcon,
  argTypes: {
    name: {
      type: { summary: "text" },
      description: "This property will be the icon name.",
    },
    size: {
      type: { summary: "text" },
      description: "This property will be the icon name.",
    },
    filled: {
      type: { summary: "boolean" },
      description: "This property will be the icon name.",
    },
  },
} satisfies Meta<typeof BIcon>;
export default meta;

type Story = StoryObj<typeof BIcon>;

const defaultArgs = {
  name: 'sentiment_satisfied',
  size: '24px',
  filled: false,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BIcon },
    setup: () => {
      return { args };
    },
    template: '<BIcon :name="args.name" :size="args.size" :filled="args.filled" />',
  }),
  args: defaultArgs,
};
