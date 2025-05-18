declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    icon: {
        default: string;
    };
    color: {
        default: string;
    };
    hideDrag: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("dragstart" | "dragging" | "dragend" | "delete")[], "dragstart" | "dragging" | "dragend" | "delete", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    icon: {
        default: string;
    };
    color: {
        default: string;
    };
    hideDrag: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onDragstart?: ((...args: any[]) => any) | undefined;
    onDragging?: ((...args: any[]) => any) | undefined;
    onDragend?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
}>, {
    icon: string;
    color: string;
    hideDrag: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=BActionCard.vue?vue&type=script&setup=true&lang.d.ts.map