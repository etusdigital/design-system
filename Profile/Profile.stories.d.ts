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
        name: {
            type: {
                name: string;
            };
            description: string;
        };
        picture: {
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
        options: {
            type: {
                name: string;
                value: {
                    name: string;
                    value: {};
                };
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        labelKey: {
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
        valueKey: {
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
        absolute: {
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
        getObject: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        "logout-label": {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        "edit-label": {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        "edit-option": {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        option: {
            description: string;
        };
        "privacy-policy": {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        "terms-of-use": {
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
            Profile: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        name: string;
        picture: any;
        absolute: boolean;
        disabled: boolean;
        getObject: boolean;
        options: {
            label: string;
            value: string;
        }[];
        labelKey: string;
        valueKey: string;
        logout: () => void;
        edit: () => void;
        editOption: () => void;
        privacyPolicyFunction: () => void;
        termsOfUseFucntion: () => void;
    };
};
export declare const Absolute: {
    render: (args: any) => {
        components: {
            Profile: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        absolute: boolean;
        modelValue: string;
        name: string;
        picture: any;
        disabled: boolean;
        getObject: boolean;
        options: {
            label: string;
            value: string;
        }[];
        labelKey: string;
        valueKey: string;
        logout: () => void;
        edit: () => void;
        editOption: () => void;
        privacyPolicyFunction: () => void;
        termsOfUseFucntion: () => void;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Profile: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: string;
        name: string;
        picture: any;
        absolute: boolean;
        getObject: boolean;
        options: {
            label: string;
            value: string;
        }[];
        labelKey: string;
        valueKey: string;
        logout: () => void;
        edit: () => void;
        editOption: () => void;
        privacyPolicyFunction: () => void;
        termsOfUseFucntion: () => void;
    };
};
export declare const Options: {
    render: (args: any) => {
        components: {
            Profile: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        name: string;
        picture: any;
        absolute: boolean;
        disabled: boolean;
        getObject: boolean;
        options: {
            label: string;
            value: string;
        }[];
        labelKey: string;
        valueKey: string;
        logout: () => void;
        edit: () => void;
        editOption: () => void;
        privacyPolicyFunction: () => void;
        termsOfUseFucntion: () => void;
    };
};
//# sourceMappingURL=Profile.stories.d.ts.map