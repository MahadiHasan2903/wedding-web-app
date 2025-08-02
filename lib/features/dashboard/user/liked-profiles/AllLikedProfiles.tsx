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

const AllLikedProfiles = ({ allLikedProfilesData }: PropsType) => {
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

  // Handler to update route with selected page
  const handlePageChange = (page: number | null) => {
    if (page && page !== currentPage) {
      router.push(getUrlWithPage(page));
    }
  };

  return (
    <div className="w-full flex flex-col justify-between items-start min-h-[85vh]">
      <div className="w-full p-3 lg:p-0">
        {allLikedProfilesData.likedProfiles.length > 0 ? (
          <div className="w-full flex flex-wrap items-start justify-start gap-[8px] md:gap-[25px]">
            {allLikedProfilesData.likedProfiles.map((user) => (
              <LikedProfileCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-[500px] text-center flex items-center justify-center min-h-[60vh] text-black text-[20px] font-medium py-8">
            No liked profiles found. Start liking profiles to see them listed
            here.
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          onPageClick={(page) => handlePageChange(page)}
          onPrevClick={() => handlePageChange(prevPage)}
          onNextClick={() => handlePageChange(nextPage)}
        />
      </div>
    </div>
  );
};

export default AllLikedProfiles;
