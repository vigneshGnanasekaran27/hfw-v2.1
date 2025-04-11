import React, { useState } from "react";

const LeanBodyMassCalculator = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "male",
    weightUnit: "kg",
    heightUnit: "cm",
    formula: "boer",
    bodyFat: "",
    waist: "",
    hip: "",
    neck: "",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const formulas = {
    boer: {
      name: "Boer Formula",
      description: "Simple and widely used formula based on height and weight",
      male: (weight, height) => 0.407 * weight + 0.267 * height - 19.2,
      female: (weight, height) => 0.252 * weight + 0.473 * height - 48.3,
    },
    james: {
      name: "James Formula",
      description: "Considered accurate across different body types",
      male: (weight, height) =>
        1.1 * weight - 128 * Math.pow(weight / height, 2),
      female: (weight, height) =>
        1.07 * weight - 148 * Math.pow(weight / height, 2),
    },
    hume: {
      name: "Hume Formula",
      description: "Good for people with average build",
      male: (weight, height) => 0.3281 * weight + 0.33929 * height - 29.5336,
      female: (weight, height) => 0.29569 * weight + 0.41813 * height - 43.2933,
    },
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const calculateBodyFatNavy = (waist, hip, neck, height, gender) => {
    if (gender === "male") {
      return (
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450
      );
    }
    return (
      495 /
        (1.29579 -
          0.35004 * Math.log10(waist + hip - neck) +
          0.221 * Math.log10(height)) -
      450
    );
  };

  const getHealthyRange = (height, gender) => {
    const minBMI = 18.5;
    const maxBMI = 24.9;
    const heightInMeters = height / 100;

    return {
      min: (minBMI * heightInMeters * heightInMeters).toFixed(1),
      max: (maxBMI * heightInMeters * heightInMeters).toFixed(1),
    };
  };

  const convertWeight = (value, from, to) => {
    if (from === to) return value;
    if (from === "lbs" && to === "kg") return value * 0.453592;
    if (from === "kg" && to === "lbs") return value * 2.20462;
    return value;
  };

  const convertHeight = (value, from, to) => {
    if (from === to) return value;
    if (from === "in" && to === "cm") return value * 2.54;
    if (from === "cm" && to === "in") return value * 0.393701;
    return value;
  };

  const calculateResults = () => {
    const weight = convertWeight(
      parseFloat(formData.weight),
      formData.weightUnit,
      "kg"
    );
    const height = convertHeight(
      parseFloat(formData.height),
      formData.heightUnit,
      "cm"
    );
    const formula = formulas[formData.formula];
    const gender = formData.gender;

    const lbm = formula[gender](weight, height);
    const bmi = calculateBMI(weight, height);
    const bodyFat =
      formData.waist && formData.neck
        ? calculateBodyFatNavy(
            parseFloat(formData.waist),
            parseFloat(formData.hip || 0),
            parseFloat(formData.neck),
            height,
            gender
          )
        : parseFloat(formData.bodyFat) || 0;

    const healthyRange = getHealthyRange(height, gender);

    return {
      lbm,
      bmi,
      bodyFat,
      totalWeight: weight,
      fatMass: weight - lbm,
      healthyRange,
      height,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = calculateResults();
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
          Lean Body Mass Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your lean body mass and body composition metrics using
          various scientific formulas.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight
              </label>
              <div className="flex">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="20"
                  max="300"
                  step="0.1"
                  className="mt-1 block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <select
                  name="weightUnit"
                  value={formData.weightUnit}
                  onChange={handleChange}
                  className="mt-1 block rounded-r-md border-l-0 border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height
              </label>
              <div className="flex">
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  min="100"
                  max="250"
                  step="0.1"
                  className="mt-1 block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <select
                  name="heightUnit"
                  value={formData.heightUnit}
                  onChange={handleChange}
                  className="mt-1 block rounded-r-md border-l-0 border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="cm">cm</option>
                  <option value="in">inches</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="15"
                max="100"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
                {Object.entries(formulas).map(([key, { name }]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                {formulas[formData.formula].description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Fat % (optional)
              </label>
              <input
                type="number"
                name="bodyFat"
                value={formData.bodyFat}
                onChange={handleChange}
                min="1"
                max="60"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Navy Method Measurements (optional, for body fat estimation)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Waist (cm)
                  </label>
                  <input
                    type="number"
                    name="waist"
                    value={formData.waist}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {formData.gender === "female" && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Hip (cm)
                    </label>
                    <input
                      type="number"
                      name="hip"
                      value={formData.hip}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Neck (cm)
                  </label>
                  <input
                    type="number"
                    name="neck"
                    value={formData.neck}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Lean Body Mass
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Body Composition Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">Lean Body Mass</div>
              <div className="text-2xl font-bold text-blue-600">
                {result.lbm.toFixed(1)} kg
              </div>
              <div className="text-sm text-gray-500 mt-1">
                ({(result.lbm * 2.20462).toFixed(1)} lbs)
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">Body Fat Mass</div>
              <div className="text-2xl font-bold text-blue-600">
                {result.fatMass.toFixed(1)} kg
              </div>
              <div className="text-sm text-gray-500 mt-1">
                ({(result.fatMass * 2.20462).toFixed(1)} lbs)
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">
                Body Fat Percentage
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {((result.fatMass / result.totalWeight) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Body Mass Index (BMI)</h3>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {result.bmi.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">
                Healthy BMI range: 18.5 - 24.9
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Healthy Weight Range</h3>
              <div className="text-lg font-medium">
                {result.healthyRange.min} - {result.healthyRange.max} kg
              </div>
              <div className="text-sm text-gray-600">
                Based on your height of {result.height} cm
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-4">Body Composition Analysis</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Composition Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Lean Mass Percentage:</span>
                      <span className="font-medium">
                        {(
                          100 -
                          (result.fatMass / result.totalWeight) * 100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fat Mass Percentage:</span>
                      <span className="font-medium">
                        {((result.fatMass / result.totalWeight) * 100).toFixed(
                          1
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Weight:</span>
                      <span className="font-medium">
                        {result.totalWeight.toFixed(1)} kg
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Ideal Body Fat Ranges</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Essential Fat:</span>
                      <span>
                        {formData.gender === "male" ? "2-5%" : "10-13%"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Athletes:</span>
                      <span>
                        {formData.gender === "male" ? "6-13%" : "14-20%"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fitness:</span>
                      <span>
                        {formData.gender === "male" ? "14-17%" : "21-24%"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acceptable:</span>
                      <span>
                        {formData.gender === "male" ? "18-24%" : "25-31%"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-4">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-medium mb-3">Nutrition Tips</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Protein Intake: {Math.round(result.lbm * 2.2)} -{" "}
                      {Math.round(result.lbm * 2.75)}g daily
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Maintain adequate hydration:{" "}
                      {Math.round(result.totalWeight * 0.033)}L daily minimum
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Focus on whole foods and balanced macronutrients
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Time meals around workouts for optimal recovery</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-medium mb-3">Training Suggestions</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Include both resistance training and cardiovascular
                      exercise
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Focus on compound movements for maximum muscle engagement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Maintain progressive overload for continued adaptation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Allow adequate recovery between training sessions
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Additional Information</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                Your lean body mass calculation was performed using the{" "}
                {formulas[formData.formula].name}. This formula is{" "}
                {formulas[formData.formula].description}.
              </p>
              <p>
                Lean body mass includes muscles, bones, organs, and other
                non-fat tissues. This measurement is crucial for determining
                nutritional needs and tracking fitness progress.
              </p>
              <p>
                Regular monitoring of body composition can help ensure that
                weight changes are healthy, whether the goal is muscle gain or
                fat loss.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeanBodyMassCalculator;
