/**
 * Generic callback function type for event handlers
 * Uses a more flexible approach to handle various callback signatures
 */
type Callback<T extends unknown[] = unknown[], R = void> = (...args: T) => R;

/**
 * Base callback type that accepts any arguments - used for internal storage
 */
type BaseCallback = (...args: unknown[]) => unknown;

/**
 * Event emitter class for managing custom events
 */
class Event {
    events: Record<string | number, BaseCallback[]>;

    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to an event
     * @param event - Event name or identifier
     * @param callback - Callback function to execute
     */
    on<T extends unknown[] = unknown[]>(event: string | number, callback: Callback<T>) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback as BaseCallback);
    }

    /**
     * Unsubscribe from an event
     * @param event - Event name or identifier
     * @param callback - Callback function to remove
     */
    off<T extends unknown[] = unknown[]>(event: string | number, callback: Callback<T>) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter((cb) => cb !== (callback as BaseCallback));
        }
    }

    /**
     * Emit an event with arguments
     * @param event - Event name or identifier
     * @param args - Arguments to pass to callbacks
     */
    emit<T extends unknown[]>(event: string | number, ...args: T) {
        if (this.events[event]) {
            this.events[event].forEach((callback) => callback(...args));
        }
    }
}

export default new Event();