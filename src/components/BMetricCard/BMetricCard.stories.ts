import type { Meta, StoryObj } from "@storybook/vue3";
import BMetricCard from "./BMetricCard.vue";

export default {
  component: BMetricCard,
  tags: ["autodocs"],
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
      options: ["default", "success", "danger", "sample", "card"],
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
      description: "This prop will be the value color, if the type is card.",
    },
		infoMessage: {
			type: { summary: 'text' },
			description: 'This prop will be the card info message.',
		},
		infoType: {
			type: { summary: 'text' },
      control: "select",
      options: ["default", "sample", "primary", "success", "danger", "warning"],
      table: {
        defaultValue: { summary: "default" },
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
    default: {
      description: "This slot will be shown below the card informations.",
    },
  },
} satisfies Meta<typeof BMetricCard>;

type Story = StoryObj<typeof BMetricCard>;

const defaultArgs = {
  title: 'Open',
  value: '50%',
  description: '100.000.000',
  icon: 'drafts',
  color: '',
  infoMessage: '',
  infoType: 'default',
  tooltipMinWidth: 'none',
  type: 'default',
  size: 'medium',
  loading: false,
  noTooltip: false,
  boldTitle: false,
}

export const Primary: Story = {
  render: (args: any) => ({
    components: { BMetricCard },
    setup() {
      return { args };
    },
    template: `
        <BMetricCard
          class="w-fit"
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
      `,
  }),
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { BMetricCard },
    setup() {
      return { args };
    },
    template: `
        <div class="flex gap-4">
          <BMetricCard
            class="w-fit h-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            size="small"
            :info-message="args.infoMessage"
            :info-type="args.infoType"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit h-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            size="medium"
            :info-message="args.infoMessage"
            :info-type="args.infoType"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit h-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            size="large"
            :info-message="args.infoMessage"
            :info-type="args.infoType"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
        </div>
      `,
  }),
  args: defaultArgs,
};

export const Types: Story = {
  render: (args: any) => ({
    components: { BMetricCard },
    setup() {
      return { args };
    },
    template: `
        <div class="flex gap-4">
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            type="default"
            :size="args.size"
            :info-message="args.infoMessage"
            :info-type="args.infoType"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            type="success"
            :size="args.size"
            :info-message="args.infoMessage"
            :info-type="args.infoType"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            type="danger"
            :size="args.size"
            :info-message="args.infoMessage"
            :info-type="args.infoType"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            type="sample"
            :size="args.size"
            :info-message="args.infoMessage"
            :info-type="args.infoType"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            type="card"
            :size="args.size"
            :info-message="args.infoMessage"
            :info-type="args.infoType"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
        </div>
      `,
  }),
  args: defaultArgs,
};

export const Info: Story = {
  render: (args: any) => ({
    components: { BMetricCard },
    setup() {
      return { args };
    },
    template: `
        <div class="flex gap-4">
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="default"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="sample"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="primary"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="info"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="success"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="danger"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="warning"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          />
        </div>
        <div class="flex gap-4 mt-4">
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="default"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            no-tooltip
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="sample"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            no-tooltip
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="primary"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            no-tooltip
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="info"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            no-tooltip
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="success"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            no-tooltip
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="danger"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            no-tooltip
            :bold-title="args.boldTitle"
          />
          <BMetricCard
            class="w-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :icon="args.icon"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            info-type="warning"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            no-tooltip
            :bold-title="args.boldTitle"
          />
        </div>
      `,
  }),
  args: {
    title: 'Open',
    value: '50%',
    description: '1.000.000',
    icon: 'drafts',
    color: '',
    infoMessage: '30%',
    infoType: 'primary',
    tooltipMinWidth: 'none',
    type: 'card',
    size: 'medium',
    loading: false,
    noTooltip: false,
  },
};

export const Slots: Story = {
  render: (args: any) => ({
    components: { BMetricCard },
    setup() {
      return { args };
    },
    template: `
        <div class="flex gap-xs">
          <BMetricCard
            class="w-fit h-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            :info-type="args.infoType"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          >
            <template #title-slot>
              Title
            </template>
            <template #info>
              Info
            </template>
            <template #value-slot>
              Value
            </template>
            <template #description-slot>
              Description
            </template>
            <div>
              Default
            </div>
          </BMetricCard>
          <BMetricCard
            class="w-fit h-fit"
            :title="args.title"
            :value="args.value"
            :description="args.description"
            :color="args.color"
            :type="args.type"
            :size="args.size"
            :info-message="args.infoMessage"
            :info-type="args.infoType"
            :tooltip-min-width="args.tooltipMinWidth"
            :loading="args.loading"
            :no-tooltip="args.noTooltip"
            :bold-title="args.boldTitle"
          >
            <template #title-slot>
              Title
            </template>
            <template #info>
              Info
            </template>
            <template #content>
              Content
            </template>
            <div>
              Default
            </div>
          </BMetricCard>
          <BMetricCard
            class="w-fit"
            title="Your June recipe"
            value="$100,000.00"
            color="var(--primary-foreground-low)"
            type="card"
            size="large"
            bold-title
          >
            <template #description-slot>
              <div class="flex items-center h-full pt-xs">
                <BTooltip text="info">
                  <BIcon name="info" size="18px" class="text-neutral-interaction-default" />
                </BTooltip>
              </div>
            </template>
            <div class="flex flex-col gap-sm mt-sm">
              <div class="flex items-center gap-xs text-neutral-foreground-high">
                  <BIcon name="calendar_month" size="16px" />
                  <p class="text-sm">Payment will be made by 04/30/2024</p>
              </div>
              <div class="flex gap-xs self-end">
                <BTag text="Processing payment" size="small" />
                <BButton variant="secondary" size="small">
                  View Details
                </BButton>
              </div>
            </div>
          </BMetricCard>
        </div>
      `,
  }),
  args: defaultArgs,
};