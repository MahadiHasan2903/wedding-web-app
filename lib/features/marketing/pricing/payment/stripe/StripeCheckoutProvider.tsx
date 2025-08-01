"use client";

import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import usePurchasePackageStore from "@/lib/store/usePurchaseStore";
import { initiatePaymentAction } from "@/lib/action/payment/payment.action";

interface PropsType {
  STRIPE_PUBLISHABLE_KEY?: string;
}

const StripeCheckoutProvider = ({ STRIPE_PUBLISHABLE_KEY }: PropsType) => {
  const { msPackagePurchaseData } = usePurchasePackageStore();

  // Return null if publishable key is missing
  if (!STRIPE_PUBLISHABLE_KEY) {
    console.error("Missing Stripe publishable key.");
    return null;
  }

  // Initialize Stripe.js instance
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  // Fetch client secret from backend to initialize Stripe payment
  const fetchClientSecret = async (): Promise<string> => {
    if (msPackagePurchaseData) {
      const payload = {
        membershipPurchaseId: msPackagePurchaseData.msPackagePurchaseId,
        currency: "usd",
        gateway: "stripe",
      };

      const paymentInitialingResponse = await initiatePaymentAction(payload);

      if (
        paymentInitialingResponse.status &&
        paymentInitialingResponse.data &&
        paymentInitialingResponse.data.clientSecret
      ) {
        return paymentInitialingResponse.data.clientSecret;
      }
    }

    // Return empty string if unable to fetch client secret
    return "";
  };

  return (
    <div className="w-full">
      <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <CheckoutForm />
      </CheckoutProvider>
    </div>
  );
};

export default StripeCheckoutProvider;
