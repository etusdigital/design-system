import type { Meta, StoryObj } from "@storybook/vue3";
import IconCard from "./IconCard.vue";

export default {
  component: IconCard,
  argTypes: {
    title: {
      type: { summary: "string" },
      description: "This prop will be the card title.",
    },
    icon: {
      type: { summary: "string" },
      description: "This prop will be the card icon.",
    },
    color: {
      type: { summary: "string" },
      table: {
        defaultValue: { summary: 'primary' },
      },
      description: "This prop will be the icon and title color.",
    },
    isIconRound: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "If this prop is true, the icon won't be surrounded by a circle with the card color.",
    },
    default: {
      description: "This slot will be the card content.",
    },
    'title-actions': {
      description: "This slot will be the actions in the title level.",
    },
  },
} satisfies Meta<typeof IconCard>;

type Story = StoryObj<typeof IconCard>;

const defaultArgs = {
  title: 'Send Message: Message Name',
  icon: 'send',
  color: '',
  isIconRound: false,
}

const defaultRender = (args: any) => ({
  setup() {
    return { args };
  },
  template: `
    <IconCard :title="args.title" :icon="args.icon" :color="args.color" :is-icon-round="args.isIconRound">
        <template #title-actions>
            <Icon name="visibility" class="cursor-pointer" />
        </template>
        
        <div class="mt-sm">
            <p>Card content goes here</p>
        </div>
    </IconCard>
  `,
});

export const Primary: Story = {
  render: (args: any) => ({
    components: { IconCard },
    setup() {
      return { args };
    },
    template: `
        <IconCard class="w-fit" :title="args.title" :icon="args.icon" :color="args.color" :is-icon-round="args.isIconRound">
          <template #title-actions>
            <Icon class="text-neutral-interaction-default cursor-pointer hover:text-neutral-interaction-hover" name="visibility" />
          </template>
          <div class="flex flex-col gap-sm mt-sm">
              <div class="flex flex-col gap-xxs">
                <h4 class="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
                <p class="text-xs text-neutral-foreground-high">Links: <a class="lowercase cursor-pointer">https://cartaofeito.com/cartao-santander-sx-p1/</a></p>
              </div>
              <div class="flex gap-xs overflow-x-auto max-w-full pb-xxs">
                <MetricCard icon="science" title="Sample" type="sample" value="10%" />
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
        </IconCard>
      `,
  }),
  args: defaultArgs,
};

export const Default: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const isIconRound: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: 'info',
    isIconRound: true,
  },
};
