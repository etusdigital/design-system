import type { Meta, StoryObj } from "@storybook/vue3";
import Icon from "./Icon.vue";

export default {
  component: Icon,
  argTypes: {
    name: {
      type: { name: "string" },
      description: "This property will be the icon name.",
    },
    filled: {
      type: { name: "boolean" },
      description: "Whether to use the filled variant.",
    },
  },
} satisfies Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

const defaultArgs = {
  name: 'sentiment_satisfied',
  filled: false,
};

const defaultRender = (args: any) => ({
  components: { Icon },
  setup: () => {
    return { args };
  },
  template: '<Icon :name="args.name" :filled="args.filled" />',
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
