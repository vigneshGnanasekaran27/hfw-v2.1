"use client";
import React, { useState, useEffect } from "react";
import Image from "next/legacy/image";

import { Scroll, ArrowRight, Trophy, Calendar } from "lucide-react";

import Challenge from "..//images/Events/challenge.png";
import Marathon from "..//images/Events/marathon.png";
import Cyclists from "..//images/Events/cyclists.png";

export default function EventSection() {
  const events = [
    {
      title: "Half Marathon",
      type: "Endurance Race",
      description:
        "Challenge yourself in our half marathon event—perfect for runners of all levels looking to push their limits.",
      icon: <Calendar className="w-10 h-10 text-cyan-600" />,
      image: Marathon,
      date: "Next Event: April 15, 2025",
    },
    {
      title: "Early Morning Cycling",
      type: "Outdoor Adventure",
      description:
        "Kickstart your day with an invigorating early morning cycling ride through scenic routes.",
      icon: <Calendar className="w-10 h-10 text-cyan-600" />,
      image: Cyclists,
      date: "Next Event: April 15, 2025",
    },
    {
      title: "Fitness Challenges",
      type: "Strength & Endurance",
      description:
        "Test your strength and stamina with our exciting fitness challenges designed for all fitness enthusiasts.",
      icon: <Calendar className="w-10 h-10 text-cyan-600" />,
      image: Challenge,
      date: "Next Event: April 15, 2025",
    },
  ];

  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % events.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [events.length]);

  return (
    <section id="events" className="py-20 relative mt-28 ">
      <div className="container mx-auto px-4">
        {/* Improved Header Section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-100 rounded-full mb-6 shadow-md border border-cyan-200 dark:bg-cyan-900 dark:border-cyan-800">
            <Trophy className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
          </div>

          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Our Fitness Events
          </h2>
          <p className="text-lg    max-w-2xl mx-auto">
            Discover Engaging Community Experiences That Transform Your Fitness
            Journey
          </p>
        </div>

        {/* Improved Card Carousel */}
        <div className="relative w-full max-w-5xl mx-auto h-[520px] overflow-hidden">
          {events.map((event, index) => (
            <div
              key={index}
              className={`
                absolute top-0 left-0 w-full 
                transition-all duration-700 ease-in-out
                ${
                  activeCard === index
                    ? "opacity-100 translate-x-0 z-20"
                    : activeCard > index
                    ? "opacity-0 -translate-x-full -z-10"
                    : "opacity-0 translate-x-full -z-10"
                }
              `}
            >
              <div
                className="rounded-xl shadow-lg flex flex-col md:flex-row h-[420px] overflow-hidden
                  bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                  transform hover:scale-[1.01] transition-all duration-300"
              >
                {/* Left Side - Content */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center p-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg mb-6 self-start">
                    <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-center mt-auto">
                    {event.icon}
                    <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
                      {event.date}
                    </span>
                  </div>
                </div>

                {/* Right Side - Event Image */}
                <div className="w-full md:w-1/2 h-48 md:h-auto relative">
                  <Image
                    src={event.image}
                    alt={`${event.title} image`}
                    layout="fill"
                    className="absolute inset-0 object-cover "
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                </div>
              </div>

              {/* Improved Call to Action Button */}
              <div
                className={`
                  mt-6 text-center transition-all duration-700 ease-in-out
                  ${
                    activeCard === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-full"
                  }
                `}
              >
                <button
                  className="px-6 py-3 bg-white text-green-700 rounded-lg border border-green-200 flex items-center justify-center mx-auto   hover:bg-green-50 transition-colors shadow-sm
              dark:bg-black dark:text-green-300 dark:border-green-800 dark:hover:bg-gray-900"
                >
                  Enroll in {event.title}{" "}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Fixed Navigation Dots - Now Visible */}
        <div className="absolute   left-0 right-0 flex justify-center z-30">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`
                  h-3 rounded-full mx-2 transition-all duration-300
                  ${
                    activeCard === index
                      ? "bg-cyan-600 w-10"
                      : "bg-gray-300 dark:bg-gray-600 w-3 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }
                `}
              aria-label={`View event ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
