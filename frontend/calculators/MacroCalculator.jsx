import React, { useState } from "react";

const MacroCalculator = () => {
  const [formData, setFormData] = useState({
    sex: "male",
    age: "",
    height: "",
    weight: "",
    unit: "metric",
    activityLevel: "moderate",
    goal: "maintain",
    mealCount: "3",
    proteinPreference: "moderate",
    fatPreference: "moderate",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const goalMultipliers = {
    lose: {
      calories: 0.85,
      protein: 2.2, // g/kg
      fat: 0.35, // % of calories
    },
    maintain: {
      calories: 1,
      protein: 2.0,
      fat: 0.3,
    },
    gain: {
      calories: 1.15,
      protein: 2.4,
      fat: 0.25,
    },
  };

  const calculateMacros = () => {
    let height = parseFloat(formData.height);
    let weight = parseFloat(formData.weight);

    // Convert imperial to metric if needed
    if (formData.unit === "imperial") {
      height = height * 2.54; // inches to cm
      weight = weight * 0.453592; // lbs to kg
    }

    // Calculate BMR using Mifflin-St Jeor Formula
    const bmr =
      formData.sex === "male"
        ? 10 * weight + 6.25 * height - 5 * parseFloat(formData.age) + 5
        : 10 * weight + 6.25 * height - 5 * parseFloat(formData.age) - 161;

    // Calculate TDEE
    const tdee = bmr * activityMultipliers[formData.activityLevel];

    // Calculate target calories based on goal
    const targetCalories = tdee * goalMultipliers[formData.goal].calories;

    // Calculate protein needs
    let proteinMultiplier = goalMultipliers[formData.goal].protein;
    if (formData.proteinPreference === "low") proteinMultiplier *= 0.8;
    if (formData.proteinPreference === "high") proteinMultiplier *= 1.2;

    const proteinGrams = weight * proteinMultiplier;
    const proteinCalories = proteinGrams * 4;

    // Calculate fat needs
    let fatPercentage = goalMultipliers[formData.goal].fat;
    if (formData.fatPreference === "low") fatPercentage *= 0.8;
    if (formData.fatPreference === "high") fatPercentage *= 1.2;

    const fatCalories = targetCalories * fatPercentage;
    const fatGrams = fatCalories / 9;

    // Calculate remaining calories for carbs
    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = carbCalories / 4;

    // Calculate per-meal breakdown
    const mealsPerDay = parseInt(formData.mealCount);
    const perMeal = {
      calories: targetCalories / mealsPerDay,
      protein: proteinGrams / mealsPerDay,
      fat: fatGrams / mealsPerDay,
      carbs: carbGrams / mealsPerDay,
    };

    return {
      totalCalories: Math.round(targetCalories),
      macros: {
        protein: Math.round(proteinGrams),
        fat: Math.round(fatGrams),
        carbs: Math.round(carbGrams),
      },
      percentages: {
        protein: Math.round((proteinCalories / targetCalories) * 100),
        fat: Math.round((fatCalories / targetCalories) * 100),
        carbs: Math.round((carbCalories / targetCalories) * 100),
      },
      perMeal: {
        calories: Math.round(perMeal.calories),
        protein: Math.round(perMeal.protein),
        fat: Math.round(perMeal.fat),
        carbs: Math.round(perMeal.carbs),
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = calculateMacros();
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
          Macro Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your personalized macronutrient ratios based on your body
          metrics, activity level, and fitness goals.
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meals per Day
              </label>
              <select
                name="mealCount"
                value={formData.mealCount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="3">3 meals</option>
                <option value="4">4 meals</option>
                <option value="5">5 meals</option>
                <option value="6">6 meals</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Protein Preference
              </label>
              <select
                name="proteinPreference"
                value={formData.proteinPreference}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="low">Lower Protein</option>
                <option value="moderate">Moderate Protein</option>
                <option value="high">Higher Protein</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fat Preference
              </label>
              <select
                name="fatPreference"
                value={formData.fatPreference}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="low">Lower Fat</option>
                <option value="moderate">Moderate Fat</option>
                <option value="high">Higher Fat</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Macros
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Daily Macronutrient Targets
            </h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {result.totalCalories} calories/day
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">
                Daily Macronutrient Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">Protein</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {result.macros.protein}g
                  </p>
                  <p className="text-sm text-gray-600">
                    {result.percentages.protein}% of total calories
                  </p>
                </div>
                <div>
                  <p className="font-medium">Carbohydrates</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {result.macros.carbs}g
                  </p>
                  <p className="text-sm text-gray-600">
                    {result.percentages.carbs}% of total calories
                  </p>
                </div>
                <div>
                  <p className="font-medium">Fat</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {result.macros.fat}g
                  </p>
                  <p className="text-sm text-gray-600">
                    {result.percentages.fat}% of total calories
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">
                Per Meal Breakdown ({formData.mealCount} meals/day)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-medium">Calories</p>
                  <p className="text-xl font-bold text-blue-600">
                    {result.perMeal.calories}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Protein</p>
                  <p className="text-xl font-bold text-blue-600">
                    {result.perMeal.protein}g
                  </p>
                </div>
                <div>
                  <p className="font-medium">Carbohydrates</p>
                  <p className="text-xl font-bold text-blue-600">
                    {result.perMeal.carbs}g
                  </p>
                </div>
                <div>
                  <p className="font-medium">Fat</p>
                  <p className="text-xl font-bold text-blue-600">
                    {result.perMeal.fat}g
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <h3 className="font-semibold mb-3">
                Macro Distribution Guidelines
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Protein:</span>{" "}
                  {result.percentages.protein}% of total calories
                  {formData.proteinPreference === "high"
                    ? " (High protein for muscle gain/preservation)"
                    : formData.proteinPreference === "low"
                    ? " (Lower protein for general health)"
                    : " (Moderate protein for balanced nutrition)"}
                </p>
                <p>
                  <span className="font-medium">Carbohydrates:</span>{" "}
                  {result.percentages.carbs}% of total calories (Adjusted based
                  on protein and fat preferences)
                </p>
                <p>
                  <span className="font-medium">Fat:</span>{" "}
                  {result.percentages.fat}% of total calories
                  {formData.fatPreference === "high"
                    ? " (Higher fat for hormone support)"
                    : formData.fatPreference === "low"
                    ? " (Lower fat for calorie management)"
                    : " (Moderate fat for balanced nutrition)"}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <h3 className="font-semibold mb-2">Food Sources Suggestions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium mb-2">Protein Sources</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Lean meats (chicken, turkey)</li>
                    <li>• Fish (salmon, tuna)</li>
                    <li>• Eggs and egg whites</li>
                    <li>• Greek yogurt</li>
                    <li>• Legumes and beans</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Carbohydrate Sources</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Whole grain breads</li>
                    <li>• Brown rice and quinoa</li>
                    <li>• Sweet potatoes</li>
                    <li>• Fruits</li>
                    <li>• Vegetables</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Healthy Fat Sources</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Avocados</li>
                    <li>• Nuts and seeds</li>
                    <li>• Olive oil</li>
                    <li>• Fatty fish</li>
                    <li>• Nut butters</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <h3 className="font-semibold mb-2">Important Note</h3>
              <p className="text-sm text-gray-600">
                These calculations provide estimates based on general guidelines
                and your preferences. Actual needs may vary based on factors
                like muscle mass, genetics, and specific training goals. For
                personalized advice, consult with a registered dietitian. Track
                your progress and adjust macros based on your results and how
                you feel.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MacroCalculator;
