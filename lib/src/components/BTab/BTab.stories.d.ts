import type { StoryObj } from "@storybook/vue3";
import BTab from "./BTab.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: undefined;
                };
            };
        };
        items: {
            type: {
                summary: string;
            };
            description: string;
        };
        isIcon: {
            type: {
                summary: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        notCard: {
            type: {
                summary: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
    };
};
export default _default;
type Story = StoryObj<typeof BTab>;
export declare const Primary: Story;
export declare const Sizes: Story;
export declare const Icons: Story;
export declare const ObjectArray: Story;
//# sourceMappingURL=BTab.stories.d.ts.map