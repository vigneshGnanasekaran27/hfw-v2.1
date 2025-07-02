import React from "react";

const EncouragementModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Welcome!</h2>
      <p>We're excited to help you start your fitness journey!</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
);

export default EncouragementModal;