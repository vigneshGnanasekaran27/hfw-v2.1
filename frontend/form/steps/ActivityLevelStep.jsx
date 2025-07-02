import React from "react";
import CheckboxGroup from "../inputs/CheckboxGroup";
import SelectInput from "../inputs/SelectInput";
import RadioGroup from "../inputs/RadioGroup";
import { motion, AnimatePresence } from "framer-motion";

const ActivityLevelStep = ({ register, errors, watch, setValue }) => {
  const isCurrentlyActive = watch("activityLevel.isCurrentlyActive");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Current Activity & Fitness Level</h2>
      <div className="space-y-4">
        <RadioGroup
          label="Current Activity Status"
          name="activityLevel.isCurrentlyActive"
          register={register}
          error={errors.activityLevel?.isCurrentlyActive}
          options={[
            { value: true, label: "Currently Exercising" },
            { value: false, label: "Not Currently Exercising" },
          ]}
        />
        <AnimatePresence>
          {isCurrentlyActive === "true" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CheckboxGroup
                label="Exercise Types (Check all that apply)"
                name="activityLevel.exerciseTypes"
                register={register}
                error={errors.activityLevel?.exerciseTypes}
                options={[
                  { value: "Cardio", label: "Cardio" },
                  { value: "Strength Training", label: "Strength Training" },
                  { value: "Yoga", label: "Yoga" },
                  { value: "Sports", label: "Sports" },
                  { value: "Dancing", label: "Dancing" },
                  { value: "Other", label: "Other" },
                ]}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectInput
                  label="Training Days per Week"
                  name="activityLevel.trainingDaysPerWeek"
                  register={register}
                  error={errors.activityLevel?.trainingDaysPerWeek}
                  options={[
                    { value: "", label: "Select Days" },
                    { value: "1", label: "1 day" },
                    { value: "2", label: "2 days" },
                    { value: "3", label: "3 days" },
                    { value: "4", label: "4 days" },
                    { value: "5", label: "5 days" },
                    { value: "6", label: "6 days" },
                    { value: "7", label: "7 days" },
                  ]}
                />
                <SelectInput
                  label="Workout Duration"
                  name="activityLevel.workoutDuration"
                  register={register}
                  error={errors.activityLevel?.workoutDuration}
                  options={[
                    { value: "", label: "Select Duration" },
                    { value: "30min", label: "30 minutes" },
                    { value: "45min", label: "45 minutes" },
                    { value: "60min", label: "60 minutes" },
                    { value: "90min", label: "90 minutes" },
                    { value: "more", label: "More than 90 minutes" },
                  ]}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityLevelStep;