import React, { useState } from "react";

const CalorieCalculator = () => {
  const [formData, setFormData] = useState({
    sex: "male",
    age: "",
    height: "",
    weight: "",
    unit: "metric",
    activityLevel: "sedentary",
    goal: "maintain",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Heavy exercise 6-7 days/week
    veryActive: 1.9, // Very heavy exercise, physical job
  };

  const goalMultipliers = {
    lose: 0.85, // 15% deficit
    maintain: 1,
    gain: 1.15, // 15% surplus
  };

  const calculateCalories = () => {
    let height = parseFloat(formData.height);
    let weight = parseFloat(formData.weight);

    // Convert imperial to metric if needed
    if (formData.unit === "imperial") {
      height = height * 2.54; // inches to cm
      weight = weight * 0.453592; // lbs to kg
    }

    // Mifflin-St Jeor Formula
    const bmr =
      formData.sex === "male"
        ? 10 * weight + 6.25 * height - 5 * parseFloat(formData.age) + 5
        : 10 * weight + 6.25 * height - 5 * parseFloat(formData.age) - 161;

    // Harris-Benedict Formula
    const harrisBenedict =
      formData.sex === "male"
        ? 66.47 +
          13.75 * weight +
          5.003 * height -
          6.755 * parseFloat(formData.age)
        : 655.1 +
          9.563 * weight +
          1.85 * height -
          4.676 * parseFloat(formData.age);

    // Katch-McArdle Formula (using approximate body fat percentage)
    const approximateLeanMass =
      formData.sex === "male"
        ? weight * 0.85 // Assuming ~15% body fat for males
        : weight * 0.75; // Assuming ~25% body fat for females
    const katchMcArdle = 370 + 21.6 * approximateLeanMass;

    // Calculate average BMR
    const avgBMR = (bmr + harrisBenedict + katchMcArdle) / 3;

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = avgBMR * activityMultipliers[formData.activityLevel];

    // Calculate target calories based on goal
    const targetCalories = tdee * goalMultipliers[formData.goal];

    // Calculate macronutrient recommendations
    const protein = weight * (formData.goal === "gain" ? 2.2 : 2); // g/kg
    const fat = (targetCalories * 0.25) / 9; // 25% of calories from fat
    const carbs = (targetCalories - protein * 4 - fat * 9) / 4;

    return {
      bmr: Math.round(avgBMR),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      macros: {
        protein: Math.round(protein),
        fat: Math.round(fat),
        carbs: Math.round(carbs),
      },
      formulas: {
        mifflinStJeor: Math.round(bmr),
        harrisBenedict: Math.round(harrisBenedict),
        katchMcArdle: Math.round(katchMcArdle),
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = calculateCalories();
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
          Daily Calorie Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your daily calorie needs based on your body metrics,
          activity level, and fitness goals.
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
                min="15"
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
                Activity Level
              </label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="sedentary">
                  Sedentary (little or no exercise)
                </option>
                <option value="light">Lightly active (1-3 days/week)</option>
                <option value="moderate">
                  Moderately active (3-5 days/week)
                </option>
                <option value="active">Very active (6-7 days/week)</option>
                <option value="veryActive">
                  Extra active (very active + physical job)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal
              </label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="lose">Weight Loss</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Weight Gain</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Calories
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Daily Calorie Needs
            </h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {result.targetCalories} calories/day
            </div>
            <p className="text-gray-600">
              To{" "}
              {formData.goal === "maintain"
                ? "maintain your current weight"
                : formData.goal === "lose"
                ? "support weight loss"
                : "support weight gain"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">
                Energy Expenditure Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">
                    <span className="font-medium">
                      Basal Metabolic Rate (BMR):
                    </span>
                    <br />
                    {result.bmr} calories/day
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">
                      Total Daily Energy Expenditure:
                    </span>
                    <br />
                    {result.tdee} calories/day
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Activity Multiplier:</span>
                    <br />x{activityMultipliers[formData.activityLevel]}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Goal Adjustment:</span>
                    <br />x{goalMultipliers[formData.goal]}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">
                Recommended Macronutrient Split
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Protein:</span>
                    <br />
                    {result.macros.protein}g (
                    {Math.round(result.macros.protein * 4)} calories)
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Fat:</span>
                    <br />
                    {result.macros.fat}g ({Math.round(result.macros.fat * 9)}{" "}
                    calories)
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Carbohydrates:</span>
                    <br />
                    {result.macros.carbs}g (
                    {Math.round(result.macros.carbs * 4)} calories)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Formula Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <p>
                  <span className="font-medium">Mifflin-St Jeor:</span>
                  <br />
                  {result.formulas.mifflinStJeor} calories
                </p>
                <p>
                  <span className="font-medium">Harris-Benedict:</span>
                  <br />
                  {result.formulas.harrisBenedict} calories
                </p>
                <p>
                  <span className="font-medium">Katch-McArdle:</span>
                  <br />
                  {result.formulas.katchMcArdle} calories
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Important Note</h3>
              <p className="text-sm text-gray-600">
                These calculations provide estimates based on averages and
                general formulas. Your actual calorie needs may vary based on
                factors like muscle mass, genetics, medical conditions, and
                specific activities. For personalized advice, consult with a
                registered dietitian or healthcare provider.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
