"use client";

import React from "react";
import { mail } from "@/lib/components/image/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionTitle } from "@/lib/components/heading";
import { ImageWithFallback } from "@/lib/components/image";
import { OutlinedInput, Textarea } from "@/lib/components/form-elements";
import {
  contactSubmissionFormSchema,
  ContactSubmissionFormType,
} from "@/lib/schema/contact.schema";
import { CommonButton } from "@/lib/components/buttons";

const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSubmissionFormType>({
    resolver: zodResolver(contactSubmissionFormSchema),
  });

  const handleContactFormSubmit = (data: ContactSubmissionFormType) => {
    console.log("Form Submitted:", JSON.stringify(data, null, 2));
  };

  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px]">
      <div className="flex flex-col gap-[25px] lg:gap-[55px]">
        <div className="flex flex-col gap-[30px] lg:gap-[80px] justify-between">
          <div className="flex flex-col lg:flex-row items-center gap-[16px]">
            <SectionTitle
              title="We Are Here To Help"
              className="max-w-[240px]"
            />

            <div className="flex items-center gap-[20px] border border-[#B0B1B3] px-[24px] py-[8px] lg:py-[18px] rounded-[10px]">
              <div className="bg-primary flex items-center justify-center w-[36px] h-[36px] rounded-full">
                <ImageWithFallback
                  src={mail}
                  width={18}
                  height={18}
                  alt="mail"
                />
              </div>
              <p className="text-[14px] leading-[21px]">
                contact@frenchcubaweddings.com
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <SectionTitle
              title="Do You Have Any Questions?"
              className="max-w-[350px] text-end"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleContactFormSubmit)}
          className="w-full flex flex-col gap-[16px] lg:gap-[24px]"
        >
          <div className="flex items-center gap-[14px] lg:gap-[24px]">
            <Controller
              name="firstName"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  type="text"
                  placeholder="First Name *"
                  error={errors.firstName && errors.firstName.message}
                />
              )}
            />
            <Controller
              name="lastName"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  type="text"
                  placeholder="Last Name *"
                  error={errors.lastName && errors.lastName.message}
                />
              )}
            />
          </div>

          <div className="flex items-center gap-[24px]">
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  type="email"
                  placeholder="Email Address *"
                  error={errors.email && errors.email.message}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  type="text"
                  placeholder="Phone Number"
                  required={false}
                  error={errors.phoneNumber && errors.phoneNumber.message}
                />
              )}
            />
          </div>

          <Controller
            name="subject"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                type="text"
                placeholder="Subject *"
                error={errors.subject && errors.subject.message}
              />
            )}
          />

          <Controller
            name="message"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                rows={6}
                placeholder="Message *"
                error={errors.message && errors.message.message}
              />
            )}
          />
          <CommonButton
            type="submit"
            label="Submit"
            className="w-full p-[12px] lg:p-[20px] bg-red text-white text-[16px] font-semibold rounded-full"
          />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
