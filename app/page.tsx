import { Header, Footer } from "@/lib/components/layout";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between">
      <Header />
      <div className="max-w-[1440px] mx-auto overflow-hidden">HomePage</div>
      <Footer />
    </div>
  );
};

export default HomePage;
