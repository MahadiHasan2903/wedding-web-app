"use client";

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import { IoMdEye } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { User } from "@/lib/types/user/user.types";
import { Pagination } from "@/lib/components/table";
import { CardTitle } from "@/lib/components/heading";
import { filter } from "@/lib/components/image/icons";
import FilterUserDropDown from "./FilterUserDropDown";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { formatDateString3 } from "@/lib/utils/date/dateUtils";
import { OutlinedInput } from "@/lib/components/form-elements";
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

const UserManagement = ({ allUsersData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchName, setSearchName] = useState<string>(
    searchParams.get("name") || ""
  );
  const { currentPage, totalPages, prevPage, nextPage } =
    allUsersData.paginationInfo;

  // Memoize the blocked user list to prevent unnecessary re-renders
  const data = useMemo(() => allUsersData.users || [], [allUsersData.users]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate a URL with updated page query param
  const getUrlWithPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Automatically sync the current page in URL if it's not present
  useEffect(() => {
    if (!searchParams.get("page")) {
      router.replace(getUrlWithPage(currentPage));
    }
  }, [searchParams, currentPage, pathname, router]);

  const handleUserSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchName(newValue);

    const params = new URLSearchParams(searchParams.toString());
    params.set("name", newValue);
    params.set("page", "1"); // Reset to first page on new search
    router.push(`${pathname}?${params.toString()}`);
  };
  //Function to clear search input field
  const handleClearSearch = () => {
    setSearchName("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("name");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handler to update route with selected page
  const handlePageChange = (page: number | null) => {
    if (page && page !== currentPage) {
      router.push(getUrlWithPage(page));
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white rounded-none lg:rounded-[10px]">
        <div className="w-full py-[17px] lg:py-[25px] border-b-[1px] lg:border-b-[3px] border-light">
          <div className="w-full px-[17px] lg:px-[36px] flex items-center gap-6">
            <div className="w-full flex items-center gap-6">
              <CardTitle title="All Users" className="shrink-0" />
              <div className="w-full sm:w-2/3 md:w-1/2 md:max-w-[800px] flex items-center gap-4">
                <div className="w-full relative">
                  <OutlinedInput
                    name="name"
                    type="text"
                    placeholder="Search user"
                    value={searchName}
                    onChange={handleUserSearch}
                    className="!pl-[10px] !pr-[35px] !py-[10px] rounded-[5px] w-full"
                  />
                  {searchName.trim() && (
                    <RxCross1
                      size={20}
                      className="text-red cursor-pointer absolute right-2 top-3"
                      onClick={handleClearSearch}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-fit shrink-0 relative" ref={dropdownRef}>
              <CommonButton
                label="Filter User"
                className="w-fit flex shrink-0 items-center gap-[5px] hover:bg-light text-[12px] font-normal p-[8px] lg:p-[10px] rounded-full border border-primaryBorder"
                startIcon={
                  <ImageWithFallback
                    src={filter}
                    width={13}
                    height={13}
                    alt="filter"
                  />
                }
                onClick={() => setIsFilterOpen((prev) => !prev)}
              />

              {isFilterOpen && (
                <FilterUserDropDown setIsFilterOpen={setIsFilterOpen} />
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b-[1px] lg:border-b-[3px] border-light">
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Name
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Gender
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Email
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Joined
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Account Status
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length <= 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-5 text-[14px] text-gray-500"
                  >
                    No matched users found
                  </td>
                </tr>
              ) : (
                data.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b-[1px] lg:border-b-[3px] border-light transition hover:bg-light cursor-pointer"
                    onClick={() => {
                      router.push(`/user-management/${user.id}`);
                    }}
                  >
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[150px]">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left capitalize whitespace-nowrap min-w-[100px]">
                      {user.gender || "N/A"}
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[200px]">
                      {user.email}
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[120px]">
                      {formatDateString3(user.createdAt)}
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] capitalize whitespace-nowrap min-w-[140px]">
                      <div
                        className={`${
                          user.accountStatus === "active"
                            ? "text-green bg-[#D0FFEF]"
                            : "text-red bg-[#FFE2E6]"
                        } w-fit flex items-center gap-1 text-[12px] font-normal rounded-full px-[15px] py-[6px]`}
                      >
                        <div
                          className={`${
                            user.accountStatus === "active"
                              ? "bg-green"
                              : "bg-red"
                          } w-[5px] h-[5px] rounded-full`}
                        />
                        <p className="whitespace-nowrap">
                          {user.accountStatus}
                        </p>
                      </div>
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[120px]">
                      <IoMdEye size={20} className="text-primary" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
    </div>
  );
};

export default UserManagement;
