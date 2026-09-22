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
        title: {
            type: {
                name: string;
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
            description: string;
        };
        profile: {
            type: {
                name: string;
                value: {};
            };
            description: string;
        };
        labelKey: {
            type: {
                name: string;
            };
            description: string;
        };
        valueKey: {
            type: {
                name: string;
            };
            description: string;
        };
        getObject: {
            type: {
                name: string;
            };
            description: string;
        };
        logo: {
            description: string;
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
            Navbar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        title: string;
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        profile: {
            name: string;
        };
        options: ({
            label: string;
            value: string;
            icon: string;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
        })[];
    };
};
export declare const CustomSlots: {
    render: (args: any) => {
        components: {
            Navbar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {};
};
//# sourceMappingURL=Navbar.stories.d.ts.map