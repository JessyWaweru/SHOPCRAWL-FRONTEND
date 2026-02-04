import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

// --- IMPORT STYLES ---
import { modalStyles } from "../styles/ModalStyles";

export default function DeleteModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className={modalStyles.overlay}>
      {/* Modal Box */}
      <div className={modalStyles.container}>
        
        {/* Close 'X' Button (Top Right) */}
        <button onClick={onClose} className={modalStyles.closeBtn}>
            <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Header (Icon + Title) */}
        <div className={modalStyles.headerWrapper}>
          <div className={modalStyles.iconCircle}>
            <FontAwesomeIcon icon={faExclamationTriangle} className={modalStyles.iconSize} />
          </div>
          <h3 className={modalStyles.title}>{title || "Delete Item?"}</h3>
          <p className={modalStyles.message}>{message || "This action cannot be undone. Are you sure?"}</p>
        </div>

        {/* Buttons */}
        <div className={modalStyles.buttonGroup}>
          <button onClick={onClose} className={modalStyles.btnCancel}>
            Cancel
          </button>
          
          <button onClick={onConfirm} className={modalStyles.btnDelete}>
            <FontAwesomeIcon icon={faTrash} />
            Yes, Delete it
          </button>
        </div>

      </div>
    </div>
  );
}