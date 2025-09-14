"use client";

import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import useLanguageStore from "@/lib/store/useLanguageStore";

const LanguageDropdown = () => {
  const { language, setLanguage } = useLanguageStore();

  const options = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  return (
    <div className="relative inline-block text-black">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "fr" | "es")}
        className="appearance-none w-full cursor-pointer rounded-[10px] bg-white px-2 py-2.5 pr-7 focus:outline-none focus:ring-0"
      >
        {options.map((option) => (
          <option
            key={option.code}
            value={option.code}
            className="cursor-pointer"
          >
            {option.flag} {option.label}
          </option>
        ))}
      </select>

      {/* Arrow icon inside the dropdown */}
      <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
        <IoMdArrowDropdown className="text-gray-600" size={20} />
      </div>
    </div>
  );
};

export default LanguageDropdown;
