type __VLS_Props = {
    progression?: number;
    steps?: number;
    isImgRight?: boolean;
    isAnimatedLogo?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        'bg-logo'?(_: {}): any;
        'bg-logo-text'?(_: {}): any;
        default?(_: {}): any;
        logo?(_: {}): any;
        'progress-bar'?(_: {}): any;
        card?(_: {}): any;
        'card-content'?(_: {}): any;
        actions?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:progression": (value: number) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:progression"?: ((value: number) => any) | undefined;
}>, {
    steps: number;
    progression: number;
    isImgRight: boolean;
    isAnimatedLogo: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
