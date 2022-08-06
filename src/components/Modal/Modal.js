import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import './Modal.styled.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {

    useEffect(() => {

        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };
    }, [onClose]);

    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        };
    };
    
    return createPortal(
        <div className="Overlay" onClick={handleBackdropClick}>
            <div className="Modal">{children}</div>
        </div>,
        modalRoot);
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
};
