import type { Meta, StoryObj } from "@storybook/vue3";
import Icon from "./Icon.vue";

export default {
  component: Icon,
  argTypes: {
    name: {
      type: { name: "string" },
      description: "This property will be the icon name.",
    },
    size: {
      type: { name: "string" },
      description: "Controls the icon size using CSS font-size values.",
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
  size: '24px',
  filled: false,
};

const defaultRender = (args: any) => ({
  components: { Icon },
  setup: () => {
    return { args };
  },
  template: '<Icon :name="args.name" :size="args.size" :filled="args.filled" />',
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
