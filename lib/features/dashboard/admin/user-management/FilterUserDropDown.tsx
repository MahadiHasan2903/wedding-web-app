import React, { useEffect, useState } from "react";
import { CommonButton } from "@/lib/components/buttons";
import { Datepicker } from "@/lib/components/form-elements";
import { formatDateString1 } from "@/lib/utils/date/dateUtils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  setIsFilterOpen: (isOpen: boolean) => void;
}

const FilterUserDropDown = ({ setIsFilterOpen }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPremium, setIsPremium] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [endDate, setEndDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  // Initialize state based on search params
  useEffect(() => {
    const accountType = searchParams.get("accountType");
    const accountStatus = searchParams.get("accountStatus");
    const joined = searchParams.get("joined");

    setIsPremium(accountType === "premium");
    setIsBanned(accountStatus === "banned");

    if (joined) {
      const [start, end] = joined.split(" - ").map((d) => d.trim());
      setStartDate(start || "");
      setEndDate(end || "");
    }
  }, [searchParams]);

  // Function to apply filters and update the URL
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Add joined date range if both present
    if (startDate && endDate) {
      const start = formatDateString1(startDate);
      const end = formatDateString1(endDate);

      if (start && end) {
        params.set("joined", `${start} - ${end}`);
      }
    } else {
      params.delete("joined");
    }

    // Add VIP filter
    if (isPremium) {
      params.set("accountType", "premium");
    } else {
      params.delete("accountType");
    }

    // Add Banned filter
    if (isBanned) {
      params.set("accountStatus", "banned");
    } else {
      params.delete("accountStatus");
    }

    // Reset to first page
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    setIsFilterOpen(false);
  };

  // Function to reset all filters and update the URL
  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
    setIsPremium(false);
    setIsBanned(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("joined");
    params.delete("accountType");
    params.delete("accountStatus");
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    setIsFilterOpen(false);
  };
  return (
    <div className="w-[300px] absolute top-full right-0 mt-4 bg-white border border-light rounded-lg shadow-lg z-50">
      <div className="absolute w-[15px] h-[15px] bg-white rotate-45 right-8 -top-[8px] border-l border-t border-light" />
      <div className="w-full flex flex-col gap-[30px] p-[20px]">
        <div className="w-full flex flex-col gap-[20px]">
          <div className="w-full">
            <p className="text-[14px] font-semibold">Joined</p>
            <div className="w-full flex items-center gap-2">
              <Datepicker
                className="w-full cursor-pointer px-0 py-2 text-[12px] font-normal outline-none"
                title="startDate"
                value={startDate}
                onChange={(date: string) => setStartDate(date)}
              />
              <p className="mr-1">-</p>
              <Datepicker
                className="w-full cursor-pointer px-0 py-2 text-[12px] font-normal outline-none"
                title="endDate"
                value={endDate}
                onChange={(date: string) => setEndDate(date)}
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="text-[14px] font-semibold">VIP Profile</p>
            <input
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="cursor-pointer"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="text-[14px] font-semibold">Banned Profile</p>
            <input
              type="checkbox"
              checked={isBanned}
              onChange={(e) => setIsBanned(e.target.checked)}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px] font-normal text-white">
          <CommonButton
            label="Reset"
            className="w-full bg-red hover:bg-opacity-80 p-2 rounded-lg"
            onClick={handleResetFilters}
          />
          <CommonButton
            label="Apply"
            className="w-full bg-primary hover:bg-opacity-80 p-2 rounded-lg"
            onClick={handleApplyFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterUserDropDown;
