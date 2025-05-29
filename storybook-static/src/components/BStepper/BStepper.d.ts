type __VLS_Props = {
    modelValue?: any;
    items: any[];
    size?: "medium" | "large";
    disabled?: boolean;
    allowedSkip?: boolean;
    background?: string;
    version?: 1 | 2;
};
declare const _default: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: any) => any;
    changeStep: (item: any, index: number) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    onChangeStep?: ((item: any, index: number) => any) | undefined;
}>, {
    size: "medium" | "large";
    disabled: boolean;
    background: string;
    modelValue: any;
    allowedSkip: boolean;
    version: 1 | 2;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
export default _default;
