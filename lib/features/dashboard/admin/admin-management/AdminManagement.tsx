"use client";

import React, { useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { User } from "@/lib/types/user/user.types";
import { Pagination } from "@/lib/components/table";
import { AlertModal } from "@/lib/components/modal";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { updateUserRoleAction } from "@/lib/action/user/user.action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddAdminForm from "./AddAdminForm";

interface PropsType {
  allAdminData: {
    admins: User[];
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

const AdminManagement = ({ allAdminData }: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openRemoveAdminModal, setOpenRemoveAdminModal] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const { currentPage, totalPages, prevPage, nextPage } =
    allAdminData.paginationInfo;

  // Memoize the admin list to prevent unnecessary re-renders
  const data = useMemo(() => allAdminData.admins || [], [allAdminData.admins]);

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

  // Handler to update route with selected page
  const handlePageChange = (page: number | null) => {
    if (page && page !== currentPage) {
      router.push(getUrlWithPage(page));
    }
  };

  // Handler to open the modal for removing an user from admin
  const handleRemoveAdmin = async () => {
    if (!selectedAdminId) {
      return;
    }
    setLoading(true);

    // Prepare payload
    const payload = {
      userId: selectedAdminId,
      userRole: "user",
    };

    // Submit request
    const updateUserRoleResponse = await updateUserRoleAction(payload);

    // Show toast notification with confirmation result
    toast(updateUserRoleResponse.message, {
      type: updateUserRoleResponse.status ? "success" : "error",
    });

    if (updateUserRoleResponse.status) {
      router.refresh();
      setSelectedAdminId(null);
      setOpenRemoveAdminModal(false);
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-white rounded-none lg:rounded-[10px]">
        <div className="w-full py-[17px] lg:py-[25px] border-b-[1px] lg:border-b-[3px] border-light">
          <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between gap-6">
            <CardTitle title="All Admins" className="shrink-0" />
            <div className="w-fit shrink-0 relative">
              <CommonButton
                label="Add Admin"
                className="w-fit flex shrink-0 items-center gap-[5px] hover:bg-light text-[12px] font-normal p-[8px] lg:px-[14px] lg:py-[10px] rounded-full border border-primaryBorder"
                startIcon={
                  <ImageWithFallback
                    src={editIcon}
                    width={13}
                    height={13}
                    alt="editIcon"
                  />
                }
                onClick={() => setOpen((prev) => !prev)}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b-[1px] lg:border-b-[3px] border-light">
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  ID
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Name
                </th>
                <th className="px-[17px] lg:px-[36px] py-3 text-[14px] font-medium text-left whitespace-nowrap">
                  Email
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
                    No admin found
                  </td>
                </tr>
              ) : (
                data.map((admin) => (
                  <tr
                    key={admin.id}
                    className="border-b-[1px] lg:border-b-[3px] border-light transition hover:bg-light"
                  >
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[150px]">
                      {admin.id}
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[150px]">
                      {admin.firstName} {admin.lastName}
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[100px]">
                      {admin.email}
                    </td>
                    <td className="px-[17px] lg:px-[36px] py-3 text-[14px] text-left whitespace-nowrap min-w-[100px]">
                      <CommonButton
                        label="Remove"
                        className="w-fit text-[10px] px-[14px] py-[10px] rounded-[40px] border border-primaryBorder hover:bg-red hover:text-white transition-all"
                        onClick={() => {
                          setSelectedAdminId(admin.id);
                          setOpenRemoveAdminModal(true);
                        }}
                      />
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

      {open && <AddAdminForm open={open} setOpen={setOpen} />}

      {openRemoveAdminModal && selectedAdminId && (
        <AlertModal
          loading={loading}
          title="Remove Admin"
          open={openRemoveAdminModal}
          setOpen={setOpenRemoveAdminModal}
          handleConfirm={handleRemoveAdmin}
          description="Are you sure you want to remove this user's admin privileges permanently? Once removed, they cannot be added as an admin again."
        />
      )}
    </div>
  );
};

export default AdminManagement;
