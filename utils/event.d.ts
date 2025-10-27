declare class Event {
    events: any;
    constructor();
    on(event: any, callback: any): void;
    off(event: any, callback: any): void;
    emit(event: any, ...args: any[]): void;
}
declare const _default: Event;
export default _default;
//# sourceMappingURL=event.d.ts.map