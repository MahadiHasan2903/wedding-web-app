import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Button from "@/lib/components/buttons/CommonButton";
import { ImageWithFallback } from "@/lib/components/image";
import girlsGroups from "@/public/images/landing-page/group-of-girls-cartoon.png";

const Hero = () => {
  return (
    <div className="w-full">
      <div className="w-full relative h-[800px]">
        <div className="w-full h-full bg-landingHero bg-no-repeat bg-center bg-cover relative">
          <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(360deg,_#482F06_0%,_rgba(138,_99,_36,_0)_100%)]" />

          <div className="w-full h-full flex flex-col gap-[75px] items-center justify-center text-white text-center relative z-20">
            <div className="flex flex-col items-center mt-[450px]">
              <h1 className="text-[64px] font-bold">
                Love Feels Different Here
              </h1>
              <p className="text-[24px] font-semibold">
                We help you find the one who’s meant to stay
              </p>
              <Button
                href="/search"
                label="Find Your Match"
                className="w-fit mt-[30px] flex items-center gap-[10px] px-[30px] py-[10px] bg-red text-[24px] font-semibold rounded-full"
              />
            </div>
            <div className="flex items-center gap-[30px] mb-[30px]">
              <p className="text-[20px] font-normal">Meet with Purpose</p>
              <p>|</p>
              <p className="text-[20px] font-normal">
                Trusted by 5,000+ Early Users
              </p>
              <p>|</p>
              <p className="text-[20px] font-normal">
                Create Your Profile Free
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-red text-white flex items-center justify-center py-[56px]">
        <div className="absolute z-20 left-20 bottom-[10%]">
          <ImageWithFallback
            src={girlsGroups}
            width={275}
            height={250}
            alt="girls"
          />
        </div>
        <div className="w-full flex items-center justify-end gap-[40px] mr-[120px]">
          <div>
            <h1 className="text-[36px] font-semibold">
              Stand Out from the Crowd.
            </h1>
            <p className="text-[36px] font-light mt-[-15px]">
              Get Verified and Access VIP Benefits.
            </p>
          </div>
          <Button
            href="/pricing"
            label="Know More"
            className="w-fit flex items-center gap-[10px] px-[30px] py-[10px] bg-vipHeavy text-[24px] font-semibold rounded-full"
            endIcon={<FiArrowRight size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
