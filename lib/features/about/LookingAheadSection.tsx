import React from "react";
import Link from "next/link";
import { socialLinks } from "@/lib/utils/data";
import { ImageWithFallback } from "@/lib/components/image";
import community from "@/public/images/about/community.jpg";
import { HeadingLine, SectionTitle } from "@/lib/components/heading";

const LookingAheadSection = () => {
  return (
    <div className="w-full px-[120px] pb-[70px] flex items-center justify-between gap-[65px]">
      <div className="w-1/2 h-[330px] relative overflow-hidden rounded-[10px]">
        <ImageWithFallback
          src={community}
          layout="fill"
          objectFit="cover"
          alt="community"
        />
      </div>
      <div className="w-full h-full max-w-[500px] flex flex-col items-end gap-[35px]">
        <div className="flex flex-col items-end gap-[48px] ">
          <SectionTitle title="Looking Ahead" />
          <HeadingLine color="primary" />
          <p className="text-[24px] font-normal text-end">
            Our growing community is shaped by every story, every message, and
            every match. As we evolve, we promise to stay true to our values:
            trust, clarity, and commitment.
          </p>
        </div>
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
      </div>
    </div>
  );
};

export default LookingAheadSection;
