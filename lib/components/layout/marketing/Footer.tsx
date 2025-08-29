"use client";

import React, { useState } from "react";
import Link from "next/link";
import { socialLinks } from "@/lib/utils/data";
import { BsChevronDown } from "react-icons/bs";
import { send } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import { Language } from "@/lib/types/common/common.types";
import useLanguageStore from "@/lib/store/useLanguageStore";

const footerLinks = [
  {
    key: "needHelp",
    links: [
      { key: "memberLogin", href: "/login" },
      { key: "signUp", href: "/registration" },
      { key: "vipMembership", href: "/pricing" },
      { key: "featuredProfile", href: "/find-match" },
      { key: "customerSupport", href: "#" },
      { key: "sitemap", href: "#" },
    ],
  },
  {
    key: "company",
    links: [
      { key: "aboutUs", href: "/about" },
      { key: "contactUs", href: "/contact" },
      { key: "blog", href: "#" },
      { key: "careers", href: "#" },
      { key: "awardsRecognition", href: "#" },
    ],
  },
  {
    key: "privacy",
    links: [
      { key: "termsOfUse", href: "/terms-of-use" },
      { key: "privacyPolicy", href: "/privacy-policy" },
      { key: "beSafeOnline", href: "#" },
      { key: "reportMisuse", href: "#" },
    ],
  },
];

const translations: Record<Language, Record<string, string>> = {
  en: {
    needHelp: "Need Help?",
    memberLogin: "Member Login",
    signUp: "Sign Up",
    vipMembership: "VIP Membership",
    featuredProfile: "Featured Profile",
    customerSupport: "Customer Support",
    sitemap: "Sitemap",
    company: "Company",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    blog: "Blog",
    careers: "Careers",
    awardsRecognition: "Awards and Recognition",
    privacy: "Privacy & You",
    termsOfUse: "Terms of Use",
    privacyPolicy: "Privacy Policy",
    beSafeOnline: "Be Safe Online",
    reportMisuse: "Report Misuse",
    findUsOn: "Find Us On",
    subscribeNewsletter: "Subscribe to Our Newsletter",
    newsletterInfo: "We do not share or sell your information",
    emailPlaceholder: "Your Email Address",
    copyright: "© 2025 FrenchCubaWedding.com",
    allRightsReserved: "All Rights Reserved",
  },
  fr: {
    needHelp: "Besoin d'aide ?",
    memberLogin: "Connexion membre",
    signUp: "S'inscrire",
    vipMembership: "Abonnement VIP",
    featuredProfile: "Profil en vedette",
    customerSupport: "Support client",
    sitemap: "Plan du site",
    company: "Entreprise",
    aboutUs: "À propos de nous",
    contactUs: "Contactez-nous",
    blog: "Blog",
    careers: "Carrières",
    awardsRecognition: "Récompenses et distinctions",
    privacy: "Confidentialité & Vous",
    termsOfUse: "Conditions d'utilisation",
    privacyPolicy: "Politique de confidentialité",
    beSafeOnline: "Soyez prudent en ligne",
    reportMisuse: "Signaler un abus",
    findUsOn: "Retrouvez-nous sur",
    subscribeNewsletter: "Abonnez-vous à notre newsletter",
    newsletterInfo: "Nous ne partageons ni ne vendons vos informations",
    emailPlaceholder: "Votre adresse e-mail",
    copyright: "© 2025 FrenchCubaWedding.com",
    allRightsReserved: "Tous droits réservés",
  },
  es: {
    needHelp: "¿Necesitas ayuda?",
    memberLogin: "Inicio de sesión",
    signUp: "Regístrate",
    vipMembership: "Membresía VIP",
    featuredProfile: "Perfil destacado",
    customerSupport: "Atención al cliente",
    sitemap: "Mapa del sitio",
    company: "Compañía",
    aboutUs: "Sobre nosotros",
    contactUs: "Contáctanos",
    blog: "Blog",
    careers: "Carreras",
    awardsRecognition: "Premios y reconocimientos",
    privacy: "Privacidad & Usted",
    termsOfUse: "Términos de uso",
    privacyPolicy: "Política de privacidad",
    beSafeOnline: "Navega seguro en línea",
    reportMisuse: "Reportar abuso",
    findUsOn: "Encuéntranos en",
    subscribeNewsletter: "Suscríbete a nuestro boletín",
    newsletterInfo: "No compartimos ni vendemos tu información",
    emailPlaceholder: "Tu dirección de correo",
    copyright: "© 2025 FrenchCubaWedding.com",
    allRightsReserved: "Todos los derechos reservados",
  },
};

const Footer = () => {
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const { language } = useLanguageStore();
  const t = translations[language];

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <footer className="w-full">
      <div className="w-full bg-[#FBFBFB] text-black p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[75px]">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[40px]">
          {footerLinks.map((section) => {
            const isOpen = openSections[section.key] || false;
            return (
              <div key={section.key} className="flex flex-col gap-[28px]">
                <div
                  className="w-full gap-2 flex items-center justify-between cursor-pointer md:cursor-default"
                  onClick={() => toggleSection(section.key)}
                >
                  <h2 className="text-[14px] xl:text-[20px] font-semibold">
                    {t[section.key]}
                  </h2>
                  <BsChevronDown
                    color="black"
                    className={`block md:hidden transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <div
                  className={`md:flex flex-col gap-[24px] text-[12px] md:text-[16px] font-normal ${
                    isOpen ? "flex flex-col gap-[24px]" : "hidden"
                  } `}
                >
                  {section.links.map((link) => (
                    <Link key={link.key} href={link.href}>
                      {t[link.key]}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Social & Newsletter */}
          <div className="flex flex-col gap-[28px]">
            <div
              className="w-full gap-2 flex items-center justify-between cursor-pointer md:cursor-default"
              onClick={() => setIsSocialOpen((prev) => !prev)}
            >
              <h2 className="text-[14px] xl:text-[20px] font-semibold">
                {t.findUsOn}
              </h2>
              <BsChevronDown
                color="black"
                className={`block md:hidden transition-transform duration-300 ${
                  isSocialOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={`md:flex flex-col gap-[45px] ${
                isSocialOpen ? "flex flex-col gap-[45px]" : "hidden"
              } `}
            >
              <div className="flex items-center gap-[16px]">
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

              <div className="flex flex-col gap-[21px]">
                <div className="flex flex-col gap-[8px]">
                  <h2 className="text-[20px] font-semibold">
                    {t.subscribeNewsletter}
                  </h2>
                  <p className="text-[10px] font-normal">{t.newsletterInfo}</p>
                </div>
                <div className="w-full flex items-center gap-[20px] bg-light border border-[#AAAAAA] px-[15px] py-[22px] rounded-[10px]">
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    className="w-full bg-transparent border-none outline-none text-[10px] focus:outline-none focus:ring-0"
                  />
                  <ImageWithFallback
                    src={send}
                    width={15}
                    height={15}
                    alt="Send Icon"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-primary text-white  p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[75px] flex flex-col md:flex-row items-center justify-between">
        <p className="text-[12px] sm:text-[16px] font-normal">{t.copyright}</p>
        <p className="text-[12px] sm:text-[16px] font-normal">
          {t.allRightsReserved}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
