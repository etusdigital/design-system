import type { Meta, StoryObj } from "@storybook/vue3";
import Radio from "./Radio.vue";

export default {
  component: Radio,
  argTypes: {
    modelValue: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    groupValue: {
      description: "Used by the Group component.",
      type: { name: "other", value: "any" },
      table: {
        defaultValue: { summary: "null" },
      },
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
    },
    variant: {
      type: { name: "string" },
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
} satisfies Meta<typeof Radio>;

type Story = StoryObj<typeof Radio>;

const defaultArgs = {
  modelValue: false,
  groupValue: null,
  disabled: false,
  variant: 'default' as const,
};

const defaultRender = (args: any) => ({
  components: { Radio },
  setup() {
    return { args };
  },
  template: `
    <Radio 
      v-model="args.modelValue" 
      name="test" 
      :group-value="args.groupValue" 
      :disabled="args.disabled" 
      :variant="args.variant"
    >
      Test radio
    </Radio>
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
