import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const LastTrainingCard = () => {
  const [lastTraining, setLastTraining] = useState(null);

  useEffect(() => {
    // Get the lastSelectedTraining from localStorage
    const trainingData = localStorage.getItem("lastSelectedTraining");
    if (trainingData) {
      try {
        const parsedData = JSON.parse(trainingData);
        setLastTraining(parsedData);
      } catch (error) {
        console.error("Error parsing lastSelectedTraining:", error);
      }
    }
  }, []);

  const handleContinueEnrollment = () => {
    // Navigate to the training page
    if (lastTraining && lastTraining.path) {
      window.location.href = lastTraining.path;
    }
  };

  const handleCompleteEnrollment = () => {
    // Remove the lastSelectedTraining from localStorage
    localStorage.removeItem("lastSelectedTraining");
    // Update state to hide the card
    setLastTraining(null);
  };

  // If no last training data, don't render anything
  if (!lastTraining || !lastTraining.program) {
    return null;
  }

  const { program } = lastTraining;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Continue Your Journey</h2>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
          {program.image && (
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-grow">
          <h3 className="font-medium text-md">{program.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{program.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCompleteEnrollment}
            className="p-2 rounded-full text-green-500 hover:bg-green-50"
            title="Mark as completed"
          >
            <CheckCircle className="h-5 w-5" />
          </button>
          <button
            onClick={handleContinueEnrollment}
            className="px-3 py-2 bg-blue-500 text-white rounded-md flex items-center"
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastTrainingCard;
