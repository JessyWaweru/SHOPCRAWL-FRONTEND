import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
        
        {/* Header (Icon + Title) */}
        <div className="text-center mb-6">
          <div className="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title || "Delete Item?"}</h3>
          <p className="text-gray-500 mt-2 text-sm">{message || "This action cannot be undone."}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition flex items-center gap-2 shadow-lg shadow-red-200"
          >
            <FontAwesomeIcon icon={faTrash} />
            Yes, Delete it
          </button>
        </div>

        {/* Close 'X' Button (Top Right) */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
            <FontAwesomeIcon icon={faTimes} />
        </button>

      </div>
    </div>
  );
}