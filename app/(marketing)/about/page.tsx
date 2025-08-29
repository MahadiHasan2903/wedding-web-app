import React from "react";
import {
  CompanyStorySection,
  UniqueSellingPoints,
  LookingAheadSection,
} from "@/lib/features/marketing/about";
import { FAQ, FindMatch, HeroBanner } from "@/lib/features/marketing/common";

const AboutPage = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <HeroBanner titleKey="about" />
      <CompanyStorySection />
      <UniqueSellingPoints />
      <LookingAheadSection />
      <FindMatch />
      <FAQ />
    </div>
  );
};

export default AboutPage;
