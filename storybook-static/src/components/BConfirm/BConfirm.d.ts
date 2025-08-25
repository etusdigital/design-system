declare const _default: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<{}, {}, {
    title: string;
    message: string;
    acceptText: string;
    cancelText: string;
    visible: boolean;
    onConfirm: () => BooleanConstructor;
    onCancel: (reason: boolean) => BooleanConstructor;
}, {}, {
    handleConfirm(): void;
    handleCancel(): void;
    openDialog(options: any): void;
}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    BButton: {
        new (...args: any[]): import('../../../vue/dist/vue.esm-bundler.js').CreateComponentPublicInstanceWithMixins<Readonly<{
            id?: string;
            name?: string;
            type?: "button" | "reset" | "submit";
            color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
            size?: "small" | "medium" | "large";
            variant?: "primary" | "secondary" | "ghost";
            disabled?: boolean;
            loading?: boolean;
            progress?: number;
        }> & Readonly<{}>, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, {
            progress: number;
            type: "button" | "reset" | "submit";
            color: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
            size: "small" | "medium" | "large";
            variant: "primary" | "secondary" | "ghost";
            disabled: boolean;
            loading: boolean;
        }, false, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').GlobalComponents, import('../../../vue/dist/vue.esm-bundler.js').GlobalDirectives, string, {}, HTMLButtonElement, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<{
            id?: string;
            name?: string;
            type?: "button" | "reset" | "submit";
            color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
            size?: "small" | "medium" | "large";
            variant?: "primary" | "secondary" | "ghost";
            disabled?: boolean;
            loading?: boolean;
            progress?: number;
        }> & Readonly<{}>, {}, {}, {}, {}, {
            progress: number;
            type: "button" | "reset" | "submit";
            color: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
            size: "small" | "medium" | "large";
            variant: "primary" | "secondary" | "ghost";
            disabled: boolean;
            loading: boolean;
        }>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsBase<Readonly<{
        id?: string;
        name?: string;
        type?: "button" | "reset" | "submit";
        color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
        size?: "small" | "medium" | "large";
        variant?: "primary" | "secondary" | "ghost";
        disabled?: boolean;
        loading?: boolean;
        progress?: number;
    }> & Readonly<{}>, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, string, {
        progress: number;
        type: "button" | "reset" | "submit";
        color: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
        size: "small" | "medium" | "large";
        variant: "primary" | "secondary" | "ghost";
        disabled: boolean;
        loading: boolean;
    }, {}, string, {}, import('../../../vue/dist/vue.esm-bundler.js').GlobalComponents, import('../../../vue/dist/vue.esm-bundler.js').GlobalDirectives, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions> & import('../../../vue/dist/vue.esm-bundler.js').VNodeProps & import('../../../vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('../../../vue/dist/vue.esm-bundler.js').ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    BDialog: {
        new (...args: any[]): import('../../../vue/dist/vue.esm-bundler.js').CreateComponentPublicInstanceWithMixins<Readonly<{
            modelValue?: boolean;
            width?: string;
            height?: string;
            noOutsideClose?: boolean;
        }> & Readonly<{
            "onUpdate:modelValue"?: ((value: any) => any) | undefined;
        }>, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
            "update:modelValue": (value: any) => any;
        }, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, {
            width: string;
            modelValue: boolean;
            height: string;
            noOutsideClose: boolean;
        }, false, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').GlobalComponents, import('../../../vue/dist/vue.esm-bundler.js').GlobalDirectives, string, {
            dialog: HTMLDivElement;
        }, any, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<{
            modelValue?: boolean;
            width?: string;
            height?: string;
            noOutsideClose?: boolean;
        }> & Readonly<{
            "onUpdate:modelValue"?: ((value: any) => any) | undefined;
        }>, {}, {}, {}, {}, {
            width: string;
            modelValue: boolean;
            height: string;
            noOutsideClose: boolean;
        }>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsBase<Readonly<{
        modelValue?: boolean;
        width?: string;
        height?: string;
        noOutsideClose?: boolean;
    }> & Readonly<{
        "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    }>, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
        "update:modelValue": (value: any) => any;
    }, string, {
        width: string;
        modelValue: boolean;
        height: string;
        noOutsideClose: boolean;
    }, {}, string, {}, import('../../../vue/dist/vue.esm-bundler.js').GlobalComponents, import('../../../vue/dist/vue.esm-bundler.js').GlobalDirectives, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions> & import('../../../vue/dist/vue.esm-bundler.js').VNodeProps & import('../../../vue/dist/vue.esm-bundler.js').AllowedComponentProps & import('../../../vue/dist/vue.esm-bundler.js').ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _default;
