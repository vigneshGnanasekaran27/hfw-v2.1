import React, { useState } from "react";

const HeartRateCalculator = () => {
  const [formData, setFormData] = useState({
    age: "",
    restingHR: "",
    isPregnant: false,
    calculationType: "karvonen", // karvonen or simple
    activityLevel: "beginner",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const activityLevels = {
    beginner: {
      label: "Beginner",
      zones: {
        low: { min: 50, max: 60 },
        moderate: { min: 60, max: 70 },
        high: { min: 70, max: 80 },
      },
    },
    intermediate: {
      label: "Intermediate",
      zones: {
        low: { min: 60, max: 70 },
        moderate: { min: 70, max: 80 },
        high: { min: 80, max: 90 },
      },
    },
    advanced: {
      label: "Advanced",
      zones: {
        low: { min: 65, max: 75 },
        moderate: { min: 75, max: 85 },
        high: { min: 85, max: 95 },
      },
    },
  };

  const calculateMaxHR = (age) => {
    return 220 - age;
  };

  const calculateKarvonen = (maxHR, restingHR, intensity) => {
    return Math.round(
      (maxHR - restingHR) * (intensity / 100) + parseInt(restingHR)
    );
  };

  const calculateSimple = (maxHR, intensity) => {
    return Math.round(maxHR * (intensity / 100));
  };

  const calculateHeartRates = () => {
    const maxHR = calculateMaxHR(formData.age);
    const zones = activityLevels[formData.activityLevel].zones;

    let results = {
      maxHR,
      zones: {},
    };

    if (formData.isPregnant) {
      // Pregnancy-specific calculations (generally recommended to stay below 140-150 bpm)
      results.zones = {
        low: { min: 100, max: 120 },
        moderate: { min: 120, max: 140 },
        high: { min: 140, max: 150 },
      };
    } else {
      // Regular exercise zones
      Object.entries(zones).forEach(([zone, { min, max }]) => {
        results.zones[zone] = {
          min:
            formData.calculationType === "karvonen"
              ? calculateKarvonen(maxHR, formData.restingHR, min)
              : calculateSimple(maxHR, min),
          max:
            formData.calculationType === "karvonen"
              ? calculateKarvonen(maxHR, formData.restingHR, max)
              : calculateSimple(maxHR, max),
        };
      });
    }

    return results;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = calculateHeartRates();
    setResult(results);
    setShowResults(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Target Heart Rate Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your target heart rate zones for safe and effective exercise
          based on your age, fitness level, and specific conditions.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calculation Method
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="calculationType"
                    value="simple"
                    checked={formData.calculationType === "simple"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Simple</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="calculationType"
                    value="karvonen"
                    checked={formData.calculationType === "karvonen"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Karvonen</span>
                </label>
              </div>
            </div>

            {formData.calculationType === "karvonen" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resting Heart Rate (bpm)
                </label>
                <input
                  type="number"
                  name="restingHR"
                  value={formData.restingHR}
                  onChange={handleChange}
                  min="40"
                  max="120"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            )}

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
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPregnant"
                  checked={formData.isPregnant}
                  onChange={handleChange}
                  className="text-blue-600 rounded"
                />
                <span className="ml-2">Pregnant</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Heart Rate Zones
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Target Heart Rate Zones
            </h2>
            <p className="text-gray-600">
              Maximum Heart Rate: {result.maxHR} bpm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-green-600">
                Low Intensity
              </h3>
              <p className="text-gray-600 mb-2">Warm-up / Recovery</p>
              <p className="font-medium">
                {result.zones.low.min} - {result.zones.low.max} bpm
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-yellow-600">
                Moderate Intensity
              </h3>
              <p className="text-gray-600 mb-2">Fat Burning / Endurance</p>
              <p className="font-medium">
                {result.zones.moderate.min} - {result.zones.moderate.max} bpm
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-red-600">
                High Intensity
              </h3>
              <p className="text-gray-600 mb-2">
                Cardiovascular / Peak Performance
              </p>
              <p className="font-medium">
                {result.zones.high.min} - {result.zones.high.max} bpm
              </p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Important Notes</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                {formData.isPregnant
                  ? "During pregnancy, it's especially important to monitor your heart rate and not overexert yourself. These zones are generally considered safe, but always consult your healthcare provider about your specific exercise needs."
                  : "These heart rate zones are guidelines based on general formulas. Your actual zones may vary based on fitness level, medications, and other health factors."}
              </p>
              <p>
                {formData.calculationType === "karvonen"
                  ? "The Karvonen formula (Heart Rate Reserve method) typically provides more accurate target zones by accounting for your resting heart rate."
                  : "The Simple calculation method provides general guidelines but may be less precise than the Karvonen method."}
              </p>
              <p>
                Always start gradually and adjust your intensity based on how
                you feel. Stop exercising and consult a healthcare provider if
                you experience chest pain, severe shortness of breath, or
                dizziness.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeartRateCalculator;
