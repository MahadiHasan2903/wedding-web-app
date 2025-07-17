"use client";

import React from "react";

interface PropsType {
  label: string;
  name: string;
  options: Array<{ label: string; value: string }>;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroupField = ({
  label,
  name,
  options,
  defaultValue,
  value,
  onChange,
}: PropsType) => {
  return (
    <div className="flex items-center gap-[30px]">
      <p className="text-[14px] font-semibold">{label}</p>
      <div className="flex items-center gap-[18px]">
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
                className="cursor-pointer"
                checked={isChecked}
                onChange={() => onChange?.(option.value)}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className="text-sm cursor-pointer pl-2"
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
