"use client";

import React, { Dispatch, SetStateAction } from "react";
import { alert } from "../image/icons";
import { CommonButton } from "../buttons";
import { ImageWithFallback } from "../image";

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
  loading?: boolean;
  handleConfirm?: () => void;
  confirmButtonText?: string;
}

const AlterModal = ({
  open,
  setOpen,
  title = "Warning",
  description = "Are you sure you want to perform this action?",
  loading = false,
  confirmButtonText = "Remove",
  handleConfirm,
}: PropsType) => {
  if (!open) return null;

  return (
    <div className="fixed left-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-black/60 px-4 py-5">
      <div className="w-full max-w-[470px] rounded-[10px] bg-white p-[24px] lg:p-[32px] flex flex-col items-start gap-[24px]">
        <ImageWithFallback src={alert} width={40} height={40} alt="alert" />
        <div className="flex flex-col items-start gap-[12px]">
          <h2 className="text-[24px] font-semibold text-primary">{title}</h2>
          <p className="text-[16px] font-normal">{description}</p>
        </div>
        <div className="w-full flex items-center justify-end gap-[16px]">
          <CommonButton
            label="Cancel"
            disabled={loading}
            onClick={() => setOpen(false)}
            className="w-fit bg-[#E3E3E3] text-[#1E1E1E] font-bold px-[14px] py-[10px] text-[14px] rounded-lg"
          />
          <CommonButton
            label={loading ? "Processing..." : confirmButtonText}
            disabled={loading}
            onClick={handleConfirm}
            className="w-fit bg-red text-white font-bold px-[14px] py-[10px] text-[14px] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AlterModal;
