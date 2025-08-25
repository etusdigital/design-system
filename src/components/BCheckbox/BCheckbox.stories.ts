import type { Meta, StoryObj } from "@storybook/vue3";
import BCheckbox from "./BCheckbox.vue";

const meta = {
	component: BCheckbox,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description:
				"Estado do checkbox (v-model). Pode ser boolean ou null se allowIndeterminate for true.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | null" },
				defaultValue: { summary: "false" },
			},
		},
		rhs: {
			description: "Posiciona o checkbox à direita do label.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		allowIndeterminate: {
			description:
				"Permite que o checkbox tenha um estado indeterminado (modelValue pode ser null).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		disabled: {
			description: "Desabilita o checkbox.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		default: {
			description: "Slot para o label ao lado do checkbox.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BCheckbox>;
export default meta;

type Story = StoryObj<typeof BCheckbox>;

const defaultArgs = {
	modelValue: false,
	rhs: false,
	allowIndeterminate: false,
	disabled: false,
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BCheckbox },
		setup() {
			return { args };
		},
		template:
			'<BCheckbox id="primary-checkbox" v-model="args.modelValue" :disabled="args.disabled" :rhs="args.rhs" :allowIndeterminate="args.allowIndeterminate">Test label</BCheckbox>',
	}),
	args: defaultArgs,
};

export const RHS: Story = {
	render: (args: any) => ({
		components: { BCheckbox },
		setup() {
			return { args };
		},
		template:
			'<BCheckbox id="rhs-checkbox" v-model="args.modelValue" :disabled="args.disabled" :allowIndeterminate="args.allowIndeterminate" rhs>Test label</BCheckbox>',
	}),
	args: defaultArgs,
};
