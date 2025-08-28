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
    '<Group v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' +
    '\n<Radio :group-value="1">First</Radio>' +
    '\n<Radio :group-value="2">Second</Radio>' +
    '\n<Radio :group-value="3">Third</Radio>' +
    "\n</Group>",
})

export const Radio: Story = {
  render: defaultRender,
  args: {
    modelValue: 1,
    vertical: false,
    disabled: false,
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

export const RadioButton: Story = {
  render: (args: any) => ({
    components: { Group },
    setup() {
      return { args };
    },
    template:
      '<Group v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' +
      '\n<RadioButton :group-value="1">First</RadioButton>' +
      '\n<RadioButton :group-value="2">Second</RadioButton>' +
      '\n<RadioButton :group-value="3">Third</RadioButton>' +
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
      '\n<RadioButton :group-value="1" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px]" /></RadioButton>' +
      '\n<RadioButton :group-value="2" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px] rounded-[4px]" /></RadioButton>' +
      '\n<RadioButton :group-value="3" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px] rounded-[50%]" /></RadioButton>' +
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
