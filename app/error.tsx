"use client";

import { useEffect } from "react";
import { ImageWithFallback } from "@/lib/components/image";
import heartBroken from "@/public/images/common/broken-heart.png";
import { CommonButton } from "@/lib/components/buttons";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full bg-light min-h-screen flex flex-col lg:flex-row items-center justify-center gap-[20px] lg:gap-[100px] xl:[160px]">
      <div className="flex flex-col items-center justify-center lg:items-start gap-[20px] lg:gap-[35px] text-center lg:text-left">
        <h2 className="text-[24px] md:text-[36px] font-semibold">
          Oops! <br />
          Something went wrong!
        </h2>
        <p className="text-[14px] font-normal leading-[21px]">
          This might be a temporary issue or a broken link. <br /> We're working
          to fix it.
        </p>
        <CommonButton
          href="/"
          label="Go Back to Homepage"
          className="w-fit px-[20px] py-[10px] bg-primary hover:bg-opacity-90 text-white text-[14px] font-normal rounded-full"
        />
      </div>

      <div className="w-[300px] md:w-[460px] h-[400px] md:h-[500px] relative overflow-hidden">
        <ImageWithFallback
          src={heartBroken}
          fill
          alt="heart broken"
          className="object-contain"
        />
      </div>
    </div>
  );
}
