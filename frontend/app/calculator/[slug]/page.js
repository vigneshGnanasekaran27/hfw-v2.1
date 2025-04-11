"use client";

import { useParams, useRouter } from "next/navigation";

import BMRCalculator from "@/calculators/BMRCalculator";
import TDEECalculator from "@/calculators/TDEECalculator";
import BMICalculator from "@/calculators/BMICalculator";
import IdealWeightCalculator from "@/calculators/IdealWeightCalculator";
import BodyFatCalculator from "@/calculators/BodyFatCalculator";
import CalorieCalculator from "@/calculators/CalorieCalculator";
import MacroCalculator from "@/calculators/MacroCalculator";
import PregnancyCalculator from "@/calculators/PregnancyCalculator";
import PregnancyWeightCalculator from "@/calculators/PregnancyWeightCalculator";
import HeartRateCalculator from "@/calculators/HeartRateCalculator";
import OneRepMaxCalculator from "@/calculators/OneRepMaxCalculator";
import PaceCalculator from "@/calculators/PaceCalculator";
import LeanBodyMassCalculator from "@/calculators/LeanBodyMassCalculator";
import CaloriesBurnedCalculator from "@/calculators/CaloriesBurnedCalculator";
// import HealthyWeightCalculator from "@/calculators/HealthyWeightCalculator";
import FrameSizeCalculator from "@/calculators/FrameSizeCalculator";

const calculatorComponents = {
  bmr: BMRCalculator,
  tdee: TDEECalculator,
  bmi: BMICalculator,
  "ideal-weight": IdealWeightCalculator,
  "body-fat": BodyFatCalculator,
  calorie: CalorieCalculator,
  macro: MacroCalculator,
  pregnancy: PregnancyCalculator,
  "pregnancy-weight-gain": PregnancyWeightCalculator,
  hrc: HeartRateCalculator,
  "one-rep-max": OneRepMaxCalculator,
  pace: PaceCalculator,
  "lean-body-mass": LeanBodyMassCalculator,
  "calories-burned": CaloriesBurnedCalculator,
  "body-frame": FrameSizeCalculator,
};

const calculatorTitles = {
  bmr: "BMR Calculator - Calculate Your Basal Metabolic Rate",
  bmi: "BMI Calculator - Check Your Body Mass Index",
  tdee: "TDEE Calculator - Total Daily Energy Expenditure",
  "ideal-weight": "Ideal Weight Calculator",
  "body-fat": "Body Fat Percentage Calculator",
  calorie: "Calorie Calculator",
  macro: "Macro Calculator",
  pregnancy: "Pregnancy Calculator",
  "pregnancy-weight-gain": "Pregnancy Weight Gain Calculator",
  hrc: "Heart Rate Calculator",
  "one-rep-max": "One Rep Max Calculator",
  pace: "Pace Calculator",
  "lean-body-mass": "Lean Body Mass Calculator",
  "calories-burned": "Calories Burned Calculator",
  "healthy-weight": "Healthy Weight Calculator",
};

const CalculatorSlugPage = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

  if (!calculatorComponents[slug]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            Calculator Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The calculator you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/calculator")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Calculators
          </button>
        </div>
      </div>
    );
  }

  const CalculatorComponent = calculatorComponents[slug];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CalculatorComponent />
      </div>
    </div>
  );
};

export default CalculatorSlugPage;
