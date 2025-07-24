"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { navItems } from "@/lib/utils/data";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LIGHT_LOGO } from "@/lib/config/constants";
import { CommonButton } from "@/lib/components/buttons";
import vipRing from "@/public/images/common/vip-ring.png";
import { ImageWithFallback } from "@/lib/components/image";
import { avatar, crown, hamburger } from "@/lib/components/image/icons";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const drawerRef = useRef<HTMLDivElement>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Extract access info and user state
  const accessToken = session?.user.accessToken ?? null;
  const profileImageUrl = session?.user.data.profilePicture?.url;
  const membershipId =
    session?.user.data.purchasedMembership?.membershipPackageInfo?.id;
  const isVipUser = membershipId !== undefined && [2, 3].includes(membershipId);
  const isAdmin = session?.user.data.userRole === "admin" ? true : false;

  // Closes the mobile drawer with animation
  const closeDrawer = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setIsAnimatingOut(false);
    }, 300);
  };

  // Handle clicks outside of drawer to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        closeDrawer();
      }
    };

    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  return (
    <div className="w-full bg-primary text-vipLight">
      {/* Desktop Navbar */}
      <div className="w-full hidden lg:flex items-center justify-between px-[36px] py-[16px]">
        <div className="w-2/3 flex items-center gap-[60px] xl:gap-[100px]">
          <Link href="/" className="cursor-pointer">
            <ImageWithFallback
              src={LIGHT_LOGO}
              width={100}
              height={50}
              alt="logo"
            />
          </Link>
          <div className="w-full flex items-center gap-[50px]">
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
        </div>
        <div className="flex justify-end">
          {accessToken ? (
            <div className="w-full flex items-center gap-[25px]">
              <CommonButton
                label=" Manage Plan"
                href="/pricing"
                className="w-fit flex items-center gap-[8px] bg-transparent border border-vipHeavy text-vipLight font-medium px-[20px] py-[12px] rounded-lg"
                startIcon={
                  <ImageWithFallback
                    src={crown}
                    width={15}
                    height={15}
                    alt="crown"
                  />
                }
              />
              <Link
                href={`${isAdmin ? "overview" : "/my-profile"}`}
                className="w-[48px] h-[48px] relative flex items-center justify-center"
              >
                <ImageWithFallback
                  src={profileImageUrl}
                  width={45}
                  height={45}
                  alt="user"
                  fallBackImage={avatar}
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
              </Link>
            </div>
          ) : (
            <div className="w-full flex items-center gap-[25px]">
              <CommonButton
                label="Join Now"
                href="/registration"
                className="w-fit bg-vipHeavy text-vipLight font-bold px-[20px] py-[10px] rounded-lg"
              />
              <CommonButton
                href="/login"
                label="Sign In"
                className="w-fit bg-transparent border border-vipHeavy text-vipLight font-bold px-[20px] py-[10px] rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="w-full flex items-center justify-between lg:hidden p-[16px]">
        <ImageWithFallback
          src={hamburger}
          width={22}
          height={16}
          alt="hamburger"
          className="cursor-pointer z-10"
          onClick={() => setIsDrawerOpen(true)}
        />
        <Link href="/" className="cursor-pointer">
          <ImageWithFallback
            src={LIGHT_LOGO}
            width={100}
            height={50}
            alt="logo"
          />
        </Link>

        {accessToken ? (
          <div className="w-[42px] h-[42px] relative flex items-center justify-center">
            <ImageWithFallback
              src={profileImageUrl}
              width={45}
              height={45}
              alt="user"
              fallBackImage={avatar}
              className="absolute cursor-pointer rounded-full overflow-hidden border border-black"
            />
            {isVipUser && (
              <ImageWithFallback
                src={vipRing}
                width={40}
                height={40}
                alt="ring"
                className="cursor-pointer z-10"
              />
            )}
          </div>
        ) : (
          <CommonButton
            href="/login"
            label="Sign In"
            className="w-fit bg-transparent border border-vipHeavy text-vipLight font-bold px-[20px] py-[10px] rounded-lg"
          />
        )}
      </div>

      {/* Mobile Drawer */}
      {(isDrawerOpen || isAnimatingOut) && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <div
            ref={drawerRef}
            className={`relative w-[250px] h-full bg-primary p-4 shadow-lg z-50 transition-transform duration-300 ${
              isAnimatingOut
                ? "animate-slide-out-left"
                : "animate-slide-in-left"
            }`}
          >
            <div className="w-full flex justify-end">
              <RxCross1 size={20} onClick={closeDrawer} className="text-red" />
            </div>

            <nav className="flex flex-col gap-4 mt-5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer}
                  className={`${
                    pathname === item.href && "text-vipHeavy"
                  } text-vipLight pb-[10px] border-b border-b-vipLight text-[14px] font-medium`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
