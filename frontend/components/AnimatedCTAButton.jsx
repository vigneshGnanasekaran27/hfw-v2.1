"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageCircle,
  X,
  Check,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import axios from "axios";

const AnimatedCTAButton = ({
  children,
  onClick,
  className = "",
  size = "md",
  showModal = false,
  sectionName = "Contact Us",
  customAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    place: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: null,
  });

  // Rest of the existing configuration code remains the same...
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonAnimationVariants = {
    initial: {
      scale: 1,
      y: 0,
      rotate: 0,
    },
    animate: {
      scale: [1, 1.03, 1],
      y: [0, -5, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const stars = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => ({
      key: index,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 2,
    }));
  }, []);

  const starVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      rotate: 0,
    },
    animate: (custom) => ({
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      rotate: [0, 360, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: custom.delay,
        ease: "easeInOut",
      },
    }),
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex =
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.mobile && !mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    if (!formData.place) {
      newErrors.place = "Place is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ success: false, error: null });

    try {
      await axios.post("/api/contact", {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        place: formData.place,
        module: sectionName,
        description: formData.description,
      });

      setSubmitStatus({ success: true, error: null });

      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus({ success: false, error: null });
        setFormData({
          name: "",
          email: "",
          mobile: "",
          place: "",
          description: "",
        });
      }, 2000);
    } catch (error) {
      setSubmitStatus({
        success: false,
        error: "Failed to submit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = () => {
    if (showModal) {
      setIsOpen(true);
    } else if (customAction) {
      customAction();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <div className="relative inline-block">
        {/* Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.key}
            custom={star}
            variants={starVariants}
            initial="initial"
            animate="animate"
            className="absolute z-0 pointer-events-none"
            style={{
              left: `calc(50% + ${star.x}%)`,
              top: `calc(50% + ${star.y}%)`,
              transform: `translate(-50%, -50%) scale(${star.scale})`,
              zIndex: 10,
            }}
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="currentColor"
              className="text-yellow-300"
            >
              <path d="M4 0 L5 3 L8 3.5 L5.5 6 L6 8 L4 6.5 L2 8 L2.5 6 L0 3.5 L3 3 Z" />
            </svg>
          </motion.div>
        ))}

        {/* Button */}
        <motion.button
          variants={buttonAnimationVariants}
          initial="initial"
          animate="animate"
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className={`
            relative 
            inline-flex 
            items-center 
            justify-center 
            font-bold 
            rounded-full 
            shadow-lg 
            focus:outline-none 
            focus:ring-4 
            transition-all 
            duration-300 
            ease-in-out
            bg-blue-500 
            text-white 
            hover:bg-blue-600 
            focus:ring-blue-300/50
            ${sizeStyles[size]}
            ${className}
          `}
        >
          <motion.span className="relative z-10 flex items-center justify-center space-x-2">
            {children}
          </motion.span>
        </motion.button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto">
            {/* Modal Header */}
            <div className="bg-blue-50 px-6 py-4 rounded-t-xl flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-800 flex items-center">
                <MessageCircle className="mr-2 text-blue-600" size={24} />
                {sectionName}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Location Availability Notice */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                <p>
                  We are currently available only in OMR from Kelambakkam to
                  Navalur, and for training (Group and One-on-One), only in
                  gated communities with gym facilities.
                </p>
              </div>

              {submitStatus.success ? (
                <div className="text-center py-8">
                  <Check className="mx-auto text-green-500 mb-4" size={48} />
                  <p className="text-green-600 text-lg font-semibold">
                    Thank you! We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="inline mr-2 text-blue-500" size={18} />
                      Name*
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        <AlertTriangle className="inline mr-1" size={12} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail className="inline mr-2 text-blue-500" size={16} />
                      Email*
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        <AlertTriangle className="inline mr-1" size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Phone className="inline mr-2 text-blue-500" size={16} />
                      Mobile (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                        errors.mobile ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="+1 (123) 456-7890"
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-xs mt-1">
                        <AlertTriangle className="inline mr-1" size={12} />
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Place Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="inline mr-2 text-blue-500" size={16} />
                      Place*
                    </label>
                    <input
                      type="text"
                      value={formData.place}
                      onChange={(e) =>
                        setFormData({ ...formData, place: e.target.value })
                      }
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                        errors.place ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Your Location"
                    />
                    {errors.place && (
                      <p className="text-red-500 text-xs mt-1">
                        <AlertTriangle className="inline mr-1" size={12} />
                        {errors.place}
                      </p>
                    )}
                  </div>

                  {/* Description Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MessageCircle
                        className="inline mr-2 text-blue-500"
                        size={16}
                      />
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Tell us more about your goals"
                    />
                  </div>

                  {submitStatus.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      <AlertTriangle className="inline mr-2" size={20} />
                      {submitStatus.error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {isSubmitting ? "Submitting..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimatedCTAButton;
