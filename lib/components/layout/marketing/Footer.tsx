"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { send } from "@/lib/components/image/icons";
import { ImageWithFallback } from "@/lib/components/image";
import { footerLinks, socialLinks } from "@/lib/utils/data";

const Footer = () => {
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <footer className="w-full">
      <div className="w-full bg-[#FBFBFB] text-black p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[75px]">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[40px]">
          {footerLinks.map((section) => {
            const isOpen = openSections[section.title] || false;
            return (
              <div key={section.title} className="flex flex-col gap-[28px]">
                <div
                  className="w-full gap-2 flex items-center justify-between cursor-pointer md:cursor-default"
                  onClick={() => toggleSection(section.title)}
                >
                  <h2 className="text-[14px] xl:text-[20px] font-semibold">
                    {section.title}
                  </h2>
                  <BsChevronDown
                    color="black"
                    className={`block md:hidden transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Content hidden on mobile if not open */}
                <div
                  className={`md:flex  flex-col gap-[24px] text-[12px] md:text-[16px] font-normal ${
                    isOpen ? "flex flex-col gap-[24px]" : "hidden"
                  } `}
                >
                  {section.links.map((link) => (
                    <Link key={link.label} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Social & Newsletter (optional: use similar toggle if needed) */}
          <div className="flex flex-col gap-[28px]">
            <div
              className="w-full gap-2 flex items-center justify-between cursor-pointer md:cursor-default"
              onClick={() => setIsSocialOpen((prev) => !prev)}
            >
              <h2 className="text-[14px] xl:text-[20px] font-semibold">
                Find Us On
              </h2>
              <BsChevronDown
                color="black"
                className={`block md:hidden transition-transform duration-300 ${
                  isSocialOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={`md:flex flex-col gap-[45px] ${
                isSocialOpen ? "flex flex-col gap-[45px]" : "hidden"
              } `}
            >
              <div className="flex items-center gap-[16px]">
                {socialLinks.map(({ href, Icon }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="p-[6px] border border-primaryBorder rounded-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={22} />
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-[21px]">
                <div className="flex flex-col gap-[8px]">
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

      <div className="w-full bg-primary text-white  p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[75px] flex flex-col md:flex-row items-center justify-between">
        <p className="text-[12px] sm:text-[16px] font-normal">
          © 2025 FrenchCubaWedding.com
        </p>
        <p className="text-[12px] sm:text-[16px] font-normal">
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
