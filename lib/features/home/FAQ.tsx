"use client";

import React, { useState } from "react";
import { faqData } from "@/lib/utils/data";
import { MdKeyboardArrowDown } from "react-icons/md";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full px-[120px] pt-[75px] pb-[85px] flex flex-col items-start gap-[50px] bg-white">
      <h2 className="text-[36px] font-semibold max-w-[400px]">
        Frequently Asked Questions
      </h2>
      <div className="w-full flex flex-col gap-[24px]">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`${
              openIndex === index && "bg-[#F4F4F4]"
            } cursor-pointer w-full hover:bg-[#F4F4F4]`}
          >
            <div
              onClick={() => handleToggleFaq(index)}
              className="w-full flex items-center justify-between px-[40px] py-[30px] border border-[#B0B1B3]"
            >
              <p className="text-[24px] font-normal">{faq.question}</p>
              <div
                className={`w-[36px] h-[36px] p-1 text-[#A1A1A1] flex items-center justify-center border border-[#B0B1B3] rounded-full transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                <MdKeyboardArrowDown />
              </div>
            </div>
            {openIndex === index && (
              <div className="w-full flex items-center justify-between px-[40px] py-[30px] border-x border-b border-[#B0B1B3]">
                <p className="text-[20px] font-normal">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
