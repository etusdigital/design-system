import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BStepOption from "./BStepOption.vue";

export default {
	component: BStepOption,
	tags: ["autodocs"],
	argTypes: {
		title: {
			description: "Título da opção do passo.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		description: {
			description: "Descrição da opção do passo.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		icon: {
			description: "Nome do ícone a ser exibido.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		color: {
			description:
				"Cor do ícone e do título (ex: 'primary', 'success', ou um valor CSS de cor).",
			control: { type: "text" }, // Pode ser 'color' ou 'select' se as cores forem predefinidas
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "primary" },
			},
		},
		disabled: {
			description: "Desabilita a opção.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		isIconRound: {
			description:
				"Se verdadeiro, o ícone não será envolvido por um círculo com a cor do card.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
	},
} satisfies Meta<typeof BStepOption>;

type Story = StoryObj<typeof BStepOption>;

const defaultArgs = {
	title: "Step Name",
	description:
		"Lorem ipsum dolor sit amet consectetur. Tortor ipsum ut massa interdum.",
	icon: "email",
	color: "",
	disabled: false,
	isIconRound: false,
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BStepOption },
		setup() {
			return { args };
		},
		template: `
        <BStepOption
          class="max-w-[400px]"
          :title="args.title"
          :description="args.description"
          :icon="args.icon"
          :color="args.color"
          :disabled="args.disabled"
          :is-icon-round="args.isIconRound"
        />
      `,
	}),
	args: defaultArgs,
};
