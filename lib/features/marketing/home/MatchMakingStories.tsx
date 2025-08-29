"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import { StoryCard } from "@/lib/components/card";
import { quote } from "@/lib/components/image/icons";
import { SectionTitle } from "@/lib/components/heading";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import story1 from "@/public/images/landing-page/story-1.jpg";
import story2 from "@/public/images/landing-page/story-2.jpg";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const storiesData = {
  en: [
    {
      id: 1,
      thumbnail: story1,
      name: "Élodie & Javier",
      description:
        "A French artist meets a Cuban entrepreneur — now building a life full of passion.",
    },
    {
      id: 2,
      thumbnail: story2,
      name: "Camille & Diego",
      description:
        "What began with a message became a marriage — across borders, hearts aligned.",
    },
    {
      id: 3,
      thumbnail: story1,
      name: "Élodie & Javier",
      description:
        "A French artist meets a Cuban entrepreneur — now building a life full of passion.",
    },
    {
      id: 4,
      thumbnail: story2,
      name: "Lina & Ahmed",
      description:
        "From Cairo to Copenhagen, their love defied distance, language, and time zones.",
    },
    {
      id: 5,
      thumbnail: story1,
      name: "Sofia & Mateo",
      description:
        "A shared playlist turned into shared dreams — music was just the beginning.",
    },
    {
      id: 6,
      thumbnail: story2,
      name: "Aisha & Mahmud",
      description:
        "They crossed continents for each other — and found home in each other’s hearts.",
    },
  ],
  fr: [
    {
      id: 1,
      thumbnail: story1,
      name: "Élodie & Javier",
      description:
        "Une artiste française rencontre un entrepreneur cubain — ils construisent maintenant une vie pleine de passion.",
    },
    {
      id: 2,
      thumbnail: story2,
      name: "Camille & Diego",
      description:
        "Ce qui a commencé par un message est devenu un mariage — au-delà des frontières, les cœurs sont alignés.",
    },
    {
      id: 3,
      thumbnail: story1,
      name: "Élodie & Javier",
      description:
        "Une artiste française rencontre un entrepreneur cubain — ils construisent maintenant une vie pleine de passion.",
    },
    {
      id: 4,
      thumbnail: story2,
      name: "Lina & Ahmed",
      description:
        "De Le Caire à Copenhague, leur amour a défié la distance, la langue et les fuseaux horaires.",
    },
    {
      id: 5,
      thumbnail: story1,
      name: "Sofia & Mateo",
      description:
        "Une playlist partagée est devenue des rêves partagés — la musique n’était que le début.",
    },
    {
      id: 6,
      thumbnail: story2,
      name: "Aisha & Mahmud",
      description:
        "Ils ont traversé des continents l’un pour l’autre — et ont trouvé un chez-soi dans le cœur de l’autre.",
    },
  ],
  es: [
    {
      id: 1,
      thumbnail: story1,
      name: "Élodie & Javier",
      description:
        "Una artista francesa conoce a un emprendedor cubano — ahora construyendo una vida llena de pasión.",
    },
    {
      id: 2,
      thumbnail: story2,
      name: "Camille & Diego",
      description:
        "Lo que comenzó con un mensaje se convirtió en un matrimonio — cruzando fronteras, los corazones se alinearon.",
    },
    {
      id: 3,
      thumbnail: story1,
      name: "Élodie & Javier",
      description:
        "Una artista francesa conoce a un emprendedor cubano — ahora construyendo una vida llena de pasión.",
    },
    {
      id: 4,
      thumbnail: story2,
      name: "Lina & Ahmed",
      description:
        "De El Cairo a Copenhague, su amor desafió la distancia, el idioma y las zonas horarias.",
    },
    {
      id: 5,
      thumbnail: story1,
      name: "Sofia & Mateo",
      description:
        "Una lista de reproducción compartida se convirtió en sueños compartidos — la música fue solo el comienzo.",
    },
    {
      id: 6,
      thumbnail: story2,
      name: "Aisha & Mahmud",
      description:
        "Atravesaron continentes el uno por el otro — y encontraron un hogar en el corazón del otro.",
    },
  ],
};

const sectionTranslations = {
  en: {
    title: "Where Matches Turn Into Marriages",
    description:
      "Discover how FrenchCubaWedding is creating beautiful beginnings for couples across cultures",
  },
  fr: {
    title: "Là où les rencontres deviennent des mariages",
    description:
      "Découvrez comment FrenchCubaWedding crée de beaux débuts pour les couples de différentes cultures",
  },
  es: {
    title: "Donde las coincidencias se convierten en matrimonios",
    description:
      "Descubre cómo FrenchCubaWedding está creando hermosos comienzos para parejas de diferentes culturas",
  },
};

const MatchMakingStories = () => {
  const sliderRef = useRef<Slider>(null);
  const { language } = useLanguageStore();
  const stories = storiesData[language];
  const t = sectionTranslations[language];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full px-[18px] xl:px-[120px] py-[25px] md:py-[40px] xl:py-[80px] bg-primary">
      <div className="w-full flex flex-col-reverse xl:flex-row items-center xl:items-start gap-[20px] xl:gap-[60px]">
        <div className="xl:hidden flex items-center gap-2 py-3">
          <button
            type="button"
            className="bg-white w-[36px] h-[36px] rounded-full flex items-center justify-center p-1"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <RiArrowLeftSLine />
          </button>
          <button
            type="button"
            className="bg-white w-[36px] h-[36px] rounded-full flex items-center justify-center p-1"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <RiArrowRightSLine />
          </button>
        </div>
        <div className="w-full max-w-[820px]">
          <Slider ref={sliderRef} {...settings}>
            {stories.map((story, index) => (
              <div key={index}>
                <StoryCard story={story} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-full h-full flex flex-col item-center xl:items-end">
          <div className="max-w-full xl:max-w-[341px] mb-0 xl:mb-[70px] flex flex-col gap-[10px] xl:gap-[25px] items-center xl:items-end justify-start text-white text-center xl:text-end">
            <div className="w-[50px] xl:w-[100px] h-[50px] xl:h-[100px] relative overflow-hidden">
              <ImageWithFallback
                src={quote}
                fill
                className="object-contain"
                alt="quote"
              />
            </div>
            <SectionTitle
              title={t.title}
              className="max-w-[250px] xl:max-w-full w-full"
            />
            <p className="mx-w-[320px] sm:max-w-[450px] xl:max-w-full w-full text-[10px] sm:text-[14px] xl:text-[24px] font-normal">
              {t.description}
            </p>
          </div>
          <div className="hidden xl:flex items-center gap-2">
            <button
              type="button"
              className="bg-white w-[36px] h-[36px] rounded-full flex items-center justify-center p-1"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <RiArrowLeftSLine />
            </button>
            <button
              type="button"
              className="bg-white w-[36px] h-[36px] rounded-full flex items-center justify-center p-1"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <RiArrowRightSLine />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchMakingStories;
