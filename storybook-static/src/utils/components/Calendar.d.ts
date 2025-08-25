type InitialItems = {
    date: Date;
    value?: number;
};
type __VLS_Props = {
    modelValue: Date[] | Date[][];
    initialDates: InitialItems[];
    lang?: string;
    isCompare?: boolean;
    maxInit?: Date;
    maxEnd?: Date;
};
declare const _default: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: Date[] | Date[][]) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: Date[] | Date[][]) => any) | undefined;
}>, {
    isCompare: boolean;
    lang: string;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
