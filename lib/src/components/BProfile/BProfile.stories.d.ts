import type { StoryObj } from "@storybook/vue3";
import BProfile from "./BProfile.vue";
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
        name: {
            type: {
                summary: string;
            };
            description: string;
        };
        profilePicture: {
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
        accounts: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: never[];
                };
            };
            description: string;
        };
        nameKey: {
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
        absolute: {
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
        logout: {
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
        editProfile: {
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
        editAccount: {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        changeAccount: {
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
        privacyPolicyFunction: {
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
        termsOfUseFucntion: {
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
        account: {
            description: string;
        };
        privacyPolicy: {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        termsOfUse: {
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
type Story = StoryObj<typeof BProfile>;
export declare const Primary: Story;
export declare const CustomAccount: Story;
//# sourceMappingURL=BProfile.stories.d.ts.map