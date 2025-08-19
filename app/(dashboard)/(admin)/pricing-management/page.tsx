import React from "react";
import api from "@/lib/api";
import dynamic from "next/dynamic";
const PricingManagement = dynamic(
  () =>
    import(
      "@/lib/features/dashboard/admin/pricing-management/PricingManagement"
    ),
  { ssr: false }
);

const PricingManagementPage = async () => {
  // Get the all membership package data based on the search parameters
  const allMsPackages = await api.msPackage.getAllMsPackages();

  return (
    <div className="w-full h-full py-0 lg:py-[45px]">
      <PricingManagement allMsPackages={allMsPackages} />
    </div>
  );
};

export default PricingManagementPage;
