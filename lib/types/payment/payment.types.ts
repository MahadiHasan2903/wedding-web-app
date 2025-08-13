import { User } from "../user/user.types";

export interface PaymentTransaction {
  id: string;
  user: User;
  transactionId: string;
  currency: string;
  gateway: string;
  servicePurchaseId: {
    id: string;
    user: string;
    packageId: number;
    purchasePackageCategory: string;
    amount: string;
    discount: string;
    payable: string;
    status: string;
    paymentStatus: string;
    purchasedAt: string;
    expiresAt: string;
  };
  paymentStatus: string;
  amount: string;
  discount: string;
  payable: string;
  storeAmount: string | null;
  createdAt: string;
  updatedAt: string;
}
