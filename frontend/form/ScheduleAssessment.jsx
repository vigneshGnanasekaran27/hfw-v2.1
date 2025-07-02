import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  Globe,
  Home,
  MessageCircle,
  Info,
  Settings,
} from "lucide-react";

const ScheduleTrialSession = ({ formData, setFormData, onSchedulingComplete }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userTimeZone, setUserTimeZone] = useState("UTC");
  const [communityName, setCommunityName] = useState("");
  const [communityError, setCommunityError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showTimeZoneInfo, setShowTimeZoneInfo] = useState(false);

  const isOfflineTraining = formData?.trainingDetails?.mode === "offline";

  useEffect(() => {
    try {
      const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimeZone(localTimeZone);
    } catch (error) {
      console.warn("Failed to get local timezone, falling back to UTC");
      setUserTimeZone("UTC");
    }
  }, []);

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let daysAdded = 0;
    let i = 1;

    // Continue until we have 15 weekdays
    while (daysAdded < 15) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Exclude Saturday (6) and Sunday (0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
        daysAdded++;
      }
      i++;
    }
    return dates;
  };

  const getTimeSlots = () => {
    const morningSlots = [];
    const eveningSlots = [];
    for (let hour = 9; hour <= 18; hour++) {
      const utcDate = new Date();
      utcDate.setUTCHours(hour - 5, 30, 0, 0);
      const localTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: userTimeZone,
      }).format(utcDate);
      const slot = {
        utc: `${String(utcDate.getUTCHours()).padStart(2, "0")}:${String(
          utcDate.getUTCMinutes()
        ).padStart(2, "0")}`,
        local: localTime,
        ist: new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(utcDate),
      };
      if (hour < 12) {
        morningSlots.push(slot);
      } else {
        eveningSlots.push(slot);
      }
    }
    return { morningSlots, eveningSlots };
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return "";
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: userTimeZone,
    }).format(date);
  };

  const formatTimeZone = (timeZone) => {
    try {
      const date = new Date();
      const offset = date
        .toLocaleString("en-US", { timeZone, timeZoneName: "short" })
        .split(" ")
        .pop();
      return `${timeZone.replace(/_/g, " ")} (${offset})`;
    } catch (error) {
      return timeZone.replace(/_/g, " ");
    }
  };

  const validateCommunity = () => {
    if (isOfflineTraining && !communityName.trim()) {
      setCommunityError("Please enter your community name");
      return false;
    }
    setCommunityError("");
    return true;
  };

  const handleSubmit = () => {
    if (!(selectedDate instanceof Date) || isNaN(selectedDate)) {
      console.error("Invalid selectedDate:", selectedDate);
      return;
    }
    if (!selectedTime || !selectedTime.utc || !selectedTime.local || !selectedTime.ist) {
      console.error("Invalid selectedTime:", selectedTime);
      return;
    }

    if (isOfflineTraining && !validateCommunity()) {
      return;
    }

    try {
      setFormData("scheduleInfo.assessmentDate", selectedDate.toISOString());
      setFormData("scheduleInfo.assessmentTime", {
        utc: selectedTime.utc,
        local: selectedTime.local,
        ist: selectedTime.ist,
      });
      setFormData("scheduleInfo.timeZone", userTimeZone);
      setFormData("scheduleInfo.formattedDateTime", `${formatDate(selectedDate)} at ${selectedTime.local}`);
      setFormData("scheduleInfo.timeZoneDisplay", formatTimeZone(userTimeZone));
      setFormData("scheduleInfo.communityName", isOfflineTraining ? communityName : "");

      console.log("Schedule info set:", {
        assessmentDate: selectedDate.toISOString(),
        assessmentTime: selectedTime,
        timeZone: userTimeZone,
        formattedDateTime: `${formatDate(selectedDate)} at ${selectedTime.local}`,
        timeZoneDisplay: formatTimeZone(userTimeZone),
        communityName: isOfflineTraining ? communityName : "",
      });

      if (typeof onSchedulingComplete === "function") {
        onSchedulingComplete();
      } else {
        console.warn("onSchedulingComplete is not a function:", onSchedulingComplete);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && selectedDate) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedTime) {
      if (isOfflineTraining) {
        setCurrentStep(3);
      } else {
        handleSubmit();
      }
    } else if (currentStep === 3 && validateCommunity()) {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const { morningSlots, eveningSlots } = getTimeSlots();

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-purple-800">Schedule Your Free Trial Session</h2>
        <p className="text-gray-600">Book your 45-minute personalized training session</p>
      </div>

      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => setShowTimeZoneInfo(!showTimeZoneInfo)}
          className="text-sm text-purple-600 flex items-center"
        >
          <Settings className="w-4 h-4 mr-1" />
          {formatTimeZone(userTimeZone)}
        </button>
      </div>

      {showTimeZoneInfo && (
        <div className="mb-4 p-3 bg-purple-50 rounded-lg text-sm">
          <div className="flex items-start">
            <Globe className="w-4 h-4 mr-2 text-purple-500 mt-0.5" />
            <div>
              <p>All times are shown in your local time zone</p>
              <p className="text-gray-600 mt-1">Our trainers are based in India (IST)</p>
            </div>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="bg-white rounded-lg p-5 shadow border border-gray-100">
          <div className="flex items-center mb-4">
            <CalendarIcon className="w-5 h-5 mr-2 text-purple-600" />
            <h3 className="text-lg font-semibold">Select a Date</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
            {getAvailableDates().map((date) => (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-lg text-center ${
                  selectedDate && selectedDate.toDateString() === date.toDateString()
                    ? "bg-purple-100 border-2 border-purple-500 text-purple-700"
                    : "bg-gray-50 border border-gray-200 hover:border-purple-300"
                }`}
              >
                <p className="text-xs text-gray-500">{new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)}</p>
                <p className="text-lg font-bold">{date.getDate()}</p>
                <p className="text-xs">{new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={nextStep}
              disabled={!selectedDate}
              className={`px-5 py-2 rounded-lg text-white font-medium flex items-center ${
                selectedDate ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="bg-white rounded-lg p-5 shadow border border-gray-100">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 mr-2 text-purple-600" />
            <h3 className="text-lg font-semibold">Select a Time</h3>
          </div>

          <p className="text-sm text-purple-700 mb-4">
            Selected Date: <span className="font-semibold">{formatDate(selectedDate)}</span>
          </p>

          <div className="space-y-5">
            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="font-medium mb-2 text-orange-700">Morning Slots</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {morningSlots.map((slot) => (
                  <button
                    key={slot.utc}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`p-2 rounded-lg transition-all text-center ${
                      selectedTime?.utc === slot.utc
                        ? "bg-orange-500 text-white"
                        : "bg-white border border-orange-200 hover:bg-orange-100"
                    }`}
                  >
                    {slot.local}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-700">Evening Slots</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {eveningSlots.map((slot) => (
                  <button
                    key={slot.utc}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`p-2 rounded-lg transition-all text-center ${
                      selectedTime?.utc === slot.utc
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-blue-200 hover:bg-blue-100"
                    }`}
                  >
                    {slot.local}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!selectedTime}
              className={`px-5 py-2 rounded-lg text-white font-medium flex items-center ${
                selectedTime ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isOfflineTraining ? "Continue" : "Confirm & Schedule"} <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && isOfflineTraining && (
        <div className="bg-white rounded-lg p-5 shadow border border-gray-100">
          <div className="flex items-center mb-4">
            <Home className="w-5 h-5 mr-2 text-purple-600" />
            <h3 className="text-lg font-semibold">Community Information</h3>
          </div>

          <p className="text-sm text-purple-700 mb-4">
            Selected: <span className="font-semibold">{formatDate(selectedDate)} at {selectedTime?.local}</span>
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-5">
            <div className="mb-4">
              <label htmlFor="communityName" className="block text-sm font-medium text-gray-700 mb-2">
                Community Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="communityName"
                value={communityName}
                onChange={(e) => {
                  setCommunityName(e.target.value);
                  if (e.target.value.trim()) setCommunityError("");
                }}
                placeholder="Enter your gated community name"
                className={`w-full p-2 border rounded-lg ${
                  communityError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {communityError && (
                <p className="mt-1 text-sm text-red-600">{communityError}</p>
              )}
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <Info className="w-4 h-4 mr-2 text-yellow-600 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Currently, offline classes are available from OMR Kelambakkam to Navalur.<br />
                  The address you provided earlier must match this community address.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center"
            >
              Confirm & Schedule <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <MessageCircle className="w-5 h-5 mr-2 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800 mb-1">Important Information</p>
            <p className="text-sm text-blue-700">
              Our trainer will contact you within 15 minutes of submission to confirm your details.
              The scheduled time might change slightly based on availability and your convenience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTrialSession;