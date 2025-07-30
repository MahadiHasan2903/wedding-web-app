"use client";

import React, { ChangeEvent, useState } from "react";
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

const OutlinedInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  required = true,
  readOnly = false,
  className = "",
}: PropsType) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  // Toggles password visibility by switching input type between "text" and "password"
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Prevents mouse wheel from changing the value on number inputs by blurring the input
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-[12px] lg:text-[14px] font-medium"
        >
          {label}
          {required && <span className="text-red ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          onChange={onChange}
          onWheel={handleWheel}
          required={required}
          readOnly={readOnly}
          className={`${
            readOnly && "cursor-not-allowed"
          } w-full text-[12px] lg:text-[14px] px-[16px] py-[12px] lg:p-[24px] border rounded-[10px] outline-none transition-all duration-200 pr-10 ${
            error ? "border-red" : "border-primaryBorder focus:border-primary"
          }  ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
            aria-label={showPassword ? "Hide password" : "Show password"}
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

export default OutlinedInput;
