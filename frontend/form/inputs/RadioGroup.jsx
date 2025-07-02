import React from "react";

const RadioGroup = ({ label, register, name, options, error }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <div className="flex space-x-4">
      {options.map(({ value, label: optionLabel }) => (
        <label key={value} className="flex items-center space-x-2">
          <input
            type="radio"
            value={value}
            {...register(name)}
            className="text-purple-500 focus:ring-purple-500"
          />
          <span className="text-sm">{optionLabel}</span>
        </label>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default RadioGroup;