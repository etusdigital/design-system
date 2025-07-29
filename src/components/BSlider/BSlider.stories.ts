import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BSlider from "./BSlider.vue";

const meta = {
	component: BSlider,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description:
				"Valor(es) do slider (v-model). Array de números entre 0 e 1 (ou 0 e max).",
			control: { type: "object" },
			table: {
				type: { summary: "number[]" },
				defaultValue: { summary: "[0]" },
			},
		},
		size: {
			description: "Tamanho do slider.",
			control: "select",
			options: ["small", "medium", "large"],
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "medium" },
			},
		},
		max: {
			description:
				"Valor máximo da escala do slider. Se definido, modelValue será relativo a este max.",
			control: { type: "number" },
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "0 (escala 0-1)" },
			},
		},
		unit: {
			description: "Unidade a ser exibida no tooltip (ex: '%', 'px').",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "" },
			},
		},
		color: {
			description: "Cor principal do slider (ex: valor CSS de cor).",
			control: { type: "color" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "(cor primária do tema)" },
			},
		},
		showTooltip: {
			description:
				"Exibe um tooltip com o valor atual acima (ou à direita) do cursor.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		vertical: {
			description:
				"Renderiza o slider na vertical. Requer um container pai com altura definida.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		disabled: {
			description: "Desabilita a interação com o slider.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		fillColors: {
			description:
				"Array de cores para preencher segmentos da barra (se isRange=true e houver múltiplos cursores).",
			control: { type: "object" },
			table: {
				type: { summary: "string[]" },
				defaultValue: { summary: "[]" },
			},
		},
		steps: {
			description:
				"Array de posições (0-1) para marcadores de passo. O cursor irá 'travar' nesses passos.",
			control: { type: "object" },
			table: {
				type: { summary: "number[]" },
				defaultValue: { summary: "[]" },
			},
		},
		neutralBackground: {
			description:
				"Se verdadeiro, usa um fundo neutro para a barra do slider em vez de uma cor de highlight do tema.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
	},
} satisfies Meta<typeof BSlider>;
export default meta;

type Story = StoryObj<typeof BSlider>;

// Definir um tipo para as props do BSlider para defaultArgs
// Usaremos Partial porque nem todas as props precisam ser definidas em defaultArgs se tiverem valores padrão no componente
type BSliderStoryArgs = Partial<InstanceType<typeof BSlider>["$props"]>;

const defaultArgs: BSliderStoryArgs = {
	modelValue: 0,
	size: "medium", // TypeScript irá verificar se "medium" é compatível com BSliderProps['size']
	max: 0,
	unit: "",
	color: "",
	showTooltip: false,
	disabled: false,
	vertical: false,
	fillColors: [], // Mantido como array mutável
	steps: [], // Mantido como array mutável
	neutralBackground: false,
};

const singleTemplate = `
<div :class="{'h-[15em]': args.vertical }">
  <BSlider
    v-model="args.modelValue"
    :size="args.size"
    :show-tooltip="args.showTooltip"
    :disabled="args.disabled"
    :vertical="args.vertical"
    :max="args.max"
    :unit="args.unit"
    :color="args.color"
    :fill-colors="args.fillColors"
    :steps="args.steps"
    :neutral-background="args.neutralBackground"
  />
</div>`;

const defaultTemplate = `
<BSlider
  v-model="args.modelValue"
  size="small"
  :show-tooltip="args.showTooltip"
  :disabled="args.disabled"
  :vertical="args.vertical"
  :max="args.max"
  :unit="args.unit"
  :color="args.color"
  :fill-colors="args.fillColors"
  :steps="args.steps"
  :neutral-background="args.neutralBackground"
/>
<BSlider
  v-model="args.modelValue"
  size="medium"
  :show-tooltip="args.showTooltip"
  :disabled="args.disabled"
  :vertical="args.vertical"
  :max="args.max"
  :unit="args.unit"
  :color="args.color"
  :fill-colors="args.fillColors"
  :steps="args.steps"
  :neutral-background="args.neutralBackground"
/>
<BSlider
  v-model="args.modelValue"
  size="large"
  :show-tooltip="args.showTooltip"
  :disabled="args.disabled"
  :vertical="args.vertical"
  :max="args.max"
  :unit="args.unit"
  :color="args.color"
  :fill-colors="args.fillColors"
  :steps="args.steps"
  :neutral-background="args.neutralBackground"
/>
`;

export const Primary: Story = {
	render: (args: any) => ({
		components: { BSlider },
		setup() {
			return { args };
		},
		template: singleTemplate,
	}),
	args: defaultArgs,
};

export const NeutralBackground: Story = {
	render: (args: any) => ({
		components: { BSlider },
		setup() {
			return { args };
		},
		template: singleTemplate,
	}),
	args: {
		...defaultArgs,
		neutralBackground: true,
	},
};

export const Sizes: Story = {
	render: (args: any) => ({
		components: { BSlider },
		setup() {
			return { args };
		},
		template: `
      <div class="flex flex-col gap-base">
        ${defaultTemplate}
      </div>
    `,
	}),
	args: defaultArgs,
};

export const Vertical: Story = {
	render: (args: any) => ({
		components: { BSlider },
		setup() {
			return { args };
		},
		template: `
      <div class="h-[15em] flex gap-base">
        ${defaultTemplate}
      </div>
    `,
	}),
	args: {
		...defaultArgs,
		vertical: true,
	},
};

export const FillColors: Story = {
	render: (args: any) => ({
		components: { BSlider },
		setup() {
			return { args };
		},
		template: singleTemplate,
	}),
	args: {
		...defaultArgs,
		fillColors: ["#00CEFC", "#50358A", "#FF9654"],
	},
};

export const Steps: Story = {
	render: (args: any) => ({
		components: { BSlider },
		setup() {
			return { args };
		},
		template: singleTemplate,
	}),
	args: {
		...defaultArgs,
		steps: [0, 0.25, 0.5, 0.75, 1],
	},
};
