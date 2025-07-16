"use client";

import React, { ChangeEvent } from "react";

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

const Input = ({
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
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={name} className="text-md font-medium">
          {label}
          {required && <span className="text-red ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        className={`w-full text-[12px] lg:text-[14px] px-[16px] py-[12px] lg:p-[24px] border rounded-[10px] outline-none transition-all duration-200 ${
          error ? "border-red" : "border-[#A0A0A0] focus:border-primary"
        }`}
      />

      {error && <p className="text-red text-sm">{error}</p>}
    </div>
  );
};

export default Input;
