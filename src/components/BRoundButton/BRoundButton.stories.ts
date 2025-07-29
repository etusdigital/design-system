import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BRoundButton from "./BRoundButton.vue";

const meta = {
	component: BRoundButton,
	tags: ["autodocs"],
	argTypes: {
		type: {
			description: "Tipo do botão HTML.",
			control: "select",
			options: ["button", "reset", "submit"],
			table: {
				type: { summary: "'button' | 'reset' | 'submit'" },
				defaultValue: { summary: "button" },
			},
		},
		color: {
			description: "Cor temática do botão.",
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
		text: {
			description:
				"It will be the value the button will show when it's hovered.",
			control: { type: "text" },
			table: { type: { summary: "string | undefined" } },
		},
		icon: {
			description: "This property will be the button icon.",
			control: { type: "text" },
			table: {
				type: { summary: "string | undefined" },
				defaultValue: { summary: "plus" },
			},
		},
		background: {
			description:
				"This property will be the button background background, if it's not set, the background will respect the color background.",
			control: { type: "text" },
			table: { type: { summary: "string | undefined" } },
		},
		size: {
			description: "Tamanho do botão.",
			control: "select",
			options: ["small", "medium", "large"],
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "small" },
			},
		},
		variant: {
			description: "Variante de estilo do botão.",
			control: "select",
			options: ["default", "secondary", "plain", "reverse"],
			table: {
				type: { summary: "'default' | 'secondary' | 'plain' | 'reverse'" },
				defaultValue: { summary: "default" },
			},
		},
		disabled: {
			description:
				'Disables the underlying button\'s HTML element and sets the CSS property "cursor-events" to "none".',
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" },
			},
		},
		alwaysOpen: {
			description: "When this prop is true, the text will always be shown.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" },
			},
		},
	},
} satisfies Meta<typeof BRoundButton>;
export default meta;

type Story = StoryObj<typeof BRoundButton>;

type BRoundButtonStoryArgs = Partial<
	InstanceType<typeof BRoundButton>["$props"]
>;

const defaultArgs: BRoundButtonStoryArgs = {
	type: "button",
	color: "primary",
	text: "Create",
	size: "small",
	variant: "default",
	background: "",
	icon: "",
	disabled: false,
	alwaysOpen: false,
};
const defaultRender = (args: any) => ({
	components: { BRoundButton },
	setup() {
		return { args };
	},
	template:
		'<div class="flex gap-sm">' +
		'<BRoundButton :type="args.type" text="Primary" color="primary" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
		'<BRoundButton :type="args.type" text="Info" color="info" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
		'<BRoundButton :type="args.type" text="Success" color="success" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
		'<BRoundButton :type="args.type" text="Warning" color="warning" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
		'<BRoundButton :type="args.type" text="Danger" color="danger" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
		'<BRoundButton :type="args.type" text="Neutral" color="neutral" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" />' +
		"</div>",
});

export const Primary: Story = {
	render: (args: any) => ({
		components: { BRoundButton },
		setup() {
			return { args };
		},
		template: `
      <BRoundButton 
          id="test-button"
          :type="args.type"
          :text="args.text"
          :icon="args.icon"
          :background="args.background"
          :color="args.color"
          :size="args.size"
          :variant="args.variant"
          :disabled="args.disabled"
          :always-open="args.alwaysOpen"
          @click="args.click"
      />
    `,
	}),
	args: defaultArgs,
};

export const Secondary: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		variant: "secondary",
	},
};

export const Plain: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		variant: "plain",
	},
};

export const Reverse: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		variant: "reverse",
	},
};

export const Sizes: Story = {
	render: (args: any) => ({
		components: { BRoundButton },
		setup() {
			return { args };
		},
		template:
			'<div class="flex gap-3">' +
			'<BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="small" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton>' +
			'<BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="medium" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton>' +
			'<BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="large" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton>' +
			"</div>",
	}),
	args: {
		...defaultArgs,
	},
};
