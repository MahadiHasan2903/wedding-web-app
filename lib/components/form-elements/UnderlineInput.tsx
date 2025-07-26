"use client";

import React, { ChangeEvent, useState, WheelEvent } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export interface PropsType {
  name: string;
  type: string;
  label?: string;
  error?: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const UnderlineInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  required = false,
  readOnly = false,
  className = "",
}: PropsType) => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggles the visibility of the password input by switching between "text" and "password" types
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Prevents the mouse wheel from incrementing/decrementing the value in number inputs
  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      // Remove focus from the input to disable scroll-based value changes
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-[12px] lg:text-[14px] font-medium"
        >
          {label} {required && <span className="text-red">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={onChange}
          onWheel={handleWheel}
          required={required}
          readOnly={readOnly}
          className={`w-full text-[12px] lg:text-[14px] py-[10px] pr-10 border-b outline-none transition-all duration-200 ${
            error ? "border-red" : "border-[#A0A0A0] focus:border-primary"
          } ${className}`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-xl"
            tabIndex={-1}
          >
            {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
          </button>
        )}
      </div>

      {error && <p className="text-red text-sm">{error}</p>}
    </div>
  );
};

export default UnderlineInput;
