import React from "react";
import {
  FAQ,
  Hero,
  FindMatch,
  WhyChooseUs,
  MatchMakingStories,
} from "@/lib/features/home";

const HomePage = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <Hero />
      <WhyChooseUs />
      <MatchMakingStories />
      <FindMatch />
      <FAQ />
    </div>
  );
};

export default HomePage;
