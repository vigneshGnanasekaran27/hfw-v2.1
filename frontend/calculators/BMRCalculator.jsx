"use client";
import React, { useState } from "react";

const BMRCalculator = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    sex: "male",
    formula: "mifflin",
    unit: "metric",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const calculateBMR = () => {
    let weight = parseFloat(formData.weight);
    let height = parseFloat(formData.height);

    // Convert imperial to metric if needed
    if (formData.unit === "imperial") {
      weight = weight * 0.453592; // lbs to kg
      height = height * 2.54; // inches to cm
    }

    if (formData.formula === "mifflin") {
      return formData.sex === "male"
        ? 10 * weight + 6.25 * height - 5 * formData.age + 5
        : 10 * weight + 6.25 * height - 5 * formData.age - 161;
    } else {
      return formData.sex === "male"
        ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * formData.age
        : 655.1 + 9.563 * weight + 1.85 * height - 4.676 * formData.age;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmr = calculateBMR();
    setResult(Math.round(bmr));
    setShowResults(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          BMR Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your Basal Metabolic Rate (BMR) - the number of calories
          your body burns at rest to maintain vital functions like breathing,
          cell production, and heart function.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit System
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="unit"
                    value="metric"
                    checked={formData.unit === "metric"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Metric</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="unit"
                    value="imperial"
                    checked={formData.unit === "imperial"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Imperial</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sex
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={formData.sex === "male"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={formData.sex === "female"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight ({formData.unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height ({formData.unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formula
              </label>
              <select
                name="formula"
                value={formData.formula}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="mifflin">Mifflin-St Jeor</option>
                <option value="harris-benedict">Harris-Benedict</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate BMR
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Results
            </h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {result} calories/day
            </div>
            <p className="text-gray-600 mb-4">
              This is your Basal Metabolic Rate (BMR), the minimum number of
              calories your body burns at rest.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <h3 className="font-semibold mb-2">What does this mean?</h3>
              <p className="text-sm text-gray-600">
                Your BMR represents the minimum amount of energy needed to keep
                your body functioning, including breathing and keeping your
                heart beating. To maintain your current weight, you typically
                need to consume more calories than your BMR to account for daily
                activities. For weight loss, consume fewer calories than your
                total daily energy expenditure while staying above your BMR.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMRCalculator;
