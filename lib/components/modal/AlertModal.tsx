"use client";

import React, { Dispatch, SetStateAction } from "react";
import { alert } from "../image/icons";
import { CommonButton } from "../buttons";
import { ImageWithFallback } from "../image";
import useLanguageStore from "@/lib/store/useLanguageStore";

const translations: Record<string, Record<string, string>> = {
  en: {
    warningTitle: "Warning",
    confirmButtonText: "Remove",
    description: "Are you sure you want to perform this action?",
    cancel: "Cancel",
    processing: "Processing...",
  },
  fr: {
    warningTitle: "Avertissement",
    confirmButtonText: "Supprimer",
    description: "Êtes-vous sûr de vouloir effectuer cette action ?",
    cancel: "Annuler",
    processing: "Traitement...",
  },
  es: {
    warningTitle: "Advertencia",
    confirmButtonText: "Eliminar",
    description: "¿Está seguro de que desea realizar esta acción?",
    cancel: "Cancelar",
    processing: "Procesando...",
  },
};

interface PropsType {
  open: boolean;
  title?: string;
  loading?: boolean;
  description?: string;
  handleConfirm?: () => void;
  confirmButtonText?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AlertModal = ({
  open,
  setOpen,
  loading = false,
  title,
  confirmButtonText,
  description,
  handleConfirm,
}: PropsType) => {
  const { language } = useLanguageStore();
  const t = translations[language];

  const modalTitle = title || t.warningTitle;
  const modalDescription = description || t.description;
  const confirmLabel = confirmButtonText || t.confirmButtonText;
  const cancelLabel = t.cancel;
  const processingLabel = t.processing;

  if (!open) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-black/60 px-4 py-5">
      <div className="w-full max-w-[470px] rounded-[10px] bg-white p-[24px] lg:p-[32px] flex flex-col items-start gap-[16px] md:gap-[24px]">
        <ImageWithFallback src={alert} width={40} height={40} alt="alert" />
        <div className="flex flex-col items-start gap-[12px]">
          <h2 className="text-[24px] font-semibold text-primary">
            {modalTitle}
          </h2>
          <p className="text-[16px] font-normal">{modalDescription}</p>
        </div>
        <div className="w-full flex items-center justify-end gap-[16px]">
          <CommonButton
            label={cancelLabel}
            disabled={loading}
            onClick={() => setOpen(false)}
            className="w-fit bg-[#E3E3E3] text-[#1E1E1E] font-bold px-[14px] py-[10px] text-[14px] rounded-lg"
          />
          <CommonButton
            label={loading ? processingLabel : confirmLabel}
            disabled={loading}
            onClick={handleConfirm}
            className="w-fit bg-red text-white font-bold px-[14px] py-[10px] text-[14px] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
