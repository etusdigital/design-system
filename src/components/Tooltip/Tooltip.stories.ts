import type { Meta, StoryObj } from "@storybook/vue3";
import Tooltip from "./Tooltip.vue";

export default {
  component: Tooltip,
  argTypes: {
    labelValue: {
      type: { name: "string" },
      description: 'This is the text showed inside the tooltip.',
    },
    text: {
      type: { name: "string" },
      description:
        'This is the text showed inside the tooltip. Deprecated, use labelValue instead.',
    },
    position: {
      type: { name: "string" },
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
} satisfies Meta<typeof Tooltip>;

type Story = StoryObj<typeof Tooltip>;

const defaultArgs = {
  labelValue: "Tooltip",
  position: "right" as const,
};

const defaultRender = (args: any) => ({
  components: { Tooltip },
  setup() {
    return { args };
  },
  template: `
    <Tooltip :label-value="args.labelValue" :position="args.position">
      <Button>Hover me</Button>
    </Tooltip>
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Positions: Story = {
  render: (args: any) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-sm">
          <Tooltip :label-value="args.labelValue" position="right">
              <Icon name="error" />
          </Tooltip>
          <Tooltip :label-value="args.labelValue" position="top">
              <Icon name="error" />
          </Tooltip>
          <Tooltip :label-value="args.labelValue" position="left">
              <Icon name="error" />
          </Tooltip>
          <Tooltip :label-value="args.labelValue" position="bottom">
              <Icon name="error" />
          </Tooltip>
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Label: Story = {
  render: (args: any) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <Tooltip :position="args.position">
        <Button>Rich tooltip</Button>
        <template #label>
          <div class="flex items-center gap-xs">
            <Icon name="info" />
            <span>Rich content here</span>
          </div>
        </template>
      </Tooltip>
    `,
  }),
  args: {
    ...defaultArgs,
  },
};
