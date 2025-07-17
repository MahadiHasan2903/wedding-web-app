import React, { ReactNode } from "react";
import { ImageWithFallback } from "@/lib/components/image";
import authBanner from "@/public/images/auth/auth-banner-1.svg";

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="w-full h-full flex items-center ">
        <div className="hidden md:block w-1/2 h-full">
          <div className="w-full h-screen relative overflow-hidden">
            <ImageWithFallback
              src={authBanner}
              layout="fill"
              objectFit="cover"
              alt="authBanner"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
