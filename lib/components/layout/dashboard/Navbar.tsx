"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LanguageDropdown } from "../marketing";
import { avatar } from "@/lib/components/image/icons";
import vipRing from "@/public/images/common/vip-ring.png";
import { ImageWithFallback } from "@/lib/components/image";
import { Language } from "@/lib/types/common/common.types";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { hasActiveVipMembership } from "@/lib/utils/helpers";

const navItems = [
  { key: "home", href: "/" },
  { key: "pricing", href: "/pricing" },
  { key: "findMatch", href: "/find-match" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    pricing: "Pricing",
    findMatch: "Find Match",
    about: "About",
    contact: "Contact",
  },
  fr: {
    home: "Accueil",
    pricing: "Tarifs",
    findMatch: "Trouver un partenaire",
    about: "À propos",
    contact: "Contact",
  },
  es: {
    home: "Inicio",
    pricing: "Precios",
    findMatch: "Buscar pareja",
    about: "Acerca de",
    contact: "Contacto",
  },
};

const Navbar = () => {
  const pathname = usePathname();
  const { language } = useLanguageStore();
  const t = translations[language];
  const { data: session } = useSession();

  // Extract info
  const isAdmin = session?.user.data.userRole === "admin";

  // Determine if the user is a VIP or not
  const isVipUser = hasActiveVipMembership(session?.user.data);

  return (
    <div className="w-full h-[70px] overflow-hidden bg-primary text-vipLight hidden lg:flex items-center justify-between px-[32px] py-[14px] rounded-[10px]">
      <div className="w-full xl:w-1/2 flex items-center gap-[40px]">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${
              pathname === item.href ? "text-vipHeavy" : ""
            } text-[16px] hover:text-vipHeavy font-medium cursor-pointer`}
          >
            {t[item.key]}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4">
        <Link href={isAdmin ? "/overview" : "/my-profile"} className="w-auto">
          <div className="w-12 h-12 relative flex items-center justify-center">
            <div className="w-[45px] h-[45px] relative rounded-full overflow-hidden border border-black">
              <ImageWithFallback
                src={session?.user.data.profilePicture?.url}
                fallBackImage={avatar}
                alt="user"
                fill
                className="object-cover"
              />
            </div>

            {isVipUser && (
              <ImageWithFallback
                src={vipRing}
                width={48}
                height={48}
                alt="vip ring"
                className="z-10 absolute"
              />
            )}
          </div>
        </Link>
        <LanguageDropdown />
      </div>
    </div>
  );
};

export default Navbar;
