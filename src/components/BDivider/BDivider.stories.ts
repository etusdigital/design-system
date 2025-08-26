import type { Meta, StoryObj } from "@storybook/vue3";
import BDivider from "./BDivider.vue";

export default {
  component: BDivider,
  argTypes: {
    position: {
      type: { summary: "text" },
      control: "select",
      options: ["left", "center", "right"],
      table: {
        defaultValue: { summary: "right" },
      },
    },
  },
} satisfies Meta<typeof BDivider>;

type Story = StoryObj<typeof BDivider>;

const defaultArgs = {
  position: "right",
};

const defaultRender = (args: any) => ({
  components: { BDivider },
  setup() {
    return { args };
  },
  template: `
    <BDivider :position="args.position">
      Divider
    </BDivider>
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Positions: Story = {
  render: (args: any) => ({
    components: { BDivider },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-lg">
        <BDivider position="left">
          Left
        </BDivider>
        <BDivider position="center">
          Center
        </BDivider>
        <BDivider position="right">
          Right
        </BDivider>
      </div>
    `,
  }),
  args: defaultArgs,
};
