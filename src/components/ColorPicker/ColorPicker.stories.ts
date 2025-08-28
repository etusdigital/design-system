import type { Meta, StoryObj } from "@storybook/vue3";
import ColorPicker from "./ColorPicker.vue";

export default {
  component: ColorPicker,
  argTypes: {
    modelValue: {
      type: { summary: "text" },
    },
    type: {
      type: { summary: "text" },
      control: "select",
      options: ["hexa", "hsla", "hwb", "hsva", "rgba"],
      table: {
        defaultValue: { summary: "hexa" },
      },
      description: "This property will be the color type.",
    },
    noShadow: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "When noShadow property is true, the card will have no shadow.",
    },
  },
} satisfies Meta<typeof ColorPicker>;

type Story = StoryObj<typeof ColorPicker>;

const defaultArgs = {
  modelValue: "",
  type: "hexa",
  noShadow: false,
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
