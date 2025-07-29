import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BToggle from "./BToggle.vue";

const meta = {
	component: BToggle,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "Estado do toggle (v-model).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		rhs: {
			description: "Posiciona o toggle à direita do label.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		disabled: {
			description: "Desabilita o toggle.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		default: {
			description: "Slot para o label ao lado do toggle.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BToggle>;
export default meta;

type Story = StoryObj<typeof BToggle>;

const defaultArgs = {
	modelValue: false,
	rhs: false,
	disabled: false,
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BToggle },
		setup() {
			return { args };
		},
		template:
			'<BToggle v-model="args.modelValue" :disabled="args.disabled" :rhs="args.rhs">Test label</BToggle>',
	}),
	args: defaultArgs,
};

export const RHS: Story = {
	render: (args: any) => ({
		components: { BToggle },
		setup() {
			return { args };
		},
		template:
			'<BToggle v-model="args.modelValue" :disabled="args.disabled" rhs>Right-hand side</BToggle>',
	}),
	args: {
		...defaultArgs,
		rhs: true,
	},
};
