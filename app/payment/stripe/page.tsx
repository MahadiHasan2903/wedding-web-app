"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import CheckoutForm from "@/lib/components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51RdnK9Fgf4EJKcPcZ1exKM2x8bcyu0H8QR6ftYXdwrhQmorSNh6Np62lYqAeryxeSYaZd19CJc7jKdGqMjwW0CuV00llZ2PyLv"
);

const page = () => {
  const fetchClientSecret = async (): Promise<string> => {
    const payload = {
      membershipPurchaseId: "053a5eb9-c9a2-4c8a-a178-56275f6c2332",
      currency: "usd",
      gateway: "stripe",
    };

    const response = await fetch(
      "http://localhost:8080/v1/payment/initiate-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    console.log(data)
    return data.data.clientSecret;
  };

  return (
    <div className="w-full min-h-screen">
      <CheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret,
        }}
      >
        <CheckoutForm />
      </CheckoutProvider>
    </div>
  );
};

export default page;
