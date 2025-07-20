import React from "react";

interface PropsType {
  title: string;
  className?: string;
}

const SubHeading = ({ title, className }: PropsType) => {
  return (
    <div className={`text-[14px] sm:text-[24px] font-medium text-primary ${className || ""}`}>
      {title}
    </div>
  );
};

export default SubHeading;
