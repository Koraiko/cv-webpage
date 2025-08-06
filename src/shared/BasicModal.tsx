import React from 'react';

export interface BasicModalType {
    show?: boolean, // Whether the modal is visible (trigger from outside)
    title?: React.ReactNode | string; // Title of the modal
    content: React.ReactNode; // Main content of the modal
    footer?: React.ReactNode; // Optional footer content
    size?: 'sm' | 'lg' | 'xl'; // Optional size of the modal
}
interface BasicModalProps extends BasicModalType {
    show: boolean;  // Whether the modal is visible (trigger from outside)
    onClose: () => void;    // Function to call when the modal should be closed
}

/**
 * Basic modal component for displaying content in a modal dialog.
 * @param show - Whether the modal is visible (trigger from outside)
 * @param title - Title of the modal
 * @param content - Main content of the modal
 * @param footer - Optional footer content
 * @param onClose - Function to call when the modal should be closed
 * @param size - Optional size of the modal ('sm', 'lg', 'xl')
 * @returns JSX.Element | null
 */
const BasicModal: React.FC<BasicModalProps> = ({ show, title, content, footer, onClose, size }) => {
    if (!show) return null;

    function handleBackdropClick(e: React.MouseEvent) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="modal fade show d-block"
            tabIndex={-1}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={handleBackdropClick}
        >
            <div className={"modal-dialog " + (size ? `modal-${size}` : '')} onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        {typeof title === 'string' ? <h5 className="modal-title">{title}</h5> : title}
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        />
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    {footer && (
                        <div className="modal-footer">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BasicModal;
