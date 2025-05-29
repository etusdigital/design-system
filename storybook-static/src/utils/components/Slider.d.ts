type __VLS_Props = {
    modelValue?: number[];
    size?: "small" | "medium" | "large";
    max?: number;
    unit?: string;
    color?: string;
    showTooltip?: boolean;
    disabled?: boolean;
    vertical?: boolean;
    fillColors?: any[];
    isRange?: boolean;
    steps?: any[];
    neutralBackground?: boolean;
};
declare const _default: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: number[]) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: number[]) => any) | undefined;
}>, {
    color: string;
    size: "small" | "medium" | "large";
    disabled: boolean;
    modelValue: number[];
    vertical: boolean;
    max: number;
    showTooltip: boolean;
    unit: string;
    isRange: boolean;
    steps: any[];
    neutralBackground: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {
    slider: HTMLDivElement;
    cursors: HTMLSpanElement[];
    fillBar: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
