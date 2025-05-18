import type { StoryObj } from "@storybook/vue3";
import BHistory from "./BHistory.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            description: string;
        };
        items: {
            type: {
                summary: string;
            };
            description: string;
        };
        position: {
            type: {
                summary: string;
            };
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        type: {
            type: {
                summary: string;
            };
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        disabled: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
            description: string;
        };
        item: {
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BHistory>;
export declare const Primary: Story;
export declare const Types: Story;
export declare const MultiType: Story;
export declare const Icons: Story;
export declare const RoundIcons: Story;
export declare const UnfilledIcons: Story;
//# sourceMappingURL=BHistory.stories.d.ts.map