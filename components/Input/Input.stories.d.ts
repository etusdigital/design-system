declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
                value: string;
            };
            description: string;
        };
        labelValue: {
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
        max: {
            type: {
                name: string;
            };
            description: string;
        };
        min: {
            type: {
                name: string;
            };
            description: string;
        };
        step: {
            type: {
                name: string;
            };
            description: string;
        };
        errorMessage: {
            type: {
                name: string;
            };
            description: string;
        };
        infoMessage: {
            type: {
                name: string;
            };
            description: string;
        };
        placeholder: {
            type: {
                name: string;
            };
            description: string;
        };
        isError: {
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
        mask: {
            type: {
                name: string;
            };
            description: string;
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: any;
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
        icon: {
            type: {
                name: string;
            };
            description: string;
        };
        appendIcon: {
            type: {
                name: string;
            };
            description: string;
        };
        textAlign: {
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
        tooltipMinWidth: {
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
        "icon-slot": {
            description: string;
        };
        "appended-icon-slot": {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Input: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        errorMessage: string;
        modelValue: any;
        labelValue: string;
        type: string;
        mask: any;
        max: any;
        min: any;
        step: number;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const Types: {
    render: (args: any) => {
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        labelValue: string;
        type: string;
        mask: any;
        max: any;
        min: any;
        step: number;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const MaxLetters: {
    render: (args: any) => {
        components: {
            Input: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        max: number;
        type: string;
        modelValue: any;
        labelValue: string;
        mask: any;
        min: any;
        step: number;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const IsError: {
    render: (args: any) => {
        components: {
            Input: any;
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
        type: string;
        modelValue: any;
        mask: any;
        max: any;
        min: any;
        step: number;
        infoMessage: string;
        placeholder: string;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const InfoMessage: {
    render: (args: any) => {
        components: {
            Input: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        infoMessage: string;
        modelValue: any;
        labelValue: string;
        type: string;
        mask: any;
        max: any;
        min: any;
        step: number;
        errorMessage: string;
        placeholder: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Input: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: any;
        labelValue: string;
        type: string;
        mask: any;
        max: any;
        min: any;
        step: number;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const Required: {
    render: (args: any) => {
        components: {
            Input: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        required: boolean;
        modelValue: any;
        labelValue: string;
        type: string;
        mask: any;
        max: any;
        min: any;
        step: number;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        disabled: boolean;
        textAlign: string;
        tooltipMinWidth: string;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const TextAlign: {
    render: (args: any) => {
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        labelValue: string;
        type: string;
        mask: any;
        max: any;
        min: any;
        step: number;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        disabled: boolean;
        required: boolean;
        textAlign: string;
        tooltipMinWidth: string;
        icon: string;
        appendIcon: boolean;
    };
};
//# sourceMappingURL=Input.stories.d.ts.map