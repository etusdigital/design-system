import type { StoryObj } from "@storybook/vue3";
import BStepOption from "./BStepOption.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        title: {
            type: {
                summary: string;
            };
            description: string;
        };
        description: {
            type: {
                summary: string;
            };
            description: string;
        };
        icon: {
            type: {
                summary: string;
            };
            description: string;
        };
        color: {
            type: {
                summary: string;
            };
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
        };
        isIconRound: {
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
    };
};
export default _default;
type Story = StoryObj<typeof BStepOption>;
export declare const Primary: Story;
//# sourceMappingURL=BStepOption.stories.d.ts.map