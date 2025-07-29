import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BColorPicker from "./BColorPicker.vue";

const meta = {
  component: BColorPicker,
  tags: ["autodocs"],
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
} satisfies Meta<typeof BColorPicker>;
export default meta;

type Story = StoryObj<typeof BColorPicker>;

const defaultArgs = {
  modelValue: "",
  type: "hexa",
  noShadow: false,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BColorPicker },
    setup() {
      return { args };
    },
    template:
      '<BColorPicker v-model="args.modelValue" :type="args.type" :no-shadow="args.noShadow" />',
  }),
  args: defaultArgs,
};
