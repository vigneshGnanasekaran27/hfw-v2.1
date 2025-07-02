import React from "react";

const CheckboxGroup = ({ label, register, name, options, error }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <div className="grid grid-cols-2 gap-2">
      {options.map(({ value, label: optionLabel }) => (
        <label key={value} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={value}
            {...register(name)}
            className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
          />
          <span className="text-sm">{optionLabel}</span>
        </label>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default CheckboxGroup;