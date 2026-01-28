declare const _default: {
    component: any;
    argTypes: {
        src: {
            type: {
                name: string;
            };
            description: string;
        };
        alt: {
            type: {
                name: string;
            };
            description: string;
        };
        width: {
            type: {
                name: string;
                value: string;
            };
            description: string;
        };
        height: {
            type: {
                name: string;
                value: string;
            };
            description: string;
        };
        icon: {
            type: {
                name: string;
            };
            description: string;
        };
        preview: {
            type: {
                name: string;
            };
            control: string;
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
export declare const Primary: {
    render: (args: any) => {
        components: {
            Image: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        src: any;
        alt: string;
        width: string;
        icon: string;
        preview: boolean;
    };
};
export declare const Preview: {
    render: (args: any) => {
        components: {
            Image: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        preview: boolean;
        src: any;
        alt: string;
        width: string;
        icon: string;
    };
};
//# sourceMappingURL=Image.stories.d.ts.map