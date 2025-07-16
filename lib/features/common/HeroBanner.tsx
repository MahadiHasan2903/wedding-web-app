import React from "react";
import Link from "next/link";
import { PageTitle } from "@/lib/components/heading";

const HeroBanner = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-[250px] lg:h-[400px] xl:h-[500px]">
      <div className="w-full h-full bg-heroBanner bg-no-repeat bg-top bg-cover text-white">
        <div className="w-full h-full flex flex-col items-center justify-center gap-[16px]">
          <div className="flex items-center gap-1 text-[10px]  sm:text-[16px] font-normal">
            <Link href="/">Home</Link> {">"} <span>{title}</span>
          </div>
          <PageTitle title={title} />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
