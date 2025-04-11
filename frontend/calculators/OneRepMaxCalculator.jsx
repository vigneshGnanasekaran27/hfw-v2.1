import React, { useState } from "react";

const OneRepMaxCalculator = () => {
  const [formData, setFormData] = useState({
    weight: "",
    reps: "",
    unit: "kg",
    formula: "brzycki",
    exerciseType: "bench_press",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const exercises = {
    bench_press: {
      name: "Bench Press",
      category: "Push",
      primaryMuscles: ["Chest", "Triceps", "Front Deltoids"],
      recommendedReps: "1-12",
      safetyNotes:
        "Always use a spotter for heavy bench press attempts. Keep shoulders retracted and maintain arch.",
      progressionTips:
        "Include variations like incline, decline, and close-grip to develop overall pressing strength.",
    },
    squat: {
      name: "Squat",
      category: "Legs",
      primaryMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
      recommendedReps: "1-10",
      safetyNotes:
        "Maintain proper depth and knee alignment. Use safety pins in the power rack.",
      progressionTips:
        "Focus on depth consistency and incorporate front squats and pause squats for development.",
    },
    deadlift: {
      name: "Deadlift",
      category: "Pull",
      primaryMuscles: ["Lower Back", "Hamstrings", "Glutes"],
      recommendedReps: "1-8",
      safetyNotes:
        "Maintain neutral spine. Start with perfect form at lower weights.",
      progressionTips:
        "Use variations like deficit deadlifts and Romanian deadlifts to address weaknesses.",
    },
    overhead_press: {
      name: "Overhead Press",
      category: "Push",
      primaryMuscles: ["Shoulders", "Triceps", "Upper Chest"],
      recommendedReps: "1-10",
      safetyNotes:
        "Clear space overhead. Maintain tight core and avoid excessive back arch.",
      progressionTips:
        "Include push press and behind-the-neck press variations for shoulder development.",
    },
    barbell_row: {
      name: "Barbell Row",
      category: "Pull",
      primaryMuscles: ["Upper Back", "Lats", "Biceps"],
      recommendedReps: "3-12",
      safetyNotes:
        "Keep back straight and core tight. Control the weight throughout.",
      progressionTips:
        "Vary grip width and try Pendlay rows for explosive strength.",
    },
  };

  const formulas = {
    brzycki: {
      name: "Brzycki",
      calculate: (weight, reps) => weight * (36 / (37 - reps)),
      maxReps: 36,
      description: "Widely used and accurate up to about 10 reps",
    },
    epley: {
      name: "Epley",
      calculate: (weight, reps) => weight * (1 + 0.0333 * reps),
      maxReps: 30,
      description:
        "Generally considered accurate across a wide range of repetitions",
    },
    lander: {
      name: "Lander",
      calculate: (weight, reps) => (100 * weight) / (101.3 - 2.67123 * reps),
      maxReps: 30,
      description: "Known for accuracy in both low and high rep ranges",
    },
    lombardi: {
      name: "Lombardi",
      calculate: (weight, reps) => weight * Math.pow(reps, 0.1),
      maxReps: 50,
      description: "Simple formula that works well for moderate rep ranges",
    },
  };

  const calculatePercentages = (oneRM) => {
    const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
    return percentages.map((percentage) => ({
      percentage,
      weight: Math.round(oneRM * (percentage / 100) * 2) / 2,
    }));
  };

  const calculateRepRanges = (percentage) => {
    if (percentage >= 95) return "1-2";
    if (percentage >= 90) return "3-4";
    if (percentage >= 85) return "5-6";
    if (percentage >= 80) return "7-8";
    if (percentage >= 75) return "8-10";
    if (percentage >= 70) return "10-12";
    if (percentage >= 65) return "12-15";
    return "15+";
  };

  const calculateResults = () => {
    const weight = parseFloat(formData.weight);
    const reps = parseInt(formData.reps);
    const formula = formulas[formData.formula];

    const oneRM = Math.round(formula.calculate(weight, reps) * 2) / 2;
    const percentages = calculatePercentages(oneRM);

    return {
      oneRM,
      percentages,
      formula: formula.name,
      exercise: exercises[formData.exerciseType],
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
          Exercise-Specific 1RM Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your estimated one rep max (1RM) and get exercise-specific
          recommendations based on your performance.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exercise
              </label>
              <select
                name="exerciseType"
                value={formData.exerciseType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {Object.entries(exercises).map(([key, { name, category }]) => (
                  <option key={key} value={key}>
                    {name} ({category})
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Primary muscles:{" "}
                {exercises[formData.exerciseType].primaryMuscles.join(", ")}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight Lifted
              </label>
              <div className="flex">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="1"
                  step="0.5"
                  className="mt-1 block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <select
                  name="unit"
                  value={formData.unit}
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
                Repetitions Performed
              </label>
              <input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                min="1"
                max="30"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calculation Formula
              </label>
              <select
                name="formula"
                value={formData.formula}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {Object.entries(formulas).map(
                  ([key, { name, description }]) => (
                    <option key={key} value={key}>
                      {name} Formula
                    </option>
                  )
                )}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                {formulas[formData.formula].description}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate One Rep Max
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Estimated One Rep Max for {result.exercise.name}
            </h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {result.oneRM} {formData.unit}
            </div>
            <p className="text-gray-600">
              Calculated using the {result.formula} Formula
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Exercise Information</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {result.exercise.category}
                </p>
                <p>
                  <span className="font-medium">Primary Muscles:</span>{" "}
                  {result.exercise.primaryMuscles.join(", ")}
                </p>
                <p>
                  <span className="font-medium">Recommended Rep Range:</span>{" "}
                  {result.exercise.recommendedReps}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Safety & Form</h3>
              <p className="text-sm text-gray-600">
                {result.exercise.safetyNotes}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-4 text-lg">Training Percentages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.percentages.map(({ percentage, weight }) => (
                <div
                  key={percentage}
                  className="bg-gray-50 p-4 rounded-lg border-l-4"
                  style={{
                    borderColor: `rgb(${Math.round(
                      255 - percentage * 2.55
                    )}, ${Math.round(percentage * 2.55)}, 100)`,
                  }}
                >
                  <div className="font-medium text-lg mb-1">
                    {percentage}% = {weight} {formData.unit}
                  </div>
                  <div className="text-sm text-gray-600">
                    Typical rep range: {calculateRepRanges(percentage)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Progression Tips</h3>
            <p className="text-sm text-gray-600 mb-4">
              {result.exercise.progressionTips}
            </p>
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">General Safety Notes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Always warm up properly before attempting heavy lifts</li>
                <li>
                  Use appropriate safety equipment and spotters when necessary
                </li>
                <li>Focus on proper form over weight increases</li>
                <li>Progress gradually to avoid injury</li>
                <li>Listen to your body and respect recovery needs</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneRepMaxCalculator;
