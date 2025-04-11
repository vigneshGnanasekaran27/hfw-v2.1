"use client";
import {
  Calculator,
  CalendarRange,
  Weight,
  Ruler,
  Atom,
  Activity,
  Target,
  Sigma,
  Award,
  Zap,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const FitnessCalculator = () => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    sex: "",
    activityLevel: "1.2",
    goal: "weightLoss",
    targetWeight: "",
    formula: "mifflin",
    aggression: "normal",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (window.location.hash === "#calorieCalculator") {
      const element = document.getElementById("calorieCalculator");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, []);

  useEffect(() => {
    if (formData.goal === "maintenance") {
      setFormData((prev) => ({
        ...prev,
        aggression: "normal",
        targetWeight: "",
      }));
      setErrors((prev) => ({
        ...prev,
        targetWeight: "",
      }));
    }
  }, [formData.goal]);

  const validateField = (name, value) => {
    switch (name) {
      case "age":
        return !value
          ? "Age is required"
          : value < 15
          ? "Age must be at least 15 years"
          : value > 120
          ? "Please enter a valid age"
          : "";
      case "weight":
        return !value
          ? "Weight is required"
          : value < 30
          ? "Weight must be at least 30 kg"
          : value > 300
          ? "Please enter a valid weight"
          : "";
      case "height":
        return !value
          ? "Height is required"
          : value < 100
          ? "Height must be at least 100 cm"
          : value > 250
          ? "Please enter a valid height"
          : "";
      case "sex":
        return !value ? "Please select your gender" : "";
      case "targetWeight":
        return formData.goal !== "maintenance"
          ? !value
            ? "Target weight is required"
            : value < 30
            ? "Target weight must be at least 30 kg"
            : value > 300
            ? "Please enter a valid target weight"
            : ""
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  };

  const calculateBMR = () => {
    const { weight, height, age, sex, formula } = formData;
    if (formula === "mifflin") {
      return sex === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    } else if (formula === "harris-benedict") {
      return sex === "male"
        ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        : 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    }
    return 0;
  };

  const calculateTDEE = (bmr) => {
    return bmr * parseFloat(formData.activityLevel);
  };

  const getMacroRatios = (goal, aggression) => {
    const ratios = {
      weightLoss: {
        normal: { carbs: 0.35, protein: 0.4, fat: 0.25 },
        average: { carbs: 0.3, protein: 0.45, fat: 0.25 },
        aggressive: { carbs: 0.25, protein: 0.45, fat: 0.3 },
      },
      weightGain: {
        normal: { carbs: 0.45, protein: 0.3, fat: 0.25 },
        average: { carbs: 0.5, protein: 0.3, fat: 0.2 },
        aggressive: { carbs: 0.55, protein: 0.3, fat: 0.15 },
      },
      maintenance: {
        normal: { carbs: 0.4, protein: 0.3, fat: 0.3 },
      },
    };
    return ratios[goal][aggression];
  };

  const calculateMacros = (tdee) => {
    const { goal, aggression } = formData;

    let calorieAdjustment = 0;
    if (goal === "weightLoss") {
      switch (aggression) {
        case "normal":
          calorieAdjustment = -500;
          break;
        case "average":
          calorieAdjustment = -750;
          break;
        case "aggressive":
          calorieAdjustment = -1000;
          break;
        default:
          calorieAdjustment = -500;
      }
    } else if (goal === "weightGain") {
      switch (aggression) {
        case "normal":
          calorieAdjustment = 300;
          break;
        case "average":
          calorieAdjustment = 500;
          break;
        case "aggressive":
          calorieAdjustment = 700;
          break;
        default:
          calorieAdjustment = 300;
      }
    }

    const adjustedCalories = tdee + calorieAdjustment;
    const macroRatios = getMacroRatios(goal, aggression);

    const carbs = (adjustedCalories * macroRatios.carbs) / 4;
    const protein = (adjustedCalories * macroRatios.protein) / 4;
    const fat = (adjustedCalories * macroRatios.fat) / 9;

    return { adjustedCalories, carbs, protein, fat };
  };

  const calculateDuration = (weeklyCaloricChange) => {
    if (formData.goal === "maintenance") return 0;
    const weightDifference = Math.abs(formData.weight - formData.targetWeight);
    const weeklyWeightChange = weeklyCaloricChange / 7700;
    return Math.ceil(weightDifference / weeklyWeightChange);
  };

  const calculateBmi = (weight, heightCm) => {
    if (weight <= 0 || heightCm <= 0) {
      throw new Error("Weight and height must be positive numbers");
    }

    const heightM = heightCm / 100;

    const calculatedBmi = Number((weight / (heightM * heightM)).toFixed(2));

    let category;
    if (calculatedBmi < 18.5) {
      category = "Underweight";
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      category = "Normal Weight";
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      category = "Overweight";
    } else if (calculatedBmi >= 30 && calculatedBmi < 35) {
      category = "Obesity Class I";
    } else if (calculatedBmi >= 35 && calculatedBmi < 40) {
      category = "Obesity Class II";
    } else {
      category = "Obesity Class III";
    }

    return {
      bmi: calculatedBmi,
      category: category,
      isHealthy: category === "Normal Weight",
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    // Mark all fields as touched
    const newTouched = {};
    Object.keys(formData).forEach((key) => {
      newTouched[key] = true;
    });

    setErrors(newErrors);
    setTouched(newTouched);

    // Only proceed if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const bmr = calculateBMR();
      const tdee = calculateTDEE(bmr);
      const tef = tdee * 0.1;
      const neat = tdee * 0.15;
      const tea = tdee - (bmr + tef + neat);
      const bmit = calculateBmi(formData.weight, formData.height);

      const { adjustedCalories, carbs, protein, fat } = calculateMacros(tdee);
      const weeklyCaloricChange = Math.abs(tdee - adjustedCalories) * 7;
      const weeklyWeightChange = weeklyCaloricChange / 7700;
      const duration = calculateDuration(weeklyCaloricChange);

      setResults({
        bmr,
        tdee,
        tef,
        neat,
        tea,
        bmi: {
          value: bmit.bmi,
          category: bmit.category,
          isHealthy: bmit.isHealthy,
        },
        maintenanceCalories: tdee,
        adjustedCalories,
        carbs,
        protein,
        fat,
        weeklyChange:
          formData.goal === "weightLoss"
            ? `-${weeklyWeightChange.toFixed(2)} kg`
            : `+${weeklyWeightChange.toFixed(2)} kg`,
        duration,
        macroRatios: getMacroRatios(formData.goal, formData.aggression),
      });
    }
  };

  return (
    // <div className="h-fit bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="h-fit   py-12 px-4 sm:px-6 lg:px-8 ">
      {/* Header */}
      <div className="  p-6 text-center">
        <div className="inline-flex items-center justify-center p-3   rounded-full mb-6">
          <Calculator className="w-10 h-10  " />
        </div>
        <h1 className="text-3xl font-bold mb-2">Nutrition & Calorie Planner</h1>
        <p className=" ">Your personalized path to fitness goals</p>
      </div>
      <div className="max-w-4xl mx-auto   shadow-2xl rounded-xl overflow-hidden border-2 border-white">
        {/* Form Container */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Measurements Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Basic Measurements
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                      placeholder="Years"
                    />
                    <CalendarRange className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Weight
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                      placeholder="kg"
                    />
                    <Weight className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Height
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                      placeholder="cm"
                    />
                    <Ruler className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Personal Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <Atom className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Activity Level
                  </label>
                  <div className="relative">
                    <select
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 appearance-none"
                    >
                      <option value="1.2">
                        Sedentary (Little to no exercise)
                      </option>
                      <option value="1.375">
                        Light Activity (1-3 days/week)
                      </option>
                      <option value="1.55">
                        Moderate Activity (3-5 days/week)
                      </option>
                      <option value="1.725">Very Active (6-7 days/week)</option>
                      <option value="1.9">
                        Super Active (Athletes/Physical jobs)
                      </option>
                    </select>
                    <Activity className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Goals Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Goals & Preferences
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Goal
                  </label>
                  <div className="relative">
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 appearance-none"
                    >
                      <option value="maintenance">Maintain Weight</option>
                      <option value="weightLoss">Lose Weight</option>
                      <option value="weightGain">Gain Weight</option>
                    </select>
                    <Target className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Calculation Method
                  </label>
                  <div className="relative">
                    <select
                      name="formula"
                      value={formData.formula}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 appearance-none"
                    >
                      <option value="mifflin">
                        Mifflin-St Jeor (Recommended)
                      </option>
                      <option value="harris-benedict">Harris-Benedict</option>
                    </select>
                    <Sigma className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Conditional Target Weight Section */}
            {formData.goal !== "maintenance" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Goal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Target Weight
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="targetWeight"
                        value={formData.targetWeight}
                        onChange={handleChange}
                        className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                        placeholder="kg"
                      />
                      <Award className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Progress Rate
                    </label>
                    <div className="relative">
                      <select
                        name="aggression"
                        value={formData.aggression}
                        onChange={handleChange}
                        className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 appearance-none"
                      >
                        <option value="normal">
                          Steady (0.25-0.5 kg/week)
                        </option>
                        <option value="average">
                          Moderate (0.5-0.75 kg/week)
                        </option>
                        <option value="aggressive">
                          Fast (0.75-1 kg/week)
                        </option>
                      </select>
                      <Zap className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="  bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium 
            hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] 
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-lg"
              >
                Calculate My Plan
              </button>
              <button className="p-2 border-2 border-black rounded-md ml-2">
                {" "}
                click here to explore
              </button>
            </div>
          </form>

          {results && (
            <div className="mt-8   shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold   mb-6">
                Your Personalized Plan
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Results Column */}
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries({
                      BMR: results.bmr.toFixed(2),
                      TDEE: results.tdee.toFixed(2),
                      TEF: results.tef.toFixed(2),
                      NEAT: results.neat.toFixed(2),
                      TEA: results.tea.toFixed(2),
                      BMI: `${results.bmi.value} (${results.bmi.category})`,
                      "Maintenance Calories":
                        results.maintenanceCalories.toFixed(2),
                      "Recommended Daily Calories":
                        results.adjustedCalories.toFixed(2),
                    }).map(([label, value]) => (
                      <div key={label} className="  p-3 rounded-md">
                        <p className="text-sm font-medium  ">{label}</p>
                        <p className="text-lg font-bold  ">{value} kcal</p>
                      </div>
                    ))}
                  </div>

                  {formData.goal !== "maintenance" && (
                    <div className="mt-6  p-4 rounded-md">
                      <p className="text-sm ">
                        <strong>Weekly Weight Change:</strong>{" "}
                        {results.weeklyChange}
                      </p>
                      <p className="text-sm ">
                        <strong>Estimated Duration to Goal:</strong>{" "}
                        {results.duration} weeks
                      </p>
                    </div>
                  )}
                </div>

                {/* Macro Distribution Column */}
                <div className="macro-distribution">
                  <h4 className="text-xl font-semibold  mb-4">
                    Macro Distribution
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={
                        results
                          ? [
                              {
                                name: "Carbs",
                                percentage: results.macroRatios.carbs * 100,
                                grams: results.carbs,
                                color: "#4CAF50",
                              },
                              {
                                name: "Protein",
                                percentage: results.macroRatios.protein * 100,
                                grams: results.protein,
                                color: "#FF9800",
                              },
                              {
                                name: "Fat",
                                percentage: results.macroRatios.fat * 100,
                                grams: results.fat,
                                color: "#2196F3",
                              },
                            ]
                          : []
                      }
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        label={{
                          value: "Percentage (%)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        formatter={(value, name, props) => [
                          `${props.payload.grams.toFixed(2)}g`,
                          `${name}: ${value.toFixed(2)}%`,
                        ]}
                      />
                      <Bar dataKey="percentage">
                        {results &&
                          results.data &&
                          results.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitnessCalculator;
