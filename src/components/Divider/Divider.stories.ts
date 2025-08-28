import type { Meta, StoryObj } from "@storybook/vue3";
import Divider from "./Divider.vue";

export default {
  component: Divider,
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
} satisfies Meta<typeof Divider>;

type Story = StoryObj<typeof Divider>;

const defaultArgs = {
  position: "right",
};

const defaultRender = (args: any) => ({
  components: { Divider },
  setup() {
    return { args };
  },
  template: `
    <Divider :position="args.position">
      Divider
    </Divider>
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Positions: Story = {
  render: (args: any) => ({
    components: { Divider },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-lg">
        <Divider position="left">
          Left
        </Divider>
        <Divider position="center">
          Center
        </Divider>
        <Divider position="right">
          Right
        </Divider>
      </div>
    `,
  }),
  args: defaultArgs,
};
