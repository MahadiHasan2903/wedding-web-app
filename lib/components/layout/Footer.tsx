"use client";

import React from "react";
import Link from "next/link";
import { send } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import { footerLinks, socialLinks } from "@/lib/utils/data";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="w-full bg-[#FBFBFB] text-black px-[120px] py-[75px]">
        <div className="w-full grid grid-cols-4 gap-[40px]">
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-[28px]">
              <h2 className="text-[20px] font-semibold">{section.title}</h2>
              <div className="flex flex-col gap-[24px] text-[16px] font-normal">
                {section.links.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-[28px]">
            <h2 className="text-[20px] font-semibold">Find Us On</h2>
            <div className="flex flex-col gap-[45px]">
              <div className="flex items-center gap-[16px]">
                {socialLinks.map(({ href, Icon }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="p-[6px] border border-[#A1A1A1] rounded-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={22} />
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-[21px]">
                <div>
                  <h2 className="text-[20px] font-semibold">
                    Subscribe to Our Newsletter
                  </h2>
                  <p className="text-[10px] font-normal">
                    We do not share or sell your information
                  </p>
                </div>
                <div className="w-full flex items-center gap-[20px] bg-light border border-[#AAAAAA] px-[15px] py-[22px] rounded-[10px]">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="w-full bg-transparent border-none outline-none text-[10px] focus:outline-none focus:ring-0"
                  />
                  <ImageWithFallback
                    src={send}
                    width={15}
                    height={15}
                    alt="Send Icon"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-primary text-white px-[120px] py-[40px] flex items-center justify-between">
        <p className="text-[16px] font-normal">© 2025 FrenchCubaWedding.com</p>
        <p className="text-[16px] font-normal">All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
