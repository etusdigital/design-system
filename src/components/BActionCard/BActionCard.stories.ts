import type { Meta, StoryObj } from "@storybook/vue3";
import BActionCard from "./BActionCard.vue";

export default {
	component: BActionCard,
	tags: ["autodocs"],
	argTypes: {
		icon: {
			description: "Ícone principal do card.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		color: {
			description:
				"Cor de fundo do título (valor CSS de cor). Se vazio, usa a cor primária do tema.",
			control: { type: "color" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "primary" },
			},
		},
		hideDrag: {
			description: "Oculta o ícone de arrastar.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		onDragstart: {
			description: "Emitido quando o usuário começa a arrastar o card.",
		},
		onDragging: {
			description: "Emitido enquanto o usuário está arrastando o card.",
		},
		onDragend: {
			description: "Emitido quando o usuário solta o card após arrastar.",
		},
		onDelete: { description: "Emitido quando o ícone de deletar é clicado." },
		default: {
			description: "Slot para o conteúdo do título do card.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		card: {
			description: "Slot para o conteúdo principal do card.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BActionCard>;

type Story = StoryObj<typeof BActionCard>;

const defaultArgs = {
	icon: "send",
	color: "",
	hideDrag: false,
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BActionCard },
		setup() {
			return { args };
		},
		template: `
        <BActionCard class="w-fit" :icon="args.icon" :color="args.color" :hide-drag="args.hideDrag">
          <p class="font-bold">Default</p>
        </BActionCard>
      `,
	}),
	args: defaultArgs,
};

export const Card: Story = {
	render: (args: any) => ({
		components: { BActionCard },
		setup() {
			return { args };
		},
		template: `
        <BActionCard class="w-fit" icon="mail" :color="args.color" :hide-drag="args.hideDrag">
          <div class="flex justify-between items-center text-white w-full">
            <div class="flex flex-col text-sm">
              <p>Send Message:</p>
              <p class="font-bold">cartaofeito-d-fluxo-cc-dia-05-e12</p>
            </div>
            <BIcon class="cursor-pointer" name="visibility" />
          </div>
          <template #card>
            <div class="flex flex-col gap-sm">
                <div class="flex flex-col gap-xxs">
                  <h4 class="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
                  <p class="text-xs text-neutral-foreground-high">Links: <a class="lowercase cursor-pointer">https://cartaofeito.com/cartao-santander-sx-p1/</a></p>
                </div>
                <div class="flex gap-xs overflow-x-auto max-w-full pb-xxs">
                    <BMetricCard icon="science" title="Sample" type="sample" value="10%" />
                    <BMetricCard icon="drafts" title="Open" value="50%" description="100.000.000" class="min-w-[31%]" />
                    <BMetricCard icon="arrow_selector_tool" title="Click" value="34%" description="68.000.000" type="success" class="min-w-[30%]" />
                    <BMetricCard icon="touch_app" title="CTOR" value="15%" class="min-w-[30%]" />
                </div>
                <div class="flex justify-between items-center">
                  <div class="flex gap-xxs items-center text-neutral-foreground-high">
                    <BIcon name="mail" size="20px" />
                    <p class="text-sm font-bold">Total delivered: 200.000.000</p>
                  </div>
                  <BButton size="small">More statistics</BButton>
                </div>
            </div>
          </template>
        </BActionCard>
      `,
	}),
	args: defaultArgs,
};
