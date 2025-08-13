"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { UnderlineInput } from "@/lib/components/form-elements";

interface PropsType {
  selectedMethod: string;
  setSelectedMethod: Dispatch<SetStateAction<"credit-card" | "paypal">>;
}

const BillingDetails = ({ selectedMethod, setSelectedMethod }: PropsType) => {
  const { data: session } = useSession();

  const user = session?.user.data;

  return (
    <div className="flex flex-col items-start gap-[25px]">
      <UnderlineInput
        label="Full Name"
        type="text"
        name="name"
        placeholder="Enter your name"
        readOnly
        value={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
      />

      {selectedMethod === "paypal" && (
        <UnderlineInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          readOnly
          value={user?.email ?? ""}
        />
      )}

      <UnderlineInput
        label="Phone Number"
        type="text"
        name="phoneNumber"
        placeholder="Enter your phone number"
        readOnly
        value={user?.phoneNumber ?? ""}
      />
    </div>
  );
};

export default BillingDetails;
