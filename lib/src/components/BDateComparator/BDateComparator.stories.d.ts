import type { StoryObj } from "@storybook/vue3";
import BDateComparator from "./BDateComparator.vue";
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
        isCompare: {
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
type Story = StoryObj<typeof BDateComparator>;
export declare const Primary: Story;
//# sourceMappingURL=BDateComparator.stories.d.ts.map