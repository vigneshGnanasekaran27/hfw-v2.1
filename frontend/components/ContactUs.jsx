"use client";

import React, { useState } from "react";
import axios from "axios";
import { Send, PhoneOutgoing, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    module: "Contact Us",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // mobile validation (optional but validate if provided)
    if (formData.mobile.trim()) {
      const mobileRegex = /^\+?[0-9\s\-()]{10,15}$/;
      if (!mobileRegex.test(formData.mobile)) {
        newErrors.mobile = "Please enter a valid mobile number";
      }
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Message is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // Clear error when user starts typing in a field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (validate()) {
      setIsSubmitting(true);
      setServerError(null);
      
      try {
        const { name, email, mobile, module, description } = formData;
        
        // Send form data to the API
        await axios.post("/api/contact", {
          name,
          email,
          mobile,
          module,
          description,
        });
        
        setSubmitted(true);
        
        // Reset the form after submission
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            mobile: "",
            module: "Contact Us",
            description: "",
          });
          setSubmitted(false);
        }, 5000);
      } catch (err) {
        setServerError("Failed to send your message. Please try again later.");
        console.error("Error submitting form:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
            <PhoneOutgoing className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">Get in Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Have questions or need assistance? We're here to help you on your fitness journey.
          </p>
        </div>

        <div className="bg-white dark:bg-black rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          {submitted ? (
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Message Sent Successfully!
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Thank you for reaching out. We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.name 
                        ? "border-red-300 dark:border-red-500 bg-red-50 dark:bg-red-900/20" 
                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.email 
                        ? "border-red-300 dark:border-red-500 bg-red-50 dark:bg-red-900/20" 
                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="mobile" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                  mobile Number <span className="text-gray-400 dark:text-gray-500 text-sm">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.mobile 
                      ? "border-red-300 dark:border-red-500 bg-red-50 dark:bg-red-900/20" 
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors`}
                  placeholder="Enter your mobile number"
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.mobile}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <label htmlFor="description" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Your Message
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.description 
                      ? "border-red-300 dark:border-red-500 bg-red-50 dark:bg-red-900/20" 
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors`}
                  placeholder="How can we help you today?"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-6 py-2 rounded-lg text-white font-medium flex items-center justify-center space-x-2 
                    ${isSubmitting 
                      ? "bg-emerald-400 dark:bg-emerald-600 cursor-not-allowed" 
                      : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                    } transition-colors duration-300`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>

              {serverError && (
                <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>{serverError}</span>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Business Hours */}
        <div className="mt-10 bg-white dark:bg-black rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Business Hours</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 dark:border-blue-600 pl-3 py-1">
              <p className="font-medium text-gray-700 dark:text-gray-200">Training Services</p>
              <p className="text-gray-600 dark:text-gray-400">Monday - Friday, 5:00 AM - 7:00 PM</p>
            </div>
            <div className="border-l-4 border-green-500 dark:border-green-600 pl-3 py-1">
              <p className="font-medium text-gray-700 dark:text-gray-200">Customer Support</p>
              <p className="text-gray-600 dark:text-gray-400">Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}