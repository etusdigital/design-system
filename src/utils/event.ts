type Callback = (...args: any[]) => any;

class Event {
    events: Record<string | number, Callback[]>;

    constructor() {
        this.events = {};
    }

    on(event: string | number, callback: Callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    off(event: string | number, callback: Callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter((cb) => cb !== callback);
        }
    }

    emit(event: string | number, ...args: any[]) {
        if (this.events[event]) {
            this.events[event].forEach((callback) => callback(...args));
        }
    }
}

export default new Event();