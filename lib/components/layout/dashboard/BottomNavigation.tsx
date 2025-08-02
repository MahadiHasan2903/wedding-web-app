"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { userSidebarItems, adminSidebarItems } from "@/lib/utils/data";
import Link from "next/link";
import { ImageWithFallback } from "../../image";

const BottomNavigation = () => {
  const { data: session } = useSession();
  const sidebarItems =
    session?.user.data.userRole === "admin"
      ? adminSidebarItems
      : userSidebarItems;
  return (
    <div className="w-full fixed bottom-0 left-0 h-[50px] border-t border-light bg-white z-50 flex justify-around items-center lg:hidden gap-[36px] px-[14px]">
      {sidebarItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="w-full flex flex-col items-center justify-between"
        >
          <ImageWithFallback
            src={item.icon}
            width={21}
            height={21}
            alt="icon"
          />
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
