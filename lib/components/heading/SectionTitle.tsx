import React from "react";

interface PropsType {
  title: string;
  className?: string;
}

const SectionTitle = ({ title, className }: PropsType) => {
  return (
    <div className={`text-[36px] font-semibold ${className && className}`}>
      {title}
    </div>
  );
};

export default SectionTitle;
