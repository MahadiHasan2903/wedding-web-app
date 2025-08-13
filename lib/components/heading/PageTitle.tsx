import React from "react";

interface PropsType {
  title: string;
  className?: string;
}

const PageTitle = ({ title, className }: PropsType) => {
  return (
    <div
      className={`text-[24px] sm:text-[36px] xl:text-[64px] font-bold ${
        className || ""
      }`}
    >
      {title}
    </div>
  );
};

export default PageTitle;
