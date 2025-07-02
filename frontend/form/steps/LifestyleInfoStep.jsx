import React from "react";
import SelectInput from "../inputs/SelectInput";

const LifestyleInfoStep = ({ register, errors }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Lifestyle Information</h2>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput
          label="Average Sleep Duration"
          name="lifestyle.sleepDuration"
          register={register}
          error={errors.lifestyle?.sleepDuration}
          options={[
            { value: "", label: "Select Hours" },
            { value: "Less than 5", label: "Less than 5 hours" },
            { value: "5-6", label: "5-6 hours" },
            { value: "6-7", label: "6-7 hours" },
            { value: "7-8", label: "7-8 hours" },
            { value: "8-9", label: "8-9 hours" },
            { value: "More than 9", label: "More than 9 hours" },
          ]}
        />
        <SelectInput
          label="Stress Level"
          name="lifestyle.stressLevel"
          register={register}
          error={errors.lifestyle?.stressLevel}
          options={[
            { value: "", label: "Select Level" },
            { value: "low", label: "Low" },
            { value: "moderate", label: "Moderate" },
            { value: "high", label: "High" },
            { value: "veryHigh", label: "Very High" },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput
          label="Smoking Status"
          name="lifestyle.smoking"
          register={register}
          error={errors.lifestyle?.smoking}
          options={[
            { value: "", label: "Select Status" },
            { value: "never", label: "Never Smoked" },
            { value: "former", label: "Former Smoker" },
            { value: "occasional", label: "Occasional Smoker" },
            { value: "regular", label: "Regular Smoker" },
          ]}
        />
        <SelectInput
          label="Alcohol Consumption"
          name="lifestyle.alcohol"
          register={register}
          error={errors.lifestyle?.alcohol}
          options={[
            { value: "", label: "Select Frequency" },
            { value: "never", label: "Never" },
            { value: "occasional", label: "Occasional" },
            { value: "moderate", label: "Moderate" },
            { value: "regular", label: "Regular" },
          ]}
        />
      </div>
      <SelectInput
        label="Occupation Type"
        name="lifestyle.occupationType"
        register={register}
        error={errors.lifestyle?.occupationType}
        options={[
          { value: "", label: "Select Type" },
          { value: "sedentary", label: "Sedentary (Desk Job)" },
          { value: "lightlyActive", label: "Lightly Active" },
          { value: "moderatelyActive", label: "Moderately Active" },
          { value: "highlyActive", label: "Highly Active" },
        ]}
      />
    </div>
  </div>
);

export default LifestyleInfoStep;