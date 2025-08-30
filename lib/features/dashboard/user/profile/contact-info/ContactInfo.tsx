"use client";

import React, { useState } from "react";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import ContactInfoUpdateForm from "./ContactInfoUpdateForm";
import useLanguageStore from "@/lib/store/useLanguageStore";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    contactAccessibility: "Contact & Accessibility",
    editInfo: "Edit Info",
    preferredLanguage: "Preferred Language",
    phone: "Phone",
    email: "Email",
    timezone: "Timezone",
    notAvailable: "N/A",
  },
  fr: {
    contactAccessibility: "Contact & Accessibilité",
    editInfo: "Modifier les informations",
    preferredLanguage: "Langue préférée",
    phone: "Téléphone",
    email: "E-mail",
    timezone: "Fuseau horaire",
    notAvailable: "N/D",
  },
  es: {
    contactAccessibility: "Contacto y Accesibilidad",
    editInfo: "Editar información",
    preferredLanguage: "Idioma preferido",
    phone: "Teléfono",
    email: "Correo electrónico",
    timezone: "Zona horaria",
    notAvailable: "N/D",
  },
};

interface PropsType {
  userProfile: User;
  editable?: boolean;
}

const ContactInfo = ({ userProfile, editable = false }: PropsType) => {
  const [open, setOpen] = useState(false);

  // Get current language from global store
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between">
          <CardTitle title={t.contactAccessibility} />
          {editable && (
            <CommonButton
              label={t.editInfo}
              onClick={() => setOpen(true)}
              className="w-fit flex items-center gap-[8px] bg-transparent border border-primaryBorder text-black text-[10px] font-normal rounded-full p-[6px] lg:p-[10px]"
              startIcon={
                <ImageWithFallback
                  src={editIcon}
                  width={13}
                  height={13}
                  alt="edit-icon"
                />
              }
            />
          )}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px] gap-[16px] lg:gap-[25px]">
        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] lg:text-[14px] font-semibold">
            {t.preferredLanguage}
          </p>
          <p className="text-[10px] lg:text-[14px] font-normal">
            {userProfile.preferredLanguages?.length
              ? userProfile.preferredLanguages.join(", ")
              : t.notAvailable}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] lg:text-[14px] font-semibold">{t.phone}</p>
          <p className="text-[10px] lg:text-[14px] font-normal">
            {userProfile.phoneNumber || t.notAvailable}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] lg:text-[14px] font-semibold">{t.email}</p>
          <p className="text-[10px] lg:text-[14px] font-normal">
            {userProfile.email || t.notAvailable}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="text-[10px] lg:text-[14px] font-semibold">
            {t.timezone}
          </p>
          <p className="text-[10px] lg:text-[14px] font-normal">
            {userProfile.timeZone || t.notAvailable}
          </p>
        </div>
      </div>
      {open && (
        <ContactInfoUpdateForm
          open={open}
          setOpen={setOpen}
          userProfile={userProfile}
        />
      )}
    </div>
  );
};

export default ContactInfo;
