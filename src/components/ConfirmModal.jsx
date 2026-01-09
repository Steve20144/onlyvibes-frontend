import React from 'react';

/**
 * A reusable modal dialog for confirming user actions.
 * * @param {object} props - The component props.
 * @param {boolean} props.show - Whether the modal is currently visible.
 * @param {function} props.onClose - Callback function to close the modal (Cancel).
 * @param {function} props.onConfirm - Callback function to execute the action (Confirm).
 * @param {string} props.message - The confirmation message to display.
 * @param {string} props.confirmText - Label for the confirm button.
 * @param {string} props.cancelText - Label for the cancel button.
 * @returns {JSX.Element|null} The modal UI or null if not shown.
 */
export const ConfirmModal = ({ show, onClose, onConfirm, message, confirmText, cancelText }) => {
    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="btn btn-primary">{confirmText}</button>
                    <button onClick={onClose} className="btn btn-secondary">{cancelText}</button>
                </div>
            </div>
        </div>
    );
};