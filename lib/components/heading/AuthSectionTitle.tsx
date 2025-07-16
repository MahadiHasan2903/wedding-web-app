import React from "react";

interface PropsType {
  title: string;
  className?: string;
}

const AuthSectionTitle = ({ title, className }: PropsType) => {
  return (
    <div className={`text-[24px] font-medium text-primary ${className || ""}`}>
      {title}
    </div>
  );
};

export default AuthSectionTitle;
