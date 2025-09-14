"use client";

import React from "react";
import useLanguageStore from "@/lib/store/useLanguageStore";
import usePurchasePackageStore from "@/lib/store/usePurchaseStore";
import { MsPackageCategory } from "@/lib/enums/ms-package";

const translations = {
  en: {
    subscribePremium: "Subscribe to Premium Plan",
    premiumSubscription: "Premium Subscription",
    billType: {
      [MsPackageCategory.MONTHLY_PREMIUM]: "Billed monthly",
      [MsPackageCategory.LIFETIME_PREMIUM]: "One-time payment",
      [MsPackageCategory.LIFETIME_FREE]: "Free forever",
    },
    subtotal: "Subtotal",
    tax: "Tax",
    total: "Total",
  },
  fr: {
    subscribePremium: "Abonnez-vous au plan Premium",
    premiumSubscription: "Abonnement Premium",
    billType: {
      [MsPackageCategory.MONTHLY_PREMIUM]: "Facturé mensuellement",
      [MsPackageCategory.LIFETIME_PREMIUM]: "Paiement unique",
      [MsPackageCategory.LIFETIME_FREE]: "Gratuit pour toujours",
    },
    subtotal: "Sous-total",
    tax: "Taxe",
    total: "Total",
  },
  es: {
    subscribePremium: "Suscribirse al plan Premium",
    premiumSubscription: "Suscripción Premium",
    billType: {
      [MsPackageCategory.MONTHLY_PREMIUM]: "Facturado mensualmente",
      [MsPackageCategory.LIFETIME_PREMIUM]: "Pago único",
      [MsPackageCategory.LIFETIME_FREE]: "Gratis para siempre",
    },
    subtotal: "Subtotal",
    tax: "Impuesto",
    total: "Total",
  },
};

const PlanSummary = () => {
  const { msPackagePurchaseData } = usePurchasePackageStore();
  const { language } = useLanguageStore();
  const t = translations[language];

  const sellPrice =
    msPackagePurchaseData?.membershipPackage.categoryInfo.sellPrice ?? 0;
  const category = msPackagePurchaseData?.membershipPackage.categoryInfo
    .category as MsPackageCategory;

  return (
    <div className="w-full">
      <h3 className="text-[12px] lg:text-[24px] font-normal">
        {t.subscribePremium}
      </h3>
      <div className="w-full flex items-end my-[20px] lg:mt-[40px] lg:mb-[60px]">
        <p className="text-[32px] md:text-[42px] lg:text-[64px] font-normal leading-[100%]">
          ${sellPrice.toFixed(2)}
        </p>
        <p className="text-[10px] md:text-[14px] font-normal leading-[21px]">
          {category === MsPackageCategory.MONTHLY_PREMIUM ? "/ month" : ""}
        </p>
      </div>
      <div className="w-full flex flex-col items-start">
        <div className="w-full flex flex-col gap-[12px] py-[20px] lg:py-[24px] border-b border-[#E0E0E0]">
          <div className="w-full flex items-center justify-between gap-2 text-[14px] font-semibold">
            <p>{t.premiumSubscription}</p>
            <p>${sellPrice.toFixed(2)}</p>
          </div>
          <p className="text-[10px] font-normal">
            {category ? t.billType[category] : ""}
          </p>
        </div>

        <div className="w-full flex flex-col gap-[12px] py-[20px] lg:py-[24px] border-b border-[#E0E0E0]">
          <div className="w-full flex items-center justify-between gap-2 text-[14px] font-semibold">
            <p>{t.subtotal}</p>
            <p>${sellPrice.toFixed(2)}</p>
          </div>
          <div className="w-full flex items-center justify-between gap-2 text-[14px] font-semibold">
            <p className="text-[10px] font-normal">{t.tax}</p>
            <p className="text-[10px] font-normal">0.00</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[12px] py-[20px] lg:py-[24px] border-b border-[#E0E0E0]">
          <div className="w-full flex items-center justify-between gap-2 text-[14px] font-semibold">
            <p>{t.total}</p>
            <p>${sellPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;
