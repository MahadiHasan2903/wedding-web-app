"use client";

import React, { useState } from "react";
import { faqData } from "@/lib/utils/data";
import { MdKeyboardArrowDown } from "react-icons/md";
import { SectionTitle } from "@/lib/components/heading";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full px-[120px] py-[80px] flex flex-col items-start gap-[50px] bg-white">
      <SectionTitle
        title="Frequently Asked Questions"
        className="max-w-[400px]"
      />

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
              className={`${
                openIndex === index ? "rounded-t-[10px]" : "rounded-[10px]"
              }  w-full flex items-center justify-between px-[40px] py-[30px] border border-[#B0B1B3]`}
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
              <div className="w-full flex items-center justify-between px-[40px] py-[30px] border-x border-b border-[#B0B1B3] rounded-b-[10px]">
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
