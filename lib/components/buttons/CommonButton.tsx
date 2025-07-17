"use client";

import Link from "next/link";
import React, { ReactNode } from "react";

interface PropsType {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
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
  startIcon,
  endIcon,
  type = "button",
  disabled = false,
}: PropsType) => {
  const content = (
    <>
      {startIcon}
      {label}
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
