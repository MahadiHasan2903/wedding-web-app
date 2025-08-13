import React from "react";
import { FAQ, FindMatch, HeroBanner } from "@/lib/features/marketing/common";
import {
  CompanyStorySection,
  UniqueSellingPoints,
  LookingAheadSection,
} from "@/lib/features/marketing/about";

const AboutPage = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <HeroBanner title="About" />
      <CompanyStorySection />
      <UniqueSellingPoints />
      <LookingAheadSection />
      <FindMatch />
      <FAQ />
    </div>
  );
};

export default AboutPage;
