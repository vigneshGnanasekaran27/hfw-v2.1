import React from "react";
import UnitInput from "../inputs/UnitInput";
import SelectInput from "../inputs/SelectInput";
import CheckboxGroup from "../inputs/CheckboxGroup";
import TextInput from "../inputs/TextInput";

const FitnessGoalsStep = ({ register, errors, watch }) => {
  const specificGoals = watch("fitnessGoals.specificGoals") || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Fitness Goals</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UnitInput
            label="Target Weight (if applicable)"
            name="fitnessGoals.targetWeight"
            unitName="fitnessGoals.targetWeightUnit"
            unitOptions={[
              { value: "kg", label: "kg" },
              { value: "lbs", label: "lbs" },
            ]}
            register={register}
            errors={errors}
          />
          <SelectInput
            label="Target Body Fat %"
            name="fitnessGoals.targetBodyFat"
            register={register}
            error={errors.fitnessGoals?.targetBodyFat}
            options={[
              { value: "", label: "Select Target Body Fat %" },
              { value: "essential-men", label: "Essential Fat (2-5%) - Men" },
              { value: "athletes-men", label: "Athletes (6-13%) - Men" },
              { value: "fitness-men", label: "Fitness (14-17%) - Men" },
              { value: "acceptable-men", label: "Acceptable (18-24%) - Men" },
              { value: "essential-women", label: "Essential Fat (10-13%) - Women" },
              { value: "athletes-women", label: "Athletes (14-20%) - Women" },
              { value: "fitness-women", label: "Fitness (21-24%) - Women" },
              { value: "acceptable-women", label: "Acceptable (25-31%) - Women" },
            ]}
          />
        </div>
        <CheckboxGroup
          label="Primary Goal"
          name="fitnessGoals.specificGoals"
          register={register}
          error={errors.fitnessGoals?.specificGoals}
          options={[
            { value: "Strength & Performance", label: "Strength & Performance" },
            { value: "Muscle Gain", label: "Muscle Gain" },
            { value: "Fat Loss", label: "Fat Loss" },
            { value: "Endurance Training", label: "Endurance Training" },
            { value: "Flexibility & Mobility", label: "Flexibility & Mobility" },
            { value: "General Fitness", label: "General Fitness" },
            { value: "Rehabilitation", label: "Rehabilitation" },
            { value: "Reduce stress", label: "Reduce stress" },
            { value: "Better sleep quality", label: "Better sleep quality" },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput
            label="Timeline"
            name="fitnessGoals.timeline"
            register={register}
            error={errors.fitnessGoals?.timeline}
            required
            options={[
              { value: "", label: "Select Timeline" },
              { value: "1month", label: "1 month" },
              { value: "3months", label: "3 months" },
              { value: "6months", label: "6 months" },
              { value: "12months", label: "12 months" },
              { value: "ongoing", label: "Ongoing/Lifestyle Change" },
            ]}
          />
          <SelectInput
            label="Weekly Training Days"
            name="fitnessGoals.weeklyDays"
            register={register}
            error={errors.fitnessGoals?.weeklyDays}
            required
            options={[
              { value: "", label: "Select Weekly Days" },
              { value: "2days", label: "2 days/week" },
              { value: "3days", label: "3 days/week" },
              { value: "4days", label: "4 days/week" },
              { value: "5days", label: "5 days/week" },
              { value: "6days", label: "6 days/week" },
              { value: "7days", label: "7 days/week" },
            ]}
          />
        </div>
        <TextInput
          label="Additional Notes"
          name="fitnessGoals.additionalNotes"
          type="textarea"
          register={register}
          error={errors.fitnessGoals?.additionalNotes}
          className="h-24"
          placeholder="Any specific concerns, limitations, or preferences you'd like to share?"
        />
      </div>
    </div>
  );
};

export default FitnessGoalsStep;