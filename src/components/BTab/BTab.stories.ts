import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BTab from "./BTab.vue";

export default {
	component: BTab,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "Aba atualmente selecionada (v-model).",
			control: { type: "object" },
			table: {
				type: { summary: "any" },
				defaultValue: { summary: "undefined" },
			},
		},
		items: {
			description:
				"Array de strings ou objetos para as abas. Objetos podem ter { label, value, icon }.",
			control: { type: "object" },
			table: {
				type: { summary: "string[] | Item[]" },
			},
		},
		isIcon: {
			description:
				"Se verdadeiro, exibe os ícones dos itens (se definidos) em vez dos labels.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		notCard: {
			description:
				"Se verdadeiro, remove o estilo de card/background que envolve as abas.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
	},
} satisfies Meta<typeof BTab>;

type Story = StoryObj<typeof BTab>;

const defaultArgs = {
	modelValue: undefined,
	items: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
	isIcon: false,
	notCard: false,
};

const defaultRender = (args: any) => ({
	components: { BTab },
	setup() {
		return { args };
	},
	template: `
    <BTab
        class="w-fit"
        v-model="args.modelValue" 
        :items="args.items"
        :size="args.size"
        :is-icon="args.isIcon"
        :not-card="args.notCard"
    />
  `,
});

export const Primary: Story = {
	render: defaultRender,
	args: defaultArgs,
};

export const Sizes: Story = {
	render: (args: any) => ({
		components: { BTab },
		setup() {
			return { args };
		},
		template: `
      <div class="flex flex-col gap-lg">
          <BTab
              class="w-fit"
              v-model="args.modelValue" 
              :items="args.items"
              :is-icon="args.isIcon"
              :not-card="args.notCard"
          />
          <BTab 
              v-model="args.modelValue" 
              :items="args.items"
              :is-icon="args.isIcon"
              :not-card="args.notCard"
          />
      </div>
    `,
	}),
	args: defaultArgs,
};

export const Icons: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		isIcon: true,
		items: ["laptop", "smartphone"],
	},
};

export const ObjectArray: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		items: [
			{
				label: "Laptop",
				value: "laptop",
				icon: "laptop",
			},
			{
				label: "Smartphone",
				value: "smartphone",
				icon: "smartphone",
			},
		],
	},
};
