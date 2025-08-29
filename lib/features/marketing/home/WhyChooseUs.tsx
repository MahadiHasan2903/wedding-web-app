"use client";

import React from "react";
import { WhyChooseUsCard } from "@/lib/components/card";
import { SectionTitle } from "@/lib/components/heading";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { star, heart, crown } from "@/lib/components/image/icons";

const translations = {
  en: {
    sectionTitle: "Why Choose FrenchCubaWedding?",
    cards: [
      {
        secondaryLine: "Featured Profiles for",
        primaryLine: "Faster Matching",
        description:
          "Get noticed first. As a featured member, your profile appears at the top — increasing your chances of matching with serious users faster.",
      },
      {
        secondaryLine: "Verified Profiles that",
        primaryLine: "You Can Trust",
        description:
          "We value safety and authenticity. Verified badges help you connect confidently with real people who are here for the right reasons.",
      },
      {
        secondaryLine: "Focused on",
        primaryLine: "Serious Relationships",
        description:
          "No distractions. No games. FrenchCubaWedding is built for those who are ready to commit and looking for genuine, lasting connections.",
      },
    ],
  },
  fr: {
    sectionTitle: "Pourquoi choisir FrenchCubaWedding ?",
    cards: [
      {
        secondaryLine: "Profils en vedette pour",
        primaryLine: "Correspondance plus rapide",
        description:
          "Soyez remarqué en premier. En tant que membre en vedette, votre profil apparaît en haut — augmentant vos chances de correspondre plus rapidement avec des utilisateurs sérieux.",
      },
      {
        secondaryLine: "Profils vérifiés que",
        primaryLine: "Vous pouvez faire confiance",
        description:
          "Nous valorisons la sécurité et l'authenticité. Les badges vérifiés vous aident à vous connecter en toute confiance avec de vraies personnes présentes pour les bonnes raisons.",
      },
      {
        secondaryLine: "Axé sur",
        primaryLine: "Des relations sérieuses",
        description:
          "Pas de distractions. Pas de jeux. FrenchCubaWedding est conçu pour ceux qui sont prêts à s'engager et cherchent des relations authentiques et durables.",
      },
    ],
  },
  es: {
    sectionTitle: "¿Por qué elegir FrenchCubaWedding?",
    cards: [
      {
        secondaryLine: "Perfiles destacados para",
        primaryLine: "Coincidencia más rápida",
        description:
          "Destaca primero. Como miembro destacado, tu perfil aparece en la parte superior, aumentando tus posibilidades de coincidir más rápido con usuarios serios.",
      },
      {
        secondaryLine: "Perfiles verificados que",
        primaryLine: "Puedes confiar",
        description:
          "Valoramos la seguridad y la autenticidad. Las insignias verificadas te ayudan a conectarte con confianza con personas reales que están aquí por las razones correctas.",
      },
      {
        secondaryLine: "Enfocado en",
        primaryLine: "Relaciones serias",
        description:
          "Sin distracciones. Sin juegos. FrenchCubaWedding está construido para aquellos que están listos para comprometerse y buscan conexiones genuinas y duraderas.",
      },
    ],
  },
};

export const whyChooseUsData = [
  { icon: star, alt: "featured" },
  { icon: crown, alt: "verified" },
  { icon: heart, alt: "serious" },
];

const WhyChooseUs = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px] flex flex-col items-center xl:items-start gap-[15px] sm:gap-[30px] xl:gap-[45px]">
      <SectionTitle
        title={t.sectionTitle}
        className="max-w-[180px] sm:max-w-[400px] text-center xl:text-left"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start gap-[16px] xl:gap-[24px]">
        {whyChooseUsData.map((card, index) => (
          <WhyChooseUsCard
            key={index}
            icon={card.icon}
            alt={card.alt}
            primaryLine={t.cards[index].primaryLine}
            secondaryLine={t.cards[index].secondaryLine}
            description={t.cards[index].description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
