"use client";

import React from "react";
import Link from "next/link";
import { navItems } from "@/lib/utils/data";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { avatar } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import vipRing from "@/public/images/common/vip-ring.png";
import { ImageWithFallback } from "@/lib/components/image";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Extract access info and user state
  const accessToken = session?.user.accessToken ?? null;
  const profileImageUrl = session?.user.data.profilePicture?.url ?? avatar;
  const membershipId =
    session?.user.data.purchasedMembership?.membershipPackageInfo?.id;
  const isVipUser = membershipId !== undefined && [2, 3].includes(membershipId);
  const isAdmin = session?.user.data.userRole === "admin" ? true : false;

  return (
    <div className="w-full h-[70px] overflow-hidden bg-primary text-vipLight hidden lg:flex items-center justify-between px-[32px] py-[14px] rounded-[10px]">
      <div className="w-full xl:w-1/2 flex items-center gap-[40px]">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${
              pathname === item.href && "text-vipHeavy"
            } text-[16px] hover:text-vipHeavy font-medium cursor-pointer`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <Link
        href={`${isAdmin ? "overview" : "/my-profile"}`}
        className="w-auto flex items-center justify-end"
      >
        <div className="w-[48px] h-[48px] relative flex items-center justify-center">
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
              alt="ring"
              className="cursor-pointer z-10"
            />
          )}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
