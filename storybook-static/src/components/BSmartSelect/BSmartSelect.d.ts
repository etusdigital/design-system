import { BContainerModelExtra } from '../../utils/components/BContainerModelExtra.types';
type BSelectExpandedExtra = {
    source: BContainerModelExtra['source'] | 'value-selected';
};
type __VLS_Props = {
    modelValue?: any;
    labelValue?: string;
    items: any[];
    icon?: string;
    expanded?: boolean;
    valueKey?: string;
    labelKey?: string;
    searchable?: boolean;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    isMultiple?: boolean;
    getObject?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    absolute?: boolean;
    clearable?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        searchText?(_: {}): any;
        'status-text'?(_: {
            selected: any;
        }): any;
        status?(_: {}): any;
        item?(_: {
            item: any;
        }): any;
        'clear-text'?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: any) => any;
    "update:expanded": (value: boolean, extra: BSelectExpandedExtra) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    "onUpdate:expanded"?: ((value: boolean, extra: BSelectExpandedExtra) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: any;
    labelValue: string;
    absolute: boolean;
    isError: boolean;
    errorMessage: string;
    infoMessage: string;
    required: boolean;
    expanded: boolean;
    searchable: boolean;
    labelKey: string;
    valueKey: string;
    getObject: boolean;
    isMultiple: boolean;
    clearable: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
