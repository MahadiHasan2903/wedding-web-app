"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { UnderlineInput } from "@/lib/components/form-elements";

const translations = {
  en: {
    fullName: "Full Name",
    enterFullName: "Enter your name",
    email: "Email",
    enterEmail: "Enter your email",
    phoneNumber: "Phone Number",
    enterPhoneNumber: "Enter your phone number",
  },
  fr: {
    fullName: "Nom complet",
    enterFullName: "Entrez votre nom",
    email: "E-mail",
    enterEmail: "Entrez votre e-mail",
    phoneNumber: "Numéro de téléphone",
    enterPhoneNumber: "Entrez votre numéro de téléphone",
  },
  es: {
    fullName: "Nombre completo",
    enterFullName: "Ingrese su nombre",
    email: "Correo electrónico",
    enterEmail: "Ingrese su correo electrónico",
    phoneNumber: "Número de teléfono",
    enterPhoneNumber: "Ingrese su número de teléfono",
  },
};

interface PropsType {
  selectedMethod: string;
  setSelectedMethod: Dispatch<SetStateAction<"credit-card" | "paypal">>;
}

const BillingDetails = ({ selectedMethod, setSelectedMethod }: PropsType) => {
  const { data: session } = useSession();
  const { language } = useLanguageStore();
  const t = translations[language];

  const user = session?.user.data;

  return (
    <div className="flex flex-col items-start gap-[25px]">
      <UnderlineInput
        label={t.fullName}
        type="text"
        name="name"
        placeholder={t.enterFullName}
        readOnly
        value={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
      />

      {selectedMethod === "paypal" && (
        <UnderlineInput
          label={t.email}
          type="email"
          name="email"
          placeholder={t.enterEmail}
          readOnly
          value={user?.email ?? ""}
        />
      )}

      <UnderlineInput
        label={t.phoneNumber}
        type="text"
        name="phoneNumber"
        placeholder={t.enterPhoneNumber}
        readOnly
        value={user?.phoneNumber ?? ""}
      />
    </div>
  );
};

export default BillingDetails;
