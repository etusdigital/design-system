type __VLS_Props = {
    modelValue?: string;
    expanded?: boolean;
    labelValue?: string;
    items?: string[];
    absolute?: boolean;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    placeholder?: string;
    maxHeight?: string;
    minWidth?: string;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        item?(_: {
            item: string;
            index: number;
        }): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
    "update:expanded": (value: boolean) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    "onUpdate:expanded"?: ((value: boolean) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: string;
    labelValue: string;
    absolute: boolean;
    isError: boolean;
    errorMessage: string;
    infoMessage: string;
    required: boolean;
    maxHeight: string;
    minWidth: string;
    expanded: boolean;
    placeholder: string;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
