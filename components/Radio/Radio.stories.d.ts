declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        groupValue: {
            description: string;
            type: {
                name: string;
                value: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        disabled: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        variant: {
            type: {
                name: string;
            };
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
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
export declare const Primary: {
    render: (args: any) => {
        components: {
            Radio: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: boolean;
        groupValue: any;
        disabled: boolean;
        variant: string;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Radio: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: boolean;
        groupValue: any;
        variant: string;
    };
};
export declare const Onboarding: {
    render: (args: any) => {
        components: {
            Radio: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        variant: string;
        modelValue: boolean;
        groupValue: any;
        disabled: boolean;
    };
};
//# sourceMappingURL=Radio.stories.d.ts.map