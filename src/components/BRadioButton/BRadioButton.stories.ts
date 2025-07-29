import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BRadioButton from "./BRadioButton.vue";

const meta = {
	component: BRadioButton,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "Estado do radio button (v-model).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		groupValue: {
			description: "Valor associado a este radio button, usado com BGroup.",
			control: { type: "text" },
			table: {
				type: { summary: "any" },
				defaultValue: { summary: "null" },
			},
		},
		disabled: {
			description: "Desabilita o radio button.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		isDiv: {
			description:
				"Renderiza o componente com um estilo alternativo (parecido com uma div).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		default: {
			description: "Slot para o conteúdo/label dentro do radio button.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BRadioButton>;
export default meta;

type Story = StoryObj<typeof BRadioButton>;

export const Primary: Story = {
	render: (args: any) => ({
		components: { BRadioButton },
		setup() {
			return { args };
		},
		template:
			'<BRadioButton v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :is-div="args.isDiv">Test radio</BRadioButton>',
	}),
	args: {
		modelValue: false,
		groupValue: null,
		disabled: false,
		isDiv: false,
	},
};

export const RadioDiv: Story = {
	render: (args: any) => ({
		components: { BRadioButton },
		setup() {
			return { args };
		},
		template:
			'<BRadioButton v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :is-div="args.isDiv">Test radio</BRadioButton>',
	}),
	args: {
		modelValue: false,
		groupValue: null,
		disabled: false,
		isDiv: true,
	},
};
