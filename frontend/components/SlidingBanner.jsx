"use client";
import { useState, useEffect } from "react";
import Image from "next/legacy/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import Kitchen from "..//images/SlidingBanner/kitchen.jpeg";
import Training from "..//images/SlidingBanner/training.png";
import Cal from "..//images/SlidingBanner/cal.png";
import Shop from "..//images/SlidingBanner/shop.jpeg";

export default function SlidingBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: Kitchen,
      mobileImage: Kitchen,
      title: "HopeFit Wellness Kitchen",
      subtitle: "Nutritious & Delicious Meals for Your Health",
      cta: "Explore Our Menu",
      link: "/kitchen",
    },
    {
      image: Training,
      mobileImage: Training,
      title: "Personalized Fitness Training",
      subtitle: "Achieve Your Goals with Expert Coaching",
      cta: "Start Your Journey",
      link: "/training",
    },
    {
      image: Cal,
      mobileImage: Cal,
      title: "Smart Fitness Calculator",
      subtitle: "Know Your Numbers, Reach Your Goals",
      cta: "Check Your Stats",
      link: "/calculator",
    },
    {
      image: Shop,
      mobileImage: Shop,
      title: "HopeFit Activewear",
      subtitle: "Stylish & Comfortable Gear for Every Workout",
      cta: "Shop Now",
      link: "/shope",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image - Responsive */}
          <>
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
              className="absolute z-10 hidden md:block"
            />
            <Image
              src={slide.mobileImage}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
              className="absolute z-10 md:hidden"
            />
          </>

          {/* Content */}
          <div className="relative z-30 flex items-center justify-center h-full text-center px-4 py-12 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 opacity-50 dark:from-gray-900 dark:via-slate-800 dark:to-black dark:opacity-80"></div>

            {/* Abstract elements */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-400 dark:bg-blue-900 rounded-full filter blur-lg opacity-30 dark:opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-pink-500 dark:bg-purple-900 rounded-full filter blur-lg opacity-30 dark:opacity-20 animate-pulse"></div>

            {/* Additional background elements */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-400 dark:bg-indigo-900 rounded-full filter blur-md opacity-20 dark:opacity-15 animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-indigo-500 dark:bg-violet-900 rounded-full filter blur-md opacity-25 dark:opacity-15"></div>

            <div className="flex flex-col items-center relative z-10">
              {/* Animated Gradient Title with More Vibrant Colors */}
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500 animate-gradient">
                {slide.title}
              </h1>

              <p className="text-xl md:text-2xl mb-8 animate-fadeIn text-white/90 dark:text-gray-300/90 max-w-2xl font-medium drop-shadow-md">
                {slide.subtitle}
              </p>

              <Link href={slide.link}>
                <button className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-emerald-700 dark:to-green-900 text-white dark:text-gray-200 font-bold px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 animate-fadeIn shadow-xl hover:shadow-blue-500/50 dark:hover:shadow-emerald-600/30 transform hover:-translate-y-1 hover:scale-105 dark:border dark:border-emerald-800">
                  <span className="text-lg">{slide.cta}</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 text-green-200 bg-emerald-900 dark:bg-emerald-500 p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 text-green-200 bg-emerald-900 dark:bg-emerald-500 p-2 rounded-full"
      >
        &#10095;
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Add this style for the gradient animation */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
