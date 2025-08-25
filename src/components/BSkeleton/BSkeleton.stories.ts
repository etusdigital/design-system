import type { Meta, StoryObj } from "@storybook/vue3";
import BSkeleton from "./BSkeleton.vue";

export default {
  component: BSkeleton,
} satisfies Meta<typeof BSkeleton>;

type Story = StoryObj<typeof BSkeleton>;

export const Primary: Story = {
  render: (args: any) => ({
    components: { BSkeleton },
    setup() {
      return { args };
    },
    template: `<BSkeleton />`,
  }),
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { BSkeleton },
    setup() {
      return { args };
    },
    template:
      `<div class="flex flex-col gap-sm">
        <BSkeleton class="h-sm" />
        <BSkeleton class="h-xl" />
        <BSkeleton class="h-3xl" />
        <BSkeleton class="h-5xl" />
        <BSkeleton class="h-7xl" />
      </div>`,
  }),
};
