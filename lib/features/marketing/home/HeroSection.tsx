"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import CommonButton from "@/lib/components/buttons/CommonButton";
import { SectionTitle, PageTitle } from "@/lib/components/heading";
import girlsGroups from "@/public/images/landing-page/group-of-girls-cartoon.png";

const translations = {
  en: {
    heroTitle: "Love Feels Different Here",
    heroSubtitle: "We help you find the one who’s meant to stay",
    heroButton: "Find Your Match",
    stats: [
      "Meet with Purpose",
      "Trusted by 5,000+ Early Users",
      "Create Your Profile Free",
    ],
    sectionTitle1: "Stand Out from the Crowd.",
    sectionTitle2: "Get Verified and Access VIP Benefits.",
    sectionButton: "Know More",
  },
  fr: {
    heroTitle: "L'amour se ressent différemment ici",
    heroSubtitle:
      "Nous vous aidons à trouver celui ou celle qui est fait pour rester",
    heroButton: "Trouvez Votre Partenaire",
    stats: [
      "Rencontrez avec un objectif",
      "Fiable pour plus de 5 000 utilisateurs précoces",
      "Créez votre profil gratuitement",
    ],
    sectionTitle1: "Démarquez-vous de la foule.",
    sectionTitle2: "Faites-vous vérifier et accédez aux avantages VIP.",
    sectionButton: "En savoir plus",
  },
  es: {
    heroTitle: "El amor se siente diferente aquí",
    heroSubtitle: "Te ayudamos a encontrar a quien está destinado a quedarse",
    heroButton: "Encuentra tu pareja",
    stats: [
      "Conoce con propósito",
      "Confiado por más de 5,000 primeros usuarios",
      "Crea tu perfil gratis",
    ],
    sectionTitle1: "Destácate entre la multitud.",
    sectionTitle2: "Verifícate y accede a los beneficios VIP.",
    sectionButton: "Saber más",
  },
};

const HeroSection = () => {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <div className="w-full">
      <div className="w-full h-[385px] md:h-[500px] xl:h-[870px]">
        <div className="w-full h-full bg-landingHero bg-no-repeat bg-center bg-cover">
          <div className="w-full h-full flex flex-col gap-[18px] xl:gap-[75px] items-center justify-center text-white text-center z-10">
            <div className="flex flex-col items-center mt-[200px] sm:mt-[150px] md:mt-[200px] xl:mt-[450px]">
              <PageTitle title={t.heroTitle} />
              <p className="text-[12px] sm:text-[16px] lg-text-[24px] font-semibold mt-2 mb-[16px] xl:mb-[30px]">
                {t.heroSubtitle}
              </p>
              <CommonButton
                href="/find-match"
                label={t.heroButton}
                className="w-fit flex items-center gap-[10px] px-[20px] xl:px-[30px] py-[10px] bg-red text-[10px] sm:text-[16px] xl:text-[24px] font-semibold rounded-full"
              />
            </div>
            <div className="flex flex-col xl:flex-row items-center gap-1 xl:gap-[30px] mb-[30px]">
              {t.stats.map((stat, index) => (
                <React.Fragment key={index}>
                  <p className="text-[10px] sm:text-[14px] xl:text-[20px] font-normal">
                    {stat}
                  </p>
                  {index < t.stats.length - 1 && (
                    <p className="hidden xl:block">|</p>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-red text-white py-[10px] xl:py-[56px] pl-[100px] sm:pl-[140px] xl:pl-0">
        <div className="absolute z-[30] left-2 sm:left-10 md:left-20 top-[-15%] sm:top-[-20%] xl:top-[-30%]">
          <div className="w-[80px] h-[80px] sm:w-[130px] sm:h-[120px] md:w-[180px] md:h-[150px] xl:w-[275px] xl:h-[250px] relative">
            <ImageWithFallback
              src={girlsGroups}
              fill
              className="object-cover"
              alt="girlsGroups"
            />
          </div>
        </div>

        <div className="w-full max-w-screen-xl mx-auto flex justify-end pr-2 sm:pr-8 md:pr-12 lg:pr-28 xl:pr-4">
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-1 xl:gap-[40px]">
            <div>
              <SectionTitle title={t.sectionTitle1} />
              <SectionTitle
                title={t.sectionTitle2}
                className="!font-light mt-0 xl:mt-[-15px]"
              />
            </div>
            <CommonButton
              href="/pricing"
              label={t.sectionButton}
              className="w-fit flex items-center gap-1 xl:gap-2 px-[20px] xl:px-[30px] py-[10px] bg-vipHeavy text-[10px] xl:text-[24px] font-semibold rounded-full"
              endIcon={<FiArrowRight size={20} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
