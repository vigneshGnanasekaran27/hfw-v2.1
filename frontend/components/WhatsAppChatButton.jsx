"use client";
import React from "react";
import Link from "next/link";

// More attractive WhatsApp icon with brand colors
const WhatsAppIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.67 1.44 5.203l-1.392 4.572a1 1 0 0 0 1.265 1.265l4.572-1.392A9.963 9.963 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.441 13.619c-.285.821-1.508 1.556-2.245 1.655-.738.1-1.389.45-4.534-1.339-3.145-1.788-3.666-4.448-3.666-4.448s-.359-.715-.274-1.625c.085-.91.689-1.694 1.009-1.936.32-.243.682-.365 1.035-.29.353.076.616.405 1 .911.384.506 1.005 1.76 1.09 1.89.085.13.143.283.029.464-.113.18-.168.283-.305.435-.137.152-.29.339-.413.455-.137.117-.28.246-.12.483a7.22 7.22 0 0 0 1.365 1.7c.931.825 1.726 1.084 1.962 1.22.236.135.374.113.512-.068.137-.18.589-.689.747-.926.158-.236.316-.197.512-.118.195.08 1.237.584 1.45.69.213.107.353.16.404.25.052.091.052.528-.232 1.349z"
      fill="#25D366"
    />
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.67 1.44 5.203l-1.392 4.572a1 1 0 0 0 1.265 1.265l4.572-1.392A9.963 9.963 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
      fill="url(#whatsapp-gradient)"
      fillOpacity="0.2"
    />
    <defs>
      <linearGradient
        id="whatsapp-gradient"
        x1="12"
        y1="2"
        x2="12"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#25D366" />
        <stop offset="1" stopColor="#25D366" stopOpacity="0.5" />
      </linearGradient>
    </defs>
  </svg>
);

const WhatsAppChatButton = ({
  businessName = "Fit Wellness",
  phoneNumber,
  message = "Hello, I'd like to get in touch.",
  className = "",
}) => {
  // Construct WhatsApp chat URL with business name
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello%20${encodeURIComponent(
    businessName
  )},%20${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-44 right-6 z-50 border-2 border-white text-green-600 p-3 rounded-full shadow-lg hover:bg-green-100 transition-colors duration-300 ease-in-out group ${className}`}
      aria-label={`Chat with ${businessName} on WhatsApp`}
    >
      <WhatsAppIcon className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
      <span className="sr-only">{businessName}</span>
    </Link>
  );
};

export default WhatsAppChatButton;
