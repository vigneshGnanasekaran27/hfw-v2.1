"use client";
import React from "react";
import { useState } from "react";
import {
  Calculator,
  Activity,
  Heart,
  Weight,
  Baby,
  ArrowRight,
} from "lucide-react";

const CalculatorLanding = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("calorie");

  const calculators = [
    {
      id: "calorie",
      icon: <Calculator className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Calorie Calculator",
      description:
        "Get personalized daily calorie recommendations based on your goals",
      previewContent: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm">Daily Target</p>
              <p className="text-base sm:text-xl font-bold text-blue-600">2,500 kcal</p>
            </div>
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm">Weight Goal</p>
              <p className="text-base sm:text-xl font-bold text-green-600">-0.5 kg/week</p>
            </div>
          </div>
          <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-xs sm:text-sm">Progress</span>
              <span className="text-xs sm:text-sm font-medium">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "bmr",
      icon: <Activity className="w-6 h-6 md:w-8 md:h-8" />,
      title: "BMR Calculator",
      description:
        "Calculate your Basal Metabolic Rate to understand your base energy needs",
      previewContent: (
        <div className="space-y-4">
          <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg text-center">
            <p className="text-xs sm:text-sm">Your BMR</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">1,785</p>
            <p className="text-xs sm:text-sm">calories/day</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm">Activity Level</p>
              <p className="text-base sm:text-lg font-medium">Moderate</p>
            </div>
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm">Age Factor</p>
              <p className="text-base sm:text-lg font-medium">+120 cal</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "body-fat",
      icon: <Heart className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Body Fat Calculator",
      description:
        "Estimate your body fat percentage using scientific measurements",
      previewContent: (
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">18.5%</p>
              </div>
              <svg className="transform -rotate-90 w-24 h-24 sm:w-32 sm:h-32">
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-gray-200 sm:hidden"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="276"
                  strokeDashoffset="69"
                  className="text-blue-600 sm:hidden"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 hidden sm:block"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="377"
                  strokeDashoffset="94"
                  className="text-blue-600 hidden sm:block"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm">Category</p>
              <p className="text-base sm:text-lg font-medium">Fitness</p>
            </div>
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm">Status</p>
              <p className="text-base sm:text-lg font-medium text-green-600">Healthy</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tdee",
      icon: <Weight className="w-6 h-6 md:w-8 md:h-8" />,
      title: "TDEE Calculator",
      description:
        "Find your Total Daily Energy Expenditure for optimal nutrition",
      previewContent: (
        <div className="space-y-4">
          <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg text-center">
            <p className="text-xs sm:text-sm">Daily Energy Expenditure</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">2,450</p>
            <p className="text-xs sm:text-sm">calories/day</p>
          </div>
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-3 rounded-lg text-center">
              <p className="text-xs">BMR</p>
              <p className="text-xs sm:text-sm font-bold">1,785</p>
            </div>
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-3 rounded-lg text-center">
              <p className="text-xs">Activity</p>
              <p className="text-xs sm:text-sm font-bold">+545</p>
            </div>
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-3 rounded-lg text-center">
              <p className="text-xs">Exercise</p>
              <p className="text-xs sm:text-sm font-bold">+120</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "pregnancy",
      icon: <Baby className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Pregnancy Calculator",
      description:
        "Track pregnancy milestones and get personalized nutrition guidance",
      previewContent: (
        <div className="space-y-4">
          <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg text-center">
            <p className="text-xs sm:text-sm">Current Week</p>
            <p className="text-2xl sm:text-3xl font-bold text-pink-600">Week 24</p>
            <p className="text-xs sm:text-sm">Second Trimester</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm">Due Date</p>
              <p className="text-base sm:text-lg font-medium">Aug 15</p>
            </div>
            <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm">Weight Gain</p>
              <p className="text-base sm:text-lg font-medium">+12.5 lbs</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleCalculatorClick = () => {
    window.location.href = "/calculator";
  };

  const handleCalculatorClickId = (calc) => {
    window.location.href = `/calculator/${calc.id}`;
  };

  return (
    <div className="min-h-screen mt-16 sm:mt-20 md:mt-28" id="calculator">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-sky-100 rounded-full mb-4 md:mb-6 shadow-sm border border-sky-200">
            <Calculator className="w-6 h-6 md:w-8 md:h-8 text-sky-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6">Smart Health Calculators</h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto">
            Make informed decisions about your health and fitness with our suite
            of intelligent calculators. Simple, accurate, and personalized just
            for you.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left Side - Calculator Preview */}
          <div className="rounded-xl p-3 sm:p-4 md:p-6 shadow-lg dark:shadow-[0px_4px_12px_rgba(102,126,234,0.4)]">
            {/* Calculator Tabs */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 md:mb-6 justify-center sm:justify-start">
              {calculators.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setSelectedCalculator(calc.id)}
                  className={`p-2 sm:p-3 rounded-lg transition-all ${
                    selectedCalculator === calc.id
                      ? "bg-cyan-300 dark:bg-cyan-800 scale-105"
                      : "bg-purple-100 dark:bg-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {calc.icon}
                </button>
              ))}
            </div>

            {/* Calculator Preview Content */}
            {calculators.map(
              (calc) =>
                calc.id === selectedCalculator && (
                  <div key={calc.id} className="space-y-4 md:space-y-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mb-4 sm:mb-6 text-center sm:text-left">
                      <div className="bg-blue-500 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-2 sm:mb-0">
                        {calc.icon}
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold">{calc.title}</h2>
                        <p className="text-sm sm:text-base">{calc.description}</p>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div className="p-2 sm:p-4 rounded-lg">{calc.previewContent}</div>
                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                      <button
                        onClick={() => handleCalculatorClick()}
                        className="px-6 py-3 bg-purple-50 text-purple-700 rounded-lg border border-purple-200 flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors shadow-sm
                        dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800 dark:hover:bg-purple-900"
                    >
                        view all our calculator
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                      <button
                        onClick={() => handleCalculatorClickId(calc)}
                        className="px-6 py-3 bg-white text-green-700 rounded-lg border border-green-200 w-auto flex items-center justify-center gap-2   hover:bg-green-50 transition-colors shadow-sm
              dark:bg-black dark:text-green-300 dark:border-green-800 dark:hover:bg-gray-900"
          >
                        {`try ${calc.title}`}
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>

          {/* Right Side - Features */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-8">
              Why Choose Our Calculators?
            </h3>

            <div className="space-y-3 md:space-y-4">
              <div className="p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow dark:shadow-[0px_4px_12px_rgba(102,126,234,0.4)]">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg shrink-0">
                    <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                      Scientific Accuracy
                    </h4>
                    <p className="text-sm sm:text-base">
                      Our calculators use proven scientific formulas and
                      methodologies to provide accurate results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow dark:shadow-[0px_4px_12px_rgba(102,126,234,0.4)]">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg shrink-0">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                      Personalized Results
                    </h4>
                    <p className="text-sm sm:text-base">
                      Get customized recommendations based on your unique body
                      composition and goals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow dark:shadow-[0px_4px_12px_rgba(102,126,234,0.4)]">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-purple-100 dark:bg-gray-900 p-2 sm:p-3 rounded-lg shrink-0">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Easy to Use</h4>
                    <p className="text-sm sm:text-base">
                      Simple interface with clear instructions makes it easy to
                      get the information you need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorLanding;