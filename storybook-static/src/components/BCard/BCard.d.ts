interface CardProps {
    className?: string;
    variant?: "elevated" | "outlined" | "filled" | "flat";
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    shadow?: "none" | "sm" | "md" | "lg" | "xl";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    clickable?: boolean;
    disabled?: boolean;
    title?: string;
    subtitle?: string;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        header?(_: {}): any;
        default?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<CardProps, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<CardProps> & Readonly<{}>, {
    variant: "elevated" | "outlined" | "filled" | "flat";
    padding: "none" | "sm" | "md" | "lg" | "xl";
    shadow: "none" | "sm" | "md" | "lg" | "xl";
    radius: "none" | "sm" | "md" | "lg" | "full";
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, HTMLElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
