import type { Meta, StoryObj } from "@storybook/vue3";
import Carousel from "./Carousel.vue";

export default {
  component: Carousel,
  argTypes: {
    modelValue: {
      control: { type: "number" },
    },
    items: {
      control: {
        type: "object",
      },
    },
    visible: {
      control: { type: "number" },
    },
    interval: {
      control: { type: "number" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    circular: {
      control: { type: "boolean" },
    },
    vertical: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Carousel>;

type Story = StoryObj<typeof Carousel>;

const defaultArgs = {
  modelValue: 0,
  items: [
    {
      url: "https://cartaofeito.com/cartao-santander-sx-p1/",
      sample: { value: "10%" },
      open: { value: "10%", description: "100.000.000" },
      click: { value: "10%", description: "100.000.000" },
      ctor: { value: "10%" },
      totalDelivered: "100.000.000",
    },
    {
      url: "https://cartaofeito.com/cartao-itau-sx-p1/",
      sample: { value: "20%" },
      open: { value: "20%", description: "200.000.000" },
      click: { value: "20%", description: "200.000.000" },
      ctor: { value: "20%" },
      totalDelivered: "200.000.000",
    },
    {
      url: "https://cartaofeito.com/cartao-unicred-sx-p1/",
      sample: { value: "30%" },
      open: { value: "30%", description: "300.000.000" },
      click: { value: "30%", description: "300.000.000" },
      ctor: { value: "30%" },
      totalDelivered: "300.000.000",
    },
    {
      url: "https://cartaofeito.com/cartao-banestes-sx-p1/",
      sample: { value: "40%" },
      open: { value: "40%", description: "400.000.000" },
      click: { value: "40%", description: "400.000.000" },
      ctor: { value: "40%" },
      totalDelivered: "400.000.000",
    },
    {
      url: "https://cartaofeito.com/cartao-banestes-sx-p1/",
      sample: { value: "50%" },
      open: { value: "50%", description: "500.000.000" },
      click: { value: "50%", description: "500.000.000" },
      ctor: { value: "50%" },
      totalDelivered: "500.000.000",
    },
  ],
  visible: 1,
  interval: 0,
  disabled: false,
  circular: false,
  vertical: false,
};

const defaultHtml = `
  <Carousel
    v-model="args.modelValue"
    :items="args.items"
    :vertical="args.vertical"
    :disabled="args.disabled"
    :visible="args.visible"
    :interval="args.interval"
    :circular="args.circular"
  >
    <template #item="{ item, index }">
      <Card class="flex flex-col gap-sm p-base">
        <div class="flex flex-col gap-sm">
            <div class="flex flex-col gap-xxs">
              <h4 class="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
              <p class="text-xs text-neutral-foreground-high">Links: <a class="lowercase cursor-pointer">{{ item.url }}</a></p>
            </div>
            <div class="flex gap-xs overflow-x-auto max-w-full pb-xxs">
                <MetricCard icon="science" title="Sample" type="dashed" color="info" :value="item.sample.value" />
                <MetricCard icon="drafts" title="Open" :value="item.open.value" :description="item.open.description" class="min-w-[31%]" />
                <MetricCard icon="arrow_selector_tool" title="Click" :value="item.click.value" :description="item.click.description" type="success" class="min-w-[30%]" />
                <MetricCard icon="touch_app" title="CTOR" :value="item.ctor.value" class="min-w-[30%]" />
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-xxs items-center text-neutral-foreground-high">
                <Icon name="mail" size="20px" />
                <p class="text-sm font-bold">Total delivered: {{ item.totalDelivered }}</p>
              </div>
              <Button size="small">More statistics</Button>
            </div>
        </div>
      </Card>
    </template>
  </Carousel>
`;

const defaultRender = (args: any) => ({
  components: { Carousel },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Interval: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    interval: 3000,
  },
};

export const Circular: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    circular: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Vertical: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    vertical: true,
  },
};
