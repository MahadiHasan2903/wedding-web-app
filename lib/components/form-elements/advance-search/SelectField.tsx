"use client";

import React from "react";
import { ImageWithFallback } from "@/lib/components/image";
import { polygon } from "@/lib/components/image/icons";

interface SelectFieldProps {
  label: string;
  name: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  return (
    <div className="flex items-center justify-between gap-[30px]">
      <label
        htmlFor={name}
        className="shrink-0 text-[12px] lg:text-[14px] font-semibold"
      >
        {label}
      </label>
      <div className="relative max-w-[130px] lg:max-w-[180px] w-full">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full appearance-none bg-transparent px-[16px] pr-[20px] lg:pr-[36px] py-2 border border-[#A1A1A1] outline-none rounded-[5px] cursor-pointer text-[12px] lg:text-[14px] ${className}`}
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

export default SelectField;
