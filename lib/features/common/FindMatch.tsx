import CommonButton from "@/lib/components/buttons/CommonButton";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const FindMatch = () => {
  return (
    <div className="w-full h-[385px] md:h-[500px] xl:h-[800px]">
      <div className="w-full h-full bg-weddingCoupleScene bg-no-repeat bg-center bg-cover">
        <div className="w-full h-full flex flex-col gap-[75px] items-center justify-center text-white text-center relative z-20">
          <div className="max-w-[500px] xl:max-w-[900px] flex flex-col items-center mt-[150px] sm:mt-[120px] md:mt-[180px] xl:mt-[350px] px-[32px] gap-[8px]">
            <h1 className="text-[24px] sm:text-[36px] xl:text-[64px] font-bold">
              Ready to Meet Someone Who Matters?
            </h1>
            <p className="text-[12px] sm:text-[14px] xl:text-[24px] font-semibold">
              Thousands have found meaningful connections through
              FrenchCubaWedding. Now it’s your turn.
            </p>
            <div className="flex items-center gap-[12px] sm:gap-[18px] mt-3 xl:mt-[30px]">
              <CommonButton
                href="/search"
                label="Find Your Match"
                className="w-fit flex items-center gap-[10px] px-[20px] xl:px-[30px] py-[10px] bg-red text-[10px] xl:text-[24px] font-semibold rounded-full"
              />
              <CommonButton
                href="/pricing"
                label="Get Verified"
                className="w-fit flex items-center gap-[10px] px-[20px] xl:px-[30px] py-[10px] bg-vipHeavy text-[10px] xl:text-[24px] font-semibold rounded-full"
                endIcon={<FiArrowRight size={20} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindMatch;
