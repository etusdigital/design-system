type Callback = (...args: any[]) => any;
declare class Event {
    events: Record<string | number, Callback[]>;
    constructor();
    on(event: string | number, callback: Callback): void;
    off(event: string | number, callback: Callback): void;
    emit(event: string | number, ...args: any[]): void;
}
declare const _default: Event;
export default _default;
