"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { DARK_LOGO } from "@/lib/config/constants";
import { signOut, useSession } from "next-auth/react";
import { ImageWithFallback } from "@/lib/components/image";
import { crown, logout } from "@/lib/components/image/icons";
import { userSidebarItems, adminSidebarItems } from "@/lib/utils/data";

const Sidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAdmin = session?.user.data.userRole === "admin";
  const sidebarItems = isAdmin ? adminSidebarItems : userSidebarItems;

  const handleLogout = useCallback(async () => {
    await signOut({ callbackUrl: "/login" });
    toast.success("Logout Successfully");
  }, []);

  return (
    <div className="w-full h-full max-w-[270px] bg-white text-[#292D32] hidden lg:flex flex-col items-center justify-between rounded-[10px]">
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
                    {item.label}
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
          Logout
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
              <h3 className="text-[14px] font-medium">Manage Plan</h3>
              <p className="text-[10px] font-light">
                Subscription will be ended in 120 days
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
