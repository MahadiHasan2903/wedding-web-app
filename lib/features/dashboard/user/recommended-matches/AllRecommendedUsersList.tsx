"use client";

import React, { useEffect } from "react";
import { User } from "@/lib/types/user/user.types";
import { Pagination } from "@/lib/components/table";
import { UserCard } from "@/lib/components/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  allRecommendedUsersData: {
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

const AllRecommendedUsersList = ({ allRecommendedUsersData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentPage, totalPages, prevPage, nextPage } =
    allRecommendedUsersData.paginationInfo;

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
      <div className="w-full p-3 lg:p-0">
        {allRecommendedUsersData.users.length > 0 ? (
          <div className="w-full grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  justify-between gap-[8px] md:gap-[25px]">
            {allRecommendedUsersData.users.map((user) => (
              <UserCard
                returnUrl="/recommended-matches"
                key={user.id}
                user={user}
              />
            ))}
          </div>
        ) : (
          <div className="w-full text-center text-black text-[20px] font-medium py-8">
            No recommended profiles found.
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

export default AllRecommendedUsersList;
