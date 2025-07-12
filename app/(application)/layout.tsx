import React, { ReactNode } from "react";
import { Header, Footer } from "@/lib/components/layout";

const ApplicationLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="w-full">
      <Header />
      <div className="max-w-[1440px] mx-auto overflow-hidden">{children}</div>
      <Footer />
    </div>
  );
};

export default ApplicationLayout;
