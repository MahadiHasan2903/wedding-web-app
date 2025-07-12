"use client";

import React from "react";
import { ImageWithFallback } from "../image";
import logo from "@/public/images/logo/logo.svg";
import vipRig from "@/public/images/common/vip-ring.png";
import user from "@/public/images/common/user.png";
import Link from "next/link";
import { navItems } from "@/lib/utils/data";
import { avatar, crown } from "../image/icons";

const Header = () => {
  let accessToken = null;

  return (
    <div className="w-full bg-primary text-vipLight flex items-center justify-between px-[36px] py-[16px]">
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
            <Link
              href="/pricing"
              type="button"
              className="w-fit flex items-center gap-[8px] bg-transparent border border-vipHeavy text-vipLight font-medium px-[20px] py-[12px] rounded-lg cursor-pointer"
            >
              <ImageWithFallback
                src={crown}
                width={15}
                height={15}
                alt="crown"
                className="cursor-pointer"
              />
              Manage Plan
            </Link>
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
            <Link
              href="/registration"
              type="button"
              className="w-fit bg-vipHeavy text-vipLight font-bold px-[20px] py-[10px] rounded-lg cursor-pointer"
            >
              Join Now
            </Link>
            <Link
              href="/login"
              type="button"
              className="w-fit bg-transparent border border-vipHeavy text-vipLight font-bold px-[20px] py-[10px] rounded-lg cursor-pointer"
            >
              Sign In
            </Link>
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
  );
};

export default Header;
