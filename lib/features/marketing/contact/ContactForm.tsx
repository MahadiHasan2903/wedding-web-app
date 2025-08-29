"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  contactSubmissionFormSchema,
  ContactSubmissionFormType,
} from "@/lib/schema/contact/contact.schema";
import { mail } from "@/lib/components/image/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionTitle } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { contactFormSubmitAction } from "@/lib/action/contact";
import { OutlinedInput, Textarea } from "@/lib/components/form-elements";

const translations = {
  en: {
    sectionTitle1: "We Are Here To Help",
    sectionTitle2: "Do You Have Any Questions?",
    placeholders: {
      firstName: "First Name *",
      lastName: "Last Name *",
      email: "Email Address *",
      phoneNumber: "Phone Number",
      subject: "Subject *",
      message: "Message *",
    },
    submitButton: "Submit",
    submitting: "Submitting...",
  },
  fr: {
    sectionTitle1: "Nous sommes là pour vous aider",
    sectionTitle2: "Avez-vous des questions ?",
    placeholders: {
      firstName: "Prénom *",
      lastName: "Nom *",
      email: "Adresse e-mail *",
      phoneNumber: "Numéro de téléphone",
      subject: "Objet *",
      message: "Message *",
    },
    submitButton: "Envoyer",
    submitting: "Envoi en cours...",
  },
  es: {
    sectionTitle1: "Estamos aquí para ayudarte",
    sectionTitle2: "¿Tienes alguna pregunta?",
    placeholders: {
      firstName: "Nombre *",
      lastName: "Apellido *",
      email: "Correo electrónico *",
      phoneNumber: "Número de teléfono",
      subject: "Asunto *",
      message: "Mensaje *",
    },
    submitButton: "Enviar",
    submitting: "Enviando...",
  },
};

const ContactForm = () => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = translations[language];
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSubmissionFormType>({
    resolver: zodResolver(contactSubmissionFormSchema),
  });

  const handleContactFormSubmit = async (data: ContactSubmissionFormType) => {
    setLoading(true);

    const payload = {
      email: data.email,
      subject: data.subject,
      message: data.message,
      lastName: data.lastName,
      firstName: data.firstName,
      phoneNumber: data.phoneNumber,
    };

    const response = await contactFormSubmitAction(payload);

    toast(response.message, {
      type: response.status ? "success" : "error",
    });

    if (response.status) {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px]">
      <div className="flex flex-col gap-[25px] lg:gap-[55px]">
        <div className="flex flex-col gap-[30px] lg:gap-[80px] justify-between">
          <div className="flex flex-col lg:flex-row items-center gap-[16px]">
            <SectionTitle title={t.sectionTitle1} className="max-w-[240px]" />

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
              title={t.sectionTitle2}
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
                  placeholder={t.placeholders.firstName}
                  error={errors.firstName?.message}
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
                  placeholder={t.placeholders.lastName}
                  error={errors.lastName?.message}
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
                  placeholder={t.placeholders.email}
                  error={errors.email?.message}
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
                  placeholder={t.placeholders.phoneNumber}
                  error={errors.phoneNumber?.message}
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
                placeholder={t.placeholders.subject}
                error={errors.subject?.message}
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
                placeholder={t.placeholders.message}
                error={errors.message?.message}
              />
            )}
          />

          <CommonButton
            type="submit"
            label={loading ? t.submitting : t.submitButton}
            disabled={loading}
            className="w-full p-[12px] lg:p-[20px] bg-red text-white text-[16px] font-semibold rounded-full"
          />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
