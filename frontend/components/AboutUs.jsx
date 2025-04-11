"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Award,
  Target,
  Heart,
  Zap,
  Users,
  PieChart,
  Building2,
} from "lucide-react";
import { useRouter } from "next/navigation";

const AboutUs = () => {
  const router = useRouter();
  const [activeService, setActiveService] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const rotationIntervalRef = useRef(null);

  const services = [
    {
      title: "HopeFit Wellness Kitchen",
      icon: PieChart,
      description:
        "Nutritious and delicious meals crafted to support your fitness goals, whether for weight loss, muscle gain, or overall wellness.",
      iconColor: "text-blue-600",
      link: "/kitchen",
    },
    {
      title: "Lifestyle Fitness Training",
      icon: Target,
      description:
        "Customized workout programs tailored to fit your daily routine, helping you stay active and achieve long-term health goals.",
      iconColor: "text-green-600",
      link: "/training",
    },
    {
      title: "Fitness Apparel",
      icon: Heart,
      description:
        "Premium-quality fitness wear designed for comfort, style, and peak performance during workouts and daily activities.",
      iconColor: "text-red-600",
      link: "/shop",
    },
    {
      title: "Fitness Calculators",
      icon: Users,
      description:
        "Smart fitness tools to calculate calories, macros, BMI, and more, helping you track and optimize your fitness progress.",
      iconColor: "text-purple-600",
      link: "/calculator",
    },
    {
      title: "Health & Fitness Workshops",
      icon: Award,
      description:
        "Informative sessions led by experts, covering nutrition, exercise, mental well-being, and sustainable fitness habits.",
      iconColor: "text-teal-600",
      link: "/workshop",
    },
    {
      title: "Fitness Events",
      icon: Zap,
      description:
        "Exciting community-driven fitness challenges, marathons, and workshops to keep you motivated and engaged.",
      iconColor: "text-yellow-600",
      link: "/events",
    },
  ];
  

  useEffect(() => {
    // Start automatic rotation at a slower speed
    rotationIntervalRef.current = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 1) % 360); // Slower speed (2 degrees instead of 3)
    }, 100); // 100ms interval instead of 50ms
  
    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, []);
  

  const handleMouseEnter = (serviceTitle) => {
    // Pause rotation when hovering
    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current);
      setIsRotating(false);
    }
    setActiveService(serviceTitle);
  };

  const handleMouseLeave = () => {
    if (!isRotating) {
      rotationIntervalRef.current = setInterval(() => {
        setRotation((prevRotation) => (prevRotation + 2) % 360);
      }, 100); // Maintain the same 100ms speed
      setIsRotating(true);
    }
    setActiveService(null);
  };
  

  const handleServiceClick = (service) => {
    router.push(service.link);
  }

  return (
    // <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
    <section className="py-16 overflow-hidden mt-28" id="about">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-100 rounded-full mb-6 shadow-sm border border-emerald-200">
            <Building2 className="w-8 h-8 text-emerald-600  " />
          </div>
          <h2 className="text-4xl   font-bold   mb-4">About Us</h2>
          <p className="text-base md:text-lg   max-w-3xl mx-auto">
            Discover the heart and soul of HOPE FIT WELLNESS
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section: Mission Statement */}
          <div className="space-y-6">
            <div className="prose   text-base md:text-lg space-y-4">
              <p>
                At HOPE FIT WELLNESS, we're not just a fitness program; we're a
                journey of transformation, resilience, and community. We believe
                that every goal, no matter how big or small, is worth pursuing
                with dedication and heart. Whether you're just starting or
                looking to elevate your fitness journey, we're here to guide and
                support you every step of the way.
              </p>
              <p>
                HOPE FIT WELLNESS is dedicated to making health and wellness
                accessible and achievable for everyone. Our journey is built on
                integrity, humanity, and a commitment to each client's success.
                We have worked with a diverse range of clients, tailoring
                programs that not only meet goals but inspire lifelong wellness
                habits.
              </p>
              <p>
                With a firm belief that "the pain we feel today is the strength
                we feel tomorrow," we stand by every client, offering unwavering
                support and guidance until they reach their aspirations. At HOPE
                FIT WELLNESS, we're here to remind you that the challenges of
                today are the victories of tomorrow—and we're proud to be a part
                of your journey.
              </p>
            </div>
          </div>

          {/* Right Section: Interactive Services Rings */}
          <div className="relative flex items-center justify-center w-full">
            <div className="relative w-full max-w-[350px] md:max-w-[500px] aspect-square flex items-center justify-center">
              {services.map((service, index) => {
                const angle = (360 / services.length) * index + rotation;
                const radius = 180; // Increased radius
                const centerOffset = 75; // Distance from center circle
                const positionX = radius * Math.cos((angle * Math.PI) / 180);
                const positionY = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={service.title}
                    className="absolute transition-transform duration-300"
                    style={{
                      transform: `translate(${positionX}px, ${positionY}px)`,
                    }}
                  >
                    <div
                      className={`cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center`}
                      onMouseEnter={() => handleMouseEnter(service.title)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleServiceClick(service)}
                    >
                      <service.icon
                        size={40}
                        className={`${service.iconColor} ${
                          activeService === service.title ? "scale-125" : ""
                        }`}
                      />
                      <p className="text-xs md:text-sm mt-1 font-semibold   text-center">
                        {service.title}
                      </p>
                    </div>
                  </div>
                );
              })}
              {/* Center Content */}
              <div className="absolute z-10 w-[150px] h-[150px] md:w-[180px] md:h-[180px] border-2 border-white  rounded-full shadow-2xl flex flex-col items-center justify-center text-center p-3">
                {activeService ? (
                  <div className="text-center overflow-hidden">
                    <h3 className="text-base md:text-lg font-bold  mb-1 line-clamp-1">
                      {activeService}
                    </h3>
                    <p className="text-xs md:text-sm   line-clamp-3 overflow-hidden">
                      {
                        services.find((s) => s.title === activeService)
                          ?.description
                      }
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-base md:text-xl font-bold  ">
                      HOPE FIT WELLNESS
                    </h3>
                    <p className="text-xs md:text-sm   mt-1">
                      Click to explore our services
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
