import React from "react";
import { HeroBanner, OurStory } from "@/lib/features/about";

const AboutPage = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <HeroBanner />
      <OurStory />
    </div>
  );
};

export default AboutPage;
