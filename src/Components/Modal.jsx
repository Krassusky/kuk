// src/Components/Modal.js
import React from 'react';
import './Modal.css'; // Ensure you have some basic CSS for modal

const Modal = ({ show, title, children, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="modal-button">OK</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
