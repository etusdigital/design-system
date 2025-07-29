import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BHistory from "./BHistory.vue";

const meta = {
	component: BHistory,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description:
				'Will be an item from the "items" array at the selected index.',
			control: { type: "object" },
			table: { type: { summary: "any" } },
		},
		items: {
			description: "This property will be the historic items.",
			control: { type: "object" },
			table: { type: { summary: "Item[]" } },
		},
		position: {
			description: "This is the historic position.",
			control: "select",
			options: ["top", "bottom", "left", "right"],
			table: {
				type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
				defaultValue: { summary: "right" },
			},
		},
		type: {
			description:
				"This is historic type, only if the item doesn't have a type property.",
			control: "select",
			options: ["primary", "info", "success", "warning", "danger", "neutral"],
			table: {
				type: {
					summary:
						"'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral'",
				},
				defaultValue: { summary: "info" },
			},
		},
		disabled: {
			description: "Don't allow user to change the select item.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		item: {
			description:
				"This slot will be displayed for each item passed. Params: item, index and active",
			table: { type: { summary: "slot" } },
		},
	},
} satisfies Meta<typeof BHistory>;

export default meta;

type Story = StoryObj<typeof BHistory>;

type BHistoryStoryArgs = Partial<InstanceType<typeof BHistory>["$props"]>;

const defaultArgs: BHistoryStoryArgs = {
	modelValue: null,
	items: [
		{ label: "Person 1", something: 0, date: new Date() },
		{ label: "Person 2", something: 1, date: new Date() },
		{ label: "Person 3", something: 2, date: new Date() },
		{ label: "Person 4", something: 3, date: new Date() },
		{ label: "Person 5", something: 4, date: new Date() },
	],
	position: "right",
	type: "primary",
	disabled: false,
};

const defaultHtml = `<BHistory
            v-model="args.modelValue"
            :items="args.items"
            :position="args.position"
            :type="args.type"
            :disabled="args.disabled"
        >
            <template #item="{ item, index, active }">
                <p
                    class="text-sm mb-[10px] hover:underline"
                    :class="{
                        'font-bold': active, 
                        'text-primary-interaction-default': (item.type || args.type) == 'primary', 
                        'text-informative-interaction-default': (item.type || args.type) == 'info', 
                        'text-success-interaction-default': (item.type || args.type) == 'success', 
                        'text-warning-interaction-default': (item.type || args.type) == 'warning', 
                        'text-danger-interaction-default': (item.type || args.type) == 'danger',
                        'text-neutral-interaction-default': (item.type || args.type) == 'neutral',
                    }"
                >
                    <span
                        class="text-neutral-foreground-negative py-[3px] px-[6px] mt-[5px] rounded-[20px] text-xs font-normal mr-[.6em]"
                        :class="{
                            'font-bold': active, 
                            'bg-primary-interaction-default': (item.type || args.type) == 'primary', 
                            'bg-informative-interaction-default': (item.type || args.type) == 'info', 
                            'bg-success-interaction-default': (item.type || args.type) == 'success', 
                            'bg-warning-interaction-default': (item.type || args.type) == 'warning', 
                            'bg-danger-interaction-default': (item.type || args.type) == 'danger',
                            'bg-neutral-interaction-default': (item.type || args.type) == 'neutral',
                        }"
                        v-if="index == 0"
                    >
                        Actual version
                    </span>
                    {{ 
                        item.date.toLocaleDateString(
                            'en-US',
                            index == 0 ?
                            { day: '2-digit', month: 'long', year: 'numeric' } :
                            { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
                        ) 
                    }}
                </p>
                <div class="flex items-center justify-start mt-[16px] mb-[5px]">
                    <div class="w-[20px] h-[20px] rounded-[50%] bg-neutral-foreground-disabled" />
                    <p class="text-sm text-neutral-foreground-low ml-sm" :class="{'text-neutral-foreground-high': active }">{{ item.label }}</p>
                </div>
            </template>
        </BHistory>`;

export const Primary: Story = {
	render: (args: any) => ({
		components: { BHistory },
		setup() {
			return { args };
		},
		template: defaultHtml,
	}),
	args: defaultArgs,
};

export const Types: Story = {
	render: (args: any) => ({
		components: { BHistory },
		setup() {
			return { args };
		},
		template: `
        <div class="flex gap-xxs">
            ${["primary", "info", "success", "warning", "danger", "neutral"]
							.map((type) => {
								return defaultHtml.replaceAll("args.type", `'${type}'`);
							})
							.join("")}
        </div>
        `,
	}),
	args: defaultArgs,
};

export const MultiType: Story = {
	render: (args: any) => ({
		components: { BHistory },
		setup() {
			return { args };
		},
		template: defaultHtml,
	}),
	args: {
		...defaultArgs,
		disabled: true,
		items: [
			{ label: "Person 1", something: 0, date: new Date(), type: "primary" },
			{ label: "Person 2", something: 1, date: new Date(), type: "info" },
			{ label: "Person 3", something: 2, date: new Date(), type: "success" },
			{ label: "Person 4", something: 3, date: new Date(), type: "warning" },
			{ label: "Person 5", something: 4, date: new Date(), type: "danger" },
			{ label: "Person 6", something: 5, date: new Date(), type: "neutral" },
		],
	},
};

export const Icons: Story = {
	render: (args: any) => ({
		components: { BHistory },
		setup() {
			return { args };
		},
		template: defaultHtml,
	}),
	args: {
		...defaultArgs,
		disabled: true,
		items: [
			{
				label: "Person 1",
				something: 0,
				date: new Date(),
				type: "info",
				icon: "info_i",
			},
			{
				label: "Person 2",
				something: 1,
				date: new Date(),
				type: "neutral",
				icon: "check",
			},
			{
				label: "Person 3",
				something: 2,
				date: new Date(),
				type: "success",
				icon: "check",
			},
			{
				label: "Person 4",
				something: 3,
				date: new Date(),
				type: "warning",
				icon: "exclamation",
			},
			{
				label: "Person 5",
				something: 4,
				date: new Date(),
				type: "danger",
				icon: "close",
			},
		],
	},
};

export const RoundIcons: Story = {
	render: (args: any) => ({
		components: { BHistory },
		setup() {
			return { args };
		},
		template: defaultHtml,
	}),
	args: {
		...defaultArgs,
		disabled: true,
		items: [
			{
				label: "Person 1",
				something: 0,
				date: new Date(),
				type: "primary",
				icon: "schedule",
				isIconRound: true,
			},
			{
				label: "Person 2",
				something: 1,
				date: new Date(),
				type: "info",
				icon: "schedule",
				isIconRound: true,
			},
			{
				label: "Person 3",
				something: 2,
				date: new Date(),
				type: "neutral",
				icon: "check_circle",
				isIconRound: true,
			},
			{
				label: "Person 4",
				something: 3,
				date: new Date(),
				type: "success",
				icon: "check_circle",
				isIconRound: true,
			},
			{
				label: "Person 5",
				something: 4,
				date: new Date(),
				type: "warning",
				icon: "error",
				isIconRound: true,
			},
			{
				label: "Person 6",
				something: 5,
				date: new Date(),
				type: "danger",
				icon: "cancel",
				isIconRound: true,
			},
		],
	},
};

export const UnfilledIcons: Story = {
	render: (args: any) => ({
		components: { BHistory },
		setup() {
			return { args };
		},
		template: defaultHtml,
	}),
	args: {
		...defaultArgs,
		disabled: true,
		items: [
			{
				label: "Person 1",
				something: 0,
				date: new Date(),
				type: "primary",
				icon: "schedule",
				unfilled: true,
				isIconRound: true,
			},
			{
				label: "Person 2",
				something: 0,
				date: new Date(),
				type: "info",
				icon: "schedule",
				unfilled: true,
				isIconRound: true,
			},
			{
				label: "Person 3",
				something: 1,
				date: new Date(),
				type: "neutral",
				icon: "check_circle",
				unfilled: true,
				isIconRound: true,
			},
			{
				label: "Person 4",
				something: 2,
				date: new Date(),
				type: "success",
				icon: "check_circle",
				unfilled: true,
				isIconRound: true,
			},
			{
				label: "Person 5",
				something: 3,
				date: new Date(),
				type: "warning",
				icon: "error",
				unfilled: true,
				isIconRound: true,
			},
			{
				label: "Person 6",
				something: 4,
				date: new Date(),
				type: "danger",
				icon: "cancel",
				unfilled: true,
				isIconRound: true,
			},
		],
	},
};
