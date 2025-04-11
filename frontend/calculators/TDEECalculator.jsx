import React, { useState } from "react";

const TDEECalculator = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    sex: "male",
    unit: "metric",
    activityLevel: "sedentary",
    formula: "mifflin",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const activityMultipliers = {
    sedentary: { value: 1.2, description: "Little or no exercise, desk job" },
    lightlyActive: {
      value: 1.375,
      description: "Light exercise 1-3 times/week",
    },
    moderatelyActive: {
      value: 1.55,
      description: "Moderate exercise 3-5 times/week",
    },
    veryActive: { value: 1.725, description: "Heavy exercise 6-7 times/week" },
    extraActive: {
      value: 1.9,
      description: "Very heavy exercise, physical job or training twice/day",
    },
  };

  const calculateBMR = () => {
    let weight = parseFloat(formData.weight);
    let height = parseFloat(formData.height);

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

  const calculateTDEE = () => {
    const bmr = calculateBMR();
    return bmr * activityMultipliers[formData.activityLevel].value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tdee = calculateTDEE();
    setResult({
      tdee: Math.round(tdee),
      maintenance: {
        low: Math.round(tdee - 100),
        high: Math.round(tdee + 100),
      },
      weightLoss: {
        mild: Math.round(tdee - 300),
        moderate: Math.round(tdee - 500),
        aggressive: Math.round(tdee - 750),
      },
      weightGain: {
        mild: Math.round(tdee + 300),
        moderate: Math.round(tdee + 500),
      },
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
          TDEE Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your Total Daily Energy Expenditure (TDEE) - the total
          number of calories you burn per day based on your BMR and activity
          level.
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
                Activity Level
              </label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="sedentary">Sedentary</option>
                <option value="lightlyActive">Lightly Active</option>
                <option value="moderatelyActive">Moderately Active</option>
                <option value="veryActive">Very Active</option>
                <option value="extraActive">Extra Active</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                {activityMultipliers[formData.activityLevel].description}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate TDEE
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Results
            </h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {result.tdee} calories/day
            </div>
            <p className="text-gray-600">
              This is your Total Daily Energy Expenditure (TDEE)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Maintenance</h3>
              <p className="text-gray-600 mb-2">
                To maintain your current weight, aim for:
              </p>
              <p className="font-medium">
                {result.maintenance.low} - {result.maintenance.high} calories
                per day
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Weight Loss</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Mild loss (-0.3 kg/week):</span>
                  <br />
                  {result.weightLoss.mild} calories/day
                </p>
                <p className="text-sm">
                  <span className="font-medium">
                    Moderate loss (-0.5 kg/week):
                  </span>
                  <br />
                  {result.weightLoss.moderate} calories/day
                </p>
                <p className="text-sm">
                  <span className="font-medium">
                    Aggressive loss (-0.75 kg/week):
                  </span>
                  <br />
                  {result.weightLoss.aggressive} calories/day
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <h3 className="font-semibold mb-3">Weight Gain</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-sm">
                  <span className="font-medium">Mild gain (+0.3 kg/week):</span>
                  <br />
                  {result.weightGain.mild} calories/day
                </p>
                <p className="text-sm">
                  <span className="font-medium">
                    Moderate gain (+0.5 kg/week):
                  </span>
                  <br />
                  {result.weightGain.moderate} calories/day
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Important Note</h3>
            <p className="text-sm text-gray-600">
              These calculations are estimates based on your inputs and activity
              level. Your actual needs may vary based on factors like muscle
              mass, genetics, and specific activities. For best results, use
              this as a starting point and adjust based on your progress over
              time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TDEECalculator;
