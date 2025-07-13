import CommonButton from "@/lib/components/buttons/CommonButton";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const FindMatch = () => {
  return (
    <div className="w-full h-[800px]">
      <div className="w-full h-full bg-weddingCoupleScene bg-no-repeat bg-center bg-cover">
        <div className="w-full h-full flex flex-col gap-[75px] items-center justify-center text-white text-center relative z-20">
          <div className="flex flex-col items-center mt-[350px]">
            <h1 className="max-w-[900px] text-[64px] font-bold">
              Ready to Meet Someone Who Matters?
            </h1>
            <p className="text-[24px] font-semibold">
              Thousands have found meaningful connections through
              FrenchCubaWedding. Now it’s your turn.
            </p>
            <div className="flex items-center gap-[18px] mt-[30px]">
              <CommonButton
                href="/search"
                label="Find Your Match"
                className="w-fit flex items-center gap-[10px] px-[30px] py-[10px] bg-red text-[24px] font-semibold rounded-full"
              />
              <CommonButton
                href="/pricing"
                label="Get Verified"
                className="w-fit flex items-center gap-[10px] px-[30px] py-[10px] bg-vipHeavy text-[24px] font-semibold rounded-full"
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
