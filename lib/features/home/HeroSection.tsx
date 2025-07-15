import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { SectionTitle } from "@/lib/components/heading";
import { ImageWithFallback } from "@/lib/components/image";
import CommonButton from "@/lib/components/buttons/CommonButton";
import girlsGroups from "@/public/images/landing-page/group-of-girls-cartoon.png";

const HeroSection = () => {
  return (
    <div className="w-full">
      <div className="w-full h-[385px] md:h-[500px] xl:h-[870px]">
        <div className="w-full h-full bg-landingHero bg-no-repeat bg-center bg-cover">
          <div className="w-full h-full flex flex-col gap-[18px] xl:gap-[75px] items-center justify-center text-white text-center z-10">
            <div className="flex flex-col items-center mt-[200px] sm:mt-[150px] md:mt-[200px] xl:mt-[450px]">
              <h1 className="text-[24px] sm:text-[36px] xl:text-[64px] font-bold">
                Love Feels Different Here
              </h1>
              <p className="text-[12px] sm:text-[16px] lg-text-[24px] font-semibold mt-2 mb-[16px] xl:mb-[30px]">
                We help you find the one who’s meant to stay
              </p>
              <CommonButton
                href="/search"
                label="Find Your Match"
                className="w-fit flex items-center gap-[10px] px-[20px] xl:px-[30px] py-[10px] bg-red text-[10px] sm:text-[16px] xl:text-[24px] font-semibold rounded-full"
              />
            </div>
            <div className="flex flex-col xl:flex-row items-center gap-1 xl:gap-[30px] mb-[30px]">
              <p className="text-[10px] sm:text-[14px] xl:text-[20px] font-normal">
                Meet with Purpose
              </p>
              <p className="hidden xl:block">|</p>
              <p className="text-[10px] sm:text-[14px] xl:text-[20px] font-normal">
                Trusted by 5,000+ Early Users
              </p>
              <p className="hidden xl:block">|</p>
              <p className="text-[10px] sm:text-[14px] xl:text-[20px] font-normal">
                Create Your Profile Free
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-red text-white py-[10px] xl:py-[56px] pl-[100px] sm:pl-[140px] xl:pl-0">
        <div className="absolute z-[99] left-2 sm:left-10 md:left-20 top-[-15%] sm:top-[-20%] xl:top-[-30%]">
          <div className="w-[80px] h-[80px] sm:w-[130px] sm:h-[120px] md:w-[180px] md:h-[150px] xl:w-[275px] xl:h-[250px] relative">
            <ImageWithFallback
              src={girlsGroups}
              layout="fill"
              objectFit="cover"
              alt="girlsGroups"
            />
          </div>
        </div>

        <div className="w-full max-w-screen-xl mx-auto flex justify-end pr-2 sm:pr-8 md:pr-12 lg:pr-28 xl:pr-4">
          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-1 xl:gap-[40px]">
            <div>
              <SectionTitle title="Stand Out from the Crowd." />
              <SectionTitle
                title="Get Verified and Access VIP Benefits."
                className="!font-light mt-0 xl:mt-[-15px]"
              />
            </div>
            <CommonButton
              href="/pricing"
              label="Know More"
              className="w-fit flex items-center gap-1 xl:gap-2 px-[20px] xl:px-[30px] py-[10px] bg-vipHeavy text-[10px] xl:text-[24px] font-semibold rounded-full"
              endIcon={<FiArrowRight size={20} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
