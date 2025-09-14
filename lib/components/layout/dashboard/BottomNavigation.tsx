"use client";

import React from "react";
import Link from "next/link";
import {
  report,
  message,
  settings,
  overview,
  myProfile,
  manageAdmin,
  subscription,
  blockedUsers,
  likedProfiles,
  managePricing,
  userManagement,
  recommendedMatches,
} from "@/lib/components/image/icons";
import { useSession } from "next-auth/react";
import { ImageWithFallback } from "../../image";

const userSidebarItems = [
  {
    label: "My Profile",
    href: "/my-profile",
    icon: myProfile,
  },
  {
    label: "Recommended Matches",
    href: "/recommended-matches",
    icon: recommendedMatches,
  },
  {
    label: "Liked Profiles",
    href: "/liked-profiles",
    icon: likedProfiles,
  },
  {
    label: "Messages",
    href: "/conversations",
    icon: message,
  },
  {
    label: "Blocked Users",
    href: "/blocked-users",
    icon: blockedUsers,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: settings,
  },
];

const adminSidebarItems = [
  {
    label: "Overview",
    href: "/overview",
    icon: overview,
  },
  {
    label: "User Management",
    href: "/user-management",
    icon: userManagement,
  },
  {
    label: "Subscription & Payment",
    href: "/subscription-payment",
    icon: subscription,
  },
  {
    label: "Report & Abuse Handing",
    href: "/report-management",
    icon: report,
  },
  {
    label: "Manage Pricing",
    href: "/pricing-management",
    icon: managePricing,
  },
  {
    label: "Manage Admin",
    href: "/admin-management",
    icon: manageAdmin,
  },
  {
    label: "Password & Security",
    href: "/password-security",
    icon: settings,
  },
];

const BottomNavigation = () => {
  const { data: session } = useSession();
  const sidebarItems =
    session?.user.data.userRole === "admin"
      ? adminSidebarItems
      : userSidebarItems;
  return (
    <div className="w-full fixed bottom-0 left-0 h-[50px] border-t border-light bg-white z-50 flex justify-around items-center lg:hidden gap-[36px] px-[14px]">
      {sidebarItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="w-full flex flex-col items-center justify-between"
        >
          <ImageWithFallback
            src={item.icon}
            width={21}
            height={21}
            alt="icon"
          />
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
