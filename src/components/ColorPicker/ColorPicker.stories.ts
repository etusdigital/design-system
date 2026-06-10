import type { Meta, StoryObj } from "@storybook/vue3";
import ColorPicker from "./ColorPicker.vue";

export default {
  component: ColorPicker,
  argTypes: {
    modelValue: {
      type: { name: "string" },
    },
    type: {
      type: { name: "string" },
      control: "select",
      options: ["hexa", "hsla", "hwb", "hsva", "rgba"],
      table: {
        defaultValue: { summary: "hexa" },
      },
      description: "This property will be the color type.",
    },
    noShadow: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description:
        "When noShadow property is true, the card will have no shadow.",
    },
    showAlpha: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "true" },
      },
      description: "When true, the opacity/alpha slider is shown.",
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description:
        "When disabled is true, the color picker is non-interactive.",
    },
  },
} satisfies Meta<typeof ColorPicker>;

type Story = StoryObj<typeof ColorPicker>;

const defaultArgs = {
  modelValue: "",
  type: "hexa" as const,
  noShadow: false,
  showAlpha: true,
  disabled: false,
};

const defaultRender = (args: any) => ({
  components: { ColorPicker },
  setup() {
    return { args };
  },
  template: `
    <ColorPicker
      v-model="args.modelValue"
      :type="args.type"
      :no-shadow="args.noShadow"
      :show-alpha="args.showAlpha"
      :disabled="args.disabled"
    />
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const NoShadow: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    noShadow: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};
