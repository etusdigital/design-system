import type { Meta, StoryObj } from "@storybook/vue3";
import Skeleton from "./Skeleton.vue";

export default {
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

type Story = StoryObj<typeof Skeleton>;

export const Primary: Story = {
  render: (args: any) => ({
    components: { Skeleton },
    setup() {
      return { args };
    },
    template: `<Skeleton />`,
  }),
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { Skeleton },
    setup() {
      return { args };
    },
    template:
      `<div class="flex flex-col gap-sm">
        <Skeleton class="h-sm" />
        <Skeleton class="h-xl" />
        <Skeleton class="h-3xl" />
        <Skeleton class="h-5xl" />
        <Skeleton class="h-7xl" />
      </div>`,
  }),
};
