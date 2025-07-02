import React from "react";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import UnitInput from "../inputs/UnitInput";

const PersonalInfoStep = ({ register, errors }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Personal Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextInput label="Full Name" name="personalInfo.name" register={register} error={errors.personalInfo?.name} required />
      <TextInput label="Email" name="personalInfo.email" type="email" register={register} error={errors.personalInfo?.email} required />
      <TextInput label="Phone Number" name="personalInfo.phone" type="tel" register={register} error={errors.personalInfo?.phone} required />
      <TextInput label="Date of Birth" name="personalInfo.dateOfBirth" type="date" register={register} error={errors.personalInfo?.dateOfBirth} required />
      <SelectInput
        label="Gender"
        name="personalInfo.gender"
        register={register}
        error={errors.personalInfo?.gender}
        required
        options={[
          { value: "", label: "Select Gender" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
      />
      <div className="flex gap-2">
        <UnitInput
          label="Height"
          name="personalInfo.height"
          unitName="personalInfo.heightUnit"
          unitOptions={[
            { value: "cm", label: "cm" },
            { value: "inches", label: "inches" },
          ]}
          register={register}
          errors={errors}
        />
        <UnitInput
          label="Weight"
          name="personalInfo.weight"
          unitName="personalInfo.weightUnit"
          unitOptions={[
            { value: "kg", label: "kg" },
            { value: "lbs", label: "lbs" },
          ]}
          register={register}
          errors={errors}
        />
      </div>
      <TextInput label="Street Address" name="personalInfo.streetAddress" register={register} error={errors.personalInfo?.streetAddress} required className="md:col-span-2" />
      <TextInput label="City" name="personalInfo.city" register={register} error={errors.personalInfo?.city} required />
      <TextInput label="State/Province" name="personalInfo.state" register={register} error={errors.personalInfo?.state} required />
      <TextInput label="Postal Code" name="personalInfo.postalCode" register={register} error={errors.personalInfo?.postalCode} required />
      <TextInput label="Country" name="personalInfo.country" register={register} error={errors.personalInfo?.country} required />
    </div>
  </div>
);

export default PersonalInfoStep;