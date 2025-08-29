"use client";

import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { SectionTitle } from "@/lib/components/heading";
import useLanguageStore from "@/lib/store/useLanguageStore";

const translations = {
  en: [
    {
      question: "Is FrenchCubaWedding only for French or Cuban users?",
      answer:
        "No, FrenchCubaWedding is open to everyone, regardless of nationality. While the platform celebrates French and Cuban cultural values, we welcome users from all backgrounds who are seeking meaningful, committed relationships.",
    },
    {
      question: "What is a Featured Profile?",
      answer:
        "A Featured Profile is highlighted across the platform to gain extra visibility. This feature increases your chances of connecting by showcasing your profile more prominently in search results and suggestions.",
    },
    {
      question: "What is a Verified Profile?",
      answer:
        "A Verified Profile means the user's identity has been confirmed through our verification process. It adds trust and credibility, helping you feel more confident about who you're interacting with.",
    },
    {
      question: "Is FrenchCubaWedding free to use?",
      answer:
        "Yes, you can join and use FrenchCubaWedding for free. We also offer premium features that enhance your experience, such as boosting your profile visibility and accessing advanced filters.",
    },
    {
      question: "What’s the difference between Featured and Verified Profiles?",
      answer:
        "A Verified Profile confirms the user's identity for safety and trust, while a Featured Profile is promoted on the platform for more visibility. They serve different purposes but can be used together for better results.",
    },
    {
      question: "How do I verify my profile?",
      answer:
        "To verify your profile, go to your account settings and follow the verification steps. This may involve submitting a government-issued ID or taking a live photo. Our team will review and approve your request.",
    },
  ],
  fr: [
    {
      question:
        "FrenchCubaWedding est-il réservé aux utilisateurs français ou cubains ?",
      answer:
        "Non, FrenchCubaWedding est ouvert à tous, quelle que soit la nationalité. Bien que la plateforme célèbre les valeurs culturelles françaises et cubaines, nous accueillons des utilisateurs de tous horizons recherchant des relations sérieuses et engagées.",
    },
    {
      question: "Qu'est-ce qu'un profil en vedette ?",
      answer:
        "Un profil en vedette est mis en avant sur la plateforme pour obtenir plus de visibilité. Cette fonctionnalité augmente vos chances de connexion en affichant votre profil de manière plus visible dans les résultats de recherche et les suggestions.",
    },
    {
      question: "Qu'est-ce qu'un profil vérifié ?",
      answer:
        "Un profil vérifié signifie que l'identité de l'utilisateur a été confirmée via notre processus de vérification. Cela ajoute confiance et crédibilité, vous aidant à interagir en toute sécurité.",
    },
    {
      question: "FrenchCubaWedding est-il gratuit ?",
      answer:
        "Oui, vous pouvez rejoindre et utiliser FrenchCubaWedding gratuitement. Nous proposons également des fonctionnalités premium qui améliorent votre expérience, comme la visibilité du profil et des filtres avancés.",
    },
    {
      question:
        "Quelle est la différence entre les profils en vedette et vérifiés ?",
      answer:
        "Un profil vérifié confirme l'identité de l'utilisateur pour la sécurité et la confiance, tandis qu'un profil en vedette est promu sur la plateforme pour plus de visibilité. Ils servent des objectifs différents mais peuvent être combinés pour de meilleurs résultats.",
    },
    {
      question: "Comment vérifier mon profil ?",
      answer:
        "Pour vérifier votre profil, accédez aux paramètres de votre compte et suivez les étapes de vérification. Cela peut inclure la soumission d'une pièce d'identité ou la prise d'une photo en direct. Notre équipe examinera et approuvera votre demande.",
    },
  ],
  es: [
    {
      question: "¿FrenchCubaWedding es solo para usuarios franceses o cubanos?",
      answer:
        "No, FrenchCubaWedding está abierto a todos, sin importar la nacionalidad. Aunque la plataforma celebra los valores culturales franceses y cubanos, damos la bienvenida a usuarios de todos los orígenes que buscan relaciones significativas y comprometidas.",
    },
    {
      question: "¿Qué es un Perfil Destacado?",
      answer:
        "Un Perfil Destacado se resalta en la plataforma para obtener mayor visibilidad. Esta función aumenta sus posibilidades de conexión mostrando su perfil de manera más prominente en los resultados de búsqueda y sugerencias.",
    },
    {
      question: "¿Qué es un Perfil Verificado?",
      answer:
        "Un Perfil Verificado significa que la identidad del usuario ha sido confirmada a través de nuestro proceso de verificación. Esto añade confianza y credibilidad, ayudándote a interactuar con seguridad.",
    },
    {
      question: "¿FrenchCubaWedding es gratis?",
      answer:
        "Sí, puedes unirte y usar FrenchCubaWedding de forma gratuita. También ofrecemos funciones premium que mejoran tu experiencia, como aumentar la visibilidad del perfil y acceder a filtros avanzados.",
    },
    {
      question:
        "¿Cuál es la diferencia entre Perfiles Destacados y Verificados?",
      answer:
        "Un Perfil Verificado confirma la identidad del usuario para seguridad y confianza, mientras que un Perfil Destacado se promociona en la plataforma para obtener más visibilidad. Cumplen diferentes propósitos, pero se pueden usar juntos para mejores resultados.",
    },
    {
      question: "¿Cómo verifico mi perfil?",
      answer:
        "Para verificar tu perfil, ve a la configuración de tu cuenta y sigue los pasos de verificación. Esto puede incluir enviar una identificación oficial o tomar una foto en vivo. Nuestro equipo revisará y aprobará tu solicitud.",
    },
  ],
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguageStore();
  const faqData = translations[language];

  // Function to toggle FAQ item
  const handleToggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px] flex flex-col items-center xl:items-start gap-[15px] sm:gap-[30px] xl:gap-[50px] bg-white">
      <SectionTitle
        title={
          language === "fr"
            ? "Questions Fréquemment Posées"
            : language === "es"
            ? "Preguntas Frecuentes"
            : "Frequently Asked Questions"
        }
        className="max-w-[400px] text-center xl:text-left"
      />

      <div className="w-full flex flex-col gap-[10px] xl:gap-[24px]">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`${
              openIndex === index && "bg-light"
            } cursor-pointer w-full hover:bg-light`}
          >
            <div
              onClick={() => handleToggleFaq(index)}
              className={`${
                openIndex === index ? "rounded-t-[10px]" : "rounded-[10px]"
              }  w-full flex items-center gap-3 justify-between px-[14px] md:px-[24px] xl:px-[40px] py-[12px] md:py-[18px] xl:py-[30px] border border-[#B0B1B3]`}
            >
              <p className="text-[14px] sm:text-[16px] xl:text-[24px] font-normal">
                {faq.question}
              </p>
              <div
                className={`w-[18px] md:w-[36px] h-[18px] md:h-[36px] p-1 text-primaryBorder flex items-center justify-center border border-[#B0B1B3] rounded-full transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                <MdKeyboardArrowDown />
              </div>
            </div>
            {openIndex === index && (
              <div className="w-full flex items-center justify-between px-[14px] md:px-[24px] xl:px-[40px] py-[12px] md:py-[18px] xl:py-[30px] border-x border-b border-[#B0B1B3] rounded-b-[10px]">
                <p className="text-[10px] sm:text-[14px] xl:text-[20px] font-normal">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
