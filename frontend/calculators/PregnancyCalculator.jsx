import React, { useState } from "react";

const PregnancyCalculator = () => {
  const [formData, setFormData] = useState({
    calculationType: "lmp",
    lmpDate: "",
    conceptionDate: "",
  });

  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const calculateDates = () => {
    let dueDate = new Date();
    let conceptionDate = new Date();

    if (formData.calculationType === "lmp") {
      // Calculate from LMP
      dueDate = new Date(formData.lmpDate);
      dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
      conceptionDate = new Date(formData.lmpDate);
      conceptionDate.setDate(conceptionDate.getDate() + 14); // Approximately 2 weeks after LMP
    } else {
      // Calculate from conception date
      dueDate = new Date(formData.conceptionDate);
      dueDate.setDate(dueDate.getDate() + 266); // 38 weeks
      conceptionDate = new Date(formData.conceptionDate);
    }

    // Calculate trimesters and milestones
    const today = new Date();
    const pregnancyStart =
      formData.calculationType === "lmp"
        ? new Date(formData.lmpDate)
        : new Date(formData.conceptionDate);

    const weeksDifference = Math.floor(
      (today - pregnancyStart) / (1000 * 60 * 60 * 24 * 7)
    );

    return {
      dueDate,
      conceptionDate,
      currentWeek:
        weeksDifference + (formData.calculationType === "lmp" ? 0 : 2),
      trimesters: {
        first: new Date(
          pregnancyStart.getTime() + 12 * 7 * 24 * 60 * 60 * 1000
        ),
        second: new Date(
          pregnancyStart.getTime() + 27 * 7 * 24 * 60 * 60 * 1000
        ),
        third: dueDate,
      },
      milestones: {
        heartbeat: new Date(
          pregnancyStart.getTime() + 6 * 7 * 24 * 60 * 60 * 1000
        ),
        gender: new Date(
          pregnancyStart.getTime() + 18 * 7 * 24 * 60 * 60 * 1000
        ),
        viability: new Date(
          pregnancyStart.getTime() + 24 * 7 * 24 * 60 * 60 * 1000
        ),
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = calculateDates();
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pregnancy Due Date Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate your estimated due date and important pregnancy milestones
          based on your last menstrual period (LMP) or conception date.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Method
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="calculationType"
                  value="lmp"
                  checked={formData.calculationType === "lmp"}
                  onChange={handleChange}
                  className="text-blue-600"
                />
                <span className="ml-2">Last Menstrual Period</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="calculationType"
                  value="conception"
                  checked={formData.calculationType === "conception"}
                  onChange={handleChange}
                  className="text-blue-600"
                />
                <span className="ml-2">Conception Date</span>
              </label>
            </div>
          </div>

          {formData.calculationType === "lmp" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Day of Last Menstrual Period
              </label>
              <input
                type="date"
                name="lmpDate"
                value={formData.lmpDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conception Date
              </label>
              <input
                type="date"
                name="conceptionDate"
                value={formData.conceptionDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calculate Due Date
            </button>
          </div>
        </form>
      </div>

      {showResults && result && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Pregnancy Timeline
            </h2>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              Due Date: {formatDate(result.dueDate)}
            </div>
            <p className="text-gray-600">
              You are currently in week {result.currentWeek} of your pregnancy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Key Dates</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Conception Date:</span>
                  <br />
                  {formatDate(result.conceptionDate)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">First Trimester Ends:</span>
                  <br />
                  {formatDate(result.trimesters.first)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Second Trimester Ends:</span>
                  <br />
                  {formatDate(result.trimesters.second)}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Important Milestones</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">
                    First Heartbeat (Week 6-7):
                  </span>
                  <br />
                  {formatDate(result.milestones.heartbeat)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">
                    Gender Determination (Week 18-20):
                  </span>
                  <br />
                  {formatDate(result.milestones.gender)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Viability (Week 24):</span>
                  <br />
                  {formatDate(result.milestones.viability)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Important Note</h3>
            <p className="text-sm text-gray-600">
              This calculator provides estimates based on typical pregnancy
              progression. Every pregnancy is unique, and your actual dates may
              vary. Always consult with your healthcare provider for the most
              accurate dating of your pregnancy and important medical decisions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PregnancyCalculator;
