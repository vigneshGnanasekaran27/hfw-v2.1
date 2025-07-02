import React from "react";

const SelectInput = ({ label, register, name, options, error, required, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      {...register(name)}
      {...props}
      className={`w-full p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      {options.map(({ value, label: optionLabel }) => (
        <option key={value} value={value}>
          {optionLabel}
        </option>
      ))}
    </select>
    {error && (
      <p id={`${name}-error`} className="text-red-500 text-sm mt-1">
        {error.message}
      </p>
    )}
  </div>
);

export default SelectInput;