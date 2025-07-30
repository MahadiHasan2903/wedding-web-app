"use client";

import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import { crown } from "@/lib/components/image/icons";
import { AlterModal } from "@/lib/components/modal";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const UpdateAccountStatus = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user.data.userRole === "admin" ? true : false;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleUpdateAccountStatus = () => {
    console.log(status);
  };

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px] px-[18px] py-[25px]">
      <div className="w-full flex items-center gap-[20px]">
        <CommonButton
          type="button"
          label="Temporarily Deactivate Profile"
          onClick={() => {
            setStatus("inactive");
            setOpen(true);
          }}
          className="w-fit bg-vipHeavy text-white text-[10px] sm:text-[14px] font-normal rounded-full px-[15px] py-[10px]"
        />
        <CommonButton
          type="button"
          label="Permanently Delete Account"
          onClick={() => {
            setStatus("delete");
            setOpen(true);
          }}
          className="w-fit curso bg-red text-white text-[10px] sm:text-[14px] font-normal rounded-full px-[15px] py-[10px]"
        />
      </div>

      {!isAdmin && (
        <Link
          href="/manage-plan"
          className="w-full md:w-fit mt-[25px] cursor-pointer lg:hidden flex items-start gap-[8px] rounded-[10px] hover:bg-[#E5E5E5] border border-primaryBorder py-[20px] pl-[10px] pr-[20px]"
        >
          <ImageWithFallback
            src={crown}
            width={18}
            height={18}
            alt="crown"
            className="mt-1"
          />
          <div className="flex flex-col items-start gap-[9px]">
            <h3 className="text-[14px] font-medium">Manage Plan</h3>
            <p className="text-[10px] font-light">
              Subscription will be ended in 120 days
            </p>
          </div>
        </Link>
      )}

      {open && (
        <AlterModal
          open={open}
          loading={loading}
          setOpen={setOpen}
          handleConfirm={handleUpdateAccountStatus}
          confirmButtonText={
            status === "delete" ? "Delete Account" : "Deactivate Profile"
          }
          title={status === "delete" ? "Delete Account" : "Deactivate Profile"}
          description={`Are you sure you want to ${
            status === "delete" ? "delete" : "deactivate"
          } your account?`}
        />
      )}
    </div>
  );
};

export default UpdateAccountStatus;
