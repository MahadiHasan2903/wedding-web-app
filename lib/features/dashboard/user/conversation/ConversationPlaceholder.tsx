"use client";

import React from "react";
import useLanguageStore from "@/lib/store/useLanguageStore";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    placeholder: "Please select a conversation to start messaging",
  },
  fr: {
    placeholder:
      "Veuillez sélectionner une conversation pour commencer à envoyer des messages",
  },
  es: {
    placeholder: "Seleccione una conversación para comenzar a enviar mensajes",
  },
};

const ConversationPlaceholder = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full max-w-[240px] text-[14px] font-semibold text-center text-[#292D32]">
      {t.placeholder}
    </div>
  );
};

export default ConversationPlaceholder;
