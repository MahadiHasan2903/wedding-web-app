"use client";

import Link from "next/link";
import { memo, RefObject } from "react";
import { ImageWithFallback } from "@/lib/components/image";
import { Language } from "@/lib/types/common/common.types";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { logout, overview, myProfile } from "@/lib/components/image/icons";

interface UserMenuDropdownProps {
  isAdmin: boolean;
  onClose: () => void;
  menuRef: RefObject<HTMLDivElement>;
  handleLogout: () => Promise<void>;
}

const translations: Record<
  Language,
  { dashboard: string; profile: string; logout: string }
> = {
  en: {
    dashboard: "Dashboard",
    profile: "Profile",
    logout: "Logout",
  },
  fr: {
    dashboard: "Tableau de bord",
    profile: "Profil",
    logout: "Se déconnecter",
  },
  es: {
    dashboard: "Panel",
    profile: "Perfil",
    logout: "Cerrar sesión",
  },
};

const UserMenuDropdown = memo(
  ({ isAdmin, onClose, menuRef, handleLogout }: UserMenuDropdownProps) => {
    const { language } = useLanguageStore();
    const t = translations[language];

    return (
      <div
        className="relative ignore-close-menu"
        role="menu"
        aria-label="User menu"
      >
        <div className="absolute w-3 h-3 bg-white rotate-45 top-[2px] right-4 z-0" />
        <div
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-[9999] overflow-hidden"
        >
          <Link
            href={isAdmin ? "/overview" : "/my-profile"}
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-3 text-sm text-black hover:bg-vipHeavy border-b border-primaryBorder"
            role="menuitem"
          >
            <ImageWithFallback
              src={isAdmin ? overview : myProfile}
              width={25}
              height={25}
              alt="icon"
            />
            {isAdmin ? t.dashboard : t.profile}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm text-black hover:bg-vipHeavy"
            role="menuitem"
          >
            <ImageWithFallback
              src={logout}
              width={25}
              height={25}
              alt="logout"
            />
            {t.logout}
          </button>
        </div>
      </div>
    );
  }
);

export default UserMenuDropdown;
