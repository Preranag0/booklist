// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Success!</h2>
        <p>Book added successfully. Do you want to add another book?</p>
        <button onClick={onClose}>No</button>
        <button onClick={onConfirm}>Yes</button>
      </div>
    </div>
  );
};

export default Modal;
