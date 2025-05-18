import type { StoryObj } from "@storybook/vue3";
import BSideMenu from "./BSideMenu.vue";
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
        parentPath: {
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
type Story = StoryObj<typeof BSideMenu>;
export declare const Primary: Story;
export declare const WithMenu: Story;
//# sourceMappingURL=BSideMenu.stories.d.ts.map