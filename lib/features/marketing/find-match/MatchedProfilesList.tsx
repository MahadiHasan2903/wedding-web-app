"use client";

import React, { useEffect } from "react";
import { UserCard } from "@/lib/components/card";
import { User } from "@/lib/types/user/user.types";
import { getPaginationPages } from "@/lib/utils/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  getAllUsersData: {
    users: User[];
    paginationInfo: {
      totalItems: number;
      itemsPerPage: number;
      currentPage: number;
      totalPages: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: number | null;
      nextPage: number | null;
    };
  };
}

const MatchedProfilesList = ({ getAllUsersData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentPage, totalPages, prevPage, nextPage } =
    getAllUsersData.paginationInfo;

  // Helper to build URL with updated page param
  const getUrlWithPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  // On initial render, if no page param in URL, set it to currentPage
  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace(getUrlWithPage(currentPage));
    }
  }, [searchParams, currentPage, pathname, router]);

  // Handle page click
  const onPageClick = (page: number) => {
    if (page === currentPage) {
      return;
    }
    router.push(getUrlWithPage(page));
  };

  // Handle prev click
  const onPrevClick = () => {
    if (prevPage) {
      router.push(getUrlWithPage(prevPage));
    }
  };

  // Handle next click
  const onNextClick = () => {
    if (nextPage) {
      router.push(getUrlWithPage(nextPage));
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-[#EDEDED] rounded-[10px] p-2 lg:px-[30px] lg:py-[20px]">
        {getAllUsersData.users.length > 0 ? (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-between gap-[8px] md:gap-[25px]">
            {getAllUsersData.users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center text-black text-[20px] font-medium py-8">
            No matched users found.
          </div>
        )}
      </div>

      <div className="flex items-center gap-[10px] my-[50px] lg:mt-[130px] lg:mb-[80px] text-[#A1A1A1] mx-auto">
        {/* Prev button */}
        <button
          onClick={onPrevClick}
          disabled={!prevPage}
          className={`w-[30px] h-[30px] flex items-center justify-center ${
            !prevPage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          {"<"}
        </button>

        {/* Page numbers */}

        {getPaginationPages(currentPage, totalPages).map((page, idx) =>
          typeof page === "number" ? (
            <button
              key={page}
              onClick={() => onPageClick(page)}
              className={`w-[30px] h-[30px] flex items-center justify-center border ${
                page === currentPage
                  ? "border-primary bg-primary text-white font-bold"
                  : "border-[#A1A1A1]"
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={`${page}-${idx}`}
              className="w-[30px] h-[30px] flex items-center justify-center select-none"
            >
              &hellip;
            </span>
          )
        )}

        {/* Next button */}
        <button
          onClick={onNextClick}
          disabled={!nextPage}
          className={`w-[30px] h-[30px] flex items-center justify-center ${
            !nextPage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MatchedProfilesList;
