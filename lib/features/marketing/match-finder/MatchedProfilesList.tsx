"use client";

import React from "react";
import { UserCard } from "@/lib/components/card";
import { User } from "@/lib/types/user/user.types";
import { SubHeading } from "@/lib/components/heading";
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

  return (
    <div className="w-full bg-[#EDEDED] rounded-[10px]">
      <div className="w-full px-[30px] py-[20px] border-b-[3px] border-white">
        <SubHeading title="Matched Users" />
      </div>
      <div className="w-full grid grid-cols-5 justify-between gap-[25px] px-[30px] py-[20px]">
        {getAllUsersData.users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default MatchedProfilesList;
