"use client";

import React, { ChangeEvent } from "react";
import { polygon } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";

interface UnderlineSelectFieldProps {
  label: string;
  name: string;
  value?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const UnderlineSelectField = ({
  label,
  name,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  className = "",
  required = false,
  disabled = false,
  readOnly = false,
}: UnderlineSelectFieldProps) => {
  // Function to handle change of the selected option
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (readOnly) {
      return;
    }
    onChange?.(e.target.value);
  };

  return (
    <div className="w-full flex flex-col items-start justify-between gap-[5px]">
      <label
        htmlFor={name}
        className="shrink-0 text-[12px] lg:text-[14px] font-semibold"
      >
        {label} {required && <span className="text-red">*</span>}
      </label>
      <div className="relative w-full">
        <select
          id={name}
          name={name}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          disabled={disabled}
          onChange={handleChange}
          aria-readonly={readOnly || undefined}
          className={`w-full appearance-none bg-transparent pr-[20px] pl-[8px] lg:pr-[36px] py-2 border-b border-primaryBorder outline-none cursor-pointer text-[12px] lg:text-[14px] ${
            disabled || readOnly ? "cursor-not-allowed" : ""
          } ${className}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom arrow */}
        <div className="pointer-events-none absolute right-[12px] top-1/2 transform -translate-y-1/2">
          <ImageWithFallback src={polygon} width={10} height={10} alt="arrow" />
        </div>
      </div>
    </div>
  );
};

export default UnderlineSelectField;
