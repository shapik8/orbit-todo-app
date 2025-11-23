import { useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, className = '' }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal" onClick={handleBackdropClick} style={{ display: 'flex' }}>
            <div className={`modal-content ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
