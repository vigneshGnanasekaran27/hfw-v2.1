import React from "react";
import CheckboxGroup from "../inputs/CheckboxGroup";
import TextInput from "../inputs/TextInput";
import { motion, AnimatePresence } from "framer-motion";
import { COMMON_HEALTH_CONDITIONS } from "@/data/constants";

const HealthInfoStep = ({ register, errors, watch }) => {
  const noHealthConditions = watch("healthInfo.noHealthConditions");
  const healthConditions = watch("healthInfo.healthConditions") || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Health Information</h2>
      <div className="space-y-4">
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            {...register("healthInfo.noHealthConditions")}
            className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
          />
          <span className="text-sm font-medium">I don't have any serious health conditions</span>
        </label>
        <AnimatePresence>
          {!noHealthConditions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CheckboxGroup
                label="Health Conditions (Check all that apply)"
                name="healthInfo.healthConditions"
                register={register}
                error={errors.healthInfo?.healthConditions}
                options={COMMON_HEALTH_CONDITIONS.map((condition) => ({
                  value: condition,
                  label: condition,
                }))}
              />
              {healthConditions.includes("Other") && (
                <TextInput
                  label="Other Health Condition"
                  name="healthInfo.otherHealthCondition"
                  register={register}
                  error={errors.healthInfo?.otherHealthCondition}
                  placeholder="Please specify any other health conditions"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <TextInput
          label="Past Injuries"
          name="healthInfo.pastInjuries"
          type="textarea"
          register={register}
          error={errors.healthInfo?.pastInjuries}
          placeholder="List any significant injuries that might affect your exercise (if none, leave blank)"
          className="h-20"
        />
        <TextInput
          label="Current Medications"
          name="healthInfo.medications"
          type="textarea"
          register={register}
          error={errors.healthInfo?.medications}
          placeholder="List any medications you're currently taking (if none, leave blank)"
          className="h-16"
        />
        <TextInput
          label="Allergies"
          name="healthInfo.allergies"
          type="textarea"
          register={register}
          error={errors.healthInfo?.allergies}
          placeholder="List any significant allergies (if none, leave blank)"
          className="h-16"
        />
      </div>
    </div>
  );
};

export default HealthInfoStep;