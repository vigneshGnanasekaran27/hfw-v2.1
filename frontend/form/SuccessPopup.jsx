// StatusPopup.js
import React from "react";
import { Check, X, AlertCircle } from "lucide-react";

const StatusPopup = ({ isOpen, onClose, status, errorMessage }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose(); // Close the popup

    if (status === "success") {
      window.location.href = "/dashboard"; // Redirect only on success
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center gap-4">
          <div
            className={`rounded-full p-3 ${
              status === "success" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {status === "success" ? (
              <Check className="h-6 w-6 text-green-600" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-600" />
            )}
          </div>

          <h2 className="text-xl font-semibold text-center">
            {status === "success"
              ? "Enrollment Complete!"
              : "Enrollment Failed"}
          </h2>

          <p className="text-center text-gray-600">
            {status === "success"
              ? "Your enrollment form and assessment schedule have been successfully submitted. You'll receive a confirmation email with further details."
              : errorMessage ||
                "There was an error submitting your enrollment. Please try again."}
          </p>

          {status === "error" && (
            <button
              onClick={handleClose}
              className="mt-4 w-full max-w-xs bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusPopup;
