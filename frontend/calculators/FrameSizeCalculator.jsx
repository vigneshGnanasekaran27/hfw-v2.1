import React, { useState } from "react";
import { Ruler, ArrowRight } from "lucide-react";

const FrameSizeCalculator = () => {
  const [measurements, setMeasurements] = useState({
    wrist: "",
    height: "",
    sex: "male",
    unit: "metric",
  });

  const [result, setResult] = useState(null);

  const calculateFrameSize = () => {
    let wristCm = measurements.wrist;
    let heightCm = measurements.height;

    // Convert to cm if imperial
    if (measurements.unit === "imperial") {
      wristCm = measurements.wrist * 2.54;
      heightCm = measurements.height * 2.54;
    }

    // Calculate height/wrist ratio (Broca Index)
    const ratio = heightCm / wristCm;

    let frameSize;
    if (measurements.sex === "male") {
      if (ratio > 10.4) frameSize = "small";
      else if (ratio < 9.6) frameSize = "large";
      else frameSize = "medium";
    } else {
      if (ratio > 11.0) frameSize = "small";
      else if (ratio < 10.1) frameSize = "large";
      else frameSize = "medium";
    }

    const frameSizeDetails = {
      small: {
        title: "Small Frame",
        color: "bg-blue-100",
        textColor: "text-blue-800",
        description:
          "You have a delicate bone structure with smaller joints and finer bones.",
      },
      medium: {
        title: "Medium Frame",
        color: "bg-green-100",
        textColor: "text-green-800",
        description:
          "You have an average bone structure with moderate joint sizes.",
      },
      large: {
        title: "Large Frame",
        color: "bg-purple-100",
        textColor: "text-purple-800",
        description:
          "You have a robust bone structure with larger joints and broader bones.",
      },
    };

    return {
      frameSize,
      ratio: ratio.toFixed(2),
      ...frameSizeDetails[frameSize],
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateFrameSize();
    setResult(result);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Body Frame Size Calculator
        </h2>
        <p className="text-gray-600">
          Calculate your body frame size using your wrist circumference and
          height
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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
                    checked={measurements.unit === "metric"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Metric (cm)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="unit"
                    value="imperial"
                    checked={measurements.unit === "imperial"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Imperial (inches)</span>
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
                    checked={measurements.sex === "male"}
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
                    checked={measurements.sex === "female"}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wrist Circumference (
                {measurements.unit === "metric" ? "cm" : "inches"})
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="wrist"
                  value={measurements.wrist}
                  onChange={handleChange}
                  step="0.1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter wrist circumference"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Ruler className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height ({measurements.unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                type="number"
                name="height"
                value={measurements.height}
                onChange={handleChange}
                step="0.1"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter height"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Frame Size
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8">
            <div className={`p-6 rounded-lg ${result.color}`}>
              <h3 className={`text-xl font-bold ${result.textColor} mb-2`}>
                {result.title}
              </h3>
              <p className="text-gray-700 mb-4">{result.description}</p>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Height/Wrist Ratio</p>
                    <p className="text-lg font-semibold">{result.ratio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Frame Category</p>
                    <p className={`text-lg font-semibold ${result.textColor}`}>
                      {result.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Understanding Your Results
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  • The frame size is calculated using the height-to-wrist ratio
                  (Broca Index)
                </p>
                <p>
                  • For men: Small &gt; 10.4, Medium 9.6-10.4, Large &lt; 9.6
                </p>
                <p>
                  • For women: Small &gt; 11.0, Medium 10.1-11.0, Large &lt;
                  10.1
                </p>
                <p>
                  • This is one method of determining frame size and should be
                  used as a guide
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrameSizeCalculator;
