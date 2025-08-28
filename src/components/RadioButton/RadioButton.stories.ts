import type { Meta, StoryObj } from "@storybook/vue3";
import RadioButton from "./RadioButton.vue";

export default {
  component: RadioButton,
  argTypes: {
    modelValue: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    groupValue: {
      description: "Used by the Group component.",
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
    isDiv: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    default: {
      description: "This slot will be content inside the radio button.",
    },
  },
} satisfies Meta<typeof RadioButton>;

type Story = StoryObj<typeof RadioButton>;

const defaultArgs = {
  modelValue: false,
  groupValue: null,
  disabled: false,
  isDiv: false,
};

const defaultRender = (args: any) => ({
  components: { RadioButton },
  setup() {
    return { args };
  },
  template: `
    <RadioButton 
      v-model="args.modelValue" 
      name="test" 
      :group-value="args.groupValue" 
      :disabled="args.disabled" 
      :is-div="args.isDiv"
    >
      Test radio
    </RadioButton>
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

export const RadioDiv: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isDiv: true,
  },
};
