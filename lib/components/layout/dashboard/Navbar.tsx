"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { navItems } from "@/lib/utils/data";
import { usePathname } from "next/navigation";
import { UserMenuDropdown } from "../marketing";
import { useSession, signOut } from "next-auth/react";
import { avatar } from "@/lib/components/image/icons";
import vipRing from "@/public/images/common/vip-ring.png";
import { ImageWithFallback } from "@/lib/components/image";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  // State & refs for dropdown
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  // Extract info
  const profileImageUrl = session?.user.data.profilePicture?.url ?? avatar;
  const membershipId =
    session?.user.data.purchasedMembership?.membershipPackageInfo?.id;
  const isVipUser = membershipId !== undefined && [2, 3].includes(membershipId);
  const isAdmin = session?.user.data.userRole === "admin";

  // Close dropdown on outside click
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, true);
  }, [isMenuOpen, closeMenu]);

  // Logout handler
  const handleLogout = useCallback(async () => {
    await signOut({ callbackUrl: "/login" });
    setIsMenuOpen(false);
    toast.success("Logout Successfully");
  }, []);

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
            {item.label}
          </Link>
        ))}
      </div>

      <div className="relative flex items-center justify-end w-auto">
        <button
          onClick={toggleMenu}
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          aria-label="Toggle user menu"
          className="w-[48px] h-[48px] relative flex items-center justify-center"
        >
          <ImageWithFallback
            src={profileImageUrl}
            width={45}
            height={45}
            alt="user"
            className="absolute cursor-pointer rounded-full overflow-hidden border border-black"
          />
          {isVipUser && (
            <ImageWithFallback
              src={vipRing}
              width={48}
              height={48}
              alt="vip ring"
              className="cursor-pointer z-10"
            />
          )}
        </button>

        <div className="absolute top-[50px]">
          {isMenuOpen && (
            <UserMenuDropdown
              isAdmin={isAdmin}
              onClose={closeMenu}
              menuRef={menuRef}
              handleLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
