import type { StoryObj } from "@storybook/vue3";
import BSidebar from "./BSidebar.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            description: string;
        };
        width: {
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
        noOutsideClose: {
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
        default: {
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BSidebar>;
export declare const Primary: Story;
//# sourceMappingURL=BSidebar.stories.d.ts.map