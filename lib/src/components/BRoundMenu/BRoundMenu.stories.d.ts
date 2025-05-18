import type { StoryObj } from "@storybook/vue3";
import BRoundMenu from "./BRoundMenu.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        items: {
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
    };
};
export default _default;
type Story = StoryObj<typeof BRoundMenu>;
export declare const Primary: Story;
//# sourceMappingURL=BRoundMenu.stories.d.ts.map