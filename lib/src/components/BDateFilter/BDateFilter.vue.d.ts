declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {};
    labelValue: {
        default: string;
    };
    lang: {
        default: string;
    };
    maxInit: {};
    maxEnd: {};
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    isError: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorMessage: {
        default: string;
    };
    absolute: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
    };
    options: {
        default: {
            value: string;
            label: string;
            calculate: () => Date[];
        }[];
    };
}>, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "apply")[], "update:modelValue" | "apply", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {};
    labelValue: {
        default: string;
    };
    lang: {
        default: string;
    };
    maxInit: {};
    maxEnd: {};
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    isError: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorMessage: {
        default: string;
    };
    absolute: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
    };
    options: {
        default: {
            value: string;
            label: string;
            calculate: () => Date[];
        }[];
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onApply?: ((...args: any[]) => any) | undefined;
}>, {
    labelValue: string;
    lang: string;
    disabled: boolean;
    isError: boolean;
    errorMessage: string;
    absolute: boolean;
    required: boolean;
    options: {
        value: string;
        label: string;
        calculate: () => Date[];
    }[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=BDateFilter.vue?vue&type=script&setup=true&lang.d.ts.map