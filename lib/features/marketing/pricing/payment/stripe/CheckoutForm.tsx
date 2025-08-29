"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { CommonButton } from "@/lib/components/buttons";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";

const translations = {
  en: {
    emailLabel: "Email",
    emailRequired: "Email is required",
    processingPayment: "Processing Payment...",
    payNow: "Pay {amount} now",
  },
  fr: {
    emailLabel: "E-mail",
    emailRequired: "E-mail requis",
    processingPayment: "Traitement du paiement...",
    payNow: "Payer {amount} maintenant",
  },
  es: {
    emailLabel: "Correo electrónico",
    emailRequired: "Correo electrónico requerido",
    processingPayment: "Procesando pago...",
    payNow: "Pagar {amount} ahora",
  },
};

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  error: string | null;
  setError: (msg: string | null) => void;
}

const validateEmail = async (
  email: string,
  checkout: ReturnType<typeof useCheckout>
) => {
  const updateResult = await checkout.updateEmail(email);
  const isValid = updateResult.type !== "error";

  return { isValid, message: !isValid ? updateResult.error.message : null };
};

const EmailInput = ({ email, setEmail, error, setError }: EmailInputProps) => {
  const checkout = useCheckout();
  const { language } = useLanguageStore();
  const t = translations[language];

  const handleBlur = async () => {
    if (!email) {
      setError(t.emailRequired);
      return;
    }

    const { isValid, message } = await validateEmail(email, checkout);
    if (!isValid) {
      setError(message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setEmail(e.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <label className="text-[12px] lg:text-[14px] font-medium">
        {t.emailLabel} <span className="text-red">*</span>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={t.emailLabel}
          className={`
          w-full text-[12px] lg:text-[14px] py-[10px] border-b outline-none transition-all duration-200 ${
            error ? "border-red" : "border-primaryBorder focus:border-primary"
          } `}
        />
      </label>
      {error && (
        <div id="email-errors" className="text-red text-[12px] mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

const CheckoutForm = () => {
  const checkout = useCheckout();
  const { language } = useLanguageStore();
  const t = translations[language];

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { isValid, message } = await validateEmail(email, checkout);
    if (!isValid) {
      setEmailError(message);
      setMessage(message);
      setIsLoading(false);
      return;
    }

    const confirmResult = await checkout.confirm();
    if (confirmResult.type === "error") {
      setMessage(confirmResult.error.message);
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col item-start gap-[23px]"
    >
      <EmailInput
        email={email}
        setEmail={setEmail}
        error={emailError}
        setError={setEmailError}
      />

      <PaymentElement id="payment-element" />

      <CommonButton
        disabled={isLoading}
        type="submit"
        label={
          isLoading
            ? t.processingPayment
            : t.payNow.replace(
                "{amount}",
                checkout.total.total.amount.toString()
              )
        }
        className="w-full bg-primary text-white font-semibold px-[14px] py-[10px] text-[14px] rounded-[5px]"
      />
    </form>
  );
};

export default CheckoutForm;
