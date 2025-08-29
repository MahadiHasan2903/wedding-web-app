import React from "react";
import {
  HeroSection,
  WhyChooseUs,
  MatchMakingStories,
} from "@/lib/features/marketing/home";
import { FAQ, FindMatch } from "@/lib/features/marketing/common";

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
