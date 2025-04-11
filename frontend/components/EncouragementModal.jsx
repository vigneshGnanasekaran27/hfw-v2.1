"use client";
import { useState, useEffect } from "react";
import { XCircle, Heart, Timer, Target } from "lucide-react";

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

export const EncouragementModal = ({ onClose }) => {
  const hasMounted = useHasMounted();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hasMounted) {
      setIsVisible(true);
    }
  }, [hasMounted]);

  if (!hasMounted) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-xl w-full max-w-sm transform transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header with warm gradient */}
        <div className="bg-gradient-to-r from-orange-100 to-rose-100 rounded-t-xl p-6 relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>

          <div className="flex items-center justify-center">
            <Heart className="w-12 h-12 text-rose-500 animate-pulse" />
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mt-4">
            Your Journey to a Better You Starts Here ❤️
          </h2>
        </div>

        {/* Body with quick value propositions */}
        <div className="p-6 space-y-4">
          <p className="text-gray-600 text-center text-sm md:text-base">
            Just 2 minutes of your time now can lead to months of guided
            transformation. We're here to support you every step of the way.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <Timer className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Takes only 2 minutes to start your journey
              </p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <Target className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Get a personalized plan that fits your life
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            I'm Ready to Change My Life
          </button>

          <p className="text-xs text-center text-gray-500 mt-2">
            Join 10,000+ others who took this step
          </p>
        </div>
      </div>
    </div>
  );
};

export default EncouragementModal;
