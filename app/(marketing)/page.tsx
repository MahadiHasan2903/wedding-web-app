import React from "react";
import { FAQ, FindMatch } from "@/lib/features/marketing/common";
import {
  HeroSection,
  WhyChooseUs,
  MatchMakingStories,
} from "@/lib/features/marketing/home";

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
