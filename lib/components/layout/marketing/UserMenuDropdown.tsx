"use client";

import Link from "next/link";
import { memo, RefObject } from "react";
import { useSession } from "next-auth/react";
import { ImageWithFallback } from "@/lib/components/image";
import { Language } from "@/lib/types/common/common.types";
import useLanguageStore from "@/lib/store/useLanguageStore";
import useLocationStore from "@/lib/store/useLocationStore";
import { hasActiveVipMembership } from "@/lib/utils/helpers";
import { logout, overview, myProfile } from "@/lib/components/image/icons";

interface UserMenuDropdownProps {
  isAdmin: boolean;
  onClose: () => void;
  menuRef: RefObject<HTMLDivElement>;
  handleLogout: () => Promise<void>;
}

const translations: Record<
  Language,
  { dashboard: string; profile: string; logout: string; pricing: string }
> = {
  en: {
    dashboard: "Dashboard",
    profile: "Profile",
    logout: "Logout",
    pricing: "Pricing",
  },
  fr: {
    dashboard: "Tableau de bord",
    profile: "Profil",
    logout: "Se déconnecter",
    pricing: "Tarification",
  },
  es: {
    dashboard: "Panel",
    profile: "Perfil",
    logout: "Cerrar sesión",
    pricing: "Precios",
  },
};

const UserMenuDropdown = memo(
  ({ isAdmin, onClose, menuRef, handleLogout }: UserMenuDropdownProps) => {
    const { language } = useLanguageStore();
    const t = translations[language];
    const { getLocation } = useLocationStore();
    const userLocation = getLocation();

    const { data: session } = useSession();
    const user = session?.user;
    const isVipUser = hasActiveVipMembership(user?.data);

    // Determine redirect path & text
    const needsPricing = !isVipUser && userLocation?.country !== "CU";
    const targetHref = needsPricing
      ? "/pricing"
      : isAdmin
      ? "/overview"
      : "/my-profile";
    const targetText = needsPricing
      ? t.pricing
      : isAdmin
      ? t.dashboard
      : t.profile;

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
            href={targetHref}
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-3 text-sm text-black hover:bg-vipHeavy border-b border-primaryBorder"
            role="menuitem"
          >
            <ImageWithFallback
              src={isAdmin && !needsPricing ? overview : myProfile}
              width={25}
              height={25}
              alt="icon"
            />
            {targetText}
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
