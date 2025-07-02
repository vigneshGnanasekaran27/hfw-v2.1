"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import StepIndicator from "@/form/StepIndicator";
import EncouragementModal from "@/form/EncouragementModal";
import StatusPopup from "@/form/SuccessPopup";
import ScheduleAssessment from "@/form/ScheduleAssessment";
import ReviewInformation from "@/form/ReviewInformation";
import PersonalInfoStep from "@/form/steps/PersonalInfoStep";
import FitnessGoalsStep from "@/form/steps/FitnessGoalsStep";
import ActivityLevelStep from "@/form/steps/ActivityLevelStep";
import HealthInfoStep from "@/form/steps/HealthInfoStep";
import NutritionInfoStep from "@/form/steps/NutritionInfoStep";
import LifestyleInfoStep from "@/form/steps/LifestyleInfoStep";
import { STEPS } from "@/data/constants";
import { formSchema } from "@/data/validation";

const parseQueryString = (url) => {
  try {
    const urlObj = new URL(url);
    const params = {};
    urlObj.searchParams.forEach((value, key) => {
      params[key] = decodeURIComponent(value);
    });
    return params;
  } catch (error) {
    console.error("Error parsing URL:", error);
    return {};
  }
};

const JoinForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupState, setPopupState] = useState({
    show: false,
    status: "success",
    errorMessage: "",
    trainingtype: "",
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = useForm({
    // resolver: zodResolver(formSchema),  
    mode: "onChange",
    defaultValues: {
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
        isCurrentlyActive: "true",
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
        mode: "",
        type: "",
        programName: "",
      },
      scheduleInfo: {
        assessmentDate: "",
        assessmentTime: { utc: "", local: "", ist: "" },
        timeZone: "",
        formattedDateTime: "",
        timeZoneDisplay: "",
        communityName: "",
      },
    },
  });

  // Combined useEffect for localStorage and URL params
  useEffect(() => {
    const savedData = localStorage.getItem("joinFormDraft");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach((section) => {
          Object.keys(parsedData[section]).forEach((field) => {
            setValue(`${section}.${field}`, parsedData[section][field]);
          });
        });
        console.log("Loaded from localStorage:", parsedData);
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }

    const currentUrl = window.location.href;
    const queryParams = parseQueryString(currentUrl);
    console.log("Parsed queryParams:", queryParams);
    if (queryParams.mode) setValue("trainingDetails.mode", queryParams.mode);
    if (queryParams.type) setValue("trainingDetails.type", queryParams.type);
    if (queryParams.program) {
      setValue("trainingDetails.programName", queryParams.program);
      setPopupState((prev) => ({ ...prev, trainingtype: queryParams.program }));
    }
    console.log("Form values after setting:", watch("trainingDetails"));
  }, [setValue, watch]);

  // Auto-save to localStorage
  const formData = watch();
  useEffect(() => {
    localStorage.setItem("joinFormDraft", JSON.stringify(formData));
  }, [formData]);

  // Show modal on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNextStep = useCallback(async () => {
    const stepFields = {
      1: ["personalInfo"],
      2: ["fitnessGoals"],
      3: ["activityLevel"],
      4: ["healthInfo"],
      5: ["nutritionInfo"],
      6: ["lifestyle"],
      7: ["scheduleInfo"],
    };
    if (stepFields[step]) {
      const isValid = await trigger(stepFields[step]);
      if (!isValid) return;
    }
    if (step < STEPS.length) setStep(step + 1);
  }, [step, trigger]);

  const handlePreviousStep = useCallback(() => {
    if (step > 1) setStep(step - 1);
  }, [step]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", data);
      setPopupState({
        show: true,
        status: "success",
        errorMessage: "",
        trainingtype: data.trainingDetails.programName,
      });
    } catch (error) {
      setPopupState({
        show: true,
        status: "error",
        errorMessage: error.message,
        trainingtype: data.trainingDetails.programName,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <PersonalInfoStep register={register} errors={errors} />;
      case 2: return <FitnessGoalsStep register={register} errors={errors} watch={watch} />;
      case 3: return <ActivityLevelStep register={register} errors={errors} watch={watch} setValue={setValue} />;
      case 4: return <HealthInfoStep register={register} errors={errors} watch={watch} />;
      case 5: return <NutritionInfoStep register={register} errors={errors} watch={watch} />;
      case 6: return <LifestyleInfoStep register={register} errors={errors} />;
      case 7: return <ScheduleAssessment formData={formData} setFormData={setValue} onSchedulingComplete={handleNextStep} />;
      case 8: return <ReviewInformation formData={formData} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {showModal && <EncouragementModal onClose={() => setShowModal(false)} />}
      <StepIndicator currentStep={step} steps={STEPS} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStep()}
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Previous
                </button>
              )}
              {step < 7 ? ( // Hide "Next" button on step 7
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Next
                </button>
              ) : step === 8 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              ) : null}
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
      <StatusPopup
        isOpen={popupState.show}
        status={popupState.status}
        errorMessage={popupState.errorMessage}
        trainingtype={popupState.trainingtype}
        onClose={() => setPopupState({ show: false, status: "success", errorMessage: "", trainingtype: "" })}
      />
    </div>
  );
};

export default JoinForm;