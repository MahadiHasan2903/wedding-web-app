import { MembershipPackage } from "./ms-package.types";

export interface PurchasedMembership {
  id: string;
  user: string;
  amount: string;
  discount: string;
  payable: string;
  status: string;
  paymentStatus: string;
  purchasedAt: string;
  expiresAt: string | null;
  membershipPackageInfo: MembershipPackage;
}
