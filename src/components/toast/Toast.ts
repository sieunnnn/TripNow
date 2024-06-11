import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    message: string;
    duration: number;
    type: ToastType;
}

const toasts = ref<Toast[]>([]);

export function useToast() {
    const addToast = (message: string, type: ToastType = 'info', duration = 3000) => {
        toasts.value.push({ message, duration, type });
        setTimeout(() => {
            toasts.value.shift();
        }, duration + 500); // duration + fade out time
    };

    return {
        toasts,
        addToast,
    };
}
