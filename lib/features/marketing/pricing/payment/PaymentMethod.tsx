import React, { useState } from "react";
import Link from "next/link";
import {
  americanExpress,
  masterCard,
  paypal,
  visa,
} from "@/lib/components/image/icons";
import PaypalProvider from "./paypal/PaypalProvider";
import { ImageWithFallback } from "@/lib/components/image";
import StripeCheckoutProvider from "./stripe/StripeCheckoutProvider";

interface PropsType {
  PAYPAL_CLIENT_ID?: string;
  STRIPE_PUBLISHABLE_KEY?: string;
}

const PaymentMethod = ({
  PAYPAL_CLIENT_ID,
  STRIPE_PUBLISHABLE_KEY,
}: PropsType) => {
  const [selectedMethod, setSelectedMethod] = useState<
    "credit-card" | "paypal"
  >("paypal");

  return (
    <div className="w-full flex flex-col gap-[30px]">
      {/* Paypal Option */}
      <label
        className={`w-full flex items-center justify-between border ${
          selectedMethod === "paypal"
            ? "border-primary"
            : "border-primaryBorder"
        } py-[13px] px-[20px] rounded-[10px] cursor-pointer`}
        onClick={() => setSelectedMethod("paypal")}
      >
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            checked={selectedMethod === "paypal"}
            onChange={() => setSelectedMethod("paypal")}
            className="accent-primary"
          />
          <p>Paypal</p>
        </div>
        <div className="flex items-center gap-[2px]">
          <ImageWithFallback src={paypal} width={40} height={12} alt="paypal" />
        </div>
      </label>

      <label
        className={`w-full flex items-center justify-between border ${
          selectedMethod === "credit-card"
            ? "border-primary"
            : "border-primaryBorder"
        } py-[13px] px-[20px] rounded-[10px] cursor-pointer`}
        onClick={() => setSelectedMethod("credit-card")}
      >
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            checked={selectedMethod === "credit-card"}
            onChange={() => setSelectedMethod("credit-card")}
            className="accent-primary"
          />
          <p>Credit Card</p>
        </div>
        <div className="flex items-center gap-[2px]">
          <ImageWithFallback src={visa} width={27} height={8} alt="visa" />
          <ImageWithFallback
            src={masterCard}
            width={27}
            height={8}
            alt="masterCard"
          />
          <ImageWithFallback
            src={americanExpress}
            width={27}
            height={8}
            alt="americanExpress"
          />
        </div>
      </label>

      <div className="w-full flex flex-col items-center">
        {selectedMethod === "credit-card" && (
          <StripeCheckoutProvider
            STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY}
          />
        )}
        {selectedMethod === "paypal" && (
          <PaypalProvider PAYPAL_CLIENT_ID={PAYPAL_CLIENT_ID} />
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
