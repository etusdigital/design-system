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
        size: {
            type: {
                name: string;
            };
            description: string;
            control: string;
            options: string[];
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
            description: string;
        };
        accept: {
            description: string;
        };
        multiple: {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        "uploaded-file": {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            FileUpload: any;
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
        placeholder: string;
        isError: boolean;
        size: string;
        disabled: boolean;
        infoMessage: string;
        accept: any;
        multiple: boolean;
    };
};
export declare const Accept: {
    render: (args: any) => {
        components: {
            FileUpload: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        labelValue: string;
        accept: string;
        infoMessage: string;
        modelValue: any;
        errorMessage: string;
        placeholder: string;
        isError: boolean;
        size: string;
        disabled: boolean;
        multiple: boolean;
    };
};
export declare const Multiple: {
    render: (args: any) => {
        components: {
            FileUpload: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        labelValue: string;
        multiple: boolean;
        infoMessage: string;
        modelValue: any;
        errorMessage: string;
        placeholder: string;
        isError: boolean;
        size: string;
        disabled: boolean;
        accept: any;
    };
};
export declare const InfoMessage: {
    render: (args: any) => {
        components: {
            FileUpload: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        labelValue: string;
        infoMessage: string;
        modelValue: any;
        errorMessage: string;
        placeholder: string;
        isError: boolean;
        size: string;
        disabled: boolean;
        accept: any;
        multiple: boolean;
    };
};
export declare const IsError: {
    render: (args: any) => {
        components: {
            FileUpload: any;
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
        modelValue: any;
        placeholder: string;
        size: string;
        disabled: boolean;
        infoMessage: string;
        accept: any;
        multiple: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            FileUpload: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        labelValue: string;
        disabled: boolean;
        modelValue: any;
        errorMessage: string;
        placeholder: string;
        isError: boolean;
        size: string;
        infoMessage: string;
        accept: any;
        multiple: boolean;
    };
};
export declare const Required: {
    render: (args: any) => {
        components: {
            FileUpload: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        labelValue: string;
        required: boolean;
        modelValue: any;
        errorMessage: string;
        placeholder: string;
        isError: boolean;
        size: string;
        disabled: boolean;
        infoMessage: string;
        accept: any;
        multiple: boolean;
    };
};
export declare const Sizes: {
    render: (args: any) => {
        components: {
            FileUpload: any;
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
        placeholder: string;
        isError: boolean;
        size: string;
        disabled: boolean;
        infoMessage: string;
        accept: any;
        multiple: boolean;
    };
};
//# sourceMappingURL=FileUpload.stories.d.ts.map