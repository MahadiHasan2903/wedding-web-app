import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MembershipPackage } from "../types/membership/ms-package.types";

interface MsPackagePurchaseData {
  msPackagePurchaseId: string;
  membershipPackage: MembershipPackage;
}

interface PurchasePackageStore {
  msPackagePurchaseData: MsPackagePurchaseData | null;
  setMsPackagePurchaseData: (data: MsPackagePurchaseData) => void;
  clearMsPackagePurchaseData: () => void;
}

const usePurchasePackageStore = create<PurchasePackageStore>()(
  persist(
    (set) => ({
      msPackagePurchaseData: null,
      setMsPackagePurchaseData: (data) => set({ msPackagePurchaseData: data }),
      clearMsPackagePurchaseData: () => set({ msPackagePurchaseData: null }),
    }),
    {
      name: "purchase-package-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePurchasePackageStore;
