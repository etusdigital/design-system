import type { App } from 'vue';
import * as components from './components';
import event from './utils/event';
import 'normalize.css';
import './assets/main.css';

export * from './composables';

interface OptionsConfirm {
    title?: string,
    message: string,
    acceptText: string,
    cancelText: string,
}

interface OptionsToast {
    title?: string,
    message: string,
    type?: "info" | "success" | "warning" | "danger" | "neutral",
    top?: boolean,
    bottom?: boolean,
    right?: boolean,
    left?: boolean,
    timeout: number,
    button?: string,
    action?: Function,
}

export default {
    install(app: App) {
        const mdiLink = document.createElement("link");
        mdiLink.rel = "stylesheet";
        mdiLink.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
        document.head.appendChild(mdiLink);

        for (const componentKey in components) {
            app.use((components as any)[componentKey]);
        }
        
        const confirm = (options: OptionsConfirm) => {
            return new Promise((resolve) => {
                event.emit('open-confirm', options);
            
                const onConfirm = () => {
                    event.off('confirm', onConfirm);
                    event.off('cancel', onCancel);
                    resolve(true);
                };
            
                const onCancel = () => {
                    event.off('confirm', onConfirm);
                    event.off('cancel', onCancel);
                    resolve(false);
                };
            
                event.on('confirm', onConfirm);
                event.on('cancel', onCancel);
            });
        };
        app.config.globalProperties.$confirm = confirm;
        app.provide('confirm', confirm);

        const toast = (options: OptionsToast) => {
            const id = Date.now();
            event.emit('open-toast', { ...options, id });
            if (options.timeout) {
                setTimeout(() => {
                    event.emit('close-toast', id);
                }, options.timeout);
            }
            return id;
        };
        app.config.globalProperties.$toast = toast;
        app.provide('toast', toast);

    },
};
