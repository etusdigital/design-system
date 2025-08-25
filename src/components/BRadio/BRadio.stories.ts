import type { Meta, StoryObj } from "@storybook/vue3";
import BRadio from "./BRadio.vue";

export default {
  component: BRadio,
  argTypes: {
    modelValue: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    groupValue: {
      description: "Used by the BGroup component.",
      type: { summary: "any" },
      table: {
        defaultValue: { summary: "null" },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    variant: {
      type: { summary: "text" },
      control: "select",
      options: [
        "default",
        "onboarding",
      ],
      table: {
        defaultValue: { summary: 'default' },
      },
      description: "This will be the radio variantion.",
    },
    default: {
      description: "This slot will be displayed next to the radio circle.",
    },
  },
} satisfies Meta<typeof BRadio>;

type Story = StoryObj<typeof BRadio>;

const defaultArgs = {
  modelValue: false,
  groupValue: null,
  disabled: false,
  variant: 'default' as const,
};

const defaultRender = (args: any) => ({
  components: { BRadio },
  setup() {
    return { args };
  },
  template: `
    <BRadio 
      v-model="args.modelValue" 
      name="test" 
      :group-value="args.groupValue" 
      :disabled="args.disabled" 
      :variant="args.variant"
    >
      Test radio
    </BRadio>
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

export const Onboarding: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    variant: 'onboarding',
  },
};
