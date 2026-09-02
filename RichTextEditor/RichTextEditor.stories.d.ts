declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            description: string;
        };
        labelValue: {
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
        errorMessage: {
            description: string;
        };
        infoMessage: {
            description: string;
        };
        placeholder: {
            description: string;
        };
        disabled: {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        required: {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        tooltipMinWidth: {
            description: string;
        };
        noBorder: {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        minHeight: {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        maxHeight: {
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
            RichTextEditor: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        labelValue: string;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        tooltipMinWidth: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        noBorder: boolean;
        minHeight: string;
        maxHeight: string;
    };
};
export declare const IsError: {
    render: (args: any) => {
        components: {
            RichTextEditor: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        isError: boolean;
        errorMessage: string;
        modelValue: string;
        labelValue: string;
        infoMessage: string;
        placeholder: string;
        tooltipMinWidth: string;
        disabled: boolean;
        required: boolean;
        noBorder: boolean;
        minHeight: string;
        maxHeight: string;
    };
};
export declare const InfoMessage: {
    render: (args: any) => {
        components: {
            RichTextEditor: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        infoMessage: string;
        modelValue: string;
        labelValue: string;
        errorMessage: string;
        placeholder: string;
        tooltipMinWidth: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        noBorder: boolean;
        minHeight: string;
        maxHeight: string;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            RichTextEditor: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: string;
        labelValue: string;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        tooltipMinWidth: string;
        isError: boolean;
        required: boolean;
        noBorder: boolean;
        minHeight: string;
        maxHeight: string;
    };
};
export declare const Required: {
    render: (args: any) => {
        components: {
            RichTextEditor: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        required: boolean;
        modelValue: string;
        labelValue: string;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        tooltipMinWidth: string;
        isError: boolean;
        disabled: boolean;
        noBorder: boolean;
        minHeight: string;
        maxHeight: string;
    };
};
export declare const NoBorder: {
    render: (args: any) => {
        components: {
            RichTextEditor: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        noBorder: boolean;
        modelValue: string;
        labelValue: string;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        tooltipMinWidth: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        minHeight: string;
        maxHeight: string;
    };
};
//# sourceMappingURL=RichTextEditor.stories.d.ts.map