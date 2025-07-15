import React from "react";

interface PropsType {
  title: string;
  className?: string;
}

const SectionTitle = ({ title, className }: PropsType) => {
  return (
    <div
      className={`text-[14px] sm:text-[24px] xl:text-[36px] font-semibold ${
        className && className
      }`}
    >
      {title}
    </div>
  );
};

export default SectionTitle;
