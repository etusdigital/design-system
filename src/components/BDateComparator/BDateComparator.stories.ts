import type { Meta, StoryObj } from "@storybook/vue3";
import BDateComparator from "./BDateComparator.vue";

export default {
	component: BDateComparator,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description:
				"Data ou período(s) selecionado(s) (v-model). Pode ser Date[], Date[][] ou null.",
			control: { type: "object" },
			table: {
				type: { summary: "Date[] | Date[][] | null" },
				defaultValue: { summary: "null" },
			},
		},
		lang: {
			description: "Idioma para formatação de datas (ex: 'en-US', 'pt-BR').",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "en-US" },
			},
		},
		isCompare: {
			description: "Habilita a seleção de dois períodos para comparação.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		maxInit: {
			description:
				"Data inicial máxima permitida para seleção no primeiro calendário.",
			control: { type: "date" },
			table: {
				type: { summary: "Date" },
				defaultValue: { summary: "null" },
			},
		},
		maxEnd: {
			description:
				"Data final máxima permitida para seleção no segundo calendário (se isCompare).",
			control: { type: "date" },
			table: {
				type: { summary: "Date" },
				defaultValue: { summary: "null" },
			},
		},
	},
} satisfies Meta<typeof BDateComparator>;

type Story = StoryObj<typeof BDateComparator>;

const defaultArgs = {
	modelValue: null,
	lang: "en-US",
	isCompare: false,
	maxInit: undefined,
	maxEnd: undefined,
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BDateComparator },
		setup() {
			return { args };
		},
		template: `
      <BDateComparator v-model="args.modelValue" :lang="args.lang" :is-compare="args.isCompare" :max-init="args.maxInit" :max-end="args.maxEnd" />
    `,
	}),
	args: defaultArgs,
};
