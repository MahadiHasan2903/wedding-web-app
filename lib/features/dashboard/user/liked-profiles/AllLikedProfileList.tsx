"use client";

import React, { useEffect } from "react";
import { User } from "@/lib/types/user/user.types";
import { Pagination } from "@/lib/components/table";
import { LikedProfileCard } from "@/lib/components/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  allLikedProfilesData: {
    likedProfiles: User[];
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

const AllLikedProfileList = ({ allLikedProfilesData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentPage, totalPages, prevPage, nextPage } =
    allLikedProfilesData.paginationInfo;

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
      <div className="w-full bg-[#EDEDED] rounded-[10px] p-4 lg:px-[30px] lg:py-[20px]">
        {allLikedProfilesData.likedProfiles.length > 0 ? (
          <div className="w-full grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  justify-between gap-[8px] md:gap-[25px]">
            {allLikedProfilesData.likedProfiles.map((user) => (
              <LikedProfileCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center text-black text-[20px] font-medium py-8">
            No liked profiles found.
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        onPageClick={onPageClick}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
      />
    </div>
  );
};

export default AllLikedProfileList;
