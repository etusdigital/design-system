import type { Meta, StoryObj } from "@storybook/vue3";
import StepOption from "./StepOption.vue";

export default {
  component: StepOption,
  argTypes: {
    title: {
      type: { summary: "string" },
      description: "This prop will be the option title.",
    },
    description: {
      type: { summary: "string" },
      description: "This prop will be the option description.",
    },
    icon: {
      type: { summary: "string" },
      description: "This prop will be the option icon.",
    },
    color: {
      type: { summary: "string" },
      table: {
        defaultValue: { summary: "primary" },
      },
      description: "This prop will be the icon and title color.",
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    isIconRound: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "If this prop is true, the icon won't be surrounded by a circle with the card color.",
    },
  },
} satisfies Meta<typeof StepOption>;

type Story = StoryObj<typeof StepOption>;

const defaultArgs = {
  title: "Step Name",
  description:
    "Lorem ipsum dolor sit amet consectetur. Tortor ipsum ut massa interdum.",
  icon: "email",
  color: "",
  disabled: false,
  isIconRound: false,
};

const defaultRender = (args: any) => ({
  components: { StepOption },
  setup() {
    return { args };
  },
  template: `
      <StepOption
        class="max-w-[400px]"
        :title="args.title"
        :description="args.description"
        :icon="args.icon"
        :color="args.color"
        :disabled="args.disabled"
        :is-icon-round="args.isIconRound"
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
    disabled: true,
  },
};

export const IsIconRound: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "info",
    isIconRound: true,
  },
};
