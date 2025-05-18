import type { StoryObj } from "@storybook/vue3";
import BDate from "./BDate.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: null;
                };
            };
            description: string;
        };
        lang: {
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
        isPeriod: {
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
        maxInit: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: null;
                };
            };
            description: string;
        };
        maxEnd: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: null;
                };
            };
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BDate>;
export declare const Primary: Story;
//# sourceMappingURL=BDate.stories.d.ts.map