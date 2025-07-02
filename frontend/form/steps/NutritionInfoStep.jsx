import React from "react";
import SelectInput from "../inputs/SelectInput";
import TextInput from "../inputs/TextInput";
import { motion, AnimatePresence } from "framer-motion";

const NutritionInfoStep = ({ register, errors, watch }) => {
  const dietaryPreference = watch("nutritionInfo.dietaryPreference");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Nutrition Information</h2>
      <div className="space-y-4">
        <SelectInput
          label="Dietary Preference"
          name="nutritionInfo.dietaryPreference"
          register={register}
          error={errors.nutritionInfo?.dietaryPreference}
          required
          options={[
            { value: "", label: "Select Preference" },
            { value: "omnivore", label: "Non-Vegetarian/Omnivore" },
            { value: "vegetarian", label: "Vegetarian" },
            { value: "vegan", label: "Vegan" },
            { value: "pescatarian", label: "Pescatarian" },
            { value: "keto", label: "Keto" },
            { value: "paleo", label: "Paleo" },
            { value: "other", label: "Other" },
          ]}
        />
        <AnimatePresence>
          {dietaryPreference === "other" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextInput
                label="Other Dietary Preference"
                name="nutritionInfo.otherDietaryPreference"
                register={register}
                error={errors.nutritionInfo?.otherDietaryPreference}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Daily Water Intake (Liters)"
            name="nutritionInfo.waterIntake"
            type="number"
            register={register}
            error={errors.nutritionInfo?.waterIntake}
            step="0.1"
          />
          <SelectInput
            label="Meals per Day"
            name="nutritionInfo.mealsPerDay"
            register={register}
            error={errors.nutritionInfo?.mealsPerDay}
            options={[
              { value: "", label: "Select Number of Meals" },
              { value: "2", label: "2 meals" },
              { value: "3", label: "3 meals" },
              { value: "4", label: "4 meals" },
              { value: "5", label: "5 meals" },
              { value: "6", label: "6 meals" },
            ]}
          />
        </div>
        <TextInput
          label="Food Restrictions/Allergies"
          name="nutritionInfo.foodRestrictions"
          type="textarea"
          register={register}
          error={errors.nutritionInfo?.foodRestrictions}
          className="h-16"
        />
        <TextInput
          label="Current Supplements"
          name="nutritionInfo.supplements"
          type="textarea"
          register={register}
          error={errors.nutritionInfo?.supplements}
          className="h-16"
        />
      </div>
    </div>
  );
};

export default NutritionInfoStep;