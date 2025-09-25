import type { Meta, StoryObj } from "@storybook/vue3";
import Spinner from "./Spinner.vue";

export default {
  component: Spinner,
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  render: (args: any) => ({
    components: { Spinner },
    setup() {
      return { args };
    },
    template: "<Spinner />",
  }),
};

export const Colors: Story = {
  render: (args: any) => ({
    components: { Spinner },
    setup() {
      return { args };
    },
    template:
      `<div class="flex gap-sm">
        <Spinner class="text-neutral-interaction-default" />
        <Spinner class="text-primary-interaction-default" />
        <Spinner class="text-informative-interaction-default" />
        <Spinner class="text-success-interaction-default" />
        <Spinner class="text-warning-interaction-default" />
        <Spinner class="text-danger-interaction-default" />
      </div>`,
  }),
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { Spinner },
    setup() {
      return { args };
    },
    template:
      `<div class="flex gap-sm">
        <Spinner class="text-xs" />
        <Spinner class="text-xl" />
        <Spinner class="text-3xl" />
        <Spinner class="text-5xl" />
        <Spinner class="text-7xl" />
      </div>`,
  }),
};
