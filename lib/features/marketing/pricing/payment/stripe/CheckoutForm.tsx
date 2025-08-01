import React, { ChangeEvent, FormEvent, useState } from "react";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import { CommonButton } from "@/lib/components/buttons";

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

  const handleBlur = async () => {
    if (!email) {
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
        Email <span className="text-red">*</span>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email"
          className={`
          w-full text-[12px] lg:text-[14px] py-[10px] border-b outline-none transition-all duration-200 ${
            error ? "border-red" : "border-primaryBorder focus:border-primary"
          } `}
        />
      </label>
      {error && <div id="email-errors">{error}</div>}
    </div>
  );
};

const CheckoutForm = () => {
  const checkout = useCheckout();

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
        label={
          isLoading
            ? "Processing Payment..."
            : `Pay ${checkout.total.total.amount} now`
        }
        className="w-full bg-primary text-white font-semibold px-[14px] py-[10px] text-[14px] rounded-[5px]"
      />
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
