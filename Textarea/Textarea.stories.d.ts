declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            description: string;
        };
        labelValue: {
            description: string;
        };
        max: {
            description: string;
        };
        errorMessage: {
            description: string;
        };
        infoMessage: {
            description: string;
        };
        placeholder: {
            description: string;
        };
        isError: {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        disabled: {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        textAlign: {
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        tooltipMinWidth: {
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
export declare const Primary: {
    render: (args: any) => {
        components: {
            Textarea: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        labelValue: string;
        max: any;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
    };
};
export declare const MaxCharacters: {
    render: (args: any) => {
        components: {
            Textarea: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        labelValue: string;
        max: number;
        placeholder: string;
        modelValue: string;
        errorMessage: string;
        infoMessage: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
    };
};
export declare const IsError: {
    render: (args: any) => {
        components: {
            Textarea: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        labelValue: string;
        isError: boolean;
        errorMessage: string;
        modelValue: string;
        max: any;
        infoMessage: string;
        placeholder: string;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
    };
};
export declare const InfoMessage: {
    render: (args: any) => {
        components: {
            Textarea: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        labelValue: string;
        infoMessage: string;
        modelValue: string;
        max: any;
        errorMessage: string;
        placeholder: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Textarea: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        labelValue: string;
        disabled: boolean;
        modelValue: string;
        max: any;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
    };
};
export declare const Required: {
    render: (args: any) => {
        components: {
            Textarea: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        labelValue: string;
        required: boolean;
        modelValue: string;
        max: any;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        disabled: boolean;
        textAlign: string;
        tooltipMinWidth: string;
    };
};
export declare const TextAlign: {
    render: (args: any) => {
        components: {
            Textarea: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        labelValue: string;
        max: any;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
    };
};
//# sourceMappingURL=Textarea.stories.d.ts.map