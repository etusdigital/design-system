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
        <BCard class="w-fit">
            <div class="w-fit flex flex-col px-[1em] py-[1em] gap-5">
                <h1 class="font-bold text-lg m-0">Form</h1>
                <BInput 
                    label="Name"
                    input-type="text"
                    size="100"
                />
                <BButton>Submit</BButton>
            </div>
        </BCard>
        `,
  }),
  args: {},
};
