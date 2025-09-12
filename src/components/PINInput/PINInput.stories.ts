import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import PINInput from "./PINInput.vue";

export default {
  component: PINInput,
  argTypes: {
    modelValue: {
      type: { summary: "string" },
      description: "The current value of the PIN input.",
    },
    length: {
      type: { summary: "number" },
      description: "Number of input fields to display.",
      table: {
        defaultValue: { summary: "6" },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      description: "Disables the PIN input fields.",
      table: {
        defaultValue: { summary: false },
      },
    },
    placeholder: {
      type: { summary: "string" },
      description: "Placeholder text for each input field.",
    },
    separator: {
      type: { summary: "string" },
      description: "Separator character between input fields.",
    },
    type: {
      type: { summary: "text" },
      control: "select",
      options: ["text", "password"],
      table: {
        defaultValue: { summary: "text" },
      },
      description: "Input field type.",
    },
    mask: {
      type: { summary: "boolean" },
      description: "Whether to mask the input values.",
      table: {
        defaultValue: { summary: false },
      },
    },
    otp: {
      type: { summary: "boolean" },
      description: "Whether this is an OTP input.",
      table: {
        defaultValue: { summary: false },
      },
    },
    "update:modelValue": {
      type: { summary: "function" },
      description: "Emitted when the PIN value changes.",
    },
    complete: {
      type: { summary: "function" },
      description: "Emitted when all PIN fields are filled.",
    },
  },
} satisfies Meta<typeof PINInput>;

type Story = StoryObj<typeof PINInput>;

const defaultArgs = {
  modelValue: "",
  length: 6,
  disabled: false,
  placeholder: "",
  separator: "",
  type: "text" as const,
  mask: false,
  otp: false,
};

const defaultHtml = `
  <PINInput 
    v-model="args.modelValue"
    :length="args.length"
    :disabled="args.disabled"
    :placeholder="args.placeholder"
    :separator="args.separator"
    :type="args.type"
    :mask="args.mask"
    :otp="args.otp"
    @complete="(val) => console.log('Complete:', val)"
  />
`;

const defaultRender = (args: any) => ({ 
  components: { PINInput },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Default: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
    length: 4,
  },
};

export const Separator: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    separator: "-",
    length: 4,
  },
};

export const Password: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    type: "password",
    length: 4,
  },
};

export const Length: Story = {
  render: (args: any) => ({
    components: { PINInput },
    setup() {
      const value4 = ref("");
      const value8 = ref("");
      return { args, value4, value8 };
    },
    template: `<div class="flex flex-col gap-xs">${[4, 8].map((length) => `
      ${defaultHtml.replaceAll('args.modelValue', `value${length}`).replaceAll('args.length', `${length}`)}
    `).join('')}</div>`,
  }),
  args: defaultArgs,
};