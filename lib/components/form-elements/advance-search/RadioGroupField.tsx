"use client";

import React from "react";

interface PropsType {
  name: string;
  label: string;
  value?: string;
  readOnly?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}

const RadioGroupField = ({
  label,
  name,
  options,
  defaultValue,
  value,
  onChange,
  readOnly = false,
  disabled = false,
}: PropsType) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[12px] lg:gap-[30px]">
      <p className="text-[12px] lg:text-[14px] font-semibold">{label}</p>
      <div className="flex flex-wrap items-center gap-[18px]">
        {options.map((option) => {
          const isChecked =
            value !== undefined
              ? value === option.value // controlled
              : defaultValue === option.value; // uncontrolled

          return (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                className={`cursor-pointer ${
                  disabled || readOnly ? "cursor-not-allowed" : ""
                }`}
                checked={isChecked}
                onChange={() => {
                  if (readOnly || disabled) {
                    return;
                  }
                  onChange?.(option.value);
                }}
                disabled={disabled}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className={`text-[12px] lg:text-[14px] pl-2 cursor-pointer ${
                  disabled || readOnly ? "text-gray cursor-not-allowed" : ""
                }`}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroupField;
