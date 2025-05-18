import type { StoryObj } from "@storybook/vue3";
import BPagination from "./BPagination.vue";
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
                    summary: number;
                };
            };
            description: string;
        };
        length: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: number;
                };
            };
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BPagination>;
export declare const Primary: Story;
//# sourceMappingURL=BPagination.stories.d.ts.map