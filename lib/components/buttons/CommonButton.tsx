"use client";

import Link from "next/link";
import React, { MouseEventHandler, ReactNode } from "react";

interface PropsType {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  labelStyle?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const CommonButton = ({
  label,
  href,
  onClick,
  className,
  labelStyle = "",
  startIcon,
  endIcon,
  type = "button",
  disabled = false,
}: PropsType) => {
  const content = (
    <>
      {startIcon}
      <span className={labelStyle}>{label}</span>
      {endIcon}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${
          disabled
            ? "cursor-not-allowed bg-opacity-50"
            : "cursor-pointer bg-opacity-100"
        } ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabled
          ? "cursor-not-allowed bg-opacity-50"
          : "cursor-pointer bg-opacity-100"
      } ${className}`}
    >
      {content}
    </button>
  );
};

export default CommonButton;
