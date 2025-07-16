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

const UnderlineInput = ({
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={name} className="text-md font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          readOnly={readOnly}
          className={`w-full text-[12px] lg:text-[14px] py-[10px] pr-10 border-b outline-none transition-all duration-200 ${
            error ? "border-red" : "border-[#A0A0A0] focus:border-primary"
          }`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-xl text-gray-500"
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
