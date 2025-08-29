"use client";

import React from "react";
import storyImage from "@/public/images/about/story.jpg";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { HeadingLine, SectionTitle } from "@/lib/components/heading";

const translations = {
  en: {
    storyTitle: "Our Story",
    storyParagraph1:
      "At FrenchCubaWedding, we believe that love has no borders. Born from a passion for cultural connection and meaningful relationships, we created a platform that blends elegance, sincerity, and modern matchmaking — with a special touch inspired by the warmth of Cuban spirit and the romance of French charm.",
    storyParagraph2:
      "Whether you're in Paris, Havana, or anywhere in between, FrenchCubaWedding is a space where genuine people come together to build something real.",
    missionTitle: "Our Mission",
    missionParagraph:
      "To connect sincere individuals from all backgrounds in a safe, respectful, and culturally rich environment helping them find lasting companionship built on trust, compatibility, and intent.",
  },
  fr: {
    storyTitle: "Notre Histoire",
    storyParagraph1:
      "Chez FrenchCubaWedding, nous croyons que l'amour n'a pas de frontières. Née d'une passion pour la connexion culturelle et les relations significatives, nous avons créé une plateforme qui allie élégance, sincérité et rencontres modernes — avec une touche spéciale inspirée par la chaleur de l'esprit cubain et le romantisme du charme français.",
    storyParagraph2:
      "Que vous soyez à Paris, La Havane ou ailleurs, FrenchCubaWedding est un espace où des personnes sincères se rencontrent pour construire quelque chose de réel.",
    missionTitle: "Notre Mission",
    missionParagraph:
      "Connecter des individus sincères de tous horizons dans un environnement sûr, respectueux et culturellement riche, les aidant à trouver une relation durable basée sur la confiance, la compatibilité et l'intention.",
  },
  es: {
    storyTitle: "Nuestra Historia",
    storyParagraph1:
      "En FrenchCubaWedding, creemos que el amor no tiene fronteras. Nacida de una pasión por la conexión cultural y las relaciones significativas, creamos una plataforma que combina elegancia, sinceridad y encuentros modernos — con un toque especial inspirado en la calidez del espíritu cubano y el romanticismo del encanto francés.",
    storyParagraph2:
      "Ya sea que estés en París, La Habana o en cualquier otro lugar, FrenchCubaWedding es un espacio donde personas genuinas se unen para construir algo real.",
    missionTitle: "Nuestra Misión",
    missionParagraph:
      "Conectar a individuos sinceros de todos los orígenes en un entorno seguro, respetuoso y culturalmente enriquecido, ayudándolos a encontrar compañía duradera basada en la confianza, la compatibilidad y la intención.",
  },
};

const CompanyStorySection = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full relative">
      <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px]">
        <div className="max-w-full xl:max-w-[560px] flex flex-col items-center xl:items-start gap-[14px] sm:gap-[24px] xl:gap-[48px]">
          <SectionTitle title={t.storyTitle} />
          <div className="hidden xl:block">
            <HeadingLine color="primary" />
          </div>
          <p className="text-[12px] sm:text-[14px] text-justify lg:text-left">
            {t.storyParagraph1}
          </p>
          <div className="block xl:hidden ">
            <div className="w-[240px] sm:w-[300px] xl:w-[712px] h-[160px] sm:h-[200px]  xl:h-[470px] relative overflow-hidden">
              <ImageWithFallback
                src={storyImage}
                fill
                className="object-cover"
                alt="storyImage"
              />
            </div>
          </div>
          <p className="text-[12px] sm:text-[14px] lg:text-[18px] xl:text-[24px] text-justify lg:text-left">
            {t.storyParagraph2}
          </p>
        </div>
      </div>
      <div className="hidden xl:block absolute top-[23%] right-0">
        <div className="w-[240px] xl:w-[600px] h-[160px] xl:h-[470px] relative overflow-hidden">
          <ImageWithFallback
            src={storyImage}
            fill
            className="object-cover"
            alt="storyImage"
          />
        </div>
      </div>
      <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px] bg-red text-white">
        <div className="w-full flex flex-col items-center xl:items-start gap-[14px] xl:gap-[48px]">
          <SectionTitle title={t.missionTitle} />
          <div className="hidden xl:block">
            <HeadingLine color="white" />
          </div>
          <p className="text-[12px] sm:text-[14px] lg:text-[18px] xl:text-[24px] text-center lg:text-left">
            {t.missionParagraph}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyStorySection;
