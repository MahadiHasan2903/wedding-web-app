"use client";

import React from "react";

interface PropsType {
  label: string;
  unit?: string;
  startValue?: number;
  endValue?: number;
  onChange?: (start: number, end: number) => void;
}

const NumberRangeField = ({
  label,
  unit,
  startValue = 0,
  endValue = 0,
  onChange,
}: PropsType) => {
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onChange?.(val, endValue);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onChange?.(startValue, val);
  };

  return (
    <div className="flex items-center justify-between gap-[20px]">
      <p className="text-[12px] lg:text-[14px] font-semibold">{label}</p>
      <div className="flex items-center gap-[12px]">
        <input
          type="number"
          value={startValue}
          onChange={handleStartChange}
          className="w-[50px] h-[30px] text-center text-[12px] lg:text-[14px] px-[10px] py-[10px] border border-[#A1A1A1] rounded-[5px] outline-none transition-all duration-200"
        />
        <p className="text-[12px] lg:text-[14px] font-normal">to</p>
        <input
          type="number"
          value={endValue}
          onChange={handleEndChange}
          className="w-[50px] h-[30px] text-center text-[12px] lg:text-[14px] px-[10px] py-[10px] border border-[#A1A1A1] rounded-[5px] outline-none transition-all duration-200"
        />
        {unit && (
          <p className="text-[12px] lg:text-[14px] font-normal">{unit}</p>
        )}
      </div>
    </div>
  );
};

export default NumberRangeField;
