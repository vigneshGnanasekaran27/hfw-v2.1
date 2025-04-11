"use client";
import React, { useState, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { Star } from "lucide-react";

// Initial testimonials
const initialTestimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    position: "Marketing Manager",
    quote:
      "This fitness program completely transformed my lifestyle. I've lost 30 pounds and gained incredible confidence!",
    email: "emily.johnson@example.com",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Software Engineer",
    quote:
      "The personalized nutrition and workout plans have been a game-changer. I feel stronger and more energetic than ever before.",
    email: "michael.chen@example.com",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Rodriguez",
    position: "Yoga Instructor",
    quote:
      "As a fitness professional, I'm impressed by the comprehensive approach to health and wellness offered here.",
    email: "sarah.rodriguez@example.com",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [newReview, setNewReview] = useState({
    email: "",
    quote: "",
    rating: 0,
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Auto-carousel functionality
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(carouselInterval);
  }, [testimonials.length]);

  const generateAvatar = (email) => {
    return createAvatar(identicon, {
      seed: email,
      size: 80,
      background: "#ffffff",
    }).toDataUri();
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newReview.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(newReview.email)) {
      errors.email = "Invalid email format";
    }

    // Quote validation
    if (!newReview.quote.trim()) {
      errors.quote = "Review is required";
    } else if (newReview.quote.trim().length < 10) {
      errors.quote = "Review must be at least 10 characters";
    }

    // Rating validation
    if (newReview.rating === 0) {
      errors.rating = "Please select a rating";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Extract name from email
      const name = newReview.email
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Create new testimonial
      const newTestimonial = {
        id: testimonials.length + 1,
        name,
        email: newReview.email,
        quote: newReview.quote,
        rating: newReview.rating,
        position: "Fitness Enthusiast",
      };

      // Update testimonials and reset form
      setTestimonials((prev) => [...prev, newTestimonial]);
      setCurrentTestimonial(testimonials.length);
      setNewReview({
        email: "",
        quote: "",
        rating: 0,
      });
      setFormErrors({});

      // Show success pop-up
      setShowSuccessPopup(true);

      // Auto-hide pop-up after 3 seconds
      setTimeout(() => setShowSuccessPopup(false), 5000);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-xl ${
          index < rating ? "text-emerald-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const testimonial = testimonials[currentTestimonial];
  const handlePrev = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    // <div className="bg-white py-16">
    <div className="py-16 mt-28">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Success Pop-Up */}
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <h3 className="text-xl font-bold text-emerald-500">
                Thank you for your review!
              </h3>
              <p className="text-gray-600 mt-2">
                Your feedback means a lot to us.
              </p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="mt-4 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center">
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center p-2 bg-pink-100 rounded-full mb-6 shadow-sm border border-pink-200">
              <Star className="w-8 h-8 text-pink-600  " />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center  mb-8">
            Testimonials
          </h2>
        </div>
        {/* Testimonial Display Section */}
        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Testimonial Content - Now spanning 3 columns */}
          <div className="md:col-span-3  rounded-xl p-10 shadow-lg relative">
            <div className="absolute top-4 left-4 text-6xl  font-bold">"</div>
            <blockquote className="text-xl   italic mb-8 relative z-10 pl-4">
              {testimonial.quote}
            </blockquote>

            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full border-2 border-emerald-500 mr-5">
                <img
                  src={generateAvatar(testimonial.email)}
                  alt={testimonial.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold  -800 text-lg">
                  {testimonial.name}
                </h3>
                <p className="  text-sm">{testimonial.position}</p>
                <div className="mt-2">{renderStars(testimonial.rating)}</div>
              </div>
            </div>
            {/* Manual Sliding Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrev}
                className="px-4 py-2  rounded-full hover:bg-gray-400"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2   rounded-full hover:bg-gray-400"
              >
                Next
              </button>
            </div>
            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 
                ${
                  index === currentTestimonial
                    ? "bg-emerald-500"
                    : "bg-gray-300"
                }`}
                />
              ))}
            </div>
          </div>

          {/* Review Submission Form - Now spanning 2 columns */}
          <div className="md:col-span-2   rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold   mb-6 text-center">
              Share Your Experience
            </h2>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={newReview.email}
                  onChange={(e) =>
                    setNewReview((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 
                    ${formErrors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Tell us about your fitness journey"
                  value={newReview.quote}
                  onChange={(e) =>
                    setNewReview((prev) => ({ ...prev, quote: e.target.value }))
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 h-40 
                    ${formErrors.quote ? "border-red-500" : "border-gray-300"}`}
                />
                {formErrors.quote && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.quote}
                  </p>
                )}
              </div>

              <div className="text-center">
                <div className="flex justify-center space-x-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setNewReview((prev) => ({ ...prev, rating: star }))
                      }
                      className={`text-2xl transition-colors duration-200 
                        ${
                          newReview.rating >= star
                            ? "text-emerald-500"
                            : "text-gray-300"
                        }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {formErrors.rating && (
                  <p className="text-red-500 text-sm">{formErrors.rating}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500   py-3 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
