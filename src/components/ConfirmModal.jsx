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