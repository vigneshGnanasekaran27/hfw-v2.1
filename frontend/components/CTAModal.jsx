import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, MessageCircle, X, Check, AlertTriangle } from 'lucide-react';

export const CTAModal = ({ 
  sectionName, 
  buttonText = 'Get Started', 
  triggerClassName = 'bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Validation states
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Mobile validation regex (allows various international formats)
  const mobileRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateMobile = () => {
    if (mobile && !mobileRegex.test(mobile)) {
      setMobileError('Please enter a valid mobile number');
      return false;
    }
    setMobileError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isEmailValid = validateEmail();
    const isMobileValid = validateMobile();

    if (!isEmailValid || !isMobileValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await axios.post('/api/contact', {
        email,
        mobile,
        module: sectionName,
        description,
      });

      setSubmitSuccess(true);
      // Reset form after successful submission
      setEmail('');
      setMobile('');
      setDescription('');
      
      // Auto-close modal after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      setSubmitError('Failed to submit. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset errors when input changes
  useEffect(() => {
    setEmailError('');
  }, [email]);

  useEffect(() => {
    setMobileError('');
  }, [mobile]);

  return (
    <>
      {/* Trigger Button */}
      <button 
        className={`${triggerClassName}`} 
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </button>
      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-in-out">
            {/* Modal Header */}
            <div className="bg-blue-50 px-6 py-4 rounded-t-xl flex justify-between items-center border-b border-blue-100">
              <h2 className="text-xl font-bold text-blue-800 flex items-center">
                <MessageCircle className="mr-2 text-blue-600" size={24} />
                Contact Us - {sectionName}
              </h2>
              <button 
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Success Message */}
              {submitSuccess ? (
                <div className="text-center py-8">
                  <Check className="mx-auto text-green-500 mb-4" size={48} />
                  <p className="text-green-600 text-lg font-semibold">
                    Thank you! We'll get back to you soon.
                  </p>
                </div>
              ) : (
                // Submission Form
                (<form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      <Mail className="mr-2 text-blue-500" size={16} />
                      Email*
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          emailError 
                            ? 'border-red-300 focus:ring-red-500 text-red-900' 
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        required
                      />
                      {emailError && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <AlertTriangle className="text-red-500" size={20} />
                        </div>
                      )}
                    </div>
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertTriangle className="mr-1" size={12} />
                        {emailError}
                      </p>
                    )}
                  </div>
                  {/* Mobile Field */}
                  <div>
                    <label 
                      htmlFor="mobile" 
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      <Phone className="mr-2 text-blue-500" size={16} />
                      Mobile (Optional)
                    </label>
                    <div className="relative">
                      <input
                        id="mobile"
                        type="tel"
                        placeholder="+1 (123) 456-7890"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        onBlur={validateMobile}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          mobileError 
                            ? 'border-red-300 focus:ring-red-500 text-red-900' 
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {mobileError && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <AlertTriangle className="text-red-500" size={20} />
                        </div>
                      )}
                    </div>
                    {mobileError && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertTriangle className="mr-1" size={12} />
                        {mobileError}
                      </p>
                    )}
                  </div>
                  {/* Description Field */}
                  <div>
                    <label 
                      htmlFor="description" 
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      <MessageCircle className="mr-2 text-blue-500" size={16} />
                      Description
                    </label>
                    <textarea
                      id="description"
                      placeholder="Tell us more about your goals"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  {/* Global Error Message */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center">
                      <AlertTriangle className="mr-2" size={20} />
                      {submitError}
                    </div>
                  )}
                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Send Inquiry'
                    )}
                  </button>
                </form>)
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// // Example usage
// export const FitnessSection = () => {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Nutrition Section</h2>
//       <CTAModal 
//         sectionName="Nutrition" 
//         buttonText="Get Nutrition Consultation"
//       />
//     </div>
//   );
// };