import React, { useEffect } from "react";
import './Toast.css';
export interface ToastProps {
    id: string;
    destroy: () => void;
    title: string;
    content: string;
    duration?: number;
    type: 'success' | 'error' | 'warning' | 'info';
}
const Toast: React.FC<ToastProps> = (props) => {
    const { destroy, content, title, duration = 0, id, type } = props;
    useEffect(() => {
        if (!duration) return;
        const timer = setTimeout(() => {
            destroy();
        }, duration);
        return () => clearTimeout(timer);
    }, [destroy, duration]);
    return (
        <div className={`${type}`}>
            <div className={"toast-header"}>
                <div key={id}>{title}</div>
                {/* <div><button onClick={destroy}>X</button></div> */}
            </div>
            <div className={"toast-body"}>{content}</div>
        </div>
    );
};
export default Toast;