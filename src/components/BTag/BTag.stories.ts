import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BTag from "./BTag.vue";

export default {
	component: BTag,
	tags: ["autodocs"],
	argTypes: {
		text: {
			description:
				"Texto exibido dentro da tag. Também pode ser passado via slot padrão.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		color: {
			description: "Cor da tag.",
			control: "select",
			options: [
				"primary",
				"informative",
				"success",
				"warning",
				"danger",
				"neutral",
			],
			table: {
				type: {
					summary:
						"'primary' | 'informative' | 'success' | 'warning' | 'danger' | 'neutral'",
				},
				defaultValue: { summary: "primary" },
			},
		},
		size: {
			description: "Tamanho da tag.",
			control: "select",
			options: ["small", "medium", "large"],
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "medium" },
			},
		},
		type: {
			description: "Variação de estilo da tag.",
			control: "select",
			options: ["default", "secondary", "heavy"],
			table: {
				type: { summary: "'default' | 'secondary' | 'heavy'" },
				defaultValue: { summary: "default" },
			},
		},
		loading: {
			description: "Exibe um spinner de loading na tag.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		icon: {
			description: "Nome do ícone a ser exibido (geralmente à esquerda).",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		isAppendedIcon: {
			description:
				"Se verdadeiro, o ícone (definido na prop 'icon') será exibido à direita.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		closeable: {
			description:
				"Se verdadeiro, exibe um ícone de fechar à direita e emite o evento 'close' ao ser clicado.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		default: {
			description:
				"Slot padrão para o conteúdo da tag (alternativa à prop 'text').",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BTag>;

type Story = StoryObj<typeof BTag>;

// Tipar defaultArgs explicitamente
type BTagStoryArgs = Partial<InstanceType<typeof BTag>["$props"]>;

const defaultArgs: BTagStoryArgs = {
	text: "Tag component",
	color: "primary",
	size: "medium",
	type: "default",
	loading: false,
	icon: "star",
	isAppendedIcon: false,
	closeable: false,
};

const defaultTemplate = `
<div class="flex gap-2">
    <BTag :text="args.text" color="primary" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="info" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="success" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="warning" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="danger" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="neutral" :size="args.size" :loading="args.loading" />
</div>
<div class="flex gap-2 mt-2">
    <BTag :text="args.text" color="primary" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="info" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="success" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="warning" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="danger" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="neutral" :size="args.size" :loading="args.loading" type="secondary" />
</div>
<div class="flex gap-2 mt-2">
    <BTag :text="args.text" color="primary" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="info" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="success" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="warning" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="danger" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="neutral" :size="args.size" :loading="args.loading" type="heavy" />
</div>
`;

export const Primary: Story = {
	render: (args: any) => ({
		components: { BTag },
		setup() {
			return { args };
		},
		template: `
      <BTag
        :text="args.text"
        :color="args.color"
        :size="args.size"
        :loading="args.loading"
        :type="args.type"
        :icon="args.icon"
        :is-appended-icon="args.isAppendedIcon"
        :closeable="args.closeable"
      >
        Tag Component
      </BTag>
    `,
	}),
	args: defaultArgs,
};

export const Colors: Story = {
	render: (args: any) => ({
		components: { BTag },
		setup() {
			return { args };
		},
		template: defaultTemplate,
	}),
	args: defaultArgs,
};

export const Loading: Story = {
	render: (args: any) => ({
		components: { BTag },
		setup() {
			return { args };
		},
		template: defaultTemplate,
	}),
	args: {
		...defaultArgs,
		loading: true,
	},
};

export const Sizes: Story = {
	render: (args: any) => ({
		components: { BTag },
		setup() {
			return { args };
		},
		template: `
      <div class="flex gap-2">
          <BTag :text="args.text" :color="args.color" size="small" :loading="args.loading" />
          <BTag :text="args.text" :color="args.color" size="medium" :loading="args.loading" />
          <BTag :text="args.text" :color="args.color" size="large" :loading="args.loading" />
      </div>
    `,
	}),
	args: defaultArgs,
};
