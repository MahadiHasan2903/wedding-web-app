import React from "react";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <div className="w-full h-[500px]">
      <div className="w-full h-full bg-heroBanner bg-no-repeat bg-top bg-cover text-white">
        <div className="w-full h-full flex flex-col items-center justify-center gap-[16px]">
          <div className="flex items-center gap-1 text-[16px] font-normal">
            <Link href="/">Home</Link> {">"} <span>About</span>
          </div>
          <h1 className="text-[64px] font-bold">About</h1>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
