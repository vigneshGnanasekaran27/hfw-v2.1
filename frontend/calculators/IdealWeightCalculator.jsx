import React, { useState } from "react";
import Link from "next/link";

const IdealWeightCalculator = () => {
  const [formData, setFormData] = useState({
    height: "",
    sex: "male",
    unit: "metric",
    frame: "medium",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const calculateIdealWeight = () => {
    let height = parseFloat(formData.height);
    if (formData.unit === "imperial") {
      height = height * 2.54; // Convert inches to cm
    }

    // Different formulas for ideal weight calculation
    const weights = {
      // Robinson formula (1983)
      robinson:
        formData.sex === "male"
          ? 52 + 1.9 * ((height - 152.4) / 2.54)
          : 49 + 1.7 * ((height - 152.4) / 2.54),

      // Miller formula (1983)
      miller:
        formData.sex === "male"
          ? 56.2 + 1.41 * ((height - 152.4) / 2.54)
          : 53.1 + 1.36 * ((height - 152.4) / 2.54),

      // Devine formula (1974)
      devine:
        formData.sex === "male"
          ? 50 + 2.3 * ((height - 152.4) / 2.54)
          : 45.5 + 2.3 * ((height - 152.4) / 2.54),

      // Hamwi formula (1964)
      hamwi:
        formData.sex === "male"
          ? 48 + 2.7 * ((height - 152.4) / 2.54)
          : 45.5 + 2.2 * ((height - 152.4) / 2.54),
    };

    // Calculate range based on frame size
    const baseWeight =
      (weights.robinson + weights.miller + weights.devine + weights.hamwi) / 4;
    let range = {
      min: baseWeight,
      max: baseWeight,
    };

    switch (formData.frame) {
      case "small":
        range.min = baseWeight - baseWeight * 0.1;
        range.max = baseWeight;
        break;
      case "large":
        range.min = baseWeight;
        range.max = baseWeight + baseWeight * 0.1;
        break;
      default: // medium
        range.min = baseWeight - baseWeight * 0.05;
        range.max = baseWeight + baseWeight * 0.05;
    }

    // Convert back to imperial if needed
    if (formData.unit === "imperial") {
      weights.robinson /= 0.453592;
      weights.miller /= 0.453592;
      weights.devine /= 0.453592;
      weights.hamwi /= 0.453592;
      range.min /= 0.453592;
      range.max /= 0.453592;
    }

    return {
      formulas: {
        robinson: Math.round(weights.robinson * 10) / 10,
        miller: Math.round(weights.miller * 10) / 10,
        devine: Math.round(weights.devine * 10) / 10,
        hamwi: Math.round(weights.hamwi * 10) / 10,
      },
      range: {
        min: Math.round(range.min * 10) / 10,
        max: Math.round(range.max * 10) / 10,
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = calculateIdealWeight();
    setResult(results);
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
          Ideal Weight Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your ideal weight range based on your height, sex, and body
          frame using multiple scientific formulas.
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
                Height ({formData.unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Frame
              </label>
              <Link
                href="/calculator/period"
                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                Read More
              </Link>
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
              Calculate Ideal Weight
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Ideal Weight Range
            </h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {result.range.min} - {result.range.max}{" "}
              {formData.unit === "metric" ? "kg" : "lbs"}
            </div>
            <p className="text-gray-600">
              Based on your height, sex, and {formData.frame} frame
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Formula Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Robinson Formula:</span>
                    <br />
                    {result.formulas.robinson}{" "}
                    {formData.unit === "metric" ? "kg" : "lbs"}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Miller Formula:</span>
                    <br />
                    {result.formulas.miller}{" "}
                    {formData.unit === "metric" ? "kg" : "lbs"}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Devine Formula:</span>
                    <br />
                    {result.formulas.devine}{" "}
                    {formData.unit === "metric" ? "kg" : "lbs"}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Hamwi Formula:</span>
                    <br />
                    {result.formulas.hamwi}{" "}
                    {formData.unit === "metric" ? "kg" : "lbs"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">About Body Frame Sizes</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Small Frame:</span> Typically
                  results in a weight range below the average.
                </p>
                <p>
                  <span className="font-medium">Medium Frame:</span> Represents
                  the average build for your height.
                </p>
                <p>
                  <span className="font-medium">Large Frame:</span> Accounts for
                  a naturally larger bone structure.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Important Note</h3>
              <p className="text-sm text-gray-600">
                These calculations provide general guidelines and may not
                account for factors like muscle mass, age, overall body
                composition, and other health conditions. For personalized
                advice, consult with a healthcare provider or registered
                dietitian.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdealWeightCalculator;
