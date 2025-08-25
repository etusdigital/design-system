import type { Meta, StoryObj } from "@storybook/vue3";
import BSpinner from "./BSpinner.vue";

export default {
  component: BSpinner,
} satisfies Meta<typeof BSpinner>;

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
      `<div class="flex gap-sm">
        <BSpinner class="text-neutral-interaction-default" />
        <BSpinner class="text-primary-interaction-default" />
        <BSpinner class="text-informative-interaction-default" />
        <BSpinner class="text-success-interaction-default" />
        <BSpinner class="text-warning-interaction-default" />
        <BSpinner class="text-danger-interaction-default" />
      </div>`,
  }),
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { BSpinner },
    setup() {
      return { args };
    },
    template:
      `<div class="flex gap-sm">
        <BSpinner class="text-xs" />
        <BSpinner class="text-xl" />
        <BSpinner class="text-3xl" />
        <BSpinner class="text-5xl" />
        <BSpinner class="text-7xl" />
      </div>`,
  }),
};
