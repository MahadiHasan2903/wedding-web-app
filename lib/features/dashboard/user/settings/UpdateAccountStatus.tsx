"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { AlertModal } from "@/lib/components/modal";
import { crown } from "@/lib/components/image/icons";
import { signOut, useSession } from "next-auth/react";
import { CommonButton } from "@/lib/components/buttons";
import { ImageWithFallback } from "@/lib/components/image";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { updateAccountStatusAction } from "@/lib/action/user/user.action";

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    temporarilyDeactivate: "Temporarily Deactivate Profile",
    permanentlyDelete: "Permanently Delete Account",
    managePlan: "Manage Plan",
    subscriptionEnding: "Subscription will be ended in 120 days",
    deactivateAccount: "Deactivate Account",
    deleteAccount: "Delete Account",
    confirmDeactivate: "Are you sure you want to deactivate your account?",
    confirmDelete: "Are you sure you want to delete your account?",
  },
  fr: {
    temporarilyDeactivate: "Désactiver temporairement le profil",
    permanentlyDelete: "Supprimer définitivement le compte",
    managePlan: "Gérer le plan",
    subscriptionEnding: "L'abonnement se terminera dans 120 jours",
    deactivateAccount: "Désactiver le compte",
    deleteAccount: "Supprimer le compte",
    confirmDeactivate: "Êtes-vous sûr de vouloir désactiver votre compte ?",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer votre compte ?",
  },
  es: {
    temporarilyDeactivate: "Desactivar temporalmente el perfil",
    permanentlyDelete: "Eliminar permanentemente la cuenta",
    managePlan: "Administrar plan",
    subscriptionEnding: "La suscripción terminará en 120 días",
    deactivateAccount: "Desactivar cuenta",
    deleteAccount: "Eliminar cuenta",
    confirmDeactivate: "¿Está seguro de que desea desactivar su cuenta?",
    confirmDelete: "¿Está seguro de que desea eliminar su cuenta?",
  },
};

const UpdateAccountStatus = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user.data.userRole === "admin" ? true : false;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Get current language from global store
  const { language } = useLanguageStore();
  const t = translations[language];

  // Function to update account status (deactivate or delete)
  const handleUpdateAccountStatus = async () => {
    setLoading(true);

    // Prepare payload
    const payload = {
      accountStatus: status,
    };

    // Submit request
    const accountStatusUpdateResponse = await updateAccountStatusAction(
      payload
    );

    // Show toast notification with confirmation result
    toast(accountStatusUpdateResponse.message, {
      type: accountStatusUpdateResponse.status ? "success" : "error",
    });

    if (accountStatusUpdateResponse.status) {
      await signOut({ callbackUrl: "/login" });
    }
    setLoading(false);
  };

  return (
    <div className="w-full bg-white rounded-none lg:rounded-[10px] px-[18px] py-[25px]">
      <div className="w-full flex items-center gap-[20px]">
        <CommonButton
          type="button"
          label={t.temporarilyDeactivate}
          onClick={() => {
            setStatus("inactive");
            setOpen(true);
          }}
          className="w-fit bg-vipHeavy text-white text-[10px] sm:text-[14px] font-normal rounded-full px-[15px] py-[10px]"
        />
        <CommonButton
          type="button"
          label={t.permanentlyDelete}
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
            <h3 className="text-[14px] font-medium">{t.managePlan}</h3>
            <p className="text-[10px] font-light">{t.subscriptionEnding}</p>
          </div>
        </Link>
      )}

      {open && (
        <AlertModal
          open={open}
          loading={loading}
          setOpen={setOpen}
          handleConfirm={handleUpdateAccountStatus}
          confirmButtonText={
            status === "delete" ? t.deleteAccount : t.deactivateAccount
          }
          title={status === "delete" ? t.deleteAccount : t.deactivateAccount}
          description={
            status === "delete" ? t.confirmDelete : t.confirmDeactivate
          }
        />
      )}
    </div>
  );
};

export default UpdateAccountStatus;
