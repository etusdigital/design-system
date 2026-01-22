declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
            };
            description: string;
        };
        length: {
            type: {
                name: string;
            };
            description: string;
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
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        placeholder: {
            type: {
                name: string;
            };
            description: string;
        };
        separator: {
            type: {
                name: string;
            };
            description: string;
        };
        type: {
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
        mask: {
            type: {
                name: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        otp: {
            type: {
                name: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
    };
};
export default _default;
export declare const Default: {
    render: (args: any) => {
        components: {
            PINInput: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        length: number;
        disabled: boolean;
        placeholder: string;
        separator: string;
        type: string;
        mask: boolean;
        otp: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            PINInput: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        length: number;
        modelValue: string;
        placeholder: string;
        separator: string;
        type: string;
        mask: boolean;
        otp: boolean;
    };
};
export declare const Separator: {
    render: (args: any) => {
        components: {
            PINInput: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        separator: string;
        length: number;
        modelValue: string;
        disabled: boolean;
        placeholder: string;
        type: string;
        mask: boolean;
        otp: boolean;
    };
};
export declare const Password: {
    render: (args: any) => {
        components: {
            PINInput: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        type: string;
        length: number;
        modelValue: string;
        disabled: boolean;
        placeholder: string;
        separator: string;
        mask: boolean;
        otp: boolean;
    };
};
export declare const Length: {
    render: (args: any) => {
        components: {
            PINInput: any;
        };
        setup(): {
            args: any;
            value4: import("vue").Ref<string, string>;
            value8: import("vue").Ref<string, string>;
        };
        template: string;
    };
    args: {
        modelValue: string;
        length: number;
        disabled: boolean;
        placeholder: string;
        separator: string;
        type: string;
        mask: boolean;
        otp: boolean;
    };
};
//# sourceMappingURL=PINInput.stories.d.ts.map