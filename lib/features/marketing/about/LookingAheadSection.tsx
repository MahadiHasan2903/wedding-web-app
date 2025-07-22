import React from "react";
import Link from "next/link";
import { socialLinks } from "@/lib/utils/data";
import { ImageWithFallback } from "@/lib/components/image";
import community from "@/public/images/about/community.jpg";
import { HeadingLine, SectionTitle } from "@/lib/components/heading";

const LookingAheadSection = () => {
  return (
    <div className="w-full px-[18px] pt-[8px] pb-[18px] sm:px-[60px] sm:pb-[32px] md:pb-[50px] xl:px-[120px] xl:pb-[70px] flex flex-col-reverse lg:flex-row items-center justify-between gap-[18px] sm:gap-[24px] lg:gap-[65px]">
      <div className="lg:hidden flex items-center gap-[7px] pb-[20px]">
        {socialLinks.map(({ href, Icon }, index) => (
          <Link
            key={index}
            href={href}
            className="p-[4px] border border-[#A1A1A1] rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon size={17} />
          </Link>
        ))}
      </div>
      <div className="max-w-[250px] sm:max-w-[400px] lg:max-w-full w-full lg:w-1/2 h-[120px] sm:h-[180px] lg:h-[330px] relative overflow-hidden">
        <ImageWithFallback
          src={community}
          fill
          className="object-cover"
          alt="community"
        />
      </div>
      <div className="w-full h-full max-w-[500px] flex flex-col items-end gap-[35px]">
        <div className="flex flex-col items-center lg:items-end gap-[18px] sm:gap-[24px] lg:gap-[48px] ">
          <SectionTitle title="Looking Ahead" />
          <div className="hidden lg:block">
            <HeadingLine color="primary" />
          </div>
          <p className="text-[10px] sm:text-[14px] lg:text-[24px] font-normal text-justify lg:text-end">
            Our growing community is shaped by every story, every message, and
            every match. As we evolve, we promise to stay true to our values:
            trust, clarity, and commitment.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-[16px]">
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
      </div>
    </div>
  );
};

export default LookingAheadSection;
