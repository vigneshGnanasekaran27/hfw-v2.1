import React from "react";

const StepIndicator = ({ currentStep, steps }) => (
  <div className="w-full mb-8">
    {/* Desktop View */}
    <div className="hidden md:block">
      <div className="relative">
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200">
          <div
            className="absolute h-full bg-purple-600 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <div className="relative flex justify-between">
          {steps.map((stepLabel, index) => (
            <div key={stepLabel} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 <= currentStep ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                } mb-2 transition-colors duration-300`}
                aria-current={index + 1 === currentStep ? "step" : undefined}
              >
                {index + 1}
              </div>
              <span className="text-xs text-gray-600 text-center w-20">{stepLabel}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Mobile View */}
    <div className="md:hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium">
          Step {currentStep} of {steps.length}
        </span>
        <span className="text-sm font-medium">{steps[currentStep - 1]}</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  </div>
);

export default StepIndicator;