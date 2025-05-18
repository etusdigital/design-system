import type { StoryObj } from "@storybook/vue3";
import BMenu from "./BMenu.vue";
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
        items: {
            type: {
                summary: string;
            };
            description: string;
        };
        getObject: {
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
type Story = StoryObj<typeof BMenu>;
export declare const Primary: Story;
export declare const WithSideMenu: Story;
//# sourceMappingURL=BMenu.stories.d.ts.map