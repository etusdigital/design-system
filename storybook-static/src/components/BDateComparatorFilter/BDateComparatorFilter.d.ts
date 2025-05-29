type OptionType = {
    label: string;
    value: string;
    calculate: () => Date[];
    selected?: boolean;
    disabled?: boolean;
};
type __VLS_Props = {
    modelValue?: Date[] | Date[][];
    labelValue?: string;
    lang?: string;
    separator?: string;
    isCompare?: boolean;
    maxInit?: Date;
    maxEnd?: Date;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    absolute?: boolean;
    expanded?: boolean;
    alignRight?: boolean;
    options?: OptionType[] | any;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        'compare-text'?(_: {}): any;
        actions?(_: {}): any;
        'clear-text'?(_: {}): any;
        'apply-text'?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: Date[] | Date[][]) => any;
    "update:expanded": (value: boolean) => any;
    apply: (value: Date[] | Date[][]) => any;
    "update:isCompare": (value: boolean) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: Date[] | Date[][]) => any) | undefined;
    "onUpdate:expanded"?: ((value: boolean) => any) | undefined;
    onApply?: ((value: Date[] | Date[][]) => any) | undefined;
    "onUpdate:isCompare"?: ((value: boolean) => any) | undefined;
}>, {
    disabled: boolean;
    labelValue: string;
    absolute: boolean;
    isError: boolean;
    errorMessage: string;
    required: boolean;
    expanded: boolean;
    options: OptionType[] | any;
    isCompare: boolean;
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
