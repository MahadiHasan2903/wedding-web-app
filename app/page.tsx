import React from "react";
import { Header, Footer } from "@/lib/components/layout";
import { Hero, WhyChooseUs, MatchMakingStories } from "@/lib/features/home";

const HomePage = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <Header />
      <div>
        <Hero />
        <WhyChooseUs />
        <MatchMakingStories />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
