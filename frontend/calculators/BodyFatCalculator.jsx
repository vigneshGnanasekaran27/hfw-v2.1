import React, { useState } from "react";

const BodyFatCalculator = () => {
  const [formData, setFormData] = useState({
    sex: "male",
    age: "",
    height: "",
    weight: "",
    neck: "",
    waist: "",
    hip: "", // Only for females
    unit: "metric",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const calculateBodyFat = () => {
    let height = parseFloat(formData.height);
    let weight = parseFloat(formData.weight);
    let neck = parseFloat(formData.neck);
    let waist = parseFloat(formData.waist);
    let hip = parseFloat(formData.hip);

    // Convert imperial to metric if needed
    if (formData.unit === "imperial") {
      height = height * 2.54; // inches to cm
      weight = weight * 0.453592; // lbs to kg
      neck = neck * 2.54;
      waist = waist * 2.54;
      if (formData.sex === "female") {
        hip = hip * 2.54;
      }
    }

    // U.S. Navy Method
    let bodyFat;
    if (formData.sex === "male") {
      bodyFat =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450;
    } else {
      bodyFat =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + hip - neck) +
            0.221 * Math.log10(height)) -
        450;
    }

    // BMI Calculation
    const bmi = weight / Math.pow(height / 100, 2);

    // Calculate lean mass and fat mass
    const fatMass = (weight * bodyFat) / 100;
    const leanMass = weight - fatMass;

    // Convert back to imperial if needed
    if (formData.unit === "imperial") {
      weight = weight / 0.453592;
      fatMass = fatMass / 0.453592;
      leanMass = leanMass / 0.453592;
    }

    return {
      bodyFatPercentage: Math.round(bodyFat * 10) / 10,
      bmi: Math.round(bmi * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      leanMass: Math.round(leanMass * 10) / 10,
      category: getBodyFatCategory(bodyFat, formData.sex),
    };
  };

  const getBodyFatCategory = (bodyFat, sex) => {
    if (sex === "male") {
      if (bodyFat < 6) return "Essential Fat";
      if (bodyFat < 14) return "Athletes";
      if (bodyFat < 18) return "Fitness";
      if (bodyFat < 25) return "Average";
      return "Above Average";
    } else {
      if (bodyFat < 14) return "Essential Fat";
      if (bodyFat < 21) return "Athletes";
      if (bodyFat < 25) return "Fitness";
      if (bodyFat < 32) return "Average";
      return "Above Average";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = calculateBodyFat();
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
          Body Fat Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your body fat percentage using the U.S. Navy method, which
          uses circumference measurements and height to estimate body
          composition.
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
                Age (years)
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="18"
                max="120"
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
                min="1"
              />
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Neck Circumference (
                {formData.unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                name="neck"
                value={formData.neck}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waist Circumference (
                {formData.unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                name="waist"
                value={formData.waist}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="1"
              />
            </div>

            {formData.sex === "female" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hip Circumference (
                  {formData.unit === "metric" ? "cm" : "inches"})
                </label>
                <input
                  type="number"
                  name="hip"
                  value={formData.hip}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  min="1"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Body Fat
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Body Composition Results
            </h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {result.bodyFatPercentage}% Body Fat
            </div>
            <p className="text-gray-600">Category: {result.category}</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Detailed Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">
                    <span className="font-medium">BMI:</span>
                    <br />
                    {result.bmi}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Fat Mass:</span>
                    <br />
                    {result.fatMass} {formData.unit === "metric" ? "kg" : "lbs"}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Lean Mass:</span>
                    <br />
                    {result.leanMass}{" "}
                    {formData.unit === "metric" ? "kg" : "lbs"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">
                Body Fat Categories for{" "}
                {formData.sex === "male" ? "Men" : "Women"}
              </h3>
              <div className="space-y-2">
                {formData.sex === "male" ? (
                  <>
                    <p>
                      <span className="font-medium">Essential Fat:</span> 2-5%
                    </p>
                    <p>
                      <span className="font-medium">Athletes:</span> 6-13%
                    </p>
                    <p>
                      <span className="font-medium">Fitness:</span> 14-17%
                    </p>
                    <p>
                      <span className="font-medium">Average:</span> 18-24%
                    </p>
                    <p>
                      <span className="font-medium">Above Average:</span> 25%+
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="font-medium">Essential Fat:</span> 10-13%
                    </p>
                    <p>
                      <span className="font-medium">Athletes:</span> 14-20%
                    </p>
                    <p>
                      <span className="font-medium">Fitness:</span> 21-24%
                    </p>
                    <p>
                      <span className="font-medium">Average:</span> 25-31%
                    </p>
                    <p>
                      <span className="font-medium">Above Average:</span> 32%+
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Important Note</h3>
              <p className="text-sm text-gray-600">
                This calculator uses the U.S. Navy method for estimating body
                fat percentage. While this method is widely used, it's not as
                accurate as methods like DEXA scans or hydrostatic weighing. For
                the most accurate results, consult with a fitness professional
                or healthcare provider who can perform more precise
                measurements.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyFatCalculator;
