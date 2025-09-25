import type { Meta, StoryObj } from "@storybook/vue3";
import Card from "./Card.vue";

export default {
  component: Card,
  argTypes: {
    default: {
      description: "This slot will be the card content.",
    },
  },
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  render: (args: any) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
        <Card class="w-fit p-xs">
          <h2 class="mb-xs">Welcome</h2>
          <p>This is a simple card example.</p>
        </Card>
        `,
  }),
  args: {},
};

export const Form: Story = {
  render: (args: any) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
        <Card class="w-fit">
            <div class="w-fit flex flex-col p-base gap-base">
                <h1 class="font-bold text-lg m-none">Form</h1>
                <Input label-value="Name" />
                <Button>Save</Button>
            </div>
        </Card>
        `,
  }),
  args: {},
};
