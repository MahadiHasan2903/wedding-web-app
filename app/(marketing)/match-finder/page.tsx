import React from "react";
import dynamic from "next/dynamic";

// Dynamically import components (disable SSR if needed for client-only behavior)
const AdvanceSearch = dynamic(
  () =>
    import("@/lib/features/marketing/match-finder").then(
      (mod) => mod.AdvanceSearch
    ),
  { ssr: false }
);

const MatchedProfilesList = dynamic(
  () =>
    import("@/lib/features/marketing/match-finder").then(
      (mod) => mod.MatchedProfilesList
    ),
  { ssr: false }
);

const MatchFinderPage = () => {
  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:py-[32px] xl:px-[120px] xl:py-[80px] flex flex-col justify-between gap-[50px]">
      <AdvanceSearch />
      <MatchedProfilesList />
    </div>
  );
};

export default MatchFinderPage;
