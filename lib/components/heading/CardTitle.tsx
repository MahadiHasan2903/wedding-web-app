import React from "react";

interface PropsType {
  title: string;
  className?: string;
}

const CardTitle = ({ title, className }: PropsType) => {
  return (
    <div
      className={`text-[14px] lg:text-[20px] font-medium text-primary ${
        className || ""
      }`}
    >
      {title}
    </div>
  );
};

export default CardTitle;
