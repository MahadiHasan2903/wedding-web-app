import React from "react";

interface PropsType {
  color: string;
}

const HeadingLine = ({ color }: PropsType) => {
  return <div className={`w-[26px] h-[5px] bg-${color}`} />;
};

export default HeadingLine;
