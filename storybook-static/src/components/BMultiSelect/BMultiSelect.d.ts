import { BContainerModelExtra } from '../../utils/components/BContainerModelExtra.types';
type BMultiSelectModelExtra = {
    selected: number[];
    deselected: number[];
};
type __VLS_Props = {
    modelValue: any[];
    labelValue?: string;
    icon?: string;
    expanded?: boolean;
    labelKey?: string;
    selectedKey?: string;
    searchable?: boolean;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    absolute?: boolean;
    labelFormatter?: (item: any) => string;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        searchText?(_: {}): any;
        status?(_: {
            selected: number;
        }): any;
        'status-text'?(_: {
            selected: number;
        }): any;
        default?(_: {}): any;
        item?(_: {
            item: any;
            index: number;
        }): any;
        actions?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: any[], extra: BMultiSelectModelExtra) => any;
    "update:expanded": (value: boolean, extra: BContainerModelExtra) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: any[], extra: BMultiSelectModelExtra) => any) | undefined;
    "onUpdate:expanded"?: ((value: boolean, extra: BContainerModelExtra) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: any[];
    labelValue: string;
    absolute: boolean;
    isError: boolean;
    errorMessage: string;
    infoMessage: string;
    required: boolean;
    expanded: boolean;
    searchable: boolean;
    labelKey: string;
    selectedKey: string;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
