"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import {
  addMessageReportSchema,
  AddMessageReportType,
} from "@/lib/schema/report/report.schema";
import { CardTitle } from "@/lib/components/heading";
import { ReportType } from "@/lib/enums/report.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CommonButton } from "@/lib/components/buttons";
import { Textarea } from "@/lib/components/form-elements";
import { createMessageReportAction } from "@/lib/action/report/report.action";

interface PropsType {
  open: boolean;
  senderId: string;
  messageId: string;
  receiverId: string;
  conversationId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const REPORT_OPTIONS = [
  { label: "Violent or threatening", value: ReportType.VIOLENT },
  { label: "Scam or fraud", value: ReportType.SCAM },
  { label: "Spam or unwanted messages", value: ReportType.SPAM },
  { label: "Harassment or bullying", value: ReportType.HARASSMENT },
  { label: "Inappropriate content", value: ReportType.INAPPROPRIATE },
  { label: "Other reason", value: ReportType.OTHER },
];

const ReportMessage = ({
  open,
  setOpen,
  messageId,
  senderId,
  receiverId,
  conversationId,
}: PropsType) => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddMessageReportType>({
    resolver: zodResolver(addMessageReportSchema),
    defaultValues: {
      messageId,
      senderId,
      receiverId,
      conversationId,
      type: "" as ReportType,
      description: "",
    },
  });

  const selectedType = watch("type");

  // Function to handle form submission
  const handleSubmitReport = async (data: AddMessageReportType) => {
    if (!selectedType) {
      toast.error("Please select a report reason before submitting.");
      return;
    }

    if (selectedType === ReportType.OTHER && !data.description?.trim()) {
      toast.error("Please provide a reason when selecting 'Other'.");
      return;
    }

    setLoading(true);

    const requestPayload = {
      messageId: data.messageId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      conversationId: data.conversationId,
      type: data.type,
      description: data.description,
    };

    const createMessageReportResponse = await createMessageReportAction(
      requestPayload
    );

    toast(createMessageReportResponse.message, {
      type: createMessageReportResponse.status ? "success" : "error",
    });

    if (createMessageReportResponse.status) {
      setOpen(false);
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/60 px-4 py-5">
      <form
        onSubmit={handleSubmit(handleSubmitReport)}
        className="w-full max-w-[520px] rounded-[10px] bg-white p-[24px] lg:p-[35px] flex flex-col gap-[18px]"
      >
        <CardTitle title="Report" className="mb-[10px] md:mb-[18px]" />
        <p className="text-[14px] font-semibold">Let us know what’s going on</p>

        {/* Report reason buttons */}
        <div className="flex flex-wrap items-center gap-[10px] py-2">
          {REPORT_OPTIONS.map((option) => (
            <CommonButton
              key={option.value}
              type="button"
              onClick={() => setValue("type", option.value)}
              label={option.label}
              className={`p-[10px] md:p-[15px] rounded-full text-[14px] font-normal ${
                selectedType === option.value
                  ? "bg-green text-white"
                  : "bg-light text-black"
              }`}
            />
          ))}
        </div>
        {errors.type && (
          <span className="text-red-500 text-sm">{errors.type.message}</span>
        )}

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label="Why do you want to report this profile?"
              rows={4}
              className="!p-[16px] bg-light text-[12px] lg:text-[14px]"
              error={errors.description?.message}
            />
          )}
        />

        {/* Actions */}
        <div className="w-full flex items-center gap-[30px] text-[14px] mt-4">
          <CommonButton
            type="button"
            onClick={() => setOpen(false)}
            label="Cancel"
            className="w-full bg-green text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
          />
          <CommonButton
            type="submit"
            label={loading ? "Processing..." : "Report"}
            disabled={loading}
            className="w-full bg-red text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
          />
        </div>
      </form>
    </div>
  );
};

export default ReportMessage;
