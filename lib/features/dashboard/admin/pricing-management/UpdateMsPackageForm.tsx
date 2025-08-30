"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  updateMsPackageSchema,
  UpdateMsPackageType,
} from "@/lib/schema/ms-package/msPackage.types";
import { CardTitle } from "@/lib/components/heading";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonButton } from "@/lib/components/buttons";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { UnderlineInput } from "@/lib/components/form-elements";
import { MembershipPackage } from "@/lib/types/membership/ms-package.types";
import { updateMsPackageAction } from "@/lib/action/ms-package/msPackage.action";

interface PropsType {
  open: boolean;
  msPackageDetails: MembershipPackage;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// translations object for multi-language support
const translations: Record<string, Record<string, string>> = {
  en: {
    updatePackage: "Update Membership Package",
    packageTitle: "Package Title",
    originalPrice: "Original Price",
    sellingPrice: "Selling Price",
    save: "Save",
    saving: "Saving...",
    cancel: "Cancel",
    enterPackageTitle: "Enter membership package title",
    enterOriginalPrice: "Enter original price",
    enterSellingPrice: "Enter selling price",
  },
  fr: {
    updatePackage: "Mettre à jour le package d'adhésion",
    packageTitle: "Titre du package",
    originalPrice: "Prix original",
    sellingPrice: "Prix de vente",
    save: "Enregistrer",
    saving: "Enregistrement...",
    cancel: "Annuler",
    enterPackageTitle: "Entrez le titre du package",
    enterOriginalPrice: "Entrez le prix original",
    enterSellingPrice: "Entrez le prix de vente",
  },
  es: {
    updatePackage: "Actualizar paquete de membresía",
    packageTitle: "Título del paquete",
    originalPrice: "Precio original",
    sellingPrice: "Precio de venta",
    save: "Guardar",
    saving: "Guardando...",
    cancel: "Cancelar",
    enterPackageTitle: "Ingrese el título del paquete",
    enterOriginalPrice: "Ingrese el precio original",
    enterSellingPrice: "Ingrese el precio de venta",
  },
};

const UpdateMsPackageForm = ({
  open,
  setOpen,
  msPackageDetails,
}: PropsType) => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = translations[language];
  const [loading, setLoading] = useState(false);

  // Setup react-hook-form with Zod validation and initialize default values
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateMsPackageType>({
    resolver: zodResolver(updateMsPackageSchema),
    defaultValues: {
      title: msPackageDetails.title,
      description: msPackageDetails.description,
      categoryInfo: {
        category: msPackageDetails.categoryInfo.category,
        originalPrice: msPackageDetails.categoryInfo.originalPrice,
        sellPrice: msPackageDetails.categoryInfo.sellPrice,
      },
    },
  });

  // Handle form submission to update the membership package
  const handleUpdateMsPackage = async (data: UpdateMsPackageType) => {
    setLoading(true);

    const payload = {
      title: data.title,
      description: data.description,
      categoryInfo: {
        category: data.categoryInfo.category,
        originalPrice: data.categoryInfo.originalPrice,
        sellPrice: data.categoryInfo.sellPrice,
      },
    };

    const updateMsPackageResponse = await updateMsPackageAction(
      msPackageDetails.id,
      payload
    );

    toast(updateMsPackageResponse.message, {
      type: updateMsPackageResponse.status ? "success" : "error",
    });

    if (updateMsPackageResponse.status) {
      setOpen(false);
      router.refresh();
    }

    setLoading(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[99] flex h-full min-h-screen w-full items-center justify-center bg-black/60 px-4 py-5">
      <div className="w-full h-full max-w-[600px] max-h-[500px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
        <form
          onSubmit={handleSubmit(handleUpdateMsPackage)}
          className="w-full h-full flex flex-col gap-[25px]"
        >
          <CardTitle title={t.updatePackage} />
          <div className="w-full h-full max-h-[500px] overflow-y-auto flex flex-col gap-[22px]">
            <Controller
              name="title"
              control={control}
              defaultValue={msPackageDetails.title}
              render={({ field }) => (
                <UnderlineInput
                  {...field}
                  label={t.packageTitle}
                  type="text"
                  name="title"
                  placeholder={t.enterPackageTitle}
                  error={errors.title?.message}
                />
              )}
            />
            <Controller
              name="categoryInfo.originalPrice"
              control={control}
              defaultValue={msPackageDetails.categoryInfo.originalPrice}
              render={({ field }) => (
                <UnderlineInput
                  {...field}
                  label={t.originalPrice}
                  type="number"
                  name="categoryInfo.originalPrice"
                  placeholder={t.enterOriginalPrice}
                  error={errors.categoryInfo?.originalPrice?.message}
                />
              )}
            />
            <Controller
              name="categoryInfo.sellPrice"
              control={control}
              defaultValue={msPackageDetails.categoryInfo.sellPrice}
              render={({ field }) => (
                <UnderlineInput
                  {...field}
                  label={t.sellingPrice}
                  type="number"
                  name="categoryInfo.sellPrice"
                  placeholder={t.enterSellingPrice}
                  error={errors.categoryInfo?.sellPrice?.message}
                />
              )}
            />
          </div>

          {/* Form submit and cancel buttons */}
          <div className="flex items-center gap-[30px] text-[14px]">
            <CommonButton
              type="submit"
              label={loading ? t.saving : t.save}
              disabled={loading}
              className="w-full bg-green text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
            />
            <CommonButton
              onClick={() => setOpen(false)}
              label={t.cancel}
              className="w-full bg-red text-white font-bold text-[12px] lg:text-[14px] p-[10px] rounded-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMsPackageForm;
