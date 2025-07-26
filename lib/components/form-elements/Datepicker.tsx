"use client";

import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { FieldValues, SetFieldValue } from "react-hook-form";
import { FaCalendarDays } from "react-icons/fa6";

interface DatePickerProps {
  title: string;
  label?: string;
  defaultDate?: Date | string;
  maxDate?: Date | string;
  minDate?: Date | string;
  setValue?: SetFieldValue<FieldValues>;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
  readOnly?: boolean;
  disableFutureDate?: boolean;
  disablePreviousDate?: boolean;
  isDatePickerOpen?: boolean;
  setIsDatePickerOpen?: Dispatch<SetStateAction<boolean>>;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: null;
  includeTime?: boolean;
}

const DatePicker = ({
  title,
  label,
  defaultDate,
  maxDate,
  minDate,
  setValue,
  onChange,
  required = false,
  error,
  readOnly,
  disableFutureDate,
  disablePreviousDate,
  onFocus,
  onBlur,
  isDatePickerOpen = false,
  setIsDatePickerOpen,
  ref,
  includeTime = false,
}: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(isDatePickerOpen);

  useEffect(() => {
    if (inputRef.current) {
      const options: flatpickr.Options.Options = {
        mode: "single",
        defaultDate: defaultDate ? new Date(defaultDate) : undefined,
        static: true,
        monthSelectorType: "static",
        enableTime: includeTime,
        minuteIncrement: includeTime ? 1 : undefined,
        dateFormat: includeTime ? "M j, Y h:i K" : "M j, Y",
        prevArrow:
          '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow:
          '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        onChange: (selectedDates) => {
          if (!readOnly) {
            const formattedDate = selectedDates[0]
              ? selectedDates[0].toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  ...(includeTime && {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }),
                })
              : "";
            if (setValue) {
              setValue(title, formattedDate, { shouldValidate: true });
            }
            if (onChange) {
              onChange(formattedDate);
            }
          }
        },
        maxDate: maxDate
          ? new Date(maxDate)
          : disableFutureDate
          ? new Date()
          : undefined,
        minDate: minDate
          ? new Date(minDate)
          : disablePreviousDate
          ? new Date()
          : undefined,
        clickOpens: !readOnly,
        disableMobile: true,
        onOpen: () => {
          setIsCalendarOpen(true);
          setIsDatePickerOpen?.(true);
        },
        onClose: () => {
          setIsCalendarOpen(false);
          setIsDatePickerOpen?.(false);
        },
      };

      const instance = flatpickr(inputRef.current, options);
      return () => instance.destroy();
    }
  }, [
    onChange,
    defaultDate,
    maxDate,
    minDate,
    setValue,
    title,
    disableFutureDate,
    disablePreviousDate,
    readOnly,
    setIsDatePickerOpen,
    includeTime,
  ]);

  const handleFocus = () => {
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    if (!isCalendarOpen && onBlur) {
      setTimeout(() => onBlur(), 100);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between gap-[5px]">
      <label className="shrink-0 text-[12px] lg:text-[14px] font-semibold">
        {label} {required && <span className="text-red">*</span>}
      </label>
      <div className="relative w-full">
        <input
          ref={inputRef}
          className="w-full border-b-[1.5px] border-primaryBorder bg-transparent py-2 font-normal outline-none transition focus:border-primary active:border-primary"
          type="text"
          placeholder={includeTime ? "mm/dd/yyyy hh:mm" : "mm/dd/yyyy"}
          readOnly={readOnly}
          data-class="flatpickr-right"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className="pointer-events-none absolute inset-0 left-auto right-2 sm:right-5 flex items-center">
          <FaCalendarDays className="text-primaryBorder" />
        </div>
      </div>
      {error && <p className="text-red m-[5px]">{error}</p>}
    </div>
  );
};

export default DatePicker;
