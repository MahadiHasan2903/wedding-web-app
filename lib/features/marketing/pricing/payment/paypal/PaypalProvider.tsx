import React from "react";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  initiatePaymentAction,
  paypalPaymentCallbackAction,
} from "@/lib/action/payment/payment.action";
import usePurchasePackageStore from "@/lib/store/usePurchaseStore";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PropsType {
  PAYPAL_CLIENT_ID?: string;
}

const PaypalProvider = ({ PAYPAL_CLIENT_ID }: PropsType) => {
  const router = useRouter();
  const { msPackagePurchaseData, clearMsPackagePurchaseData } =
    usePurchasePackageStore();

  // Return null if PayPal client ID is not provided
  if (!PAYPAL_CLIENT_ID) {
    console.error("Missing Paypal client id.");
    return null;
  }

  // PayPal script options configuration
  const initialOptions = {
    clientId: PAYPAL_CLIENT_ID,
    currency: "USD",
    components: "buttons",
    disableFunding: ["paylater", "card", "credit"],
  };

  // Create a PayPal order and get the transaction ID
  const handleCreateOrder = async (): Promise<string> => {
    if (msPackagePurchaseData) {
      const payload = {
        membershipPurchaseId: msPackagePurchaseData.msPackagePurchaseId,
        currency: "usd",
        gateway: "paypal",
      };

      const paymentInitialingResponse = await initiatePaymentAction(payload);

      if (paymentInitialingResponse.status && paymentInitialingResponse.data) {
        return paymentInitialingResponse.data.transactionId;
      }
    }

    return "";
  };

  // Handle approval callback after successful PayPal payment
  const handleApprove = async (data: { orderID: string }) => {
    const confirmPaymentResponse = await paypalPaymentCallbackAction(
      data.orderID
    );

    // Show success/error toast based on payment status
    toast(confirmPaymentResponse.message, {
      type: confirmPaymentResponse.status ? "success" : "error",
    });

    // Redirect user if payment is confirmed
    if (confirmPaymentResponse.status) {
      clearMsPackagePurchaseData();
      await signOut();
      router.push(`${confirmPaymentResponse.data?.url}`);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "pay",
              height: 45,
            }}
            createOrder={handleCreateOrder}
            onApprove={(data) => handleApprove(data)}
            onError={(err) => console.log("Error:", err)}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default PaypalProvider;
