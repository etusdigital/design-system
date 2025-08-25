import type { Meta, StoryObj } from "@storybook/vue3";
import BIcon from "./BIcon.vue";

export default {
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

type Story = StoryObj<typeof BIcon>;

const defaultArgs = {
  name: 'sentiment_satisfied',
  size: '24px',
  filled: false,
};

const defaultRender = (args: any) => ({
  components: { BIcon },
  setup: () => {
    return { args };
  },
  template: '<BIcon :name="args.name" :size="args.size" :filled="args.filled" />',
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Filled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    filled: true,
  },
};
