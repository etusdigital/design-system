type OptionType = {
    label: string;
    value: string;
    calculate: () => Date[];
    selected?: boolean;
    disabled?: boolean;
};
type __VLS_Props = {
    modelValue?: any[] | Date[];
    labelValue?: string;
    lang?: string;
    maxInit?: Date;
    maxEnd?: Date;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    absolute?: boolean;
    required?: boolean;
    options?: OptionType[] | any;
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
    "update:modelValue": (value: any[] | Date[]) => any;
    apply: (value: any[] | Date[]) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: any[] | Date[]) => any) | undefined;
    onApply?: ((value: any[] | Date[]) => any) | undefined;
}>, {
    disabled: boolean;
    labelValue: string;
    absolute: boolean;
    isError: boolean;
    errorMessage: string;
    options: OptionType[] | any;
    lang: string;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
