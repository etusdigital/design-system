import type { StoryObj } from "@storybook/vue3";
import BContentScreen from "./BContentScreen.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    argTypes: {
        progression: {
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
        steps: {
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
        isImgRight: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        isAnimatedLogo: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        "bg-logo": {
            description: string;
        };
        "bg-logo-text": {
            description: string;
        };
        default: {
            description: string;
        };
        logo: {
            description: string;
        };
        "progress-bar": {
            description: string;
        };
        card: {
            description: string;
        };
        "card-content": {
            description: string;
        };
        actions: {
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BContentScreen>;
export declare const Primary: Story;
export declare const Slots: Story;
export declare const Slots2: Story;
//# sourceMappingURL=BContentScreen.stories.d.ts.map