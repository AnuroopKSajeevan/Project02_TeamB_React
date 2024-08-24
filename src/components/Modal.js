import React from "react";
import "../css/Modal.css";

const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay show">
      <div className="modal-content show">
        <h2>Confirmation</h2>
        <p>Are you sure you want to remove this team member?</p>
        <div className="modal-buttons">
          <button className="btn-confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn-cancel" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
