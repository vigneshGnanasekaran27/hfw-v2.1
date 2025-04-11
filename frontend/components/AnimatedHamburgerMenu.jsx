import React from "react";

const AnimatedHamburgerMenu = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative hover:text-primary focus:outline-none"
    >
      {/* Sparkling Stars Animation */}
      <div className="absolute -top-2 -right-2 pointer-events-none">
        <svg
          className="animate-ping w-3 h-3 text-primary opacity-75"
          fill="#B8860B"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="absolute -top-4 -left-2 pointer-events-none">
        <svg
          className="animate-ping w-2.5 h-2.5 text-primary opacity-50 delay-150"
          fill="#B8860B"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="absolute -top-1 -left-4 pointer-events-none">
        <svg
          className="animate-ping w-2 h-2 text-primary opacity-25 delay-300"
          fill="#B8860B"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Hamburger Icon with Subtle Pulse Effect */}
      <div className="relative">
        {isOpen ? (
          <svg
            className="w-6 h-6 animate-pulse-subtle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 animate-pulse-subtle"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </div>
    </button>
  );
};

export default AnimatedHamburgerMenu;
