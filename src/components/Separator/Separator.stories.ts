import type { Meta, StoryObj } from "@storybook/vue3";
import Separator from "./Separator.vue";

export default {
  component: Separator,
  argTypes: {
    position: {
      type: { name: "string" },
      control: "select",
      options: ["left", "center", "right"],
      table: {
        defaultValue: { summary: "right" },
      },
    },
  },
} satisfies Meta<typeof Separator>;

type Story = StoryObj<typeof Separator>;

const defaultArgs = {
  position: "right" as const,
};

const defaultRender = (args: any) => ({
  components: { Separator },
  setup() {
    return { args };
  },
  template: `
    <Separator :position="args.position">
      Separator
    </Separator>
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Positions: Story = {
  render: (args: any) => ({
    components: { Separator },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-lg">
        <Separator position="left">
          Left
        </Separator>
        <Separator position="center">
          Center
        </Separator>
        <Separator position="right">
          Right
        </Separator>
      </div>
    `,
  }),
  args: defaultArgs,
};
