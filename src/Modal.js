import React from "react";
import "./Modal.css"; // Import the updated CSS

function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="profile-modal">
      <button className="modal-close" onClick={onClose}>X</button>
      <div className="profile-modal-content">
        {children}
      </div>
    </div>
  );
}

export default Modal;
