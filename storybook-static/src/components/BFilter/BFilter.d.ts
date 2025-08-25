type BMultiSelectModelExtra = {
    selected: number[];
    deselected: number[];
};
type __VLS_Props = {
    modelValue: any;
    labelValue?: string;
    icon?: string;
    expanded?: boolean;
    labelKey?: string;
    selectedKey?: string;
    searchText?: string;
    searchable?: boolean;
    disabled?: boolean;
    absolute?: boolean;
    error?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    closeOnBlur?: boolean;
    hideBottom?: boolean;
    maxHeight?: string;
    minWidth?: string;
    secondary?: boolean;
    hideArrow?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        status?(_: {
            selected: number;
        }): any;
        status?(_: {}): any;
        'status-text'?(_: {
            selected: number;
        }): any;
        default?(_: {}): any;
        actions?(_: {}): any;
        'clear-text'?(_: {}): any;
        'apply-text'?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: any[], extra: BMultiSelectModelExtra) => any;
    "update:expandedModel": (value: boolean) => any;
    apply: () => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: any[], extra: BMultiSelectModelExtra) => any) | undefined;
    "onUpdate:expandedModel"?: ((value: boolean) => any) | undefined;
    onApply?: (() => any) | undefined;
}>, {
    error: boolean;
    secondary: boolean;
    disabled: boolean;
    icon: string;
    modelValue: any;
    labelValue: string;
    absolute: boolean;
    errorMessage: string;
    infoMessage: string;
    required: boolean;
    closeOnBlur: boolean;
    maxHeight: string;
    minWidth: string;
    hideArrow: boolean;
    expanded: boolean;
    searchable: boolean;
    labelKey: string;
    searchText: string;
    selectedKey: string;
    hideBottom: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
