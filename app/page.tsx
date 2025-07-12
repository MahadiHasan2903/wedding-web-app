import React from "react";
import { Header, Footer } from "@/lib/components/layout";
import { Hero } from "@/lib/features/home";

const HomePage = () => {
  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <Header />
      <div>
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
