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
        rhs: {
            type: {
                name: string;
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
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
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
            Switch: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: boolean;
        rhs: boolean;
        disabled: boolean;
    };
};
export declare const RHS: {
    render: (args: any) => {
        components: {
            Switch: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        rhs: boolean;
        modelValue: boolean;
        disabled: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Switch: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: boolean;
        rhs: boolean;
    };
};
//# sourceMappingURL=Switch.stories.d.ts.map