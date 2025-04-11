import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  CheckCircle,
  Globe,
  Home,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  Settings,
  Star,
} from "lucide-react";

const ScheduleAssessment = ({
  formData,
  setFormData,
  onSchedulingComplete,
}) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userTimeZone, setUserTimeZone] = useState("UTC");
  const [communityName, setCommunityName] = useState("");
  const [communityError, setCommunityError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showTimeZoneInfo, setShowTimeZoneInfo] = useState(false);

  const isOfflineTraining = formData.trainingDetails.mode === "offline";

  // Automatically detect and set user's timezone on component mount
  useEffect(() => {
    try {
      const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimeZone(localTimeZone);
    } catch (error) {
      console.warn("Failed to get local timezone, falling back to UTC");
      setUserTimeZone("UTC");
    }
  }, []);

  // Get next 14 days for available dates
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Exclude weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  // Generate fixed time slots from 6 AM to 6 PM IST
  const getFixedTimeSlots = () => {
    const slots = [];
    // 6 AM to 6 PM IST
    for (let hour = 6; hour <= 18; hour++) {
      const istTime = `${String(hour).padStart(2, "0")}:00`;

      // Convert IST to UTC for internal handling
      const utcDate = new Date();
      utcDate.setUTCHours(hour - 5, 30, 0, 0); // IST is UTC+5:30

      const localTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: userTimeZone,
      }).format(utcDate);

      const period = hour < 12 ? "Morning" : "Evening";

      slots.push({
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
        period: period,
      });
    }
    return slots;
  };

  const formatDate = (date) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: userTimeZone,
      }).format(date);
    } catch (error) {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(date);
    }
  };

  const formatTimeZoneDisplay = (timeZone) => {
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

  const validateCommunityName = () => {
    if (isOfflineTraining && !communityName.trim()) {
      setCommunityError("Please enter your community name for offline training");
      return false;
    }
    setCommunityError("");
    return true;
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    
    if (isOfflineTraining && !validateCommunityName()) {
      return;
    }

    // Update formData with scheduling information
    const updatedFormData = {
      ...formData,
      scheduleInfo: {
        assessmentDate: selectedDate.toISOString(),
        assessmentTime: {
          utc: selectedTime.utc,
          local: selectedTime.local,
          ist: selectedTime.ist,
        },
        timeZone: userTimeZone,
        formattedDateTime: `${formatDate(selectedDate)} at ${
          selectedTime.local
        }`,
        timeZoneDisplay: formatTimeZoneDisplay(userTimeZone),
        communityName: isOfflineTraining ? communityName : "",
      },
    };

    setFormData(updatedFormData);
    onSchedulingComplete();
  };

  const nextStep = () => {
    if (currentStep === 1 && selectedDate) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedTime) {
      if (isOfflineTraining) {
        setCurrentStep(3);
      } else {
        setCurrentStep(4);
      }
    } else if (currentStep === 3 && validateCommunityName()) {
      setCurrentStep(4);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Group dates by week for a more organized display
  const getDatesByWeek = () => {
    const allDates = getAvailableDates();
    const weeks = [];
    let currentWeek = [];
    
    allDates.forEach((date, index) => {
      currentWeek.push(date);
      
      // Start a new week every 5 days (weekdays only)
      if ((index + 1) % 5 === 0 || index === allDates.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    return weeks;
  };

  const morningSlots = getFixedTimeSlots().filter(slot => slot.period === "Morning");
  const eveningSlots = getFixedTimeSlots().filter(slot => slot.period === "Evening");

  return (
    <div className="max-w-4xl mx-auto pt-8 pb-16 px-4">
      {/* Header with Progress Indicator */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-purple-800">Schedule Your Free Trial Session</h1>
        <p className="text-gray-600 mb-6">Experience a 45-minute personalized training session</p>
        
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              1
            </div>
            <div className="text-xs font-medium mt-1 md:ml-1">Date</div>
          </div>
          <div className={`w-8 h-0.5 mx-1 ${currentStep >= 2 ? "bg-purple-600" : "bg-gray-200"}`}></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              2
            </div>
            <div className="text-xs font-medium mt-1 md:ml-1">Time</div>
          </div>
          {isOfflineTraining && (
            <>
              <div className={`w-8 h-0.5 mx-1 ${currentStep >= 3 ? "bg-purple-600" : "bg-gray-200"}`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  3
                </div>
                <div className="text-xs font-medium mt-1 md:ml-1">Location</div>
              </div>
            </>
          )}
          <div className={`w-8 h-0.5 mx-1 ${currentStep >= 4 ? "bg-purple-600" : "bg-gray-200"}`}></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 4 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              {isOfflineTraining ? "4" : "3"}
            </div>
            <div className="text-xs font-medium mt-1 md:ml-1">Confirm</div>
          </div>
        </div>
      </div>

      {/* Time Zone Information */}
      <div className="mb-4 flex items-center justify-end">
        <button 
          onClick={() => setShowTimeZoneInfo(!showTimeZoneInfo)}
          className="text-sm text-purple-600 flex items-center"
        >
          <Settings className="w-4 h-4 mr-1" />
          {formatTimeZoneDisplay(userTimeZone)}
          {showTimeZoneInfo ? <ChevronDown className="w-4 h-4 ml-1" /> : <ChevronRight className="w-4 h-4 ml-1" />}
        </button>
      </div>
      
      {showTimeZoneInfo && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg text-sm">
          <div className="flex items-start">
            <Globe className="w-5 h-5 mr-2 text-purple-500 mt-0.5" />
            <div>
              <p className="font-medium">All times are shown in your local time zone: {formatTimeZoneDisplay(userTimeZone)}</p>
              <p className="text-gray-600 mt-1">Our trainers are based in India (IST). Your selected time will be automatically converted.</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Date Selection */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fadeIn">
          <div className="flex items-center mb-6">
            <CalendarIcon className="w-5 h-5 mr-2 text-purple-600" />
            <h2 className="text-xl font-semibold">Select a Date</h2>
          </div>
          
          {getDatesByWeek().map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Week {weekIndex + 1}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {week.map((date) => (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg text-center transition-all ${
                      selectedDate && selectedDate.toDateString() === date.toDateString()
                        ? "bg-purple-100 border-2 border-purple-500 text-purple-700 shadow-md"
                        : "bg-gray-50 border border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                    }`}
                  >
                    <p className="text-xs text-gray-500">{new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)}</p>
                    <p className="text-lg font-bold">{date.getDate()}</p>
                    <p className="text-xs">{new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={nextStep}
              disabled={!selectedDate}
              className={`px-6 py-3 rounded-lg text-white font-medium flex items-center ${
                selectedDate ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Continue to Time Selection <ChevronRight className="ml-1 w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Time Selection */}
      {currentStep === 2 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fadeIn">
          <div className="flex items-center mb-6">
            <Clock className="w-5 h-5 mr-2 text-purple-600" />
            <h2 className="text-xl font-semibold">Select a Time</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-purple-700 mb-2">Selected Date: <span className="font-semibold">{formatDate(selectedDate)}</span></p>
          </div>
          
          <div className="space-y-6">
            {/* Morning Slots */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center text-orange-700">
                <Star className="w-4 h-4 mr-2" />
                Morning Slots
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {morningSlots.map((slot) => (
                  <button
                    key={slot.utc}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-3 rounded-lg transition-all text-center ${
                      selectedTime?.utc === slot.utc
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-white border border-orange-200 hover:border-orange-300 hover:bg-orange-100"
                    }`}
                  >
                    {slot.local}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Evening Slots */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center text-blue-700">
                <Star className="w-4 h-4 mr-2" />
                Evening Slots
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {eveningSlots.map((slot) => (
                  <button
                    key={slot.utc}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-3 rounded-lg transition-all text-center ${
                      selectedTime?.utc === slot.utc
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-white border border-blue-200 hover:border-blue-300 hover:bg-blue-100"
                    }`}
                  >
                    {slot.local}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium flex items-center hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!selectedTime}
              className={`px-6 py-3 rounded-lg text-white font-medium flex items-center ${
                selectedTime ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isOfflineTraining ? "Continue to Location" : "Review & Confirm"} <ChevronRight className="ml-1 w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Community Information (for offline training) */}
      {currentStep === 3 && isOfflineTraining && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fadeIn">
          <div className="flex items-center mb-6">
            <Home className="w-5 h-5 mr-2 text-purple-600" />
            <h2 className="text-xl font-semibold">Enter Community Information</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-purple-700 text-sm">
              Selected Date & Time: <span className="font-semibold">{formatDate(selectedDate)} at {selectedTime.local}</span>
            </p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg mb-6">
            <p className="text-sm text-gray-700 mb-4">
              For offline training sessions, our trainer will meet you at your community gym. Please provide the details below:
            </p>
            
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
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  communityError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {communityError && (
                <p className="mt-1 text-sm text-red-600">{communityError}</p>
              )}
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> Offline training is available only in gated communities with gym facilities.
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium flex items-center hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-3 rounded-lg text-white font-medium flex items-center bg-purple-600 hover:bg-purple-700"
            >
              Review & Confirm <ChevronRight className="ml-1 w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Confirm */}
      {currentStep === 4 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fadeIn">
          <div className="flex items-center mb-6">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            <h2 className="text-xl font-semibold">Review & Confirm</h2>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl mb-6 border border-purple-100">
            <h3 className="text-lg font-bold mb-4 text-purple-800">Your Selected Schedule</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  {formatDate(selectedDate)} at {selectedTime.local}
                </p>
                
                <p className="text-sm text-gray-500 mb-1">Time Zone</p>
                <p className="text-base font-medium text-gray-800 mb-4">
                  {formatTimeZoneDisplay(userTimeZone)}
                </p>
                
                <p className="text-sm text-gray-500 mb-1">Time in IST (India)</p>
                <p className="text-base font-medium text-gray-800">
                  {selectedTime.ist}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Session Type</p>
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  {isOfflineTraining ? "Offline (In-person)" : "Online"} Training
                </p>
                
                {isOfflineTraining && (
                  <>
                    <p className="text-sm text-gray-500 mb-1">Community Name</p>
                    <p className="text-base font-medium text-gray-800 mb-4">
                      {communityName}
                    </p>
                  </>
                )}
                
                <p className="text-sm text-gray-500 mb-1">Session Duration</p>
                <p className="text-base font-medium text-gray-800">
                  45 minutes (Free Trial)
                </p>
              </div>
            </div>
          </div>
          
          {/* Important Information */}
          <div className="bg-yellow-50 rounded-lg p-5 mb-6 border border-yellow-200">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
              <MessageCircle className="w-5 h-5 mr-2" />
              Important Information
            </h3>
            <ul className="space-y-2 text-yellow-800">
              <li className="flex items-start">
                <div className="mr-2 mt-1">•</div>
                <div>Our trainer will contact you via WhatsApp before the trial class to confirm your details.</div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1">•</div>
                <div>The scheduled time may be adjusted based on trainer availability and your convenience.</div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1">•</div>
                <div>Please be ready 5 minutes before the scheduled time.</div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1">•</div>
                <div>{isOfflineTraining ? "The trainer will meet you at your community gym" : "A Google Meet link will be sent to your email"}</div>
              </li>
            </ul>
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium flex items-center hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center"
            >
              Confirm and Schedule <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      
      {/* Add animation keyframes and other styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ScheduleAssessment;