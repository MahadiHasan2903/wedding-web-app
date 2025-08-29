"use client";

import React from "react";
import Link from "next/link";
import { PageTitle } from "@/lib/components/heading";
import useLanguageStore from "@/lib/store/useLanguageStore";

const translations = {
  en: { home: "Home", about: "About", pricing: "Pricing", contact: "Contact" },
  fr: {
    home: "Accueil",
    about: "À propos",
    pricing: "Tarifs",
    contact: "Contact",
  },
  es: {
    home: "Inicio",
    about: "Acerca de",
    pricing: "Precios",
    contact: "Contacto",
  },
};

const HeroBanner = ({
  titleKey,
}: {
  titleKey: keyof (typeof translations)["en"];
}) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full h-[250px] lg:h-[400px] xl:h-[500px]">
      <div className="w-full h-full bg-heroBanner bg-no-repeat bg-top bg-cover text-white">
        <div className="w-full h-full flex flex-col items-center justify-center gap-[16px]">
          <div className="flex items-center gap-1 text-[10px] sm:text-[16px] font-normal">
            <Link href="/">{t.home}</Link> {">"} <span>{t[titleKey]}</span>
          </div>
          <PageTitle title={t[titleKey]} />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
