import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
import { getServerSessionData } from "@/lib/config/auth";

const UserStatistics = dynamic(
  () => import("@/lib/features/dashboard/admin/overview/UserStatistics"),
  {
    ssr: false,
  }
);

const NewRegistrationStats = dynamic(
  () =>
    import(
      "@/lib/features/dashboard/admin/overview/new-registration/NewRegistrationStats"
    ),
  {
    ssr: false,
  }
);

const SubscriptionRevenueStats = dynamic(
  () =>
    import(
      "@/lib/features/dashboard/admin/overview/subscription-revenue/SubscriptionRevenueStats"
    ),
  {
    ssr: false,
  }
);

const GenderDistribution = dynamic(
  () =>
    import(
      "@/lib/features/dashboard/admin/overview/gender-distribution/GenderDistribution"
    ),
  {
    ssr: false,
  }
);

const page = async () => {
  const { accessToken } = await getServerSessionData();

  // Fetching data for the admin overview page
  const totalUserStats = await api.analytics.getUserStats(accessToken);

  // Fetching new registration and subscription revenue stats
  const newRegistrationStats = await api.analytics.getNewRegistrationStats(
    accessToken
  );

  // Fetching subscription revenue stats
  const subscriptionRevenueStats =
    await api.analytics.getSubscriptionRevenueStats(accessToken);

  // Fetching gender distribution stats
  const genderDistributionStats = await api.analytics.getGenderDistribution(
    accessToken
  );

  return (
    <div className="w-full h-full flex flex-col gap-[2px] lg:gap-[30px] items-start py-0 lg:py-[45px]">
      <UserStatistics totalUserStats={totalUserStats} />
      <NewRegistrationStats newRegistrationStats={newRegistrationStats} />
      <SubscriptionRevenueStats
        subscriptionRevenueStats={subscriptionRevenueStats}
      />
      <GenderDistribution genderDistributionStats={genderDistributionStats} />
    </div>
  );
};

export default page;
