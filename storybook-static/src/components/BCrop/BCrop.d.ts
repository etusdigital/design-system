type __VLS_Props = {
    modelValue?: string;
    src: string;
    width?: string;
    height?: string;
};
declare const _default: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
    width: string;
    modelValue: string;
    height: string;
    src: string;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {
    bCrop: HTMLDivElement;
    selectedArea: SVGRectElement;
    cropArea: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
