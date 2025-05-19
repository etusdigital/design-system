import type { Meta, StoryObj } from "@storybook/vue3";
import BRadio from "./BRadio.vue";

const meta = {
	component: BRadio,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "v-model para o estado do radio (checked/unchecked).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		groupValue: {
			description: "Valor associado a este radio dentro de um BGroup.",
			control: { type: "text" },
			table: {
				type: { summary: "any" },
				defaultValue: { summary: "null" },
			},
		},
		disabled: {
			description: "Desabilita o radio.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		variant: {
			description: "Variante visual do radio.",
			control: "select",
			options: ["default", "onboarding"],
			table: {
				type: { summary: "'default' | 'onboarding'" },
				defaultValue: { summary: "default" },
			},
		},
		default: {
			description: "Slot para o label ao lado do radio.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BRadio>;
export default meta;

type Story = StoryObj<typeof BRadio>;

export const Primary: Story = {
	render: (args: any) => ({
		components: { BRadio },
		setup() {
			return { args };
		},
		template:
			'<BRadio v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :variant="args.variant">Test radio</BRadio>',
	}),
	args: {
		modelValue: false,
		groupValue: null,
		disabled: false,
		variant: "default",
	},
};
