import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BProgressBar from "./BProgressBar.vue";

const meta = {
	component: BProgressBar,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description:
				"Valor atual da barra de progresso (0 a 1, ou 0 a max se 'max' for definido).",
			control: { type: "number", step: 0.01 },
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "0" },
			},
		},
		color: {
			description:
				"Cor da barra de progresso (valor CSS de cor). Se não definido, usa a cor do 'type'.",
			control: { type: "color" },
			table: {
				type: { summary: "string" },
			},
		},
		icon: {
			description: "Ícone exibido no final da barra (sem animação).",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		infoMessage: {
			description: "Mensagem exibida no tooltip do ícone.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		type: {
			description: "Tipo/cor temática da barra de progresso.",
			control: "select",
			options: ["primary", "info", "success", "warning", "danger", "neutral"],
			table: {
				type: {
					summary:
						"'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral'",
				},
				defaultValue: { summary: "primary" },
			},
		},
		size: {
			description: "Tamanho (altura) da barra de progresso.",
			control: "select",
			options: ["small", "medium", "large"],
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "medium" },
			},
		},
		animationType: {
			description:
				"Tipo de animação para a barra (quando o progresso não é determinado).",
			control: "select",
			options: ["indeterminate", "query", null],
			table: {
				type: { summary: "'indeterminate' | 'query' | undefined" },
				defaultValue: { summary: "undefined" },
			},
		},
		steps: {
			description: "Número de passos discretos em vez de uma barra contínua.",
			control: { type: "number" },
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "0" },
			},
		},
		displayPercentage: {
			description:
				"Onde exibir o valor percentual (se não for animado ou em passos).",
			control: "select",
			options: ["center", "bar", null],
			table: {
				type: { summary: "'center' | 'bar' | undefined" },
				defaultValue: { summary: "undefined" },
			},
		},
		neutralBackground: {
			description:
				"Se verdadeiro, o fundo da barra será neutro em vez de um highlight do tema.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		"icon-slot": {
			description: "Slot para substituir o ícone padrão.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BProgressBar>;
export default meta;

type Story = StoryObj<typeof BProgressBar>;

// Definir um tipo para as props do BProgressBar para defaultArgs
type BProgressBarStoryArgs = Partial<
	InstanceType<typeof BProgressBar>["$props"]
>;

const defaultArgs: BProgressBarStoryArgs = {
	modelValue: 0.5,
	size: "medium",
	type: "primary",
	color: "",
	icon: "",
	infoMessage: "",
	steps: 0,
	animationType: undefined,
	displayPercentage: undefined,
	neutralBackground: false,
};

const defaultRender = (args: any) => ({
	components: { BProgressBar },
	setup() {
		return { args };
	},
	template: `
    <BProgressBar
        v-model="args.modelValue"
        :icon="args.icon"
        :color="args.color"
        :size="args.size"
        :type="args.type"
        :animation-type="args.animationType"
        :steps="args.steps"
        :display-percentage="args.displayPercentage"
        :neutral-background="args.neutralBackground"
        :info-message="args.infoMessage"
    />
  `,
});

export const Primary: Story = {
	render: defaultRender,
	args: defaultArgs,
};

export const Steps: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		steps: 5,
		modelValue: 3,
	},
};

export const NeutralBackground: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		neutralBackground: true,
		modelValue: 0.5,
	},
};

export const Icon: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		icon: "rocket_launch",
		modelValue: 0.5,
	},
};

export const Slot: Story = {
	render: (args: any) => ({
		components: { BProgressBar },
		setup() {
			return { args };
		},
		template: `
      <BProgressBar
        v-model="args.modelValue"
        :icon="args.icon"
        :color="args.color"
        :size="args.size"
        :type="args.type"
        :animation-type="args.animationType"
        :steps="args.steps"
        display-percentage="bar"
        :neutral-background="args.neutralBackground"
        :info-message="args.infoMessage"
    >
      <template #icon-slot>Icon Slot </template>
    </BProgressBar>
    `,
	}),
	args: {
		...defaultArgs,
		modelValue: 0.5,
	},
};

export const DisplayPercentage: Story = {
	render: (args: any) => ({
		components: { BProgressBar },
		setup() {
			return { args };
		},
		template: `
      <div class="flex flex-col gap-5">
          <div class="flex flex-col">
              <label>Center</label>
              <BProgressBar
                v-model="args.modelValue"
                :icon="args.icon"
                :color="args.color"
                :size="args.size"
                :type="args.type"
                :animation-type="args.animationType"
                :steps="args.steps"
                display-percentage="center"
                :neutral-background="args.neutralBackground"
                :info-message="args.infoMessage"
              />
          </div>
          <div class="flex flex-col">
              <label>Bar</label>
              <BProgressBar
                  v-model="args.modelValue"
                  :icon="args.icon"
                  :color="args.color"
                  :size="args.size"
                  :type="args.type"
                  :animation-type="args.animationType"
                  :steps="args.steps"
                  display-percentage="bar"
                  :neutral-background="args.neutralBackground"
                  :info-message="args.infoMessage"
              />
          </div>
      </div>
    `,
	}),
	args: {
		...defaultArgs,
		modelValue: 0.5,
	},
};

export const Animation: Story = {
	render: (args: any) => ({
		components: { BProgressBar },
		setup() {
			return { args };
		},
		template: `
      <div class="flex flex-col gap-5">
          <div class="flex flex-col">
              <label>Indeterminate</label>
              <BProgressBar
                v-model="args.modelValue"
                :icon="args.icon"
                :color="args.color"
                :size="args.size"
                :type="args.type"
                animation-type="indeterminate"
                :steps="args.steps"
                :display-percentage="args.displayPercentage"
                :neutral-background="args.neutralBackground"
                :info-message="args.infoMessage"
              />
          </div>
          <div class="flex flex-col">
              <label>Query</label>
              <BProgressBar
                  v-model="args.modelValue"
                  :icon="args.icon"
                  :color="args.color"
                  :size="args.size"
                  :type="args.type"
                  animation-type="query"
                  :steps="args.steps"
                  :display-percentage="args.displayPercentage"
                  :neutral-background="args.neutralBackground"
                  :info-message="args.infoMessage"
              />
          </div>
      </div>
    `,
	}),
	args: defaultArgs,
};

export const Sizes: Story = {
	render: (args: any) => ({
		components: { BProgressBar },
		setup() {
			return { args };
		},
		template: `
      <div class="flex flex-col gap-5">
          <BProgressBar
              v-model="args.modelValue"
              :icon="args.icon"
              :color="args.color"
              :type="args.type"
              size="small"
              :animation-type="args.animationType"
              :steps="args.steps"
              :display-percentage="args.displayPercentage"
              :neutral-background="args.neutralBackground"
              :info-message="args.infoMessage"
          />
          <BProgressBar
              v-model="args.modelValue"
              :icon="args.icon"
              :color="args.color"
              :type="args.type"
              size="medium"
              :animation-type="args.animationType"
              :steps="args.steps"
              :display-percentage="args.displayPercentage"
              :neutral-background="args.neutralBackground"
              :info-message="args.infoMessage"
          />
          <BProgressBar
              v-model="args.modelValue"
              :icon="args.icon"
              :color="args.color"
              :type="args.type"
              size="large"
              :animation-type="args.animationType"
              :steps="args.steps"
              :display-percentage="args.displayPercentage"
              :neutral-background="args.neutralBackground"
              :info-message="args.infoMessage"
          />
      </div>
    `,
	}),
	args: defaultArgs,
};
