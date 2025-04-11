"use client";
import React, { useState } from "react";
import { faqs } from "@/data/faqData";
import { ShieldQuestion } from "lucide-react";

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // Toggle FAQ answer visibility
  const toggleFAQ = (index) => {
    setExpandedFAQ(
      expandedFAQ.includes(index)
        ? expandedFAQ.filter((i) => i !== index) // Remove index if already in array
        : [...expandedFAQ, index] // Add index if not in array
    );
  };

  // Toggle between showing more or fewer FAQs
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    // <section className="faq bg-gray-100 py-10 px-4">
    <section className="faq py-10 px-4" id="faq">
      <div className="faq-content max-w-4xl mx-auto">
        <div className="flex flex-col">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-2 bg-zinc-100 rounded-full mb-6 shadow-sm border border-zinc-200">
              <ShieldQuestion className="w-10 h-10 text-zinc-600  " />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center  mb-8">
            Frequently Asked Questions
          </h2>
        </div>
        {faqs.slice(0, showMore ? faqs.length : 3).map((faq, index) => (
          <div
            className={`faqItem   py-5 transition-all duration-300  border-b-2 border-purple-100 ${
              expandedFAQ.includes(index)
                ? "  shadow-md rounded-md p-4 dark:shadow-[0px_4px_12px_rgba(102,126,234,0.4)]"
                : " rounded-md my-2 px-4 dark:border-gray-900"
            }`}
            key={index}
          >
            <h3
              className="text-lg font-semibold   cursor-pointer flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span
                className={`transform transition-transform duration-300 ${
                  expandedFAQ.includes(index) ? "rotate-180" : ""
                }`}
              >
                ⌄
              </span>
            </h3>
            {expandedFAQ.includes(index) && (
              <p className="mt-2  ">{faq.answer}</p>
            )}
          </div>
        ))}
        <div className="text-center mt-6">
          {!showMore && (
            <button
              className="showMoreButton bg-teal-500   px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 transition"
              onClick={handleShowMore}
            >
              See More Questions
            </button>
          )}
          {showMore && (
            <button
              className="showMoreButton bg-gray-500   px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
              onClick={handleShowMore}
            >
              See Fewer Questions
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
