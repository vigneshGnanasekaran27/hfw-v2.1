import React, { useState } from "react";
import {
  Activity,
  BarChart,
  Heart,
  Info,
  Clock,
  Calendar,
  Weight,
  Flame,
} from "lucide-react";

const ACTIVITY_CATEGORIES = {
  walking: {
    name: "Walking",
    activities: {
      walking_very_slow: {
        name: "Walking - Very Slow (2 mph)",
        met: 2.0,
        details: "Casual stroll, window shopping",
      },
      walking_slow: {
        name: "Walking - Slow (2.5 mph)",
        met: 2.9,
        details: "Easy pace on level ground",
      },
      walking_medium: {
        name: "Walking - Medium (3.0-3.5 mph)",
        met: 3.5,
        details: "Normal pace",
      },
      walking_brisk: {
        name: "Walking - Brisk (3.5-4.0 mph)",
        met: 4.3,
        details: "Purposeful walking",
      },
      walking_very_brisk: {
        name: "Walking - Very Brisk (4.5-5.0 mph)",
        met: 5.0,
        details: "Very fast pace",
      },
      walking_uphill_slow: {
        name: "Walking Uphill - Slow",
        met: 5.3,
        details: "2.5 mph, 3-6% grade",
      },
      walking_uphill_fast: {
        name: "Walking Uphill - Fast",
        met: 8.0,
        details: "3.5 mph, 6-10% grade",
      },
      walking_stairs: {
        name: "Walking Stairs",
        met: 4.0,
        details: "Normal pace up and down",
      },
    },
  },
  running: {
    name: "Running",
    activities: {
      jogging_slow: {
        name: "Jogging - Slow (5 mph)",
        met: 8.3,
        details: "Light jog, 12 min/mile",
      },
      running_5mph: {
        name: "Running - 5-6 mph",
        met: 9.8,
        details: "10-12 min/mile",
      },
      running_6mph: {
        name: "Running - 6-7 mph",
        met: 11.0,
        details: "8.5-10 min/mile",
      },
      running_7mph: {
        name: "Running - 7-8 mph",
        met: 11.8,
        details: "7.5-8.5 min/mile",
      },
      running_8mph: {
        name: "Running - 8-9 mph",
        met: 12.8,
        details: "6.5-7.5 min/mile",
      },
      running_9mph: {
        name: "Running - 9+ mph",
        met: 14.5,
        details: "6.5 min/mile or faster",
      },
      running_uphill: {
        name: "Running Uphill",
        met: 15.0,
        details: "7 mph, 5-8% grade",
      },
      running_stairs: {
        name: "Running Stairs",
        met: 15.0,
        details: "Vigorous effort",
      },
    },
  },
  cycling: {
    name: "Cycling",
    activities: {
      cycling_leisure: {
        name: "Cycling - Leisure (<10 mph)",
        met: 4.0,
        details: "Very light effort",
      },
      cycling_light: {
        name: "Cycling - Light (10-12 mph)",
        met: 6.0,
        details: "Light effort, flat surface",
      },
      cycling_moderate: {
        name: "Cycling - Moderate (12-14 mph)",
        met: 8.0,
        details: "Moderate effort",
      },
      cycling_vigorous: {
        name: "Cycling - Vigorous (14-16 mph)",
        met: 10.0,
        details: "Vigorous effort",
      },
      cycling_racing: {
        name: "Cycling - Racing (>16 mph)",
        met: 12.0,
        details: "Racing or fast pace",
      },
      cycling_mountain: {
        name: "Mountain Biking",
        met: 8.5,
        details: "General trail riding",
      },
      cycling_stationary_light: {
        name: "Stationary Cycling - Light",
        met: 5.5,
        details: "Light effort",
      },
      cycling_stationary_moderate: {
        name: "Stationary Cycling - Moderate",
        met: 7.0,
        details: "Moderate effort",
      },
      cycling_stationary_vigorous: {
        name: "Stationary Cycling - Vigorous",
        met: 10.5,
        details: "Vigorous effort",
      },
    },
  },
  swimming: {
    name: "Swimming",
    activities: {
      swimming_leisure: {
        name: "Swimming - Leisure",
        met: 6.0,
        details: "Recreational swimming",
      },
      swimming_freestyle_slow: {
        name: "Freestyle - Slow",
        met: 7.0,
        details: "Light effort",
      },
      swimming_freestyle_moderate: {
        name: "Freestyle - Moderate",
        met: 8.3,
        details: "Moderate effort",
      },
      swimming_freestyle_fast: {
        name: "Freestyle - Fast",
        met: 10.0,
        details: "Vigorous effort",
      },
      swimming_backstroke: { name: "Backstroke", met: 7.0, details: "General" },
      swimming_breaststroke: {
        name: "Breaststroke",
        met: 7.0,
        details: "General",
      },
      swimming_butterfly: { name: "Butterfly", met: 11.0, details: "General" },
      swimming_treading: {
        name: "Treading Water",
        met: 3.5,
        details: "Moderate effort",
      },
    },
  },
  weightlifting: {
    name: "Weight Training",
    activities: {
      weight_light: {
        name: "Weight Training - Light",
        met: 3.5,
        details: "Light effort, long rest periods",
      },
      weight_moderate: {
        name: "Weight Training - Moderate",
        met: 5.0,
        details: "Moderate effort, normal rest periods",
      },
      weight_vigorous: {
        name: "Weight Training - Vigorous",
        met: 6.0,
        details: "Heavy effort, circuit training",
      },
      weight_powerlifting: {
        name: "Powerlifting",
        met: 6.5,
        details: "Very heavy effort",
      },
      crossfit: {
        name: "CrossFit",
        met: 8.0,
        details: "High intensity interval training",
      },
      bodyweight_exercises: {
        name: "Bodyweight Exercises",
        met: 4.0,
        details: "Push-ups, pull-ups, etc.",
      },
      resistance_bands: {
        name: "Resistance Band Training",
        met: 3.5,
        details: "General",
      },
    },
  },
  sports: {
    name: "Sports",
    activities: {
      basketball_game: {
        name: "Basketball - Game",
        met: 8.0,
        details: "Competitive game play",
      },
      basketball_practice: {
        name: "Basketball - Practice",
        met: 6.0,
        details: "Non-game drills",
      },
      soccer_casual: {
        name: "Soccer - Casual",
        met: 7.0,
        details: "Recreational play",
      },
      soccer_competitive: {
        name: "Soccer - Competitive",
        met: 10.0,
        details: "Competitive match",
      },
      tennis_singles: {
        name: "Tennis - Singles",
        met: 8.0,
        details: "Competitive play",
      },
      tennis_doubles: {
        name: "Tennis - Doubles",
        met: 6.0,
        details: "Competitive play",
      },
      volleyball_casual: {
        name: "Volleyball - Casual",
        met: 4.0,
        details: "Non-competitive",
      },
      volleyball_competitive: {
        name: "Volleyball - Competitive",
        met: 8.0,
        details: "Competitive match",
      },
    },
  },
  cardio: {
    name: "Cardio Exercises",
    activities: {
      jumping_rope_slow: {
        name: "Jump Rope - Slow",
        met: 8.8,
        details: "< 100 skips/min",
      },
      jumping_rope_moderate: {
        name: "Jump Rope - Moderate",
        met: 11.8,
        details: "100-120 skips/min",
      },
      jumping_rope_fast: {
        name: "Jump Rope - Fast",
        met: 12.3,
        details: "> 120 skips/min",
      },
      aerobics_low: {
        name: "Aerobics - Low Impact",
        met: 5.0,
        details: "Basic movements",
      },
      aerobics_high: {
        name: "Aerobics - High Impact",
        met: 7.2,
        details: "Jumping movements",
      },
      zumba: { name: "Zumba", met: 6.0, details: "General class" },
      hiit: {
        name: "HIIT",
        met: 8.0,
        details: "High Intensity Interval Training",
      },
    },
  },
  daily: {
    name: "Daily Activities",
    activities: {
      housework_light: {
        name: "Light Housework",
        met: 2.5,
        details: "Dusting, tidying",
      },
      housework_moderate: {
        name: "Moderate Housework",
        met: 3.5,
        details: "Vacuuming, mopping",
      },
      housework_vigorous: {
        name: "Heavy Housework",
        met: 4.5,
        details: "Scrubbing, moving furniture",
      },
      gardening_light: {
        name: "Gardening - Light",
        met: 3.5,
        details: "Watering, pruning",
      },
      gardening_moderate: {
        name: "Gardening - Moderate",
        met: 4.0,
        details: "Planting, weeding",
      },
      gardening_heavy: {
        name: "Gardening - Heavy",
        met: 5.0,
        details: "Digging, landscaping",
      },
      cooking: {
        name: "Cooking",
        met: 2.5,
        details: "General kitchen activity",
      },
      shopping: { name: "Shopping", met: 2.3, details: "Walking in store" },
    },
  },
  mindBody: {
    name: "Mind & Body",
    activities: {
      yoga_hatha: {
        name: "Yoga - Hatha",
        met: 2.5,
        details: "Gentle poses and breathing",
      },
      yoga_power: {
        name: "Yoga - Power",
        met: 4.0,
        details: "Dynamic flowing movements",
      },
      pilates_beginner: {
        name: "Pilates - Beginner",
        met: 3.0,
        details: "Basic mat exercises",
      },
      pilates_advanced: {
        name: "Pilates - Advanced",
        met: 4.0,
        details: "Complex movements",
      },
      tai_chi: { name: "Tai Chi", met: 3.0, details: "General" },
      stretching: { name: "Stretching", met: 2.3, details: "Light stretching" },
      meditation: { name: "Meditation", met: 1.0, details: "Sitting quietly" },
    },
  },
};

const CalorieBurnCalculator = () => {
  const [formData, setFormData] = useState({
    weight: "",
    age: "",
    sex: "male",
    heartRate: "",
    activity: "",
    duration: "",
    intensity: "moderate",
    unit: "metric",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const calculateCaloriesBurned = () => {
    let weight = parseFloat(formData.weight);
    if (formData.unit === "imperial") {
      weight = weight * 0.453592; // Convert lbs to kg
    }

    const activity = Object.values(ACTIVITY_CATEGORIES)
      .flatMap((category) => Object.entries(category.activities))
      .find(([key]) => key === formData.activity)?.[1];

    if (!activity) return 0;

    let met = activity.met;

    // Adjust MET based on intensity
    switch (formData.intensity) {
      case "light":
        met *= 0.85;
        break;
      case "vigorous":
        met *= 1.15;
        break;
    }

    // Calculate calories burned using the MET formula
    const duration = parseFloat(formData.duration);
    const caloriesBurned = (met * 3.5 * weight * duration) / 200;

    // Apply age and sex adjustments
    let ageAdjustment = 1.0;
    if (parseInt(formData.age) > 50) {
      ageAdjustment = 0.95;
    }

    let sexAdjustment = formData.sex === "male" ? 1.0 : 0.95;

    return caloriesBurned * ageAdjustment * sexAdjustment;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calories = calculateCaloriesBurned();
    setResult(Math.round(calories));
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
          Calorie Burn Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate how many calories you burn during different activities based
          on your personal characteristics and activity intensity.
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
                Weight ({formData.unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heart Rate (optional)
              </label>
              <input
                type="number"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity
              </label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select an activity</option>
                {Object.entries(ACTIVITY_CATEGORIES).map(
                  ([categoryKey, category]) => (
                    <optgroup key={categoryKey} label={category.name}>
                      {Object.entries(category.activities).map(
                        ([activityKey, activity]) => (
                          <option key={activityKey} value={activityKey}>
                            {activity.name} - {activity.details}
                          </option>
                        )
                      )}
                    </optgroup>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intensity
              </label>
              <select
                name="intensity"
                value={formData.intensity}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="vigorous">Vigorous</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Calories Burned
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Results
            </h2>
            <div className="bg-blue-50 rounded-xl p-8 mb-6">
              <div className="flex items-center justify-center mb-4">
                <Flame className="w-8 h-8 text-blue-600 mr-2" />
                <div className="text-5xl font-bold text-blue-600">{result}</div>
                <div className="text-xl text-blue-600 ml-2">calories</div>
              </div>
              <p className="text-gray-600">
                Estimated calories burned during your {formData.duration} minute
                activity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Activity className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold">Activity Details</h3>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    <span className="font-medium">Selected Activity:</span>{" "}
                    {
                      Object.values(ACTIVITY_CATEGORIES)
                        .flatMap((category) =>
                          Object.entries(category.activities)
                        )
                        .find(([key]) => key === formData.activity)?.[1].name
                    }
                  </p>
                  <p className="mt-1">
                    {
                      Object.values(ACTIVITY_CATEGORIES)
                        .flatMap((category) =>
                          Object.entries(category.activities)
                        )
                        .find(([key]) => key === formData.activity)?.[1].details
                    }
                  </p>
                  <p>
                    <span className="font-medium">Intensity Level:</span>{" "}
                    {formData.intensity.charAt(0).toUpperCase() +
                      formData.intensity.slice(1)}
                  </p>
                  <p>
                    <span className="font-medium">Duration:</span>{" "}
                    {formData.duration} minutes
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BarChart className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold">Personal Metrics</h3>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    <span className="font-medium">Weight:</span>{" "}
                    {formData.weight}{" "}
                    {formData.unit === "metric" ? "kg" : "lbs"}
                  </p>
                  <p>
                    <span className="font-medium">Age:</span> {formData.age}{" "}
                    years
                  </p>
                  {formData.heartRate && (
                    <p>
                      <span className="font-medium">Heart Rate:</span>{" "}
                      {formData.heartRate} bpm
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg text-left">
                <div className="flex items-center mb-3">
                  <Info className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold">Understanding Your Results</h3>
                </div>
                <div className="text-sm text-gray-600 space-y-4">
                  <p>
                    This calculation uses the Metabolic Equivalent of Task (MET)
                    method, which estimates energy expenditure during physical
                    activities. The calculation takes into account:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Your personal characteristics (weight, age, sex)</li>
                    <li>Activity intensity level</li>
                    <li>Duration of the activity</li>
                    <li>Standard MET values based on research</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg text-left">
                <div className="flex items-center mb-3">
                  <Heart className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold">Accuracy Note</h3>
                </div>
                <p className="text-sm text-gray-600">
                  While this calculator provides a good estimate, actual calorie
                  burn can vary based on:
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 mt-2 space-y-1">
                  <li>Individual fitness level</li>
                  <li>Body composition</li>
                  <li>Environmental conditions</li>
                  <li>Exercise technique and efficiency</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg text-left">
                <div className="flex items-center mb-3">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold">Tips for Accurate Tracking</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>
                    • Use a heart rate monitor for more accurate measurements
                  </li>
                  <li>• Keep track of exact activity duration</li>
                  <li>• Note the intensity level of your activity</li>
                  <li>
                    • Update your weight regularly for accurate calculations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieBurnCalculator;
