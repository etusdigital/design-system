import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BDatePicker from "./BDatePicker.vue";

export default {
	component: BDatePicker,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description:
				"Data ou período selecionado (v-model). Pode ser Date[], Date[][] ou null.",
			control: { type: "object" },
			table: {
				type: { summary: "Date[] | Date[][] | null" },
				defaultValue: { summary: "null" },
			},
		},
		expanded: {
			description:
				"Controla o estado expandido do seletor de data (v-model:expanded).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		labelValue: {
			description: "Label do campo.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
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
		maxInit: {
			description: "Data inicial máxima permitida para seleção.",
			control: { type: "date" },
			table: {
				type: { summary: "Date" },
				defaultValue: { summary: "null" },
			},
		},
		maxEnd: {
			description: "Data final máxima permitida para seleção.",
			control: { type: "date" },
			table: {
				type: { summary: "Date" },
				defaultValue: { summary: "null" },
			},
		},
		absolute: {
			description:
				"Se o dropdown do calendário deve ter posicionamento absoluto.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		disabled: {
			description: "Desabilita o componente.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		required: {
			description: "Indica se o campo é obrigatório (visual).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		isError: {
			description: "Ativa o modo de erro visualmente.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		errorMessage: {
			description: "Mensagem de erro a ser exibida.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		alignRight: {
			description: "Alinha o dropdown à direita (requer 'absolute=true').",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		apply: {
			description: "Evento emitido ao clicar no botão 'Aplicar'.",
			table: {
				type: { summary: "function" },
			},
		},
		default: {
			description: "Slot para o conteúdo exibido no campo de seleção de data.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		"clear-text": {
			description: "Slot para o texto do botão 'Limpar'.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		"apply-text": {
			description: "Slot para o texto do botão 'Aplicar'.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		actions: {
			description:
				"Slot para substituir a área de ações padrão (botões Limpar/Aplicar).",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BDatePicker>;

type Story = StoryObj<typeof BDatePicker>;

const defaultArgs = {
	modelValue: undefined,
	labelValue: "label",
	lang: "en-US",
	maxInit: undefined,
	maxEnd: undefined,
	disabled: false,
	required: false,
	isError: false,
	errorMessage: "",
	absolute: false,
	expanded: false,
	alignRight: false,
};

export const Primary: Story = {
	render: (args: any) => ({
		setup() {
			return { args };
		},
		template: `
            <BDatePicker
                v-model="args.modelValue"
                v-model:expanded="args.expanded"
                :labelValue="args.labelValue"
                :lang="args.lang"
                :max-init="args.maxInit"
                :max-end="args.maxEnd"
                :disabled="args.disabled"
                :required="args.required"
                :is-error="args.isError"
                :error-message="args.errorMessage"
                :absolute="args.absolute"
                :align-right="args.alignRight"
            >
                Date Picker
                <template #clear-text>
                    Clear
                </template>
            </BDatePicker>
        `,
	}),
	args: defaultArgs,
};
