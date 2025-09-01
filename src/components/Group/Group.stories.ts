import type { Meta, StoryObj } from "@storybook/vue3";
import Group from "./Group.vue";

export default {
  component: Group,
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      table: {
        defaultValue: { summary: null },
      },
    },
    vertical: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof Group>;

type Story = StoryObj<typeof Group>;


const defaultRender = (args: any) => ({
  components: { Group },
  setup() {
    return { args };
  },
  template:
    '<Group v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" :items="args.items" :label-key="args.labelKey" :value-key="args.valueKey" :get-object="args.getObject" />'
})

export const Radio: Story = {
  render: defaultRender,
  args: {
    modelValue: 1,
    vertical: false,
    disabled: false,
    items: [
      { label: "First", value: 1 },
      { label: "Second", value: 2 },
      { label: "Third", value: 3 },
    ],
    labelKey: "label",
    valueKey: "value",
    getObject: false,
  },
};

export const Vertical: Story = {
  render: defaultRender,
  args: {
    vertical: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    disabled: true,
  },
};

export const Toggle: Story = {
  render: (args: any) => ({
    components: { Group },
    setup() {
      return { args };
    },
    template:
      '<Group v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' +
      '\n<Toggle :group-value="1">First</Toggle>' +
      '\n<Toggle :group-value="2">Second</Toggle>' +
      '\n<Toggle :group-value="3">Third</Toggle>' +
      "\n</Group>",
  }),
  args: {
    modelValue: 1,
    vertical: false,
    disabled: false,
  },
};

export const RadioDiv: Story = {
  render: (args: any) => ({
    components: { Group },
    setup() {
      return { args };
    },
    template:
      '<Group v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' +
      '\n<Toggle :group-value="1" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px]" /></Toggle>' +
      '\n<Toggle :group-value="2" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px] rounded-[4px]" /></Toggle>' +
      '\n<Toggle :group-value="3" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px] rounded-[50%]" /></Toggle>' +
      "\n</Group>",
  }),
  args: {
    modelValue: 1,
    vertical: false,
    disabled: false,
  },
};

export const Conector: Story = {
  render: (args: any) => ({
    components: { Group },
    setup() {
      return { args };
    },
    template:
      '<Group v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" class="items-center">' +
      `\n<Card class="p-[1em]">
                <Group>
                    <Input label-value="label" min-height="3em" placeholder="Type here" />
                    <Select
                        label-value="label"
                        :items="[
                            { label: 'Option 1', something: 0, selected: false },
                            { label: 'Option 2', something: 1, selected: true },
                            { label: 'Option 3', something: 2, selected: false },
                            { label: 'Option 4', something: 3, selected: false },
                            { label: 'Option 5', something: 4, selected: false },
                        ]"
                    >
                        Select
                    </Select>
                    <Input label-value="label" min-height="3em" placeholder="Type here" />
                </Group>
            </Card>` +
      `\n<RoundButton variant="positive" />` +
      "\n</Group>",
  }),
  args: {
    modelValue: undefined,
    vertical: true,
    disabled: false,
  },
};
