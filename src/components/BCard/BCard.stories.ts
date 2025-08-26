import type { Meta, StoryObj } from "@storybook/vue3";
import BCard from "./BCard.vue";

export default {
  component: BCard,
  argTypes: {
    default: {
      description: "This slot will be the card content.",
    },
  },
} satisfies Meta<typeof BCard>;

type Story = StoryObj<typeof BCard>;

export const Primary: Story = {
  render: (args: any) => ({
    components: { BCard },
    setup() {
      return { args };
    },
    template: `
        <BCard class="w-fit p-xs">
          <h2 class="mb-xs">Welcome</h2>
          <p>This is a simple card example.</p>
        </BCard>
        `,
  }),
  args: {},
};

export const Form: Story = {
  render: (args: any) => ({
    components: { BCard },
    setup() {
      return { args };
    },
    template: `
        <BCard class="w-fit">
            <div class="w-fit flex flex-col p-base gap-base">
                <h1 class="font-bold text-lg m-none">Form</h1>
                <BInput label-value="Name" />
                <BButton>Save</BButton>
            </div>
        </BCard>
        `,
  }),
  args: {},
};
