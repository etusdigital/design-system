import type { Meta, StoryObj } from "@storybook/vue3";
import ActionCard from "./ActionCard.vue";

export default {
  component: ActionCard,
  argTypes: {
    icon: {
      type: { name: "string" },
      description: "This prop will be the card icon.",
    },
    color: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "primary" },
      },
      description: "This prop will be the title background color.",
    },
    hideDrag: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "If this prop is true, the drag icon  won't be shown.",
    },
    default: {
      description: "This slot will be the title.",
    },
    card: {
      description: "This slot will be the card content.",
    },
  },
} satisfies Meta<typeof ActionCard>;

type Story = StoryObj<typeof ActionCard>;

const defaultArgs = {
  icon: "send",
  color: "",
  hideDrag: false,
};

const defaultRender = (args: any) => ({
  components: { ActionCard },
  setup() {
    return { args };
  },
  template: `
      <ActionCard class="w-fit" :icon="args.icon" :color="args.color" :hide-drag="args.hideDrag">
        Label
      </ActionCard>
    `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const HideDrag: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    hideDrag: true,
  },
};

export const Card: Story = {
  render: (args: any) => ({
    components: { ActionCard },
    setup() {
      return { args };
    },
    template: `
        <ActionCard class="w-fit" icon="mail" :color="args.color" :hide-drag="args.hideDrag">
          <div class="flex justify-between items-center text-white w-full">
            <div class="flex flex-col text-sm">
              <p>Send Message:</p>
              <p class="font-bold">cartaofeito-d-fluxo-cc-dia-05-e12</p>
            </div>
            <Icon class="cursor-pointer" name="visibility" />
          </div>
          <template #card>
            <div class="flex flex-col gap-sm">
                <div class="flex flex-col gap-xxs">
                  <h4 class="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
                  <p class="text-xs text-neutral-foreground-high">Links: <a class="lowercase cursor-pointer">https://cartaofeito.com/cartao-santander-sx-p1/</a></p>
                </div>
                <div class="flex gap-xs overflow-x-auto max-w-full pb-xxs">
                    <MetricCard icon="science" title="Sample" type="dashed" color="info" value="10%" />
                    <MetricCard icon="drafts" title="Open" value="50%" description="100.000.000" class="min-w-[31%]" />
                    <MetricCard icon="arrow_selector_tool" title="Click" value="34%" description="68.000.000" type="success" class="min-w-[30%]" />
                    <MetricCard icon="touch_app" title="CTOR" value="15%" class="min-w-[30%]" />
                </div>
                <div class="flex justify-between items-center">
                  <div class="flex gap-xxs items-center text-neutral-foreground-high">
                    <Icon name="mail" size="20px" />
                    <p class="text-sm font-bold">Total delivered: 200.000.000</p>
                  </div>
                  <Button size="small">More statistics</Button>
                </div>
            </div>
          </template>
        </ActionCard>
      `,
  }),
  args: defaultArgs,
};
