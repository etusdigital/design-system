import type { Meta, StoryObj } from "@storybook/vue3";
import BSelectContainer from "./BSelectContainer.vue";

export default {
	component: BSelectContainer,
	argTypes: {
		modelValue: {
			description: "Controla se o container está expandido (v-model).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		labelValue: {
			description: "Label exibido acima do container.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		role: {
			description: "Atributo ARIA role para o container.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "listbox" },
			},
		},
		absolute: {
			description: "Se o conteúdo dropdown deve ter posicionamento absoluto.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		disabled: {
			description: "Desabilita o container.",
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
		infoMessage: {
			description: "Mensagem informativa (ex: tooltip no label).",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		closeOnBlur: {
			description: "Fecha o conteúdo dropdown ao perder o foco.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" },
			},
		},
		dontHaveMaxHeight: {
			description:
				"Remove a altura máxima padrão do conteúdo para que ele se ajuste aos itens.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		maxHeight: {
			description:
				"Altura máxima do container de label (excluindo conteúdo dropdown).",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "40px" },
			},
		},
		minWidth: {
			description: "Largura mínima do container de label.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "15em" },
			},
		},
		secondary: {
			description: "Aplica estilo secundário ao container.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		hideArrow: {
			description: "Oculta a seta do dropdown.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		default: {
			description:
				"Slot padrão para o conteúdo do label (o que é clicável para expandir).",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		content: {
			description:
				"Slot para o conteúdo que aparece quando expandido (geralmente contém #items e #actions).",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		items: {
			description: "Slot para a lista de itens dentro do conteúdo expandido.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		actions: {
			description: "Slot para a área de ações no final do conteúdo expandido.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BSelectContainer>;

type Story = StoryObj<typeof BSelectContainer>;

export const Primary: Story = {
	render: (args: any) => ({
		setup() {
			return { args };
		},
		template: `
      <BSelectContainer
        v-model="args.modelValue" 
        :labelValue="args.labelValue" 
        :role="args.role" 
        :absolute="args.absolute" 
        :disabled="args.disabled"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :required="args.required" 
        :close-on-blur="args.closeOnBlur"
        :max-height="args.maxHeight"
        :min-width="args.minWidth"
        :dont-have-max-height="args.dontHaveMaxHeight"
        :secondary="args.secondary"
        :hide-arrow="args.hideArrow"
        >
          <BIcon name="sentiment_satisfied" size="1rem" class="shrink-0 h-[1em] flex items-center" />
          <span class="truncate">Select container example</span>

          <template #items>
              <li v-for="i in [1, 2, 3, 4]" :key="\`item-\${i}\`" tabindex="0">Item {{ i }}</li>
          </template>

          <template #actions>
              <BButton size="small" variant="plain">Clear</BButton>
              <BButton size="small">Apply</BButton>
          </template>
        </BSelectContainer>`,
	}),
	args: {
		modelValue: false,
		labelValue: "label",
		role: "listbox",
		absolute: false,
		disabled: false,
		isError: false,
		errorMessage: "",
		infoMessage: "",
		required: false,
		closeOnBlur: true,
		dontHaveMaxHeight: false,
		maxHeight: "40px",
		minWidth: "15em",
		secondary: false,
	},
};
