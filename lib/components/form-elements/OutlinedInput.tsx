"use client";

import React, { ChangeEvent, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export interface PropsType {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  readOnly?: boolean;
}

const OutlinedInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  required = true,
  readOnly = false,
}: PropsType) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={name} className="text-[14px] font-medium">
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
          onChange={onChange}
          required={required}
          readOnly={readOnly}
          className={`w-full text-[12px] lg:text-[14px] px-[16px] py-[12px] lg:p-[24px] border rounded-[10px] outline-none transition-all duration-200 pr-10 ${
            error ? "border-red" : "border-[#A0A0A0] focus:border-primary"
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500"
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
