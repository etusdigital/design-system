import type { Meta, StoryObj } from "@storybook/vue3";
import BTooltip from "./BTooltip.vue";

export default {
  component: BTooltip,
  argTypes: {
    labelValue: {
      type: { summary: "text" },
      description: 'This is the text showed inside the tooltip.',
    },
    text: {
      type: { summary: "text" },
      description:
        'This is the text showed inside the tooltip. Deprecated, use labelValue instead.',
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
    label: {
      description:
        'Slot to show the tooltip text.',
    },
  },
} satisfies Meta<typeof BTooltip>;

type Story = StoryObj<typeof BTooltip>;

const defaultArgs = {
  labelValue: "Tooltip",
  position: "right",
};

const defaultRender = (args: any) => ({
  components: { BTooltip },
  setup() {
    return { args };
  },
  template: `
    <BTooltip :label-value="args.labelValue" :position="args.position">
      <BButton>Hover me</BButton>
    </BTooltip>
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Positions: Story = {
  render: (args: any) => ({
    components: { BTooltip },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-sm">
          <BTooltip :label-value="args.labelValue" position="right">
              <BIcon name="error" />
          </BTooltip>
          <BTooltip :label-value="args.labelValue" position="top">
              <BIcon name="error" />
          </BTooltip>
          <BTooltip :label-value="args.labelValue" position="left">
              <BIcon name="error" />
          </BTooltip>
          <BTooltip :label-value="args.labelValue" position="bottom">
              <BIcon name="error" />
          </BTooltip>
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Label: Story = {
  render: (args: any) => ({
    components: { BTooltip },
    setup() {
      return { args };
    },
    template: `
      <BTooltip :position="args.position">
        <BButton>Rich tooltip</BButton>
        <template #label>
          <div class="flex items-center gap-xs">
            <BIcon name="info" />
            <span>Rich content here</span>
          </div>
        </template>
      </BTooltip>
    `,
  }),
  args: {
    ...defaultArgs,
  },
};
