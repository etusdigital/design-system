type __VLS_Props = {
    modelValue?: Date | undefined;
    expanded?: boolean;
    labelValue?: string;
    lang?: string;
    maxInit?: Date;
    maxEnd?: Date;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    absolute?: boolean;
    alignRight?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        actions?(_: {}): any;
        'clear-text'?(_: {}): any;
        'apply-text'?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: Date | undefined) => any;
    "update:expanded": (value: boolean) => any;
    apply: (value: Date | undefined) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: Date | undefined) => any) | undefined;
    "onUpdate:expanded"?: ((value: boolean) => any) | undefined;
    onApply?: ((value: Date | undefined) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: Date;
    labelValue: string;
    absolute: boolean;
    isError: boolean;
    errorMessage: string;
    required: boolean;
    expanded: boolean;
    lang: string;
    alignRight: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
