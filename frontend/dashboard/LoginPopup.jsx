"use client";
import React from "react";
import { X } from "lucide-react";

const LoginPopup = ({ onClose, onNavigateToLogin, onNavigateToRoot }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Login Required
          </h2>
          <p className="text-gray-600">
            To access your dashboard, you need to log in first.
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={onNavigateToLogin}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login Page
          </button>

          <button
            onClick={onNavigateToRoot}
            className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Return to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
