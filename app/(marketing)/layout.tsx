import React, { ReactNode } from "react";
import { Header, Footer } from "@/lib/components/layout/marketing";

const MarketingLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
