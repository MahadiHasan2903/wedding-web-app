import "next-auth";
import { Media } from "./common.types";
import { PurchasedMembership } from "../membership/ms-purchase.types";

interface BaseUser {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    email: string;
    phoneNumber: string | null;
    userRole: string;
    accountStatus: string;
    profilePicture: Media | null;
    purchasedMembership: PurchasedMembership;
  };
  accessToken: string;
}

declare module "next-auth" {
  export type User = BaseUser;

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = BaseUser;
}
