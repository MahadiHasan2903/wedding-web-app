"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { CardTitle } from "@/lib/components/heading";
import { CommonButton } from "@/lib/components/buttons";
import { Report } from "@/lib/types/reports/reports.types";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { ReportActionType } from "@/lib/schema/report/report.schema";
import { applyReportAction } from "@/lib/action/report/report.action";

interface PropsType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reportDetails: Report;
}

// translations object for multi-language support
const translations: Record<string, Record<string, string>> = {
  en: {
    reportAction: "Report Action",
    reportCategory: "Report Category",
    reason: "Reason",
    reportedMessage: "Reported Message",
    takeAction: "Take Action",
    noDescription: "No description provided",
    noMessage: "No message content available",
    processing: "Processing...",
    warnUser: "Warn User",
    banUser: "Ban User",
    looksFine: "Looks Fine",
  },
  fr: {
    reportAction: "Action sur le rapport",
    reportCategory: "Catégorie de rapport",
    reason: "Raison",
    reportedMessage: "Message signalé",
    takeAction: "Prendre une action",
    noDescription: "Aucune description fournie",
    noMessage: "Aucun contenu de message disponible",
    processing: "En cours...",
    warnUser: "Avertir l'utilisateur",
    banUser: "Bannir l'utilisateur",
    looksFine: "Tout est correct",
  },
  es: {
    reportAction: "Acción de informe",
    reportCategory: "Categoría de informe",
    reason: "Motivo",
    reportedMessage: "Mensaje reportado",
    takeAction: "Tomar acción",
    noDescription: "No se proporcionó descripción",
    noMessage: "No hay contenido de mensaje disponible",
    processing: "Procesando...",
    warnUser: "Advertir al usuario",
    banUser: "Prohibir al usuario",
    looksFine: "Todo bien",
  },
};

const ReportActionForm = ({ open, setOpen, reportDetails }: PropsType) => {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<
    ReportActionType["action"] | null
  >(null);

  const { language } = useLanguageStore();
  const t = translations[language];

  const actions: {
    key: ReportActionType["action"];
    label: string;
    color: string;
  }[] = [
    { key: "warned_user", label: t.warnUser, color: "bg-vipHeavy" },
    { key: "banned_user", label: t.banUser, color: "bg-red" },
    { key: "looks_fine", label: t.looksFine, color: "bg-green" },
  ];

  // Handle form submission to update the report
  const handleReportAction = async (action: ReportActionType["action"]) => {
    setLoadingAction(action);

    const requestPayload: ReportActionType = { action };

    const reportActionResponse = await applyReportAction(
      reportDetails.id,
      requestPayload
    );

    toast(reportActionResponse.message, {
      type: reportActionResponse.status ? "success" : "error",
    });

    if (reportActionResponse.status) {
      setOpen(false);
      router.refresh();
    }

    setLoadingAction(null);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-black/60 px-4 py-5">
      <div className="relative w-full max-w-[700px] max-h-[500px] rounded-[10px] bg-white p-[24px] lg:p-[35px]">
        <RxCross1
          size={22}
          className="absolute right-4 top-4 text-red cursor-pointer"
          onClick={() => setOpen(false)}
        />
        <div className="flex h-full flex-col gap-[25px]">
          <CardTitle title={t.reportAction} />

          {/* Report Details */}
          <div className="flex flex-col gap-[20px] max-h-[400px] overflow-y-auto">
            <div className="flex flex-col items-start gap-2">
              <h4 className="text-[16px] font-semibold">{t.reportCategory}</h4>
              <p className="text-[14px] font-medium capitalize">
                {reportDetails.type}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <h4 className="text-[16px] font-semibold">{t.reason}</h4>
              <p className="text-[14px] font-medium">
                {reportDetails.description || t.noDescription}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <h4 className="text-[16px] font-semibold">{t.reportedMessage}</h4>
              <p className="w-full bg-light p-[15px] rounded-full text-[14px] font-medium">
                {reportDetails.messageId?.message?.originalText || t.noMessage}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-5">
            <p className="text-[14px] font-semibold">{t.takeAction}</p>
            <div className="flex items-center gap-5">
              {actions.map(({ key, label, color }) => (
                <CommonButton
                  key={key}
                  label={loadingAction === key ? t.processing : label}
                  disabled={!!loadingAction}
                  onClick={() => handleReportAction(key)}
                  className={`w-fit border border-primaryBorder ${color} text-white font-medium text-[12px] px-[16px] py-[10px] rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportActionForm;
