"use client";

import React, { WheelEvent } from "react";

interface PropsType {
  label: string;
  unit?: string;
  endValue?: number;
  readOnly?: boolean;
  disabled?: boolean;
  startValue?: number;
  onChange?: (start: number, end: number) => void;
}

const NumberRangeField = ({
  label,
  unit,
  startValue = 0,
  endValue = 0,
  onChange,
  readOnly = false,
  disabled = false,
}: PropsType) => {
  // Handles changes to the start input field
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent updates if the field is read-only or disabled
    if (readOnly || disabled) {
      return;
    }
    const val = Number(e.target.value);
    onChange?.(val, endValue);
  };

  // Handles changes to the end input field
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent updates if the field is read-only or disabled
    if (readOnly || disabled) {
      return;
    }
    const val = Number(e.target.value);
    onChange?.(startValue, val);
  };

  // Prevents the mouse wheel from incrementing/decrementing the value in number inputs
  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    // Remove focus from the input to disable scroll-based value changes
    e.currentTarget.blur();
  };

  // Common Tailwind class for both number input fields
  const sharedInputClass =
    "w-[50px] h-[30px] text-center text-[12px] lg:text-[14px] px-[10px] py-[10px] border border-[#A1A1A1] rounded-[5px] outline-none transition-all duration-200";

  return (
    <div className="flex items-center justify-between gap-[20px]">
      <p className="text-[12px] lg:text-[14px] font-semibold">{label}</p>
      <div className="flex items-center gap-[12px]">
        <input
          type="number"
          value={startValue}
          readOnly={readOnly}
          disabled={disabled}
          onWheel={handleWheel}
          onChange={handleStartChange}
          className={`${sharedInputClass} ${
            readOnly || disabled ? "cursor-not-allowed" : ""
          }`}
        />
        <p className="text-[12px] lg:text-[14px] font-normal">to</p>
        <input
          type="number"
          value={endValue}
          readOnly={readOnly}
          disabled={disabled}
          onWheel={handleWheel}
          onChange={handleEndChange}
          className={`${sharedInputClass} ${
            readOnly || disabled ? "cursor-not-allowed" : ""
          }`}
        />
        {unit && (
          <p className="text-[12px] lg:text-[14px] font-normal">{unit}</p>
        )}
      </div>
    </div>
  );
};

export default NumberRangeField;
