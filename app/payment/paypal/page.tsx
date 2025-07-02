"use client";

import React, { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const initialOptions = {
    clientId:
      "AQ-IQGxgb29-mmKdr9NxGwoKfJ71vtYbybxjEMfpSjIJURuXNkgQXBTzJoTKxonErkBW_uGOb24hu9Fv",
    currency: "USD",
    components: "buttons",
    disableFunding: ["paylater", "card", "credit"],
  };

  const handleCreateOrder = async (): Promise<string> => {
    setError(null);
    try {
      const payload = {
        membershipPurchaseId: "053a5eb9-c9a2-4c8a-a178-56275f6c2332",
        currency: "usd",
        gateway: "paypal",
      };

      const response = await fetch(
        "http://localhost:8080/v1/payment/initiate-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();

      if (!result?.data?.transactionId) {
        throw new Error("Missing transaction ID in response");
      }

      return result.data.transactionId;
    } catch (err) {
      const message = (err as Error).message || "Order creation failed";
      setError(message);
      throw new Error(message);
    }
  };

  const handleApprove = async (data: { orderID: string }) => {
    setError(null);
    try {
      const confirmRes = await fetch(
        `http://localhost:8080/v1/payment/paypal-payment-callback?orderId=${data.orderID}`,
        { method: "POST" }
      );

      if (!confirmRes.ok) {
        throw new Error(`Payment confirmation failed: ${confirmRes.status}`);
      }

      const confirmResult = await confirmRes.json();
      router.push(confirmResult.data.url || "/");
    } catch (err) {
      const message = (err as Error).message || "Payment approval failed";
      setError(message);
      console.error("Payment error:", err);
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-10">
      <PayPalScriptProvider options={initialOptions}>
        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={handleCreateOrder}
          onApprove={(data) => handleApprove(data)}
          onError={(err) => console.log("Error:", err)}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Page;
