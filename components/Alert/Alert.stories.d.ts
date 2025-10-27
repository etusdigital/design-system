declare const _default: {
    component: any;
    argTypes: {
        title: {
            type: {
                name: string;
            };
            description: string;
        };
        message: {
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
        };
        size: {
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
        };
        icon: {
            type: {
                name: string;
            };
            description: string;
        };
        iconPosition: {
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
        expandable: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        closable: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        hideIcon: {
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
        actions: {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Alert: any;
        };
        setup(): {
            args: any;
        };
        methods: {
            delay(callback: any, timeout: any): void;
        };
        template: string;
    };
    args: {
        title: string;
        message: string;
        type: string;
        size: string;
        icon: string;
        iconPosition: string;
        expandable: boolean;
        closable: boolean;
        hideIcon: boolean;
        showAlert: boolean;
    };
};
export declare const Types: {
    render: (args: any) => {
        components: {
            Alert: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        message: string;
        title: string;
        type: string;
        size: string;
        icon: string;
        iconPosition: string;
        expandable: boolean;
        closable: boolean;
        hideIcon: boolean;
        showAlert: boolean;
    };
};
export declare const Sizes: {
    render: (args: any) => {
        components: {
            Alert: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        title: string;
        message: string;
        type: string;
        size: string;
        icon: string;
        iconPosition: string;
        expandable: boolean;
        closable: boolean;
        hideIcon: boolean;
        showAlert: boolean;
    };
};
export declare const IconPositions: {
    render: (args: any) => {
        components: {
            Alert: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        title: string;
        message: string;
        type: string;
        size: string;
        icon: string;
        iconPosition: string;
        expandable: boolean;
        closable: boolean;
        hideIcon: boolean;
        showAlert: boolean;
    };
};
export declare const Expandable: {
    render: (args: any) => {
        components: {
            Alert: any;
        };
        setup(): {
            args: any;
        };
        methods: {
            delay(callback: any, timeout: any): void;
        };
        template: string;
    };
    args: {
        expandable: boolean;
        title: string;
        message: string;
        type: string;
        size: string;
        icon: string;
        iconPosition: string;
        closable: boolean;
        hideIcon: boolean;
        showAlert: boolean;
    };
};
export declare const Closable: {
    render: (args: any) => {
        components: {
            Alert: any;
        };
        setup(): {
            args: any;
        };
        methods: {
            delay(callback: any, timeout: any): void;
        };
        template: string;
    };
    args: {
        closable: boolean;
        title: string;
        message: string;
        type: string;
        size: string;
        icon: string;
        iconPosition: string;
        expandable: boolean;
        hideIcon: boolean;
        showAlert: boolean;
    };
};
export declare const HideIcon: {
    render: (args: any) => {
        components: {
            Alert: any;
        };
        setup(): {
            args: any;
        };
        methods: {
            delay(callback: any, timeout: any): void;
        };
        template: string;
    };
    args: {
        hideIcon: boolean;
        title: string;
        message: string;
        type: string;
        size: string;
        icon: string;
        iconPosition: string;
        expandable: boolean;
        closable: boolean;
        showAlert: boolean;
    };
};
//# sourceMappingURL=Alert.stories.d.ts.map