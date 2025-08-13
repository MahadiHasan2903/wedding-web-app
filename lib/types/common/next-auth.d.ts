import "next-auth";
import { Media } from "./common.types";
import { SessionUser } from "../user/user.types";
import { PurchasedMembership } from "../membership/ms-purchase.types";

interface BaseUser {
  data: SessionUser;
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
