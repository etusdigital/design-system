import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BSpinner from "./BSpinner.vue";

const meta = {
  component: BSpinner,
} satisfies Meta<typeof BSpinner>;
export default meta;

type Story = StoryObj<typeof BSpinner>;

export const Primary: Story = {
  render: (args: any) => ({
    components: { BSpinner },
    setup() {
      return { args };
    },
    template: "<BSpinner />",
  }),
};

export const Colors: Story = {
  render: (args: any) => ({
    components: { BSpinner },
    setup() {
      return { args };
    },
    template:
      '<div style="display: flex; gap: 2rem; background-color: #202020; padding: 1rem">' +
      '\n<BSpinner style="color: white" />' +
      '\n<BSpinner style="color: red" />' +
      '\n<BSpinner style="color: blue" />' +
      '\n<BSpinner style="color: #F0F020" />' +
      '\n<BSpinner style="color: #20D0D0" />' +
      '\n<BSpinner style="color: #20F030" />' +
      "</div>",
  }),
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { BSpinner },
    setup() {
      return { args };
    },
    template:
      '<div style="display: flex; gap: 2rem">' +
      '\n<BSpinner style="font-size: .5rem" />' +
      '\n<BSpinner style="font-size: 1rem" />' +
      '\n<BSpinner style="font-size: 2rem" />' +
      '\n<BSpinner style="font-size: 3rem" />' +
      '\n<BSpinner style="font-size: 4rem" />' +
      "</div>",
  }),
};
