import React from "react";
import { FAQ, FindMatch } from "@/lib/features/common";
import {
  HeroSection,
  WhyChooseUs,
  MatchMakingStories,
} from "@/lib/features/home";

const HomePage = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <HeroSection />
      <WhyChooseUs />
      <MatchMakingStories />
      <FindMatch />
      <FAQ />
    </div>
  );
};

export default HomePage;
