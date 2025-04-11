"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home as HomeIcon, ChevronLeft, Menu, X } from "lucide-react";
import Link from "next/link";

const Navigation = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleBack = () => {
    router.back();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-60 right-8 z-40 flex flex-col items-end gap-2">
      {/* Navigation Menu */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2 mb-2 animate-fade-in">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <HomeIcon size={20} />
            <span className="text-sm font-medium">Home</span>
          </Link>

          {router.pathname !== "/" && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  );
};

export default Navigation;
