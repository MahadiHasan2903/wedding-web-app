import React, { ReactNode } from "react";

const ApplicationLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <div className="w-full mx-auto overflow-hidden">{children}</div>;
};

export default ApplicationLayout;
