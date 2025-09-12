import React, { ReactNode } from "react";
import api from "@/lib/api";
import { Header, Footer } from "@/lib/components/layout/marketing";

const MarketingLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const userLocationDetails = await api.location.getUserLocationByIp();

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <Header userLocationDetails={userLocationDetails} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
