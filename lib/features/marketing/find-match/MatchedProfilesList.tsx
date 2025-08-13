"use client";

import React, { useEffect } from "react";
import { UserCard } from "@/lib/components/card";
import { User } from "@/lib/types/user/user.types";
import { Pagination } from "@/lib/components/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsType {
  allUsersData: {
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

const MatchedProfilesList = ({ allUsersData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentPage, totalPages, prevPage, nextPage } =
    allUsersData.paginationInfo;

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
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-[#EDEDED] rounded-[10px] p-2 lg:px-[30px] lg:py-[20px]">
        {allUsersData.users.length > 0 ? (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-between gap-[8px] md:gap-[25px]">
            {allUsersData.users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center text-black text-[20px] font-medium py-8">
            No matched users found.
          </div>
        )}
      </div>

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
  );
};

export default MatchedProfilesList;
