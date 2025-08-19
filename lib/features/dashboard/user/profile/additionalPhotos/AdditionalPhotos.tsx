"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types/user/user.types";
import { AlertModal } from "@/lib/components/modal";
import { CardTitle } from "@/lib/components/heading";
import { editIcon } from "@/lib/components/image/icons";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import UpdateAdditionalPhotos from "./UpdateAdditionalPhotos";
import userPlaceholder from "@/public/images/common/user-placeholder.png";
import { deleteUserAdditionalPhotoAction } from "@/lib/action/user/user.action";

interface PropsType {
  userProfile: User;
  editable?: boolean;
}

const AdditionalPhotos = ({ userProfile, editable = false }: PropsType) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  // Function to handle the deletion of a selected photo
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
          {editable && userProfile.additionalPhotos?.length < 10 && (
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
      <div className="w-full px-[17px] lg:px-[36px] pb-[17px] lg:pt-[17px] lg:pb-[25px] flex flex-col items-start gap-[16px]">
        {editable &&
          (userProfile.additionalPhotos?.length >= 10 ? (
            <p className="text-red text-[12px] sm:text-[14px] font-medium">
              You’ve reached the maximum limit of 10 photos. Please remove an
              existing photo to upload a new one.
            </p>
          ) : (
            <p className="text-red text-[12px] sm:text-[14px] font-medium">
              You can upload up to 10 photos.
            </p>
          ))}

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
                {editable && (
                  <div
                    onClick={() => {
                      setSelectedPhotoId(photo.id);
                      setOpenAlertModal(true);
                    }}
                    className="absolute bottom-1 right-1 w-[20px] h-[20px] flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer p-1"
                  >
                    <MdDelete size={18} className="text-red" />
                  </div>
                )}
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
        <AlertModal
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
