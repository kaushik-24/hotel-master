import React from "react";

interface IConfirm {
    onClose: () => void;
    onConfirm: () => void;
    selectedAdminId?: string | null;
    message: string;
}

const ConfirmationBox: React.FC<IConfirm> = ({ message, onClose, onConfirm }) => {

    return (
        <div className="flex flex-col z-[100]">
            {/* Confirmation box content */}
            <p className="text-lg">Are you sure you want to {message}?</p>
            <div className="flex justify-end gap-x-4">
                <button className="bg-green-500 p-1 rounded-md text-white" onClick={onClose}>No</button>
                <button className="bg-red-500 p-1 rounded-md text-white" onClick={onConfirm}>Yes</button>
            </div>
        </div>
    );
}

export default ConfirmationBox;