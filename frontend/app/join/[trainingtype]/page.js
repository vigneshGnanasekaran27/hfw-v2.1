"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EncouragementModal } from "@/components/EncouragementModal";
import ReviewInformation from "@/form/ReviewInformation";
import StatusPopup from "@/form/SuccessPopup";
import ScheduleAssessment from "@/form/ScheduleAssessment";

const parseQueryString = (url) => {
  try {
    // Extract the query string part after 'join/'
    const queryPart = url.split("join/")[1];
    if (!queryPart) return null;

    // Split the query string into key-value pairs
    const params = {};
    queryPart.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      if (key && value) {
        params[key] = decodeURIComponent(value);
      }
    });

    return params;
  } catch (error) {
    console.error("Error parsing URL:", error);
    return null;
  }
};

const JoinForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);

  const [popupState, setPopupState] = useState({
    show: false,
    status: "success",
    errorMessage: "",
    trainingtype: "",
  });

  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      height: "",
      heightUnit: "cm",
      weight: "",
      weightUnit: "kg",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    fitnessGoals: {
      targetWeight: "",
      targetWeightUnit: "kg",
      targetBodyFat: "",
      specificGoals: [],
      timeline: "",
      weeklyDays: "",
      additionalNotes: "",
    },
    activityLevel: {
      exerciseTypes: [],
      trainingDaysPerWeek: "",
      workoutDuration: "",
      isCurrentlyActive: true,
    },
    healthInfo: {
      noHealthConditions: false,
      healthConditions: [],
      otherHealthCondition: "",
      pastInjuries: "",
      medications: "",
      allergies: "",
    },
    nutritionInfo: {
      dietaryPreference: "",
      otherDietaryPreference: "",
      waterIntake: "",
      mealsPerDay: "",
      foodRestrictions: "",
      supplements: "",
    },
    lifestyle: {
      sleepDuration: "",
      stressLevel: "",
      smoking: "",
      alcohol: "",
      occupationType: "",
    },
    trainingDetails: {
      mode: "", // online/offline
      type: "", // group/one-on-one
      programName: "",
    },
    scheduleInfo: {
      assessmentDate: "",
      assessmentTime: {
        utc: "",
        local: "",
        ist: "",
      },
      timeZone: "",
      formattedDateTime: "",
      timeZoneDisplay: "",
      communityName: "",
    },
  });

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;
    // Or use the hardcoded URL for testing
    // const currentUrl = "http://localhost:3001/join/mode=online&type=group&program=mobility-stretching-program";

    const queryParams = parseQueryString(currentUrl);

    if (queryParams) {
      setFormData((prevState) => ({
        ...prevState,
        trainingDetails: {
          ...prevState.trainingDetails,
          mode: queryParams.mode || "",
          type: queryParams.type || "",
          programName: queryParams.program || "",
        },
      }));
      if (queryParams.program) {
        setPopupState((prevState) => ({
          ...prevState,
          trainingtype: queryParams.program,
        }));
      }
    }
  }, []);

  const handleFormSubmit = async (e) => {
    if (step < 7) return;
    e.preventDefault();
    console.log("Form submitted with training details:", formData);

    setShowScheduler(true);
  };

  const handleSubmit = async (e) => {
    if (step < 7) return;
    e.preventDefault();
    console.log("Form submitted with training details:", formData);

    setPopupState({
      show: true,
      status: "success",
      errorMessage: "",
      trainingtype: popupState.trainingtype,
    });

    //  const API_URL = "http://localhost:3000/api/v1/training_enrollment_forms";
    //  const token = localStorage.getItem("token");

    //  const payload = {
    //    training_enrollment_form: {
    //      personal_info: formData.personalInfo,
    //      fitness_goals: formData.fitnessGoals,
    //      activity_level: formData.activityLevel,
    //      health_info: formData.healthInfo,
    //      nutrition_info: formData.nutritionInfo,
    //      lifestyle: formData.lifestyle,
    //    },
    //  };

    //  try {
    //    const response = await fetch(API_URL, {
    //      method: "POST",
    //      headers: {
    //        "Content-Type": "application/json",
    //        Authorization: `Bearer ${token}`,
    //      },
    //      body: JSON.stringify(payload),
    //    });

    //    if (!response.ok) {
    //      throw new Error(`Submission failed with status: ${response.status}`);
    //    }

    //    const data = await response.json();
    //    console.log("Success:", data);
    //    setPopupState({
    //      show: true,
    //      status: "success",
    //      errorMessage: "",
    //    });
    //  } catch (error) {
    //    console.error("Error:", error);
    //    setPopupState({
    //      show: true,
    //      status: "error",
    //      errorMessage: error.message,
    //    });
    //  }
  };

  const handleFinalSubmission = async (scheduleInfo) => {
    console.log("Form submitted with training details:", formData);
    setPopupState({
      show: true,
      status: "success",
      errorMessage: "",
      // trainingtype: formData.trainingDetails.type,
    });

    // try {
    //   const API_URL = "your-api-endpoint";
    //   const token = localStorage.getItem("token");

    //   const payload = {
    //     training_enrollment_form: {
    //       personal_info: formData.personalInfo,
    //       fitness_goals: formData.fitnessGoals,
    //       activity_level: formData.activityLevel,
    //       health_info: formData.healthInfo,
    //       nutrition_info: formData.nutritionInfo,
    //       lifestyle: formData.lifestyle,
    //       training_details: formData.trainingDetails,
    //       schedule_info: scheduleInfo,
    //     },
    //   };

    //   const response = await fetch(API_URL, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Submission failed with status: ${response.status}`);
    //   }

    //   setPopupState({
    //     show: true,
    //     status: "success",
    //     errorMessage: "",
    //     trainingtype: formData.trainingDetails.type,
    //   });
    // } catch (error) {
    //   setPopupState({
    //     show: true,
    //     status: "error",
    //     errorMessage: error.message,
    //     trainingtype: formData.trainingDetails.type,
    //   });
    // }
  };
  useEffect(() => {
    // Small delay to ensure smooth mounting
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const steps = [
    "Personal Info",
    "Fitness Goals",
    "Activity Level",
    "Health Info",
    "Nutrition",
    "Lifestyle",
    "Schedule Trial",
    "Overview",
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validatePersonalInfo = () => {
    const newErrors = {};
    const { personalInfo } = formData;

    // Required field validation
    if (!personalInfo.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!personalInfo.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(personalInfo.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!personalInfo.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(personalInfo.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!personalInfo.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!personalInfo.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!personalInfo.height) {
      newErrors.height = "Height is required";
    }

    if (!personalInfo.weight) {
      newErrors.weight = "Weight is required";
    }

    if (!personalInfo.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    }

    if (!personalInfo.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!personalInfo.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!personalInfo.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    if (!personalInfo.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFitnessGoals = () => {
    const newErrors = {};
    const { fitnessGoals } = formData;

    if (
      !fitnessGoals.specificGoals ||
      fitnessGoals.specificGoals.length === 0
    ) {
      newErrors.specificGoals = "Please select at least one fitness goal";
    }
    if (!fitnessGoals.timeline) {
      newErrors.timeline = "Please select a timeline";
    }
    if (!fitnessGoals.weeklyDays) {
      newErrors.weeklyDays = "Please select weekly training days";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateActivityLevel = () => {
    const newErrors = {};
    const { activityLevel } = formData;

    if (activityLevel.isCurrentlyActive) {
      if (
        !activityLevel.exerciseTypes ||
        activityLevel.exerciseTypes.length === 0
      ) {
        newErrors.exerciseTypes = "Please select at least one exercise type";
      }
      if (!activityLevel.trainingDaysPerWeek) {
        newErrors.trainingDaysPerWeek = "Please select training days per week";
      }
      if (!activityLevel.workoutDuration) {
        newErrors.workoutDuration = "Please select workout duration";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateHealthInfo = () => {
    const newErrors = {};
    const { healthInfo } = formData;

    // If they haven't checked "no health conditions"
    if (!healthInfo.noHealthConditions) {
      // They must select at least one health condition or specify "Other"
      if (
        !healthInfo.healthConditions ||
        healthInfo.healthConditions.length === 0
      ) {
        newErrors.healthConditions =
          "Please select at least one health condition or check 'no health conditions'";
      }

      // If "Other" is selected, they must specify
      if (
        healthInfo.healthConditions.includes("Other") &&
        !healthInfo.otherHealthCondition.trim()
      ) {
        newErrors.otherHealthCondition =
          "Please specify your other health condition";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNutritionInfo = () => {
    const newErrors = {};
    const { nutritionInfo } = formData;

    if (!nutritionInfo.dietaryPreference) {
      newErrors.dietaryPreference = "Please select your dietary preference";
    }

    if (
      nutritionInfo.dietaryPreference === "other" &&
      !nutritionInfo.otherDietaryPreference
    ) {
      newErrors.otherDietaryPreference =
        "Please specify your dietary preference";
    }

    if (!nutritionInfo.mealsPerDay) {
      newErrors.mealsPerDay = "Please select your meals per day";
    }

    // Optional but if filled, validate
    if (
      nutritionInfo.waterIntake &&
      (isNaN(nutritionInfo.waterIntake) || nutritionInfo.waterIntake < 0)
    ) {
      newErrors.waterIntake = "Please enter a valid water intake amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLifestyle = () => {
    const newErrors = {};
    const { lifestyle } = formData;

    // All fields in lifestyle are required for a complete assessment
    if (!lifestyle.sleepDuration) {
      newErrors.sleepDuration = "Please select your average sleep duration";
    }
    if (!lifestyle.stressLevel) {
      newErrors.stressLevel = "Please select your stress level";
    }
    if (!lifestyle.smoking) {
      newErrors.smoking = "Please select your smoking status";
    }
    if (!lifestyle.alcohol) {
      newErrors.alcohol = "Please select your alcohol consumption";
    }
    if (!lifestyle.occupationType) {
      newErrors.occupationType = "Please select your occupation type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const StepIndicator = () => {
    return (
      <div className="w-full mb-8">
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200">
              <div
                className="absolute h-full bg-purple-600 transition-all duration-300"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
            <div className="relative flex justify-between">
              {steps.map((stepLabel, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index + 1 <= step
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    } mb-2 transition-colors duration-300`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs text-gray-600 text-center w-20">
                    {stepLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">
              Step {step} of {steps.length}
            </span>
            <span className="text-sm font-medium">{steps[step - 1]}</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleNextStep = () => {
    if (step === 1) {
      // if (validatePersonalInfo()) {
      setStep(step + 1);
      // } else {
      // scrollToFirstError();
      // }
    } else if (step === 2) {
      // if (validateFitnessGoals()) {
      setStep(step + 1);
      // } else {
      // scrollToFirstError();
      // }
    } else if (step === 3) {
      // if (validateActivityLevel()) {
      setStep(step + 1);
      // } else {
      // scrollToFirstError();
      // }
    } else if (step === 4) {
      // if (validateHealthInfo()) {
      setStep(step + 1);
      // } else {
      // scrollToFirstError();
      // }
    } else if (step === 5) {
      // if (validateNutritionInfo()) {
      setStep(step + 1);
      // } else {
      // scrollToFirstError();
      // }
    } else if (step === 6) {
      // if (validateLifestyle()) {
      setStep(step + 1);
      // } else {
      // scrollToFirstError();
      // }
    }
  };

  // Function to scroll to the first error message
  const scrollToFirstError = () => {
    const firstError = document.querySelector(".error-message");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleActivityStatusChange = (isActive) => {
    setFormData((prev) => ({
      ...prev,
      activityLevel: {
        ...prev.activityLevel,
        isCurrentlyActive: isActive,
        exerciseTypes: isActive ? prev.activityLevel.exerciseTypes : [],
        trainingDaysPerWeek: isActive
          ? prev.activityLevel.trainingDaysPerWeek
          : "",
        workoutDuration: isActive ? prev.activityLevel.workoutDuration : "",
      },
    }));
  };

  // Modify handleInputChange to clear errors when user types
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    // Clear the error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleCheckboxChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].includes(value)
          ? prev[section][field].filter((item) => item !== value)
          : [...prev[section][field], value],
      },
    }));
  };

  const commonHealthConditions = [
    "High Blood Pressure",
    "Diabetes",
    "Heart Condition",
    "Asthma/Breathing Issues",
    "Back Pain",
    "Joint Pain/Arthritis",
    "Recent Surgery",
    "Pregnancy",
    "Dizziness/Balance Issues",
    "Chronic Pain",
    "Anxiety/Depression",
    "Other",
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {showModal && (
              <EncouragementModal onClose={() => setShowModal(false)} />
            )}
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.name}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "name", e.target.value)
                  }
                  className={`w-full p-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "email", e.target.value)
                  }
                  className={`w-full p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "phone", e.target.value)
                  }
                  className={`w-full p-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date of Birth<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange(
                      "personalInfo",
                      "dateOfBirth",
                      e.target.value
                    )
                  }
                  className={`w-full p-2 border ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  required
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.personalInfo.gender}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "gender", e.target.value)
                  }
                  className={`w-full p-2 border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.gender}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Height<span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.personalInfo.height}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "height",
                          e.target.value
                        )
                      }
                      className={`w-full p-2 border ${
                        errors.height ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      required
                    />
                    <select
                      value={formData.personalInfo.heightUnit}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "heightUnit",
                          e.target.value
                        )
                      }
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="cm">cm</option>
                      <option value="inches">inches</option>
                    </select>
                  </div>
                  {errors.height && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.height}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Weight<span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.personalInfo.weight}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "weight",
                          e.target.value
                        )
                      }
                      className={`w-full p-2 border ${
                        errors.weight ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      required
                    />
                    <select
                      value={formData.personalInfo.weightUnit}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "weightUnit",
                          e.target.value
                        )
                      }
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                  {errors.weight && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.weight}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Fields */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Street Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.streetAddress}
                  onChange={(e) =>
                    handleInputChange(
                      "personalInfo",
                      "streetAddress",
                      e.target.value
                    )
                  }
                  className={`w-full p-2 border ${
                    errors.streetAddress ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  required
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.streetAddress}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.city}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "city", e.target.value)
                  }
                  className={`w-full p-2 border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  required
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.city}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  State/Province<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.state}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "state", e.target.value)
                  }
                  className={`w-full p-2 border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  required
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.state}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Postal Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.postalCode}
                  onChange={(e) =>
                    handleInputChange(
                      "personalInfo",
                      "postalCode",
                      e.target.value
                    )
                  }
                  className={`w-full p-2 border ${
                    errors.postalCode ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  required
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.postalCode}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Country<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.country}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "country", e.target.value)
                  }
                  className={`w-full p-2 border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  required
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.country}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Fitness Goals</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Target Weight (if applicable)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.fitnessGoals.targetWeight}
                      onChange={(e) =>
                        handleInputChange(
                          "fitnessGoals",
                          "targetWeight",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter target weight"
                    />
                    <select
                      value={formData.fitnessGoals.targetWeightUnit}
                      onChange={(e) =>
                        handleInputChange(
                          "fitnessGoals",
                          "targetWeightUnit",
                          e.target.value
                        )
                      }
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Target Body Fat %
                  </label>
                  <select
                    value={formData.fitnessGoals.targetBodyFat}
                    onChange={(e) =>
                      handleInputChange(
                        "fitnessGoals",
                        "targetBodyFat",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Target Body Fat %</option>
                    <optgroup label="For Men">
                      <option value="essential-men">
                        Essential Fat (2-5%)
                      </option>
                      <option value="athletes-men">Athletes (6-13%)</option>
                      <option value="fitness-men">Fitness (14-17%)</option>
                      <option value="acceptable-men">
                        Acceptable (18-24%)
                      </option>
                    </optgroup>
                    <optgroup label="For Women">
                      <option value="essential-women">
                        Essential Fat (10-13%)
                      </option>
                      <option value="athletes-women">Athletes (14-20%)</option>
                      <option value="fitness-women">Fitness (21-24%)</option>
                      <option value="acceptable-women">
                        Acceptable (25-31%)
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Primary Goal
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Strength & Performance",
                    "Muscle Gain",
                    "Fat Loss",
                    "Endurance Training",
                    "Flexibility & Mobility",
                    "General Fitness",
                    "Rehabilitation",
                    "Reduce stress",
                    "Better sleep quality",
                  ].map((goal) => (
                    <div key={goal} className="flex items-center">
                      <input
                        type="checkbox"
                        id={goal.toLowerCase().replace(/\s+/g, "-")}
                        value={goal}
                        checked={formData.fitnessGoals.specificGoals?.includes(
                          goal
                        )}
                        onChange={(e) => {
                          const goals =
                            formData.fitnessGoals.specificGoals || [];
                          const newGoals = e.target.checked
                            ? [...goals, goal]
                            : goals.filter((g) => g !== goal);
                          handleInputChange(
                            "fitnessGoals",
                            "specificGoals",
                            newGoals
                          );
                        }}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={goal.toLowerCase().replace(/\s+/g, "-")}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {goal}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.specificGoals && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.specificGoals}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Timeline
                  </label>
                  <select
                    value={formData.fitnessGoals.timeline}
                    onChange={(e) =>
                      handleInputChange(
                        "fitnessGoals",
                        "timeline",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Timeline</option>
                    <option value="1month">1 month</option>
                    <option value="3months">3 months</option>
                    <option value="6months">6 months</option>
                    <option value="12months">12 months</option>
                    <option value="ongoing">Ongoing/Lifestyle Change</option>
                  </select>
                  {errors.timeline && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.timeline}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Weekly Training Days
                  </label>
                  <select
                    value={formData.fitnessGoals.weeklyDays}
                    onChange={(e) =>
                      handleInputChange(
                        "fitnessGoals",
                        "weeklyDays",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Weekly Days</option>
                    <option value="2days">2 days/week</option>
                    <option value="3days">3 days/week</option>
                    <option value="4days">4 days/week</option>
                    <option value="5days">5 days/week</option>
                    <option value="6days">6 days/week</option>
                    <option value="7days">7 days/week</option>
                  </select>
                  {errors.weeklyDays && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.weeklyDays}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={formData.fitnessGoals.additionalNotes}
                  onChange={(e) =>
                    handleInputChange(
                      "fitnessGoals",
                      "additionalNotes",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                  placeholder="Any specific concerns, limitations, or preferences you'd like to share?"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Current Activity & Fitness Level
            </h2>

            <div className="space-y-4">
              {/* Activity Status Selection */}

              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">
                  Current Activity Status
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={formData.activityLevel.isCurrentlyActive}
                      onChange={() => handleActivityStatusChange(true)}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-sm">Currently Exercising</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={!formData.activityLevel.isCurrentlyActive}
                      onChange={() => handleActivityStatusChange(false)}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-sm">Not Currently Exercising</span>
                  </label>
                </div>
              </div>

              {/* Exercise Options - Only shown if currently active */}
              {formData.activityLevel.isCurrentlyActive && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Exercise Types (Check all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Cardio",
                        "Strength Training",
                        "Yoga",
                        "Sports",
                        "Dancing",
                        "Other",
                      ].map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={formData.activityLevel.exerciseTypes.includes(
                              type
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                "activityLevel",
                                "exerciseTypes",
                                type
                              )
                            }
                            className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                          />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.exerciseTypes && (
                      <p className="text-red-500 text-sm mt-1 error-message">
                        {errors.exerciseTypes}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Training Days per Week
                      </label>
                      <select
                        value={formData.activityLevel.trainingDaysPerWeek}
                        onChange={(e) =>
                          handleInputChange(
                            "activityLevel",
                            "trainingDaysPerWeek",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Days</option>
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                          <option key={day} value={day}>
                            {day} days
                          </option>
                        ))}
                      </select>
                      {errors.trainingDaysPerWeek && (
                        <p className="text-red-500 text-sm mt-1 error-message">
                          {errors.trainingDaysPerWeek}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Workout Duration
                      </label>
                      <select
                        value={formData.activityLevel.workoutDuration}
                        onChange={(e) =>
                          handleInputChange(
                            "activityLevel",
                            "workoutDuration",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select Duration</option>
                        <option value="30min">30 minutes</option>
                        <option value="45min">45 minutes</option>
                        <option value="60min">60 minutes</option>
                        <option value="90min">90 minutes</option>
                        <option value="more">More than 90 minutes</option>
                      </select>
                      {errors.workoutDuration && (
                        <p className="text-red-500 text-sm mt-1 error-message">
                          {errors.workoutDuration}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Health Information</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    checked={formData.healthInfo.noHealthConditions}
                    onChange={(e) =>
                      handleInputChange(
                        "healthInfo",
                        "noHealthConditions",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium">
                    I don't have any serious health conditions
                  </span>
                </label>

                {!formData.healthInfo.noHealthConditions && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Health Conditions (Check all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {commonHealthConditions.map((condition) => (
                          <label
                            key={condition}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={formData.healthInfo.healthConditions.includes(
                                condition
                              )}
                              onChange={() =>
                                handleCheckboxChange(
                                  "healthInfo",
                                  "healthConditions",
                                  condition
                                )
                              }
                              className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                            />
                            <span className="text-sm">{condition}</span>
                          </label>
                        ))}
                      </div>
                      {errors.healthConditions && (
                        <p className="text-red-500 text-sm mt-1 error-message">
                          {errors.healthConditions}
                        </p>
                      )}
                    </div>

                    {formData.healthInfo.healthConditions.includes("Other") && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Other Health Condition
                        </label>
                        <input
                          type="text"
                          value={formData.healthInfo.otherHealthCondition}
                          onChange={(e) =>
                            handleInputChange(
                              "healthInfo",
                              "otherHealthCondition",
                              e.target.value
                            )
                          }
                          placeholder="Please specify any other health conditions"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        {errors.otherHealthCondition && (
                          <p className="text-red-500 text-sm mt-1 error-message">
                            {errors.otherHealthCondition}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Past Injuries
                    </label>
                    <textarea
                      value={formData.healthInfo.pastInjuries}
                      onChange={(e) =>
                        handleInputChange(
                          "healthInfo",
                          "pastInjuries",
                          e.target.value
                        )
                      }
                      placeholder="List any significant injuries that might affect your exercise (if none, leave blank)"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Current Medications
                    </label>
                    <textarea
                      value={formData.healthInfo.medications}
                      onChange={(e) =>
                        handleInputChange(
                          "healthInfo",
                          "medications",
                          e.target.value
                        )
                      }
                      placeholder="List any medications you're currently taking (if none, leave blank)"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Allergies
                    </label>
                    <textarea
                      value={formData.healthInfo.allergies}
                      onChange={(e) =>
                        handleInputChange(
                          "healthInfo",
                          "allergies",
                          e.target.value
                        )
                      }
                      placeholder="List any significant allergies (if none, leave blank)"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Nutrition Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Dietary Preference
                </label>
                <select
                  value={formData.nutritionInfo.dietaryPreference}
                  onChange={(e) =>
                    handleInputChange(
                      "nutritionInfo",
                      "dietaryPreference",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Preference</option>
                  <option value="omnivore">Non-Vegetarian/Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                  <option value="other">Other</option>
                </select>
                {errors.dietaryPreference && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.dietaryPreference}
                  </p>
                )}
              </div>
              {formData.nutritionInfo.dietaryPreference === "other" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Other Dietary Preference
                  </label>
                  <input
                    type="text"
                    value={formData.nutritionInfo.otherDietaryPreference}
                    onChange={(e) =>
                      handleInputChange(
                        "nutritionInfo",
                        "otherDietaryPreference",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {errors.otherDietaryPreference && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.otherDietaryPreference}
                    </p>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Daily Water Intake (Liters)
                  </label>
                  <input
                    type="number"
                    value={formData.nutritionInfo.waterIntake}
                    onChange={(e) =>
                      handleInputChange(
                        "nutritionInfo",
                        "waterIntake",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    step="0.1"
                  />
                  {errors.waterIntake && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.waterIntake}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Meals per Day
                  </label>
                  <select
                    value={formData.nutritionInfo.mealsPerDay}
                    onChange={(e) =>
                      handleInputChange(
                        "nutritionInfo",
                        "mealsPerDay",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Number of Meals</option>
                    {[2, 3, 4, 5, 6].map((meals) => (
                      <option key={meals} value={meals}>
                        {meals} meals
                      </option>
                    ))}
                  </select>
                  {errors.mealsPerDay && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.mealsPerDay}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Food Restrictions/Allergies
                </label>
                <textarea
                  value={formData.nutritionInfo.foodRestrictions}
                  onChange={(e) =>
                    handleInputChange(
                      "nutritionInfo",
                      "foodRestrictions",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Supplements
                </label>
                <textarea
                  value={formData.nutritionInfo.supplements}
                  onChange={(e) =>
                    handleInputChange(
                      "nutritionInfo",
                      "supplements",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={2}
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Lifestyle Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Average Sleep Duration
                  </label>
                  <select
                    value={formData.lifestyle.sleepDuration}
                    onChange={(e) =>
                      handleInputChange(
                        "lifestyle",
                        "sleepDuration",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Hours</option>
                    {[
                      "Less than 5",
                      "5-6",
                      "6-7",
                      "7-8",
                      "8-9",
                      "More than 9",
                    ].map((hours) => (
                      <option key={hours} value={hours}>
                        {hours} hours
                      </option>
                    ))}
                  </select>
                  {errors.sleepDuration && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.sleepDuration}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Stress Level
                  </label>
                  <select
                    value={formData.lifestyle.stressLevel}
                    onChange={(e) =>
                      handleInputChange(
                        "lifestyle",
                        "stressLevel",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Level</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="veryHigh">Very High</option>
                  </select>
                  {errors.stressLevel && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.stressLevel}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Smoking Status
                  </label>
                  <select
                    value={formData.lifestyle.smoking}
                    onChange={(e) =>
                      handleInputChange("lifestyle", "smoking", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="never">Never Smoked</option>
                    <option value="former">Former Smoker</option>
                    <option value="occasional">Occasional Smoker</option>
                    <option value="regular">Regular Smoker</option>
                  </select>
                  {errors.smoking && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.smoking}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Alcohol Consumption
                  </label>
                  <select
                    value={formData.lifestyle.alcohol}
                    onChange={(e) =>
                      handleInputChange("lifestyle", "alcohol", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Frequency</option>
                    <option value="never">Never</option>
                    <option value="occasional">Occasional</option>
                    <option value="moderate">Moderate</option>
                    <option value="regular">Regular</option>
                  </select>
                  {errors.alcohol && (
                    <p className="text-red-500 text-sm mt-1 error-message">
                      {errors.alcohol}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Occupation Type
                </label>
                <select
                  value={formData.lifestyle.occupationType}
                  onChange={(e) =>
                    handleInputChange(
                      "lifestyle",
                      "occupationType",
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Type</option>
                  <option value="sedentary">Sedentary (Desk Job)</option>
                  <option value="lightlyActive">Lightly Active</option>
                  <option value="moderatelyActive">Moderately Active</option>
                  <option value="highlyActive">Highly Active</option>
                </select>
                {errors.occupationType && (
                  <p className="text-red-500 text-sm mt-1 error-message">
                    {errors.occupationType}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 7:
        // New Schedule Assessment step
        return (
          <ScheduleAssessment
            formData={formData}
            setFormData={setFormData}
            onSchedulingComplete={() => setStep(step + 1)}
          />
        );
      case 8:
        // Overview (moved from step 7 to step 8)
        return <ReviewInformation formData={formData} />;
      default:
        return null;
    }
  };

  console.log("step", step);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <>
        <StepIndicator currentStep={step} steps={steps} />
        {renderStep()}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Previous
            </button>
          )}
          {step < 8 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className={`px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                step === 7 ? "hidden" : ""
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Submit
            </button>
          )}
        </div>
      </>

      <StatusPopup
        isOpen={popupState.show}
        status={popupState.status}
        errorMessage={popupState.errorMessage}
        trainingtype={popupState.trainingtype}
        onClose={() =>
          setPopupState({ show: false, status: "success", errorMessage: "" })
        }
      />
    </div>
  );
};

export default JoinForm;
