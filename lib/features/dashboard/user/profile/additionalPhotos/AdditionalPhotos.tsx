"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types/user/user.types";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import UpdateAdditionalPhotos from "./UpdateAdditionalPhotos";
import userPlaceholder from "@/public/images/common/user-placeholder.png";
import { MdDelete } from "react-icons/md";
import { deleteUserAdditionalPhotoAction } from "@/lib/action/user/user.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AlterModal } from "@/lib/components/modal";

interface PropsType {
  userProfile: User;
}

const AdditionalPhotos = ({ userProfile }: PropsType) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const isLoggedInUser = session?.user.data.id === userProfile.id;

  const handleDeleteFile = async () => {
    if (!selectedPhotoId) return;

    setLoading(true);
    const deletePhotoResponse = await deleteUserAdditionalPhotoAction(
      selectedPhotoId
    );

    toast(deletePhotoResponse.message, {
      type: deletePhotoResponse.status ? "success" : "error",
    });

    if (deletePhotoResponse.status) {
      setOpen(false);
      setOpenAlertModal(false);
      setSelectedPhotoId(null);
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px]">
      {/* Header */}
      <div className="w-full py-[17px] lg:py-[25px] border-light border-b-0 lg:border-b-[3px]">
        <div className="w-full px-[17px] lg:px-[36px] flex items-center justify-between">
          <CardTitle title="Additional Photos" />
          {isLoggedInUser &&
            (userProfile.additionalPhotos?.length ?? 0) < 10 && (
              <CommonButton
                label="Edit Info"
                onClick={() => setOpen(true)}
                className="w-fit flex items-center gap-[8px] bg-transparent border border-primaryBorder text-black text-[10px] font-normal rounded-full p-[6px] lg:p-[10px]"
                startIcon={
                  <ImageWithFallback
                    src={editIcon}
                    width={13}
                    height={13}
                    alt="edit-icon"
                  />
                }
              />
            )}
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-[17px] lg:px-[36px] pb-[17px] lg:py-[25px] flex flex-col items-start gap-[16px]">
        <p className="text-red text-[12px] sm:text-[14px] font-medium">
          You can upload up to 10 photos only.
        </p>

        <div className="w-full flex items-start flex-wrap gap-[25px]">
          {userProfile.additionalPhotos &&
          userProfile.additionalPhotos.length > 0 ? (
            userProfile.additionalPhotos.map((photo, index) => (
              <div
                key={index}
                className="w-[120px] h-[140px] relative overflow-hidden"
              >
                <ImageWithFallback
                  src={photo.url}
                  fallBackImage={userPlaceholder}
                  fill
                  alt="additional photo"
                  className="border border-primaryBorder rounded-[10px] object-cover object-center"
                />
                <div
                  onClick={() => {
                    setSelectedPhotoId(photo.id);
                    setOpenAlertModal(true);
                  }}
                  className="absolute bottom-1 right-1 w-[20px] h-[20px] flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer p-1"
                >
                  <MdDelete size={18} className="text-red" />
                </div>
              </div>
            ))
          ) : (
            <p className="w-full text-md font-medium text-center">
              No photo available
            </p>
          )}
        </div>
      </div>

      {/* Update Modal */}
      {open && (
        <UpdateAdditionalPhotos
          open={open}
          setOpen={setOpen}
          userProfile={userProfile}
        />
      )}

      {/* Delete Confirmation Modal */}
      {openAlertModal && selectedPhotoId && (
        <AlterModal
          open={openAlertModal}
          loading={loading}
          setOpen={setOpenAlertModal}
          handleConfirm={handleDeleteFile}
          title="Remove Photo"
          description="Are you sure you want to delete this photo from your album?"
        />
      )}
    </div>
  );
};

export default AdditionalPhotos;
