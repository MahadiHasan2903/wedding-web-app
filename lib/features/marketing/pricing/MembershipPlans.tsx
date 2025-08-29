"use client";

import React, { useState } from "react";
import { PricingCard } from "@/lib/components/card";
import PaymentFormModal from "./payment/PaymentFormModal";
import useLanguageStore from "@/lib/store/useLanguageStore";
import { SectionTitle, HeadingLine } from "@/lib/components/heading";
import { MembershipPackage } from "@/lib/types/membership/ms-package.types";

interface PropsType {
  PAYPAL_CLIENT_ID?: string;
  STRIPE_PUBLISHABLE_KEY?: string;
  allMsPackages: MembershipPackage[];
}

const translations = {
  en: {
    membershipPlans: "Membership Plans",
    taglineBold: "Find real connections. Stand out with confidence.",
    tagline:
      "At FrenchCubaWedding, we believe in meaningful, long-term relationships. Our Premium Membership is designed to help serious individuals like you connect with genuine, like-minded partners — faster and with more confidence.",
  },
  fr: {
    membershipPlans: "Plans d'adhésion",
    taglineBold:
      "Trouvez de vraies connexions. Démarquez-vous en toute confiance.",
    tagline:
      "Chez FrenchCubaWedding, nous croyons aux relations significatives et durables. Notre adhésion Premium est conçue pour aider les personnes sérieuses comme vous à se connecter avec des partenaires authentiques et partageant les mêmes valeurs — plus rapidement et en toute confiance.",
  },
  es: {
    membershipPlans: "Planes de membresía",
    taglineBold: "Encuentra conexiones reales. Destaca con confianza.",
    tagline:
      "En FrenchCubaWedding creemos en relaciones significativas y a largo plazo. Nuestra Membresía Premium está diseñada para ayudar a personas serias como tú a conectarse con parejas genuinas y afines — más rápido y con mayor confianza.",
  },
};

const MembershipPlans = ({
  allMsPackages,
  PAYPAL_CLIENT_ID,
  STRIPE_PUBLISHABLE_KEY,
}: PropsType) => {
  const [open, setOpen] = useState(false);
  const { language } = useLanguageStore();
  const t = translations[language];
  const [loadingPackageId, setLoadingPackageId] = useState<number | null>(null);

  // Calculate the percentage savings if the user buys the yearly plan
  const getYearlySavingsPercentage = (): number | null => {
    const monthly = allMsPackages.find(
      (pkg) => pkg.categoryInfo.category === "monthly"
    );
    const yearly = allMsPackages.find(
      (pkg) => pkg.categoryInfo.category === "yearly"
    );

    if (!monthly || !yearly) {
      return null;
    }

    const monthlyCostPerYear = monthly.categoryInfo.sellPrice * 12;
    const yearlyCost = yearly.categoryInfo.sellPrice;
    const savings = monthlyCostPerYear - yearlyCost;
    const percentage = (savings / monthlyCostPerYear) * 100;
    return Math.round(percentage);
  };

  return (
    <div className="w-full p-[18px] sm:px-[60px] sm:pt-[32px] xl:px-[120px] xl:pt-[80px]">
      <div className="w-full flex flex-col items-center lg:items-start gap-[14px] lg:gap-[48px]">
        <SectionTitle title={t.membershipPlans} />
        <div className="hidden lg:block">
          <HeadingLine color="primary" />
        </div>
        <div className="text-[12px] md:text-[14px] flex flex-col gap-[5px]">
          <p className="font-bold">{t.taglineBold}</p>
          <p>{t.tagline}</p>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-[18px] lg:gap-[24px] my-[30px] lg:my-[50px] mx-auto">
        {allMsPackages
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((plan) => (
            <PricingCard
              key={plan.id}
              id={plan.id}
              title={plan.title}
              setPaymentFormOpen={setOpen}
              description={plan.description}
              categoryInfo={plan.categoryInfo}
              loading={loadingPackageId === plan.id}
              setLoadingPackageId={setLoadingPackageId}
              yearlySavingsPercentage={getYearlySavingsPercentage()}
            />
          ))}
      </div>
      {open && (
        <PaymentFormModal
          open={open}
          setOpen={setOpen}
          PAYPAL_CLIENT_ID={PAYPAL_CLIENT_ID}
          STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY}
        />
      )}
    </div>
  );
};

export default MembershipPlans;
