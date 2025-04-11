import React, { useState } from "react";

const BMICalculator = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    unit: "metric",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5)
      return {
        category: "Underweight",
        color: "text-yellow-600",
        range: "< 18.5",
        description:
          "May indicate insufficient weight. Consider consulting a healthcare provider.",
      };
    if (bmi < 25)
      return {
        category: "Normal Weight",
        color: "text-green-600",
        range: "18.5 - 24.9",
        description: "Generally considered healthy for most adults.",
      };
    if (bmi < 30)
      return {
        category: "Overweight",
        color: "text-yellow-600",
        range: "25 - 29.9",
        description:
          "May indicate excess weight. Consider lifestyle modifications.",
      };
    return {
      category: "Obese",
      color: "text-red-600",
      range: "≥ 30",
      description:
        "May indicate significantly excess weight. Consider consulting a healthcare provider.",
    };
  };

  const calculateBMI = () => {
    let weight = parseFloat(formData.weight);
    let height = parseFloat(formData.height);

    if (formData.unit === "imperial") {
      // Convert pounds to kg and inches to meters
      weight = weight * 0.453592;
      height = height * 0.0254;
    } else {
      // Convert cm to meters
      height = height / 100;
    }

    const bmi = weight / (height * height);
    return bmi;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmi = calculateBMI();
    const category = getBMICategory(bmi);
    setResult({
      bmi: bmi.toFixed(1),
      ...category,
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
          BMI Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your Body Mass Index (BMI) - a measure of body fat based on
          height and weight that applies to adult men and women.
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
                Weight ({formData.unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="1"
                step="0.1"
              />
            </div>

            <div className="md:col-span-2">
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
                step="0.1"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate BMI
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Results
            </h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {result.bmi}
            </div>
            <div className={`text-xl font-semibold ${result.color} mb-2`}>
              {result.category}
            </div>
            <p className="text-gray-600">BMI Range: {result.range}</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What This Means</h3>
              <p className="text-gray-600">{result.description}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">BMI Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-yellow-600">
                      Underweight:
                    </span>{" "}
                    Below 18.5
                  </p>
                  <p>
                    <span className="font-medium text-green-600">
                      Normal weight:
                    </span>{" "}
                    18.5 - 24.9
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-yellow-600">
                      Overweight:
                    </span>{" "}
                    25 - 29.9
                  </p>
                  <p>
                    <span className="font-medium text-red-600">Obese:</span> 30
                    or greater
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Important Note</h3>
              <p className="text-sm text-gray-600">
                BMI is a general indicator and doesn't account for factors like
                muscle mass, bone density, age, sex, ethnicity, and overall body
                composition. For a more accurate assessment of your health
                status, consult with a healthcare provider.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
