"use client";

import React from "react";
import { SectionTitle } from "@/lib/components/heading";
import { SellingPointCard } from "@/lib/components/card";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { star, heart, crown } from "@/lib/components/image/icons";

const translations = {
  en: {
    sectionTitle: "What Makes Us Different?",
    points: [
      {
        title: "Featured Profiles",
        description: "One-time featured boosts help you get noticed quickly.",
      },
      {
        title: "Verified Profiles",
        description: "Serious members can verify their profiles to stand out.",
      },
      {
        title: "Focus on Commitment",
        description:
          "No swiping, no games — just people looking for real, lasting love.",
      },
    ],
  },
  fr: {
    sectionTitle: "Qu'est-ce qui nous rend différents ?",
    points: [
      {
        title: "Profils en vedette",
        description:
          "Des boosts ponctuels pour que votre profil soit rapidement remarqué.",
      },
      {
        title: "Profils vérifiés",
        description:
          "Les membres sérieux peuvent vérifier leur profil pour se démarquer.",
      },
      {
        title: "Concentration sur l'engagement",
        description:
          "Pas de swipes, pas de jeux — juste des personnes cherchant un amour vrai et durable.",
      },
    ],
  },
  es: {
    sectionTitle: "¿Qué nos hace diferentes?",
    points: [
      {
        title: "Perfiles Destacados",
        description:
          "Impulsos destacados únicos para que te noten rápidamente.",
      },
      {
        title: "Perfiles Verificados",
        description:
          "Los miembros serios pueden verificar su perfil para destacar.",
      },
      {
        title: "Enfoque en el Compromiso",
        description:
          "Sin deslizamientos, sin juegos — solo personas buscando un amor real y duradero.",
      },
    ],
  },
};

const UniqueSellingPoints = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] lg:py-[50px] xl:px-[120px] xl:py-[80px] flex flex-col items-center xl:items-start gap-[18px] xl:gap-[45px]">
      <SectionTitle
        title={t.sectionTitle}
        className="max-w-full xl:max-w-[400px]"
      />

      <div className="flex items-start justify-center gap-[24px] flex-wrap">
        {t.points.map((card, index) => (
          <SellingPointCard
            key={index}
            icon={[star, crown, heart][index]}
            alt={["featured", "verified", "serious"][index]}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default UniqueSellingPoints;
