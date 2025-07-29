import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BAlert from "./BAlert.vue";

const meta = {
	component: BAlert,
	tags: ["autodocs"],
	argTypes: {
		title: {
			description: "Título do alerta.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		message: {
			description: "Mensagem principal do alerta.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		type: {
			description: "Tipo/cor temática do alerta.",
			control: "select",
			options: ["info", "success", "warning", "danger", "neutral"],
			table: {
				type: {
					summary: "'info' | 'success' | 'warning' | 'danger' | 'neutral'",
				},
				defaultValue: { summary: "info" },
			},
		},
		size: {
			description: "Tamanho do alerta.",
			control: "select",
			options: ["small", "medium", "large"],
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "large" },
			},
		},
		icon: {
			description:
				"Nome do ícone a ser exibido. Se vazio, usa um ícone padrão baseado no 'type'.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		iconPosition: {
			description: "Posição do ícone.",
			control: "select",
			options: ["start", "center", "end"],
			table: {
				type: { summary: "'start' | 'center' | 'end'" },
				defaultValue: { summary: "start" },
			},
		},
		expandable: {
			description:
				"Permite que o alerta seja expansível para mostrar/ocultar a mensagem.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		closable: {
			description: "Exibe um botão para fechar o alerta.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		hideIcon: {
			description: "Oculta o ícone do alerta.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		default: {
			description:
				"Slot padrão para o conteúdo principal do alerta (alternativa a 'title' e 'message').",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		actions: {
			description:
				"Slot para ações customizadas no lado direito do alerta (substitui ícones de expandir/fechar).",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BAlert>;

export default meta;

type Story = StoryObj<typeof BAlert>;
const defaultArgs = {
	title: "Demo Title",
	message:
		"Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.",
	type: "info",
	size: "medium",
	icon: "",
	iconPosition: "start",
	expandable: false,
	closable: false,
	hideIcon: false,
	showAlert: true,
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BAlert },
		setup() {
			return { args };
		},
		methods: {
			delay(callback: any, timeout: any) {
				setTimeout(callback, timeout);
			},
		},
		template: `
      <BAlert
        v-if="args.showAlert"
        id="alert"
        :title="args.title"
        :message="args.message"
        :type="args.type"
        :size="args.size"
        :icon="args.icon"
        :icon-position="args.iconPosition"
        :expandable="args.expandable"
        :closable="args.closable"
        :hide-icon="args.hideIcon"
        @close="args.showAlert = !args.showAlert; delay( ()=> {args.showAlert = !args.showAlert}, 2000)"
      />
    `,
	}),
	args: defaultArgs,
};

export const Types: Story = {
	render: (args: any) => ({
		components: { BAlert },
		setup() {
			return { args };
		},
		template: `
      <div class="flex gap-2">
        <BAlert
          id="alert"
          :title="args.title"
          :message="args.message"
          type="info"
          :size="args.size"
          :icon="args.icon"
          :icon-position="args.iconPosition"
          :expandable="args.expandable"
          :closable="args.closable"
          :hide-icon="args.hideIcon"
          @close="args.showAlert = !args.showAlert"
        />
        <BAlert
          id="alert"
          :title="args.title"
          :message="args.message"
          type="success"
          :size="args.size"
          :icon="args.icon"
          :icon-position="args.iconPosition"
          :expandable="args.expandable"
          :closable="args.closable"
          :hide-icon="args.hideIcon"
          @close="args.showAlert = !args.showAlert"
        />
        <BAlert
          id="alert"
          :title="args.title"
          :message="args.message"
          type="warning"
          :size="args.size"
          :icon="args.icon"
          :icon-position="args.iconPosition"
          :expandable="args.expandable"
          :closable="args.closable"
          :hide-icon="args.hideIcon"
          @close="args.showAlert = !args.showAlert"
        />
        <BAlert
          id="alert"
          :title="args.title"
          :message="args.message"
          type="danger"
          :size="args.size"
          :icon="args.icon"
          :icon-position="args.iconPosition"
          :expandable="args.expandable"
          :closable="args.closable"
          :hide-icon="args.hideIcon"
          @close="args.showAlert = !args.showAlert"
        />
        <BAlert
          id="alert"
          :title="args.title"
          :message="args.message"
          type="neutral"
          :size="args.size"
          :icon="args.icon"
          :icon-position="args.iconPosition"
          :expandable="args.expandable"
          :closable="args.closable"
          :hide-icon="args.hideIcon"
          @close="args.showAlert = !args.showAlert"
        />
      </div>
    `,
	}),
	args: {
		...defaultArgs,
		message: "Lorem ipsum dolor sit amet dolor consectetur.",
	},
};

export const Sizes: Story = {
	render: (args: any) => ({
		components: { BAlert },
		setup() {
			return { args };
		},
		template: `
      <div class="flex gap-2">
        <BAlert
          id="alert"
          :title="args.title"
          :message="args.message"
          :type="args.type"
          size="small"
          :icon="args.icon"
          :icon-position="args.iconPosition"
          :expandable="args.expandable"
          :closable="args.closable"
          :hide-icon="args.hideIcon"
          @close="args.showAlert = !args.showAlert"
        />
        <BAlert
          id="alert"
          :title="args.title"
          :message="args.message"
          :type="args.type"
          size="medium"
          :icon="args.icon"
          :icon-position="args.iconPosition"
          :expandable="args.expandable"
          :closable="args.closable"
          :hide-icon="args.hideIcon"
          @close="args.showAlert = !args.showAlert"
        />
        <BAlert
          id="alert"
          :title="args.title"
          :message="args.message"
          :type="args.type"
          size="large"
          :icon="args.icon"
          :icon-position="args.iconPosition"
          :expandable="args.expandable"
          :closable="args.closable"
          :hide-icon="args.hideIcon"
          @close="args.showAlert = !args.showAlert"
        />
      </div>
    `,
	}),
	args: defaultArgs,
};
