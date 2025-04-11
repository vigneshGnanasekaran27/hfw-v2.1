import React, { useState } from "react";
import { Scale, Ruler, Info, Heart, AlertCircle, Activity } from "lucide-react";

import Link from "next/link";

const HealthyWeightCalculator = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    sex: "male",
    frame: "medium",
    unit: "metric",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const calculateBMI = (weight, height) => {
    // Height in meters for BMI calculation
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const calculateIdealWeightRanges = (height, sex, frame) => {
    // Height in cm, returns weight in kg
    // Using Modified Hamwi Formula
    let baseWeight;
    if (sex === "male") {
      baseWeight = 48 + (height - 152) * 1.1;
    } else {
      baseWeight = 45.4 + (height - 152) * 0.9;
    }

    // Adjust for frame size
    const ranges = {
      small: { min: baseWeight * 0.9, max: baseWeight * 0.95 },
      medium: { min: baseWeight * 0.95, max: baseWeight * 1.05 },
      large: { min: baseWeight * 1.05, max: baseWeight * 1.1 },
    };

    return ranges[frame];
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal weight", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let weight = parseFloat(formData.weight);
    let height = parseFloat(formData.height);

    // Convert imperial to metric if needed
    if (formData.unit === "imperial") {
      weight = weight * 0.453592; // lbs to kg
      height = height * 2.54; // inches to cm
    }

    const bmi = calculateBMI(weight, height);
    const idealRange = calculateIdealWeightRanges(
      height,
      formData.sex,
      formData.frame
    );
    const bmiCategory = getBMICategory(bmi);

    setResult({
      bmi,
      idealRange,
      bmiCategory,
      currentWeight: weight,
      height,
    });
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
          Healthy Weight Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your Body Mass Index (BMI) and discover your ideal weight
          range based on your height, sex, and body frame.
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
                Body Frame Size
              </label>
              {/* <a href="/calculator/period" className="text-sm text-blue-500">
                To know your Frame, click here
              </a> */}

              <select
                name="frame"
                value={formData.frame}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="small">Small Frame</option>
                <option value="medium">Medium Frame</option>
                <option value="large">Large Frame</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Healthy Weight
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-2">
                  <Scale className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold">BMI Score</h3>
                </div>
                <div className="text-4xl font-bold mb-2">
                  {result.bmi.toFixed(1)}
                </div>
                <div
                  className={`text-lg font-medium ${result.bmiCategory.color}`}
                >
                  {result.bmiCategory.category}
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold">Ideal Weight Range</h3>
                </div>
                <div className="text-2xl font-bold mb-2">
                  {Math.round(result.idealRange.min)} -{" "}
                  {Math.round(result.idealRange.max)}{" "}
                  {formData.unit === "metric" ? "kg" : "lbs"}
                </div>
                <div className="text-sm text-gray-600">
                  Based on your height and frame size
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg text-left">
                <div className="flex items-center mb-3">
                  <Info className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold">Understanding Your Results</h3>
                </div>
                <div className="text-sm text-gray-600 space-y-4">
                  <p>BMI Categories:</p>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center text-blue-600">
                      <span className="w-4 h-4 bg-blue-600 rounded-full mr-2"></span>
                      Underweight: Less than 18.5
                    </li>
                    <li className="flex items-center text-green-600">
                      <span className="w-4 h-4 bg-green-600 rounded-full mr-2"></span>
                      Normal weight: 18.5 - 24.9
                    </li>
                    <li className="flex items-center text-yellow-600">
                      <span className="w-4 h-4 bg-yellow-600 rounded-full mr-2"></span>
                      Overweight: 25 - 29.9
                    </li>
                    <li className="flex items-center text-red-600">
                      <span className="w-4 h-4 bg-red-600 rounded-full mr-2"></span>
                      Obese: 30 or greater
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg text-left">
                <div className="flex items-center mb-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  <h3 className="font-semibold">Important Notes</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>
                    • BMI is a general guide and doesn't account for muscle
                    mass, bone density, age, or sex
                  </li>
                  <li>
                    • Athletes may have a high BMI due to muscle mass rather
                    than body fat
                  </li>
                  <li>• Elderly people often have lower BMI requirements</li>
                  <li>
                    • BMI calculations may not be accurate for pregnant women
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg text-left">
                <div className="flex items-center mb-3">
                  <Heart className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold">Health Recommendations</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Maintain a balanced diet rich in nutrients</li>
                  <li>• Engage in regular physical activity</li>
                  <li>• Stay hydrated and get adequate sleep</li>
                  <li>
                    • Consult with healthcare professionals for personalized
                    advice
                  </li>
                  <li>
                    • Monitor your weight regularly but focus on overall health
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthyWeightCalculator;
