"use client";

import React from "react";
import Link from "next/link";
import { navItems } from "@/lib/utils/data";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LanguageDropdown } from "../marketing";
import { avatar } from "@/lib/components/image/icons";
import vipRing from "@/public/images/common/vip-ring.png";
import { ImageWithFallback } from "@/lib/components/image";
import { hasActiveVipMembership } from "@/lib/utils/helpers";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Extract info
  const isAdmin = session?.user.data.userRole === "admin" ? true : false;

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
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4">
        <Link
          href={`${isAdmin ? "/overview" : "/my-profile"}`}
          className="w-auto"
        >
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
