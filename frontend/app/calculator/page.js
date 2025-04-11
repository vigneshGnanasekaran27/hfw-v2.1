import React from "react";
import Link from "next/link";

const CalculatorCategory = ({ title, calculators }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.map((calc) => (
          <Link
            href={`/calculator/${calc.slug}`}
            key={calc.slug}
            className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="group cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                {calc.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{calc.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const CalculatorPage = () => {
  const categories = {
    Fitness: [
      {
        name: "BMI Calculator",
        slug: "bmi",
        description: "Calculate your Body Mass Index",
      },
      {
        name: "Calorie Calculator",
        slug: "calorie",
        description: "Find your daily caloric needs",
      },
      {
        name: "Body Fat Calculator",
        slug: "body-fat",
        description: "Estimate your body fat percentage",
      },
      {
        name: "BMR Calculator",
        slug: "bmr",
        description: "Calculate your Basal Metabolic Rate",
      },
      {
        name: "Ideal Weight Calculator",
        slug: "ideal-weight",
        description: "Find your ideal body weight",
      },
      {
        name: "Pace Calculator",
        slug: "pace",
        description: "Calculate your running pace",
      },
      {
        name: "Lean Body Mass Calculator",
        slug: "lean-body-mass",
        description: "Calculate your lean body mass",
      },
      {
        name: "Body Frame",
        slug: "body-frame",
        description: "Find your Body Frame",
      },
      {
        name: "Calories Burned Calculator",
        slug: "calories-burned",
        description: "Calculate calories burned during activities",
      },
      {
        name: "One Rep Max Calculator",
        slug: "one-rep-max",
        description: "Estimate your one repetition maximum",
      },
    ],
    Pregnancy: [
      {
        name: "Pregnancy Calculator",
        slug: "pregnancy",
        description: "Track your pregnancy timeline",
      },
      {
        name: "Pregnancy Weight Gain Calculator",
        slug: "pregnancy-weight-gain",
        description: "Monitor healthy pregnancy weight gain",
      },
      {
        name: "Pregnancy Conception Calculator",
        slug: "pregnancy-conception",
        description: "Calculate your conception date",
      },
      {
        name: "Due Date Calculator",
        slug: "due-date",
        description: "Estimate your due date",
      },
      {
        name: "Ovulation Calculator",
        slug: "ovulation",
        description: "Track your ovulation cycle",
      },
      {
        name: "Conception Calculator",
        slug: "conception",
        description: "Plan your conception",
      },
      {
        name: "Period Calculator",
        slug: "period",
        description: "Track your menstrual cycle",
      },
    ],
    Other: [
      {
        name: "Macro Calculator",
        slug: "macro",
        description: "Calculate your macro nutrient needs",
      },
      {
        name: "Carbohydrate Calculator",
        slug: "carbohydrate",
        description: "Calculate your carb requirements",
      },
      {
        name: "Protein Calculator",
        slug: "protein",
        description: "Calculate your protein needs",
      },
      {
        name: "Fat Intake Calculator",
        slug: "fat-intake",
        description: "Calculate your fat intake requirements",
      },
      {
        name: "TDEE Calculator",
        slug: "tdee",
        description: "Calculate Total Daily Energy Expenditure",
      },
      {
        name: "GFR Calculator",
        slug: "gfr",
        description: "Calculate Glomerular Filtration Rate",
      },
      {
        name: "Body Type Calculator",
        slug: "body-type",
        description: "Determine your body type",
      },
      {
        name: "Body Surface Area Calculator",
        slug: "bsa",
        description: "Calculate body surface area",
      },
      {
        name: "BAC Calculator",
        slug: "bac",
        description: "Calculate Blood Alcohol Content",
      },
      {
        name: "Heart Rate Calculator",
        slug: "hrc",
        description: "Calculate your Target Heart Rate Zones",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Health & Fitness Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access our comprehensive collection of health, fitness, and
            pregnancy calculators to help you achieve your wellness goals.
          </p>
        </header>

        <div className="space-y-12">
          {Object.entries(categories).map(([category, calculators]) => (
            <CalculatorCategory
              key={category}
              title={category}
              calculators={calculators}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
