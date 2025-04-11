import React, { useState } from "react";

const PregnancyWeightCalculator = () => {
  const [formData, setFormData] = useState({
    prePregnancyWeight: "",
    height: "",
    currentWeight: "",
    weekOfPregnancy: "",
    multiplePregnancy: "single",
    unit: "metric",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const calculateBMI = (weight, height, unit) => {
    if (unit === "metric") {
      return weight / (height / 100) ** 2;
    } else {
      return (weight * 703) / height ** 2;
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "underweight";
    if (bmi < 25) return "normal";
    if (bmi < 30) return "overweight";
    return "obese";
  };

  const getRecommendedGain = (bmiCategory, isMultiple) => {
    const ranges = {
      single: {
        underweight: { min: 12.5, max: 18 },
        normal: { min: 11.5, max: 16 },
        overweight: { min: 7, max: 11.5 },
        obese: { min: 5, max: 9 },
      },
      multiple: {
        underweight: { min: 22.5, max: 28 },
        normal: { min: 17, max: 25 },
        overweight: { min: 14, max: 23 },
        obese: { min: 11, max: 19 },
      },
    };

    return ranges[isMultiple ? "multiple" : "single"][bmiCategory];
  };

  const calculateWeightGain = () => {
    let weight = parseFloat(formData.prePregnancyWeight);
    let height = parseFloat(formData.height);
    let currentWeight = parseFloat(formData.currentWeight);

    if (formData.unit === "imperial") {
      // Convert to metric for internal calculations
      weight = weight * 0.453592; // lbs to kg
      height = height * 2.54; // inches to cm
      currentWeight = currentWeight * 0.453592; // lbs to kg
    }

    const bmi = calculateBMI(weight, height, "metric");
    const bmiCategory = getBMICategory(bmi);
    const recommendedGain = getRecommendedGain(
      bmiCategory,
      formData.multiplePregnancy === "multiple"
    );

    const currentGain = currentWeight - weight;
    const weeklyGain = currentGain / formData.weekOfPregnancy;

    // Expected gain by current week (approximately)
    const expectedGainByNow =
      formData.weekOfPregnancy <= 12
        ? 1.5 // First trimester total gain
        : 1.5 + (formData.weekOfPregnancy - 12) * (recommendedGain.min / 28); // Adding weekly gain after first trimester

    // Convert gains back to imperial if needed
    const convertGain = (gain) =>
      formData.unit === "imperial" ? gain * 2.20462 : gain;

    return {
      bmi: bmi.toFixed(1),
      bmiCategory,
      recommendedTotal: {
        min: convertGain(recommendedGain.min),
        max: convertGain(recommendedGain.max),
      },
      currentGain: convertGain(currentGain),
      weeklyGain: convertGain(weeklyGain),
      expectedGainByNow: convertGain(expectedGainByNow),
      unit: formData.unit,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = calculateWeightGain();
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
          Pregnancy Weight Gain Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your recommended pregnancy weight gain based on your
          pre-pregnancy BMI and track your progress throughout your pregnancy.
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
                  <span className="ml-2">Metric (kg/cm)</span>
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
                  <span className="ml-2">Imperial (lbs/in)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pregnancy Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="multiplePregnancy"
                    value="single"
                    checked={formData.multiplePregnancy === "single"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Single</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="multiplePregnancy"
                    value="multiple"
                    checked={formData.multiplePregnancy === "multiple"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Multiple</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pre-Pregnancy Weight (
                {formData.unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                name="prePregnancyWeight"
                value={formData.prePregnancyWeight}
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
                Current Weight ({formData.unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                name="currentWeight"
                value={formData.currentWeight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Week of Pregnancy
              </label>
              <input
                type="number"
                name="weekOfPregnancy"
                value={formData.weekOfPregnancy}
                onChange={handleChange}
                min="1"
                max="42"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Weight Gain
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Weight Gain Analysis
            </h2>
            <p className="text-gray-600">
              Pre-pregnancy BMI: {result.bmi} ({result.bmiCategory})
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Recommended Weight Gain</h3>
              <p className="text-gray-600 mb-2">
                Total recommended gain for your pregnancy:
              </p>
              <p className="font-medium">
                {result.recommendedTotal.min.toFixed(1)} -{" "}
                {result.recommendedTotal.max.toFixed(1)}{" "}
                {result.unit === "metric" ? "kg" : "lbs"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Current Progress</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Total gain so far:</span>
                  <br />
                  {result.currentGain.toFixed(1)}{" "}
                  {result.unit === "metric" ? "kg" : "lbs"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Average weekly gain:</span>
                  <br />
                  {result.weeklyGain.toFixed(1)}{" "}
                  {result.unit === "metric" ? "kg" : "lbs"}/week
                </p>
                <p className="text-sm">
                  <span className="font-medium">Expected gain by now:</span>
                  <br />
                  {result.expectedGainByNow.toFixed(1)}{" "}
                  {result.unit === "metric" ? "kg" : "lbs"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Important Note</h3>
            <p className="text-sm text-gray-600">
              These calculations are based on general guidelines from health
              organizations. Every pregnancy is unique, and your recommended
              weight gain may differ based on individual factors. Always consult
              with your healthcare provider for personalized recommendations and
              concerns about weight gain during pregnancy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PregnancyWeightCalculator;
