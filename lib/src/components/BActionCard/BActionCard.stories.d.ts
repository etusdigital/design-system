import type { StoryObj } from "@storybook/vue3";
import BActionCard from "./BActionCard.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
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
        hideDrag: {
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
        dragstart: {
            description: string;
        };
        dragging: {
            description: string;
        };
        dragend: {
            description: string;
        };
        delete: {
            description: string;
        };
        default: {
            description: string;
        };
        card: {
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BActionCard>;
export declare const Primary: Story;
export declare const Card: Story;
//# sourceMappingURL=BActionCard.stories.d.ts.map