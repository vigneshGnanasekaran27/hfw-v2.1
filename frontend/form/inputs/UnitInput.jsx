import React from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

const UnitInput = ({ label, register, name, unitName, unitOptions, errors, required }) => (
  <div className="flex-1">
    <label className="block text-sm font-medium mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex gap-2 items-center">
      <div className="flex-1">
        <TextInput
          type="number"
          name={name}
          register={register}
          error={errors[name.split('.')[0]]?.[name.split('.')[1]]}
          required={required}
          noLabel
        />
      </div>
      <SelectInput
        name={unitName}
        register={register}
        options={unitOptions}
        noLabel
        className="w-24"
      />
    </div>
  </div>
);

export default UnitInput;