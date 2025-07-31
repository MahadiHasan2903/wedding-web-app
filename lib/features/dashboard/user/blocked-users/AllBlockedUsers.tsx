"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";
import { User } from "@/lib/types/user/user.types";
import { Pagination } from "@/lib/components/table";
import { AlertModal } from "@/lib/components/modal";
import { CardTitle } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { OutlinedInput } from "@/lib/components/form-elements";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateBlockUnblockStatusAction } from "@/lib/action/user/userInteraction.action";
import { RxCross1 } from "react-icons/rx";

interface PropsType {
  allBlockedUsersData: {
    blockedUsers: User[];
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

const AllBlockedUsers = ({ allBlockedUsersData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const { currentPage, totalPages, prevPage, nextPage } =
    allBlockedUsersData.paginationInfo;

  // Manage state for search input
  const [searchName, setSearchName] = useState<string>(
    searchParams.get("name") || ""
  );

  // Memoize the blocked user list to prevent unnecessary re-renders
  const data = useMemo(
    () => allBlockedUsersData.blockedUsers || [],
    [allBlockedUsersData.blockedUsers]
  );

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

  // Handlers for pagination controls
  const onPageClick = (page: number) => {
    if (page !== currentPage) {
      router.push(getUrlWithPage(page));
    }
  };

  const onPrevClick = () => {
    if (prevPage) {
      router.push(getUrlWithPage(prevPage));
    }
  };

  const onNextClick = () => {
    if (nextPage) {
      router.push(getUrlWithPage(nextPage));
    }
  };

  // Handler for the search button click
  const handleUserSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchName.trim()) {
      params.set("name", searchName.trim());
    } else {
      params.delete("name");
    }

    // Always reset to first page when a new search is made
    params.set("page", "1");
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

  //Function to unblock user
  const handleUnblockUser = async () => {
    setLoading(true);

    const payload = {
      blockedUserId: selectedUserId,
      status: "unblock",
    };

    const unblockUserResponse = await updateBlockUnblockStatusAction(payload);

    toast(unblockUserResponse.message, {
      type: unblockUserResponse.status ? "success" : "error",
    });

    if (unblockUserResponse.status) {
      router.refresh();
      setOpen(false);
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-[85vh] flex flex-col">
      <div className="w-full bg-white rounded-none lg:rounded-[10px] flex flex-col flex-1">
        {/* Page header with title and search input */}
        <div className="w-full py-[17px] lg:py-[25px] border-b-[1px] lg:border-b-[3px] border-light">
          <div className="w-full px-[17px] lg:px-[36px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <CardTitle title="Blocked Users" />
            <div className="w-full sm:w-2/3 md:w-1/2 md:max-w-[800px] flex items-center gap-4">
              {/* Name search input */}
              <div className="w-full relative">
                <OutlinedInput
                  name="name"
                  type="text"
                  placeholder="Search blocked user"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
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
              {/* Search button */}
              <CommonButton
                label="Search"
                className="w-fit flex items-center gap-[8px] bg-primary border border-primaryBorder text-white text-[14px] font-normal rounded-full px-[20px] py-[10px]"
                endIcon={<IoSearchOutline size={20} />}
                onClick={handleUserSearch}
              />
            </div>
          </div>
        </div>

        {/* Blocked users table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-[1px] lg:border-b-[3px] border-light">
                <th className="text-[14px] font-medium px-[17px] lg:px-[36px] py-3 text-left">
                  Name
                </th>
                <th className="text-[14px] font-medium px-[17px] lg:px-[36px] py-3 text-right"></th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="text-center py-4 text-sm text-gray-500"
                  >
                    No blocked users found.
                  </td>
                </tr>
              ) : (
                data.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b-[1px] lg:border-b-[3px] border-light hover:bg-light transition"
                  >
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-right">
                      <button
                        className="px-[15px] py-[5px] border border-primaryBorder rounded-full hover:bg-primary hover:text-white"
                        onClick={() => {
                          setOpen(true);
                          setSelectedUserId(user.id);
                        }}
                      >
                        Unblock
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="w-full flex items-center justify-center">
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
      </div>
      {open && (
        <AlertModal
          open={open}
          loading={loading}
          setOpen={setOpen}
          handleConfirm={handleUnblockUser}
          confirmButtonText="Confirm"
          title="Unblock User"
          description="Are you sure that you want to unblock this user"
        />
      )}
    </div>
  );
};

export default AllBlockedUsers;
