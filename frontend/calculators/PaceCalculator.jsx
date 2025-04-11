import React, { useState } from "react";

const PaceCalculator = () => {
  const [formData, setFormData] = useState({
    distance: "",
    distanceUnit: "km",
    timeHours: "",
    timeMinutes: "",
    timeSeconds: "",
    activityType: "running",
    fitnessLevel: "intermediate",
    terrain: "flat",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const activities = {
    running: {
      name: "Running",
      metValues: {
        easy: 7,
        moderate: 9,
        vigorous: 11,
      },
      terrainFactors: {
        flat: 1,
        hilly: 1.2,
        trail: 1.3,
        track: 0.95,
      },
      tips: {
        beginner:
          "Focus on maintaining consistent effort rather than pace. Walk breaks are perfectly acceptable.",
        intermediate:
          "Try to maintain negative splits - running the second half slightly faster than the first.",
        advanced:
          "Include tempo runs and progressive pace runs in your training.",
      },
    },
    cycling: {
      name: "Cycling",
      metValues: {
        easy: 5,
        moderate: 7,
        vigorous: 9,
      },
      terrainFactors: {
        flat: 1,
        hilly: 1.4,
        trail: 1.5,
        track: 0.9,
      },
      tips: {
        beginner: "Maintain a cadence of 80-90 rpm for optimal efficiency.",
        intermediate:
          "Practice riding in different positions to improve overall comfort.",
        advanced:
          "Include interval training to improve power output and endurance.",
      },
    },
    swimming: {
      name: "Swimming",
      metValues: {
        easy: 6,
        moderate: 8,
        vigorous: 10,
      },
      terrainFactors: {
        flat: 1, // pool
        hilly: 1.2, // open water calm
        trail: 1.4, // open water choppy
        track: 0.95, // competition pool
      },
      tips: {
        beginner: "Focus on proper breathing technique and body position.",
        intermediate: "Work on bilateral breathing and stroke efficiency.",
        advanced: "Include drill sets and speed work in your training.",
      },
    },
  };

  const calculatePace = () => {
    // Convert all inputs to base units (meters and seconds)
    const distanceInMeters = convertDistance(
      parseFloat(formData.distance),
      formData.distanceUnit
    );
    const totalSeconds =
      parseInt(formData.timeHours || 0) * 3600 +
      parseInt(formData.timeMinutes || 0) * 60 +
      parseInt(formData.timeSeconds || 0);

    // Calculate base pace
    const pacePerKm = totalSeconds / (distanceInMeters / 1000);
    const pacePerMile = pacePerKm * 1.60934;

    // Calculate splits
    const kmSplits = calculateSplits(
      pacePerKm,
      Math.ceil(distanceInMeters / 1000)
    );
    const mileSplits = calculateSplits(
      pacePerMile,
      Math.ceil(distanceInMeters / 1609.34)
    );

    // Calculate speed
    const speedKph = distanceInMeters / 1000 / (totalSeconds / 3600);
    const speedMph = speedKph * 0.621371;

    // Estimate energy expenditure
    const activity = activities[formData.activityType];
    const terrainFactor = activity.terrainFactors[formData.terrain];
    const metValue = determineIntensity(speedKph, formData.activityType);
    const caloriesPerHour = calculateCalories(metValue, terrainFactor);

    return {
      pacePerKm,
      pacePerMile,
      kmSplits,
      mileSplits,
      speedKph,
      speedMph,
      caloriesPerHour,
      totalCalories: caloriesPerHour * (totalSeconds / 3600),
      distance: distanceInMeters,
      time: totalSeconds,
      activity: activities[formData.activityType],
    };
  };

  const convertDistance = (value, unit) => {
    switch (unit) {
      case "km":
        return value * 1000;
      case "mi":
        return value * 1609.34;
      case "m":
        return value;
      default:
        return value;
    }
  };

  const calculateSplits = (paceSeconds, segments) => {
    return Array.from({ length: segments }, (_, i) => ({
      segment: i + 1,
      time: formatTime(paceSeconds * (i + 1)),
    }));
  };

  const determineIntensity = (speed, activityType) => {
    const activity = activities[activityType];
    if (activityType === "running") {
      if (speed < 8) return activity.metValues.easy;
      if (speed < 12) return activity.metValues.moderate;
      return activity.metValues.vigorous;
    }
    if (activityType === "cycling") {
      if (speed < 15) return activity.metValues.easy;
      if (speed < 25) return activity.metValues.moderate;
      return activity.metValues.vigorous;
    }
    // Swimming intensity is typically determined differently
    return activity.metValues.moderate;
  };

  const calculateCalories = (met, terrainFactor) => {
    // Assuming 70kg person - this could be made configurable
    const weightKg = 70;
    return met * weightKg * terrainFactor;
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = calculatePace();
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
          Advanced Pace Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your pace, splits, and estimated energy expenditure for
          different activities.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Type
              </label>
              <select
                name="activityType"
                value={formData.activityType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {Object.entries(activities).map(([key, { name }]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance
              </label>
              <div className="flex">
                <input
                  type="number"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  min="0.1"
                  step="0.1"
                  className="mt-1 block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <select
                  name="distanceUnit"
                  value={formData.distanceUnit}
                  onChange={handleChange}
                  className="mt-1 block rounded-r-md border-l-0 border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="km">kilometers</option>
                  <option value="mi">miles</option>
                  <option value="m">meters</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  name="timeHours"
                  value={formData.timeHours}
                  onChange={handleChange}
                  min="0"
                  placeholder="HH"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="timeMinutes"
                  value={formData.timeMinutes}
                  onChange={handleChange}
                  min="0"
                  max="59"
                  placeholder="MM"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  name="timeSeconds"
                  value={formData.timeSeconds}
                  onChange={handleChange}
                  min="0"
                  max="59"
                  placeholder="SS"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Terrain Type
              </label>
              <select
                name="terrain"
                value={formData.terrain}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="flat">Flat</option>
                <option value="hilly">Hilly</option>
                <option value="trail">Trail/Rough</option>
                <option value="track">Track/Smooth</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Pace
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your {result.activity.name} Pace Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Pace per km</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatTime(result.pacePerKm)}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Pace per mile</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatTime(result.pacePerMile)}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="font-semibold mb-3">Speed</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>{result.speedKph.toFixed(2)} km/h</p>
                <p>{result.speedMph.toFixed(2)} mph</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">
                Estimated Energy Expenditure
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>{Math.round(result.caloriesPerHour)} calories per hour</p>
                <p>{Math.round(result.totalCalories)} calories total</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Kilometer Splits</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  {result.kmSplits.slice(0, 8).map((split) => (
                    <div key={split.segment} className="flex justify-between">
                      <span>Km {split.segment}</span>
                      <span className="font-medium">{split.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Mile Splits</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  {result.mileSplits.slice(0, 8).map((split) => (
                    <div key={split.segment} className="flex justify-between">
                      <span>Mile {split.segment}</span>
                      <span className="font-medium">{split.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-4">Training Zones</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Recovery", "Aerobic", "Tempo", "Threshold", "VO2 Max"].map(
                (zone, index) => {
                  const intensity = 1 + index * 0.1;
                  const zoneTime = formatTime(result.pacePerKm * intensity);
                  return (
                    <div
                      key={zone}
                      className="bg-gray-50 p-4 rounded-lg border-l-4"
                      style={{
                        borderColor: `hsl(${200 - index * 30}, 70%, 50%)`,
                      }}
                    >
                      <div className="font-medium mb-1">{zone}</div>
                      <div className="text-sm text-gray-600">
                        Target Pace: {zoneTime} /km
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-4">Race Prediction Times</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { distance: 5, unit: "km" },
                { distance: 10, unit: "km" },
                { distance: 21.1, unit: "km", name: "Half Marathon" },
                { distance: 42.2, unit: "km", name: "Marathon" },
              ].map((race) => {
                const predictedTime = result.pacePerKm * race.distance;
                return (
                  <div
                    key={race.distance}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="font-medium mb-1">
                      {race.name || `${race.distance}${race.unit}`}
                    </div>
                    <div className="text-lg text-blue-600">
                      {formatTime(predictedTime)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Training Recommendations</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Workout Types</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Easy Runs:</span>{" "}
                      {formatTime(result.pacePerKm * 1.2)} -{" "}
                      {formatTime(result.pacePerKm * 1.3)} per km
                    </li>
                    <li>
                      <span className="font-medium">Tempo Runs:</span>{" "}
                      {formatTime(result.pacePerKm * 0.95)} -{" "}
                      {formatTime(result.pacePerKm * 1.05)} per km
                    </li>
                    <li>
                      <span className="font-medium">Interval Training:</span>{" "}
                      {formatTime(result.pacePerKm * 0.85)} -{" "}
                      {formatTime(result.pacePerKm * 0.9)} per km
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Training Tips</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Incorporate strength training 2-3 times per week</li>
                    <li>Include one long run per week at easy pace</li>
                    <li>Allow for adequate recovery between hard sessions</li>
                    <li>Stay hydrated and maintain proper nutrition</li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium mb-2">Activity-Specific Advice</h4>
                  <p className="text-sm text-gray-700">
                    {result.activity.tips[formData.fitnessLevel]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Safety Considerations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Before Activity</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Warm up properly for at least 10 minutes</li>
                    <li>Check weather conditions</li>
                    <li>Wear appropriate gear and footwear</li>
                    <li>Stay hydrated</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">During Activity</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Monitor your effort level</li>
                    <li>Stay aware of your surroundings</li>
                    <li>Listen to your body</li>
                    <li>Maintain proper form</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaceCalculator;
