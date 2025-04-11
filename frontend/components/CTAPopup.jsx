"use client"
import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';

const CTAPopup = ({ offers }) => {
  const [isFirstPopupVisible, setIsFirstPopupVisible] = useState(false);
  const [isSecondPopupVisible, setIsSecondPopupVisible] = useState(false);
  const [popupShown, setPopupShown] = useState(0);

  // Key for localStorage to track popup state
  const POPUP_STATE_KEY = 'cta-popup-state';
  const LAST_VISIT_KEY = 'cta-popup-last-visit';

  useEffect(() => {
    // Check last visit timestamp
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const currentTime = Date.now();

    // Clear popup state if revisiting after a certain time (e.g., 24 hours)
    if (!lastVisit || (currentTime - parseInt(lastVisit, 10) > 24 * 60 * 60 * 1000)) {
      localStorage.removeItem(POPUP_STATE_KEY);
    }

    // Update last visit timestamp
    localStorage.setItem(LAST_VISIT_KEY, currentTime.toString());

    // Check if popups have been fully shown in this session
    const savedPopupState = JSON.parse(localStorage.getItem(POPUP_STATE_KEY));
    
    // Only show popups if there are offers and they haven't been fully shown
    if (offers && offers.length > 0 && (!savedPopupState || savedPopupState.fullyClosed === false)) {
      // First popup after 30 seconds
      const firstPopupTimer = setTimeout(() => {
        setIsFirstPopupVisible(true);
      }, 30000);

      // Second popup after 1 minute if first popup was closed
      const secondPopupTimer = setTimeout(() => {
        if (popupShown === 1) {
          setIsSecondPopupVisible(true);
        }
      }, 60000);

      // Cleanup timers
      return () => {
        clearTimeout(firstPopupTimer);
        clearTimeout(secondPopupTimer);
      };
    }
  }, [offers, popupShown]);

  // Handle closing first popup
  const handleCloseFirstPopup = () => {
    setIsFirstPopupVisible(false);
    setPopupShown(1);
    
    // Save state to localStorage
    localStorage.setItem(POPUP_STATE_KEY, JSON.stringify({
      firstPopupClosed: true,
      fullyClosed: false
    }));
  };

  // Handle closing second popup
  const handleCloseSecondPopup = () => {
    setIsSecondPopupVisible(false);
    setPopupShown(2);
    
    // Save state to localStorage, marking as fully closed
    localStorage.setItem(POPUP_STATE_KEY, JSON.stringify({
      firstPopupClosed: true,
      fullyClosed: true
    }));
  };

  // If no offers, return null
  if (!offers || offers.length === 0) {
    return null;
  }

  return (
    <>
      {isFirstPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
            <button 
              onClick={handleCloseFirstPopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <div className="flex items-center mb-4">
              <Gift className="text-blue-600 mr-3" size={32} />
              <h2 className="text-xl font-bold text-gray-800">Current Offers</h2>
            </div>
            <ul className="space-y-2">
              {offers.map((offer, index) => (
                <li key={index} className="text-gray-600">
                  • {offer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isSecondPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-2xl p-6 max-w-md w-full relative border-2 border-blue-200">
            <button 
              onClick={handleCloseSecondPopup}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <div className="flex items-center mb-4">
              <Gift className="text-blue-700 mr-3" size={32} />
              <h2 className="text-xl font-bold text-blue-900">Last Chance Offers!</h2>
            </div>
            <ul className="space-y-2">
              {offers.map((offer, index) => (
                <li key={index} className="text-blue-800 font-medium">
                  • {offer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CTAPopup;