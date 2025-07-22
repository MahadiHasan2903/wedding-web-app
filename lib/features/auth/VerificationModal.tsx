"use client";

import React, {
  useRef,
  Dispatch,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  SetStateAction,
} from "react";
import { SubHeading } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";

interface PropsType {
  otp: string[];
  setOtp: Dispatch<SetStateAction<string[]>>;
  open: boolean;
  loading: boolean;
  onConfirm: () => void;
}

const VerificationModal = ({
  otp,
  setOtp,
  open,
  loading,
  onConfirm,
}: PropsType) => {
  // Input refs for focus control
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Auto-focus first input on modal open and reset OTP on close
  useEffect(() => {
    if (open) inputsRef.current[0]?.focus();
    else setOtp(Array(6).fill(""));
  }, [open]);

  // Handle input change; accept only single digit and move focus
  const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);
      if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
    }
  };

  // Handle backspace; clear or move focus backward
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) inputsRef.current[idx - 1]?.focus();
    }
  };

  // Handle paste event; populate inputs if 6-digit OTP pasted
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("Text").trim();
    if (/^\d{6}$/.test(paste)) {
      setOtp(paste.split(""));
      inputsRef.current[5]?.focus();
    }
    e.preventDefault();
  };

  // Check if all digits entered
  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <>
      {open && (
        <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/80 px-4 py-5">
          <div className="w-full max-w-[600px] rounded-[10px] bg-white px-[36px] py-[24px] flex flex-col gap-[30px]">
            <SubHeading title="Verify Email" />
            <div className="flex flex-col items-start gap-[10px]">
              <p className="text-[14px] font-semibold">
                Enter the OTP sent to your email
              </p>
              <div className="flex items-center gap-[12px] justify-center">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-[40px] h-[40px] text-center text-2xl border-b border-[#A1A1A1] focus:border-primary outline-none"
                    value={digit}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onPaste={handlePaste}
                    ref={(el) => {
                      inputsRef.current[idx] = el;
                    }}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
            </div>
            <CommonButton
              type="button"
              label={loading ? "Loading..." : "Verify"}
              disabled={loading || !isOtpComplete}
              onClick={onConfirm}
              className="w-full bg-green text-white text-[14px] font-semibold rounded-full px-[20px] py-[10px]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationModal;
