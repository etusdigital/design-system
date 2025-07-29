import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BStepper from "./BStepper.vue";

export default {
	component: BStepper,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "O valor do passo atual (v-model).",
			control: { type: "object" },
			table: {
				type: { summary: "any" },
			},
		},
		items: {
			description:
				"Array de strings ou objetos para os passos. Objetos podem ter { label, value, icon }.",
			control: { type: "object" },
			table: {
				type: {
					summary:
						"string[] | { label: string, value?: string, icon?: string }[]",
				},
			},
		},
		size: {
			description: "Tamanho do stepper.",
			control: "select",
			options: ["medium", "large"],
			table: {
				type: { summary: "'medium' | 'large'" },
				defaultValue: { summary: "medium" },
			},
		},
		disabled: {
			description: "Desabilita a interação com os passos.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" },
			},
		},
		allowedSkip: {
			description:
				"Permite pular passos (clicar em um passo futuro sem ter passado pelos intermediários).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" },
			},
		},
		background: {
			description: "Cor de fundo do stepper (valor CSS string).",
			control: { type: "color" },
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "var(--neutral-background-default)" },
			},
		},
		version: {
			description: "Versão do estilo do stepper.",
			control: "select",
			options: [1, 2],
			table: {
				type: { summary: "1 | 2" },
				defaultValue: { summary: "1" },
			},
		},
		onChangeStep: {
			description:
				"Evento emitido quando um passo é alterado. Payload: (item: any, index: number)",
			table: {
				category: "events",
				type: { summary: "(item: any, index: number) => void" },
			},
		},
	},
} satisfies Meta<typeof BStepper>;

type Story = StoryObj<typeof BStepper>;

type BStepperStoryArgs = Partial<InstanceType<typeof BStepper>["$props"]>;

const defaultArgs: BStepperStoryArgs = {
	modelValue: "Option1",
	items: ["Option1", "Option2", "Option3"],
	size: "medium",
	disabled: false,
	allowedSkip: false,
	version: 1,
	background: "#FFFFFF",
	onChangeStep: (item: any, index: number) => {
		console.log("changeStep event:", item, index);
	},
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BStepper },
		setup() {
			return { args };
		},
		template: `
      <BStepper
        v-model="args.modelValue"
        :items="args.items"
        :size="args.size"
        :disabled="args.disabled"
        :allowed-skip="args.allowedSkip"
        :background="args.background"
        :version="args.version"
        @change-step="args.onChangeStep"
      />
    `,
	}),
	args: defaultArgs,
};

export const Sizes: Story = {
	render: (args: any) => ({
		components: { BStepper },
		setup() {
			return { args };
		},
		template: `
      <div class="flex flex-col gap-5">
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            size="medium"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            :version="args.version"
            @change-step="args.onChangeStep"
          />
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            size="large"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            :version="args.version"
            @change-step="args.onChangeStep"
          />
      </div>
    `,
	}),
	args: defaultArgs,
};

export const Versions: Story = {
	render: (args: any) => ({
		components: { BStepper },
		setup() {
			return { args };
		},
		template: `
      <div class="flex flex-col gap-5">
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            :size="args.size"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            version="1"
            @change-step="args.onChangeStep"
          />
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            :size="args.size"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            version="2"
            @change-step="args.onChangeStep"
          />
      </div>
    `,
	}),
	args: defaultArgs,
};

export const ObjectArray: Story = {
	render: (args: any) => ({
		components: { BStepper },
		setup() {
			return { args };
		},
		template: `
      <BStepper
        v-model="args.modelValue"
        :items="args.items"
        size="medium"
        :disabled="args.disabled"
        :allowed-skip="args.allowedSkip"
        version="2"
        @change-step="args.onChangeStep"
      />
    `,
	}),
	args: {
		...defaultArgs,
		items: [
			{
				label: "Option 1",
				icon: "labs",
			},
			{
				label: "Option 2",
				icon: "labs",
			},
			{
				label: "Option 3",
				icon: "labs",
			},
		],
	},
};
