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
        allowDuplicate: {
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
        max: {
            type: {
                name: string;
            };
            description: string;
        };
        required: {
            type: {
                name: string;
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
        };
        "hint-message": {
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
            TagInput: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        labelValue: string;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        required: boolean;
        allowDuplicate: boolean;
        max: any;
        disabled: boolean;
        mask: any;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const IsError: {
    render: (args: any) => {
        components: {
            TagInput: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        isError: boolean;
        errorMessage: string;
        modelValue: any;
        labelValue: string;
        infoMessage: string;
        placeholder: string;
        required: boolean;
        allowDuplicate: boolean;
        max: any;
        disabled: boolean;
        mask: any;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const InfoMessage: {
    render: (args: any) => {
        components: {
            TagInput: any;
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
        errorMessage: string;
        placeholder: string;
        isError: boolean;
        required: boolean;
        allowDuplicate: boolean;
        max: any;
        disabled: boolean;
        mask: any;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            TagInput: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: string[];
        labelValue: string;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        required: boolean;
        allowDuplicate: boolean;
        max: any;
        mask: any;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const Required: {
    render: (args: any) => {
        components: {
            TagInput: any;
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
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        allowDuplicate: boolean;
        max: any;
        disabled: boolean;
        mask: any;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const AllowDuplicate: {
    render: (args: any) => {
        components: {
            TagInput: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        allowDuplicate: boolean;
        modelValue: any;
        labelValue: string;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        required: boolean;
        max: any;
        disabled: boolean;
        mask: any;
        icon: string;
        appendIcon: boolean;
    };
};
export declare const Max: {
    render: (args: any) => {
        components: {
            TagInput: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        max: number;
        modelValue: any;
        labelValue: string;
        errorMessage: string;
        infoMessage: string;
        placeholder: string;
        isError: boolean;
        required: boolean;
        allowDuplicate: boolean;
        disabled: boolean;
        mask: any;
        icon: string;
        appendIcon: boolean;
    };
};
//# sourceMappingURL=TagInput.stories.d.ts.map