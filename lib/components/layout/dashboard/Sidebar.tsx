"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import {
  logout,
  crown,
  report,
  message,
  settings,
  overview,
  myProfile,
  manageAdmin,
  subscription,
  blockedUsers,
  likedProfiles,
  managePricing,
  userManagement,
  recommendedMatches,
} from "@/lib/components/image/icons";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { DARK_LOGO } from "@/lib/config/constants";
import { signOut, useSession } from "next-auth/react";
import { ImageWithFallback } from "@/lib/components/image";
import { Language } from "@/lib/types/common/common.types";
import useLanguageStore from "@/lib/store/useLanguageStore";

// Translations for sidebar
const translations: Record<Language, Record<string, string>> = {
  en: {
    myProfile: "My Profile",
    recommendedMatches: "Recommended Matches",
    likedProfiles: "Liked Profiles",
    messages: "Messages",
    blockedUsers: "Blocked Users",
    settings: "Settings",
    overview: "Overview",
    userManagement: "User Management",
    subscriptionPayment: "Subscription & Payment",
    reportAbuse: "Report & Abuse Handling",
    managePricing: "Manage Pricing",
    manageAdmin: "Manage Admin",
    passwordSecurity: "Password & Security",
    logout: "Logout",
    managePlan: "Manage Plan",
    subscriptionEndsIn: "Subscription will be ended in 120 days",
  },
  fr: {
    myProfile: "Mon profil",
    recommendedMatches: "Correspondances recommandées",
    likedProfiles: "Profils aimés",
    messages: "Messages",
    blockedUsers: "Utilisateurs bloqués",
    settings: "Paramètres",
    overview: "Aperçu",
    userManagement: "Gestion des utilisateurs",
    subscriptionPayment: "Abonnement & Paiement",
    reportAbuse: "Signalement & Gestion des abus",
    managePricing: "Gérer les prix",
    manageAdmin: "Gérer l'administrateur",
    passwordSecurity: "Mot de passe & Sécurité",
    logout: "Déconnexion",
    managePlan: "Gérer le plan",
    subscriptionEndsIn: "L'abonnement se terminera dans 120 jours",
  },
  es: {
    myProfile: "Mi perfil",
    recommendedMatches: "Coincidencias recomendadas",
    likedProfiles: "Perfiles que te gustan",
    messages: "Mensajes",
    blockedUsers: "Usuarios bloqueados",
    settings: "Configuración",
    overview: "Resumen",
    userManagement: "Gestión de usuarios",
    subscriptionPayment: "Suscripción & Pago",
    reportAbuse: "Informe & Manejo de abuso",
    managePricing: "Gestionar precios",
    manageAdmin: "Gestionar administrador",
    passwordSecurity: "Contraseña & Seguridad",
    logout: "Cerrar sesión",
    managePlan: "Administrar plan",
    subscriptionEndsIn: "La suscripción finalizará en 120 días",
  },
};

// Sidebar items using keys only
export const userSidebarItems = [
  { key: "myProfile", href: "/my-profile", icon: myProfile },
  {
    key: "recommendedMatches",
    href: "/recommended-matches",
    icon: recommendedMatches,
  },
  { key: "likedProfiles", href: "/liked-profiles", icon: likedProfiles },
  { key: "messages", href: "/conversations", icon: message },
  { key: "blockedUsers", href: "/blocked-users", icon: blockedUsers },
  { key: "settings", href: "/settings", icon: settings },
];

export const adminSidebarItems = [
  { key: "overview", href: "/overview", icon: overview },
  { key: "userManagement", href: "/user-management", icon: userManagement },
  {
    key: "subscriptionPayment",
    href: "/subscription-payment",
    icon: subscription,
  },
  { key: "reportAbuse", href: "/report-management", icon: report },
  { key: "managePricing", href: "/pricing-management", icon: managePricing },
  { key: "manageAdmin", href: "/admin-management", icon: manageAdmin },
  { key: "passwordSecurity", href: "/password-security", icon: settings },
];

const Sidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { language } = useLanguageStore();
  const t = translations[language];

  const isAdmin = session?.user.data.userRole === "admin";
  const sidebarItems = isAdmin ? adminSidebarItems : userSidebarItems;

  const handleLogout = useCallback(async () => {
    await signOut({ callbackUrl: "/login" });
    toast.success("Logout Successfully");
  }, []);

  return (
    <div className="w-full h-full max-w-[270px] shrink-0 bg-white text-[#292D32] hidden lg:flex flex-col items-center justify-between rounded-[10px]">
      <div className="w-full gap-[32px]">
        <div className="w-full pb-[20px] border-b-[3px] border-light flex flex-col items-center ">
          <Link href="/" className="cursor-pointer">
            <ImageWithFallback
              src={DARK_LOGO}
              width={150}
              height={75}
              alt="logo"
              className="mx-[26px] mt-[20px]"
            />
          </Link>
        </div>
        <div className="w-full py-[32px] pl-[32px]">
          <div className="flex flex-col items-start gap-[21px]">
            {sidebarItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="w-full flex items-center justify-between group"
              >
                <div className="flex items-center gap-[15px]">
                  <ImageWithFallback
                    src={item.icon}
                    width={25}
                    height={25}
                    alt="icon"
                  />
                  <p className="text-[14px] font-medium text-[#292D32]">
                    {t[item.key]}
                  </p>
                </div>

                {/* Highlight Bar */}
                <div
                  className={`w-[6px] h-[25px] bg-primary transition-opacity duration-200 ${
                    pathname.startsWith(item.href)
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-[12px] px-[26px] py-[20px]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center cursor-pointer gap-[7px] hover:bg-[#E5E5E5] border border-primaryBorder py-2 px-[10px] rounded-[5px]"
        >
          <ImageWithFallback src={logout} width={25} height={25} alt="logout" />
          {t.logout}
        </button>
        {!isAdmin && (
          <Link
            href="/manage-plan"
            className={`${
              pathname === "/manage-plan" ? "bg-[#E5E5E5]" : "bg-transparent"
            } w-fit cursor-pointer flex items-start gap-[8px] rounded-[10px] hover:bg-[#E5E5E5] border border-primaryBorder py-[20px] pl-[10px] pr-[20px]`}
          >
            <ImageWithFallback
              src={crown}
              width={18}
              height={18}
              alt="crown"
              className="mt-1"
            />
            <div className="flex flex-col items-start gap-[9px]">
              <h3 className="text-[14px] font-medium">{t.managePlan}</h3>
              <p className="text-[10px] font-light">{t.subscriptionEndsIn}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
