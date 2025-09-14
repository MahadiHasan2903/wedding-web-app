"use client";

import React from "react";
import Link from "next/link";
import { socialLinks } from "@/lib/utils/data";
import { ImageWithFallback } from "@/lib/components/image";
import community from "@/public/images/about/community.jpg";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { HeadingLine, SectionTitle } from "@/lib/components/heading";

const translations = {
  en: {
    title: "Looking Ahead",
    paragraph:
      "Our growing community is shaped by every story, every message, and every match. As we evolve, we promise to stay true to our values: trust, clarity, and commitment.",
  },
  fr: {
    title: "Regard vers l'avenir",
    paragraph:
      "Notre communauté en pleine croissance est façonnée par chaque histoire, chaque message et chaque rencontre. À mesure que nous évoluons, nous promettons de rester fidèles à nos valeurs : confiance, clarté et engagement.",
  },
  es: {
    title: "Mirando Hacia el Futuro",
    paragraph:
      "Nuestra comunidad en crecimiento se construye con cada historia, cada mensaje y cada encuentro. A medida que evolucionamos, prometemos mantenernos fieles a nuestros valores: confianza, claridad y compromiso.",
  },
};

const LookingAheadSection = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full px-[18px] pt-[8px] pb-[18px] sm:px-[60px] sm:pb-[32px] md:pb-[50px] xl:px-[120px] xl:pb-[70px] flex flex-col-reverse lg:flex-row items-center justify-between gap-[18px] sm:gap-[24px] lg:gap-[65px]">
      <div className="lg:hidden flex items-center gap-[7px] pb-[20px]">
        {socialLinks.map(({ href, Icon }, index) => (
          <Link
            key={index}
            href={href}
            className="p-[4px] border border-primaryBorder rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size={17} />
          </Link>
        ))}
      </div>
      <div className="max-w-[250px] sm:max-w-[400px] lg:max-w-full w-full lg:w-1/2 h-[120px] sm:h-[180px] lg:h-[330px] relative overflow-hidden">
        <ImageWithFallback
          src={community}
          fill
          className="object-cover"
          alt="community"
        />
      </div>
      <div className="w-full h-full max-w-[500px] flex flex-col items-end gap-[35px]">
        <div className="flex flex-col items-center lg:items-end gap-[18px] sm:gap-[24px] lg:gap-[48px] ">
          <SectionTitle title={t.title} />
          <div className="hidden lg:block">
            <HeadingLine color="primary" />
          </div>
          <p className="text-[10px] sm:text-[14px] lg:text-[24px] font-normal text-justify lg:text-end">
            {t.paragraph}
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-[16px]">
          {socialLinks.map(({ href, Icon }, index) => (
            <Link
              key={index}
              href={href}
              className="p-[6px] border border-primaryBorder rounded-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={22} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LookingAheadSection;
