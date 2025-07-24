import React from 'react';

export interface BasicModalType {
    show?: boolean,
    title?: React.ReactNode | string;
    content: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'lg' | 'xl';
}
interface BasicModalProps extends BasicModalType {
    show: boolean;
    onClose: () => void;
}

const BasicModal: React.FC<BasicModalProps> = ({ show, title, content, footer, onClose, size }) => {
    if (!show) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
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
