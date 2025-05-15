import type { Meta, StoryObj } from "@storybook/vue3";
import BTooltip from "./BTooltip.vue";

const meta = {
  component: BTooltip,
  tags: ["autodocs"],
  argTypes: {
    text: {
      type: { summary: "text" },
      description:
        'This is the text showed inside the tooltip. It can be passed as props(:text="Text") or as slot',
    },
    position: {
      type: { summary: "text" },
      control: "select",
      options: ["top", "bottom", "left", "right"],
      table: {
        defaultValue: { summary: "right" },
      },
      description: "This is the position tooltip will be placed.",
    },
  },
  args: {
    text: "Tooltip",
    position: "right",
  },
} satisfies Meta<typeof BTooltip>;
export default meta;

type Story = StoryObj<typeof BTooltip>;

const defaultArgs = {
  text: "Tooltip",
  position: "right",
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BTooltip },
    setup() {
      return { args };
    },
    template: `
      <div class="px-[5em] py-[1.5em]">
          <BTooltip :text="args.text" :position="args.position">
              <BInput />
          </BTooltip>
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Positions: Story = {
  render: (args: any) => ({
    components: { BTooltip },
    setup() {
      return { args };
    },
    template: `
      <div class="text-2xl flex gap-2 py-[.9em] px-[.5em]">
          <BTooltip :text="args.text" position="right">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="top">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="left">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="bottom">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
      </div>
    `,
  }),
  args: defaultArgs,
};
