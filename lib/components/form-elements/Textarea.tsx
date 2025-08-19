"use client";

import React, { ChangeEvent } from "react";

interface PropType {
  label?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  readOnly?: boolean;
  rows?: number;
  className?: string;
}

const Textarea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  readOnly = false,
  rows = 6,
  className = "",
}: PropType) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-[12px] lg:text-[14px] font-medium"
        >
          {label} {required && <span className="text-red">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        rows={rows}
        className={`p-[24px] border rounded-[10px] outline-none transition-all duration-200 ${
          error ? "border-red" : "border-primaryBorder focus:border-primary"
        } ${className}`}
      />
      {error && <p className="text-red text-sm">{error}</p>}
    </div>
  );
};

export default Textarea;
