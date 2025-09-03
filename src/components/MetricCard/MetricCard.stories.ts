import type { Meta, StoryObj } from "@storybook/vue3";
import MetricCard from "./MetricCard.vue";

export default {
  component: MetricCard,
  argTypes: {
    title: {
      type: { summary: "string" },
      description: "This prop will be the card title.",
    },
    value: {
      type: { summary: "string | number" },
      description: "This prop will be the card value.",
    },
    description: {
      type: { summary: "string | number" },
      description: "This prop will be the card description.",
    },
    icon: {
      type: { summary: "string" },
      description: "This prop will be the card icon.",
    },
    type: {
      type: { summary: "text" },
      control: "select",
      options: ["default", "secondary", "dashed"],
      table: {
        defaultValue: { summary: "default" },
      },
      description: "This property will be select container color.",
    },
    size: {
      type: { summary: "text" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    color: {
      type: { summary: "string" },
      control: "select",
      options: ["primary", "info", "success", "warning", "danger", "neutral"],
      table: {
        defaultValue: { summary: "neutral" },
      },
      description: "This prop will be the value color, if the type is card.",
    },
		infoMessage: {
			type: { summary: 'text' },
			description: 'This prop will be the card info message.',
		},
		infoType: {
			type: { summary: 'text' },
      control: "select",
      options: ["primary", "info", "success", "warning", "danger", "neutral"],
      table: {
        defaultValue: { summary: "neutral" },
      },
			description: 'This prop will be the info icon or text color. Works with default and card types',
		},
		tooltipMinWidth: {
			type: { summary: 'text' },
			table: {
				defaultValue: { summary: 'none' },
			},
			description: "This property will be info tooltip min-width.",
		},
    loading: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "This prop will determine if the card is loading.",
    },
    noTooltip: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "This prop will determine if the info message won't be shown inside a tooltip.",
    },
    boldTitle: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "This prop will determine if the title will be bold.",
    },
    default: {
      description: "This slot will be shown below the card informations.",
    },
    'title-slot': {
      description: "This slot will be replace the title.",
    },
    'value-slot': {
      description: "This slot will be replace the value.",
    },
    'description-slot': {
      description: "This slot will be replace the description.",
    },
    content: {
      description: "This slot will be replace the value and the description.",
    },
    info: {
      description: "This slot will be shown next to the title.",
    },
  },
} satisfies Meta<typeof MetricCard>;

type Story = StoryObj<typeof MetricCard>;

const defaultArgs = {
  title: 'Open',
  value: '50%',
  description: '100.000.000',
  icon: 'drafts',
  color: 'neutral',
  infoMessage: '',
  infoType: 'default',
  tooltipMinWidth: 'none',
  type: 'default',
  size: 'medium',
  loading: false,
  noTooltip: false,
  boldTitle: false,
}

const defaultHtml = `
  <MetricCard
    class="w-fit h-fit"
    :title="args.title"
    :value="args.value"
    :description="args.description"
    :icon="args.icon"
    :color="args.color"
    :type="args.type"
    :size="args.size"
    :info-message="args.infoMessage"
    :info-type="args.infoType"
    :tooltip-min-width="args.tooltipMinWidth"
    :loading="args.loading"
    :no-tooltip="args.noTooltip"
    :bold-title="args.boldTitle"
  />
`

const defaultRender = (args: any) => ({
  components: { MetricCard },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Types: Story = {
  render: (args: any) => ({
    components: { MetricCard },
    setup() {
      return { args };
    },
    template: `
        <div class="flex gap-4">
          ${["default", "secondary", "dashed"].map((type) => {
            return defaultHtml.replaceAll("args.type", `'${type}'`);
          }).join("")}
        </div>
      `,
  }),
  args: defaultArgs,
};

export const Colors: Story = {
  render: (args: any) => ({
    components: { MetricCard },
    setup() {
      return { args };
    },
    template: `
        <div class="flex gap-4">
          ${["primary", "info", "success", "warning", "danger", "neutral"].map((color) => {
            return defaultHtml.replaceAll("args.color", `'${color}'`);
          }).join("")}
        </div>
      `,
  }),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { MetricCard },
    setup() {
      return { args };
    },
    template: `
        <div class="flex gap-4">
          ${["small", "medium", "large"].map((size) => {
            return defaultHtml.replaceAll("args.size", `'${size}'`);
          }).join("")}
        </div>
      `,
  }),
  args: defaultArgs,
};

export const InfoMessage: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: '30%',
  },
};

export const InfoTypes: Story = {
  render: (args: any) => ({
    components: { MetricCard },
    setup() {
      return { args };
    },
    template: `
        <div class="flex gap-4">
          ${["primary", "info", "success", "warning", "danger", "neutral"].map((type) => {
            return defaultHtml.replaceAll("args.infoType", `'${type}'`);
          }).join("")}
        </div>
      `,
  }),
  args: {
    ...defaultArgs,
    infoMessage: '30%',
  },
};

export const Loading: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    loading: true,
  },
};

export const NoTooltip: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: '30%',
    noTooltip: true,
  },
};

export const BoldTitle: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    boldTitle: true,
  },
};

export const Slots: Story = {
  render: (args: any) => ({
    components: { MetricCard },
    setup() {
      return { args };
    },
    template: `
        <MetricCard
          class="w-fit"
          title="Your June recipe"
          value="$100,000.00"
          color="var(--primary-foreground-low)"
          type="secondary"
          size="large"
          bold-title
        >
          <template #description-slot>
            <div class="flex items-center h-full pt-xs">
              <Tooltip text="info">
                <Icon name="info" size="var(--spacing-lg)" class="text-neutral-interaction-default" />
              </Tooltip>
            </div>
          </template>
          <div class="flex flex-col gap-sm mt-sm">
            <div class="flex items-center gap-xs text-neutral-foreground-high">
                <Icon name="calendar_month" size="var(--spacing-base)" />
                <p class="text-sm">Payment will be made by 04/30/2024</p>
            </div>
            <div class="flex gap-xs self-end">
              <Tag text="Processing payment" size="small" />
              <Button variant="secondary" size="small">
                View Details
              </Button>
            </div>
          </div>
        </MetricCard>
      `,
  }),
  args: defaultArgs,
};