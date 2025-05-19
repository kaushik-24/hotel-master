import { createRoot } from "react-dom/client";
import Toast, { ToastProps } from "./Toast";
interface ToastOptions {
    id?: string;
    title: string;
    content: string;
    duration?: number;
    type: 'success' | 'error' | 'warning' | 'info';
}
export class ToastManager {
    private containerRef: HTMLDivElement;
    private toasts: ToastProps[] = [];
    private root: ReturnType<typeof createRoot>;
    constructor() {
        const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
        const toastContainer = document.createElement("div") as HTMLDivElement;
        toastContainer.id = "toast-container-main";
        body.insertAdjacentElement("beforeend", toastContainer);
        this.containerRef = toastContainer;
        this.root = createRoot(this.containerRef); // Initialize the root for concurrent mode
    }
    public show(options: ToastOptions): void {
        const toastId = Math.random().toString(36).substring(2, 9);
        const toast: ToastProps = {
            id: toastId,
            ...options, // if id is passed within options, it will overwrite the auto-generated one
            destroy: () => this.destroy(options.id ?? toastId),
        };
        this.toasts = [toast, ...this.toasts];
        this.render();
    }
    public destroy(id: string): void {
        this.toasts = this.toasts.filter((toast: ToastProps) => toast.id !== id);
        this.render();
    }
    private render(): void {
        const toastsList = this.toasts.map((toastProps: ToastProps) => (
            <Toast key={toastProps.id} {...toastProps} />
        ));
        this.root.render(toastsList); // Use the root to render toasts
    }
}
export const toast = new ToastManager();