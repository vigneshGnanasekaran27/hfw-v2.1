"use client";
import { useState } from "react";
import { Construction, X } from "lucide-react";

const ConstructionBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 px-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 animate-slideRight">
          <Construction className="w-5 h-5" />
          <p className="text-lg font-medium whitespace-nowrap">
            🚧 Our website is under construction - We're working hard to bring
            you something amazing! Stay tuned! 🚧
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 hover:bg-yellow-600 rounded-full transition-colors duration-200"
          aria-label="Close banner"
        >
          <X className="w-10 h-10" />
        </button>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-slideRight {
          animation: slideRight 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ConstructionBanner;
