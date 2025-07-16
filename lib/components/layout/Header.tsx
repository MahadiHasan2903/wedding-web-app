"use client";

import React from "react";
import Link from "next/link";
import { navItems } from "@/lib/utils/data";
import logo from "@/public/images/logo/logo.svg";
import user from "@/public/images/common/user.png";
import vipRig from "@/public/images/common/vip-ring.png";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { avatar, crown, hamburger } from "@/lib/components/image/icons";

const Header = () => {
  let accessToken = "accessToken";

  return (
    <div className="w-full bg-primary text-vipLight">
      {/* Desktop Navbar Start */}
      <div className="w-full hidden xl:flex items-center justify-between px-[36px] py-[16px]">
        <div className="w-2/3 flex items-center gap-[100px]">
          <Link href="/" className="cursor-pointer">
            <ImageWithFallback src={logo} width={100} height={50} alt="logo" />
          </Link>
          <div className="w-full flex items-center gap-[50px]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[16px] font-medium cursor-pointer"
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
              <div className="w-[48px] h-[48px] relative flex items-center justify-center">
                <ImageWithFallback
                  src={user}
                  width={45}
                  height={45}
                  alt="user"
                  className="absolute cursor-pointer rounded-full overflow-hidden"
                />

                <ImageWithFallback
                  src={vipRig}
                  width={48}
                  height={48}
                  alt="ring"
                  className="cursor-pointer z-10"
                />
              </div>
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
              <ImageWithFallback
                src={avatar}
                width={25}
                height={26}
                alt="avatar"
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      {/* Desktop Navbar End */}

      {/* Mobile Navbar Start */}
      <div className="w-full flex items-center justify-between xl:hidden p-[16px]">
        <ImageWithFallback
          src={hamburger}
          width={22}
          height={16}
          alt="hamburger"
          className="cursor-pointer z-10"
        />
        <Link href="/" className="cursor-pointer">
          <ImageWithFallback src={logo} width={100} height={50} alt="logo" />
        </Link>

        {accessToken ? (
          <div className="w-[42px] h-[42px] relative flex items-center justify-center">
            <ImageWithFallback
              src={user}
              width={45}
              height={45}
              alt="user"
              className="absolute cursor-pointer rounded-full overflow-hidden"
            />

            <ImageWithFallback
              src={vipRig}
              width={42}
              height={42}
              alt="ring"
              className="cursor-pointer z-10"
            />
          </div>
        ) : (
          <CommonButton
            href="/login"
            label="Sign In"
            className="w-fit bg-transparent border border-vipHeavy text-vipLight font-bold px-[20px] py-[10px] rounded-lg"
          />
        )}
      </div>
      {/* Mobile Navbar End */}
    </div>
  );
};

export default Header;
